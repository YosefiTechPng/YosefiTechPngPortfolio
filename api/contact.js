const nodemailer = require("nodemailer");

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  const { name, email, business, details } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New YosefiTechPng Website Inquiry",

text: `
New YosefiTechPng Inquiry

Name: ${name}

Email: ${email}

Business: ${business}

Project Details:
${details}
`
    });


    res.status(200).json({
      success: true
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Email failed"
    });

  }
}