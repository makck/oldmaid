import { resolve } from 'path';
import db from './models/index.mjs';

import initGamesController from './controllers/games.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const GamesController = initGamesController(db);
  const UserController = initUsersController(db);

  // Main index page for game
  // app.get('/', GamesController.index);
  app.get('/', (req, res) => {
    res.sendFile(resolve('dist', 'index.html'));
  });

  // Create a new game
  app.post('/game', GamesController.createGame);

  // Update when player discards card from hand
  app.put('/game/:id/discard', GamesController.discardCard);

  // AI play when player is done with his turn
  app.put('/game/:id/ai-play', GamesController.aiPlay);

  // user login
  app.post('/login', UserController.login);
}
