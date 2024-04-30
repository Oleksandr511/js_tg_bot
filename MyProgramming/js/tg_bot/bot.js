require('dotenv').config();

const MY_TOKEN = process.env.MY_TOKEN;

const TelegramBot = require('node-telegram-bot-api');

const token = MY_TOKEN; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

let symbol = '.'
let isSymbol = false
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const messageId = msg.message_id;
    const firstName = msg.from.first_name

    if (isSymbol) {
        symbol = messageText
        isSymbol = false
        bot.deleteMessage(chatId, messageId);
    } else {
        if (messageText === '/symbol') {
            isSymbol = true
        }
        if (messageText === '/start') {
            bot.sendMessage(chatId, 'Welcome to the bot!');
        }
        else {
            const modifiedMessage = `${firstName} - ${messageText}${symbol}`;
            
            bot.sendMessage(chatId, modifiedMessage).then(() => {
                
                bot.deleteMessage(chatId, messageId);
            })
            
                .catch ((er) => {
                bot.sendMessage(chatId, er)
            })
        }
    }
});