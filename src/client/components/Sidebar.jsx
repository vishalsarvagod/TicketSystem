import React from 'react'
import HealthStatus from './HealthStatus'
import './Sidebar.css'

export default function Sidebar({ activeView, onViewChange, isCollapsed, onToggle, externalTicketService }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'all-tickets', label: 'All Tickets', icon: '📋' },
        { id: 'servicenow-tickets', label: 'ServiceNow Tickets', icon: '🎫' },
        { id: 'my-tickets', label: 'My Tickets', icon: '👤' },
        { id: 'high-priority', label: 'High Priority', icon: '⚠️' },
        { id: 'create-ticket', label: 'Create Ticket', icon: '➕' },
        { id: 'sync-status', label: 'Sync Status', icon: '🔄' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ]

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!isCollapsed && <h2>External Ticket Management</h2>}
                <button className="toggle-button" onClick={onToggle} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                    {isCollapsed ? '☰' : '✕'}
                </button>
            </div>
            
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                                onClick={() => onViewChange(item.id)}
                                aria-label={item.label}
                                title={isCollapsed ? item.label : ''}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {!isCollapsed && <span className="nav-label">{item.label}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Health Status Indicator */}
            <HealthStatus 
                externalTicketService={externalTicketService}
                isCollapsed={isCollapsed}
            />
        </aside>
    )
}
