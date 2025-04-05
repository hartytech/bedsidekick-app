import dotenv from 'dotenv';

dotenv.config();

export const setupElevenLabs = () => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey) {
    console.error('ELEVENLABS_API_KEY is not set in environment variables');
    throw new Error('ELEVENLABS_API_KEY is required');
  }

  if (!voiceId) {
    console.error('ELEVENLABS_VOICE_ID is not set in environment variables');
    throw new Error('ELEVENLABS_VOICE_ID is required');
  }

  console.log('Initializing ElevenLabs with voice ID:', voiceId);

  const textToSpeech = async (text) => {
    try {
      console.log('Converting text to speech:', text.substring(0, 50) + '...');
      
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              speed: 1.0,
              stability: 1.0,
              similarity_boost: 0.84,
              use_speaker_boost: true,
              style: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
      }

      console.log('Audio stream created, starting to process...');
      
      // Get the response as an array buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Emit the audio buffer as a single chunk
      console.log('Emitting audio chunk, size:', buffer.length, 'bytes');
      process.emit('audioChunk', buffer);

      return null;
    } catch (error) {
      console.error('Error in textToSpeech:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        status: error.status
      });
      throw error;
    }
  };

  return {
    textToSpeech
  };
}; 