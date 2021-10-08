import dbClient from '../utils/db';
import RedisClient from '../utils/redis';

class AppController {
  static Status(req, res) {
    res.status(200).send(
      { redis: RedisClient.isAlive(), db: dbClient.isAlive() },
    );
  }

  static async Stats(req, res) {
    res.status(200).send({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
  }
}

export default AppController;
