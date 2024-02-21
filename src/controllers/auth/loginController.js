const bcrypt = require('bcrypt');
const userModel = require('../../models/User');

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the submitted password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // At this point, the user has been authenticated
        // You can generate a token or handle the login response as needed
        // For demonstration, let's just return the user's data without sensitive information
        const { password: _, ...userDataWithoutPassword } = user.toObject();

        res.status(200).json({
            message: 'Login successful',
            data: userDataWithoutPassword
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Unable to login at the moment',
            error: err.message
        });
    }
};
