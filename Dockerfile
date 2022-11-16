FROM cypress/included:10.11.0
RUN apt-get update; apt-get install -y libicu-dev
RUN npm install -g inline-assets
RUN npm install -g mochawesome mochawesome-merge mochawesome-report-generator
ENTRYPOINT []
