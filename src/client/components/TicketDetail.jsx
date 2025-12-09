import React, { useState } from 'react'
import './TicketDetail.css'

export default function TicketDetail({ ticket, onClose, onEdit, onDelete, onRefresh, externalTicketService }) {
    const [comment, setComment] = useState('')
    const [commentType, setCommentType] = useState('comments') // 'comments' or 'work_notes'
    const [syncToServiceNow, setSyncToServiceNow] = useState(true) // Default to sync
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

    // Parse ServiceNow comments/work notes into structured format
    const parseServiceNowComments = (rawText) => {
        if (!rawText || typeof rawText !== 'string') return []
        
        // Split by double newlines or the date pattern
        const entries = rawText.split(/\n\n+/).filter(entry => entry.trim())
        const parsed = []
        
        for (const entry of entries) {
            // Match pattern: "2025-12-08 18:01:38 - Author Name (Type)\nContent"
            const match = entry.match(/^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s*-\s*([^(]+)\s*\(([^)]+)\)\s*\n?([\s\S]*)$/)
            
            if (match) {
                const [, timestamp, author, type, content] = match
                parsed.push({
                    timestamp: timestamp.trim(),
                    author: author.trim(),
                    type: type.trim(),
                    content: content.trim()
                })
            } else if (entry.trim()) {
                // Fallback for unmatched format
                parsed.push({
                    timestamp: null,
                    author: 'ServiceNow',
                    type: 'Note',
                    content: entry.trim()
                })
            }
        }
        
        return parsed
    }

    // Format timestamp for display
    const formatCommentTime = (timestamp) => {
        if (!timestamp) return ''
        try {
            const date = new Date(timestamp.replace(' ', 'T'))
            const now = new Date()
            const diffMs = now - date
            const diffMins = Math.floor(diffMs / 60000)
            const diffHours = Math.floor(diffMs / 3600000)
            const diffDays = Math.floor(diffMs / 86400000)
            
            if (diffMins < 1) return 'Just now'
            if (diffMins < 60) return `${diffMins}m ago`
            if (diffHours < 24) return `${diffHours}h ago`
            if (diffDays < 7) return `${diffDays}d ago`
            
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        } catch {
            return timestamp
        }
    }

    // Get initials from author name
    const getInitials = (name) => {
        if (!name) return '?'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return

        try {
            setSubmittingComment(true)
            
            // Check if ticket is linked to ServiceNow and user wants to sync
            const isLinkedToServiceNow = ticket.serviceNowSysId || ticket.serviceNowNumber
            const shouldSync = isLinkedToServiceNow && syncToServiceNow
            
            if (shouldSync && ticket.serviceNowSysId) {
                // Use ServiceNow comment endpoint
                await externalTicketService.addServiceNowComment(ticket.serviceNowSysId, {
                    content: comment.trim(),
                    type: commentType,
                    author: 'Current User'
                })
            } else {
                // Use local comment endpoint
                await externalTicketService.addComment(ticket.id, {
                    author: 'Current User',
                    content: comment.trim(),
                })
            }
            
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

                    {/* ServiceNow Work Notes - Chat Style */}
                    {ticket.workNotes && (
                        <section className="sn-comments-section worknotes-theme">
                            <div className="sn-comments-header">
                                <span className="sn-comments-icon">📋</span>
                                <h3>Work Notes</h3>
                                <span className="sn-comments-badge internal">Internal</span>
                            </div>
                            <div className="sn-comments-thread">
                                {parseServiceNowComments(ticket.workNotes).map((entry, index) => (
                                    <div key={index} className="sn-comment-bubble">
                                        <div className="sn-comment-avatar" title={entry.author}>
                                            {getInitials(entry.author)}
                                        </div>
                                        <div className="sn-comment-body">
                                            <div className="sn-comment-meta">
                                                <span className="sn-comment-author">{entry.author}</span>
                                                <span className="sn-comment-time">{formatCommentTime(entry.timestamp)}</span>
                                            </div>
                                            <div className="sn-comment-text">{entry.content}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ServiceNow Comments (Customer-visible) - Chat Style */}
                    {ticket.comments && typeof ticket.comments === 'string' && (
                        <section className="sn-comments-section comments-theme">
                            <div className="sn-comments-header">
                                <span className="sn-comments-icon">💬</span>
                                <h3>Customer Comments</h3>
                                <span className="sn-comments-badge customer">Customer Visible</span>
                            </div>
                            <div className="sn-comments-thread">
                                {parseServiceNowComments(ticket.comments).map((entry, index) => (
                                    <div key={index} className="sn-comment-bubble">
                                        <div className="sn-comment-avatar" title={entry.author}>
                                            {getInitials(entry.author)}
                                        </div>
                                        <div className="sn-comment-body">
                                            <div className="sn-comment-meta">
                                                <span className="sn-comment-author">{entry.author}</span>
                                                <span className="sn-comment-time">{formatCommentTime(entry.timestamp)}</span>
                                            </div>
                                            <div className="sn-comment-text">{entry.content}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Add Comment Section */}
                    <section className="comments-section">
                        <h3>Add Comment</h3>

                        <form className="comment-form" onSubmit={handleAddComment}>
                            {/* Comment Type Selector - Only show if linked to ServiceNow */}
                            {(ticket.serviceNowSysId || ticket.serviceNowNumber) && (
                                <div className="comment-options">
                                    <div className="comment-type-selector">
                                        <label>Comment Type:</label>
                                        <div className="type-buttons">
                                            <button
                                                type="button"
                                                className={`type-btn ${commentType === 'comments' ? 'active customer' : ''}`}
                                                onClick={() => setCommentType('comments')}
                                            >
                                                💬 Customer Comment
                                            </button>
                                            <button
                                                type="button"
                                                className={`type-btn ${commentType === 'work_notes' ? 'active internal' : ''}`}
                                                onClick={() => setCommentType('work_notes')}
                                            >
                                                📋 Work Note (Internal)
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="sync-toggle">
                                        <label className="toggle-label">
                                            <input
                                                type="checkbox"
                                                checked={syncToServiceNow}
                                                onChange={(e) => setSyncToServiceNow(e.target.checked)}
                                            />
                                            <span className="toggle-text">
                                                🔄 Sync to ServiceNow
                                                {ticket.serviceNowNumber && (
                                                    <span className="sn-ref">({ticket.serviceNowNumber})</span>
                                                )}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={
                                    commentType === 'work_notes' 
                                        ? "Add internal work note (not visible to customer)..." 
                                        : "Add a comment..."
                                }
                                rows={3}
                                disabled={submittingComment}
                            />
                            
                            <div className="comment-submit-row">
                                <button type="submit" disabled={submittingComment || !comment.trim()}>
                                    {submittingComment ? 'Adding...' : (
                                        syncToServiceNow && (ticket.serviceNowSysId || ticket.serviceNowNumber)
                                            ? `Add & Sync ${commentType === 'work_notes' ? 'Work Note' : 'Comment'}`
                                            : 'Add Comment'
                                    )}
                                </button>
                                {syncToServiceNow && (ticket.serviceNowSysId || ticket.serviceNowNumber) && (
                                    <span className="sync-indicator">
                                        ✓ Will sync to ServiceNow
                                    </span>
                                )}
                            </div>
                        </form>

                        {/* Existing Local Comments Display */}
                        {Array.isArray(ticket.comments) && ticket.comments.length > 0 && (
                            <>
                                <h4 className="local-comments-title">Local Comments ({ticket.comments.length})</h4>
                                <div className="comments-list">
                                    {ticket.comments.map((c) => (
                                        <div key={c.id} className="comment">
                                            <div className="comment-header">
                                                <strong>{c.author}</strong>
                                                <span className="comment-date">{formatDate(c.createdDate)}</span>
                                            </div>
                                            <p className="comment-content">{c.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
