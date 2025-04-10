import { Client } from 'pg';
import { config } from 'dotenv';

config();

const client = new Client({
  connectionString: process.env.SUPABASE_DB_URL,
});

const startListening = async () => {
  try {
    await client.connect();

    await client.query('LISTEN profile_created');

    client.on('notification', (msg) => {
      if (msg.channel === 'profile_created') {
        console.log(`Received notification: ${msg.payload}`);
      }
    });
  } catch (error) {
    console.error('Error while starting the listener:', error);
  }
};

// Optionally, export the function to allow it to be triggered from elsewhere in your app
export { startListening };
