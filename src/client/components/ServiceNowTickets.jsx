import React, { useState, useEffect } from 'react'
import './ServiceNowTickets.css'

export default function ServiceNowTickets({ externalTicketService }) {
    const [mappings, setMappings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [count, setCount] = useState(0)

    // Filters
    const [statusFilter, setStatusFilter] = useState('All')
    const [priorityFilter, setPriorityFilter] = useState('All')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [sortBy, setSortBy] = useState('created-desc')

    useEffect(() => {
        loadMappings()
    }, [])

    const loadMappings = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await externalTicketService.getMappings()
            
            // Handle the response structure: { count: 8, mappings: [...] }
            if (response && response.mappings && Array.isArray(response.mappings)) {
                setMappings(response.mappings)
                setCount(response.count || response.mappings.length)
            } else if (Array.isArray(response)) {
                setMappings(response)
                setCount(response.length)
            } else {
                setMappings([])
                setCount(0)
            }
        } catch (err) {
            setError('Failed to load ServiceNow tickets: ' + err.message)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const getFilteredAndSortedMappings = () => {
        let filtered = [...mappings]

        // Apply status filter
        if (statusFilter !== 'All') {
            filtered = filtered.filter(m => m.status === statusFilter)
        }

        // Apply priority filter
        if (priorityFilter !== 'All') {
            filtered = filtered.filter(m => m.priority === priorityFilter)
        }

        // Apply category filter
        if (categoryFilter !== 'All') {
            filtered = filtered.filter(m => m.category === categoryFilter)
        }

        // Sort
        switch (sortBy) {
            case 'created-desc':
                filtered.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                break
            case 'created-asc':
                filtered.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
                break
            case 'priority':
                const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
                filtered.sort((a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4))
                break
            case 'number':
                filtered.sort((a, b) => a.serviceNowNumber.localeCompare(b.serviceNowNumber))
                break
            default:
                break
        }

        return filtered
    }

    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'critical': return 'priority-critical'
            case 'high': return 'priority-high'
            case 'medium': return 'priority-medium'
            case 'low': return 'priority-low'
            default: return 'priority-default'
        }
    }

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'new': return 'status-new'
            case 'in progress': return 'status-in-progress'
            case 'resolved': return 'status-resolved'
            case 'closed': return 'status-closed'
            default: return 'status-default'
        }
    }

    const getSyncStatusClass = (syncStatus) => {
        switch (syncStatus?.toLowerCase()) {
            case 'synced': return 'sync-synced'
            case 'pending': return 'sync-pending'
            case 'error': return 'sync-error'
            default: return 'sync-default'
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const filteredMappings = getFilteredAndSortedMappings()

    // Get unique values for filters
    const categories = [...new Set(mappings.map(m => m.category).filter(Boolean))]

    if (loading) {
        return <div className="servicenow-tickets-loading">Loading ServiceNow tickets...</div>
    }

    if (error) {
        return (
            <div className="servicenow-tickets-error">
                <p>{error}</p>
                <button onClick={loadMappings}>Retry</button>
            </div>
        )
    }

    return (
        <div className="servicenow-tickets">
            <div className="servicenow-tickets-header">
                <div className="header-title">
                    <h1>🎫 ServiceNow Tickets</h1>
                    <span className="ticket-count">{filteredMappings.length} of {count} tickets</span>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-container">
                <div className="filters-row">
                    <div className="filter-group">
                        <label>Status</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All Statuses</option>
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Priority</label>
                        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                            <option value="All">All Priorities</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Category</label>
                        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Sort By</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="created-desc">Newest First</option>
                            <option value="created-asc">Oldest First</option>
                            <option value="priority">Priority</option>
                            <option value="number">Incident Number</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tickets Table */}
            {filteredMappings.length === 0 ? (
                <div className="no-tickets">
                    <p>No ServiceNow tickets found</p>
                </div>
            ) : (
                <div className="tickets-table-container">
                    <table className="tickets-table">
                        <thead>
                            <tr>
                                <th>Incident #</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Category</th>
                                <th>Sync Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMappings.map((mapping) => (
                                <tr key={mapping.id}>
                                    <td className="incident-number">
                                        <span className="snow-badge">{mapping.serviceNowNumber}</span>
                                    </td>
                                    <td className="description-cell">
                                        {mapping.title || mapping.description || 'No description'}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(mapping.status)}`}>
                                            {mapping.status || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`priority-badge ${getPriorityClass(mapping.priority)}`}>
                                            {mapping.priority || 'N/A'}
                                        </span>
                                    </td>
                                    <td>{mapping.category || 'N/A'}</td>
                                    <td>
                                        <span className={`sync-badge ${getSyncStatusClass(mapping.syncStatus)}`}>
                                            {mapping.syncStatus || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="date-cell">{formatDate(mapping.createdDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
