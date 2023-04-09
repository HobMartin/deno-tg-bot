import { Context } from "https://deno.land/x/grammy@v1.8.3/context.ts";

import { InputFile } from "https://deno.land/x/grammy@v1.8.3/platform.deno.ts";

import { IMAGE_SET } from "../../../assets/background.ts";
import { db } from "../../../db/index.ts";
import { buildName } from "../../../lib/username.ts";
import { getReputationTitle } from "../utils/reputation.ts";
import { getEnv } from "../../../lib/getEnv.ts";
import {
  createCanvas,
  loadImage,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const getRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * IMAGE_SET.length);
  return IMAGE_SET[randomIndex];
};

const IMAGE_SIZE = 200;

export const userInfo = async (_ctx: Context) => {
  const user = await db.collection("users").findOne({ userId: _ctx.from?.id });
  console.log(user);

  if (!user) {
    return _ctx.reply("User not found");
  }

  const canvas = createCanvas(300, 400);
  const ctx = canvas.getContext("2d");

  const background = await loadImage(getRandomBackground());
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // add rect for text
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 40, canvas.width, 120);

  ctx.fillStyle = "#ffffff";
  ctx.font = "36px Arial";

  ctx.fillText(`${buildName(_ctx.from)}`, 50, 80);

  ctx.font = "24px Arial";
  ctx.fillText(`${getReputationTitle(user.reputation)}`, 50, 110);
  // Set the font size for the reputation
  ctx.font = "24px Arial";

  // Draw the user's reputation
  ctx.fillText(`Репутація: ${user.reputation}`, 50, 140);

  const url = await _ctx.api
    .getUserProfilePhotos(_ctx.from?.id as number, { limit: 1 })
    .then((res) => {
      if (res.total_count) {
        const photos = res.photos[0];
        const file_id = photos[photos.length - 1].file_id;
        return _ctx.api.getFile(file_id).then((res) => {
          const url = `https://api.telegram.org/file/bot${getEnv(
            "BOT_TOKEN"
          )}/${res.file_path}`;
          return url;
        });
      }
      return null;
    });

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#ffffff";

  ctx.arc(IMAGE_SIZE - 50, 280, IMAGE_SIZE / 2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.clip();
  ctx.closePath();
  const img = await loadImage(url as string);
  ctx.drawImage(img, 50, 180, IMAGE_SIZE, IMAGE_SIZE);

  await Deno.writeFile("image.png", canvas.toBuffer());

  await _ctx.replyWithPhoto(new InputFile(canvas.toBuffer(), "image.png"));
};
