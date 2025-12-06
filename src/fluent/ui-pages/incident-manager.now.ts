import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import incidentPage from '../../client/index.html'

export const incidentManagerPage = UiPage({
    $id: Now.ID['incident-manager-page'],
    endpoint: 'x_clone_ticketmgmt_incident_manager.do',
    description: 'External Ticket Management UI Page',
    category: 'general',
    html: incidentPage,
    direct: true,
})
