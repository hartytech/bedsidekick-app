"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAudio = void 0;
const node_record_lpcm16_1 = __importDefault(require("node-record-lpcm16"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const setupAudio = () => {
    const startRecording = () => {
        return new Promise((resolve, reject) => {
            try {
                const config = {
                    sampleRate: parseInt(process.env.SAMPLE_RATE || '16000'),
                    channels: 1,
                    device: process.env.AUDIO_DEVICE || 'plughw:1,0',
                    audioType: 'raw'
                };
                const audioStream = node_record_lpcm16_1.default.record(config);
                resolve(audioStream);
            }
            catch (error) {
                console.error('Error starting audio recording:', error);
                reject(error);
            }
        });
    };
    const processAudio = async (audioStream) => {
        return new Promise((resolve, reject) => {
            try {
                const chunks = [];
                audioStream.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                audioStream.on('end', () => {
                    const audioData = Buffer.concat(chunks);
                    // TODO: Implement speech-to-text conversion
                    // For now, return a placeholder response
                    resolve("I understand you're feeling this way. How can I help you today?");
                });
                audioStream.on('error', (error) => {
                    console.error('Error processing audio:', error);
                    reject(error);
                });
            }
            catch (error) {
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
exports.setupAudio = setupAudio;
