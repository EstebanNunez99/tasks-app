# -------etapa 1
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#--------etapa 2
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nextjs && adduser -S nextjs -u 1001
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]