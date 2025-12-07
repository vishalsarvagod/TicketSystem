import React, { useState, useEffect } from 'react'
import './HealthStatus.css'

export default function HealthStatus({ externalTicketService, isCollapsed }) {
    const [healthData, setHealthData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [lastChecked, setLastChecked] = useState(null)

    // Auto-check health every 5 minutes
    useEffect(() => {
        checkHealth() // Initial check
        
        const interval = setInterval(() => {
            checkHealth()
        }, 5 * 60 * 1000) // 5 minutes

        return () => clearInterval(interval)
    }, [])

    const checkHealth = async () => {
        try {
            setLoading(true)
            setError(null)
            const health = await externalTicketService.healthCheck()
            setHealthData(health)
            setLastChecked(new Date())
        } catch (err) {
            setError(err.message)
            setHealthData(null)
        } finally {
            setLoading(false)
        }
    }

    const getStatusClass = () => {
        if (loading) return 'status-checking'
        if (error) return 'status-error'
        if (healthData?.status === 'Healthy') return 'status-healthy'
        return 'status-unknown'
    }

    const getStatusIcon = () => {
        if (loading) return '🔄'
        if (error) return '❌'
        if (healthData?.status === 'Healthy') return '✅'
        return '❓'
    }

    const getStatusText = () => {
        if (loading) return 'Checking...'
        if (error) return 'API Error'
        if (healthData?.status === 'Healthy') return 'API Healthy'
        return 'Unknown'
    }

    const formatTime = (date) => {
        if (!date) return ''
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return ''
        const date = new Date(timestamp)
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className={`health-status ${getStatusClass()}`}>
            <div className="health-indicator" onClick={checkHealth} title="Click to refresh">
                <span className="health-icon">{getStatusIcon()}</span>
                {!isCollapsed && (
                    <div className="health-info">
                        <div className="health-text">{getStatusText()}</div>
                        {healthData && (
                            <div className="health-details">
                                <div className="health-version">v{healthData.version}</div>
                                <div className="health-timestamp">
                                    {formatTimestamp(healthData.timestamp)}
                                </div>
                            </div>
                        )}
                        {lastChecked && !loading && (
                            <div className="last-checked">
                                Last: {formatTime(lastChecked)}
                            </div>
                        )}
                        {error && (
                            <div className="health-error" title={error}>
                                Connection failed
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {!isCollapsed && (
                <button 
                    className="health-refresh" 
                    onClick={checkHealth} 
                    disabled={loading}
                    title="Refresh health status"
                >
                    🔄
                </button>
            )}
        </div>
    )
}