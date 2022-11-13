const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(`${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`)

module.exports = class Email {
  constructor(user, subject, message, link, image) {
    this.users = "jessepence@gmail.com"
    this.name = user
    this.subject = subject
    this.message = message
    this.link = link
    this.image = image
    this.from = "jessepence@gmail.com"
    this.fromName = "Electric Larry's"
  }

  async sendEmail() {
    const mailOptions = {
      to: this.users,
      from: {
        name: this.fromName,
        email: this.from,
      },
      templateId: "d-b60048fdc10649f4952bb62598fdf3b5",
      dynamic_template_data: {
        name: this.name,
        subject: this.subject,
        message: this.message,
        link: this.link,
        image: this.image,
      },
    }
    try {
      await sgMail.send(mailOptions).then(() => {
        console.log("Email sent")
      })
    } catch (error) {
      console.log(error)
    }
  }
}
