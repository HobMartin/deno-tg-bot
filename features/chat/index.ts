import { Composer } from "https://deno.land/x/grammy@v1.8.3/composer.ts";
import { addUser } from "../../middleware/addUser.ts";
import { loading } from "../../middleware/loading.ts";

import { newChatMember } from "./commands/newChatMember.ts";
import { leftChatMember } from "./commands/leftChatMember.ts";
import { addReputation } from "./commands/addReputation.ts";
import { userInfo } from "./commands/userInfo.ts";

const bot = new Composer();

bot.on(":new_chat_members", newChatMember);
bot.on(":left_chat_member", leftChatMember);
bot.hears(/(?<!\w)\+(?!\w)|(?<=\s)\+(?=\s)/, addUser, addReputation);
bot.command("user_info", loading, addUser, userInfo);

export default bot;
