import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UserController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const exists = await dbClient.userExists(email);
    if (exists) return res.status(400).json({ error: 'Already exist' });

    const newUser = {
      email,
      password: sha1(password),
    };

    const userDB = await dbClient.addUser(newUser);

    return res.status(201).json({
      id: userDB.insertedId,
      email,
    });
  }

  static async me(req, res) {
    const token = req.headers['x-token'];
    if (!token) { return res.status(401).json({ error: 'Unauthorized' }); }

    const key = `auth_${token}`;
    const ID = await redisClient.get(key);
    console.log(ID);
    if (!ID) { return res.status(401).json({ error: 'Unauthorized' }); }

    const user = await dbClient.userByID(ID);

    return res.json({ id: user._id, email: user.email });
  }
}

export default UserController;
