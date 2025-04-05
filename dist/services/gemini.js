"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGemini = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const setupGemini = () => {
    const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const getResponse = async (userInput) => {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const prompt = `You are BedsideKick, a friendly and empathetic AI companion for hospital patients. 
      Your role is to provide emotional support and companionship. 
      Be kind, understanding, and maintain a positive tone. 
      Keep responses concise and natural. 
      User: ${userInput}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error('Error getting response from Gemini:', error);
            return "I'm sorry, I'm having trouble understanding right now. Could you please repeat that?";
        }
    };
    return {
        getResponse
    };
};
exports.setupGemini = setupGemini;
