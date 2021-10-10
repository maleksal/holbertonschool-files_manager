import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import dbClient from '../utils/db';
import RedisClient from '../utils/redis';

class AuthController {
  static async connect(req, res) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'Unauthorized' });

    if (!(authorization.slice(0, 6) === 'Basic ')) return res.status(401).json({ error: 'Unauthorized' });

    const authData = Buffer.from(authorization.slice(6), 'base64').toString('utf-8');
    const email = authData.split(':')[0];
    const pass = authData.split(':')[1];

    if (!email || !pass) return res.status(401).json({ error: 'Unauthorized' });

    const user = await dbClient.userExists(email);

    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    if (!user.password || user.password !== sha1(pass)) return res.status(401).json({ error: 'Unauthorized' });

    const token = uuidv4();
    RedisClient.set(`auth_${token}`, user._id.toString(), 86400);
    return res.status(200).json({ token });
  }

  static async disconnect(req, res) {
    const redisUserKey = `auth_${req.token}`;
    RedisClient.del(redisUserKey);

    return res.status(204).end();
  }
}

export default AuthController;
