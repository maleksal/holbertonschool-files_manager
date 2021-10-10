import sha1 from 'sha1';
import dbClient from '../utils/db';

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

    return res.status(201).json({
      id: await dbClient.addUser(newUser).insertedId,
      email,
    });
  }
}

export default UserController;
