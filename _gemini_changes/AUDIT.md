# Visual & UX Audit (Phase 8: Visual Polish)

**Role:** Senior UX/UI & Frontend Design Expert
**Date:** 2026-01-08
**Scope:** Visual Consistency & UX Refinement (No functional changes)

## 1. System Analysis

### Grid & Layout
*   **Current State:** Mixed container widths (`1200px`, `1400px`, `1480px`, `1600px`).
*   **Target:** Unify to `1400px` (Standard) and `1000px` (Reading/Content). Wide/Full sections allowed but controlled.
*   **Padding:** Varies significantly (`60px` to `120px`). Target: `120px` (Section Desktop), `80px` (Section Mobile).

### Typography
*   **Current State:** Fragmented `clamp()` definitions and fixed pixel values (`16px`, `17px`, `18px`, `20px` body).
*   **Target:**
    *   Body: `18px` (Desktop) / `16px` (Mobile).
    *   H1: `clamp(48px, 6vw, 80px)`
    *   H2: `clamp(36px, 4vw, 56px)`
    *   H3: `24px`
    *   Labels/Small: `14px`

## 1.1 Seiten-Sektionen (Struktur & Verhalten)

- Header/Nav (fixed): Auto‑Hide/Show, Hover‑Blur‑Backdrop, Ankerlinks; CTA rechts.
- Hero: Fünf Glow‑Layer (fixed, screen blend), Noise‑Overlay, rechts Halbkreis‑Video, 3‑Zeiler Headline.
- Partners: Marquee‑Logos (dupliziert für nahtlose Schleife), horizontale Mask‑Fades.
- Editorial („Services Intro“): Linke Textsäule mit CTA‑Layer; rechts Sticky‑„cf‑cards“ (Content/SMM/Ads).
- Services: 2×3 Karten, Cursor‑Glow + Border‑Ring, 3D‑Transform JS‑gesteuert.
- Why VARIAD: Stats (Kennzahlen), Bento‑Grid (Editorial‑Card, Dots‑Card mit Sequenz, PM‑Card Sequenz).
- SMM: Sticky Phone Showcase, dynamische Tapes, Emoji‑Layer mit Collision‑Avoid, Scroll‑gesteuerte Text‑Slides.
- Content‑Production: Großes SVG‑Kamerasystem, HTML‑Screen exakt im SVG‑Display, 4 Produktions‑Cards scroll‑gesteuert.
- Portfolio: Bild‑Marquees, schmaler CTA‑Stripe „Mehr sehen“ mit White‑Core/Blur.
- Kontakt (Wizard): Intent‑Chips → Budget → Kontakt (Name + E‑Mail/Telefon), Mailto‑Handoff, Draft in localStorage.
- Footer: Brand, Rechtliches/Platzhalter, Kontakt, Social.

### Components
*   **Radius:** `12px` (UI), `20px` (Cards). Eliminate `14px`, `16px`, `18px` variations.
*   **Buttons:** Standardize padding to `16px 32px` for primary actions.
*   **Colors:** Replace hardcoded `rgba(220, 38, 38, ...)` with `var(--brand-red)` derivatives or new tokens.

## 2. Inconsistency Log (Top 20, präzise)

