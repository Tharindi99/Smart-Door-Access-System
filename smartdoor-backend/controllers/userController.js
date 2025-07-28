const { User } = require('../models');

/**
 * GET /users   – list all users
 */
exports.getAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('getAllUsers error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * GET /users/:id  – get a specific user by ID
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  // Find user by primary key
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('getUserById error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * POST /users  – create a new user
 * expected JSON body:
 * { "name":"...", "email":"...", "username":"...", "passwordHash":"...", "role":"EMPLOYEE" }
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, username, passwordHash, role } = req.body;
    if (!name || !email || !username || !passwordHash || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = await User.create({
      name,
      email,
      username,
      passwordHash,      // hash later with bcrypt
      role,
      lastLogin: new Date(),
      isActive: true
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error('createUser error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * PUT /users/:id  – update an existing user
 * expected JSON body:
 * { "name":"...", "email":"...", "username":"...", "passwordHash":"...", "role":"EMPLOYEE" }
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email, username, passwordHash, role } = req.body;

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.passwordHash = passwordHash || user.passwordHash;
    user.role = role || user.role;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error('updateUser error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * DELETE /users/:id  – delete a specific user by ID
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).json();  // No content (successfully deleted)
  } catch (err) {
    console.error('deleteUser error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
