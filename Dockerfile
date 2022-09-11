FROM node:16-alpine
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
COPY . .
RUN yarn global add pnpm
RUN pnpm install
RUN pnpm build
ENV NODE_ENV production
CMD [ "npm", "run", "start" ]