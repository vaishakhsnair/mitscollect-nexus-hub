# COLLECT2MITS

**COLLECT2MITS** is an internal web platform designed to collect, organize, and manage information for the official college newsletter at MITS. The platform allows departments and clubs to submit their activities, achievements, and event details along with associated images. An admin dashboard enables easy review, approval, and management of submissions.

---

## 🌐 Project Overview

COLLECT2MITS simplifies content collection for the newsletter by providing:

- Department-wise and club-wise submission portals.
- Rich text descriptions and media uploads.
- A centralized admin dashboard for managing submissions.
- Organized gallery view of approved submissions.

---

## 🔖 Information Architecture

### Total Pages

1. Home / Dashboard
2. Department Directory Page
3. Individual Department Submission Page
4. Club Directory Page
5. Individual Club Submission Page
6. Gallery Page
7. Admin Login Page
8. Admin Dashboard

---

## 📄 Page Details

### 1️⃣ Home / Dashboard

- Website Title: `COLLECT2MITS`
- Description: _"A platform for collecting achievements and activities at MITS."_
- Quick links to:
  - Department Submissions
  - Club Submissions
  - Gallery
  - Admin Login
- Collapsible user guide / FAQ
- Fully responsive design

### 2️⃣ Department Directory Page

- Displays all college departments
- Each department links to its submission form
- Includes search and filtering capabilities

### 3️⃣ Department Submission Page

Form fields:
- Section (Department Activities, Faculty Achievements, Student Achievements, NPTEL Certifications)
- Title
- Description (Rich Text)
- Name of Contributor 
- Date of Activity
- Image Upload (Multiple images, size-limited)
- Submit Button
- Preview & Save Draft

### 4️⃣ Club Directory Page

- Displays all college clubs with optional logos and descriptions
- Each club links to its submission form
- Includes search and filtering capabilities

### 5️⃣ Club Submission Page

Form fields:
- Event Title
- Description (Rich Text)
- Date of Event
- Image Upload (Multiple images)
- Club Contact Person / Submitter Name
- Tags (Workshop, Seminar, Cultural, etc.)
- Submit Button
- (Optional) Preview & Save Draft

### 6️⃣ Gallery Page

- Publicly showcases approved images
- Filters:
  - Department
  - Club
  - Event Type
  - Date
- Lightbox image viewer
- Pagination / lazy loading

### 7️⃣ Admin Login Page

- Secure authentication for admin team
- Username & Password fields
- Forgot password link (optional)

### 8️⃣ Admin Dashboard

- View and manage all submissions
- Filters: Department, Club, Submission Type, Date
- Approve, Edit, or Reject submissions
- Export data (CSV, PDF)
- Image management
- Notification center for new submissions
- Optional email notifications for submitters

---

## ⚙️ Global Features

- Fully responsive (mobile + desktop)
- Image compression & upload limits
- Form validation and error handling
- Submission confirmation & optional email notifications
- Accessibility (ARIA labels, alt text for images)
- (Optional) Dark Mode
- (Optional) Multi-language support

---

## 🧑‍💻 User Roles

- **Contributors (students/faculty):**
  - Submit content and images
  - Preview and save drafts

- **Admins:**
  - Review, edit, approve, and reject submissions
  - Manage and export data
  - Oversee the entire content pipeline

---

