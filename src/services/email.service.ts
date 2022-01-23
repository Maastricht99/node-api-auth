import nodemailer from "nodemailer";
import config from "../config/config";
import util from "util";

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

const sendMail = util.promisify(transporter.sendMail).bind(transporter);

export const sendVerificationEmail = async (
  email: string, token: string
): Promise<void> => {
  const url = `http://${config.server.host}:${config.server.port}/verify/${token}`;
  const emailOptions = {
    from: config.email.user,
    to: email,
    subject: "Email verification.",
    html: `<p>Click this <a href=${url}>link</a> to verify email.`
  }
  await sendMail(emailOptions);
}