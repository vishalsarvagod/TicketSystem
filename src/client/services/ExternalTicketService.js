/**
 * ExternalTicketService - Handles all API calls to the external ticket management system
 * Base URL: https://ticketsys-byeygrdfaxa2afdc.canadacentral-01.azurewebsites.net
 */
export class ExternalTicketService {
    constructor() {
        this.baseUrl = 'https://ticketsys-byeygrdfaxa2afdc.canadacentral-01.azurewebsites.net'
    }

    /**
     * Generic fetch wrapper with error handling
     */
    async fetchAPI(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    ...options.headers,
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `HTTP error ${response.status}`)
            }

            // Handle empty responses (common for DELETE operations)
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
                const text = await response.text()
                return text ? JSON.parse(text) : {}
            } else {
                // For non-JSON responses or empty responses, return success indicator
                return { success: true }
            }
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error)
            throw error
        }
    }

    // ==================== TICKETS API ====================

    /**
     * Get all tickets with optional filtering
     * @param {Object} filters - Filter parameters (status, priority, category, assignee)
     * @returns {Promise<Array>} Array of tickets
     */
    async listTickets(filters = {}) {
        const params = new URLSearchParams()
        
        if (filters.status) params.append('status', filters.status)
        if (filters.priority) params.append('priority', filters.priority)
        if (filters.category) params.append('category', filters.category)
        if (filters.assignee) params.append('assignee', filters.assignee)
        
        const queryString = params.toString()
        const endpoint = `/api/tickets${queryString ? '?' + queryString : ''}`
        
        return await this.fetchAPI(endpoint)
    }

    /**
     * Get single ticket by ID
     * @param {string} id - Ticket ID
     * @returns {Promise<Object>} Ticket details
     */
    async getTicket(id) {
        return await this.fetchAPI(`/api/tickets/${id}`)
    }

    /**
     * Create new ticket
     * @param {Object} ticketData - Ticket data
     * @returns {Promise<Object>} Created ticket
     */
    async createTicket(ticketData) {
        return await this.fetchAPI('/api/tickets', {
            method: 'POST',
            body: JSON.stringify(ticketData),
        })
    }

    /**
     * Update existing ticket
     * @param {string} id - Ticket ID
     * @param {Object} ticketData - Updated ticket data
     * @returns {Promise<Object>} Updated ticket
     */
    async updateTicket(id, ticketData) {
        return await this.fetchAPI(`/api/tickets/${id}`, {
            method: 'PUT',
            body: JSON.stringify(ticketData),
        })
    }

    /**
     * Delete ticket
     * @param {string} id - Ticket ID
     * @returns {Promise<boolean>} Success status
     */
    async deleteTicket(id) {
        await this.fetchAPI(`/api/tickets/${id}`, {
            method: 'DELETE',
        })
        return true
    }

    /**
     * Get ticket statistics
     * @returns {Promise<Object>} Statistics object with totalTickets, openTickets, etc.
     */
    async getStats() {
        return await this.fetchAPI('/api/tickets/stats')
    }

    /**
     * Add comment to ticket
     * @param {string} id - Ticket ID
     * @param {Object} commentData - Comment data {author, content}
     * @returns {Promise<Object>} Updated ticket with new comment
     */
    async addComment(id, commentData) {
        return await this.fetchAPI(`/api/tickets/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify(commentData),
        })
    }

    /**
     * Add comment to ServiceNow incident (syncs to ServiceNow)
     * @param {string} sysId - ServiceNow sys_id
     * @param {Object} commentData - Comment data {content, type: 'comments'|'work_notes', author}
     * @returns {Promise<Object>} Response with sync status
     */
    async addServiceNowComment(sysId, commentData) {
        return await this.fetchAPI(`/api/servicenow/incidents/${sysId}/comments`, {
            method: 'POST',
            body: JSON.stringify(commentData),
        })
    }

    // ==================== SERVICENOW INTEGRATION API ====================

    /**
     * Create ServiceNow incident from ticket
     * @param {Object} incidentData - Incident data
     * @returns {Promise<Object>} Created incident
     */
    async createServiceNowIncident(incidentData) {
        return await this.fetchAPI('/api/servicenow/incidents', {
            method: 'POST',
            body: JSON.stringify(incidentData),
        })
    }

    /**
     * List all ServiceNow incidents
     * @returns {Promise<Array>} Array of incidents
     */
    async listServiceNowIncidents() {
        return await this.fetchAPI('/api/servicenow/incidents')
    }

    /**
     * Get ServiceNow incident by sys_id
     * @param {string} sysId - ServiceNow sys_id
     * @returns {Promise<Object>} Incident details
     */
    async getServiceNowIncident(sysId) {
        return await this.fetchAPI(`/api/servicenow/incidents/${sysId}`)
    }

    /**
     * Get ServiceNow incident by incident number
     * @param {string} number - Incident number (e.g., INC0010001)
     * @returns {Promise<Object>} Incident details
     */
    async getServiceNowIncidentByNumber(number) {
        return await this.fetchAPI(`/api/servicenow/incidents/number/${number}`)
    }

    /**
     * Refresh incident from ServiceNow (by sys_id)
     * @param {string} sysId - ServiceNow sys_id
     * @returns {Promise<Object>} Refreshed incident
     */
    async refreshIncident(sysId) {
        return await this.fetchAPI(`/api/servicenow/incidents/${sysId}/refresh`)
    }

    /**
     * Refresh incident from ServiceNow (by number)
     * @param {string} number - Incident number
     * @returns {Promise<Object>} Refreshed incident
     */
    async refreshIncidentByNumber(number) {
        return await this.fetchAPI(`/api/servicenow/incidents/number/${number}/refresh`)
    }

    /**
     * Update ServiceNow incident
     * @param {string} sysId - ServiceNow sys_id
     * @param {Object} incidentData - Updated incident data
     * @returns {Promise<Object>} Updated incident
     */
    async updateServiceNowIncident(sysId, incidentData) {
        return await this.fetchAPI(`/api/servicenow/incidents/${sysId}`, {
            method: 'PUT',
            body: JSON.stringify(incidentData),
        })
    }

    /**
     * Get mappings between local tickets and ServiceNow incidents
     * @returns {Promise<Array>} Array of mappings
     */
    async getMappings() {
        return await this.fetchAPI('/api/servicenow/mappings')
    }

    /**
     * Get ServiceNow field reference information
     * @returns {Promise<Object>} Field mappings and references
     */
    async getFieldReference() {
        return await this.fetchAPI('/api/servicenow/reference/fields')
    }

    /**
     * Sync local ticket with ServiceNow
     * @param {string} localTicketId - Local ticket ID
     * @returns {Promise<Object>} Sync result with mapping data
     */
    async syncTicketToServiceNow(localTicketId) {
        return await this.fetchAPI(`/api/servicenow/sync/${localTicketId}`, {
            method: 'POST',
        })
    }

    /**
     * Handle ServiceNow webhook updates
     * @param {Object} webhookData - Webhook payload from ServiceNow
     * @returns {Promise<Object>} Processing result
     */
    async handleServiceNowWebhook(webhookData) {
        return await this.fetchAPI('/api/servicenow/webhook', {
            method: 'POST',
            body: JSON.stringify(webhookData),
        })
    }

    /**
     * List ServiceNow incidents with query filter
     * @param {string} query - Query filter for incidents
     * @returns {Promise<Array>} Filtered incidents
     */
    async listServiceNowIncidentsWithQuery(query) {
        const params = new URLSearchParams()
        if (query) params.append('query', query)
        
        const queryString = params.toString()
        const endpoint = `/api/servicenow/incidents${queryString ? '?' + queryString : ''}`
        
        return await this.fetchAPI(endpoint)
    }

    // ==================== UTILITY ====================

    /**
     * Health check
     * @returns {Promise<Object>} Health status
     */
    async healthCheck() {
        return await this.fetchAPI('/api/health')
    }
}
