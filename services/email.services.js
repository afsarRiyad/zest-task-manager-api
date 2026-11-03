import transporter from "../config/mail.js";
import nodemailer from "nodemailer";

const sendEmail = async (data) =>{
    const {email, name} = data
    let otp = 12323
    try {
  const info = await transporter.sendMail({
    from: 'zest task manager team', 
    to: email, 
    subject: "Your Email Verification Code", 
    html: `<div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:40px 15px;text-align:center"><div style="max-width:420px;margin:auto;background:#fff;border-radius:12px;padding:35px 25px"><h2 style="color:#181818;margin:0 0 15px">Verify Your Email</h2><p style="color:#666;font-size:14px;line-height:1.6">Use the verification code below to complete your registration.</p><div style="background:#f4f6f8;border-radius:8px;padding:18px;margin:25px 0"><span style="font-size:32px;font-weight:bold;letter-spacing:10px;color:#181818">${otp}</span></div><p style="color:#777;font-size:13px">This code expires in <strong>5 minutes</strong>.</p><p style="color:#999;font-size:12px;margin-top:25px">If you didn't request this code, you can safely ignore this email.</p></div><p style="color:#aaa;font-size:11px;margin-top:20px">© 2026 Your App. All rights reserved.</p></div>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

export default sendEmail