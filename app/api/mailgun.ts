import type { NextApiRequest, NextApiResponse } from "next";
import Mailgun, { MailgunMessageData } from 'mailgun.js';
import FormData from 'form-data';
import Mailgen from 'mailgen';


const API_KEY = process.env.NEXT_PUBLIC_MAILGUN_KEY || '';
const DOMAIN = process.env.MAILGUN_DOMAIN || 'sandbox5089f94b008641c190cfeed5671bdcbb.mailgun.org';

const mailgen = new Mailgen({
    theme: 'default',
    product: {
        name: "Better Weather AI",
        link: "https://betterweatherai.com",
    },
});

const mailgun = new Mailgun(FormData).client({
    username: 'api',
    key: API_KEY,
})

type Data = {
    success: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    if(req.method === "POST"){
        const body = req.body || {};
        const intro = body.intro || '';
        const content = body.content || '';
        const email = {
            body: {
                name: body.name || 'Customer',
                intro,
                outro: content,
            }
        };

        try{
            // Call mailgun send function
            await mailgun.messages.create(DOMAIN, {
                to: body.to,
                from: 'Better Weather <no-repley@betterweatherai.com>',
                subject: body.subject || "Email",
                text: mailgen.generatePlaintext(email),
                html: mailgen.generate(email),
            });

            res.status(200).json({ success: true});
        } catch(e) {
            res.status(500).json({ success: false});
        }

        return;

    }

    res.status(404).json({success: false})
}