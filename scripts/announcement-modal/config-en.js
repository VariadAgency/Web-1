/**
 * ═══════════════════════════════════════════════════════════════
 * ANNOUNCEMENT MODAL - ENGLISH CONFIGURATION
 * ═══════════════════════════════════════════════════════════════
 *
 * ⚠️ ONLY EDIT THIS FILE!
 * You don't need to touch the other files (modal.js, modal.css).
 *
 * How it works:
 * 1. Change the values below to your needs
 * 2. Save
 * 3. Done! Changes appear immediately on the website
 */

const ANNOUNCEMENT_CONFIG_EN = {

    // ═══════════════════════════════════════════════════════════
    // ACTIVATION
    // ═══════════════════════════════════════════════════════════

    /**
     * Enable or disable modal
     * true = Modal will be displayed
     * false = Modal is completely disabled
     */
    enabled: true,


    // ═══════════════════════════════════════════════════════════
    // CONTENT (What will be displayed in the modal)
    // ═══════════════════════════════════════════════════════════

    /**
     * Modal title
     * Example: "🎉 Free Social Media Consultation"
     */
    title: "🎯 Free Instagram Profile Makeover",

    /**
     * Main text (can be multiline)
     * Example: "Get your free 30-minute consultation now!"
     */
    message: "We'll redesign your Instagram profile for free! Give us access, and we'll optimize your bio, highlights, feed structure, and visual branding – including a detailed feedback document with tips for more reach.",


    // ═══════════════════════════════════════════════════════════
    // CALL-TO-ACTION BUTTON (Red Button)
    // ═══════════════════════════════════════════════════════════

    /**
     * Button text
     * Example: "Book Appointment Now"
     */
    buttonText: "Get Free Profile Makeover",

    /**
     * Link where the button leads
     * Examples:
     * - "index.html#contact" (Contact form)
     * - "consulting.html" (Other page)
     * - "https://calendly.com/your-link" (External tool)
     * - "mailto:hello@variad.de" (Email)
     * - "tel:+4915511541310" (Phone)
     */
    buttonLink: "instagram-profile-review.html",

    /**
     * Should the link open in a new tab?
     * true = New tab
     * false = Same tab
     */
    openInNewTab: false,


    // ═══════════════════════════════════════════════════════════
    // "NO THANKS" BUTTON (Gray close button)
    // ═══════════════════════════════════════════════════════════

    /**
     * Text on the "decline" button
     * Example: "No thanks" or "Maybe later"
     */
    closeButtonText: "No thanks",


    // ═══════════════════════════════════════════════════════════
    // TIMING & BEHAVIOR
    // ═══════════════════════════════════════════════════════════

    /**
     * Delay until modal appears (in seconds)
     * Recommendation: 3-5 seconds
     * 0 = immediately, 5 = after 5 seconds
     */
    delaySeconds: 5,

    /**
     * Modal version / Campaign ID
     *
     * IMPORTANT: When users close the modal, they won't see it again.
     * To show the modal AGAIN (e.g., for new offer):
     * → Change this version number!
     *
     * Examples:
     * - "offer-january-2025"
     * - "summer-special-2025"
     * - "v2"
     */
    version: "instagram-makeover-january-2025",

    /**
     * Should the modal appear on mobile devices?
     * true = Yes, show everywhere
     * false = Desktop/tablet only
     */
    showOnMobile: true,


    // ═══════════════════════════════════════════════════════════
    // ADVANCED OPTIONS (optional)
    // ═══════════════════════════════════════════════════════════

    /**
     * On which pages should the modal NOT appear?
     * List of filenames (without path)
     *
     * Example: ["thank-you.html", "impressum.html"]
     * Leave empty = Modal appears everywhere
     */
    excludePages: [],

    /**
     * Debug mode (for testing)
     * true = Modal ignores localStorage (always appears)
     * false = Normal function
     *
     * ⚠️ Only for testing! Set back to false afterwards!
     */
    debugMode: false

};

// ═══════════════════════════════════════════════════════════════
// ⚠️ DON'T CHANGE ANYTHING BELOW THIS LINE!
// ═══════════════════════════════════════════════════════════════
