import React, { useState, lazy, Suspense, memo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { 
  FiMail, 
  FiMapPin, 
  FiUsers, 
  FiTarget, 
  FiHeart, 
  FiAward,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiGlobe,
  FiChevronRight,
  FiClock,
  FiBookOpen,
  FiStar,
  FiTrendingUp,
  FiCode,
  FiBriefcase,
  FiPenTool,
  FiMessageCircle,
  FiZap,
  FiShield,
  FiCpu
} from 'react-icons/fi';

// Loading fallback component
const StatsFallback = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg animate-pulse">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto mb-3"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto"></div>
      </div>
    ))}
  </div>
);

// Memoized team member card for performance
const TeamMemberCard = memo(({ member, index }) => {
  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiTwitter, href: '#', label: 'Twitter' }
  ];

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        <div className="p-6">
          <div className="flex flex-col items-center text-center relative z-20">
            {/* Avatar with icon */}
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl transform group-hover:scale-110 transition-all duration-500 shadow-lg">
                {member.icon}
              </div>
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            </div>
            
            {/* Member info */}
            <h3 className="text-lg font-semibold text-gray-900  mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {member.name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-xs mb-2">
              {member.role}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {member.expertise}
            </p>
            
            {/* Social links */}
            <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

// Memoized value card
const ValueCard = memo(({ value, index }) => (
  <Card 
    className="p-5 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
        {value.icon}
      </div>
      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
        {value.title}
      </h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        {value.description}
      </p>
    </div>
  </Card>
));

ValueCard.displayName = 'ValueCard';

// Main component
export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const teamMembers = [
    { 
      name: 'Jibran', 
      role: 'Founder & Engineer', 
      expertise: 'Full Stack Development · 8+ years',
      icon: <FiCode className="w-8 h-8 text-white" />,
    },
    { 
      name: 'Arshad', 
      role: 'Product Manager', 
      expertise: 'Product Strategy · 6+ years',
      icon: <FiBriefcase className="w-8 h-8 text-white" />,
    },
    { 
      name: 'Zubair', 
      role: 'Lead Designer', 
      expertise: 'UI/UX Design · 5+ years',
      icon: <FiPenTool className="w-8 h-8 text-white" />,
    },
    { 
      name: 'Usman', 
      role: 'Community Lead', 
      expertise: 'Community Building · 4+ years',
      icon: <FiMessageCircle className="w-8 h-8 text-white" />,
    },
  ];

  const values = [
    { 
      icon: <FiHeart className="w-5 h-5" />, 
      title: 'User-Centric Design', 
      description: 'Crafted with our users in mind for intuitive experiences.'
    },
    { 
      icon: <FiZap className="w-5 h-5" />, 
      title: 'Performance First', 
      description: 'Lightning-fast load times for uninterrupted learning.'
    },
    { 
      icon: <FiShield className="w-5 h-5" />, 
      title: 'Privacy & Security', 
      description: 'Enterprise-grade security for your data.'
    },
    { 
      icon: <FiCpu className="w-5 h-5" />, 
      title: 'Innovation', 
      description: 'Constantly evolving with cutting-edge technology.'
    },
  ];

  const stats = [
    { icon: FiUsers, value: '10k+', label: 'Students', change: '+25%' },
    { icon: FiBookOpen, value: '500+', label: 'Courses', change: '+50' },
    { icon: FiClock, value: '50k+', label: 'Hours', change: '+40%' },
    { icon: FiStar, value: '4.8', label: 'Rating', change: 'Top Rated' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                ✨ Welcome to E-Learning
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Learning</span>
              <br />For Everyone
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
              We're on a mission to make quality education accessible, engaging, and effective 
              for learners and creators worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="px-6 py-3 text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Start Learning
              </Button>
              <Button className="px-6 py-3 text-sm bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Become Instructor
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="p-4 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-400 mb-0.5">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <span className="inline-block px-1.5 py-0.5 bg-green-100 dark:bg-green-900/40 text-white dark:text-white text-[10px] rounded-full">
                  {stat.change}
                </span>
              </Card>
            ))}
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FiTarget className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 ">
                  Our Mission
                </h2>
              </div>
              <p className="text-sm text-gray-700  leading-relaxed mb-4">
                E-Learning is revolutionizing online education by providing flexible, 
                modern tools that empower creators and engage learners. 
                We believe in simple UX, blazing-fast performance, and features that 
                make learning truly accessible.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">For Creators</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Tools to create & monetize content
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">For Learners</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Interactive courses & tracking
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-white mb-4">Let's Connect</h2>
              <p className="text-white/90 text-sm mb-5 leading-relaxed">
                Have questions or want to collaborate? We'd love to hear from you.
              </p>

              <div className="space-y-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FiMail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">Email</p>
                    <a 
                      href="mailto:hello@elearning.com" 
                      className="text-white font-medium text-sm hover:underline"
                    >
                      hello@elearning.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FiGlobe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">Location</p>
                    <p className="text-white font-medium text-sm">Remote-first · Global Team</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => window.location.href = 'mailto:hello@elearning.com'}
                className="w-full bg-blue-500 text-white hover:bg-blue-600 font-semibold py-3 text-sm shadow-xl"
              >
                Send us a message
                <FiChevronRight className="inline ml-1 w-4 h-4" />
              </Button>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                What We Stand For
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our core values shape the future of learning.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} index={index} />
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Meet the Team
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Passionate experts dedicated to transforming online education
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="mb-12 overflow-hidden">
            <div className="relative p-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Ready to Start Learning?
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 max-w-2xl mx-auto">
                  Join thousands of learners already part of the E-Learning community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="px-6 py-3 text-sm shadow-lg">
                    Explore Courses
                  </Button>
                  
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}