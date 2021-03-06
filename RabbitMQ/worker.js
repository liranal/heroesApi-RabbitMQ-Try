var amqp = require("amqplib/callback_api");
const axios = require("axios");
amqp.connect(
  "amqp://mhqjpono:gaSRDF8vAviXbbUskMeuC3_HKg1xEflz@orangutan.rmq.cloudamqp.com/mhqjpono",
  function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = "likes";
      var queue = "HeroLikesQueue";

      channel.assertExchange(exchange, "direct", { durable: false });

      channel.assertQueue(
        queue,
        {
          durable: false
        },
        function(err2, q) {
          if (err2) {
            throw err2;
          }
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            q.queue
          );
          channel.bindQueue(q.queue, exchange, "like");
          channel.consume(
            q.queue,
            async function(msg) {
              msgObj = JSON.parse(msg.content);
              console.log("Hero: " + msg.content.toString());
              data = await axios.default.put(
                "https://liran-heroes-api.herokuapp.com/api/hero/" +
                  msgObj.idHero +
                  "/like",
                { idHero: msgObj.idHero }
              );
              console.log(data.data);
            },
            {
              noAck: true
            }
          );
        }
      );
    });
  }
);
