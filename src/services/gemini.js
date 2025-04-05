import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

export const setupGemini = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  // Initialize the chat
  let chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{text: "You are BedsideKick, a friendly and empathetic AI companion for hospital patients. Your role is to provide emotional support and companionship. Be kind, understanding, and maintain a positive tone. Keep responses concise and natural."}]
      },
      {
        role: "model",
        parts: [{text: "I understand my role as BedsideKick. I'll be a compassionate and supportive companion, focusing on emotional support while keeping my responses friendly and natural."}]
      }
    ],
  });

  const generateResponse = async (audioData) => {
    try {
      if (!audioData) {
        throw new Error('No audio data provided');
      }

      console.log('Processing audio data...');

      const prompt = "Please listen to this audio and respond naturally as a friendly AI companion. If you hear a question, answer it. If you hear a statement, acknowledge it appropriately.";
      
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: "audio/wav",
            data: audioData
          }
        }
      ]);

      const response = await result.response;
      const responseText = response.text();
      
      console.log('Generated response:', responseText.substring(0, 50) + '...');
      
      return responseText;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  };

  return {
    generateResponse
  };
}; 