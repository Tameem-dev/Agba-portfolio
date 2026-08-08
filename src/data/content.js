export const profile = {
  name: 'Tameem Opadijo',
  alias: 'Agba Dev',
  role: 'Senior Frontend Engineer',
  email: 'opadijoadeleke2@gmail.com',
  location: 'Lagos, Nigeria',
  tagline:
    "I build interfaces that feel inevitable — fast, considered, and a little alive.",
  bio: "I'm a frontend engineer who works across React, motion, and systems thinking. I care about the 200ms between a click and a response as much as the architecture underneath it. My work moves between fintech dashboards, e-commerce experiences, and internal tools — always with the same obsession: does this feel like it was built by someone who noticed the details.",
};

// Edit these directly to change the numbers shown in the About section stats.
export const aboutStats = {
  roles: 3,
  projects: 10,
  tools: 12,
};

export const experience = [
  {
    role: 'Frontend Developer',
    company: 'Marusoft Technology Limited',
    period: 'Present',
    summary:
      'Building and maintaining production React interfaces, owning component architecture and performance across the frontend surface.',
    responsibilities: [
      'Own component architecture for the core product surface, from primitives to page composition.',
      'Partner directly with design to turn Figma files into responsive, animated React interfaces.',
      'Review pull requests and set conventions for CSS Modules, hooks, and state management.',
    ],
    achievements: [
      'Cut initial bundle size through route-level code splitting and dynamic imports.',
      'Introduced a shared component library, reducing duplicate UI code across features.',
    ],
    technologies: ['React', 'Vite', 'CSS Modules', 'React Router', 'Git'],
    metrics: [
      { label: 'Bundle size reduced', value: '~30%' },
      { label: 'Components shared', value: '20+' },
    ],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Codveda Technology',
    period: 'Internship',
    summary:
      'Shipped seven client-facing projects spanning Lighthouse-optimized landing pages, GSAP-driven motion, and React applications.',
    responsibilities: [
      'Built seven independent frontend projects under the ByteForge internship hub.',
      'Implemented scroll-triggered GSAP animations and Lighthouse-focused performance passes.',
      'Worked across vanilla JS, React, and Tailwind depending on project requirements.',
    ],
    achievements: [
      'Reached 100/100 Lighthouse performance scores on multiple landing pages.',
      'Delivered every project inside internship deadlines with no scope cuts.',
    ],
    technologies: ['JavaScript', 'React', 'GSAP', 'Tailwind CSS'],
    metrics: [
      { label: 'Projects shipped', value: '7' },
      { label: 'Lighthouse score', value: '100' },
    ],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Trueminds Innovation Limited',
    period: 'Internship',
    summary:
      'Worked across UI implementation and responsive layout systems for client products, from first component to shipped page.',
    responsibilities: [
      'Translated static designs into responsive, mobile-first layouts.',
      'Built reusable UI patterns — drawers, nav systems, and card grids — for client products.',
      'Fixed cross-browser and cross-device layout issues ahead of client delivery.',
    ],
    achievements: [
      'Delivered a fully responsive client dashboard from a single desktop-only design file.',
      'Established a mobile-first workflow later reused across personal projects.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    metrics: [
      { label: 'Breakpoints supported', value: '4' },
    ],
  },
];

export const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 92, projects: 9 },
      { name: 'JavaScript (ES6+)', level: 90, projects: 12 },
      { name: 'CSS Modules', level: 88, projects: 10 },
    ],
  },
  {
    category: 'Animation',
    skills: [
      { name: 'GSAP + ScrollTrigger', level: 84, projects: 6 },
      { name: 'Framer Motion', level: 86, projects: 8 },
      { name: 'Lenis Smooth Scroll', level: 80, projects: 5 },
    ],
  },
  {
    category: 'Performance',
    skills: [
      { name: 'Lighthouse Optimization', level: 85, projects: 7 },
      { name: 'Code Splitting', level: 78, projects: 4 },
    ],
  },
  {
    category: 'State & Data',
    skills: [
      { name: 'React Hook Form', level: 76, projects: 5 },
      { name: 'localStorage / BroadcastChannel sync', level: 82, projects: 4 },
    ],
  },
  {
    category: 'Design Systems',
    skills: [
      { name: 'Component Architecture', level: 83, projects: 8 },
      { name: 'Design Tokens', level: 75, projects: 5 },
    ],
  },
  {
    category: 'Tooling',
    skills: [
      { name: 'Git / GitHub', level: 88, projects: 12 },
      { name: 'Vite', level: 87, projects: 10 },
    ],
  },
];

