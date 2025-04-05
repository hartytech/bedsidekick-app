"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLCD = void 0;
const lcd_1 = require("lcd");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const setupLCD = () => {
    const lcd = new lcd_1.LCD({
        rs: 27,
        e: 22,
        data: [25, 24, 23, 18],
        cols: parseInt(process.env.LCD_COLUMNS || '16'),
        rows: parseInt(process.env.LCD_ROWS || '2')
    });
    const displayMessage = async (message) => {
        return new Promise((resolve, reject) => {
            try {
                // Clear the display
                lcd.clear();
                // Split message into lines that fit the LCD
                const lines = message.match(new RegExp(`.{1,${lcd.cols}}`, 'g')) || [];
                // Display each line
                lines.forEach((line, index) => {
                    if (index < lcd.rows) {
                        lcd.setCursor(0, index);
                        lcd.print(line);
                    }
                });
                resolve();
            }
            catch (error) {
                console.error('Error displaying message on LCD:', error);
                reject(error);
            }
        });
    };
    return {
        displayMessage
    };
};
exports.setupLCD = setupLCD;
