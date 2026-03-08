# Immersive Watercolor Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the Embers landing page so the lighthouse watercolor painting is the centerpiece, with all content floating over it — removing opaque blocky sections in favor of translucent warm panels and direct text overlays.

**Architecture:** Single-page site with the lighthouse painting as a scrolling body background (`background-attachment: scroll`, `background-size: cover`). Sections transition from fully transparent (hero) to lightly translucent floating panels (mission, story, activities). The scroll creates a "walking the path" feeling as you move through the painting from sky → path → flowers.

**Tech Stack:** HTML, CSS (vanilla), JS (vanilla — scroll reveal + nav)

**Key reference files:**
- `index.html` — all markup
- `style.css` — all styles
- `script.js` — nav scroll + intersection observer reveals
- `images/lighthouse.png` — 2992x4100 portrait watercolor

---

### Task 1: Background & Body — Scrolling Watercolor Foundation

**Files:**
- Modify: `style.css:7-55` (`:root` and `body` rules)

**Step 1: Update body background properties**

Change the body background from `fixed` to `scroll`, and add a bottom-edge fallback color that blends with the painting's lower tones:

```css
body {
  font-family: var(--font-sans);
  color: var(--text);
  background: var(--cream);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Scrolling watercolor background */
  background-image: url('images/lighthouse.png');
  background-attachment: scroll;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}
```

**Step 2: Update iOS fallback**

The iOS `@supports` block that forced `scroll` is now redundant. Remove it:

```css
/* DELETE this entire block: */
@supports (-webkit-touch-callout: none) {
  body {
    background-attachment: scroll;
    background-size: cover;
  }
}
```

**Step 3: Verify visually**

Open in browser. The painting should scroll with the page. The blocky sections will still be visible — that's expected, we'll fix them next.

**Step 4: Commit**

```bash
git add style.css
git commit -m "feat: switch lighthouse background to scroll for walk-the-path effect"
```

---

### Task 2: Hero Section — Transparent with Text Glow

**Files:**
- Modify: `style.css:213-317` (hero styles)

**Step 1: Strip hero overlay and add text-shadow readability**

The hero should be fully transparent. The lighthouse and sky are behind the text — readability comes from warm text-shadows, not backdrops. Remove the `::before` vignette overlay.

Replace the hero CSS block with:

```css
/* ============================================================
   HERO — Transparent, text over watercolor
   ============================================================ */

.hero {
  min-height: 100vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(100px, 14vh, 160px) var(--pad-h) clamp(60px, 8vh, 100px);
  position: relative;
  text-align: center;
}

.hero-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
  position: relative;
}

.hero-content {
  max-width: 640px;
  margin: 0 auto;
}

.hero-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brown-mid);
  margin-bottom: 14px;
  text-shadow: 0 0 20px rgba(255, 248, 238, 0.9);
  opacity: 0;
  animation: fadeUp 0.9s ease 0.1s forwards;
}

.hero-headline {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 5.5vw, 4.4rem);
  font-weight: 700;
  line-height: 1.06;
  color: var(--brown-dark);
  margin-bottom: 18px;
  text-shadow:
    0 0 30px rgba(255, 248, 238, 0.8),
    0 0 60px rgba(255, 248, 238, 0.5);
  opacity: 0;
  animation: fadeUp 0.9s ease 0.25s forwards;
}

.hero-scripture {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(0.95rem, 1.5vw, 1.08rem);
  color: var(--brown-mid);
  line-height: 1.6;
  margin-bottom: 16px;
  text-shadow: 0 0 20px rgba(255, 248, 238, 0.9);
  opacity: 0;
  animation: fadeUp 0.9s ease 0.42s forwards;
}

.hero-scripture span {
  font-style: normal;
  font-size: 0.82em;
  letter-spacing: 0.05em;
  opacity: 0.65;
}

.hero-body {
  font-size: clamp(0.92rem, 1.4vw, 1.02rem);
  color: var(--brown-mid);
  line-height: 1.72;
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 0 20px rgba(255, 248, 238, 0.9);
  opacity: 0;
  animation: fadeUp 0.9s ease 0.56s forwards;
}

.hero-ctas {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  animation: fadeUp 0.9s ease 0.7s forwards;
}
```

