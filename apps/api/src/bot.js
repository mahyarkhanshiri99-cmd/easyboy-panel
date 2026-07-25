const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/User");
const createLog = require("./utils/createLog");

function startBot() {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
        console.log("⚠️ TELEGRAM_BOT_TOKEN not set, bot disabled");
        return;
    }

    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        const telegramId = String(msg.from.id);
        const name = [msg.from.first_name, msg.from.last_name]
            .filter(Boolean)
            .join(" ");
        const username = msg.from.username ? "@" + msg.from.username : "";

        try {
            let user = await User.findOne({ telegramId });

            if (!user) {
                user = await User.create({
                    name: name || "Unknown",
                    username,
                    telegramId,
                    role: "User",
                    status: "Active"
                });

                console.log(`👤 New user saved: ${name} (${telegramId})`);

                await createLog(
                    "User Joined",
                    `${name} started the bot`,
                    user._id.toString()
                );
            }

            bot.sendMessage(chatId, `سلاممممم ${name}! خیلیی خوش اومدی 🎉`);

        } catch (error) {
            console.log("Bot error:", error.message);
        }
    });

    console.log("🤖 Telegram bot started");
}

module.exports = startBot;