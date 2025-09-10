# URL Shortener App

A user-friendly, client-side URL shortener application built with **React**, **TypeScript**, and **Material UI**. The app allows users to shorten URLs, optionally provide custom shortcodes and validity periods, and view analytics about shortened links—all handled entirely on the client side.

---

## Features

- **Shorten URLs:** Users can shorten up to 5 URLs at a time.
- **Custom Shortcodes:** Optionally provide a preferred shortcode. Ensures uniqueness.
- **Default Validity:** Default validity of 30 minutes if none is specified.
- **Client-Side Validation:** Validates URLs, custom codes, and validity periods before creating short links.
- **Redirection:** Accessing a short link redirects to the original URL using client-side routing.
- **Analytics:** View a list of shortened URLs with:
  - Creation and expiry timestamps
  - Total clicks
  - Click details (timestamp, source, approximate location)
- **Logging Middleware:** All operations use a custom logging utility for info and error logging.
- **Material UI Styling:** Clean and user-friendly UI with responsive design.

---

Install dependencies: npm install
Start the development server: npm run dev
