import record from 'node-record-lpcm16';
import dotenv from 'dotenv';

dotenv.config();

export const setupAudio = () => {
  let currentRecording = null;

  const startRecording = () => {
    return new Promise((resolve, reject) => {
      try {
        currentRecording = record.record({
          sampleRate: 16000,
          channels: 1,
          silence: '1.0',
          recorder: 'sox',
          device: process.env.AUDIO_DEVICE || 'default',
          audioType: 'wav'
        });

        const stream = currentRecording.stream();
        
        stream.on('error', (err) => {
          console.error('Recorder error:', err);
          reject(err);
        });

        resolve(stream);
      } catch (error) {
        console.error('Error starting audio recording:', error);
        reject(error);
      }
    });
  };

  const processAudio = async (stream) => {
    return new Promise((resolve, reject) => {
      try {
        const chunks = [];
        
        stream.on('data', (chunk) => {
          chunks.push(chunk);
        });

        stream.on('end', () => {
          try {
            const audioData = Buffer.concat(chunks);
            // For now, return a placeholder response
            resolve("I understand you're feeling this way. How can I help you today?");
          } catch (error) {
            reject(error);
          }
        });

        // Set a timeout to stop recording after 5 seconds
        setTimeout(() => {
          if (currentRecording) {
            currentRecording.stop();
          }
        }, 5000);

      } catch (error) {
        console.error('Error in audio processing:', error);
        reject(error);
      }
    });
  };

  return {
    startRecording,
    processAudio
  };
}; 