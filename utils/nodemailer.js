const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Acros " <hello@boosted.com>',
    to: process.env.SMTP_MAIL, // acros's mail
    subject: "Form Submission",
    html: `  <div>
    <h2>Form Data</h2>
    <p>
      <b>Name : </b> &nbsp; ${data?.name}
    </p>
   
    <p>
      <b>Email : </b> &nbsp; ${data?.email}
    </p>
    <p>
      <b>Phone Number : </b> &nbsp; ${data?.phoneNumber}
    </p>
    <p>
    <b>Category : </b> &nbsp; ${data?.category}
  </p>
    <p>
      <b>City : </b> &nbsp; ${data?.city}
    </p>
    <p>
      <b>Qualification : </b> &nbsp; ${data?.qualification}
    </p>
    <p>
      <b>Experience : </b> &nbsp; ${data?.experience}
    </p>
    <p>
      <b>Description : </b> &nbsp; ${data?.description}
    </p>
    <p>
      <b>Website : </b> &nbsp; ${data?.website}
    </p>
    <p>
      <b>Time Stamp : </b> &nbsp; ${data?.createdAt}
    </p>

    <br />

    <p>
      <b>Image file link : </b> &nbsp; ${data?.file}
    </p>
  </div>`,
  });
};
