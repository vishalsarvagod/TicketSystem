import React, { useState, useMemo } from 'react'
import { ExternalTicketService } from './services/ExternalTicketService'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import TicketListView from './components/TicketListView'
import TicketDetail from './components/TicketDetail'
import ExternalTicketForm from './components/ExternalTicketForm'
import FloatingHealthButton from './components/FloatingHealthButton'
import ServiceNowSync from './components/ServiceNowSync'
import './app.css'

export default function App() {
    const [activeView, setActiveView] = useState('dashboard')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [showTicketDetail, setShowTicketDetail] = useState(false)
    const [showTicketForm, setShowTicketForm] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const externalTicketService = useMemo(() => new ExternalTicketService(), [])

    const handleViewChange = (view) => {
        setActiveView(view)
    }

    const handleSidebarToggle = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const handleViewDetails = (ticket) => {
        setSelectedTicket(ticket)
        setShowTicketDetail(true)
    }

    const handleEdit = (ticket) => {
        setSelectedTicket(ticket)
        setShowTicketDetail(false)
        setShowTicketForm(true)
    }

    const handleCreateTicket = () => {
        setSelectedTicket(null)
        setShowTicketForm(true)
    }

    const handleFormSubmit = async (formData, serviceNowResult = null) => {
        try {
            if (selectedTicket) {
                await externalTicketService.updateTicket(selectedTicket.id, formData)
            } else {
                if (serviceNowResult) {
                    // If ServiceNow result exists, we already created the ticket through ServiceNow integration
                    // The ticket creation and ServiceNow sync happened in one API call
                    console.log('Ticket created with ServiceNow integration:', serviceNowResult)
                } else {
                    // Regular ticket creation without ServiceNow integration
                    await externalTicketService.createTicket(formData)
                }
            }
            setShowTicketForm(false)
            setSelectedTicket(null)
            
            // After creating a new ticket, navigate to all-tickets view to see it
            if (!selectedTicket) {
                setActiveView('all-tickets')
            }
            
            setRefreshTrigger((prev) => prev + 1)
        } catch (error) {
            console.error('Form submit error:', error)
            throw error
        }
    }

    const handleSync = async (ticket) => {
        if (confirm('Sync this ticket to ServiceNow?')) {
            try {
                await externalTicketService.createServiceNowIncident({
                    title: ticket.title,
                    description: ticket.description,
                    priority: ticket.priority,
                    category: ticket.category,
                })
                alert('Ticket synced to ServiceNow successfully!')
                setRefreshTrigger((prev) => prev + 1)
            } catch (error) {
                alert('Failed to sync to ServiceNow: ' + error.message)
            }
        }
    }

    const handleDelete = async (ticket) => {
        const confirmMessage = `Are you sure you want to delete this ticket?\n\nTicket: ${ticket.title || 'Untitled'}\nID: ${ticket.number || ticket.id}\n\nThis action cannot be undone.`
        
        if (confirm(confirmMessage)) {
            try {
                await externalTicketService.deleteTicket(ticket.id)
                
                // Close any open modals/details
                setShowTicketDetail(false)
                setSelectedTicket(null)
                
                // Immediate refresh
                setRefreshTrigger((prev) => prev + 1)
                
                // Success notification
                alert(`Ticket "${ticket.title || ticket.number || ticket.id}" has been deleted successfully.`)
            } catch (error) {
                console.error('Delete error:', error)
                alert('Failed to delete ticket: ' + error.message)
            }
        }
    }

    const handleRefreshTicket = () => {
        setRefreshTrigger((prev) => prev + 1)
    }

    const renderMainContent = () => {
        // If create ticket view is active, show the form
        if (activeView === 'create-ticket') {
            return (
                <div className="create-ticket-view">
                    <ExternalTicketForm
                        ticket={null}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setActiveView('all-tickets')}
                        externalTicketService={externalTicketService}
                    />
                </div>
            )
        }

        switch (activeView) {
            case 'dashboard':
                return <Dashboard externalTicketService={externalTicketService} />

            case 'all-tickets':
                return (
                    <TicketListView
                        key={`all-${refreshTrigger}`}
                        externalTicketService={externalTicketService}
                        onViewDetails={handleViewDetails}
                        onEdit={handleEdit}
                        onSync={handleSync}
                        onDelete={handleDelete}
                        filterType="all"
                    />
                )

            case 'my-tickets':
                return (
                    <TicketListView
                        key={`my-${refreshTrigger}`}
                        externalTicketService={externalTicketService}
                        onViewDetails={handleViewDetails}
                        onEdit={handleEdit}
                        onSync={handleSync}
                        onDelete={handleDelete}
                        filterType="my-tickets"
                    />
                )

            case 'high-priority':
                return (
                    <TicketListView
                        key={`high-${refreshTrigger}`}
                        externalTicketService={externalTicketService}
                        onViewDetails={handleViewDetails}
                        onEdit={handleEdit}
                        onSync={handleSync}
                        onDelete={handleDelete}
                        filterType="high-priority"
                    />
                )

            case 'sync-status':
                return <ServiceNowSync />

            case 'settings':
                return (
                    <div className="placeholder-view">
                        <h2>⚙️ Settings</h2>
                        <p>Configure application settings</p>
                    </div>
                )

            default:
                return <Dashboard externalTicketService={externalTicketService} />
        }
    }

    return (
        <div className="external-ticket-app">
            <Sidebar
                activeView={activeView}
                onViewChange={handleViewChange}
                isCollapsed={sidebarCollapsed}
                onToggle={handleSidebarToggle}
                externalTicketService={externalTicketService}
            />

            <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                {renderMainContent()}
            </main>

            {showTicketDetail && selectedTicket && (
                <TicketDetail
                    ticket={selectedTicket}
                    onClose={() => setShowTicketDetail(false)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRefresh={handleRefreshTicket}
                    externalTicketService={externalTicketService}
                />
            )}

            {showTicketForm && (
                <ExternalTicketForm
                    ticket={selectedTicket}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowTicketForm(false)
                        setSelectedTicket(null)
                    }}
                    externalTicketService={externalTicketService}
                />
            )}

            {/* Floating Health Status Button */}
            <FloatingHealthButton externalTicketService={externalTicketService} />
        </div>
    )
}
