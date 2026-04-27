// Dads42 Email Capture Handler
// Deploy as web app: Apps Script → Deploy → New Deployment → Type: Web App
// Execute as: your email (oren.elimelech@...)
// Who has access: Anyone

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const SHEET_ID = "1DhPaHZkaU5LHBQKP_fppSK0F-Z_R2xmAGFZ5sdi4DwA"; // Fill in after creating the sheet
const SHEET_NAME = "Email Captures";

/**
 * POST endpoint for email form submissions
 * Receives: { email: "user@example.com" }
 * Returns: { success: boolean, message: string }
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = data.email ? data.email.toLowerCase().trim() : null;

    // Validate email format
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "Invalid email address"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Get or create sheet
    const sheet = getOrCreateSheet();

    // Check for duplicate
    const emailColumn = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
    const isDuplicate = emailColumn.some(row => row[0] && row[0].toLowerCase() === email);

    if (isDuplicate) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: "Email already registered. Check your inbox for the Dad Origins Pack."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Add to sheet
    const timestamp = new Date().toISOString();
    sheet.appendRow([email, timestamp, "pending"]);

    // Send email via Resend
    sendEmailViaResend(email);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Email registered. Check your inbox."
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error("Error:", error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: "Something went wrong. Try again in a moment."
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get or create the email captures sheet
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Email", "Captured At", "Status"]);
  }

  return sheet;
}

/**
 * Send email via Resend API
 */
function sendEmailViaResend(email) {
  const payload = {
    from: "Dads42 <noreply@dads42.com>",
    to: email,
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
    `
  };

  const options = {
    method: "post",
    headers: {
      "Authorization": "Bearer " + RESEND_API_KEY,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch("https://api.resend.com/emails", options);
    const result = JSON.parse(response.getContentText());
    console.log("Resend response:", result);
  } catch (error) {
    console.error("Resend error:", error);
  }
}

/**
 * Test function (run from Apps Script editor to verify setup)
 */
function testEmailCapture() {
  const testEmail = "test@example.com";
  const response = doPost({
    postData: {
      contents: JSON.stringify({ email: testEmail })
    }
  });
  console.log("Test response:", response.getContent());
}
