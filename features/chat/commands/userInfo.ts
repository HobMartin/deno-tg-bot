import {
  Context,
  InputFile,
  Canvas,
  CanvasRenderingContext2D,
  createCanvas,
  Image,
} from "../../../deps.deno.ts";

import { IMAGE_SET } from "../../../assets/background.ts";
import { db } from "../../../db/index.ts";
import { buildName } from "../../../lib/username.ts";
import { getReputationTitle } from "../utils/reputation.ts";
import { getEnv } from "../../../lib/getEnv.ts";
import { DEFAULT_AVATAR } from "../../../assets/avatar.ts";

const getRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * IMAGE_SET.length);
  return IMAGE_SET[randomIndex];
};

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_AVATAR.length);
  return DEFAULT_AVATAR[randomIndex];
};

const IMAGE_SIZE = 200;

function fitTextOnCanvas(
  text: string,
  fontFace: string,
  padding: number,
  yPosition: number,
  canvas: Canvas,
  context: CanvasRenderingContext2D
) {
  // start with a large font size
  let fontsize = 34;

  // lower the font size until the text fits the canvas
  do {
    fontsize--;
    context.font = fontsize + "px " + fontFace;
  } while (context.measureText(text).width > canvas.width - padding * 2);

  // draw the text
  context.fillText(text, padding, yPosition);
}

export const userInfo = async (_ctx: Context) => {
  const user = await db.collection("users").findOne({ userId: _ctx.from?.id });

  if (!user) {
    return _ctx.reply("User not found");
  }

  const canvas = createCanvas(300, 400);
  const ctx = canvas.getContext("2d");

  const background = await Image.load(getRandomBackground());
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // add rect for text
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 40, canvas.width, 120);

  ctx.fillStyle = "#ffffff";

  fitTextOnCanvas(
    buildName(_ctx.from) ?? "",
    "Arial Unicode MS",
    50,
    80,
    canvas,
    ctx
  );

  ctx.font = "24px Arial";
  fitTextOnCanvas(
    `${getReputationTitle(user.reputation)}`,
    "Arial Unicode MS",
    50,
    110,
    canvas,
    ctx
  );
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

  ctx.arc(IMAGE_SIZE - 50, 280, IMAGE_SIZE / 2, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.clip();
  ctx.closePath();
  const img = await Image.load(url ?? getRandomAvatar());
  ctx.drawImage(img, 50, 180, IMAGE_SIZE, IMAGE_SIZE);
  await _ctx.replyWithSticker(new InputFile(canvas.encode()));
};
