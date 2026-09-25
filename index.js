const amqp = require('amqplib');

async function iniciarConsumidor() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'notificaciones_queue';

        await channel.assertQueue(queue, { durable: false });
        console.log("Esperando mensajes en %s", queue);

        channel.consume(queue, (msg) => {
            const data = JSON.parse(msg.content.toString());
            console.log(`[NOTIFICACIÓN] Enviando correo al Usuario ID: ${data.usuarioId} por la Orden ID: ${data.ordenId}`);
            // Aquí iría la integración con SendGrid, AWS SES, etc.
        }, { noAck: true });
    } catch (error) {
        console.error("Error conectando a RabbitMQ", error);
    }
}

iniciarConsumidor();
