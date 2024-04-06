// Middleware for role authorization
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Unauthorized. Admin role required.' });
    }
    next();
};

const authorizeEditor = (req, res, next) => {
    if (req.user.role !== 'Editor' && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Unauthorized. Editor or Admin role required.' });
    }
    next();
};

// Example route to assign roles (only accessible by Admins)
app.put('/users/:id/role', authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Ensure only 'Editor' or 'Viewer' roles are assigned
        if (role !== 'Editor' && role !== 'Viewer') {
            return res.status(400).json({ message: 'Invalid role. Only "Editor" or "Viewer" can be assigned.' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Assign the role
        user.role = role;
        await user.save();

        res.json({ message: `Role "${role}" assigned to user "${user.username}" successfully.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Example route to edit a post (accessible by Editors and Admins)
app.put('/posts/:id', authorizeEditor, async (req, res) => {
    // Your update post logic here
});

// Example route to delete a post (only accessible by Admins)
app.delete('/posts/:id', authorizeAdmin, async (req, res) => {
    // Your delete post logic here
});
