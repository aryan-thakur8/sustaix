// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import "../styles/ScanPage.css"

// function ScanPage() {
//   const [binId, setBinId] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")
//   const [redirecting, setRedirecting] = useState(false)
//   const [countdown, setCountdown] = useState(3)
//   const navigate = useNavigate()

//   useEffect(() => {
//     let timer
//     if (redirecting && countdown > 0) {
//       timer = setTimeout(() => {
//         setCountdown(countdown - 1)
//       }, 1000)
//     } else if (redirecting && countdown === 0) {
//       navigate(`/gate-control/${binId}`)
//     }
//     return () => clearTimeout(timer)
//   }, [redirecting, countdown, navigate, binId])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("Scan button clicked with bin ID:", binId)
//     setIsLoading(true)
//     setError("")
//     setSuccess("")

//     try {
//       console.log("Sending request to API...")
//       const response = await fetch("http://localhost:3000/api/scan-bin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Crucial for sending cookies
//         body: JSON.stringify({
//           binId: binId,
//         }),
//       })

//       console.log("Response received:", response.status)
//       const data = await response.json()
//       console.log("Response data:", data)

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to connect to bin")
//       }

//       setSuccess(`Successfully connected to bin! Location: ${data.binLocation}`)

//       // Update user data in local storage
//       if (data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user))
//       }
//     } catch (err) {
//       console.error("Error in scan request:", err)
//       setError(err.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="scan-page">
//       <div className="logo-container">
//         <h1 className="logo">
//           SUST<span className="logo-accent">AI</span>X
//         </h1>
//       </div>

//       <main className="scan-main">
//         <h1 className="scan-title">Connect to Bin</h1>

//         <form onSubmit={handleSubmit} className="scan-form">
//           <div className="form-group">
//             <label htmlFor="binId">Enter Bin ID:</label>
//             <input
//               type="text"
//               id="binId"
//               value={binId}
//               onChange={(e) => setBinId(e.target.value)}
//               placeholder="enter bin ID"
//               required
//             />
//           </div>

//           {error && <div className="error-message">{error}</div>}
//           {success && <div className="success-message">{success}
//           {redirecting && (
//                 <div className="redirect-message">Redirecting to Gate Control in {countdown} seconds...</div>
//               )}</div>}

// <button type="submit" disabled={isLoading || redirecting} className="scan-button">
//             {isLoading ? "Connecting..." : "Connect"}
//           </button>
//         </form>

//         {success && (
//           <div className="instructions">
//             <h3>Next Steps:</h3>
//             <ol>
//               <li>Approach the connected bin</li>
//               <li>Dispose of your waste in the bin</li>
//               <li>Your points will be updated automatically</li>
//             </ol>
//           </div>
//         )}
//       </main>

//       <button onClick={() => navigate("/dashboard")} className="back-button">
//         ← Back to Dashboard
//       </button>
//     </div>
//   )
// }

// export default ScanPage"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/ScanPage.css"

function ScanPage() {
  const [binId, setBinId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [redirecting, setRedirecting] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    let timer
    if (redirecting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (redirecting && countdown === 0) {
      navigate(`/gate-control/${binId}`)
    }
    return () => clearTimeout(timer)
  }, [redirecting, countdown, navigate, binId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Scan button clicked with bin ID:", binId)
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      console.log("Sending request to API...")
      const response = await fetch("http://localhost:3000/api/scan-bin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Crucial for sending cookies
        body: JSON.stringify({
          binId: binId,
        }),
      })

      console.log("Response received:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect to bin")
      }

      setSuccess(`Successfully connected to bin! Location: ${data.binLocation}`)

      // Update user data in local storage
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      // Start redirecting countdown
      setRedirecting(true)
    } catch (err) {
      console.error("Error in scan request:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="scan-page">
      <div className="logo-container">
        <h1 className="logo">
          SUST<span className="logo-accent">AI</span>X
        </h1>
      </div>

      <main className="scan-main">
        <h1 className="scan-title">Connect to Bin</h1>

        <form onSubmit={handleSubmit} className="scan-form">
          <div className="form-group">
            <label htmlFor="binId">Enter Bin ID:</label>
            <input
              type="text"
              id="binId"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              placeholder="Scan or enter bin ID"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              {success}
              {redirecting && (
                <div className="redirect-message">Redirecting to Gate Control in {countdown} seconds...</div>
              )}
            </div>
          )}

          <button type="submit" disabled={isLoading || redirecting} className="scan-button">
            {isLoading ? "Connecting..." : "Connect"}
          </button>
        </form>

        {success && !redirecting && (
          <div className="instructions">
            <h3>Next Steps:</h3>
            <ol>
              <li>Approach the connected bin</li>
              <li>Dispose of your waste in the bin</li>
              <li>Your points will be updated automatically</li>
            </ol>
          </div>
        )}
      </main>

      <button onClick={() => navigate("/dashboard")} className="back-button" disabled={redirecting}>
        ← Back to Dashboard
      </button>
    </div>
  )
}

export default ScanPage



