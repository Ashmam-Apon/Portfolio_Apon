import { PortfolioData } from './types';

export const DATA: PortfolioData = {
  profile: {
    name: "Md. Ashmam Zaman Apon",
    alias: "Apon",
    role: "Full Stack Developer & Software Engineer",
    description: "I build accessible, pixel-perfect, and performant web applications. With a deep passion for engineering and design, I transform complex problems into elegant digital solutions.",
    bio: "I am a Highly motivated Computer Science and Engineering (CSE) undergraduate at United International University with foundational skills in web development. Proficient in creating dynamic and interactive projects using HTML, CSS, JavaScript, and PHP. Eager to apply academic knowledge and practical project experience in a fast-paced professional internship environment and contribute to real-world web solutions.",
    location: "Dhaka, Bangladesh",
    email: "ashmamaponr@gmail.com",
    phone: "+880 1710371161",
    // Use the Admin Dashboard to upload your actual photo
    avatar: "https://photos.app.goo.gl/3wkeTBhcuZkJuzxS7", 
    resumeUrl: "/resume.pdf"
  },
  slideshow: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      caption: "My Workspace Setup"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      caption: "Coding late night"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      caption: "Nature photography hobby"
    }
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com/Ashmam-Apon", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/md-ashmam-zaman-apon", icon: "linkedin" },
    { platform: "WhatsApp", url: "https://call.whatsapp.com/voice/QEWxbJW15CNKxaGrW6tnWu", icon: "whatsapp" }
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "United International University",
      year: "2021 - Present",
      description: "Trimester: 10th. Specializing in Software Systems and Engineering."
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Shahid Syed Nazrul Islam College",
      year: "2018 - 2020",
      description: "Science concentration. GPA: 5.0/5.0"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Jangaldi High School",
      year: "2016 - 2018",
      description: "GPA: 5.0/5.0"
    }
  ],
  experience: [
    {
      role: "Web Developer",
      company: "Shahadat Shaharear & Kibria Chartered Accounts",
      year: "2024",
      description: "Designed and developed the official website for the company. Also developed an inventory system for tracking and worked on data-entry operations."
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["C", "C++", "Python", "JavaScript", "Java", "PHP", "HTML5", "CSS3", "MySQL"]
    },
    {
      category: "Frameworks & Tools",
      items: ["React", "Node.js", "JavaFX", "PowerShell", "Git", "GitHub"]
    },
    {
      category: "Professional Skills",
      items: ["Web Design & Development", "Event Management", "Leadership", "Article Research", "Data Entry"]
    },
    {
      category: "Software",
      items: ["Microsoft Office (Excel, Powerpoint, Word)", "VS Code", "XAMPP"]
    }
  ],
  projects: [
    {
      title: "E-Commerce Website",
      description: "A dynamic and interactive e-commerce platform featuring product browsing, cart management, and order processing.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      link: "#",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
    },
    {
      title: "Virtual Library",
      description: "A desktop application for managing library resources, book tracking, and user management.",
      tags: ["Java", "JavaFX", "HTML", "CSS"],
      link: "#",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
    },
    {
      title: "Inventory Management System",
      description: "A tracking system built for corporate use to streamline inventory operations and reporting.",
      tags: ["PHP", "HTML", "CSS", "JavaScript"],
      link: "#",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80"
    },
    {
      title: "Commercial Website",
      description: "Designed and developed a professional corporate website showcasing services and company information.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    }
  ],
  awards: [
    {
      title: "Dean's List Award",
      issuer: "United International University",
      year: "2023",
      description: "Awarded for maintaining a CGPA above 3.80."
    }
  ],
  extracurricular: [
    {
      role: "Volunteer",
      organization: "Red Crescent Society",
      period: "2021 - Present",
      description: "Participating in blood donation drives and emergency relief distribution programs."
    }
  ],
  socialWork: [
    {
      role: "Mentor",
      organization: "Tech for Kids",
      period: "2023",
      description: "Conducted weekend coding sessions for underprivileged children to introduce them to basic programming concepts."
    }
  ]
};
