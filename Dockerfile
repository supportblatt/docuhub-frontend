FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS deps
RUN npm install

FROM deps AS development
COPY . .
EXPOSE 3100
CMD ["npm", "run", "dev"]

FROM deps AS build
COPY . .
RUN mkdir -p public && npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
EXPOSE 3100
CMD ["npm", "run", "start"]
