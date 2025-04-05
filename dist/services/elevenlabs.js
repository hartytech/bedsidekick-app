"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupElevenLabs = void 0;
const elevenlabs_1 = require("elevenlabs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const setupElevenLabs = () => {
    const client = new elevenlabs_1.ElevenLabsClient({
        apiKey: process.env.ELEVENLABS_API_KEY || ''
    });
    const textToSpeech = async (text) => {
        try {
            const audio = await client.textToSpeech({
                text,
                voiceId: process.env.ELEVENLABS_VOICE_ID || '',
                modelId: 'eleven_monolingual_v1',
                voiceSettings: {
                    stability: 0.5,
                    similarityBoost: 0.75
                }
            });
            return Buffer.from(await audio.arrayBuffer());
        }
        catch (error) {
            console.error('Error converting text to speech:', error);
            throw error;
        }
    };
    return {
        textToSpeech
    };
};
exports.setupElevenLabs = setupElevenLabs;
