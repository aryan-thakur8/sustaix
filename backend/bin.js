const express = require("express")
const app = express()
const path = require("path")
const userModel = require("./models/bins")
const binModel = require("./models/binModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")

// Load environment variables
dotenv.config()

// Middleware

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Required for cookies
    exposedHeaders: ["set-cookie"], // Optional but helpful
  }),
)
app.use(cookieParser()) // ← Add this line

app.use(express.json())
// API Routes
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
    endpoints: {
      login: "POST /api/login",
      register: "POST /api/register",
      user: "GET /api/user",
      scan: "POST /api/scan-bin",
    },
  })
})

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const token = jwt.sign({ email: user.email, userid: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        points: user.points || 0,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})
const authenticate = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userid = decoded.userid // ← Attach user ID to request
    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" })
  }
}
// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { name, rollNo, batch, email, phone, password } = req.body

    if (!name || !rollNo || !batch || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: "User already registered" })
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userModel.create({
      name,
      rollNo,
      batch,
      email,
      phone,
      password: hashedPassword,
      points: 0,
    })

    const token = jwt.sign({ email: newUser.email, userid: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        points: newUser.points,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// User data endpoint
app.get("/api/user", authenticate, async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.userid).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("User data error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Bin scanning endpoint
app.post("/api/scan-bin", authenticate, async (req, res) => {
  console.log("Scan bin request received:", req.body)
  console.log("User ID from token:", req.userid)

  try {
    const { binId } = req.body
    const userId = req.userid

    if (!binId) {
      console.log("Missing bin ID in request")
      return res.status(400).json({ error: "Bin ID is required" })
    }

    console.log("Looking for bin with ID:", binId)
    const bin = await binModel.findById(binId)
    if (!bin) {
      console.log("Bin not found in database")
      return res.status(404).json({ error: "Bin not found" })
    }

    console.log("Bin found:", bin)
    console.log("Updating user points...")

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: { lastScannedBin: binId },
          $inc: { points: 10 },
        },
        { new: true },
      )
      .select("-password")

    if (!user) {
      console.log("User not found in database")
      return res.status(404).json({ error: "User not found" })
    }

    console.log("User updated successfully:", user)

    res.json({
      success: true,
      message: `Connected to bin ${binId} successfully!`,
      binLocation: bin.location,
      acceptedWasteType: bin.acceptedWasteType,
      user: user,
      pointsAdded: 10,
    })
  } catch (error) {
    console.error("Scan bin error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

