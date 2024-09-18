

















const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUxzcVFCNUw3U3A5cmlpOENjMkFBTy83VG5Sa3ZCNTFBbWsvWGFRb04xTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT2pnOW1WNTNWNU82VVV6VUthYzRINXo4V1p5b2tPSlRDTTg1RjhiUE9Sbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRHlLV0xKN1l2STNVSHJMbTFZQVBDWldNVUlzTTFmN2wwekdoZnliKzBrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWWkhhUUZoeU40U25MNGZDR2hNMElUS3V5VjAwdWJ4UXVxNms3VUMvVG1nPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBGSzdBRU4wYjNlSjRqUWVwMUR0UUZGbDQ2YStYTDFzQ0QzRTdHV3UybVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVIMTJPVllFeklDWm5OQ2o0N3kwSktYeDBBRTBpRXlsSWN3ZXdJN2ttbWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0QwUDVheXk2RWdsMVo0d0VyRzNSZmIyRldPcVdmeFVJWC9MUUNhU1lIMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZnl4Vyt6N2lrdXlZbkd0YU9DSEVVOXc3T29wbk9KVGJOc0JVbXJoZ2ZCcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFVVnByMzd0S09DZ1pEN3VBT09WQWpSNzhRNFA4Z1hnOElVU0ljOXVsbGpEV1F3cmdhMmNPSng5ZHVaNzlOU1JTNFVHVnhyYlBRNnN3aitYVFJkVURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiJseWl0NHJPTnowcEFZcXRsazc3S2JIbGZDWnVYdVRrOWVPcmJHTm8rZHh3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsQVpnZVVvR1RoT3E0SS1ibktuMWNnIiwicGhvbmVJZCI6IjQwZDA4M2JhLWZiMDMtNDMyYi1iMzQwLTZhNmQ0ZTk0M2QyNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhMkw3UGVYQy8zRU96dXhqc3MydlVwcDYyMFE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnJKbjl1bG83OENFSW9UdVA1TVkrSTZQUjBzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQxV0pLR0w1IiwibWUiOnsiaWQiOiI5MjMxODk0OTI5OTU6MjJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1B2dC9NOEdFTTJuckxjR0dDUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjN6OS9KWkRXZVQwYVFNeFpaVUN4ZE5jOTNMaEliaW92RGhHNkY0WlN0Z2c9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImNUZ0l3TUJTajRabk5PYWJ0ZVQwNVFhdm5NdUhrcXpFTWhXWVZsY3F0UTIxbmtFTHhIVzJESXFJczNjWnJKTGsyR1FSaXZOQXBVR0ZuV3VKbG5LS0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJKZm51VTNrNEd1Vmo3c01nOG9hNURsYWV5SlI5aVhpNGZaSTBMZ3FpcGE3ZXlzOG94eExrNzBxOHl6by9aMFBmNVlPTFJLYTBrZUVzYjRoUXBWQVBEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzE4OTQ5Mjk5NToyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkOC9meVdRMW5rOUdrRE1XV1ZBc1hUWFBkeTRTRzRxTHc0UnVoZUdVcllJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2NjgyMDczfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "AWAIS IQBAL",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " W A S I",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'Devil_md',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0f089184835ed3d3b1f8c.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'unavailable',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

