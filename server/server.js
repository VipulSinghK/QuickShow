import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { Clerk } from "@clerk/clerk-sdk-node";
import prisma from "./client.js"; // your Prisma client
import nodemailer from "nodemailer";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // adjust if frontend runs elsewhere
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

/**
 * ✅ Sync Clerk user with Postgres via Prisma
 */
app.get("/api/user/db", requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;

    // Check if user exists in Postgres
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    // If not, create it
    if (!user) {
      console.log("🆕 Creating new user in DB:", userId);
      const clerkUser = await clerk.users.getUser(userId);

      const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
      const name =
        `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
        "New User";

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          name,
          email,
        },
      });
    } else {
      console.log("🔁 Found existing user in DB:", user);
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Error syncing user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 📧 Send Ticket Email
 */
app.post("/api/send-ticket", async (req, res) => {
  const { email, ticketContent, movieTitle } = req.body;

  if (!email || !ticketContent) {
    return res
      .status(400)
      .json({ success: false, error: "Missing email or ticket content" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // Gmail address
        pass: process.env.SMTP_PASS, // Gmail app password
      },
    });

    await transporter.sendMail({
      from: `"CinemaHub" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🎟 Your Ticket for ${movieTitle}`,
      text: ticketContent,
    });

    console.log(`📨 Ticket email sent to ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

/**
 * 🧪 Debug Routes
 */
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

app.get("/debug-users", async (req, res) => {
  const rows = await prisma.$queryRaw`SELECT * FROM public."User"`;
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