1) Containerbreiten: `#why-variad .wrap` nutzt 1480px, Standard-Container 1400px → optische Brüche an Kanten.
2) Section‑Abstände: `section` (120px) vs `#contact` (eigene Logik) vs `#portfolio` (inline style `padding-top: 20px`) → uneinheitlicher vertikaler Rhythmus.
3) Scroll‑Offsets: `html{scroll-padding-top:80px}` vs `section{scroll-margin-top:90px}` → Anker springen minimal inkonsistent.
4) Typo‑Skala: H2 (`var(--text-h2)`), aber `#contact .section-title` setzt eigene clamp() → Hierarchie wirkt je Sektion anders.
5) Line‑Height: Unterschiedliche Zeilenabstände (Hero, Editorial, Slides) → Baseline‑Rhythmus nicht einheitlich.
6) Font‑Weights: 700/800/900 gemischt (Logos, Headlines, Zahlen) → zu viele Stufen, unruhiges Gewicht.
7) Letter‑Spacing: `.cta-button` (.02em) vs `.marquee-cta` (.10em uppercase) → abweichende Mikrotypografie.
8) Radius: 20px (Cards), 12px (UI), 14px (Chips) → Chips weichen vom System ab.
9) Shadows: Mehrere ad‑hoc Box‑Shadows (Intensität/Farbe) → fehlende Shadow‑Tokens.
10) Button‑Höhen: `.cta-button` vs `.btn-primary`/`.btn-secondary` padding/height differieren → Interaktion uneinheitlich.
11) Focus‑Rings: `.cta-button` hat eindeutigen Focus, andere Buttons/Inputs uneinheitlich → A11y‑Inkonstanz.
12) Motion‑Dauer/Easing: 0.2s/0.3s/0.4s und unterschiedliche Curves → kein einheitliches Motion‑System.
13) Prefers‑Reduced‑Motion: Starke Glows/Marquees ohne reduziertes Fallback → Accessibility‑Lücke.
14) Sticky‑Gefühl: SMM‑Showcase vs Camera‑Section unterscheiden sich in „Pacing“ und Start‑Trigger → subjektiv uneinheitlich.
15) Partner‑Logos: Unterschiedliche vertikale Ausrichtung/optische Höhe, keine konsistente CSS‑Höhennormierung.
16) Section‑Header: Abstand Titel→Subtitel (16px vs 60px in Editorial) variiert stark.
17) Container‑Gutters: Desktop 60px, Mobile 24px, aber `#why-variad .wrap{padding:22px}` und `.pricing-grid-new{padding:40px}` → Mischwerte.
18) Farbwerte: Wiederholt direkte rgba‑Werte statt Tokens (z.B. Service/Price Glows, Stripes) → Wartbarkeit/Drift.
19) Hero‑Glows: relative Opacity/Blur differieren; ohne Motion‑Fallback potenziell dominant auf Low‑Power‑Geräten.
20) Portfolio‑CTA‑Stripe: White‑Core/Blur sehr präsent; im Gesamtsystem kein Referenz‑Token → optische Dissonanz.

## 3. Optimization Plan (Step-by-Step)

This plan prioritizes global systems first, then component unification, then specific section tuning.

### Step 1: Global Variables & Grid System
*   **Goal:** Unify containers and spacing variables.
*   **Action:** Ergänze/vereinheitliche Tokens (Spacing, Container, Shadows, Motion). Angleiche `.nav-container`, `section`, `#why-variad .wrap` an Standardwerte.
*   **Files:** `assets/css/style.css`
*   **Risk:** Niedrig – reine Variablen/Abstände, keine Logik.
*   **Verify:** Pixel‑Check Kanten/Container Desktop/Mobile, Anker‑Scroll korrekt.

### Step 2: Typography Standardization
*   **Goal:** Consistent font sizes and line heights.
*   **Action:** Definiere H‑Skala/Body/Small + line‑height Tokens; vereinheitliche `section`‑Titel/Subtitel und Editorial.
*   **Files:** `assets/css/style.css`
*   **Risk:** Niedrig – mögliche minimal andere Zeilenumbrüche.
*   **Verify:** Headline‑Hierarchie entspricht Design‑Skala, keine Layout‑Sprünge.

### Step 3: Component Unification (Cards & Radius)
*   **Goal:** One "Card" look (glassmorphism/border/glow).
*   **Action:** Erzeuge `.card-base` Stil via kombinierte Selektoren (ohne HTML‑Änderungen); vereinheitliche Radius=20, Border, Shadow Tokens.
*   **Files:** `assets/css/style.css`
*   **Risk:** Mittel – visuelle Veränderungen an mehreren Komponenten.
*   **Verify:** Visuelle Gleichheit Service/Stat/Price Cards, Hover/Border‑Ring konsistent.

