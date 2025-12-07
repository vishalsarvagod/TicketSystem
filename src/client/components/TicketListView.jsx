import React, { useState, useEffect } from 'react'
import TicketCard from './TicketCard'
import './TicketListView.css'

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

    // Filter states
    const [statusFilter, setStatusFilter] = useState('All')
    const [priorityFilter, setPriorityFilter] = useState('All')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [assigneeFilter, setAssigneeFilter] = useState('')
    const [sortBy, setSortBy] = useState('created-desc')

    // Unique values for filters
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadTickets()
    }, [])

    const loadTickets = async () => {
        try {
            setLoading(true)
            setError(null)
            
            // Load both tickets and ServiceNow mappings
            const [ticketsData, mappingsResponse] = await Promise.all([
                externalTicketService.listTickets(),
                externalTicketService.getMappings().catch(() => []) // Don't fail if mappings fail
            ])
            
            // Ensure mappingsData is always an array
            const mappingsData = Array.isArray(mappingsResponse) ? mappingsResponse : []
            
            // Combine tickets with ServiceNow mapping information
            const ticketsWithServiceNow = ticketsData.map(ticket => {
                const mapping = mappingsData.find(m => m.localTicketId === ticket.id || m.localTicketId === ticket.number)
                if (mapping) {
                    return {
                        ...ticket,
                        serviceNowNumber: mapping.serviceNowNumber,
                        serviceNowSysId: mapping.serviceNowSysId,
                        syncStatus: mapping.syncStatus
                    }
                }
                return ticket
            })
            
            setTickets(ticketsWithServiceNow)

            // Extract unique categories
            const uniqueCategories = [...new Set(ticketsWithServiceNow.map((t) => t.category).filter(Boolean))]
            setCategories(uniqueCategories)
        } catch (err) {
            setError('Failed to load tickets: ' + err.message)
            console.error(err)
        } finally {
            setLoading(false)
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
