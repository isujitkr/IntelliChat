const getCurrentUser = async (req, res) => {
    try{
        return res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default getCurrentUser;