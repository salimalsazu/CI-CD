# build stage
FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
# RUN yarn install
RUN npm install

COPY . .
# RUN yarn build
RUN npm run build
# production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/.next /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]

EXPOSE 4000

# Start the app
CMD ["npm", "start"]

