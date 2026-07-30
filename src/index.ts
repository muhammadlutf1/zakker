import Bot from "./core/Bot";
import commandLoader from "./core/loaders/commandLoader";
import eventLoader from "./core/loaders/eventLoader";

const bot = new Bot(commandLoader, eventLoader);

bot.login();
