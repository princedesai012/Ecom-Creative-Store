import nodemailer from 'nodemailer';

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL ,     
      pass: process.env.PASSWORD, 
    },
  });

const mailOptions = {
    from: `ZepCart <${process.env.EMAIL}>`,
    to: email,
    subject: 'Your One-Time Password (OTP) for ZepCart',
    text: `Dear Customer,

Thank you for using Ecom Creative Store.

Your One-Time Password (OTP) is: ${otp}

Please use this OTP to complete your verification. This code is valid for 10 minutes.

If you did not request this code, please ignore this email.

Best regards,
ZepCart Team
`,
    html: `
        <p>Dear Customer,</p>
        <p>Thank you for using <strong>ZepCart</strong>.</p>
        <p><strong>Your One-Time Password (OTP) is:</strong></p>
        <h2>${otp}</h2>
        <p>Please use this OTP to complete your verification. This code is valid for <b>10 minutes</b>.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <br>
        <p>Best regards,<br>ZepCart Team</p>
    `
};

  await transporter.sendMail(mailOptions);
};

