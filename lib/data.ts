export const ROLES = [
  "Website Designer",
  "UI/UX Designer",
  "Graphic Designer",
  "Video Editor",
  "Full Stack Developer",
];

export const ABOUT = `Hello, I'm Jaspreet Singh, a passionate Website Designer and Developer specializing in UI/UX Design, Graphic Design, Video Editing, HTML, CSS, JavaScript, PHP, and ASP Development.`;

export type Skill = { name: string; level: number };

export const SKILLS: Skill[] = [
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 93 },
  { name: "JavaScript", level: 88 },
  { name: "PHP", level: 80 },
  { name: "ASP", level: 72 },
  { name: "Figma", level: 90 },
  { name: "Photoshop", level: 88 },
  { name: "Illustrator", level: 84 },
  { name: "Canva", level: 92 },
  { name: "UI Design", level: 91 },
  { name: "UX Design", level: 87 },
  { name: "Graphic Design", level: 90 },
  { name: "Video Editing", level: 85 },
  { name: "GSAP", level: 80 },
  { name: "Three.js", level: 76 },
];

export type Service = { title: string; desc: string; icon: string };

export const SERVICES: Service[] = [
  {
    title: "Website Design",
    desc: "Pixel-perfect, conversion-focused websites with a luxury, cinematic feel.",
    icon: "M3 5h18M3 12h18M3 19h12",
  },
  {
    title: "UI/UX Design",
    desc: "Research-driven interfaces and flows that feel effortless and premium.",
    icon: "M4 4h16v12H4zM8 20h8",
  },
  {
    title: "Graphic Design",
    desc: "Brand identities, posters and visuals that command attention.",
    icon: "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z",
  },
  {
    title: "Video Editing",
    desc: "Cinematic edits, motion graphics and color grading that tell a story.",
    icon: "M4 4h16v16H4zM9 8l6 4-6 4z",
  },
  {
    title: "Web Development",
    desc: "Fast, scalable front-to-back builds in HTML, CSS, JS, PHP and ASP.",
    icon: "M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12",
  },
  {
    title: "E-Commerce Development",
    desc: "High-performing stores with smooth checkout and bold product storytelling.",
    icon: "M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z",
  },
];

export type Project = { title: string; category: string; blurb: string };

export const PROJECTS: Project[] = [
  { title: "Aurora Studio", category: "Website Design", blurb: "Cinematic agency site with scroll storytelling." },
  { title: "Pulse App", category: "UI/UX Design", blurb: "Fitness app concept with fluid micro-interactions." },
  { title: "Mirage Brand", category: "Graphic Design", blurb: "Bold luxury identity system and packaging." },
  { title: "Nocturne Reel", category: "Video Editing", blurb: "High-energy cinematic promo edit & grade." },
  { title: "Verde Market", category: "E-Commerce", blurb: "Premium storefront with 3D product showcase." },
  { title: "Halo Dashboard", category: "UI/UX Design", blurb: "Analytics dashboard with glass UI system." },
];

export const PROJECT_CATEGORIES = [
  "Website Design",
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "E-Commerce",
];

export type Timeline = { role: string; period: string; detail: string };

export const TIMELINE: Timeline[] = [
  { role: "Graphic Designer", period: "Stage 01", detail: "Crafting brand visuals, posters and identities." },
  { role: "UI/UX Designer", period: "Stage 02", detail: "Designing intuitive, research-led product experiences." },
  { role: "Website Designer", period: "Stage 03", detail: "Turning designs into striking, responsive layouts." },
  { role: "Frontend Developer", period: "Stage 04", detail: "Building interactive, animated front-ends." },
  { role: "Full Stack Developer", period: "Stage 05", detail: "Shipping complete products from database to pixel." },
];

export type Testimonial = { name: string; role: string; quote: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Startup Founder",
    quote: "Jaspreet turned our vague idea into a stunning, high-converting website. Pure craft.",
  },
  {
    name: "Sofia Rossi",
    role: "Creative Director",
    quote: "The motion and detail are world-class. It genuinely feels like an award-winning experience.",
  },
  {
    name: "Liam Chen",
    role: "E-Commerce Owner",
    quote: "Our store sales jumped after the redesign. The 3D storytelling wowed every customer.",
  },
  {
    name: "Noor Khan",
    role: "Brand Manager",
    quote: "From identity to video, everything was cohesive, premium and delivered on time.",
  },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com/Jaspreetjassal77" },
  { label: "WhatsApp", href: "https://wa.me/" },
];

export const SECTIONS = [
  "hero",
  "about",
  "skills",
  "services",
  "portfolio",
  "experience",
  "testimonials",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];
