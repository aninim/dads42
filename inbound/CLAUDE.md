# inbound/ — Incoming Management

Who's coming in. CRM-lite layer for signups, DMs, intros.

## Structure
- `leads.md` — snapshot log of email captures (source of truth is Firestore `email_captures`)
- `conversations/` — notable DMs, Skool intros, founding-member context. One file per person: `firstname-lastname.md`

## Data flow
```
site email form → Firebase Function captureEmail → Firestore `email_captures`
                                                 → Resend welcome email
```
Function: `functions/index.js`. Landing form: `index.html:1769`.

## Rules
- Never paste raw email lists here — link to Firestore export instead
- Conversation files: date + platform + verbatim excerpts + Oren's read. No speculation.
- This is personal. Codi doesn't write here without explicit ask.

## Open issues
- Email capture function is **not deployed** (last deploy Apr 20 failed at build step). See PLANNING.md Status.
