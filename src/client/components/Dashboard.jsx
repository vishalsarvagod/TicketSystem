import React, { useEffect, useState } from 'react'
import './Dashboard.css'

export default function Dashboard({ externalTicketService }) {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await externalTicketService.getStats()
            setStats(data)
        } catch (err) {
            setError('Failed to load statistics: ' + err.message)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="dashboard-loading">Loading dashboard...</div>
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <p>{error}</p>
                <button onClick={loadStats}>Retry</button>
            </div>
        )
    }

    if (!stats) {
        return <div className="dashboard-error">No statistics available</div>
    }

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'critical':
                return '#dc3545'
            case 'high':
                return '#fd7e14'
            case 'medium':
                return '#ffc107'
            case 'low':
                return '#28a745'
            default:
                return '#6c757d'
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'new':
                return '#6c757d'
            case 'in progress':
                return '#007bff'
            case 'assigned':
                return '#17a2b8'
            case 'on hold':
                return '#ffc107'
            case 'resolved':
                return '#28a745'
            case 'closed':
                return '#343a40'
            default:
                return '#6c757d'
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard Overview</h1>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalTickets || 0}</div>
                        <div className="stat-label">Total Tickets</div>
                    </div>
                </div>

                <div className="stat-card open">
                    <div className="stat-icon">📂</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.openTickets || 0}</div>
                        <div className="stat-label">Open Tickets</div>
                    </div>
                </div>

                <div className="stat-card high-priority">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.highPriorityTickets || 0}</div>
                        <div className="stat-label">High Priority</div>
                    </div>
                </div>

                <div className="stat-card resolved">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.resolvedTickets || 0}</div>
                        <div className="stat-label">Resolved Tickets</div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-container">
                {/* Tickets by Status */}
                {stats.ticketsByStatus && Object.keys(stats.ticketsByStatus).length > 0 && (
                    <div className="chart-card">
                        <h2>Tickets by Status</h2>
                        <div className="pie-chart">
                            {Object.entries(stats.ticketsByStatus).map(([status, count]) => {
                                const total = Object.values(stats.ticketsByStatus).reduce((a, b) => a + b, 0)
                                const percentage = total > 0 ? (count / total) * 100 : 0
                                return (
                                    <div key={status} className="chart-item">
                                        <div
                                            className="chart-bar"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: getStatusColor(status),
                                            }}
                                        />
                                        <div className="chart-label">
                                            <span className="status-name">{status}</span>
                                            <span className="status-count">
                                                {count} ({percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Tickets by Priority */}
                {stats.ticketsByPriority && Object.keys(stats.ticketsByPriority).length > 0 && (
                    <div className="chart-card">
                        <h2>Tickets by Priority</h2>
                        <div className="bar-chart">
                            {Object.entries(stats.ticketsByPriority)
                                .sort((a, b) => {
                                    const order = { Critical: 0, High: 1, Medium: 2, Low: 3 }
                                    return (order[a[0]] || 999) - (order[b[0]] || 999)
                                })
                                .map(([priority, count]) => {
                                    const maxCount = Math.max(...Object.values(stats.ticketsByPriority))
                                    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
                                    return (
                                        <div key={priority} className="chart-item">
                                            <div className="chart-label">
                                                <span className="priority-name">{priority}</span>
                                            </div>
                                            <div className="chart-bar-container">
                                                <div
                                                    className="chart-bar"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor: getPriorityColor(priority),
                                                    }}
                                                >
                                                    <span className="bar-value">{count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
