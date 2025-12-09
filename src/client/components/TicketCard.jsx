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
                {/* Show ServiceNow number prominently if available, otherwise show local ticket ID */}
                {ticket.serviceNowNumber ? (
                    <>
                        <div className="ticket-number servicenow-primary">
                            🎫 {ticket.serviceNowNumber}
                        </div>
                        {ticket.id && ticket.id !== ticket.serviceNowNumber && (
                            <div className="local-ticket-id">Local: {ticket.id}</div>
                        )}
                    </>
                ) : (
                    <div className="ticket-number">
                        Ticket #: {ticket.number || ticket.id || 'N/A'}
                    </div>
                )}

                <div className="ticket-title">{ticket.title || ticket.description || 'Untitled'}</div>

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
                    {ticket.syncStatus && (
                        <div className="detail-row">
                            <span className="detail-label">Sync:</span>
                            <span className={`sync-status ${ticket.syncStatus?.toLowerCase()}`}>{ticket.syncStatus}</span>
                        </div>
                    )}
                    {(ticket.cassetName || ticket.cassetStatus) && (
                        <div className="detail-row casset-row">
                            {ticket.cassetName && (
                                <span className="casset-badge casset-name">{ticket.cassetName}</span>
                            )}
                            {ticket.cassetStatus && (
                                <span className={`casset-badge casset-status-${ticket.cassetStatus.toLowerCase()}`}>{ticket.cassetStatus}</span>
                            )}
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
                <button className="btn-view" onClick={() => onViewDetails(ticket)} title="View Details">
                    �️ View
                </button>
                {ticket.serviceNowNumber ? (
                    <button className="btn-edit" onClick={openInServiceNow} title="Edit in ServiceNow">
                        ✏️ Edit
                    </button>
                ) : (
                    <button className="btn-edit" onClick={() => onEdit(ticket)} title="Edit Ticket">
                        ✏️ Edit
                    </button>
                )}
                <button className="btn-delete" onClick={() => onDelete(ticket)} title="Delete Ticket">
                    🗑️
                </button>
            </div>
        </div>
    )
}
