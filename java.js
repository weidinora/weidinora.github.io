const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Body parser a POST kérésekhez
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer transporter konfigurálása
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

// API végpont az űrlap adatainak kezeléséhez
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'weidinora@gmail.com',
        subject: `Kapcsolatfelvétel: ${name}`,
        text: `Név: ${name}\nEmail: ${email}\nÜzenet:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Hiba történt az üzenet küldésekor.' });
        } else {
            console.log('Email elküldve: ' + info.response);
            res.status(200).json({ message: 'Az üzeneted sikeresen elküldve!' });
        }
    });
});

// Server indítása
app.listen(port, () => {
    console.log(`A szerver fut a következő címen: http://localhost:${port}`);
});
