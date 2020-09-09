import nodemailer from 'nodemailer';
import configMail from '../config/configMail';
import expresshbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import {resolve} from 'path';

class Mail {
    constructor(){
        const {host, port, auth} = configMail;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            auth: auth.user ? auth : null
        });

        this.configTamplatesEmail();
    }

    configTamplatesEmail() {
        const pathEmail = resolve(__dirname, '..', 'app', 'view', 'email');

        this.transporter.use('compile', nodemailerhbs({
            viewEngine: expresshbs.create({
                layoutsDir: resolve(pathEmail, 'layouts'),
                partialsDir: resolve(pathEmail, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs'
            }),
            viewPath: pathEmail,
            extName: '.hbs'
        }));
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...configMail.default,
            ...message
        });
    }

}

export default new Mail();