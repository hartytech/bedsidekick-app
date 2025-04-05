import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { setupGemini } from './services/gemini.js';
import { setupElevenLabs } from './services/elevenlabs.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Serve static files
app.use(express.static('public'));

// Initialize services
const gemini = setupGemini();
const elevenlabs = setupElevenLabs();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // Listen for audio chunks
  process.on('audioChunk', (audioData) => {
    console.log('Server sending audio chunk, size:', audioData.length);
    try {
      ws.send(JSON.stringify({ 
        type: 'audio', 
        data: audioData.toString('base64') 
      }));
      console.log('Audio chunk sent successfully');
    } catch (error) {
      console.error('Error sending audio chunk:', error);
    }
  });

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'start') {
        // Make sure we have audio data to process
        if (!data.audio) {
          throw new Error('No audio data provided in message');
        }

        console.log('Received audio data, format:', data.format);
        console.log('Audio data size:', data.audio.length);

        // Get response from Gemini
        const response = await gemini.generateResponse(data.audio);
        console.log('Gemini response:', response);
        
        // Send text response to client
        ws.send(JSON.stringify({ type: 'text', data: response }));
        
        // Convert to speech
        await elevenlabs.textToSpeech(response);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      ws.send(JSON.stringify({ type: 'error', data: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 