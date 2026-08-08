import { getAuth } from 'firebase-admin/auth'
import app from '../config/firebase.js';
import User from '../models/user.model.js';

export const login = async (req, res) => {
    try{

        const { token } = req.body;
        const decodedToken = await getAuth(app).verifyIdToken(token);

        const uid = decodedToken.uid;

        let user = await User.findOne({firebaseUid : uid });

        console.log("Decoded Token: ", decodedToken);
        console.log("User: ", user);

        if(!user){
            console.log("User not found, creating new user");
            user = await User.create({
                firebaseUid: uid,
                name: decodedToken.name,
                email: decodedToken.email,
                avatar: decodedToken.picture
            })
        }

        const sessionId = crypto.randomUUID();

        res.cookie('session', sessionId, { 
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}