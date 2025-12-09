import React, { useState } from 'react'
import './TicketDetail.css'

export default function TicketDetail({ ticket, onClose, onEdit, onDelete, onRefresh, externalTicketService }) {
    const [comment, setComment] = useState('')
    const [submittingComment, setSubmittingComment] = useState(false)
    const [infoExpanded, setInfoExpanded] = useState(false) // Collapsed by default to show comments

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
                    <button className="action-btn dispatch-btn" onClick={() => alert('Dispatch functionality coming soon')}>
                        � Dispatch
                    </button>
                    <button className="action-btn escalate-btn" onClick={() => alert('Escalate functionality coming soon')}>
                        ⬆️ Escalate
                    </button>
                    <button className="action-btn transfer-btn" onClick={() => alert('Transfer functionality coming soon')}>
                        ↔️ Transfer
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="ticket-detail-content">
                    {/* Information Section - Collapsible */}
                    <section className={`info-section ${infoExpanded ? 'expanded' : 'collapsed'}`}>
                        <h3 
                            className="collapsible-header" 
                            onClick={() => setInfoExpanded(!infoExpanded)}
                        >
                            <span className="collapse-icon">{infoExpanded ? '▼' : '▶'}</span>
                            Ticket Information
                            {!infoExpanded && <span className="collapsed-hint">(Click to expand)</span>}
                        </h3>
                        {infoExpanded && (
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
                                {ticket.subcategory && (
                                    <tr>
                                        <td className="label">Subcategory</td>
                                        <td className="value">{ticket.subcategory}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td className="label">Assignee</td>
                                    <td className="value">{ticket.assignee || 'Unassigned'}</td>
                                </tr>
                                <tr>
                                    <td className="label">Reporter</td>
                                    <td className="value">{ticket.reporter || 'N/A'}</td>
                                </tr>
                                {ticket.updatedBy && (
                                    <tr>
                                        <td className="label">Updated By</td>
                                        <td className="value">{ticket.updatedBy}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td className="label">Created Date</td>
                                    <td className="value">{formatDate(ticket.createdDate)}</td>
                                </tr>
                                <tr>
                                    <td className="label">Updated Date</td>
                                    <td className="value">{formatDate(ticket.updatedDate)}</td>
                                </tr>
                                {ticket.resolvedAt && (
                                    <tr>
                                        <td className="label">Resolved At</td>
                                        <td className="value">{formatDate(ticket.resolvedAt)}</td>
                                    </tr>
                                )}
                                {ticket.closedAt && (
                                    <tr>
                                        <td className="label">Closed At</td>
                                        <td className="value">{formatDate(ticket.closedAt)}</td>
                                    </tr>
                                )}
                                {ticket.resolutionCode && (
                                    <tr>
                                        <td className="label">Resolution Code</td>
                                        <td className="value">
                                            <span className="resolution-badge">{ticket.resolutionCode}</span>
                                        </td>
                                    </tr>
                                )}
                                {ticket.resolutionNotes && (
                                    <tr>
                                        <td className="label">Resolution Notes</td>
                                        <td className="value description">{ticket.resolutionNotes}</td>
                                    </tr>
                                )}
                                {ticket.cassetName && (
                                    <tr>
                                        <td className="label">Casset Name</td>
                                        <td className="value">
                                            <span className="casset-badge casset-name">{ticket.cassetName}</span>
                                        </td>
                                    </tr>
                                )}
                                {ticket.cassetStatus && (
                                    <tr>
                                        <td className="label">Casset Status</td>
                                        <td className="value">
                                            <span className={`casset-badge casset-status-${ticket.cassetStatus.toLowerCase()}`}>
                                                {ticket.cassetStatus}
                                            </span>
                                        </td>
                                    </tr>
                                )}
                                {ticket.syncStatus === 'Error' && ticket.syncErrorMessage && (
                                    <tr>
                                        <td className="label">Sync Error</td>
                                        <td className="value">
                                            <span className="sync-error-message">{ticket.syncErrorMessage}</span>
                                        </td>
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
                        )}
                    </section>

                    {/* ServiceNow Work Notes */}
                    {ticket.workNotes && (
                        <section className="worknotes-section">
                            <h3>📋 Work Notes (ServiceNow)</h3>
                            <div className="worknotes-content">
                                {ticket.workNotes}
                            </div>
                        </section>
                    )}

                    {/* ServiceNow Comments (Customer-visible) */}
                    {ticket.comments && typeof ticket.comments === 'string' && (
                        <section className="servicenow-comments-section">
                            <h3>💬 ServiceNow Comments</h3>
                            <div className="servicenow-comments-content">
                                {ticket.comments}
                            </div>
                        </section>
                    )}

                    {/* Local Comments Section */}
                    <section className="comments-section">
                        <h3>Comments {Array.isArray(ticket.comments) ? `(${ticket.comments.length})` : ''}</h3>
                        
                        {Array.isArray(ticket.comments) && ticket.comments.length > 0 ? (
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
                            !ticket.comments || typeof ticket.comments !== 'string' ? (
                                <p className="no-comments">No comments yet</p>
                            ) : null
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
                </div>
            </div>
        </div>
    )
}