**Step 2: Verify visually**

The hero text should float cleanly over the sky/lighthouse area. The warm glow text-shadows should make everything readable without any visible backdrop.

**Step 3: Commit**

```bash
git add style.css
git commit -m "feat: make hero fully transparent with warm text-shadow readability"
```

---

### Task 3: Mission Section — Floating Translucent Panel

**Files:**
- Modify: `style.css:319-369` (mission styles)
- Modify: `index.html:48-63` (mission markup — convert to stacked layout)

**Step 1: Update mission markup to stacked centered layout**

Replace the side-by-side grid with a single stacked column. Remove the divider element:

```html
  <!-- PURPOSE & MISSION -->
  <section class="mission" id="mission">
    <div class="mission-panel">
      <span class="section-label reveal">Our Why</span>
      <div class="mission-block reveal reveal-delay-1">
        <h2 class="mission-heading">Purpose</h2>
        <p>To build virtuous, loving and responsible disciples of Christ through accountability and responsible leadership.</p>
      </div>
      <div class="mission-block reveal reveal-delay-2">
        <h2 class="mission-heading">Mission</h2>
        <p>Create a community and network for disciples of Jesus Christ in business to be the light of the world.</p>
      </div>
    </div>
  </section>
```

**Step 2: Replace mission CSS with floating panel**

Remove all existing mission styles and replace with:

```css
/* ============================================================
   PURPOSE & MISSION — Floating translucent panel
   ============================================================ */

.mission {
  padding: var(--pad-v) var(--pad-h);
  display: flex;
  justify-content: center;
}

.mission-panel {
  max-width: 620px;
  width: 100%;
  background: rgba(255, 248, 238, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: clamp(32px, 5vw, 52px) clamp(28px, 4vw, 48px);
  text-align: center;
}

.mission .section-label {
  color: var(--orange);
}

.mission-block {
  margin-top: 32px;
}

.mission-block + .mission-block {
  margin-top: 36px;
  padding-top: 36px;
  border-top: 1px solid rgba(42, 31, 20, 0.08);
}

.mission-heading {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  font-weight: 700;
  color: var(--brown-dark);
  margin-bottom: 12px;
  line-height: 1.2;
}

.mission-block p {
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  line-height: 1.78;
  color: var(--text-mid);
}
```

**Step 3: Verify visually**

