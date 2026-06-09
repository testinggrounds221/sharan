# Security Specification for Wedding RSVP Application

## 1. Data Invariants
1. **RSVP Creation**: Guests can submit an RSVP with a valid `guestName`, `attendeesCount`, `attendance`, and `createdAt` timestamp.
2. **Field Boundaries**:
   - `guestName` must be a string between 2 and 100 characters.
   - `attendeesCount` must be an integer between 1 and 20.
   - `attendance` must match one of the specified event statuses ("wedding", "reception", "both", "declining", or "").
   - `createdAt` must match the server-generated request timestamp (`request.time`).
3. **Admin Controls**: Only authenticated administrators (such as user `sb14backup@gmail.com`) can read, list, or delete RSVP submissions.

## 2. The "Dirty Dozen" Payloads (Targeting `/rsvps/{rsvpId}`)

Below are the 12 malicious payloads designed to test and break our database constraints:

| ID | Name | Description | Expected Outcome |
|----|------|-------------|------------------|
| 1 | Unauthenticated Read | Attempting to list all RSVPs without signing in. | PERMISSION_DENIED |
| 2 | Evil Name Size | Submitting an RSVP with a guestName exceeding 100 characters. | PERMISSION_DENIED |
| 3 | Invisible Guest Name | Submitting an RSVP with an empty or missing guestName field. | PERMISSION_DENIED |
| 4 | Negative Attendees Count | Submitting an RSVP with `attendeesCount: -5`. | PERMISSION_DENIED |
| 5 | Excess Attendees Count | Submitting an RSVP with `attendeesCount: 99`. | PERMISSION_DENIED |
| 6 | Invalid Event Option | Submitting a status like `attendance: "honeymoon"`. | PERMISSION_DENIED |
| 7 | Client-Forged Timestamp | Submitting an RSVP where `createdAt` does not match the server time. | PERMISSION_DENIED |
| 8 | Unauthorized Deletion | Attempting to delete an RSVP as a generic guest. | PERMISSION_DENIED |
| 9 | Shadow/Ghost Fields | Submitting an RSVP with extra fields like `isApproved: true`. | PERMISSION_DENIED |
| 10 | Numeric Name Spoofing | Submitting `guestName: 12345` (integer instead of string). | PERMISSION_DENIED |
| 11 | Malformed Doc ID | Accessing RSVP document with malicious script in path variable. | PERMISSION_DENIED |
| 12 | Non-Admin Read | Authenticated with another Google account trying to read list. | PERMISSION_DENIED |

## 3. Security Rule Verification Plan
All permissions and schema validation gates are defined and hardened in `firestore.rules`.
- Public creates are validated before submission.
- Reading RSVPs requires a verified Admin session matches the authorized project owner email (`sb14backup@gmail.com`).