export const projects = [
  {
    id: 'finflow',
    name: 'FinFlow',
    year: '2026',
    tag: 'Fintech · Dashboard',
    description:
      'An AI-assisted personal finance platform — spending tracking, budgets, and cash-flow visualization through intuitive, data-dense dashboards.',
    stack: ['React', 'Vite', 'Recharts', 'CSS Modules'],
    github: 'https://github.com/Tameem-dev/Finflow',
    liveDemo: 'https://finflow-two-rho.vercel.app/',
    problem:
      'Most personal finance apps either dump raw numbers on a page or hide meaningful patterns behind too much chrome. The goal was a dashboard dense enough for a power user, but legible enough to open once a day without dread.',
    approach:
      'Built around a single source-of-truth transaction model, with every chart, budget bar, and cash-flow projection deriving from the same normalized dataset — no duplicated calculations scattered across components.',
    architecture: [
      'Feature-based folder structure: /transactions, /budgets, /insights, each owning its own components and hooks.',
      'Recharts wrapped in a thin custom layer so every chart shares one color/typography system instead of ad-hoc styling per chart.',
      'Derived state (totals, trends, projections) computed with memoized selectors rather than recalculated on every render.',
    ],
    features: [
      'Category-based budget tracking with over/under visual states',
      'Cash-flow projection chart based on recurring transaction patterns',
      'Custom date-range comparison (this month vs. last month)',
    ],
    challenges: [
      {
        challenge: 'Charts re-rendering on every keystroke while filtering transactions.',
        solution: 'Debounced the filter input and memoized chart data with useMemo, cutting redundant renders significantly.',
      },
      {
        challenge: 'Budget bars needed to feel alive without being distracting on a finance app.',
        solution: 'Limited motion to a single width transition on data change — no bounce, no overshoot, matching the seriousness of the subject matter.',
      },
    ],
    metrics: [
      { label: 'Lighthouse performance', value: '—', placeholder: true },
      { label: 'Components', value: '—', placeholder: true },
    ],
    futureImprovements: [
      'Real bank-sync integration (currently manual/CSV entry)',
      'Multi-currency support for cross-border tracking',
    ],
  },
  {
    id: 'nocturne',
    name: 'Nocturne',
    year: '2026',
    tag: 'Luxury E-commerce',
    description:
      'A premium fashion and lifestyle storefront — dark glassmorphism, a Three.js particle hero, and a naira-priced catalogue across twelve pages.',
    stack: ['React', 'Three.js', 'Framer Motion', 'CSS Modules'],
    github: 'https://github.com/Tameem-dev/Nocturne',
    liveDemo: 'https://nocturne-kohl.vercel.app/',
    problem:
      'Luxury e-commerce lives or dies on restraint — most attempts at "premium" online stores overcorrect into gaudy gradients and motion for its own sake. The brief was: understated, dark, expensive-feeling, without leaning on any single visual cliché.',
    approach:
      'Every page shares one glass-panel surface system and one accent color used sparingly. The Three.js hero exists to set tone in the first three seconds, then gets out of the way — it never competes with product photography.',
    architecture: [
      'Twelve pages built on a shared PageShell layout with consistent header/footer, so new categories are just new content, not new layout code.',
      'Custom cursor and hover states isolated into their own provider so product pages stay clean of interaction logic.',
      'Product data structured to support naira pricing with locale-aware formatting from day one, not retrofitted.',
    ],
    features: [
      'Three.js particle field hero with mouse-reactive depth',
      'Custom cursor with blend-mode hover states over product imagery',
      'Twelve-page catalogue: home, category, product detail, cart, checkout, and more',
    ],
    challenges: [
      {
        challenge: 'Three.js scene tanking performance on lower-end mobile devices.',
        solution: 'Capped particle count based on device pixel ratio and disabled the 3D scene entirely under prefers-reduced-motion and small viewports, falling back to a static gradient.',
      },
      {
        challenge: 'Glassmorphism panels losing legibility over busy product photos.',
        solution: 'Added a subtle scrim gradient behind every glass panel so blur alone never has to carry contrast.',
      },
    ],
    metrics: [
      { label: 'Pages shipped', value: '12' },
      { label: 'Lighthouse performance', value: '—', placeholder: true },
    ],
    futureImprovements: [
      'Wishlist and saved-for-later persistence',
      'Real payment gateway integration',
    ],
  },
  {
    id: 'devbridge',
    name: 'DevBridge',
    year: '2026',
    tag: 'Developer Platform',
    description:
      'A developer portfolio and job marketplace with real-time sync, auth guards, live chart data, and a localStorage-persisted onboarding passport.',
    stack: ['React', 'GSAP', 'Lenis', 'BroadcastChannel'],
    github: 'https://github.com/Tameem-dev/DevBridge',
    liveDemo: 'https://dev-bridge-weld.vercel.app/',
    problem:
      'Developer marketplaces usually treat onboarding as a form to fill and forget. The goal was to make onboarding itself feel like a product — a "passport" that persists, so a developer\u2019s profile feels earned rather than typed once and ignored.',
    approach:
      'Modeled the onboarding flow as a state machine persisted to localStorage at every step, so a developer can leave mid-flow and return exactly where they left off — no lost progress, no re-typing.',
    architecture: [
      'Auth guards implemented as route wrappers rather than scattered conditional renders, keeping protected-route logic in one place.',
      'BroadcastChannel used to sync admin-panel state changes live across open tabs without a backend push layer.',
      'Chart data (activity, applications) rendered through a shared chart wrapper matching the dashboard\'s design tokens.',
    ],
    features: [
      '"Create Your Passport" multi-step onboarding with persisted progress',
      'Admin panel with real-time sync across tabs via BroadcastChannel',
      'Auth-guarded routes for recruiter vs. developer views',
    ],
    challenges: [
      {
        challenge: 'Multi-step onboarding state getting out of sync with localStorage on rapid navigation.',
        solution: 'Centralized all onboarding state in one reducer with a single persistence side-effect, instead of writing to localStorage from each step component.',
      },
    ],
    metrics: [
      { label: 'Onboarding steps', value: '—', placeholder: true },
    ],
    futureImprovements: [
      'Replace BroadcastChannel sync with a real backend once the platform needs cross-device sync',
      'Recruiter-side applicant filtering and search',
    ],
  },
  {
    id: 'foodbridge',
    name: 'FoodBridge',
    year: '2026',
    tag: 'Social Impact',
    description:
      'A Lagos food-rescue platform connecting surplus food to people who need it — role-specific dashboards, live sync, and a passcode-gated admin area.',
    stack: ['React', 'CSS Modules', 'localStorage', 'BroadcastChannel'],
    github: 'https://github.com/Tameem-dev/FoodBridge',
    liveDemo: 'https://food-bridge-snowy.vercel.app/',
    problem:
      'Food rescue only works if donors, recipients, and coordinators can all see the same real-time picture — a surplus post that no one sees in time is just wasted food. The interface had to make urgency visible without becoming alarming.',
    approach:
      'Built three role-specific dashboards (donor, recipient, admin) on top of one shared data layer, so a status change from any role reflects everywhere instantly via BroadcastChannel — no manual refresh.',
    architecture: [
      'Role-based routing decides dashboard shell at the top level; role-specific components stay dumb and reusable.',
      'Passcode-gated admin area kept entirely separate from the public routes, with its own guard and no shared state leakage.',
      'Listings modeled with an explicit status lifecycle (posted → claimed → collected) rather than boolean flags, so the UI always reflects a real state.',
    ],
    features: [
      'Donor, recipient, and admin dashboards with distinct permissions',
      'Live cross-tab sync for listing status via BroadcastChannel',
      'Hidden passcode-gated admin area for moderation',
    ],
    challenges: [
      {
        challenge: 'Conveying urgency (food expiring soon) without the UI feeling anxiety-inducing.',
        solution: 'Used a calm color-coded time indicator instead of red alerts or countdown timers — informative, not stressful.',
      },
    ],
    metrics: [
      { label: 'User roles', value: '3' },
    ],
    futureImprovements: [
      'Geolocation-based matching between donors and nearby recipients',
      'SMS notifications for low-connectivity users',
    ],
  },
  {
    id: 'chucks-kitchen',
    name: "Chuck's Kitchen",
    year: '2025',
    tag: 'Food Ordering',
    description:
      'Order authentic Nigerian cuisine — dish customization, real-time pricing, and instant promo discounts across a full ordering flow.',
    stack: ['JavaScript', 'SweetAlert2', 'sessionStorage'],
    github: 'https://github.com/Tameem-dev/Ckucks-Kitchen',
    liveDemo: 'https://ckucks-kitchen.vercel.app/',
    problem:
      'Nigerian food ordering apps rarely account for real menu complexity — allergens, portion customization, delivery vs. pickup logic. The brief was to handle that complexity in vanilla JS without it turning into unmanageable spaghetti code.',
    approach:
      'Treated the cart as a single source of truth object persisted to sessionStorage, with every UI update (price, allergen warnings, delivery fee) derived from re-reading that object rather than tracked independently.',
    architecture: [
      'Menu data separated from render logic — dishes, categories, and allergen tags live in one data module.',
      'Delivery/pickup toggle recalculates total price and estimated time from the same pricing function used everywhere else in the app.',
    ],
    features: [
      'Dish customization with live price updates',
      'Allergen panel per dish',
      'Delivery vs. pickup logic with dynamic pricing',
    ],
    challenges: [
      {
        challenge: 'A persistent hero background image bug across different viewport sizes.',
        solution: 'Traced it to a background-attachment: fixed conflict on mobile Safari and replaced it with a background-position-based approach that behaves consistently across browsers.',
      },
    ],
    metrics: [
      { label: 'Menu categories', value: '—', placeholder: true },
    ],
    futureImprovements: [
      'Migrate cart state from sessionStorage to a proper backend for real orders',
      'Add order tracking status',
    ],
  },
  {
    id: 'estatein',
    name: 'Estatein',
    year: '2025',
    tag: 'Real Estate',
    description:
      'A real estate discovery app spanning listings, property detail, services, and contact — refined across multiple iterative passes.',
    stack: ['React', 'CSS Modules', 'Vite'],
    github: 'https://github.com/Tameem-dev/Estatien',
    liveDemo: 'https://estatien-gold.vercel.app/',
    problem:
      'Property listing sites tend to bury the property itself under filters and chrome. The goal was a browsing experience where the listing photography and details stay the hero across every page, not just the landing page.',
    approach:
      'Standardized a property-card and property-detail layout early, then iterated on it across several passes as real bugs surfaced — sticky positioning, overflow, and hook-order issues — rather than rebuilding pages from scratch each time.',
    architecture: [
      'Shared PropertyCard component reused across search results, favorites, and related-listings sections.',
      'Property detail page composed from independent sections (gallery, overview, amenities, contact) so any one section can be redesigned without touching the rest.',
    ],
    features: [
      'Property listing and detail pages with a consistent card system',
      'Services and About pages sharing the same layout primitives',
      'Contact flow tied directly from any property listing',
    ],
    challenges: [
      {
        challenge: 'A recurring sticky-positioning bug on the property detail sidebar.',
        solution: 'Root cause was a parent element with overflow: hidden breaking the sticky context — removed the unnecessary overflow rule and scoped clipping to a more specific child instead.',
      },
      {
        challenge: 'React hook order violations after conditionally rendering sections.',
        solution: 'Moved all hooks above any conditional returns and gated only the JSX output, not the hook calls themselves.',
      },
    ],
    metrics: [
      { label: 'Pages refined', value: '5' },
    ],
    futureImprovements: [
      'Map-based property search',
      'Saved search alerts',
    ],
  },
];

