# AirPods 5 Demo — Product-Led Flow Brief

## Goal

Rework the existing demo into a calm, product-led browsing experience inspired by the pacing of the current Apple India AirPods pages. It must be an original implementation and must not copy Apple source, layout geometry, photos, video, logo, or trade dress.

The reference is about the **flow**, not copying a screenshot:

1. a focused full-screen product introduction;
2. a small number of clear choices;
3. large visual feature moments;
4. one concise comparison step;
5. an external hand-off to the official Apple India page.

## Content facts to preserve

- There are two AirPods 5 options: standard Charging Case and Wireless Charging Case.
- Standard: USB-C case and up to 4 hours listening with Active Noise Cancellation.
- Wireless Charging Case: USB-C, Qi and Apple Watch charging; up to 5 hours listening with Active Noise Cancellation.
- Use the official Apple India product page as the source of truth for availability, pricing and feature wording.
- Keep the site explicitly labelled as an independent concept demo and link to Apple India for the actual store experience.

## Homepage flow

### 1. Minimal sticky header

- Brand: `A5 / demo` (do not use the Apple logo).
- Links: Models, Compare, Apple India, Pre-order.
- Use a quiet translucent dark header.
- The call to action should link externally to Apple India in a new tab.

### 2. Full-screen hero

- Start with a black or charcoal stage and one large original product render.
- Copy is deliberately short:
  - New
  - AirPods 5
  - Discover the magic of Active Noise Cancellation.
- Include only two actions: `Explore AirPods 5` and `Choose a model`.
- Let the product stay on-screen longer than the text. On pointer movement, use a restrained 3D tilt. Do not add a constantly spinning object.

### 3. Model selection

- Heading: `Meet the family.`
- Show two large, side-by-side panels on desktop; stack them on mobile.
- Each panel gets one description, one link and a large product visual.
- The visual can rise a few pixels on hover. Avoid flips, bounces, or tiny interactive cards.

### 4. Take a closer look — the main scroll moment

This is the most important section. Build it as an original split-scroll product viewer, taking inspiration from the **interaction model** on the MacBook Neo reference page:

- The outer section is tall (roughly 320–400vh on desktop).
- Inside it, a single stage is pinned while the reader scrolls.
- The copy lives in a narrow left column. Each story beat fades from muted grey to white as it becomes active.
- The original AirPods concept render lives in a separate right column. As the active copy changes, it eases to a new pose: small rotation, scale and vertical shift. It must feel like one continuous product inspection, not an endlessly spinning object.
- On mobile, remove the pinned two-column composition: show each copy beat followed by its static product state. The information must not depend on scroll-driven motion.
- Respect `prefers-reduced-motion`: use instant state changes or a single static product render.

Use four left-column story beats:

1. `Open-ear comfort.` — light, comfortable fit with short-stem buds and no silicone tips.
2. `Control within reach.` — force sensor controls; the Wireless Charging Case model adds volume swipe.
3. `Sound designed around you.` — Active Noise Cancellation, Transparency and Adaptive Audio.
4. `A case for every day.` — USB-C charging on both; Qi and Apple Watch charging on the Wireless Charging Case.

The initial page should arrive at this section with the exact heading: **Take a closer look.**

Implementation outline:

```text
section (min-height: 360vh)
  sticky viewport-height stage
    left: four narrative steps
    right: one visual frame containing the original render
  ScrollTrigger timeline:
    step 1 → rotateY(-8deg), scale(0.94), y(2%)
    step 2 → rotateY(8deg), rotateX(4deg), scale(1.00)
    step 3 → rotateY(-4deg), scale(1.07), y(-3%)
    step 4 → rotateY(0deg), rotateX(0deg), scale(0.98)
```

Use `scrub` so the visual follows the scroll position. Do not use scroll-jacking, a forced scroll duration or an autoplaying video as a substitute.

### 5. Highlights gallery and feature cards

- Place this section after **Take a closer look.**
- Heading: `Get the highlights.`
- Make this a horizontal, touch-friendly card rail rather than a tall grid. It is the required fallback for any missing video content.
- Include four concise moments:
  1. Active Noise Cancellation and Transparency.
  2. Adaptive Audio.
  3. Personalised Spatial Audio.
  4. Wireless charging and longer listening time.
- Show visible previous/next controls and allow swipe or trackpad scroll.
- Use large typography, one idea per card, and a light neutral background.

### 6. Video policy — fix the current placeholders

The existing empty `data-video` attributes and generic redirect to the Apple YouTube channel are not acceptable. Replace the video-slot behaviour with one of these two verified states:

1. **Designated shared product films:** show these on the homepage in this exact order:
   1. `https://www.youtube.com/watch?v=ZldS1ZXpPHE` (`data-video="ZldS1ZXpPHE"`)
   2. `https://www.youtube.com/watch?v=XSiGaXPssd4` (`data-video="XSiGaXPssd4"`)

   Autoplay the first film on the homepage, muted and inline (`autoplay=1&mute=1&playsinline=1`); this is the reliable cross-browser autoplay behaviour. Load the second only after the user presses Play.
2. **No verified model-specific film:** do not render a fake video player. Render the four-card highlight gallery instead and provide one clearly labelled external link: `View product film on Apple India`.

The two charging-case variants should not receive invented, separate YouTube videos. Use the selected shared film once on the homepage product story; the individual product pages should link back to that shared film. Feature cards remain directly below it, so the page remains valuable if the video cannot be loaded.

### 7. Comparison hand-off

- One dark, simple comparison panel—not a dense specification spreadsheet.
- Give the user the decision in one glance:
  - AirPods 5: USB-C case, up to 4 hours with ANC.
  - Wireless Charging Case: USB-C / Qi / Apple Watch charging, up to 5 hours with ANC.
