FROM node:14.17.0 AS showcase
COPY ./showcase/package.json .
COPY ./showcase/package-lock.json .

RUN npm install

COPY ./showcase .
RUN npm run build

FROM node:14.17.0 AS lib
COPY ./feedbacky/package.json .
COPY ./feedbacky/package-lock.json .

RUN npm install

COPY ./feedbacky .
RUN npm run build:cdn

FROM nginx AS app
WORKDIR /app
COPY --from=showcase ./showcase/build ./usr/share/nginx/html
COPY --from=lib ./feedbacky/build/feedbacky.js ./usr/share/nginx/html/feedbacky.js
COPY --from=lib ./feedbacky/build/feedbacky.css ./usr/share/nginx/html/feedbacky.css


EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]