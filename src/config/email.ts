import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY
  }
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/auth/verify?token=${token}`;
  await transporter.sendMail({
    from: "no-reply@creatorsocial.com",
    to,
    subject: "Verify Your Account",
    html: `<p>Click <a href="${verifyUrl}">here</a> to verify your account.</p>`
  });
};
