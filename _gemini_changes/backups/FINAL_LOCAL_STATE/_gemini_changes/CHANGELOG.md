# Changelog - Visual Polish & Deep Harmonization

## [1.1.1] - 2026-01-08

### Docs / Planning
- Added updated visual UX audit with Top‑20 inconsistencies and an 8‑step harmonization plan.
- Created `steps/STEP-01-visual-ux-audit-and-plan.md` for traceability.
- No code changes in this step (safety first).

## [1.1.2] - 2026-01-08

### Spacing Normalization (Step 02)
- Added global spacing tokens (`--space-*`) based on an 8px grid.
- Aligned anchor offsets (`section scroll-margin-top` to 80px) with html scroll padding.
- Standardized `.section-header` and H2→Text spacing via tokens.
- Normalized Why‑Variad container/gutters to system values.
- Replaced off‑grid margins (60→48px, 28→24px) in selected sections.
- Overrode inline portfolio padding to use standard `--section-spacing`.

## [1.1.3] - 2026-01-08

### Wizard Spacing (Step 02a)
- Increased end spacing below the chip selection (`.chip-grid`) to prevent the Next button from sitting too close to the last option.
- Desktop: `margin-bottom: var(--space-32)`; Mobile: `var(--space-24)`.

## [1.1.4] - 2026-01-08

### Wizard Nav Offset (Step 02b)
- Increased `.wiz-nav` top margin to `var(--space-64)` (desktop) and tokenized mobile value (`var(--space-40)`) to create clearer separation from the last chip.

## [1.1.5] - 2026-01-08

### Wizard Nav Fine-Tune (Step 02c)
- Reduced `.wiz-nav` top margin from `var(--space-96)` to `var(--space-64)` per visual feedback to achieve a balanced gap.

## [1.1.0] - 2026-01-08

### Deep Harmonization
- **Strict Spacing Enforcement:**
    - `#why-variad`, `#partners`, `#contact` forced to use `var(--section-spacing)` (120px) instead of random values (80px, 100px).
    - Removed ad-hoc padding overrides for `#partners` and `#services`.
- **Sticky Scroll Tuning:**
    - `#content-production` (Camera): Increased height from `500vh` to `600vh` to match SMM pacing.
    - `#why-ads` (Chart): Increased height from `200vh` to `300vh` for a smoother, less rushed animation.

## [1.0.0] - 2026-01-08

### Added
- **Design System Tokens:** Added global CSS variables for Spacing (`--section-spacing`, `--container-padding`), Typography (`--text-h1`, `--text-h2`, etc.), and UI (`--radius-card`, `--radius-ui`).
- **Responsive Variables:** Mobile spacing now handled via `:root` override in media query instead of hardcoded overrides.

### Changed
- **Grid System:** `section` and `.nav-container` now use `--container-width` (1400px) and `--container-padding` (60px) for consistent alignment.
- **Typography:** `.hero-title` and `.section-title` now use standardized `clamp()` variables.
- **Buttons:** `.btn-primary` and `.btn-secondary` padding standardized to `16px 36px` with `12px` radius. `.cta-button` updated to match.
- **Cards:** `.ad-card`, `.stat-card` updated to use `--radius-card` (20px) for consistent look with Service cards.
- **Mobile Layout:** Removed hardcoded padding overrides in media queries to allow system variables to scale naturally to `24px` padding.

### Fixed
- **Inconsistencies:** Eliminated mixed border-radius (16px vs 20px) and button sizes (18px vs 12px padding).
