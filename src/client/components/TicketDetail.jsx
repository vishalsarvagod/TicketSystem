import React, { useState } from 'react'
import './TicketDetail.css'

export default function TicketDetail({ ticket, onClose, onEdit, onDelete, onRefresh, externalTicketService }) {
    const [comment, setComment] = useState('')
    const [submittingComment, setSubmittingComment] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return

        try {
            setSubmittingComment(true)
            await externalTicketService.addComment(ticket.id, {
                author: 'Current User', // Replace with actual user
                content: comment.trim(),
            })
            setComment('')
            onRefresh()
        } catch (error) {
            alert('Failed to add comment: ' + error.message)
        } finally {
            setSubmittingComment(false)
        }
    }

    const handleRefreshFromServiceNow = async () => {
        if (!ticket.serviceNowNumber) {
            alert('This ticket is not synced to ServiceNow')
            return
        }

        try {
            setRefreshing(true)
            await externalTicketService.refreshIncidentByNumber(ticket.serviceNowNumber)
            onRefresh()
            alert('Ticket refreshed from ServiceNow successfully')
        } catch (error) {
            alert('Failed to refresh from ServiceNow: ' + error.message)
        } finally {
            setRefreshing(false)
        }
    }

    const getPriorityClass = (priority) => {
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
                return ''
        }
    }

    const getStatusClass = (status) => {
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
                return ''
        }
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
        <div className="ticket-detail-overlay" onClick={onClose}>
            <div className="ticket-detail-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="ticket-detail-header">
                    <div className="header-content">
                        <div className="ticket-number-title">
                            <span className="ticket-number">{ticket.number || ticket.id}</span>
                            <h2>{ticket.title || 'Untitled'}</h2>
                        </div>
                        <div className="header-badges">
                            <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>{ticket.priority || 'N/A'}</span>
                            <span className={`status-badge ${getStatusClass(ticket.status)}`}>{ticket.status || 'N/A'}</span>
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="ticket-detail-actions">
                    {ticket.serviceNowNumber && (
                        <button className="action-btn servicenow-btn" onClick={openInServiceNow}>
                            🔗 Open in ServiceNow
                        </button>
                    )}
                    <button className="action-btn edit-btn" onClick={() => onEdit(ticket)}>
                        ✏️ Edit
                    </button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(ticket)}>
                        🗑️ Delete
                    </button>
                    {ticket.status !== 'Resolved' && (
                        <button className="action-btn resolve-btn">✅ Resolve</button>
                    )}
                    {ticket.status !== 'Closed' && (
                        <button className="action-btn close-btn">🔒 Close</button>
                    )}
                </div>

                {/* Scrollable Content */}
                <div className="ticket-detail-content">
                    {/* Information Section */}
                    <section className="info-section">
                        <h3>Ticket Information</h3>
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <td className="label">ID</td>
                                    <td className="value">{ticket.id}</td>
                                </tr>
                                <tr>
                                    <td className="label">Number</td>
                                    <td className="value">{ticket.number || 'N/A'}</td>
                                </tr>
                                {ticket.externalTicketId && (
                                    <tr>
                                        <td className="label">External Ticket ID</td>
                                        <td className="value">{ticket.externalTicketId}</td>
                                    </tr>
                                )}
                                {ticket.serviceNowNumber && (
                                    <tr>
                                        <td className="label">ServiceNow Number</td>
                                        <td className="value">
                                            <span 
                                                className="servicenow-badge clickable" 
                                                onClick={openInServiceNow}
                                                title="Click to open in ServiceNow"
                                            >
                                                {ticket.serviceNowNumber}
                                            </span>
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td className="label">Title</td>
                                    <td className="value">{ticket.title}</td>
                                </tr>
                                <tr>
                                    <td className="label">Description</td>
                                    <td className="value description">{ticket.description || 'No description'}</td>
                                </tr>
                                <tr>
                                    <td className="label">Status</td>
                                    <td className="value">{ticket.status}</td>
                                </tr>
                                <tr>
                                    <td className="label">Priority</td>
                                    <td className="value">{ticket.priority}</td>
                                </tr>
                                <tr>
                                    <td className="label">Category</td>
                                    <td className="value">{ticket.category || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="label">Assignee</td>
                                    <td className="value">{ticket.assignee || 'Unassigned'}</td>
                                </tr>
                                <tr>
                                    <td className="label">Reporter</td>
                                    <td className="value">{ticket.reporter || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="label">Created Date</td>
                                    <td className="value">{formatDate(ticket.createdDate)}</td>
                                </tr>
                                <tr>
                                    <td className="label">Updated Date</td>
                                    <td className="value">{formatDate(ticket.updatedDate)}</td>
                                </tr>
                                {ticket.resolvedDate && (
                                    <tr>
                                        <td className="label">Resolved Date</td>
                                        <td className="value">{formatDate(ticket.resolvedDate)}</td>
                                    </tr>
                                )}
                                {ticket.tags && ticket.tags.length > 0 && (
                                    <tr>
                                        <td className="label">Tags</td>
                                        <td className="value">
                                            <div className="tags-container">
                                                {ticket.tags.map((tag, index) => (
                                                    <span key={index} className="tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>

                    {/* Comments Section */}
                    <section className="comments-section">
                        <h3>Comments ({ticket.comments?.length || 0})</h3>
                        
                        {ticket.comments && ticket.comments.length > 0 ? (
                            <div className="comments-list">
                                {ticket.comments.map((comment) => (
                                    <div key={comment.id} className="comment">
                                        <div className="comment-header">
                                            <strong>{comment.author}</strong>
                                            <span className="comment-date">{formatDate(comment.createdDate)}</span>
                                        </div>
                                        <p className="comment-content">{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-comments">No comments yet</p>
                        )}

                        <form className="comment-form" onSubmit={handleAddComment}>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                rows={3}
                                disabled={submittingComment}
                            />
                            <button type="submit" disabled={submittingComment || !comment.trim()}>
                                {submittingComment ? 'Adding...' : 'Add Comment'}
                            </button>
                        </form>
                    </section>

                    {/* Sync Information */}
                    <section className="sync-section">
                        <h3>ServiceNow Sync Information</h3>
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <td className="label">Last Synced to ServiceNow</td>
                                    <td className="value">{formatDate(ticket.lastSyncedToServiceNow)}</td>
                                </tr>
                                <tr>
                                    <td className="label">Last Synced from ServiceNow</td>
                                    <td className="value">{formatDate(ticket.lastSyncedFromServiceNow)}</td>
                                </tr>
                                <tr>
                                    <td className="label">Sync Status</td>
                                    <td className="value">
                                        <span className={`sync-status ${ticket.syncStatus?.toLowerCase()}`}>
                                            {ticket.syncStatus || 'Not Synced'}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {ticket.serviceNowNumber && (
                            <button
                                className="refresh-btn"
                                onClick={handleRefreshFromServiceNow}
                                disabled={refreshing}
                            >
                                {refreshing ? '🔄 Refreshing...' : '🔄 Refresh from ServiceNow'}
                            </button>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
