FROM denoland/deno:alpine-1.32.3
WORKDIR /app

RUN apk add --no-cache libstdc++

RUN apk add --no-cache msttcorefonts-installer fontconfig
RUN update-ms-fonts


COPY deps.deno.ts .
RUN deno cache deps.deno.ts
COPY . .
