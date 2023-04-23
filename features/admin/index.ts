import { Composer } from "../../deps.deno.ts";

import { mentionsAdmins } from "./commands/mentionAdmins.ts";
import { groupOnly } from "../../middleware/groupOnly.ts";
import { mentionsAll } from "./commands/mentionAll.ts";
import { adminOnly } from "../../middleware/adminOnly.ts";

const bot = new Composer();

bot.on("::mention", groupOnly, mentionsAdmins);
bot.command("mention_all", groupOnly, adminOnly, mentionsAll);

// bot.on('poll', onlyAdmin, pinAdminPool);

export default bot;
