export const personalInfo = {
  name: "Shweta Gupta",
  tagline: "Full-Stack Developer & ML Engineer",
  roles: ["Full-Stack Developer", "ML Engineer", "DSA Enthusiast", "Problem Solver"],
  email: "gupta.shweta0920@gmail.com",
  phone: "+91 9353142775",
  location: "Varanasi, Uttar Pradesh",
  github: "https://github.com/SHWETA0920",
  linkedin: "https://linkedin.com/in/shweta-gupta-087777309",
  bio: "Aspiring Software Engineer with strong experience in full-stack development and AI-driven systems. I build scalable applications using React, Node.js, Flask, and Machine Learning — passionate about solving complex problems and creating impactful, user-centric products.",
  cgpa: "8.91",
  hackathonRank: "Top 100 / 5000+",
  projects: "6+",
  internships: "1",
};

export const education = [
  {
    degree: "B.Tech — Computer Science & Communication Engineering",
    institution: "KIIT University",
    location: "Bhubaneswar, Odisha",
    period: "July 2023 – July 2027",
    grade: "CGPA: 8.91",
    icon: "🎓",
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "DALIMSS Subeam School",
    location: "Varanasi, Uttar Pradesh",
    period: "April 2020 – April 2022",
    grade: "95%",
    icon: "📚",
  },
];

export const experience = [
  {
    role: "Web Developer Intern",
    company: "Vizag Steel Plant",
    location: "Visakhapatnam, Andhra Pradesh",
    period: "April 2025 – May 2025",
    github: "#",
    highlights: [
      "Built a full-stack MERN application for job posting and resume submission with role-based access control",
      "Designed RESTful APIs with Express/Node.js, implemented JWT auth and bcrypt password encryption",
      "Integrated Cloudinary for scalable file uploads with server-side validation and middleware",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Cloudinary", "bcrypt"],
  },
];

export const projects = [
  {
    title: "DSA Recall",
    subtitle: "AI-Powered DSA Revision Platform",
    description:
      "Full-stack platform with SM-2 spaced repetition, Groq AI recall testing, Judge0 code execution, and a Chrome extension for real-time LeetCode sync. Implements Ebbinghaus forgetting curve analytics and AI-based weakness heatmap.",
    tech: ["React", "Node.js", "PostgreSQL", "Groq AI", "Judge0", "Redis", "Chrome Extension"],
    github: "https://github.com/SHWETA0920",
    live: null,
    featured: true,
    color: "purple",
    icon: "🧠",
    category: "Full-Stack + AI",
  },
  {
    title: "KrishiCare",
    subtitle: "AI-Powered Agriculture Platform",
    description:
      "AI agriculture web app for crop recommendation, rainfall prediction, and plant disease detection using ML models trained on agricultural datasets. Includes government scheme lookup for farmer support.",
    tech: ["Python", "Flask", "React", "Machine Learning", "Jupyter", "NumPy", "Pandas"],
    github: "https://github.com/SHWETA0920/KrishiCare",
    live: null,
    featured: true,
    color: "teal",
    icon: "🌾",
    category: "ML + Full-Stack",
  },
  {
    title: "WhyCodeAI",
    subtitle: "AI Code Understanding Platform",
    description:
      "AI-powered code understanding tool using LLMs to explain the 'why' behind DSA solutions. Implements structured output parsing and prompt engineering to generate step-by-step reasoning.",
    tech: ["Python", "LangChain", "OpenAI API", "Flask", "Prompt Engineering"],
    github: "https://github.com/SHWETA0920/WHYCODE_AI",
    live: null,
    featured: true,
    color: "cyan",
    icon: "⚡",
    category: "AI / LLM",
  },
  {
    title: "PhyBuddy",
    subtitle: "RAG-Based Physics Assistant",
    description:
      "Retrieval-Augmented Generation based Physics assistant with intelligent query routing, LLM self-evaluation, secure tool execution, and context-grounded responses.",
    tech: ["Python", "RAG", "LLM", "Vector DB", "Flask"],
    github: "https://github.com/SHWETA0920/PhyBuddy",
    live: null,
    featured: false,
    color: "amber",
    icon: "🔬",
    category: "AI / RAG",
  },
  {
    title: "CareerConnect",
    subtitle: "Job Portal Platform",
    description:
      "Full-stack job portal with role-based access, resume management, job postings, and recruiter dashboards. Built with the MERN stack and secure authentication.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "Tailwind"],
    github: "https://github.com/SHWETA0920/CareerConnect",
    live: null,
    featured: false,
    color: "pink",
    icon: "💼",
    category: "Full-Stack",
  },
  {
    title: "Breast Cancer Detection",
    subtitle: "ML Classification Model",
    description:
      "Machine learning model for breast cancer classification using ensemble techniques and feature engineering on medical datasets. Achieves high accuracy with interpretable results.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
    github: "https://github.com/SHWETA0920/Breast_Cancer_detection",
    live: null,
    featured: false,
    color: "rose",
    icon: "🩺",
    category: "Machine Learning",
  },
];

export const skills = {
  languages: [
    { name: "JavaScript", level: 88 },
    { name: "Python", level: 85 },
    { name: "C++", level: 80 },
    { name: "Java", level: 72 },
    { name: "HTML/CSS", level: 92 },
  ],
  frontend: [
    { name: "React.js", level: 88 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Bootstrap", level: 82 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 83 },
    { name: "Flask", level: 80 },
    { name: "REST APIs", level: 87 },
    { name: "JWT Auth", level: 85 },
  ],
  databases: [
    { name: "PostgreSQL", level: 78 },
    { name: "MongoDB", level: 82 },
    { name: "MySQL", level: 75 },
    { name: "Redis", level: 70 },
  ],
  ml: [
    { name: "Machine Learning", level: 78 },
    { name: "LangChain", level: 72 },
    { name: "NumPy / Pandas", level: 80 },
    { name: "Groq AI", level: 75 },
  ],
  tools: ["Git", "GitHub", "VS Code", "Cloudinary", "Judge0", "Chrome Extensions", "Postman", "Figma"],
};

export const achievements = [
  {
    icon: "🏆",
    title: "Top 100 – Myntra HackerRamp WeForShe",
    desc: "Ranked in top 100 among 5,000+ teams. Built a gamified e-commerce solution to improve user engagement and AOV.",
  },
  {
    icon: "📄",
    title: "Published Research Paper",
    desc: "Authored review paper on Smart Street Lighting using IoT, Zigbee & Drones (IJFMR) — contributing to smart city infrastructure.",
  },
  {
    icon: "⚙️",
    title: "Disciplinary Committee",
    desc: "Coordinated event operations during BIS event, ensuring smooth execution as part of the disciplinary committee.",
  },
];
