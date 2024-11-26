FROM mcr.microsoft.com/playwright:v1.48.2-noble

WORKDIR /AQA-PART3PW

COPY . .

RUN npm install

CMD ["npx", "playwright", "test", "--project=test"]