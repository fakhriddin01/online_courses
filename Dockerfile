FROM --platform=linux/amd64 node:18.12.1 AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:18.12.1
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["npm", "run", "start:prod"]