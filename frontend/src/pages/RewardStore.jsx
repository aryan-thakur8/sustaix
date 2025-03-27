"use client"

import { useNavigate } from "react-router-dom"
import "../styles/RewardStore.css"

export default function RewardStore() {
  const navigate = useNavigate()

  const handleBackToDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <div className="reward-container">
      {/* Background circles and patterns */}
      <div className="background-elements">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="green-circle green-circle-1"></div>
        <div className="green-circle green-circle-2"></div>
      </div>

      {/* Left side decorative elements */}
      <div className="left-decoration">
        <div className="vertical-line"></div>
        <div className="top-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="horizontal-line"></div>
          ))}
        </div>
        <div className="bottom-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="horizontal-line"></div>
          ))}
        </div>
        <div className="dot"></div>
      </div>

      {/* Right side decorative elements */}
      <div className="right-decoration">
        <div className="vertical-line"></div>
        <div className="top-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="horizontal-line"></div>
          ))}
        </div>
        <div className="bottom-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="horizontal-line"></div>
          ))}
        </div>
        <div className="chevron-container">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="chevron-down">
              <svg viewBox="0 0 24 24">
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <div className="logo-inner"></div>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-button" onClick={handleBackToDashboard} style={{ cursor: "pointer" }}>
            <span>BACK TO DASHBOARD</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Logo and Title */}
        <div className="title-container">
          <h1 className="title">
            SUST<span className="title-highlight">AI</span>x
          </h1>
          <h2 className="subtitle">REWARD STORE</h2>
        </div>

        {/* Reward Cards */}
        <div className="cards-container">
          {/* Card 1 - Shopping Basket */}
          <div className="card">
            <div className="card-content">
              <div className="icon-circle">
                <svg className="basket-icon" viewBox="0 0 24 24">
                  <path d="M5.5,21C4.72,21 4.04,20.55 3.71,19.9V19.9L1.1,10.44L1,10A1,1 0 0,1 2,9H6.58L11.18,2.43C11.36,2.17 11.66,2 12,2C12.34,2 12.65,2.17 12.83,2.44L17.42,9H22A1,1 0 0,1 23,10L22.96,10.29L20.29,19.9C19.96,20.55 19.28,21 18.5,21H5.5M12,4.74L9,9H15L12,4.74M12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13Z" />
                </svg>
              </div>
            </div>
            <div className="price-tag">
              <span className="price-text">$ 800</span>
            </div>
          </div>

          {/* Card 2 - Hamburger */}
          <div className="card">
            <div className="card-content">
              <div className="icon-circle">
                <svg className="burger-icon" viewBox="0 0 24 24">
                  <path d="M2,16H22V17C22,18.11 21.11,19 20,19H4C2.89,19 2,18.11 2,17V16M6.2,5.66L5.38,4.84C5.73,4.42 6.34,4.23 6.75,4.57L7.83,5.38C8.96,4.86 10.22,4.5 11.5,4.5C12.78,4.5 14.04,4.86 15.17,5.38L16.25,4.57C16.66,4.23 17.27,4.42 17.62,4.84L16.8,5.66C18.78,7.05 20,9.11 20,11.5V14H4V11.5C4,9.11 5.22,7.05 7.2,5.66M6,10H18V11.5H6V10Z" />
                </svg>
                <div className="notification-badge">+</div>
              </div>
            </div>
            <div className="price-tag">
              <span className="price-text">$ 800</span>
            </div>
          </div>

          {/* Card 3 - Tickets */}
          <div className="card">
            <div className="card-content">
              <div className="icon-circle">
                <div className="ticket ticket-back">
                  <div className="ticket-stripe"></div>
                </div>
                <div className="ticket ticket-front">
                  <div className="ticket-stripe"></div>
                </div>
              </div>
            </div>
            <div className="price-tag">
              <span className="price-text">$ 800</span>
            </div>
          </div>

          {/* Card 4 - Recycling */}
          <div className="card">
            <div className="card-content">
              <div className="icon-circle">
                <div className="recycle-bin">
                  <svg className="recycle-icon" viewBox="0 0 24 24">
                    <path d="M21.82,15.42L19.32,19.75C18.83,20.61 17.92,21.06 17,21H15V23L12.5,18.5L15,14V16H17.82L15.6,12.15L19.93,9.65L21.73,12.77C22.25,13.54 22.32,14.57 21.82,15.42M9.21,3.06H14.21C15.19,3.06 16.04,3.63 16.45,4.45L17.45,6.19L19.18,5.19L16.54,9.6L11.39,9.69L13.12,8.69L11.71,6.24L9.5,10.09L5.16,7.59L6.96,4.47C7.37,3.64 8.22,3.06 9.21,3.06M5.05,19.76L2.55,15.43C2.06,14.58 2.13,13.56 2.64,12.79L3.64,11.06L1.91,10.06L7.05,10.14L9.7,14.56L7.97,13.56L6.56,16H11V21H7.4C6.47,21.07 5.55,20.61 5.05,19.76Z" />
                  </svg>
                </div>
                <div className="bottle bottle-white"></div>
                <div className="bottle bottle-green"></div>
              </div>
            </div>
            <div className="price-tag">
              <span className="price-text">$ 800</span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="next-button-container">
          <button className="next-button" onClick={handleBackToDashboard}>
            BACK
            <svg className="arrow-icon" viewBox="0 0 24 24" style={{ transform: "rotate(180deg)" }}>
              <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        {/* People with cart illustration */}
        <div className="people-illustration">
          <div className="person person-1"></div>
          <div className="person person-2"></div>
          <div className="cart"></div>
        </div>

        {/* Bottom bar */}
        <div className="bottom-bar">
          <div className="left-bar">
            <div className="dot-large"></div>
            <div className="line"></div>
            <div className="chevron-group">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="chevron-right">
                  <svg viewBox="0 0 24 24">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="recycling-message">
            Recycling one ton of glass <span className="highlight">saves 42 kWh of energy!</span>
          </div>

          <div className="right-bar">
            <div className="chevron-group">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="chevron-left">
                  <svg viewBox="0 0 24 24">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </div>
              ))}
            </div>
            <div className="line"></div>
            <div className="dot-large"></div>
          </div>
        </div>

        {/* Points display */}
        <div className="points-display">
          <div className="points-value">$1000</div>
          <div className="points-label">MY POINTS</div>
        </div>
      </footer>
    </div>
  )
}

