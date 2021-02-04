const nodemailer = require('nodemailer')

const KafkaConsumer = require('./KafkaConsumer');

const consumer = new KafkaConsumer(['email']);

consumer.on('message', (message) => {

    const info = JSON.parse(message.value);
    console.log(info);
    //console.log(message);
    const itemsArray = info.items;
    let itemsList = '';
    itemsArray.forEach((item) => {
        itemsList += `${item.quantity} - ${item.title}<br/> `
    });

    console.log(itemsList);

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'picklerickcsc667@gmail.com',
            pass: 'csc667spring2020',
        }
    })

    let mailOptions = {
        from: {
            name: 'Pickle Rick',
            address: 'picklerickcsc667@gmail.com',
        },
        to: `${info.email}`,
        replyTo: 'picklerickcsc667@gmail.com',
        subject: 'Thank You for Your Order',
        text: 'message',
        html: `<p>Thank you for purchasing: </p></br>
                <p>${itemsList}</p>
                <p>For the total price of 1 billion dollars`,

    }
    
    transporter.sendMail(mailOptions, (err, info) =>{
		if (err) {
			console.log(err);
		}
	})

});

consumer.connect();