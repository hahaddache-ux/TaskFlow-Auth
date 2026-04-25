import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    // Check if user exists
    const [existing] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email]
    )
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10)

    // Save user
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    )

    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check user
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email]
    )
    const user = rows[0]
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Check password
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ message: 'Wrong password' })

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Logout (Frontend side)
export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' })
}