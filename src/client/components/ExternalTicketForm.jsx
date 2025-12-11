import React, { useState } from 'react'
import './ExternalTicketForm.css'

export default function ExternalTicketForm({ ticket, onSubmit, onCancel, externalTicketService }) {
    const isEditing = !!ticket

    const [formData, setFormData] = useState({
        title: ticket?.title || '',
        description: ticket?.description || '',
        priority: ticket?.priority || 'Medium',
        category: ticket?.category || 'Software',
        subcategory: ticket?.subcategory || '',
        impact: ticket?.impact || '2-Medium',
        urgency: ticket?.urgency || '2-Medium',
        reporter: ticket?.reporter || 'Current User',
        assignmentGroup: ticket?.assignmentGroup || '',
        tags: ticket?.tags?.join(', ') || '',
        cassetName: ticket?.cassetName || '',
        cassetStatus: ticket?.cassetStatus || '',
        terminalId: ticket?.terminalId || '',
        location: ticket?.location || '',
        dispatchStatus: ticket?.dispatchStatus || 'Pending',
    })

    const [createInServiceNow, setCreateInServiceNow] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (formData.title.length < 5) {
            alert('Title must be at least 5 characters long')
            return
        }

        if (formData.description.length < 10) {
            alert('Description must be at least 10 characters long')
            return
        }

        setSubmitting(true)

        try {
            // Convert tags from comma-separated string to array
            const tagsArray = formData.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0)

            const ticketData = {
                ...formData,
                tags: tagsArray,
            }

            if (createInServiceNow && !isEditing) {
                // Create in ServiceNow and get the incident details
                const result = await externalTicketService.createServiceNowIncident(ticketData)
                
                // Show success message with incident number
                if (result.serviceNow?.number) {
                    const message = `Ticket created and synced to ServiceNow!\nTicket #: ${result.localTicketId}\nServiceNow Incident: ${result.serviceNow.number}`
                    alert(message)
                }
                
                // Close the form and refresh - pass the result to update ticket data
                await onSubmit(ticketData, result)
            } else {
                // Regular create/update
                await onSubmit(ticketData)
            }
        } catch (error) {
            alert('Failed to submit ticket: ' + error.message)
        } finally {
            setSubmitting(false)
        }
    }

    const handleClear = () => {
        setFormData({
            title: '',
            description: '',
            priority: 'Medium',
            category: 'Software',
            subcategory: '',
            impact: '2-Medium',
            urgency: '2-Medium',
            reporter: 'Current User',
            assignmentGroup: '',
            tags: '',
            cassetName: '',
            cassetStatus: '',
            terminalId: '',
            location: '',
            dispatchStatus: 'Pending',
        })
    }

    return (
        <div className="external-form-overlay" onClick={onCancel}>
            <div className="external-form-container" onClick={(e) => e.stopPropagation()}>
                <div className="external-form-header">
                    <h2>{isEditing ? 'Edit Ticket' : 'Create New Ticket'}</h2>
                    <button type="button" className="close-button" onClick={onCancel}>
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="external-ticket-form">
                    <div className="form-scroll-container">
                        {/* Title */}
                        <div className="form-group required">
                            <label htmlFor="title">
                                Title <span className="required-asterisk">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                minLength={5}
                                placeholder="Enter ticket title (min 5 characters)"
                            />
                            <small>Minimum 5 characters</small>
                        </div>

                        {/* Description */}
                        <div className="form-group required">
                            <label htmlFor="description">
                                Description <span className="required-asterisk">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                minLength={10}
                                rows={5}
                                placeholder="Describe the issue in detail (min 10 characters)"
                            />
                            <small>Minimum 10 characters</small>
                        </div>

                        {/* Priority and Category */}
                        <div className="form-row">
                            <div className="form-group required">
                                <label htmlFor="priority">
                                    Priority <span className="required-asterisk">*</span>
                                </label>
                                <select id="priority" name="priority" value={formData.priority} onChange={handleChange} required>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>

                            <div className="form-group required">
                                <label htmlFor="category">
                                    Category <span className="required-asterisk">*</span>
                                </label>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="Software">Software</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Network">Network</option>
                                    <option value="Database">Database</option>
                                    <option value="Security">Security</option>
                                    <option value="Email">Email</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Subcategory */}
                        <div className="form-group">
                            <label htmlFor="subcategory">Subcategory</label>
                            <input
                                type="text"
                                id="subcategory"
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleChange}
                                placeholder="Enter subcategory (optional)"
                            />
                        </div>

                        {/* Impact and Urgency */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="impact">Impact</label>
                                <select id="impact" name="impact" value={formData.impact} onChange={handleChange}>
                                    <option value="1-High">1 - High</option>
                                    <option value="2-Medium">2 - Medium</option>
                                    <option value="3-Low">3 - Low</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="urgency">Urgency</label>
                                <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange}>
                                    <option value="1-High">1 - High</option>
                                    <option value="2-Medium">2 - Medium</option>
                                    <option value="3-Low">3 - Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Reporter and Assignment Group */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reporter">Reporter</label>
                                <input
                                    type="text"
                                    id="reporter"
                                    name="reporter"
                                    value={formData.reporter}
                                    onChange={handleChange}
                                    placeholder="Auto-filled with current user"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="assignmentGroup">Assignment Group</label>
                                <input
                                    type="text"
                                    id="assignmentGroup"
                                    name="assignmentGroup"
                                    value={formData.assignmentGroup}
                                    onChange={handleChange}
                                    placeholder="ServiceNow group (optional)"
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="form-group">
                            <label htmlFor="tags">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Enter tags separated by commas (e.g., urgent, network, vpn)"
                            />
                            <small>Separate multiple tags with commas</small>
                        </div>

                        {/* Casset Name and Casset Status */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cassetName">Casset Name</label>
                                <select id="cassetName" name="cassetName" value={formData.cassetName} onChange={handleChange}>
                                    <option value="">-- Select Casset Name --</option>
                                    <option value="1">Cashout</option>
                                    <option value="2">Cash_Deposit</option>
                                    <option value="3">Recycle</option>
                                </select>
                                <small>Optional - Select casset type</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="cassetStatus">Casset Status</label>
                                <select id="cassetStatus" name="cassetStatus" value={formData.cassetStatus} onChange={handleChange}>
                                    <option value="">-- Select Casset Status --</option>
                                    <option value="Ok">Ok</option>
                                    <option value="Full">Full</option>
                                </select>
                                <small>Optional - Select casset status</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="terminalId">Terminal ID</label>
                                <input
                                    type="text"
                                    id="terminalId"
                                    name="terminalId"
                                    value={formData.terminalId}
                                    onChange={handleChange}
                                    placeholder="e.g., CA09723"
                                />
                                <small>Optional - Enter terminal identifier</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g., California"
                                />
                                <small>Optional - Enter location</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dispatchStatus">Dispatch Status</label>
                                <select id="dispatchStatus" name="dispatchStatus" value={formData.dispatchStatus} onChange={handleChange}>
                                    <option value="Pending">Pending</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                <small>Optional - Select dispatch status</small>
                            </div>
                        </div>

                        {/* ServiceNow Integration Option (only for new tickets) */}
                        {!isEditing && (
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={createInServiceNow}
                                        onChange={(e) => setCreateInServiceNow(e.target.checked)}
                                    />
                                    <span>Create and sync to ServiceNow immediately</span>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="external-form-actions">
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? 'Submitting...' : isEditing ? 'Update Ticket' : 'Create Ticket'}
                        </button>
                        {!isEditing && (
                            <button type="button" className="btn-secondary" onClick={handleClear} disabled={submitting}>
                                Clear Form
                            </button>
                        )}
                        <button type="button" className="btn-cancel" onClick={onCancel} disabled={submitting}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