The mission section should appear as a centered rounded panel floating over the painting, with the watercolor visible around and through it. The section label should now use orange (not yellow, since there's no dark background).

**Step 4: Commit**

```bash
git add style.css index.html
git commit -m "feat: replace blocky mission section with floating translucent panel"
```

---

### Task 4: Story Section — Translucent Panel, Drop Image Slot

**Files:**
- Modify: `style.css:371-424` (story styles)
- Modify: `index.html:66-83` (story markup — remove image slot, single column)

**Step 1: Update story markup**

Remove the two-column grid and image slot. The lighthouse painting IS the visual. Single centered column:

```html
  <!-- STORY -->
  <section class="story" id="story">
    <div class="story-panel">
      <span class="section-label reveal">Our Story</span>
      <h2 class="section-heading reveal reveal-delay-1">Two people.<br>One conviction.</h2>
      <p class="reveal reveal-delay-2">Embers started with two people and a simple conviction: faith and business don't have to be separate worlds.</p>
      <p class="reveal reveal-delay-3">We believe Jesus calls his followers into every corner of life — including the marketplace. That means the lecture halls, the case rooms, the networking events, and the boardrooms. We exist to gather those who want to answer that call together — to build each other up, stay accountable, and be the kind of people who shine wherever they're placed.</p>
      <p class="reveal reveal-delay-4">If you've ever felt the tension between your faith and your ambition, you're not alone. This community is for you.</p>
    </div>
  </section>
```

**Step 2: Replace story CSS with floating panel**

Remove all existing story styles (`.story`, `.story-inner`, `.story-text`, `.story-visual`, `.image-slot`, `.story-placeholder-art`) and replace:

```css
/* ============================================================
   STORY — Floating translucent panel
   ============================================================ */

.story {
  padding: var(--pad-v) var(--pad-h);
  display: flex;
  justify-content: center;
}

.story-panel {
  max-width: 620px;
  width: 100%;
  background: rgba(255, 248, 238, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: clamp(32px, 5vw, 52px) clamp(28px, 4vw, 48px);
}

.story-panel .section-heading {
  color: var(--brown-dark);
}

.story-panel p {
  font-size: 0.97rem;
  line-height: 1.78;
  color: var(--text-mid);
  margin-bottom: 16px;
}

.story-panel p:last-child {
  margin-bottom: 0;
}
```

**Step 3: Verify visually**

The story should be a single centered translucent panel, slightly more opaque than mission (0.65 vs 0.55) since it has denser text. The painting should be visible through and around it.

**Step 4: Commit**

```bash
git add style.css index.html
git commit -m "feat: replace blocky story section with floating panel, remove image slot"
```

---

### Task 5: Activities Section — Translucent Cards on Transparent Background

**Files:**
- Modify: `style.css:426-529` (activities styles)
- Modify: `index.html:86-123` (activities markup — restyle featured card)

**Step 1: Update featured card markup**

Remove the ghost art image and simplify. Change from solid orange to a translucent warm accent:

```html
  <!-- WHAT WE DO -->
  <section class="activities" id="activities">
    <div class="activities-inner">
      <span class="section-label reveal">What We Do</span>
      <h2 class="section-heading reveal reveal-delay-1">Faith. Community. Impact.</h2>
      <div class="activities-grid">

        <div class="activity-card activity-card--featured reveal reveal-delay-1">
          <span class="featured-label">Flagship Event</span>
          <h3>Panel Nights</h3>
          <p>We bring in leaders from the business world to share one thing: how their faith shapes what they do. The decisions they make, the people they lead, the work they pursue. Real people, real stories.</p>
        </div>

        <div class="activity-card reveal reveal-delay-2">
          <h3>Bible Studies</h3>
          <p>Weekly deep dives into Scripture and what it means to live faithfully in a competitive world.</p>
        </div>

        <div class="activity-card reveal reveal-delay-2">
          <h3>Trivia Nights</h3>
          <p>Community, laughter, and a healthy dose of competition. Just good people having a good time.</p>
        </div>

        <div class="activity-card reveal reveal-delay-3">
          <h3>DTES Volunteering</h3>
          <p>Serving alongside our neighbours in Vancouver's Downtown Eastside, putting love into action.</p>
        </div>

        <div class="activity-card reveal reveal-delay-4">
          <h3>Case Competitions</h3>
          <p>Taking our values into the arena — business problems, faith-driven teams, and integrity in the room.</p>
        </div>

      </div>
    </div>
  </section>
```

**Step 2: Replace activities CSS**

Remove all existing activities styles and replace:

```css
/* ============================================================
   ACTIVITIES — Translucent cards, transparent section
   ============================================================ */

.activities {
  padding: var(--pad-v) var(--pad-h);
}

.activities-inner {
  max-width: var(--max-w);
  margin: 0 auto;
}

.activities .section-label {
  text-shadow: 0 0 20px rgba(255, 248, 238, 0.9);
}

.activities .section-heading {
  text-shadow:
    0 0 24px rgba(255, 248, 238, 0.8),
    0 0 48px rgba(255, 248, 238, 0.4);
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 28px;
}

/* Base card — translucent parchment */
.activity-card {
  background: rgba(255, 248, 238, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: clamp(20px, 2.5vw, 28px);
  border: 1px solid rgba(42, 31, 20, 0.06);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.activity-card:not(.activity-card--featured):hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(42, 31, 20, 0.1);
}

.activity-card h3 {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brown-dark);
  margin-bottom: 12px;
  line-height: 1.25;
}

.activity-card p {
  font-size: 0.94rem;
  line-height: 1.76;
  color: var(--text-mid);
}

/* Featured Panel Nights card */
.activity-card--featured {
  grid-column: span 2;
  background: rgba(255, 248, 238, 0.7);
  border: 1px solid rgba(243, 108, 30, 0.15);
}

.activity-card--featured:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(243, 108, 30, 0.12);
}

.featured-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--orange);
  display: block;
  margin-bottom: 10px;
}

.activity-card--featured h3 {
  color: var(--brown-dark);
  font-size: 1.5rem;
}

.activity-card--featured p {
  color: var(--text-mid);
}
```

**Step 3: Verify visually**

Cards should appear as warm translucent parchment floating over the painting. The featured card should have a subtle orange border glow. No solid orange block.

**Step 4: Commit**

```bash
git add style.css index.html
git commit -m "feat: replace blocky activities section with translucent parchment cards"
```

---

### Task 6: Footer & Nav — Transparent Finishing Touches

**Files:**
- Modify: `style.css:531-560` (site-bottom styles)
- Modify: `style.css:165-211` (nav styles)

**Step 1: Replace footer with transparent style**

Remove all existing `.site-bottom` and `.instagram-link` styles and replace:

```css
/* ============================================================
   SITE BOTTOM — Transparent
   ============================================================ */

.site-bottom {
  padding: 36px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.instagram-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--brown-mid);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-shadow: 0 0 16px rgba(255, 248, 238, 0.9);
  transition: color 0.22s ease;
}

.instagram-link:hover {
  color: var(--orange);
}
```

**Step 2: Update nav for translucent warmth**

Update the `.nav.scrolled` state to use a warmer, more translucent backdrop that fits the new aesthetic:

```css
.nav.scrolled {
  background: rgba(255, 248, 238, 0.5);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  box-shadow: 0 1px 0 rgba(42, 31, 20, 0.06);
  padding: 12px 0;
}
```

**Step 3: Verify visually**

Footer should be fully transparent, just the Instagram link floating at the bottom of the painting. Nav should be barely-there when scrolled.

**Step 4: Commit**

```bash
git add style.css
git commit -m "feat: make footer transparent and soften nav backdrop"
```

---

### Task 7: Responsive Adjustments

**Files:**
- Modify: `style.css` (responsive media queries at bottom)

**Step 1: Update responsive rules**

Replace existing responsive blocks. The main changes: mission/story panels go full-width on mobile, activity grid collapses, remove references to deleted elements (`.mission-grid`, `.mission-divider`, `.story-inner`, `.story-visual`):

```css
/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 920px) {
  .activities-grid {
    grid-template-columns: 1fr 1fr;
  }

  .activity-card--featured {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  :root {
    --pad-v: 60px;
  }

  .activities-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .activity-card--featured {
    grid-column: span 1;
  }

  .hero-ctas {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .mission-panel,
  .story-panel {
    padding: 28px 22px;
    border-radius: 14px;
  }
}
```

**Step 2: Verify on mobile viewport**

Check at 375px and 768px widths. Panels should have comfortable padding, cards should stack, text should remain readable.

**Step 3: Commit**

```bash
git add style.css
git commit -m "feat: update responsive rules for new translucent layout"
```

---

### Task 8: Final Visual Polish

**Files:**
- Modify: `style.css` (spacing, transitions, any final tweaks)

**Step 1: Review full scroll experience**

Scroll through the entire page slowly. Check:
- [ ] Hero text readable over sky area
- [ ] Smooth visual transition between sections
- [ ] Painting visible between/through all sections
- [ ] No hard edges or blocky breaks
- [ ] "Walking the path" feeling is present
- [ ] Footer feels like an ending, not a block

**Step 2: Adjust spacing if needed**

If sections feel too tight and the painting can't breathe, increase `--pad-v` or add margin between sections. If any section's translucency needs tuning (too see-through or too opaque), adjust the rgba alpha values.

**Step 3: Final commit**

```bash
git add style.css index.html
git commit -m "feat: final visual polish for immersive watercolor redesign"
```
