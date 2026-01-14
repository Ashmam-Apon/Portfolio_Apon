
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Experience {
  role: string;
  company: string;
  year: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

export interface Slide {
  id: string;
  image: string;
  caption: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface Activity {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    alias: string;
    description: string; // Short description for Hero
    bio: string;        // Long description for About page
    location: string;
    email: string;
    phone: string;      // Added phone number
    avatar: string;
    resumeUrl: string;
  };
  slideshow: Slide[];
  socials: SocialLink[];
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  awards: Award[];
  extracurricular: Activity[];
  socialWork: Activity[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}