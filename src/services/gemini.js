import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const setupGemini = () => {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const history = [];

  const generateResponse = async (audioData) => {
    try {
      if (!audioData) {
        throw new Error('No audio data provided');
      }

      console.log('Processing audio data...');

      const prompt = `You are BedsideKick, a friendly and empathetic AI companion for hospital patients. Listen to the audio and respond appropriately. Respond in a single line JSON format.
      
      history: ${history.join('\n')}
      `;
      
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "audio/wav",
                  data: audioData
                }
              }
            ]
          }
        ],
        config: {
          temperature: 1,
          maxOutputTokens: 50,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: {
              voiceResponse: {
                type: 'string',
                description: 'Natural, empathetic response to what was said',
                nullable: false,
              },
              stressLevel: {
                type: 'integer',
                description: 'Stress level detected in audio (1: Very calm, 2: Mostly calm, 3: Neutral, 4: Stressed, 5: Highly stressed)',
                minimum: 1,
                maximum: 5,
                nullable: false,
              }
            },
            required: ['voiceResponse', 'stressLevel']
          }
        }
      });

      const response = await result.text;
      console.log('Raw response:', response);

      // Clean up the response by removing newlines and extra whitespace
      const cleanedResponse = response.replace(/\n/g, ' ').trim();
      console.log('Cleaned response:', cleanedResponse);

      const parsedResponse = JSON.parse(cleanedResponse);
      console.log('Parsed response:', parsedResponse);

      // Validate the response format
      if (!parsedResponse.voiceResponse || typeof parsedResponse.stressLevel !== 'number') {
        throw new Error('Invalid response format');
      }

      history.push(parsedResponse.voiceResponse);
      console.log('History:', history);
      
      return parsedResponse;
    } catch (error) {
      console.error('Error generating response:', error);
      // Return a fallback response instead of throwing
      return {
        voiceResponse: "I apologize, but I'm having trouble understanding right now. Could you please repeat that?",
        stressLevel: 3
      };
    }
  };

  return {
    generateResponse
  };
}; 