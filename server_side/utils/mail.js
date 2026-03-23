import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "employeemanagement98@gmail.com",  // your gmail
      pass: "szeh brvm lcaw kflg"            // app password
    }
  });

  await transporter.sendMail({
    from: "employeemanagement@gmail.com",   // must match user
    to,
    subject,
    html
  });
};
