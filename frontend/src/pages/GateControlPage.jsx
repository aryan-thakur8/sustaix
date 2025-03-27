"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/GateControlPage.css"

function GateControlPage() {
  const { binId } = useParams()
  const [binInfo, setBinInfo] = useState(null)
  const [isGateOpen, setIsGateOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch bin information if needed
    // For now, we'll just use mock data
    setBinInfo({
      id: binId,
      location: "Main Campus",
      type: "Recycling Bin",
    })
  }, [binId])

  const handleOpenGate = () => {
    setIsLoading(true)

    // Simulate gate opening
    setTimeout(() => {
      setIsGateOpen(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleCloseGate = () => {
    setIsLoading(true)

    // Simulate gate closing and redirect to waste detection
    setTimeout(() => {
      setIsGateOpen(false)
      setIsLoading(false)
      navigate(`/waste-detection/${binId}`)
    }, 1000)
  }

  return (
    <div className="gate-control-page">
      <div className="logo-container">
        <h1 className="logo">
          SUST<span className="logo-accent">AI</span>X
        </h1>
      </div>

      <main className="gate-control-main">
        <h1 className="gate-control-title">Gate Control</h1>

        {binInfo && (
          <div className="bin-info">
            <h2>Bin #{binInfo.id}</h2>
            <p>Location: {binInfo.location}</p>
            <p>Type: {binInfo.type}</p>
          </div>
        )}

        <div className="gate-status">
          <div className={`gate-indicator ${isGateOpen ? "open" : "closed"}`}>
            <div className="gate-icon"></div>
            <p>Gate is {isGateOpen ? "OPEN" : "CLOSED"}</p>
          </div>
        </div>

        <div className="gate-controls">
          <button
            className={`gate-button open-button ${isGateOpen ? "active" : ""}`}
            onClick={handleOpenGate}
            disabled={isLoading || isGateOpen}
          >
            <span className="gate-button-icon">🔓</span>
            Open Dustbin Gate
          </button>

          <button
            className={`gate-button close-button ${!isGateOpen ? "active" : ""}`}
            onClick={handleCloseGate}
            disabled={isLoading || !isGateOpen}
          >
            <span className="gate-button-icon">🔒</span>
            Close Dustbin Gate
          </button>
        </div>

        <div className="gate-instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Click "Open Dustbin Gate" to deposit your waste</li>
            <li>Place your waste inside the bin</li>
            <li>Click "Close Dustbin Gate" to start waste detection</li>
          </ol>
        </div>
      </main>

      <button onClick={() => navigate("/dashboard")} className="back-button" disabled={isLoading}>
        ← Back to Dashboard
      </button>
    </div>
  )
}

export default GateControlPage

