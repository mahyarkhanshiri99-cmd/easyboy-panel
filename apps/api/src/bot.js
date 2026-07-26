const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/User");
const Group = require("./models/Group");
const createLog = require("./utils/createLog");

function startBot() {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
        console.log("⚠️ TELEGRAM_BOT_TOKEN not set, bot disabled");
        return;
    }

    const bot = new TelegramBot(token, { polling: true });

    // /start in private chat
    bot.onText(/\/start/, async (msg) => {
        if (msg.chat.type !== "private") return;

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

            bot.sendMessage(chatId, `سلام ${name}! خوش اومدی 🎉`);

        } catch (error) {
            console.log("Bot error:", error.message);
        }
    });

    // Bot added/removed from a group
    bot.on("my_chat_member", async (update) => {
        try {
            const chat = update.chat;

            if (chat.type !== "group" && chat.type !== "supergroup") return;

            const chatId = String(chat.id);
            const newStatus = update.new_chat_member.status;

            const isActive = ["member", "administrator", "creator"].includes(newStatus);
            const isRemoved = ["left", "kicked"].includes(newStatus);

            let group = await Group.findOne({ chatId });

            if (isActive) {
                let membersCount = 0;

                try {
                    membersCount = await bot.getChatMemberCount(chatId);
                } catch (e) {
                    membersCount = 0;
                }

                if (!group) {
                    group = await Group.create({
                        name: chat.title || "Unknown Group",
                        chatId,
                        members: membersCount,
                        status: "Active",
                        botStatus: "Online"
                    });

                    console.log(`👥 New group saved: ${chat.title}`);

                    await createLog(
                        "Group Added",
                        `Bot added to ${chat.title}`,
                        chatId
                    );

                } else {
                    group.name = chat.title || group.name;
                    group.members = membersCount;
                    group.status = "Active";
                    group.botStatus = "Online";
                    await group.save();
                }

            } else if (isRemoved && group) {
                group.status = "Disabled";
                group.botStatus = "Offline";
                await group.save();

                await createLog(
                    "Group Removed",
                    `Bot removed from ${group.name}`,
                    chatId
                );
            }

        } catch (error) {
            console.log("Group tracking error:", error.message);
        }
    });

    console.log("🤖 Telegram bot started");
}

module.exports = startBot;