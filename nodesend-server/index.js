const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")


// Server creation
const app = express()

// Connect DB
connectDB()

// Enable cors
const corsOptions = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(corsOptions))

// App Port
const port = process.env.Port || 4000

// Enable read body values
app.use(express.json())

// Allow public folder
app.use(express.static("uploads"))

// App routes
app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/urls", require("./routes/urls"))
app.use("/api/files", require("./routes/files"))

// Start App
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at port ${port}`)
})