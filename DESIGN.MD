---
name: AuraRing X Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#4d556b'
  on-tertiary: '#ffffff'
  tertiary-container: '#656d84'
  on-tertiary-container: '#eef0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 20px
  unit-xs: 4px
  unit-sm: 8px
  unit-md: 16px
  unit-lg: 24px
  unit-xl: 48px
---

## Brand & Style
The design system for this product is rooted in **Minimalist Tech**, emphasizing clarity, precision, and a premium feel. It is designed to evoke a sense of calm authority and high performance, mirroring the sophisticated hardware of a smart health ring. 

The aesthetic draws inspiration from modern industrial design: expansive white space, meticulous typography, and subtle depth. By balancing a clinical "health" aesthetic with high-end "lifestyle" cues, the UI feels both scientifically reliable and elegantly personal. The emotional response should be one of "effortless insight"—complex biometric data distilled into a serene, breathable interface.

## Colors
The palette is dominated by a pure white background to ensure maximum "breathability." 

- **Primary (Deep Blue):** Used for primary actions, focus states, and key data visualizations (e.g., Sleep tracking).
- **Secondary (Emerald):** Reserved for "positive" health indicators, recovery metrics, and active states.
- **Neutral (Deep Slate):** Used for all high-emphasis typography to provide a softer, more premium contrast than pure black.
- **Surface (Ultra-light Gray):** Applied to card backgrounds and secondary containers to create subtle tonal separation from the base white.

**Dark Mode Strategy:** Surfaces shift to a deep charcoal (#0F172A), while primary and secondary accents maintain their vibrance but utilize increased glow/bloom effects for legibility.

## Typography
This design system utilizes **Inter** for its systematic, utilitarian, and clean characteristics. The hierarchy is strictly enforced to guide the user through dense health metrics.

- **Display & Headlines:** Use tight letter-spacing (-0.01em to -0.02em) to create a sophisticated, high-end editorial feel.
- **Body Text:** Standardized at 16px for optimal legibility with a generous 1.5x line height.
- **Labels:** Small labels use a semi-bold weight and slight tracking (letter-spacing) to maintain readability on high-density displays and small wearable-companion screens.

## Layout & Spacing
The layout follows a **Fluid Grid** model with high-margin safety zones to prevent visual clutter. 

- **Desktop:** A 12-column grid with 24px gutters. Content is centered with a max-width of 1200px.
- **Mobile:** A 4-column grid with 16px gutters and 20px side margins. 
- **Spacing Rhythm:** Based on an 8px base unit. Use `unit-xl` (48px) for vertical section spacing to maintain the minimalist, airy feel. Content within cards should use `unit-md` (16px) or `unit-lg` (24px) padding.

## Elevation & Depth
Depth is achieved through a combination of **Glassmorphism** and **Ambient Shadows**.

1.  **Base Surface:** Pure white (#FFFFFF).
2.  **Elevated Cards:** Ultra-light gray (#F8FAFC) with a very soft, diffused shadow (0px 4px 20px rgba(15, 23, 42, 0.05)).
3.  **Overlays/Modals:** Utilize a background blur (12px to 20px) with a semi-transparent white fill (rgba(255, 255, 255, 0.8)). This maintains context while highlighting the active layer.
4.  **Borders:** Use 1px soft gray (#E2E8F0) borders for flat elements that require definition without the weight of a shadow.

## Shapes
The shape language is defined by **extrapolated smoothness**. While the base `roundedness` is set to `2` (0.5rem) for small components like inputs, the signature look of this design system relies on much larger radii for containers.

- **Standard Components:** 0.5rem (8px) radius.
- **Cards & Primary Containers:** Use `rounded-2xl` (1.5rem / 24px) to create a friendly, organic feel that mimics the circular nature of the ring.
- **Buttons:** Fully rounded (pill-shaped) to distinguish them as high-interaction elements.

## Components
- **Buttons:** Primary buttons use a high-contrast fill (#2563EB) with white text. Secondary buttons are ghost-style with a 1px border (#E2E8F0) and charcoal text.
- **Cards:** Health metric cards use the #F8FAFC background, `rounded-2xl` corners, and a subtle inner 1px white stroke to enhance the glass-like edge definition.
- **Inputs:** Minimalist bottom-border or subtle light-gray fills. Focus states transition the border color to Deep Blue with a 2px stroke.
- **Chips:** Small, pill-shaped tags used for status (e.g., "Optimal", "Resting"). Use low-opacity versions of the accent colors (e.g., 10% opacity Emerald fill with Emerald text).
- **Progress Rings:** Vital for this product. Use a 4px to 8px stroke width with rounded caps, utilizing the Emerald (#10B981) for completion segments.
- **Lists:** Clean rows with 1px #E2E8F0 bottom separators, featuring generous 16px vertical padding.