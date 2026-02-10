FROM node:22-alpine3.22

WORKDIR /app

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=~/.cache/yarn/v6 yarn install --modules-folder=/node_modules

CMD sh -c "yarn vite --host & npm run storybook"
