FROM mcr.microsoft.com/playwright:v1.48.2-noble

WORKDIR /AQA-PART3PW

ENV TESTRAIL_HOST=https://marynadonets.testrail.io/
ENV TESTRAIL_USERNAME=kotlyarmv@gmail.com
ENV TESTRAIL_API_KEY=ncBtm0X4Z7/RFcEU8izX-frbbTCCIS48tqAJ7yweP
ENV TESTRAIL_PROJECT_ID=1
ENV TESTRAIL_SUITE_ID=1
ENV TESTRAIL_RUN_NAME='My tests'
ENV TESTRAIL_RUN_ID=1

COPY . .

RUN npm install

CMD ["npx", "playwright", "test", "--project=test"]