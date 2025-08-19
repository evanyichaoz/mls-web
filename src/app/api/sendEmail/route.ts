import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    // 创建 SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // 你的 Gmail 地址
        pass: process.env.GMAIL_PASS, // 应用专用密码
      },
    });

    // 邮件内容
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // 你自己收邮件
      subject: '新客户咨询',
      text: `姓名: ${name}\n电话: ${phone}\n邮箱: ${email}`,
    };

    // 发送邮件
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Send email error:', error);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}