export const stack = [
  'React', 'Vite', 'JavaScript', 'CSS Modules', 'Framer Motion', 'GSAP',
  'Lenis', 'Three.js', 'React Router', 'React Hook Form', 'Recharts', 'Git',
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Tameem-dev' },
  { label: 'Email', href: 'mailto:opadijoadeleke2@gmail.com' },
];

export const nav = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'work', label: 'Work', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
];

export const pages = [
  { path: '/blog', label: 'Blog' },
  { path: '/playground', label: 'Playground' },
  { path: '/github', label: 'GitHub' },
];

export const githubUsername = 'Tameem-dev';

export const blogPosts = [
  {
    slug: 'css-modules-over-tailwind',
    title: 'Why I still reach for CSS Modules over Tailwind',
    category: 'CSS',
    date: '2026-04-02',
    excerpt:
      'Tailwind is fast to write and slow to read. Here is why CSS Modules keep winning on the projects where the design has to feel considered, not assembled.',
    body: [
      "Every few months I try Tailwind again on a side project, and every few months I go back to CSS Modules before the project is finished. It is not a religious stance — Tailwind is genuinely fast for prototyping. The problem shows up later, once a component has real states: hover, focus, disabled, loading, error, dark mode, reduced motion. At that point a className string turns into a paragraph, and the actual visual logic of the component gets harder to read than the component's own JSX.",
      "CSS Modules keep that logic where it belongs — in a stylesheet, scoped to the component, with real selectors and real cascade. When I open Hero.module.css six months later, I can read the intent of a rule in one line instead of decoding a wall of utility classes. That readability matters more to me than the extra file per component.",
      "The real argument for Tailwind is team consistency at scale — a shared utility vocabulary across many contributors. On solo or small-team portfolio-grade work, where the design language is the differentiator, I would rather own the cascade directly.",
    ],
  },
  {
    slug: 'broadcastchannel-realtime-without-backend',
    title: 'Faking realtime with BroadcastChannel (no backend required)',
    category: 'Architecture',
    date: '2026-03-14',
    excerpt:
      'FoodBridge and DevBridge both needed to feel live across tabs with zero backend. The BroadcastChannel API did almost all of the work.',
    body: [
      "A recurring request in my portfolio projects has been \"make it feel live\" — dashboards that update when another tab changes something, without me standing up a backend just to prove the frontend architecture works. The BroadcastChannel API turned out to be the right-sized tool for that: any tab on the same origin can post a message, and every other open tab on that origin receives it instantly.",
      "The pattern I landed on: a single LiveDataContext wraps a BroadcastChannel instance, exposes a publish function, and subscribes once on mount. Every feature — listing status changes, admin moderation actions, notification toasts — publishes through that one channel instead of managing its own event system.",
      "The honest limitation: this only works across tabs on the same browser, same origin. It is a frontend architecture demo, not a substitute for websockets or server-sent events in production. I say that explicitly in every case study that uses it, because presenting a client-side simulation as a real backend would be dishonest about what the project actually does.",
    ],
  },
  {
    slug: 'sticky-position-overflow-bug',
    title: 'The sticky-position bug that was never about position: sticky',
    category: 'Debugging',
    date: '2026-02-08',
    excerpt:
      'A property detail sidebar refused to stick. The fix had nothing to do with the sticky rule itself.',
    body: [
      "On Estatein, a property detail sidebar was supposed to stay pinned while the surrounding content scrolled. It did not move at all — behaved like static positioning no matter what I changed on the sticky element itself.",
      "The actual cause was three levels up: a parent container had overflow: hidden set for an unrelated reason (clipping a decorative background shape). Any ancestor with a defined overflow value other than visible breaks the sticky containing block, and the browser gives no warning about it.",
      "The fix was to remove the overflow rule from that ancestor and scope the clipping to a more specific child element instead. The lesson that stuck: when position: sticky does nothing, stop looking at the sticky element and start walking up the DOM tree.",
    ],
  },
];

