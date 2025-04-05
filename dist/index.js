"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const gemini_1 = require("./services/gemini");
const elevenlabs_1 = require("./services/elevenlabs");
const audio_1 = require("./services/audio");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// Initialize services
const geminiService = (0, gemini_1.setupGemini)();
const elevenLabsService = (0, elevenlabs_1.setupElevenLabs)();
const audioService = (0, audio_1.setupAudio)();
// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('startConversation', async () => {
        try {
            // Start audio recording
            const audioStream = await audioService.startRecording();
            // Process audio and get text
            const userInput = await audioService.processAudio(audioStream);
            // Get response from Gemini
            const response = await geminiService.getResponse(userInput);
            // Convert response to speech
            const audioResponse = await elevenLabsService.textToSpeech(response);
            // Send response back to client
            socket.emit('response', {
                text: response,
                audio: audioResponse
            });
        }
        catch (error) {
            console.error('Error in conversation:', error);
            socket.emit('error', 'An error occurred during the conversation');
        }
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
