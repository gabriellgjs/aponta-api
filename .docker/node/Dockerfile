FROM node:18

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    sudo \
    curl \
    openssl \
    nano \
    locales \
    tzdata \
    dos2unix \
    zip \
    unzip \
    git

RUN usermod -aG sudo node && \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN mkdir -p /var/www/odonts-api && \
    chown -R node:node /var/www/odonts-api

RUN echo "pt_BR.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen "pt_BR.UTF-8" && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG="pt_BR.UTF-8"

# Define Timezone America/Sao_Paulo
RUN ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN npm install -g npm@9.6.1

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/yarn.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

ADD .docker/node/bin/* /docker/

RUN chmod +x /docker/entrypoint.sh

RUN mkdir -p /var/www/ && \
    chown -R node:node /var/www/

USER node

ENTRYPOINT ["/docker/entrypoint.sh"]
