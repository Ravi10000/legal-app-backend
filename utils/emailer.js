import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

async function sendEmail({ to, link }) {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
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

  const mailOptions = {
    from: `verify email <TEST LEAGAL MAIL>`,
    to,
    subject: "Verify your email",
    template: "verify-email",
    context: {
      apiUrl: process.env.API_URL,
      link,
    },
  };

  return await transporter.sendMail(mailOptions);
  // transporter.sendMail(mailOptions, (error, info) => {
  //   error && console.log({ error });
  //   info && console.log({ info });
  // });
}

export default sendEmail;
