import { getAuth } from 'firebase-admin/auth'
import app from '../config/firebase.js';
import User from '../models/user.model.js';
import redis from '../../../shared/redis/redis.js';

export const login = async (req, res) => {
    try{

        const { token } = req.body;
        const decodedToken = await getAuth(app).verifyIdToken(token);

        const uid = decodedToken.uid;

        let user = await User.findOne({firebaseUid : uid });

        if(!user){
            
            user = await User.create({
                firebaseUid: uid,
                name: decodedToken.name,
                email: decodedToken.email,
                avatar: decodedToken.picture
            })
        }

        const sessionId = crypto.randomUUID();

        await redis.set(
            `session: ${sessionId}`,
            JSON.stringify({ 
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }),
            'EX', 7 * 24 * 60 * 60
        );

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

export const logout = async (req, res) => {
    try{
        const sessionId = req.cookies?.session;

        if(sessionId){
            await redis.del(`session: ${sessionId}`);
        }

        res.clearCookie('session', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });

        return res.status(200).json({ message: 'Logout successful' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}