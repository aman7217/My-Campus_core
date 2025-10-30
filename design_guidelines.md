# Design Guidelines: Government Polytechnic Srinagar Garhwal Web Portal

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern educational platforms like Coursera, edX, and institutional portals like MIT OpenCourseWare, combined with the clean dashboard aesthetics of Linear and Notion. The design balances academic professionalism with modern web application patterns.

## Core Design Principles

1. **Educational Authority**: Professional, trustworthy design that reflects institutional credibility
2. **Information Clarity**: Clear hierarchy for academic content, schedules, and announcements
3. **Student-Centric**: Quick access to frequently needed information (timetables, materials, reservations)
4. **Modern Functionality**: Contemporary web app feel while maintaining accessibility

## Typography

**Font Families**:
- Primary: 'Poppins' (headings, UI elements, navigation)
- Secondary: 'Inter' (body text, data tables, content)
- Fallback: system-ui, -apple-system, Segoe UI, Roboto, Arial

**Type Scale**:
- Mega headings: 32px-36px, weight 700 (portal sections)
- Section headings: 22px-26px, weight 600 (dashboard titles)
- Subsection headings: 18px-20px, weight 600
- Body text: 15px-16px, weight 400-500
- Small text: 13px-14px, weight 400 (metadata, timestamps)
- Micro text: 12px, weight 400 (badges, labels)

**Line Height**: 1.4 for UI elements, 1.6 for content-heavy sections

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16, 20, 24, 32 (p-2, m-4, gap-8, py-12, etc.)

**Container Strategy**:
- Max-width: 1100px for main content
- Sidebar width: 240px (desktop), collapsible on mobile
- Card padding: 14px-20px
- Section spacing: 20px-32px between major sections

**Grid Patterns**:
- Dashboard cards: repeat(auto-fit, minmax(200px, 1fr))
- Study materials: repeat(auto-fill, minmax(280px, 1fr))
- Timetable cards: repeat(auto-fill, minmax(230px, 1fr))
- Mobile: Always stack to single column

## Component Library

### Navigation
- **Sidebar**: Fixed left navigation (240px) with icon + text items
- Rounded items (8px) with subtle hover states
- Active state: gradient background (#eef2ff to #eef7ff) with increased font-weight
- Icons: Use emoji or Font Awesome icons consistently

### Cards & Containers
- **Standard Card**: White background, 10px-14px border-radius, subtle shadow (0 1px 3px rgba(10, 20, 40, 0.04))
- **Hover Effect**: translateY(-3px) with enhanced shadow
- **Info Cards**: Display metrics with small label, large number, and contextual actions
- **Course Cards**: Thumbnail/icon, title, description, metadata (duration, instructor), action button

### Forms & Inputs
- Input fields: 8px border-radius, 8-12px padding
- Border: 1px solid #e6edf3, focus state with accent color
- Buttons: 8px border-radius, 8px-12px padding, smooth transitions
- Primary button: Gradient or solid accent color
- Ghost button: Transparent with border

### Tables
- Clean headers with subtle background
- Alternating row hover states
- Action buttons in rightmost column
- Responsive: Stack to cards on mobile

### Modals & Overlays
- Backdrop: rgba(15, 23, 42, 0.45)
- Modal: White background, 12px-16px border-radius, max-width 520px
- Form rows with flex layout and 8px gaps

### Study Materials Components
- **Video Card**: Thumbnail (16:9 ratio), play icon overlay, title, channel/platform name, duration badge, category tag
- **Course List Item**: Platform logo, course title, instructor, rating/reviews, price tag (FREE or amount)
- **Filter Bar**: Category chips, search input, sort dropdown
- **Featured Section**: Larger cards with descriptions for highlighted courses

### Chatbot Widget
- Fixed position: bottom-right (18px-24px from edges)
- Floating action button: 56px circle with gradient, subtle shadow
- Widget panel: 320px width, max-height 70vh, rounded corners
- Header: Gradient background matching branding
- Messages: Left-aligned (bot) with gray background, right-aligned (user) with blue tint

### Status Indicators
- Badges: Small rounded pills (999px border-radius) for status, counts
- Color coding: Red for urgent, blue for info, green for success
- Booking status: Pending, Approved, Rejected with appropriate colors

## Animations

**Minimal, Purposeful Motion**:
- Card hover: translateY(-3px to -4px), 0.2s-0.25s ease
- Button hover: subtle background darkening, 0.2s ease
- Modal entry: fadeIn with slight translateY, 0.4s ease-in-out
- Navigation transitions: 0.3s ease
- **No**: Heavy scroll animations, complex transitions, or distracting effects

## Responsive Behavior

**Breakpoints**:
- Mobile: < 640px (single column, stacked navigation)
- Tablet: 640px - 900px (2-column grids, visible sidebar)
- Desktop: > 900px (full multi-column layouts, persistent sidebar)

**Mobile Optimizations**:
- Hamburger menu for navigation
- Full-width cards
- Larger touch targets (minimum 44px)
- Simplified tables (card-based view)

## Images

**Hero Section**: Full-width hero image (1920x600px) showing the polytechnic campus building exterior with gradient overlay for text readability. Buttons on hero should have blurred/frosted glass backgrounds.

**Profile/Avatar Placeholders**: Circular 48px icons for user badges and faculty listings

**Study Material Thumbnails**: 16:9 ratio images (280x158px) for video courses and tutorials

**Campus Map**: SVG-based interactive map with color-coded buildings

**Platform Logos**: Small 24x24px logos for YouTube, Coursera, Udemy, etc. in study materials section

## Accessibility Notes

- Maintain WCAG AA contrast ratios throughout
- All interactive elements keyboard navigable
- Focus states visible and clear
- Semantic HTML with proper heading hierarchy
- ARIA labels for icon-only buttons
- Form inputs with associated labels
- Consistent tab order for navigation flows