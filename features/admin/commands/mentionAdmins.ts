import { Context } from "https://deno.land/x/grammy@v1.8.3/mod.ts";
import { buildName } from "../../../lib/username.ts";

export const mentionsAdmins = async (ctx: Context) => {
  if (!ctx.message?.text?.includes("@admin")) return;

  const chatAdmins = await ctx.getChatAdministrators();
  const admins = chatAdmins.filter((admin) => !admin.user.is_bot);
  ctx.reply(
    `Надіслано адміністраторам групи: ${admins
      .map((admin) => buildName(admin.user))
      .join(", ")}`
  );
  admins.forEach((admin) => {
    ctx.api.sendMessage(
      admin.user.id,
      "Шановний пан адміністратор в групі сталося лихо, термінво потрібна ваша допомога!"
    );
  });
};
