import React, { useState, useEffect, useMemo } from 'react';
import Game from "./Game";
import profileImage from './assets/img.jpeg';

import {
  Menu,
  X,
  Search,
  Github,
  Linkedin,
  Phone,
  ExternalLink,
  ArrowUp,
  Send,
  Code,
  Command,
  BookOpen,
  User,
  Mail,
  Check,
  ArrowRight
} from 'lucide-react';

const TECH_STACK = [
  {
    name: 'HTML',
    category: 'Frontend',
    icon: Code
  },
  {
    name: 'CSS',
    category: 'Frontend',
    icon: Code
  },
  {
    name: 'Bootstrap',
    category: 'Frontend',
    icon: Code
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    icon: Code
  },
  {
    name: 'React',
    category: 'Frontend',
    icon: Code
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    icon: Code
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: Code
  },
  {
    name: 'Git',
    category: 'Tools',
    icon: Code
  },
  {
    name: 'GitHub',
    category: 'Tools',
    icon: Github
  }
];

const PROJECTS = [
  {
    title: 'Burger Vision',
    description:
      'HTML, CSS və JavaScript ilə hazırlanmış interaktiv burger shop layihəsi. Burger constructor, səbət sistemi və responsive dizayn daxildir.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/revan123hs/burger-vision',
    demo: '#',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80'
  },

  {
    title: 'E-Commerce Platform',
    description:
      'React və JavaScript ilə hazırlanmış müasir e-commerce layihəsi. Responsive istifadəçi interfeysi və məhsul əsaslı alış-veriş təcrübəsi.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Next.js'],
    github: 'https://github.com/revan123hs/ecommerce-project',
    demo: '#',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80'
  },

  {
    title: 'Developer Portfolio',
    description:
      'React və Tailwind CSS ilə hazırlanmış interaktiv developer portfolio.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/revan123hs',
    demo: '#',
    image: profileImage
  }
];

const TechIcon = ({ icon: Icon }) => {
  return <Icon size={18} />;
};

