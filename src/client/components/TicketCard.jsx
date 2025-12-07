import React from 'react'
import './TicketCard.css'

export default function TicketCard({ ticket, onViewDetails, onEdit, onSync, onDelete }) {
    const getPriorityBadgeClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'critical':
                return 'priority-critical'
            case 'high':
                return 'priority-high'
            case 'medium':
                return 'priority-medium'
            case 'low':
                return 'priority-low'
            default:
                return 'priority-default'
        }
    }

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'new':
                return 'status-new'
            case 'in progress':
                return 'status-in-progress'
            case 'assigned':
                return 'status-assigned'
            case 'on hold':
                return 'status-on-hold'
            case 'resolved':
                return 'status-resolved'
            case 'closed':
                return 'status-closed'
            default:
                return 'status-default'
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const openInServiceNow = () => {
        if (ticket.serviceNowSysId) {
            // Open ServiceNow incident record by sys_id
            const url = `/incident.do?sys_id=${ticket.serviceNowSysId}`
            window.open(url, '_blank')
        } else if (ticket.serviceNowNumber) {
            // Open ServiceNow incident by number
            const url = `/incident_list.do?sysparm_query=number=${ticket.serviceNowNumber}`
            window.open(url, '_blank')
        }
    }

    return (
        <div className="ticket-card">
            <div className="ticket-card-header">
                <span className={`priority-badge ${getPriorityBadgeClass(ticket.priority)}`}>{ticket.priority || 'N/A'}</span>
                <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>{ticket.status || 'N/A'}</span>
            </div>

            <div className="ticket-card-body">
                <div className="ticket-number">Ticket #: {ticket.number || ticket.id}</div>
                {ticket.serviceNowNumber && (
                    <div className="servicenow-ticket-number">
                        ServiceNow Ticket #: <span className="snow-number">{ticket.serviceNowNumber}</span>
                    </div>
                )}

                <div className="ticket-title">{ticket.title || 'Untitled'}</div>

                <div className="ticket-details">
                    <div className="detail-row">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{ticket.category || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Assignee:</span>
                        <span className="detail-value">{ticket.assignee || 'Unassigned'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Created:</span>
                        <span className="detail-value">{formatDate(ticket.createdDate)}</span>
                    </div>
                    {ticket.serviceNowNumber && (
                        <div className="detail-row">
                            <span className="detail-label">ServiceNow:</span>
                            <span 
                                className="detail-value servicenow-badge clickable" 
                                onClick={openInServiceNow}
                                title="Click to open in ServiceNow"
                            >
                                {ticket.serviceNowNumber}
                            </span>
                        </div>
                    )}
                </div>

                {ticket.tags && ticket.tags.length > 0 && (
                    <div className="ticket-tags">
                        {ticket.tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="ticket-card-footer">
                {ticket.serviceNowNumber && (
                    <button className="btn-servicenow" onClick={openInServiceNow} title="Open in ServiceNow">
                        🔗 Open in ServiceNow
                    </button>
                )}
                <button className="btn-view" onClick={() => onViewDetails(ticket)} title="View Details">
                    👁️ View
                </button>
                <button className="btn-edit" onClick={() => onEdit(ticket)} title="Edit Ticket">
                    ✏️ Edit
                </button>
                {!ticket.serviceNowNumber && (
                    <button className="btn-sync" onClick={() => onSync(ticket)} title="Sync to ServiceNow">
                        🔄 Sync
                    </button>
                )}
                <button className="btn-delete" onClick={() => onDelete(ticket)} title="Delete Ticket">
                    🗑️
                </button>
            </div>
        </div>
    )
}
