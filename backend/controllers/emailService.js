const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendRecommendationEmail = async (userEmail, userName, products, skinProfile) => {
  const transporter = createTransporter();

  const productsHTML = products.map((p, i) => `
    <div style="background: linear-gradient(135deg, #1a0a2e 0%, #2d1458 100%); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 24px; margin: 16px 0;">
      <div style="display: flex; align-items: flex-start; gap: 16px;">
        <div style="background: rgba(212,175,55,0.15); color: #d4af37; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; text-align: center; line-height: 36px;">${i + 1}</div>
        <div style="flex: 1;">
          <h3 style="color: #f0e6ff; margin: 0 0 4px 0; font-size: 18px;">${p.name}</h3>
          <p style="color: #d4af37; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">${p.brand} · ${p.category}</p>
          <p style="color: #c9b8e8; margin: 0 0 12px 0; line-height: 1.6;">${p.description}</p>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span style="color: #d4af37; font-size: 18px; font-weight: 700;">${p.price}</span>
            <a href="${p.link}" style="background: linear-gradient(135deg, #d4af37, #b8963c); color: #1a0a2e; padding: 8px 20px; border-radius: 24px; text-decoration: none; font-weight: 600; font-size: 13px;">Shop Now →</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const skinSummary = `
    <div style="background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #d4af37; margin: 0 0 12px 0;">Your Skin Profile</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="color: #c9b8e8; padding: 4px 0; width: 140px;">Skin Type</td><td style="color: #f0e6ff; font-weight: 600; text-transform: capitalize;">${skinProfile.skinType || 'N/A'}</td></tr>
        <tr><td style="color: #c9b8e8; padding: 4px 0;">Main Concern</td><td style="color: #f0e6ff; font-weight: 600; text-transform: capitalize;">${skinProfile.concern || 'N/A'}</td></tr>
        <tr><td style="color: #c9b8e8; padding: 4px 0;">Sensitivity</td><td style="color: #f0e6ff; font-weight: 600; text-transform: capitalize;">${skinProfile.sensitivity === 'yes' ? 'Sensitive' : 'Normal'}</td></tr>
        <tr><td style="color: #c9b8e8; padding: 4px 0;">Age Group</td><td style="color: #f0e6ff; font-weight: 600;">${skinProfile.age || 'N/A'}</td></tr>
        <tr><td style="color: #c9b8e8; padding: 4px 0;">Lifestyle</td><td style="color: #f0e6ff; font-weight: 600; text-transform: capitalize;">${skinProfile.lifestyle || 'N/A'}</td></tr>
      </table>
    </div>
  `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin: 0; padding: 0; background: #0d0520; font-family: Georgia, serif;">
      <div style="max-width: 620px; margin: 0 auto; padding: 40px 20px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #d4af37, #b8963c); -webkit-background-clip: text; color: #d4af37; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px;">✦ LUMIÈRE SKINCARE ✦</div>
          <h1 style="color: #f0e6ff; margin: 0; font-size: 32px; font-weight: 400; line-height: 1.3;">Your Personalized<br><span style="color: #d4af37;">Skin Report</span></h1>
          <p style="color: #c9b8e8; margin: 16px 0 0 0;">Curated exclusively for ${userName}</p>
        </div>

        <!-- Divider -->
        <div style="text-align: center; margin: 20px 0;">
          <span style="color: #d4af37; letter-spacing: 8px; opacity: 0.5;">— — —</span>
        </div>

        <!-- Skin Profile -->
        ${skinSummary}

        <!-- Products -->
        <h2 style="color: #f0e6ff; font-size: 20px; font-weight: 400; text-align: center; margin: 32px 0 20px 0;">
          <span style="color: #d4af37;">5</span> Products Handpicked for Your Skin
        </h2>
        ${productsHTML}

        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(212,175,55,0.2);">
          <p style="color: #d4af37; font-size: 11px; letter-spacing: 3px; margin: 0 0 8px 0;">LUMIÈRE SKINCARE</p>
          <p style="color: #6b5a8a; font-size: 12px; margin: 0;">Crafted with care • Your beauty, elevated</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Lumière Skincare" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `✨ ${userName}, Your Personalized Skincare Recommendations Are Here`,
    html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendRecommendationEmail };
