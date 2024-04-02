import nodemailer from "nodemailer";

export const sendEmail= async({email, emailType, userId} :any) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true, 
            // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });   

          const mailOptions = {
            from: "vikaskusha@gamil.com",
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify you email" : "Reset your pasword",
            html: "<b>Hello world?</b>", // html body
          };

          const mailResponse =await transporter.sendMail
          (mailOptions) 
          return mailResponse
    } catch (error :any){
           throw new Error(error.massage)
    }
}