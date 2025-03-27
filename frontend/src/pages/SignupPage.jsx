// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import "../styles/SignupPage.css"

// function SignupPage() {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   })

//   useEffect(() => {
//     // Create floating particles
//     const particles = []
//     for (let i = 0; i < 20; i++) {
//       particles.push({
//         id: i,
//         size: Math.random() * 10 + 5,
//         left: Math.random() * 100,
//         delay: Math.random() * 15,
//         duration: Math.random() * 10 + 10,
//       })
//     }
//   }, [])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//  // Update your handleSubmit function in SignupPage.jsx
// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   try {
//     const response = await fetch("http://localhost:3000/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: formData.username,
//         email: formData.username + "@thapar.edu", // Adjust as needed
//         password: formData.password,
//         rollNo: "12345", // You might want to add these fields to your form
//         batch: "2023",
//         phone: "1234567890"
//       }),
//       credentials: "include"
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.error || "Registration failed");
//     }
    
//     // Save user data and navigate to dashboard
//     localStorage.setItem("user", JSON.stringify(data.user));
//     navigate("/dashboard");
//   } catch (err) {
//     console.error("Registration error:", err);
//     // Show error to user
//   }
// };

//   return (
//     <div className="signup-container">
//       {/* Floating particles */}
//       {Array.from({ length: 20 }).map((_, i) => (
//         <div
//           key={i}
//           className="particle"
//           style={{
//             width: `${Math.random() * 10 + 5}px`,
//             height: `${Math.random() * 10 + 5}px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 15}s`,
//             animationDuration: `${Math.random() * 10 + 10}s`,
//           }}
//         />
//       ))}

//       {/* Decorative elements */}
//       <div className="decorative-circle-1"></div>
//       <div className="decorative-circle-2"></div>
//       <div className="decorative-line-1"></div>
//       <div className="decorative-line-2"></div>

//       {/* Header */}
//       <header className="header">
//         <h1 className="title">
//           SUST<span className="highlight">AI</span>X
//         </h1>
//         <p className="institute-name">THAPAR INSTITUTE OF ENGINEERING AND TECHNOLOGY</p>
//       </header>

//       {/* Main content */}
//       <div className="main-content">
//         {/* Earth illustration */}
//         <div className="earth">
//           <div className="continents"></div>
//         </div>

//         {/* Signup form */}
//         <div className="signup-form-container">
//           <div className="signup-form">
//             <h2 className="welcome-text">Hello, Welcome</h2>

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="USERNAME"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="PASSWORD"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <button type="submit" className="login-button">
//                   LOGIN
//                 </button>
//               </div>
//             </form>

//             <div className="social-login">
//               <button className="social-btn" aria-label="Login with Google">
//                 <span className="social-icon">G</span>
//               </button>
//               <button className="social-btn" aria-label="Login with Facebook">
//                 <span className="social-icon">f</span>
//               </button>
//               <button className="social-btn" aria-label="Login with Twitter">
//                 <span className="social-icon">𝕏</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="footer">
//         <a href="/about" className="footer-link">
//           <span>ABOUT</span>
//           <div className="arrows-right">
//             <div className="arrow"></div>
//             <div className="arrow"></div>
//             <div className="arrow"></div>
//           </div>
//         </a>

//         <a href="/faq" className="footer-link">
//           <div className="arrows-left">
//             <div className="arrow"></div>
//             <div className="arrow"></div>
//             <div className="arrow"></div>
//           </div>
//           <span>FAQ</span>
//         </a>
//       </footer>

//       {/* Floating help button */}
//       <button className="floating-btn" aria-label="Help">
//         <span className="help-icon">?</span>
//       </button>
//     </div>
//   )
// }

// export default SignupPage



"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/SignupPage.css"

function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(data.user))

      // Navigate to dashboard after successful login
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-container">
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
      <div className="main-content">
        {/* Earth illustration */}
        <div className="earth">
          <div className="continents"></div>
        </div>

        {/* Signup form */}
        <div className="signup-form-container">
          <div className="signup-form">
            <h2 className="welcome-text">Hello, Welcome</h2>

            {error && (
              <div className="error-message" style={{ color: "#e74c3c", marginBottom: "15px", textAlign: "center" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="login-button" disabled={isLoading}>
                  {isLoading ? "LOGGING IN..." : "LOGIN"}
                </button>
              </div>

              <div className="register-link">
                <p>
                  NEW USER?{" "}
                  <Link to="/register" className="register-text">
                    Register here
                  </Link>
                </p>
              </div>
            </form>

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
    </div>
  )
}

export default SignupPage