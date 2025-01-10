import React, { useState } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token)
      console.log(decoded)
      return decoded // This will return the decoded token's payload
    } catch (error) {
      console.error("Invalid token", error)
      return null
    }
  }

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/user/${userId}/`)
      console.log("User data:", response.data)
      localStorage.setItem("userName", response.data.username)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      })

      // Save the token in localStorage or state
      localStorage.setItem("access_token", response.data.access)
      localStorage.setItem("refresh_token", response.data.refresh)

      // Redirect to another page or update UI
      console.log("Logged in successfully!")
      setMessage("Login successful")
      const decodedToken = decodeToken(response.data.access)
      console.log("decoded token is:", decodedToken)
      fetchUserData(decodedToken.user_id)
    } catch (err) {
      setMessage("Invalid credentials")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
