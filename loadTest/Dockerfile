FROM openjdk:21-bookworm

RUN wget https://8006059.fs1.hubspotusercontent-na1.net/hubfs/8006059/Gatling%20OSS/gatling-charts-highcharts-bundle-3.10.4-bundle.zip
RUN unzip gatling-charts-highcharts-bundle-3.10.4-bundle.zip

RUN mkdir /gatling
RUN mv /gatling-charts-highcharts-bundle-3.10.4/* /gatling/
ENV PATH=$PATH:/gatling/bin

WORKDIR /gatling

CMD [ "gatling.sh", "-rm", "local", "-s", "RinhaBackendCrebitosSimulation" ]

