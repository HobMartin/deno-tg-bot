import { Composer } from "grammy";

import { mentionsAdmins } from "./commands/mentionAdmins.ts";
import { groupOnly } from "../../middleware/groupOnly.ts";

const bot = new Composer();

bot.on("::mention", groupOnly, mentionsAdmins);

// bot.on('poll', onlyAdmin, pinAdminPool);

export default bot;
