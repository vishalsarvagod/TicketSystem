import React, { useState, useEffect, useRef } from 'react'
import TicketCard from './TicketCard'
import './TicketListView.css'

// Auto-refresh interval in milliseconds (30 seconds)
const AUTO_REFRESH_INTERVAL = 30000

export default function TicketListView({
    externalTicketService,
    onViewDetails,
    onEdit,
    onSync,
    onDelete,
    filterType = 'all', // 'all', 'my-tickets', 'high-priority'
}) {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [isAutoRefreshing, setIsAutoRefreshing] = useState(false)

    // Filter states
    const [statusFilter, setStatusFilter] = useState('All')
    const [priorityFilter, setPriorityFilter] = useState('All')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [assigneeFilter, setAssigneeFilter] = useState('')
    const [sortBy, setSortBy] = useState('created-desc')

    // Unique values for filters
    const [categories, setCategories] = useState([])
    
    // Ref for interval cleanup
    const refreshIntervalRef = useRef(null)

    useEffect(() => {
        loadTickets()
        
        // Set up auto-refresh polling to pick up webhook updates
        refreshIntervalRef.current = setInterval(() => {
            loadTickets(true) // silent refresh
        }, AUTO_REFRESH_INTERVAL)
        
        // Cleanup interval on unmount
        return () => {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current)
            }
        }
    }, [])

    const loadTickets = async (silent = false) => {
        try {
            if (!silent) {
                setLoading(true)
            }
            setIsAutoRefreshing(silent)
            setError(null)
            
            // Load both local tickets and ServiceNow mappings
            const [ticketsData, mappingsResponse] = await Promise.all([
                externalTicketService.listTickets().catch(() => []),
                externalTicketService.getMappings().catch(() => ({ mappings: [] }))
            ])
            
            // Ensure local tickets is an array
            const localTickets = Array.isArray(ticketsData) ? ticketsData : []
            
            // Handle mappings response: can be { count, mappings } or just an array
            let mappingsData = []
            if (mappingsResponse && mappingsResponse.mappings && Array.isArray(mappingsResponse.mappings)) {
                mappingsData = mappingsResponse.mappings
            } else if (Array.isArray(mappingsResponse)) {
                mappingsData = mappingsResponse
            }
            
            // Create a Set of ServiceNow sys_ids that are already linked to local tickets
            const linkedServiceNowIds = new Set()
            
            // First, enhance local tickets with ServiceNow info
            const ticketsWithServiceNow = localTickets.map(ticket => {
                const mapping = mappingsData.find(m => 
                    m.localTicketId === ticket.id || 
                    m.localTicketId === ticket.number
                )
                if (mapping) {
                    linkedServiceNowIds.add(mapping.serviceNowSysId)
                    return {
                        ...ticket,
                        serviceNowNumber: mapping.serviceNowNumber,
                        serviceNowSysId: mapping.serviceNowSysId,
                        syncStatus: mapping.syncStatus,
                        // Include all mapping fields for display
                        workNotes: mapping.workNotes,
                        comments: mapping.comments,
                        updatedBy: mapping.updatedBy,
                        resolutionCode: mapping.resolutionCode,
                        resolutionNotes: mapping.resolutionNotes,
                        resolvedAt: mapping.resolvedAt,
                        closedAt: mapping.closedAt,
                        lastSyncedFromServiceNow: mapping.lastSyncedFromServiceNow,
                        lastSyncedToServiceNow: mapping.lastSyncedToServiceNow,
                        syncErrorMessage: mapping.syncErrorMessage,
                        cassetName: mapping.cassetName || ticket.cassetName,
                        cassetStatus: mapping.cassetStatus || ticket.cassetStatus,
                    }
                }
                return ticket
            })
            
            // Add ALL ServiceNow mappings that aren't linked to local tickets
            // These are tickets created via "Create and Sync to ServiceNow"
            const serviceNowOnlyTickets = mappingsData
                .filter(m => !linkedServiceNowIds.has(m.serviceNowSysId))
                .map(mapping => ({
                    id: mapping.localTicketId,
                    number: mapping.serviceNowNumber,
                    title: mapping.title || mapping.description || 'ServiceNow Ticket',
                    description: mapping.description || '',
                    status: mapping.status || 'New',
                    priority: mapping.priority || 'Medium',
                    category: mapping.category || 'General',
                    subcategory: mapping.subcategory || '',
                    assignee: mapping.assignee || '',
                    reporter: mapping.reporter || '',
                    createdDate: mapping.createdDate,
                    updatedDate: mapping.updatedDate,
                    serviceNowNumber: mapping.serviceNowNumber,
                    serviceNowSysId: mapping.serviceNowSysId,
                    syncStatus: mapping.syncStatus,
                    syncErrorMessage: mapping.syncErrorMessage,
                    isServiceNowTicket: true,
                    // New fields from backend
                    workNotes: mapping.workNotes,
                    comments: mapping.comments,
                    updatedBy: mapping.updatedBy,
                    resolutionCode: mapping.resolutionCode,
                    resolutionNotes: mapping.resolutionNotes,
                    resolvedAt: mapping.resolvedAt,
                    closedAt: mapping.closedAt,
                    lastSyncedFromServiceNow: mapping.lastSyncedFromServiceNow,
                    lastSyncedToServiceNow: mapping.lastSyncedToServiceNow,
                    cassetName: mapping.cassetName,
                    cassetStatus: mapping.cassetStatus,
                }))
            
            // Combine all tickets - local tickets first, then ServiceNow-only tickets
            const allTickets = [...ticketsWithServiceNow, ...serviceNowOnlyTickets]
            
            console.log('Loaded tickets:', {
                localTickets: localTickets.length,
                mappings: mappingsData.length,
                serviceNowOnly: serviceNowOnlyTickets.length,
                total: allTickets.length,
                autoRefresh: silent
            })
            
            setTickets(allTickets)
            setLastUpdated(new Date())

            // Extract unique categories
            const uniqueCategories = [...new Set(allTickets.map((t) => t.category).filter(Boolean))]
            setCategories(uniqueCategories)
        } catch (err) {
            if (!silent) {
                setError('Failed to load tickets: ' + err.message)
            }
            console.error(err)
        } finally {
            setLoading(false)
            setIsAutoRefreshing(false)
        }
    }

    const getFilteredAndSortedTickets = () => {
        let filtered = [...tickets]

        // Apply filter type (all, my-tickets, high-priority)
        if (filterType === 'my-tickets') {
            filtered = filtered.filter((t) => t.assignee === 'Current User') // Replace with actual user
        } else if (filterType === 'high-priority') {
            filtered = filtered.filter((t) => t.priority === 'High' || t.priority === 'Critical')
        }

        // Apply status filter
        if (statusFilter !== 'All') {
            filtered = filtered.filter((t) => t.status === statusFilter)
        }

        // Apply priority filter
        if (priorityFilter !== 'All') {
            filtered = filtered.filter((t) => t.priority === priorityFilter)
        }

        // Apply category filter
        if (categoryFilter !== 'All') {
            filtered = filtered.filter((t) => t.category === categoryFilter)
        }

        // Apply assignee filter
        if (assigneeFilter.trim()) {
            filtered = filtered.filter((t) =>
                t.assignee?.toLowerCase().includes(assigneeFilter.toLowerCase())
            )
        }

        // Apply sorting
        switch (sortBy) {
            case 'created-desc':
                filtered.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                break
            case 'created-asc':
                filtered.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
                break
            case 'priority-high':
                const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
                filtered.sort((a, b) => (priorityOrder[a.priority] || 999) - (priorityOrder[b.priority] || 999))
                break
            case 'priority-low':
                const priorityOrderLow = { Low: 0, Medium: 1, High: 2, Critical: 3 }
                filtered.sort((a, b) => (priorityOrderLow[a.priority] || 999) - (priorityOrderLow[b.priority] || 999))
                break
            case 'title-az':
                filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
                break
            case 'title-za':
                filtered.sort((a, b) => (b.title || '').localeCompare(a.title || ''))
                break
            default:
                break
        }

        return filtered
    }

    const handleClearFilters = () => {
        setStatusFilter('All')
        setPriorityFilter('All')
        setCategoryFilter('All')
        setAssigneeFilter('')
        setSortBy('created-desc')
    }

    const filteredTickets = getFilteredAndSortedTickets()

    if (loading) {
        return <div className="ticket-list-loading">Loading tickets...</div>
    }

    if (error) {
        return (
            <div className="ticket-list-error">
                <p>{error}</p>
                <button onClick={loadTickets}>Retry</button>
            </div>
        )
    }

    return (
        <div className="ticket-list-view">
            <div className="ticket-list-header">
                <div className="header-title">
                    <h1>
                        {filterType === 'all' && 'All Tickets'}
                        {filterType === 'my-tickets' && 'My Tickets'}
                        {filterType === 'high-priority' && 'High Priority Tickets'}
                    </h1>
                    <span className="ticket-count">
                        {filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'}
                    </span>
                </div>
                <div className="header-actions">
                    {isAutoRefreshing && (
                        <span className="auto-refresh-indicator">🔄 Syncing...</span>
                    )}
                    {lastUpdated && !isAutoRefreshing && (
                        <span className="last-updated">
                            Updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <button 
                        className="refresh-btn" 
                        onClick={() => loadTickets(false)}
                        disabled={loading || isAutoRefreshing}
                        title="Refresh tickets (auto-refreshes every 30s)"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </div>

            {/* Filters and Sorting */}
            <div className="filters-container">
                <div className="filters-row">
                    <div className="filter-group">
                        <label>Status</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All Statuses</option>
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Assigned">Assigned</option>
                            <option value="On Hold">On Hold</option>
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
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Assignee</label>
                        <input
                            type="text"
                            placeholder="Search assignee..."
                            value={assigneeFilter}
                            onChange={(e) => setAssigneeFilter(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Sort By</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="created-desc">Newest First</option>
                            <option value="created-asc">Oldest First</option>
                            <option value="priority-high">Priority (High to Low)</option>
                            <option value="priority-low">Priority (Low to High)</option>
                            <option value="title-az">Title (A-Z)</option>
                            <option value="title-za">Title (Z-A)</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>&nbsp;</label>
                        <button className="clear-filters-btn" onClick={handleClearFilters}>
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Tickets Grid */}
            {filteredTickets.length === 0 ? (
                <div className="no-tickets">
                    <p>No tickets found matching your filters</p>
                </div>
            ) : (
                <div className="tickets-grid">
                    {filteredTickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            onViewDetails={onViewDetails}
                            onEdit={onEdit}
                            onSync={onSync}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
