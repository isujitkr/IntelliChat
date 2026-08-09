import redis from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
    try{
        const sessionId = req.cookies?.session;

        if(!sessionId){
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const sessionData = await redis.get(`session: ${sessionId}`);

        if(!sessionData){
            return res.status(401).json({ error: 'Session expired or invalid' });
        }

        req.user = JSON.parse(sessionData);
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default protect;