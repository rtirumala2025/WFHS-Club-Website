import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, Calendar, MapPin, Star, Award, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      number: '50+',
      label: 'Active Clubs',
      description: 'Diverse organizations covering all interests'
    },
    {
      icon: Calendar,
      number: '200+',
      label: 'Events Yearly',
      description: 'Regular meetings, competitions, and activities'
    },
    {
      icon: MapPin,
      number: '12',
      label: 'Categories',
      description: 'From Academic to Sports and everything in between'
    },
    {
      icon: Star,
      number: '1000+',
      label: 'Students Involved',
      description: 'Active participation across all grade levels'
    }
  ];

  const features = [
    {
      icon: Heart,
      title: 'Community Building',
      description: 'Fostering connections and friendships among students with shared interests.'
    },
    {
      icon: Award,
      title: 'Leadership Development',
      description: 'Providing opportunities for students to develop leadership and organizational skills.'
    },
    {
      icon: Lightbulb,
      title: 'Skill Enhancement',
      description: 'Helping students explore passions and develop new talents outside the classroom.'
    },
    {
      icon: Users,
      title: 'Diversity & Inclusion',
      description: 'Celebrating different cultures, backgrounds, and perspectives through various clubs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white border-b border-white/50 backdrop-blur-sm relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-yellow-800 hover:text-yellow-600 transition-colors"
              >
                <ChevronLeft size={24} className="mr-2" />
                Back to Clubs
              </button>
            </div>
            <h1 className="text-3xl font-bold text-yellow-800 drop-shadow-sm">About WFHS Clubs</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to The Club Network @ WFHS</h2>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Discover the vibrant community of clubs and organizations at West Forsyth High School. 
              From academic excellence to creative expression, there's something for everyone.
            </p>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full inline-block">
              <span className="font-semibold">Join a Club Today!</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Join a Club?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex-shrink-0">
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 text-center">Our Mission</h3>
            <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed">
              To provide every student at West Forsyth High School with opportunities to explore their interests, 
              develop leadership skills, and build lasting connections through meaningful extracurricular activities. 
               At WFHS, we believe that involvement in clubs and organizations is essential for personal growth, academic success, and a well-rounded high school experience.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get Involved</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">How to Join</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Browse clubs by category on our main page</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Contact the club sponsor for meeting times</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Attend a meeting to learn more</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complete any required registration forms</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h4>
              <div className="space-y-3 text-gray-600">
                <p>If you have questions about clubs or need assistance getting started, please contact:</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">Student Activities Office</p>
                  <p>Room 201, Main Building</p>
                  <p>Email: activities@wfhs.edu</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default About; 