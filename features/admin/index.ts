import { Composer } from "https://deno.land/x/grammy@v1.8.3/composer.ts";

import { mentionsAdmins } from "./commands/mentionAdmins.ts";
import { groupOnly } from "../../middleware/groupOnly.ts";

const bot = new Composer();

bot.on("::mention", groupOnly, mentionsAdmins);

// bot.on('poll', onlyAdmin, pinAdminPool);

export default bot;
