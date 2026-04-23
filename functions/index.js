import * as functions from "firebase-functions";
import admin from "firebase-admin";
import { Resend } from "resend";
import cors from "cors";

admin.initializeApp();
const db = admin.firestore();

// Lazy-load Resend client when needed
let resendClient;
function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable not set");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const corsHandler = cors({
  origin: ["https://dads42.com", "https://www.dads42.com", "https://dads42.web.app", "http://localhost:5000"],
  methods: ["POST"],
  credentials: true,
});

/**
 * Capture email for Dad Origins Pack lead magnet
 * POST /captureEmail
 * Body: { email: "user@example.com" }
 * Response: { success: boolean, message: string, id: string? }
 */
export const captureEmail = functions
  .https
  .onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
      // Only allow POST
      if (req.method !== "POST") {
        res.status(405).json({ success: false, message: "Method not allowed" });
        return;
      }

      try {
        const { email } = req.body;

        // Validate email
        if (!email || typeof email !== "string" || !email.includes("@")) {
          res.status(400).json({ success: false, message: "Invalid email address" });
          return;
        }

        const trimmedEmail = email.toLowerCase().trim();

        // Check if email already captured (prevent duplicates)
        const existingDoc = await db
          .collection("email_captures")
          .where("email", "==", trimmedEmail)
          .limit(1)
          .get();

        if (!existingDoc.empty) {
          res.status(200).json({
            success: true,
            message: "Email already registered. Check your inbox for the Dad Origins Pack.",
          });
          return;
        }

        // Store email in Firestore
        const docRef = await db.collection("email_captures").add({
          email: trimmedEmail,
          capturedAt: admin.firestore.FieldValue.serverTimestamp(),
          source: "dads42-landing",
          status: "pending",
        });

        // Send email via Resend
        await getResend().emails.send({
          from: "Dads42 <noreply@dads42.com>",
          to: trimmedEmail,
          subject: "Your Dad Origins Pack is on the way →",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 20px 0; color: #1a1a1a;">
                Dad Origins Pack incoming
              </h1>
              <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 20px 0;">
                You're about to join a community of fathers who don't follow the mainstream playbook. The Dad Origins Pack includes:
              </p>
              <ul style="font-size: 15px; line-height: 1.8; color: #666; margin: 0 0 30px 0; padding-left: 20px;">
                <li>Week 1 video scripts (Self-Guided Dad framework)</li>
                <li>Self-Guided Dad Manifesto (PDF)</li>
                <li>10 Commandments for competent fatherhood</li>
              </ul>
              <p style="font-size: 15px; line-height: 1.6; color: #999; margin: 0;">
                The download link is coming soon. In the meantime, <a href="https://skool.com/dads42-3659" style="color: #1a1a1a; font-weight: 600; text-decoration: none;">join the Skool community</a> to connect with other dads doing the work.
              </p>
            </div>
          `,
        });

        // Success response
        res.status(200).json({
          success: true,
          message: "Email registered. Check your inbox.",
          id: docRef.id,
        });
      } catch (error) {
        console.error("Error capturing email:", error);
        res.status(500).json({
          success: false,
          message: "Something went wrong. Try again in a moment.",
        });
      }
    });
  });
