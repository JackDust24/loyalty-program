import app from './app';
import { startListening } from './db/pgListener';

const port = process.env.PORT || 8080;

// We will put this in its own microservice
startListening()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Listener failed to start:', err);
    process.exit(1);
  });
