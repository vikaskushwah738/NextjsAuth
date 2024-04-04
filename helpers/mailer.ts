import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId,
        {
         $set:{
            verifyToken: hashedToken, 
            verifyTokenEpiry:new Date(Date.now() + 
            3600000)
          }
        });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId,
        {
          forgetPasswordTolen: hashedToken, forgetPasswordTolenExpiry: Date.
            now() + 3600000
        })
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "36234fd84fec17",
        pass: "605b367c6f2873"
      }
    });

    const mailOptions = {
      from: "vikaskusha@gamil.com",
      to: email,
      subject: emailType === 'VERIFY' ? "Verify you email" : "Reset your pasword",
      html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${
       emailType ==='VERIFY' ? 'verify your email' : 'reset your password'}
         </br>${process.env.DMAOIN}/verifyemail?token=${hashedToken}
       </p>`, // html body
    };
    const mailResponse = await transporter.sendMail(mailOptions); 
    
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}