import dotenv from "dotenv";
import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
dotenv.config();

console.log({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// transporter.sendMail({
//   to: "ravisince2k@gmail.com",
//   subject: "Test Email",
//   text: "This is a test email",
// });
const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("./"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));

export async function sendResetPasswordMail({ to, link }) {
  if (
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_USERNAME ||
    !process.env.EMAIL_PASSWORD
  ) {
    console.log("<Email not configured>");
    return;
  }
  console.log({ to, link });
  const mailOptions = {
    from: `Reset password`,
    to,
    subject: "Reset your password <no reply>",
    template: "reset-email-mail-template",
    context: {
      verificationLink: link,
    },
  };
  console.log({ mailOptions });
  const resetPasswordMailResponse = await transporter.sendMail(mailOptions);
  console.log({ resetPasswordMailResponse });
  return resetPasswordMailResponse;
}

export async function sendVerificationMail({ to, link }) {
  if (
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_USERNAME ||
    !process.env.EMAIL_PASSWORD
  ) {
    console.log("<Email not configured>");
    return;
  }
  const mailOptions = {
    from: `verify email <TEST LEAGAL MAIL>`,
    to,
    subject: "Verify your email <no reply>",
    template: "verify-mail-template",
    context: {
      verificationLink: link,
    },
  };
  const verifyEmailResponse = await transporter.sendMail(mailOptions);
  console.log({ verifyEmailResponse });
  return verifyEmailResponse;
}
// export default sendEmail;
