const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security & middleware ────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || ["http://localhost:3000", "https://shweta.dev"],
  methods: ["GET", "POST"],
}));
app.use(express.json({ limit: "10kb" }));

// Rate limiting on contact route (max 5 per 15 min per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Email transporter ────────────────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // your Gmail
      pass: process.env.EMAIL_PASS,   // Gmail App Password
    },
  });
};

// ── Validation ───────────────────────────────────────────
function validateContactForm({ name, email, message }) {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email required.");
  if (!message || message.trim().length < 10) errors.push("Message must be at least 10 characters.");
  return errors;
}

// ── Routes ───────────────────────────────────────────────

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio backend running 🚀", timestamp: new Date().toISOString() });
});

// Contact form submission
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate
  const errors = validateContactForm({ name, email, message });
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  // Build email HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><style>
      body { font-family: 'Segoe UI', sans-serif; background: #0a0a0f; color: #e2e8f0; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 20px auto; background: #1a1a2e; border-radius: 16px; overflow: hidden; border: 1px solid rgba(124,58,237,0.3); }
      .header { background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 28px 32px; }
      .header h2 { margin: 0; color: #fff; font-size: 22px; }
      .header p { margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; }
      .body { padding: 28px 32px; }
      .field { margin-bottom: 18px; }
      .label { font-size: 12px; color: #a78bfa; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
      .value { font-size: 15px; color: #e2e8f0; background: rgba(255,255,255,0.04); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); }
      .footer { padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; }
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📬 New Portfolio Message</h2>
          <p>Someone reached out through shweta.dev</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">From</div>
            <div class="value">${name} &lt;${email}&gt;</div>
          </div>
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${subject || "(no subject)"}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="value" style="white-space:pre-wrap">${message}</div>
          </div>
        </div>
        <div class="footer">Sent via portfolio contact form · ${new Date().toLocaleString()}</div>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = createTransporter();

    // Email to Shweta
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject || `Message from ${name}`}`,
      html: htmlContent,
      replyTo: email,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Shweta Gupta" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out! ✨",
      html: `
        <div style="font-family:'Segoe UI',sans-serif;background:#0a0a0f;color:#e2e8f0;padding:32px;max-width:500px;margin:0 auto;border-radius:16px;border:1px solid rgba(124,58,237,0.3)">
          <h2 style="color:#a78bfa;margin-top:0">Hey ${name}! 👋</h2>
          <p style="color:#94a3b8;line-height:1.7">Thanks for your message! I've received it and will get back to you as soon as possible — usually within 24 hours.</p>
          <p style="color:#94a3b8;line-height:1.7">In the meantime, feel free to check out my GitHub: <a href="https://github.com/SHWETA0920" style="color:#7c3aed">github.com/SHWETA0920</a></p>
          <hr style="border-color:rgba(255,255,255,0.08);margin:24px 0">
          <p style="color:#475569;font-size:13px;margin:0">— Shweta Gupta · shweta.dev</p>
        </div>
      `,
    });

    console.log(`✅ Contact email sent from ${email} (${name})`);
    res.json({ success: true, message: "Message sent successfully!" });

  } catch (err) {
    console.error("Email error:", err.message);
    // Still return success if email config is missing (dev mode)
    if (!process.env.EMAIL_USER) {
      console.log("📝 Dev mode: Email not configured. Form data:", { name, email, subject, message });
      return res.json({ success: true, message: "Message received (dev mode — configure EMAIL_USER to send emails)." });
    }
    res.status(500).json({ success: false, error: "Failed to send email. Please contact directly." });
  }
});

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