### Step 4: Button & Interaction Consistency
*   **Goal:** Predictable interactive elements.
*   **Action:** Vereinheitliche `.cta-button`, `.btn-primary`, `.btn-secondary` (Höhe, Padding, Focus, Disabled). Selektoren statt HTML‑Änderung.
*   **Files:** `assets/css/style.css`
*   **Risk:** Niedrig – keine Logik, nur Styles.
*   **Verify:** Messbare Button‑Höhe, konsistenter Focus‑Ring, keine Überläufe.

### Step 5: Sticky Section Harmonization
*   **Goal:** Similar scroll "feel" for SMM and Camera sections.
*   **Action:** Nur visuelle Offsets/`top`/`scroll-padding` angleichen (keine JS‑Änderung), Sticky‑Start visuell synchronisieren.
*   **Files:** `assets/css/style.css`
*   **Risk:** Mittel – beeinflusst subjektives Scroll‑Gefühl.
*   **Verify:** Sticky klebt an gleicher visueller Höhe, Wechsel smooth.

### Step 6: Responsive & Mobile Polish
*   **Goal:** Perfect mobile experience.
*   **Action:** Vereinheitliche Mobile/Tablet Gutters (24px), Text‑Max‑Breiten, vermeide Overflows (Logos, CTA‑Stripe, Emojis Layer Überdeckung nur via CSS‑Z‑Index/Pointer‑Events prüfen).
*   **Files:** `assets/css/style.css`
*   **Risk:** Niedrig – visuelles Layout.
*   **Verify:** Keine Abschneidungen/Overflows bei üblichen Devices.

### Step 7: Motion Harmonization (+ Reduced Motion)
*   **Goal:** Ruhige, konsistente Animationen; A11y‑Fallback.
*   **Action:** Definiere Dauer/Easing‑Tokens (200/300/500ms, standard ease); nutze sie in Buttons/Cards/Links; füge `@media (prefers-reduced-motion: reduce)` für Hero‑Glows/Marquees/Transitions hinzu (deaktivieren/verlangsamen).
*   **Files:** `assets/css/style.css`
*   **Risk:** Niedrig – Graceful Degradation.
*   **Verify:** Bewegungen konsistent; mit Reduced‑Motion deutlich ruhiger.

### Step 8: Partners/Portfolio Alignment
*   **Goal:** Logos und CTA‑Stripe optisch sauber.
*   **Action:** Einheitliche Logo‑Höhe/Ausrichtung via `.logo-img{height}` + object‑fit; CTA‑Stripe Kontrast/Blur über Tokens harmonisieren.
*   **Files:** `assets/css/style.css`
*   **Risk:** Niedrig – rein visuell.
*   **Verify:** Keine springenden Logos; Stripe fügt sich ins Gesamtsystem.

---

## 4. Globale Design Tokens (Ist → Soll)

– Spacing: `--section-spacing: 120px` (Desktop), `--section-spacing: 80px` (Mobile) – beibehalten, Lücken schließen (Portfolio/Contact).
– Gutters: `--container-padding: 60px` Desktop / `24px` Mobile – vereinheitlichen (Why‑Variad/Preisraster).
– Typography: `--text-h1/h2/h3`, `--text-lead`, `--text-body`, `--text-small` – konsistent verwenden (Contact/Editorial angleichen).
– Radii: `--radius-card: 20px`, `--radius-ui: 12px` – Chips harmonisieren.
– Shadows: Neue Tokens (z.B. `--shadow-md/lg`) statt ad‑hoc Werte.
– Motion: Neue Tokens `--dur-200/300/500`, `--ease-standard`.
– Colors: Bestehende Brandfarben nutzen; direkte rgba durch Tokens ersetzen, wo sinnvoll.

## 4. Risks & Constraints
*   **Sticky Logic:** Changing `vh` heights might break the scroll-timeline animations in JS. **Mitigation:** Only adjust visual padding/margins, keep scroll track lengths if JS depends on them (check JS first).
*   **Regression:** Visual changes might break layout alignment. **Mitigation:** Backup before every step.