- Link to the existing detailed `compare.html` page.

### 8. Footer

- State that this is an independent concept demo and is not affiliated with Apple.
- Keep a link to the project MIT licence.
- Point users to the official Apple India AirPods 5 page for product details and purchase.

## Interaction rules

- Use Motion for JavaScript (the non-React Motion package) for homepage entrance and scroll-linked transforms. Keep GSAP only where an existing page already depends on it; do not turn Motion and GSAP into competing controllers for the same element.
- Respect `prefers-reduced-motion`; content must remain fully visible and usable.
- Use smooth scrolling only for links to sections on the same page.
- No autoplay audio.
- No fake video embed. If an official video ID has not been verified, use feature cards and link to Apple India instead.
- Keep every primary action keyboard accessible and visibly focused.
- The page must still work when GSAP does not load. GSAP should enhance motion, never gate content.

## UI/UX Pro Max build contract

### System choice

The UI/UX design-system pass selected **scroll-triggered storytelling** with a spacious, minimal presentation. Apply that pattern, but tune its generic luxury recommendations to a consumer-technology product page:

- Keep `Inter` (or system UI sans-serif) rather than decorative serif display type.
- Use a near-black stage, white product, quiet graphite text and one restrained blue action colour. Do not introduce gold accents, gradients that compete with the product, glass cards or a mixed style system.
- Design for low visual variance and high spatial calm: one dominant object or idea per viewport.
- Keep body text at 16px or larger; maintain 4.5:1 text contrast; preserve visible keyboard focus.

Suggested page tokens:

```css
:root {
  --a5-black: #000000;
  --a5-surface: #161617;
  --a5-paper: #f5f5f7;
  --a5-text: #f5f5f7;
  --a5-muted: #a1a1a6;
  --a5-link: #2997ff;
  --a5-radius: 28px;
  --a5-space: clamp(24px, 5vw, 80px);
}
```

### Motion ownership

The project is static HTML. Use **Motion for JavaScript**, loaded as a pinned ES-module import, rather than migrating the site to React only to use Framer Motion.

```html
<script type="module">
  import { animate, inView, scroll } from "https://cdn.jsdelivr.net/npm/motion@13.2.0/+esm";
</script>
```

| Element | Controller | Behaviour |
| --- | --- | --- |
| Hero copy | Motion `animate()` | One 600–800ms fade/raise on load. |
| Hero product | Motion `scroll()` | Gentle vertical drift and 0–4° rotation as the hero leaves. |
| `Take a closer look.` stage | CSS `position: sticky` + Motion `scroll()` | The active left story beat changes; the right image interpolates between four poses. |
| Highlight cards | Native horizontal scrolling plus buttons | Buttons scroll one card-width; touch/trackpad work naturally. |
| Existing detail pages | Existing GSAP only | Leave untouched until the homepage is approved. |

Animate only `transform` and `opacity`. Never animate layout width, height, top or left while scrolling. Stop or avoid non-essential animation under `prefers-reduced-motion`.

### Product-story timing

| Moment | Desktop behaviour | Mobile / reduced motion |
| --- | --- | --- |
| Hero | Product enters after the title; no looping spin. | Static product image after copy. |
| First film | Starts muted when its section becomes visible; user controls sound. | Same muted autoplay when supported; poster and play control if blocked. |
| Closer look | 360vh scroll region; sticky two-column stage. | Normal vertical reading order; all four beats visible. |
| Second film | Click to play after the feature cards. | Click to play. |

### Visual QA before claiming completion

- [ ] Desktop checked at 1440px and 1024px; mobile checked at 375px and 768px.
- [ ] No horizontal page overflow, clipped heading, or hidden focus outline.
- [ ] Product remains the visual priority; cards never overwhelm the hero or closer-look stage.
- [ ] The pinned section releases naturally at the end; there is no forced scroll or jump.
- [ ] First YouTube iframe has a reserved aspect ratio and does not create layout shift.
- [ ] If YouTube blocks autoplay, the poster/play fallback remains readable and operable.
- [ ] Motion and GSAP never animate the same element.

## Visual direction

- Use the original concept asset at `assets/images/airpods-5-concept-hero.png`.
- AirPods 5 visual geometry: white open-fit earbuds, short angled stems, no silicone tips, compact rounded case.
- Use generous empty space, simple colour fields, rounded panels and restrained blue links.
- Do not use Apple’s logo, official product photography, videos, or copied page copy.

## Files to change

| File | Responsibility |
| --- | --- |
| `index.html` | New homepage sequence and accessible page structure. |
| `assets/styles.css` | Homepage layout, responsive design and reduced-motion styles. |
| `assets/app.js` | Optional hero tilt, pinned split-scroll timeline, section reveals and feature-rail controls. |
| `airpods-5.html` | Keep as the standard model detail page. |
| `airpods-5-wireless.html` | Keep as the Wireless Charging Case detail page. |
| `compare.html` | Keep as the complete side-by-side details page. |

## Acceptance checklist

- [ ] The first screen gives one product story, not a collection of unrelated cards.
- [ ] Users can choose either model within two scroll lengths.
- [ ] `Take a closer look.` is a desktop pinned split-scroll inspection: story on the left, product transformation on the right.
- [ ] On mobile and reduced motion, the closer-look content remains complete without pinning or animated rotation.
- [ ] Highlights move horizontally with buttons, touch and trackpad.
- [ ] The comparison decision is understandable without opening another page.
- [ ] All external store links point to official Apple India URLs.
- [ ] Video areas either load a manually verified `@Apple` film on user action or become an honest feature-card gallery.
- [ ] Mobile has no clipped text, inaccessible controls or horizontal page overflow.
- [ ] Reduced-motion users receive the same content with no required animation.
- [ ] The footer clearly says this is an independent concept demo.
