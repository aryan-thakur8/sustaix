"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/WasteDetectionPage.css"

function WasteDetectionPage() {
  const { binId } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const [cameraActive, setCameraActive] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [points, setPoints] = useState(0)

  // Start camera when component mounts
  useEffect(() => {
    startCamera()

    // Clean up camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera. Please check permissions.")
    }
  }

  const captureImage = () => {
    if (!cameraActive || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to data URL (base64 image)
    // const imageData = canvas.toDataURL('image/jpeg')

    // In a real app, you would send this image to your backend for YOLOv8 processing
    // For now, we'll simulate the detection process
    simulateWasteDetection()
  }

  const simulateWasteDetection = () => {
    setProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      // Randomly select a waste type
      const wasteTypes = ["Plastic", "Biodegradable", "Metallic", "Unknown"]
      const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)]

      // Assign points based on waste type
      let pointsEarned = 0
      switch (randomType) {
        case "Plastic":
          pointsEarned = 15
          break
        case "Biodegradable":
          pointsEarned = 10
          break
        case "Metallic":
          pointsEarned = 20
          break
        default:
          pointsEarned = 5
      }

      // Update user's points in local storage
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      const updatedPoints = (userData.points || 0) + pointsEarned
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          points: updatedPoints,
        }),
      )

      setResult({
        wasteType: randomType,
        confidence: Math.floor(Math.random() * 30 + 70), // Random confidence between 70-99%
      })
      setPoints(pointsEarned)
      setProcessing(false)
    }, 3000)
  }

  const handleReturnToDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <div className="waste-detection-page">
      <div className="logo-container">
        <h1 className="logo">
          SUST<span className="logo-accent">AI</span>X
        </h1>
      </div>

      <main className="waste-detection-main">
        <h1 className="waste-detection-title">Waste Detection</h1>

        <div className="camera-container">
          {error ? (
            <div className="camera-error">{error}</div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`camera-feed ${processing || result ? "dimmed" : ""}`}
                onLoadedMetadata={() => {
                  // Auto-capture image after camera loads
                  if (!processing && !result) {
                    captureImage()
                  }
                }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />

              {processing && (
                <div className="processing-overlay">
                  <div className="spinner"></div>
                  <h2>Processing Waste...</h2>
                  <p>Analyzing image with YOLOv8 model</p>
                </div>
              )}

              {result && (
                <div className="result-overlay">
                  <div className={`result-icon ${result.wasteType.toLowerCase()}`}>
                    {result.wasteType === "Plastic" && "♳"}
                    {result.wasteType === "Biodegradable" && "🌱"}
                    {result.wasteType === "Metallic" && "🔧"}
                    {result.wasteType === "Unknown" && "❓"}
                  </div>
                  <h2>Waste Detected!</h2>
                  <div className="result-details">
                    <p className="result-type">
                      Type: <span>{result.wasteType}</span>
                    </p>
                    <p className="result-confidence">
                      Confidence: <span>{result.confidence}%</span>
                    </p>
                    <p className="result-points">
                      Points Earned: <span>+{points}</span>
                    </p>
                  </div>
                  <button className="return-button" onClick={handleReturnToDashboard}>
                    Return to Dashboard
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default WasteDetectionPage