export const services = [
  {
    title: 'Frontend Engineering',
    text: 'End-to-end build of React interfaces — from component architecture to the last pixel of polish.',
  },
  {
    title: 'Performance Optimization',
    text: 'Bundle audits, code splitting, and render-cost fixes for apps that feel slow before they feel broken.',
  },
  {
    title: 'Animation & Motion',
    text: 'GSAP, Framer Motion, and Lenis work — scroll-triggered reveals, page transitions, and micro-interactions that respect reduced-motion.',
  },
  {
    title: 'Landing Pages',
    text: 'High-conversion marketing pages built for Lighthouse scores in the high 90s, not just good looks.',
  },
  {
    title: 'Technical Consulting',
    text: 'Code review, architecture sanity-checks, and unblocking teams stuck on a frontend decision.',
  },
];

// Real testimonials aren't collected yet — these are placeholders so the section
// has the right shape. Swap in real quotes (with permission) before shipping.
export const testimonials = [
  {
    quote: 'Placeholder — add a real quote from a client or teammate here.',
    name: 'Add name',
    title: 'Add role / company',
    placeholder: true,
  },
  {
    quote: 'Placeholder — add a real quote from a client or teammate here.',
    name: 'Add name',
    title: 'Add role / company',
    placeholder: true,
  },
  {
    quote: 'Placeholder — add a real quote from a client or teammate here.',
    name: 'Add name',
    title: 'Add role / company',
    placeholder: true,
  },
];

// Edit these numbers directly — plain text/numbers, no code logic to worry about.
export const achievements = [
  { label: 'Shipped projects', value: 10 },
  { label: 'Roles & internships', value: 3 },
  { label: 'Core tools', value: 12 },
  { label: 'Case studies written', value: 10 },
];
