import React, { useState, useEffect } from 'react'
import './FloatingHealthButton.css'

export default function FloatingHealthButton({ externalTicketService }) {
    const [healthData, setHealthData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showDetails, setShowDetails] = useState(false)
    const [lastChecked, setLastChecked] = useState(null)

    useEffect(() => {
        checkHealth() // Initial check
        
        const interval = setInterval(() => {
            checkHealth()
        }, 3 * 60 * 1000) // 3 minutes for floating button

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

    const formatTime = (date) => {
        if (!date) return ''
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <>
            <button 
                className={`floating-health-button ${getStatusClass()}`}
                onClick={() => setShowDetails(!showDetails)}
                title="API Health Status - Click for details"
            >
                <span className="floating-health-icon">{getStatusIcon()}</span>
            </button>

            {showDetails && (
                <div className="health-details-popup">
                    <div className="health-popup-header">
                        <h3>API Health Status</h3>
                        <button 
                            className="close-popup" 
                            onClick={() => setShowDetails(false)}
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="health-popup-content">
                        {loading && (
                            <div className="health-popup-item">
                                <span className="health-popup-icon">🔄</span>
                                <span>Checking API health...</span>
                            </div>
                        )}
                        
                        {error && (
                            <div className="health-popup-item error">
                                <span className="health-popup-icon">❌</span>
                                <div>
                                    <div>API Connection Failed</div>
                                    <div className="error-detail">{error}</div>
                                </div>
                            </div>
                        )}
                        
                        {healthData && (
                            <>
                                <div className="health-popup-item success">
                                    <span className="health-popup-icon">✅</span>
                                    <div>
                                        <div><strong>{healthData.status}</strong></div>
                                        <div className="health-detail">{healthData.service}</div>
                                    </div>
                                </div>
                                
                                <div className="health-popup-item">
                                    <span className="health-popup-icon">📦</span>
                                    <div>
                                        <div>Version: <strong>{healthData.version}</strong></div>
                                        <div className="health-detail">
                                            API Timestamp: {formatTimestamp(healthData.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {lastChecked && (
                            <div className="health-popup-item">
                                <span className="health-popup-icon">🕐</span>
                                <div>
                                    <div>Last Checked: <strong>{formatTime(lastChecked)}</strong></div>
                                    <div className="health-detail">Auto-refreshes every 3 minutes</div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="health-popup-footer">
                        <button 
                            className="refresh-button" 
                            onClick={checkHealth} 
                            disabled={loading}
                        >
                            🔄 Refresh Now
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}