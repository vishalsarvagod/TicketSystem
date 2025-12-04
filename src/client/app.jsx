import React, { useState, useMemo } from 'react'
import { ExternalTicketService } from './services/ExternalTicketService'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import TicketListView from './components/TicketListView'
import TicketDetail from './components/TicketDetail'
import ExternalTicketForm from './components/ExternalTicketForm'
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

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedTicket) {
                await externalTicketService.updateTicket(selectedTicket.id, formData)
            } else {
                await externalTicketService.createTicket(formData)
            }
            setShowTicketForm(false)
            setSelectedTicket(null)
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
        if (confirm('Are you sure you want to delete this ticket?')) {
            try {
                await externalTicketService.deleteTicket(ticket.id)
                setShowTicketDetail(false)
                setRefreshTrigger((prev) => prev + 1)
            } catch (error) {
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
                        onCancel={() => setActiveView('dashboard')}
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
                return (
                    <div className="placeholder-view">
                        <h2>🔄 Sync Status</h2>
                        <p>View synchronization status with ServiceNow</p>
                    </div>
                )

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
        </div>
    )
}
