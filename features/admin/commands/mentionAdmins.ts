import { Context, NextFunction } from "../../../deps.deno.ts";
import { buildName } from "../../../lib/username.ts";

export const mentionsAdmins = async (ctx: Context, next: NextFunction) => {
  if (!ctx.message?.text?.includes("@admin")) return next();

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
