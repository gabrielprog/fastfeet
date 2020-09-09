import nodemailer from 'nodemailer';
import configMail from '../config/configMail';

class Mail {
    constructor(){
        const {host, port, auth} = configMail;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            auth: auth.user ? auth : null
        });
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...configMail.default,
            ...message
        });
    }

}

export default new Mail();