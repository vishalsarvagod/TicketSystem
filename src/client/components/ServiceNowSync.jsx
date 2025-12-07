import React, { useState, useEffect } from 'react'
import './ServiceNowSync.css'

export default function ServiceNowSync({ externalTicketService }) {
    const [mappings, setMappings] = useState([])
    const [incidents, setIncidents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedTicket, setSelectedTicket] = useState('')
    const [syncQuery, setSyncQuery] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const [mappingsData, incidentsData] = await Promise.all([
                externalTicketService.getMappings(),
                externalTicketService.listServiceNowIncidents()
            ])
            
            setMappings(mappingsData)
            setIncidents(incidentsData)
        } catch (err) {
            setError('Failed to load sync data: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSyncTicket = async () => {
        if (!selectedTicket) {
            alert('Please select a ticket to sync')
            return
        }

        try {
            setRefreshing(true)
            const result = await externalTicketService.syncTicketToServiceNow(selectedTicket)
            
            alert(`Ticket synced successfully!\nServiceNow Incident: ${result.serviceNowNumber || 'Created'}`)
            
            // Refresh data
            await loadData()
            setSelectedTicket('')
        } catch (err) {
            alert('Failed to sync ticket: ' + err.message)
        } finally {
            setRefreshing(false)
        }
    }

    const handleQueryIncidents = async () => {
        if (!syncQuery.trim()) {
            // If no query, load all incidents
            await loadData()
            return
        }

        try {
            setLoading(true)
            const filteredIncidents = await externalTicketService.listServiceNowIncidentsWithQuery(syncQuery.trim())
            setIncidents(filteredIncidents)
        } catch (err) {
            alert('Failed to query incidents: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const refreshMapping = async (mapping) => {
        try {
            await externalTicketService.refreshIncidentByNumber(mapping.serviceNowNumber)
            alert('Mapping refreshed successfully')
            await loadData()
        } catch (err) {
            alert('Failed to refresh mapping: ' + err.message)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleString()
    }

    const getSyncStatusBadge = (status) => {
        const className = status === 'Synced' ? 'status-synced' : 
                         status === 'Pending' ? 'status-pending' : 'status-error'
        return <span className={`sync-status-badge ${className}`}>{status}</span>
    }

    if (loading && mappings.length === 0) {
        return <div className="sync-loading">Loading ServiceNow sync data...</div>
    }

    return (
        <div className="servicenow-sync">
            <div className="sync-header">
                <h2>ServiceNow Sync Management</h2>
                <button className="refresh-all-btn" onClick={loadData} disabled={loading}>
                    🔄 Refresh All
                </button>
            </div>

            {error && <div className="sync-error">{error}</div>}

            {/* Manual Sync Section */}
            <section className="sync-section">
                <h3>Manual Ticket Sync</h3>
                <div className="sync-controls">
                    <input
                        type="text"
                        placeholder="Enter Local Ticket ID (e.g., EXT-20251207-123)"
                        value={selectedTicket}
                        onChange={(e) => setSelectedTicket(e.target.value)}
                        className="ticket-id-input"
                    />
                    <button 
                        className="sync-btn" 
                        onClick={handleSyncTicket}
                        disabled={refreshing || !selectedTicket.trim()}
                    >
                        {refreshing ? 'Syncing...' : '🔄 Sync to ServiceNow'}
                    </button>
                </div>
                <p className="sync-help">
                    Enter a local ticket ID to create a corresponding ServiceNow incident
                </p>
            </section>

            {/* ServiceNow Query Section */}
            <section className="sync-section">
                <h3>ServiceNow Incident Query</h3>
                <div className="query-controls">
                    <input
                        type="text"
                        placeholder="Enter query filter (e.g., priority=1 OR state=2)"
                        value={syncQuery}
                        onChange={(e) => setSyncQuery(e.target.value)}
                        className="query-input"
                    />
                    <button 
                        className="query-btn" 
                        onClick={handleQueryIncidents}
                        disabled={loading}
                    >
                        🔍 Query Incidents
                    </button>
                </div>
                <p className="sync-help">
                    Filter ServiceNow incidents using ServiceNow query syntax
                </p>
            </section>

            {/* Mappings Table */}
            <section className="sync-section">
                <h3>Ticket-Incident Mappings ({mappings.length})</h3>
                {mappings.length > 0 ? (
                    <div className="mappings-table-container">
                        <table className="mappings-table">
                            <thead>
                                <tr>
                                    <th>Local Ticket ID</th>
                                    <th>ServiceNow Number</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Last Synced</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mappings.map((mapping, index) => (
                                    <tr key={mapping.id || index}>
                                        <td className="ticket-id">{mapping.localTicketId}</td>
                                        <td className="incident-number">
                                            <a 
                                                href={`/incident.do?sysparm_query=number=${mapping.serviceNowNumber}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="incident-link"
                                            >
                                                {mapping.serviceNowNumber}
                                            </a>
                                        </td>
                                        <td className="mapping-title">{mapping.title || 'N/A'}</td>
                                        <td>{getSyncStatusBadge(mapping.syncStatus)}</td>
                                        <td className="sync-date">
                                            {formatDate(mapping.lastSyncedToServiceNow)}
                                        </td>
                                        <td className="mapping-actions">
                                            <button 
                                                className="refresh-mapping-btn"
                                                onClick={() => refreshMapping(mapping)}
                                                title="Refresh from ServiceNow"
                                            >
                                                🔄
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-mappings">
                        <p>No ticket-incident mappings found</p>
                        <p>Sync some tickets to ServiceNow to see mappings here</p>
                    </div>
                )}
            </section>

            {/* ServiceNow Incidents Table */}
            <section className="sync-section">
                <h3>ServiceNow Incidents ({incidents.length})</h3>
                {incidents.length > 0 ? (
                    <div className="incidents-table-container">
                        <table className="incidents-table">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Title</th>
                                    <th>State</th>
                                    <th>Priority</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incidents.slice(0, 20).map((incident, index) => (
                                    <tr key={incident.sys_id || index}>
                                        <td className="incident-number">
                                            <a 
                                                href={`/incident.do?sys_id=${incident.sys_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="incident-link"
                                            >
                                                {incident.number}
                                            </a>
                                        </td>
                                        <td className="incident-title">{incident.short_description || 'N/A'}</td>
                                        <td>{incident.state || 'N/A'}</td>
                                        <td>{incident.priority || 'N/A'}</td>
                                        <td className="incident-date">{formatDate(incident.opened_at)}</td>
                                        <td className="incident-actions">
                                            <button 
                                                className="view-incident-btn"
                                                onClick={() => window.open(`/incident.do?sys_id=${incident.sys_id}`, '_blank')}
                                                title="Open in ServiceNow"
                                            >
                                                🔗
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {incidents.length > 20 && (
                            <div className="table-note">
                                Showing first 20 incidents. Use query filter to narrow results.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="no-incidents">
                        <p>No ServiceNow incidents found</p>
                        <p>Create some incidents or check your ServiceNow connection</p>
                    </div>
                )}
            </section>
        </div>
    )
}