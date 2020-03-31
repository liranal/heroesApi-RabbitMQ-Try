var amqp = require("amqplib/callback_api");

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
      var msg = { sec: 5 };

      channel.assertExchange(exchange, "direct", {
        durable: false
      });

      for (let index = 0; index < 3; index++) {
        channel.publish(exchange, "like", Buffer.from(JSON.stringify(msg)));
        console.log(" [x] Sent %s", msg.sec);
      }
      //channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    });
  }
);
