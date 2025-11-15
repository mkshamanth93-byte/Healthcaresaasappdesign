To elevate your Figma Make agent’s output quality, especially avoiding rookie alignment issues, visual inconsistencies, and weak spacing discipline — you can enrich your System Guidelines file with precise UI behavior expectations, visual standards, and a temporary color palette structure.

Here’s how to revise and expand that file effectively 👇

⸻

✅ REVISED SYSTEM GUIDELINES FOR FIGMA MAKE

⸻

# General Guidelines
	•	Never sacrifice visual alignment for speed.
	•	All elements must be pixel-perfectly aligned, especially icons, numbers, and text labels.
	•	Padding around buttons and boxes must be uniform, following an 8px spacing rule as the baseline unit.
	•	Use Flexbox or Auto Layout for all groupings.
	•	Never rely on manual positioning of text or buttons. All buttons, badges, icons, and tags must be built within properly defined containers.
	•	Maintain visual rhythm.
	•	Use consistent vertical and horizontal spacing (8, 16, 24, 32, 40px) unless explicitly stated otherwise.
	•	Use white space intentionally to create scannable, breathable designs.
	•	Avoid crowding.
	•	No button should have text that touches its borders. Minimum padding for button labels:
	•	Horizontal: 16px
	•	Vertical: 10–12px

⸻

# Design System Guidelines

## Typography
	•	Base font size: 14px
	•	Headings:
	•	H1: 24px, Bold
	•	H2: 20px, Semi-bold
	•	H3: 16px, Semi-bold
	•	Line height: 1.5x font size

## Date & Number Alignment
	•	Numeric fields (dates, prices, times) must be right-aligned inside containers.
	•	Dates should never float — anchor them to aligned baselines (use grid or Auto Layout).
	•	Actionable dates should always be grouped with contextual icons (calendar, clock) for clarity.

⸻

## Buttons

### Padding
	•	Minimum padding:
	•	Vertical: 10px
	•	Horizontal: 16px

### Spacing
	•	Keep consistent spacing between:
	•	Buttons and adjacent elements (minimum 16px)
	•	Button text and edge of the button
	•	Do not allow label text (e.g. “Pay Now”) to touch button edges

### Layout
	•	Back and Continue buttons must:
	•	Be on the same horizontal row
	•	Be bottom-sticky to the panel (position: fixed / Auto Layout inside a sticky bottom container)

⸻

## Box & Container Rules
	•	Use rounded corners consistently (e.g., 8px or 12px radius)
	•	No card/container should be misaligned relative to others in the same visual stack.
	•	Box shadows should be subtle and used only to create hierarchy.

⸻

🎨 Color System (Temp Placeholder – until Branding Panel is set)

Use the following two-color palette, each with five shades, until full branding is integrated:

Primary Color (Blue)
	•	Blue 100: #E6F0FF
	•	Blue 200: #B3D1FF
	•	Blue 300: #4D94FF
	•	Blue 400: #1A73E8
	•	Blue 500: #0B5ED7

Secondary Color (Purple)
	•	Purple 100: #F3E8FF
	•	Purple 200: #D1B3FF
	•	Purple 300: #A64DFF
	•	Purple 400: #8A2BE2
	•	Purple 500: #6A1B9A
	•	Use lighter shades for backgrounds and accents
	•	Use darker shades for CTAs, borders, and icons
	•	Stick to max 2–3 colors per screen to avoid visual noise

⸻

🛠 Component Build Guidelines

Component	Rules
Card Layout	Use consistent padding inside (16px); maintain visual balance
Badge/Tag	8px padding, text centered, never wrap text
CTA Button	Use primary color only for main actions, secondary for alternatives
Accordion	Use only for 3+ collapsible sections; maintain clear separators
Floating Elements	All cards and panels must feel like they hover above content; use subtle drop shadows and translucent panels


⸻

Let me know if you’d like this as a .figma.json system file or for me to prep this into a Notion doc, PDF, or comment-ready snippet for your workspace.