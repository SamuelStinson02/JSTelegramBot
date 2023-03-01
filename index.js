const TelegramBot = require('node-telegram-bot-api');
const token = '6142111789:AAG3c4DsVjYXS5mAWaAjlVZrsTnpwQD0wM4';
const bot = new TelegramBot(token, {polling:true});

bot.on('polling_error', function(error){
    console.log(error);
});

bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    bot.sendMessage(chatId, "Bienvenido a mi bot " + nameUser);
});

bot.onText(/^\/botones/, function (msg){
    var chatId = msg.chat.id;

    var botones = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Boton 1", callback_data: 'btn1'},
                    {text: "Boton 2", callback_data: 'btn2'}
                ]
            ]
        }
    }

    bot.sendMessage(chatId, "Texto con botones, ", botones);

    bot.sendMessage(chatId, "Texto 2 con botones, ",
        { reply_markup: {
                    inline_keyboard: [
                        [
                            {text: "Boton 3", callback_data: 'btn3'},
                            {text: "Boton 4", callback_data: 'btn4'}
                        ]
                    ]
            }});

    bot.on('callback_query', function onCallbackQuery(accionboton){
        const data = accionboton.data
        if (data === 'btn1'){
            bot.answerCallbackQuery({
                callback_query_id: accionboton.id,
                text: 'Accion 1',
                show_alert: true
            })
        }
        if (data === 'btn2'){
            bot.answerCallbackQuery({
                callback_query_id: accionboton.id,
                text: 'Accion 2',
                show_alert: false
            })
        }
        if (data === 'btn3'){
            bot.sendMessage(chatId, 'Accion 3')
        }
        if (data === 'btn4'){
            bot.sendMessage(chatId, 'Accion 4')
        }
    })
});