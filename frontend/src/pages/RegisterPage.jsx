"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/SignupPage.css"

function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    rollNumber: "",
    email: "",
    batch: "",
    mobileNumber: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Create floating particles
    const particles = []
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        size: Math.random() * 10 + 5,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 10 + 10,
      })
    }

    // Add a class to the body when RegisterPage mounts
    document.body.classList.add("register-page-body")

    // Clean up when component unmounts
    return () => {
      document.body.classList.remove("register-page-body")
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.username,
          rollNo: formData.rollNumber,
          email: formData.email,
          batch: formData.batch,
          phone: formData.mobileNumber,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(data.user))

      // Navigate to dashboard after successful registration
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-container register-container">
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

      {/* Header */}
      <header className="header">
        <h1 className="title">
          SUST<span className="highlight">AI</span>X
        </h1>
        <p className="institute-name">THAPAR INSTITUTE OF ENGINEERING AND TECHNOLOGY</p>
      </header>

      {/* Main content */}
      <div className="main-content register-main-content">
        {/* Earth illustration */}
        <div className="earth">
          <div className="continents"></div>
        </div>

        {/* Register form */}
        <div className="signup-form-container register-form-container">
          <div className="signup-form">
            <h2 className="welcome-text">Create Account</h2>

            {error && (
              <div className="error-message" style={{ color: "#e74c3c", marginBottom: "15px", textAlign: "center" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="USERNAME"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="ROLL NUMBER"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="batch"
                  placeholder="BATCH"
                  value={formData.batch}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="MOBILE NUMBER"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="NEW PASSWORD"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="login-button" disabled={isLoading}>
                  {isLoading ? "REGISTERING..." : "REGISTER"}
                </button>
              </div>
            </form>

            <div className="register-link">
              <p>
                ALREADY HAVE AN ACCOUNT?{" "}
                <Link to="/" className="register-text">
                  Login here
                </Link>
              </p>
            </div>

            <div className="social-login">
              <button className="social-btn" aria-label="Login with Google">
                <span className="social-icon">G</span>
              </button>
              <button className="social-btn" aria-label="Login with Facebook">
                <span className="social-icon">f</span>
              </button>
              <button className="social-btn" aria-label="Login with Twitter">
                <span className="social-icon">𝕏</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <a href="/about" className="footer-link">
          <span>ABOUT</span>
          <div className="arrows-right">
            <div className="arrow"></div>
            <div className="arrow"></div>
            <div className="arrow"></div>
          </div>
        </a>

        <a href="/faq" className="footer-link">
          <div className="arrows-left">
            <div className="arrow"></div>
            <div className="arrow"></div>
            <div className="arrow"></div>
          </div>
          <span>FAQ</span>
        </a>
      </footer>

      {/* Floating help button */}
      <button className="floating-btn" aria-label="Help">
        <span className="help-icon">?</span>
      </button>

      <style jsx>{`
        /* Register page specific styles */
        .register-page-body {
          overflow-y: auto !important;
        }
        
        .register-container {
          height: auto;
          min-height: 100vh;
          overflow-y: auto;
          padding-bottom: 80px;
        }
        
        .register-main-content {
          height: auto;
          min-height: 100%;
          padding-top: 20px;
          padding-bottom: 20px;
          animation: none;
        }
        
        .register-form-container {
          margin: 20px auto;
          max-height: none;
        }
        
        /* Ensure footer stays at bottom */
        .footer {
          position: relative;
          margin-top: 30px;
        }
      `}</style>
    </div>
  )
}

export default RegisterPage