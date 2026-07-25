const Log = require("../models/Log");

async function createLog(action, details = "", userId = "") {
    try {
        await Log.create({ action, details, userId });
    } catch (error) {
        console.log("Log error:", error.message);
    }
}

module.exports = createLog;