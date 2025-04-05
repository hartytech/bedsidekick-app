# BedSidekick

**BedSidekick** is an AI-powered hospital bedside companion designed to support the psychological welfare of patients — from children undergoing chemotherapy to seniors living in long-term care. It provides real-time emotional support, intelligent conversation, and mood monitoring through a friendly, character-driven interface.

![BedSidekick Hero Image - Optional mockup]

## Features

- Real-time conversation with AI using Google's Gemini
- Natural voice interaction using ElevenLabs
- LCD display for visual feedback
- Audio input/output capabilities
- Emotional support and companionship

## Hardware Requirements

- Raspberry Pi (recommended: Raspberry Pi 4)
- USB Microphone
- Speaker or audio output device
- 16x2 LCD Display with I2C interface
- Internet connection

## Software Requirements

- Node.js (v16 or higher)
- npm (v7 or higher)
- TypeScript
- Python (for some audio dependencies)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bedsidekick.git
   cd bedsidekick
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   - Add your Google Gemini API key
   - Add your ElevenLabs API key and voice ID
   - Adjust LCD and audio settings if needed

5. Build the project:
   ```bash
   npm run build
   ```

6. Start the application:
   ```bash
   npm start
   ```

## Development

To run the application in development mode:
```bash
npm run dev
```

## API Keys

You'll need to obtain the following API keys:

1. Google Gemini API Key:
   - Visit the Google Cloud Console
   - Create a new project
   - Enable the Gemini API
   - Create credentials

2. ElevenLabs API Key:
   - Sign up at ElevenLabs
   - Create an API key
   - Choose a voice ID

## Hardware Setup

1. Connect the LCD display:
   - Connect VCC to 5V
   - Connect GND to GND
   - Connect SDA to GPIO 2
   - Connect SCL to GPIO 3

2. Connect the microphone:
   - Plug in a USB microphone
   - Test the microphone using `arecord -l`

3. Connect the speaker:
   - Plug in speakers or headphones
   - Test the audio using `aplay -l`

## Troubleshooting

1. If the LCD display isn't working:
   - Check the I2C address using `i2cdetect -y 1`
   - Verify the wiring connections
   - Ensure the LCD is properly initialized

2. If audio isn't working:
   - Check if the microphone is detected: `arecord -l`
   - Verify audio output: `aplay -l`
   - Check the audio device configuration in `.env`

3. If the AI responses aren't working:
   - Verify your API keys
   - Check your internet connection
   - Ensure the services are running properly

## License

MIT License - See LICENSE file for details

## 🧠 What It Does

- Offers **real-time conversation** powered by Gemini AI to keep patients engaged and comforted.
- Uses **Eleven Labs voice synthesis** for natural, character-based speech (e.g., Big Bird for kids).
- Monitors patient emotional state via voice cues and interaction patterns.
- Can **alert caregivers** or hospital staff if emotional abnormalities are detected.
- Customizable appearance and voice to align with patient age, interests, and needs.

## 📦 Hardware + Software

- **Hardware:** Raspberry Pi, LCD screen, microphone & speaker setup.
- **Software Stack:** Python, Gemini API, Eleven Labs API, emotion inference module, hospital-safe interface layer.
- **Interface:** Friendly animated avatar with simple patient-friendly UI and subtle motorized gestures (head nodding, etc.).

## 🏥 Use Cases

- Pediatric wards to engage and comfort children undergoing treatment.
- Elderly patients in long-term care or home settings who are isolated or bedridden.
- Post-operative or oncology patients recovering over long hospital stays.

## 🚨 Key Features

- Conversational AI with real-time emotional understanding.
- Mood tracking and escalation logic.
- Personalized voices and character selection (e.g., Big Bird, soothing adult companions).
- Modular setup for hospital or home environments.

## 🔒 Privacy & Compliance

- Designed with **HIPAA-compliant architecture**.
- Patient data stays local or encrypted when transmitted.
- No clinical diagnoses — used as a **general wellness device**.

## 🛠 Setup (Coming Soon)

> Full install and configuration instructions for Raspberry Pi + LCD interface, API setup, and sample character templates will be provided in future commits.

---

## 🙌 Contributing

We welcome collaboration from developers, healthcare professionals, and UX designers. Submit pull requests, ideas, or reach out if you'd like to help make BedSidekick even more impactful.

## 📄 License

MIT License (see LICENSE file).

---

## 💙 "Sometimes comfort is just a conversation away."

