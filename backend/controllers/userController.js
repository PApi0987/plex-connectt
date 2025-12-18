// controllers/userController.js

// In-memory storage (temporary)
const users = [];
const transactions = [];

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

// Get all users
export const getUsers = (req, res) => {
  res.json({
    status: true,
    users
  });
};

// 💰 Fund wallet (manual for now)
export const fundWallet = (req, res) => {
  const { user_id, amount } = req.body;

  if (!user_id || !amount || amount <= 0) {
    return res.status(400).json({
      status: false,
      message: 'Invalid funding request'
    });
  }

  const user = users.find(u => u.id === user_id);
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found'
    });
  }

  user.wallet_balance += amount;

  const transaction = {
    id: transactions.length + 1,
    user_id,
    type: 'FUND',
    amount,
    status: 'SUCCESS',
    date: new Date()
  };

  transactions.push(transaction);

  res.json({
    status: true,
    message: 'Wallet funded successfully',
    wallet_balance: user.wallet_balance,
    transaction
  });
};

// 📊 Get wallet balance
export const getWalletBalance = (req, res) => {
  const userId = Number(req.params.userId);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found'
    });
  }

  res.json({
    status: true,
    wallet_balance: user.wallet_balance
  });
};

// 🧾 Get user transactions
export const getUserTransactions = (req, res) => {
  const userId = Number(req.params.userId);

  const userTx = transactions.filter(tx => tx.user_id === userId);

  res.json({
    status: true,
    transactions: userTx
  });
};