const TypingLogo = () => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing-revan');

  useEffect(() => {
    let timeout;

    if (phase === 'typing-revan') {
      if (text.length < 'revan.dev'.length) {
        timeout = setTimeout(() => {
          setText('revan.dev'.slice(0, text.length + 1));
        }, 120);
      } else {
        timeout = setTimeout(() => {
          setPhase('deleting-revan');
        }, 1500);
      }
    }

    if (phase === 'deleting-revan') {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 80);
      } else {
        setPhase('typing-frontend');
      }
    }

    if (phase === 'typing-frontend') {
      if (text.length < 'frontend.developer'.length) {
        timeout = setTimeout(() => {
          setText(
            'frontend.developer'.slice(0, text.length + 1)
          );
        }, 120);
      } else {
        timeout = setTimeout(() => {
          setPhase('deleting-frontend');
        }, 2000);
      }
    }

    if (phase === 'deleting-frontend') {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 80);
      } else {
        setPhase('typing-revan');
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase]);

  return (
    <span className="font-bold tracking-tight text-white">
      {text}
      <span className="text-cyan-400 animate-pulse">_</span>
    </span>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        depth: Math.random() * 0.8 + 0.2
      })),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }

      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setShowImage(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeTab === 'All') return TECH_STACK;

    return TECH_STACK.filter(
      (item) => item.category === activeTab
    );
  }, [activeTab]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return PROJECTS;

    return PROJECTS.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some((tech) =>
          tech.toLowerCase().includes(query)
        )
      );
    });
  }, [searchQuery]);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(id);

      setTimeout(() => {
        setCopiedLink(null);
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });

    setMobileMenuOpen(false);
    setCommandPaletteOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-200 overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        <div className="absolute inset-0 bg-[#070a13]" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(#38bdf8 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage:
              'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)'
          }}
        />

        {stars.map((star) => {
          const starX =
            (star.left / 100) * window.innerWidth;

          const starY =
            (star.top / 100) * window.innerHeight;

          const distance = Math.sqrt(
            Math.pow(mousePosition.x - starX, 2) +
              Math.pow(mousePosition.y - starY, 2)
          );

          const influence = Math.max(
            0,
            1 - distance / 220
          );

          const moveX =
            (mousePosition.x -
              window.innerWidth / 2) *
            0.012 *
            star.depth;

          const moveY =
            (mousePosition.y -
              window.innerHeight / 2) *
            0.012 *
            star.depth;

          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white transition-all duration-300 ease-out"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity:
                  0.35 + influence * 0.65,
                transform: `
                  translate(${moveX}px, ${moveY}px)
                  scale(${1 + influence * 1.8})
                `,
                boxShadow:
                  influence > 0.1
                    ? `
                      0 0 ${6 + influence * 16}px
                      ${2 + influence * 6}px
                      rgba(255,255,255,${
                        0.2 + influence * 0.6
                      })
                    `
                    : 'none'
              }}
            />
          );
        })}

        {/* Mouse glow */}
        <div
          className="absolute w-72 h-72 rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 144,
            top: mousePosition.y - 144,
            background:
              'radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(56,189,248,0.04) 25%, transparent 70%)'
          }}
        />

        {/* Background lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient
              id="netGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#00a8ff"
                stopOpacity="0.3"
              />

              <stop
                offset="100%"
                stopColor="#38bdf8"
                stopOpacity="0.05"
              />
            </linearGradient>
          </defs>

          <path
            d="M0,100 Q400,300 800,100 T1600,200"
            fill="none"
            stroke="url(#netGrad)"
            strokeWidth="1"
          />

          <path
            d="M100,500 Q600,200 1200,600"
            fill="none"
            stroke="url(#netGrad)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10">

        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-[#070a13]/80 backdrop-blur-xl">

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="h-20 flex items-center justify-between">

              <button
                onClick={() => scrollToSection('home')}
                className="text-xl"
              >
                <TypingLogo />
              </button>

              <nav className="hidden md:flex items-center gap-8">

                <button
                  onClick={() => scrollToSection('home')}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>

                <button
                  onClick={() => scrollToSection('game')}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Game 🎮
                </button>

                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  About
                </button>

                <button
                  onClick={() => scrollToSection('education')}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Education
                </button>

                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Projects
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Contact
                </button>

                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/70 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all"
                >
                  <Command size={15} />
                  <span className="text-xs">
                    Ctrl K
                  </span>
                </button>
              </nav>

              <button
                onClick={() =>
                  setMobileMenuOpen(!mobileMenuOpen)
                }
                className="md:hidden text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-800/60 bg-[#070a13]/95 backdrop-blur-xl">

              <div className="px-6 py-5 flex flex-col gap-4">

                <button
                  onClick={() => scrollToSection('home')}
                  className="text-left text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>

                <button
                  onClick={() => scrollToSection('game')}
                  className="text-left text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Game 🎮
                </button>

                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  About
                </button>

                <button
                  onClick={() => scrollToSection('education')}
                  className="text-left text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Education
                </button>

                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-left text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Projects
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Contact
                </button>

              </div>
            </div>
          )}
        </header>

        {/* HERO */}
        <section
          id="home"
          className="min-h-screen flex items-center pt-28 pb-16 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto w-full">

            <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-20">

              <div className="flex-1 text-center md:text-left">

                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  Available for work
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
                  Hi, I'm{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Revan
                  </span>
                  <span className="text-cyan-400">.</span>
                </h1>

                <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-slate-300">
                  Frontend Developer
                </h2>

                <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-base sm:text-lg leading-8 text-slate-400">
                  I build modern, scalable and user-friendly web
                  applications using modern technologies and clean
                  development practices.
                </p>

                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">

                  <button
                    onClick={() => scrollToSection('projects')}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    View Projects
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 font-semibold hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                  >
                    Contact Me
                    <Send size={17} />
                  </button>

                </div>

                {/* Social links */}
                <div className="mt-8 flex justify-center md:justify-start gap-3">

                  <a
                    href="https://github.com/revan123hs"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <Github size={20} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/revan-h%C9%99s%C9%99nov-849a693a6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  >
                    <Linkedin size={20} />
                  </a>

                  <button
                    onClick={() => scrollToSection('contact')}
                    aria-label="Contact"
                    className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  >
                    <Mail size={20} />
                  </button>

                </div>
              </div>

              {/* PROFILE IMAGE */}
              <div className="w-full sm:w-72 md:w-80 flex-shrink-0 self-center md:self-start">

                <div className="relative group">

                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>

                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">

                    <img
                      src={profileImage}
                      alt="Revan Hesenov"
                      onClick={() => setShowImage(true)}
                      className="w-full h-full object-contain scale-110 cursor-pointer filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />

                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Open to opportunities
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="py-24 px-6 lg:px-8 border-t border-slate-800/50"
        >
          <div className="max-w-7xl mx-auto">

            <div className="max-w-3xl">

              <div className="flex items-center gap-3 mb-4">
                <User
                  size={20}
                  className="text-cyan-400"
                />

                <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  About Me
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Building digital experiences
                <span className="text-cyan-400">.</span>
              </h2>

              <p className="mt-6 text-slate-400 leading-8">
                I'm a passionate developer focused on creating
                clean, performant and visually appealing web
                applications. I enjoy turning ideas into real
                products and continuously learning new technologies.
              </p>

              <p className="mt-4 text-slate-400 leading-8">
                My main focus is frontend and full-stack development,
                with a strong interest in modern JavaScript
                ecosystems, responsive UI and scalable backend
                solutions.
              </p>

            </div>

            {/* Tech tabs */}
            <div className="mt-12">

              <div className="flex flex-wrap gap-2 mb-8">

                {['All', 'Frontend', 'Tools'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/40 hover:bg-slate-900 transition-all"
                  >

                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                      <TechIcon icon={skill.icon} />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-white">
                      {skill.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {skill.category}
                    </p>

                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

        {/* GAME */}
        <section id="game">
          <Game />
        </section>

        {/* EDUCATION */}
        <section
          id="education"
          className="py-24 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex items-center gap-3 mb-4">
              <BookOpen
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Education
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Education & Learning
              <span className="text-cyan-400">.</span>
            </h2>

            <div className="mt-12 max-w-4xl">

              <div className="relative pl-8 border-l border-slate-800">

                <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30"></div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/30 transition-all">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                    <h3 className="text-xl font-bold text-white">
                      Computer Science
                    </h3>

                    <span className="text-sm text-cyan-400">
                      Education
                    </span>

                  </div>

                  <p className="mt-3 text-slate-400 leading-7">
                    Developing strong foundations in programming,
                    software development, algorithms, databases
                    and modern web technologies.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {[
                      'Programming',
                      'Web Development',
                      'Databases',
                      'Algorithms'
                    ].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-400"
                      >
                        {item}
                      </span>
                    ))}

                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="py-24 px-6 lg:px-8 border-t border-slate-800/50"
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              <div>

                <div className="flex items-center gap-3 mb-4">
                  <Code
                    size={20}
                    className="text-cyan-400"
                  />

                  <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                    Projects
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Selected Work
                  <span className="text-cyan-400">.</span>
                </h2>

                <p className="mt-4 max-w-2xl text-slate-400">
                  Some of the projects I've worked on using modern
                  technologies and development practices.
                </p>

              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 transition-all"
                />

              </div>
            </div>

            {/* Projects */}
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredProjects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300"
                >

                  {/* PROJECT IMAGE */}
                  <div className="h-48 bg-slate-900 relative overflow-hidden">

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          project.title === 'Burger Vision'
                            ? 'https://placehold.co/1200x600/0f172a/22d3ee?text=Burger+Vision'
                            : project.title === 'E-Commerce Platform'
                            ? 'https://placehold.co/1200x600/0f172a/22d3ee?text=E-Commerce+Platform'
                            : '';
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-cyan-300 border border-cyan-400/20">
                        {project.title}
                      </span>
                    </div>

                  </div>

                  <div className="p-6">

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div className="mt-5 flex flex-wrap gap-2">

                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}

                    </div>

                    {/* Links */}
                    <div className="mt-6 flex items-center gap-3">

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                      >
                        <Github size={16} />
                        GitHub
                      </a>

                      {project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-sm text-cyan-400 hover:bg-cyan-500/20 transition-all"
                        >
                          Live Demo
                          <ExternalLink size={16} />
                        </a>
                      )}

                    </div>

                  </div>

                </article>
              ))}

            </div>

            {/* No results */}
            {filteredProjects.length === 0 && (
              <div className="mt-12 py-16 text-center rounded-2xl border border-dashed border-slate-800">

                <Search
                  size={32}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-4 text-slate-500">
                  No projects found.
                </p>

              </div>
            )}

          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="py-24 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">

            <div className="max-w-2xl">

              <div className="flex items-center gap-3 mb-4">
                <Mail
                  size={20}
                  className="text-cyan-400"
                />

                <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  Contact
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Let's work together
                <span className="text-cyan-400">.</span>
              </h2>

              <p className="mt-4 text-slate-400 leading-7">
                Have a project, idea or opportunity? Send me a
                message and let's talk.
              </p>

            </div>

            <div className="mt-12 grid lg:grid-cols-2 gap-10">

              {/* CONTACT FORM */}
              <form
                action="https://formspree.io/f/mnpnvyyv"
                method="POST"
                className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/50"
              >

                <div className="space-y-5">

                  <div>
                    <label className="block mb-2 text-sm text-slate-400">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/70 text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-slate-400">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/70 text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-slate-400">
                      Message
                    </label>

                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/70 text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 disabled:opacity-70 transition-all"
                  >
                    {formSubmitted ? (
                      <>
                        <Check size={18} />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                </div>

              </form>

              {/* CONTACT INFO */}
              <div className="space-y-4">

                {/* EMAIL */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Mail size={21} />
                    </div>

                    <div>

                      <p className="text-sm text-slate-500">
                        Email
                      </p>

                      <button
                        onClick={() =>
                          handleCopy(
                            'revanhasanov23@gmail.com',
                            'email'
                          )
                        }
                        className="mt-1 text-slate-200 hover:text-cyan-400 transition-colors"
                      >
                        {copiedLink === 'email'
                          ? 'Copied!'
                          : 'revanhasanov23@gmail.com'}
                      </button>

                    </div>
                  </div>
                </div>

                {/* GITHUB */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Github size={21} />
                    </div>

                    <div>

                      <p className="text-sm text-slate-500">
                        GitHub
                      </p>

                      <a
                        href="https://github.com/revan123hs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-slate-200 hover:text-cyan-400 transition-colors"
                      >
                        github.com/revan123hs
                      </a>

                    </div>
                  </div>
                </div>

                {/* LINKEDIN */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Linkedin size={21} />
                    </div>

                    <div>

                      <p className="text-sm text-slate-500">
                        LinkedIn
                      </p>

                 <a
  href="https://www.linkedin.com/in/revan-h%C9%99s%C9%99nov-849a693a6/"
  target="_blank"
  rel="noopener noreferrer"
>
  <Linkedin size={20} />
</a>

                    </div>
                  </div>
                </div>
                {/* PHONE */}
<div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">

  <div className="flex items-center gap-4">

    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
      <Phone size={21} />
    </div>

    <div>
      <p className="text-sm text-slate-500">
        Phone
      </p>

      <a
        href="tel:+994519990141"
        className="mt-1 block text-slate-200 hover:text-cyan-400 transition-colors"
      >
        051-999-01-41
      </a>
    </div>

  </div>

</div>

              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/50">

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} Revan Hesenov.
                All rights reserved.
              </p>

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Back to top
                <ArrowUp size={16} />
              </button>

            </div>

          </div>
        </footer>

      </div>

      {/* IMAGE MODAL */}
      {showImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setShowImage(false)}
        >

          <button
            onClick={() => setShowImage(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <X size={24} />
          </button>

          <img
            src={profileImage}
            alt="Revan Hesenov"
            className="max-w-[700px] max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      )}

      {/* COMMAND PALETTE */}
      {commandPaletteOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-6"
          onClick={() => setCommandPaletteOpen(false)}
        >

          <div
            className="w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0b0f1a] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">

              <Search
                size={20}
                className="text-slate-500"
              />

              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-600"
              />

              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="text-xs text-slate-500 hover:text-white"
              >
                ESC
              </button>

            </div>

            <div className="p-3">

              <button
                onClick={() => scrollToSection('home')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <User size={18} />
                Home
              </button>

              <button
                onClick={() => scrollToSection('about')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <User size={18} />
                About
              </button>

              <button
                onClick={() => scrollToSection('education')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <BookOpen size={18} />
                Education
              </button>

              <button
                onClick={() => scrollToSection('game')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <Code size={18} />
                Game
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <Code size={18} />
                Projects
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <Mail size={18} />
                Contact
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}