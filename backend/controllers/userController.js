// controllers/userController.js

// Temporary in-memory users (later we’ll use database)
const users = [];

// Register user
export const registerUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      status: false,
      message: 'Name and email are required'
    });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      status: false,
      message: 'User already exists'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    wallet_balance: 0
  };

  users.push(newUser);

  res.status(201).json({
    status: true,
    message: 'User registered successfully',
    user: newUser
  });
};

// Get all users (admin)
export const getUsers = (req, res) => {
  res.json({
    status: true,
    users
  });
};
