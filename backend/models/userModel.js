import bcrypt from "bcryptjs";

let users = []; // mock database

export const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashedPassword, wallet: 0 };
  users.push(user);
  return user;
};

export const findUserByEmail = (email) => users.find(u => u.email === email);
export const findUserById = (id) => users.find(u => u.id === id);
export const updateWallet = (userId, amount) => {
  const user = findUserById(userId);
  if (user) user.wallet += amount;
  return user?.wallet;
};
