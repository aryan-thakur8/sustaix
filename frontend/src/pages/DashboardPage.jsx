"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Dashboard.css"
import ScrollToTop from "../components/ScrollToTop"
import "../styles/ScrollToTop.css"

function DashboardPage() {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(1000)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem("user"))
    if (!userData) {
      navigate("/")
      return
    }

    setUser(userData)
    setPoints(userData.points || 1000)

    // Fetch fresh user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data)
          setPoints(data.points || 1000)
          localStorage.setItem("user", JSON.stringify(data))
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      }
    }

    fetchUserData()

    // Enable scrolling
    document.body.style.overflow = "auto"

    return () => {
      document.body.style.overflow = ""
    }
  }, [navigate])

  const handleLogout = () => {
    // Clear user data and token
    localStorage.removeItem("user")
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    navigate("/")
  }

  return (
    <div className="dashboard-page">
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}

      {/* Decorative elements */}
      <div className="decorative-circle-1"></div>
      <div className="decorative-circle-2"></div>
      <div className="decorative-line-1"></div>
      <div className="decorative-line-2"></div>

      <div className="logo-container">
        <h1 className="logo">
          SUST<span className="logo-accent">AI</span>X
        </h1>
      </div>

      <header className="dashboard-header">
        <div className="points-counter">
          {points} <span className="points-label">POINTS</span>
        </div>
      </header>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Get Started</h1>

        <div className="dashboard-cards">
          <Link to="/reward-store" className="card-link">
            <div className="dashboard-card">
              <div className="card-icon">🛍️</div>
              <h2 className="card-title">Reward Store</h2>
              <p className="card-description">Redeem your points for rewards</p>
            </div>
          </Link>

          <Link to="/scan" className="card-link">
            <div className="dashboard-card">
              <div className="card-icon">📱</div>
              <h2 className="card-title">Scan Me</h2>
              <p className="card-description">Scan QR code for waste deposit</p>
            </div>
          </Link>

          <Link to="/leaderboard" className="card-link">
            <div className="dashboard-card">
              <div className="card-icon">🏆</div>
              <h2 className="card-title">Leaderboard</h2>
              <p className="card-description">Check your ranking</p>
            </div>
          </Link>
        </div>

        <div className="fact-container">
          <div className="fact-card">
            <h2 className="fact-title">Did You Know?</h2>
            <p className="fact-text">Recycling one ton of glass saves 42 kWh of energy!</p>
          </div>
        </div>
      </main>

      <div className="back-button" onClick={handleLogout}>
        <span className="back-arrow">←</span> Back to Login
      </div>

      {/* Add ScrollToTop component */}
      <ScrollToTop />
    </div>
  )
}

export default DashboardPage