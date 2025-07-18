import React, { useState, useMemo } from 'react';
import { Search, Menu, X, Users, ChevronRight, BarChart3 } from 'lucide-react';
import { useAuth } from '../firebase';
import UserMenu from '../components/auth/userMenu';
import { useNavigate } from 'react-router-dom';

const ClubsWebsite = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setSelectedCategory(null);
    setSelectedClub(null);
    setSearchTerm('');
  };

  const handleCompareClick = () => {
    navigate('/compare');
  };

  const handleEventsClick = () => {
    navigate('/events');
  };

  // Add handler for About button
  const handleAboutClick = () => {
    navigate('/about');
  };

  // Temporary club data for testing
// Club data parsed from CSV
const clubsData = [
  {
    id: 'academic-bowl',
    name: 'Academic Bowl',
    description: 'A student group that practices & competes in core academic competitions',
    sponsor: 'J. Bush',
    category: 'Academic'
  },
  {
    id: 'anime-club',
    name: 'Anime Club',
    description: 'Do you love anime, manga, and all things Japanese?! Then this is the club for you! All are welcome whether you\'re new to the wonderful world of Anime or you are an expert!',
    sponsor: 'T. Porch', 
    category: 'Cultural'
  },
  {
    id: 'art-club',
    name: 'Art Club',
    description: 'This club is a place for students interested in art to gather, create, and plan service projects in the community. Instagram @wfhs.nahs',
    sponsor: 'A. Henke, A. Holland',
    category: 'Arts'
  },
  {
    id: 'asian-culture-club',
    name: 'Asian Culture Club',
    description: 'An inclusive club for celebrating and further commemorating important aspects of a variety of asian cultures for people who are and are not of asian descent who want an opportunity to engage in fun, creative projects and eat delicious food.',
    sponsor: 'S. Carder',
    category: 'Cultural'
  },
  {
    id: 'beta-club',
    name: 'BETA Club',
    description: 'Promotes character, develops leadership skills & encourages service involvement Beta Club',
    sponsor: 'A. Carlisle, K. Ashe',
    category: 'Leadership'
  },
  {
    id: 'bingo-club',
    name: 'Bingo Club',
    description: 'To maintain wellness and balance in life through playing Bingo',
    sponsor: 'P. Valentino',
    category: 'Recreation'
  },
  {
    id: 'black-student-union',
    name: 'Black Student Union (BSU)',
    description: 'We are a social and service organization of students interested in developing leadership abilities in our school and community.',
    sponsor: 'S. Gooding, D. Barker, B. Lane',
    category: 'Cultural'
  },
  {
    id: 'cadence-connoisseurs',
    name: 'Cadence Connoisseurs - Music Theory Club',
    description: 'Music enthusiasts of all levels come together to explore music in a welcoming and engaging atmosphere.',
    sponsor: 'J. Hoffman, N. Tucker',
    category: 'Arts'
  },
  {
    id: 'chess-club',
    name: 'Chess Club',
    description: 'To play with new and experienced chess players for fun and competitions.',
    sponsor: 'P. Wilson',
    category: 'Recreation'
  },
  {
    id: 'computer-science-club',
    name: 'Computer Science Club',
    description: 'The Computer Science Club provides students in the West Forsyth community with the opportunity to code and collaborate with new people. We will acquire fresh information from each other and flourish as a community.',
    sponsor: 'P. Wilson',
    category: 'STEM'
  },
  {
    id: 'conditions-awareness-club',
    name: 'Conditions Awareness Club',
    description: 'To increase awareness of conditions that affect students at West. CAC gives students an opportunity to present conditions they may have, to learn about other conditions, and ultimately to feel a sense of belonging.',
    sponsor: 'J. Bush',
    category: 'Support'
  },
  {
    id: 'create-x',
    name: 'Create X',
    description: 'Inspire, educate, and empower students to explore entrepreneurship, creativity, and innovation.',
    sponsor: 'J. Martin',
    category: 'Business'
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    description: 'Students get together for games, write papers and give feedback together, and have parties.',
    sponsor: 'L. Smith',
    category: 'Arts'
  },
  {
    id: 'cricket-club',
    name: 'Cricket Club',
    description: 'Designed to express student\'s interest, passion, and desire to play, compete, and help represent our school by participating in regional tournaments across Georgia.',
    sponsor: 'E. Hardy',
    category: 'Sports'
  },
  {
    id: 'crocheting-for-a-cause',
    name: 'Crocheting for a Cause',
    description: 'To provide community service with handmade goods for those in need as well as educating and assisting beginning crocheters to further develop new techniques, problem solving skills, and patience.',
    sponsor: 'S. Ewing',
    category: 'Service'
  },
  {
    id: 'cti',
    name: 'CTI',
    description: 'Through West/Georgia CTI works with students with disabilities seeking to explore multiple career interests by offering leadership and work readiness conferences in various settings through groups and/or individually.',
    sponsor: 'K. Dankowsky',
    category: 'Career'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'A club that builds programming and statistical skills – from scratch! We aim to benefit each other\'s understanding of the data and AI driven business world through fun, digestible collaborative activities.',
    sponsor: 'J. Hoffman',
    category: 'STEM'
  },
  {
    id: 'debate-team',
    name: 'Debate Team',
    description: 'Competitive Debate',
    sponsor: 'K. Troy',
    category: 'Academic'
  },
  {
    id: 'deca',
    name: 'DECA',
    description: 'DECA prepares emerging leaders and entrepreneurs in marketing, finance, hospitality and management in high school and colleges around the globe. Follow us on Instagram and Twitter to learn more! @westforsythDECA',
    sponsor: 'S. Boone Williams, L. Martin, J. Olson, C. Stemple',
    category: 'Business'
  },
  {
    id: 'environmental-club',
    name: 'Environmental Club',
    description: 'Promote the conservation of the environment through activities and education. Students participate in and create ways to encourage the community around them to help save the environment.',
    sponsor: 'A. Lovewell, K. Clark',
    category: 'Service'
  },
  {
    id: 'fbla',
    name: 'FBLA',
    description: 'Future Business Leaders of America prepares students to be emerging leaders in business & technology through competition.',
    sponsor: 'B. Fink, P. Wilson',
    category: 'Business'
  },
  {
    id: 'fca',
    name: 'FCA',
    description: 'Interdenominational ministry reaching out to athletes Instagram: @westforsyth_fca',
    sponsor: 'J. Dickey',
    category: 'Religious'
  },
  {
    id: 'fccla',
    name: 'FCCLA',
    description: 'Family, Career & Comm. Leaders of America Family and Consumer Science Organization',
    sponsor: 'M. Compton, E. Bowden, C. Sweat, K. DiCeasre',
    category: 'Career'
  },
  {
    id: 'fencing-club',
    name: 'Fencing Club',
    description: 'To foster a sense of thrill and compete with growth in the sport of fencing.',
    sponsor: 'B. Hardy',
    category: 'Sports'
  },
  {
    id: 'hosa',
    name: 'Health Occupations Students of America',
    description: 'Empower HOSA-Future Health Professionals to become leaders in the global health community through education, collaboration, and experience.',
    sponsor: 'G. Dutton, H. Foy, K. Bell',
    category: 'Career'
  },
  {
    id: 'hindu-yuva',
    name: 'Hindu YUVA',
    description: 'Celebrate, promote, and help others experience the rich deep cultures and religions of India',
    sponsor: 'S. Rodriguez',
    category: 'Cultural'
  },
  {
    id: 'interact-club',
    name: 'Interact Club',
    description: 'Service above self',
    sponsor: 'P. Valentino',
    category: 'Service'
  },
  {
    id: 'investing-club',
    name: 'Investing Club',
    description: 'The investing club aims to impact crucial investing skills that will significantly enhance student\'s financial abilities.',
    sponsor: 'S. Englebert',
    category: 'Business'
  },
  {
    id: 'international-dance-club',
    name: 'International Dance Club',
    description: 'Created to recognize outstanding artistic merit, leadership, and academic achievement in students studying dance in dance studios, cultural/community centers, and performing arts organizations.',
    sponsor: 'L. McGlumphy',
    category: 'Arts'
  },
  {
    id: 'joi-club',
    name: 'JOI Club (Junior Optimist Club)',
    description: 'Members hone their leadership skills by identifying needs in the community and planning events, projects, and fundraisers to meet these needs.',
    sponsor: 'S. Carder',
    category: 'Leadership'
  },
  {
    id: 'key-club',
    name: 'Key Club',
    description: 'Student-led organization whose goal is to teach leadership through serving others',
    sponsor: 'S. Martin',
    category: 'Service'
  },
  {
    id: 'kpop-club',
    name: 'K-Pop Club',
    description: 'Club to provide K-Pop fans or just people who have an interest in Korean culture a space to connect with others.',
    sponsor: 'M. Barcia',
    category: 'Cultural'
  },
  {
    id: 'latin-club',
    name: 'Latin Club',
    description: 'To promote the culture of Ancient Rome',
    sponsor: 'D. Duncan',
    category: 'Cultural'
  },
  {
    id: 'math-team',
    name: 'Math Team',
    description: 'Students practice & compete in math competitions',
    sponsor: 'J. Martin',
    category: 'Academic'
  },
  {
    id: 'media-production-club',
    name: 'Media Production Club',
    description: 'The Media Production Club aims to impact crucial video editing skills that will significantly enhance students\' content creation abilities.',
    sponsor: 'S. Boone Williams',
    category: 'Arts'
  },
  {
    id: 'mock-trial',
    name: 'Mock Trial',
    description: 'Students try out, practice & compete in a courtroom setting',
    sponsor: 'S. Marcus',
    category: 'Academic'
  },
  {
    id: 'muslim-student-association',
    name: 'Muslim Student Association',
    description: 'Students compete as a team on issues of concern to the Muslim community',
    sponsor: 'P. Wilson',
    category: 'Religious'
  },
  {
    id: 'my-medical-message',
    name: 'My Medical Message',
    description: 'Dedicated to allowing students to explore their medical related interests in a collaborative and educational setting',
    sponsor: 'A. Carlisle',
    category: 'Career'
  },
  {
    id: 'nasa-club',
    name: 'NASA Club',
    description: 'To learn more about space and study the observations and findings of NASA',
    sponsor: 'E. Addis',
    category: 'STEM'
  },
  {
    id: 'numismatic-club',
    name: 'Numismatic Club',
    description: 'Coin Collecting',
    sponsor: 'M. Haas',
    category: 'Recreation'
  },
  {
    id: 'prism',
    name: 'PRISM',
    description: 'PRISM is a student-led organization that provides a safe and supportive environment for lesbian, gay, bisexual, and transgender (LGBT) students. All are welcome.',
    sponsor: 'B. Liming',
    category: 'Support'
  },
  {
    id: 'red-cross-club',
    name: 'Red Cross Club',
    description: 'A group that provides you and your peers with opportunities to make a difference by addressing your community\'s greatest needs and developing leadership skills Instagram - @redcrosswfhs',
    sponsor: 'S. Loftus',
    category: 'Service'
  },
  {
    id: 'relay-for-life',
    name: 'Relay For Life',
    description: 'Life-changing cancer fundraising events that help communities across the globe fight back against cancer',
    sponsor: 'K. Ashe',
    category: 'Service'
  },
  {
    id: 'robotics-club',
    name: 'Robotics Club (FRC)',
    description: 'Students have 2 months study code, build & compete with their robotics contest',
    sponsor: 'D. Biskup, J. Neuhaus',
    category: 'STEM'
  },
  {
    id: 'science-olympiad',
    name: 'Science Olympiad',
    description: 'Science and engineering competition team',
    sponsor: 'A. Carlisle, N. McAllister',
    category: 'STEM'
  },
  {
    id: 'sewa-club',
    name: 'SEWA Club',
    description: 'SEWA is an international organization based upon Hindu beliefs of serving your community. Their motto is "selfless service", and they implement that all around the globe.',
    sponsor: 'S. Ewing',
    category: 'Service'
  },
  {
    id: 'skillsusa',
    name: 'SkillsUSA',
    description: 'A partnership with industry working together to ensure America has a skilled workforce',
    sponsor: 'J. Crosby, L. Davis',
    category: 'Career'
  },
  {
    id: 'sickle-cell-care',
    name: 'Sickle Cell Care Organization',
    description: 'The club will aim to engage students in raising awareness and supporting those affected by Sickle Cell disease.',
    sponsor: 'K. Enns',
    category: 'Support'
  },
  {
    id: 'stem-e',
    name: 'STEM-E',
    description: 'The club sparks curiosity and empowers students to solve real-world problems through science, technology, engineering, math, and entrepreneurship. We provide hands-on learning experiences that showcase STEM careers.',
    sponsor: 'S. Englebert',
    category: 'STEM'
  },
  {
    id: 'stock-market',
    name: 'Stock Market',
    description: 'The purpose is to educate the current youth about investing in stocks and cryptocurrency',
    sponsor: 'S. Englebert',
    category: 'Business'
  },
  {
    id: 'student-government',
    name: 'Student Government Association',
    description: 'The purpose of this organization is to support the faculty and student body of WFHS through community service, leadership development, and the promotion of school pride. Instagram: WFHS_SGA_',
    sponsor: 'S. Loftus, S. Marcus, K. DiCesare',
    category: 'Leadership'
  },
  {
    id: 'students-for-animal-wellness',
    name: 'Students For Animal Wellness Club',
    description: 'This club aims to provide students with a platform to actively engage in activities that promote responsible pet ownership, advocate for animal welfare, and contribute to the well-being of animals in our community.',
    sponsor: 'S. Rodriguez',
    category: 'Service'
  },
  {
    id: 'tsa',
    name: 'Technology Student Association (TSA)',
    description: 'Developing technological literacy among young adults',
    sponsor: 'D. Biskup, J. Neuhaus',
    category: 'STEM'
  },
  {
    id: 'vibha',
    name: 'Vibha',
    description: 'Non-profit organization that helps raise money to aid the underprivileged children in India.',
    sponsor: 'M. Weber',
    category: 'Service'
  },
  {
    id: 'vt-seva',
    name: 'VT Seva',
    description: 'The purpose of this club is to empower youth through participation, volunteer work and philanthropic projects.',
    sponsor: 'A. Lovewell',
    category: 'Service'
  },
  {
    id: 'welcoming-wolverines',
    name: 'Welcoming Wolverines',
    description: 'A group of students who help new students to Forsyth County or anyone struggling to make a connection find community',
    sponsor: 'J. Rotunda, L. Golden',
    category: 'Support'
  },
  {
    id: 'west-forsyth-book-club',
    name: 'West Forsyth Book Club',
    description: 'Our goal is to foster a sense of community among readers as well as nurture students\' fondness for reading through guiding students to share ideas and perspectives.',
    sponsor: 'A. Teixeira',
    category: 'Academic'
  },
  {
    id: 'boys-volleyball-club',
    name: 'WFHS Boys Volleyball Club',
    description: 'An organization for boys to participate in organized volleyball',
    sponsor: 'S. Ewing',
    category: 'Sports'
  },
  {
    id: 'student-visionaries',
    name: 'West Student Visionaries of the Year',
    description: 'Plan fundraisers to support the Leukemia and Lymphoma Society.',
    sponsor: 'H. Foy',
    category: 'Service'
  },
  {
    id: 'barbell-club',
    name: 'WFHS Barbell Club',
    description: 'Designed to develop relationships with students who share a common interest in the gym.',
    sponsor: 'S. Cantrell, K. Eversole',
    category: 'Sports'
  },
  {
    id: 'world-language-learning',
    name: 'World Language Learning Club',
    description: 'Form a community where students are supported in learning any language they want for personal growth and to help others.',
    sponsor: 'L. McGlumphy',
    category: 'Academic'
  }
];

  const useClubFilter = (clubs, searchTerm = '', selectedCategory = null) => {
    const clubsByCategory = useMemo(() => {
      const grouped = clubs.reduce((acc, club) => {
        const category = club.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(club);
        return acc;
      }, {});
      const sortedCategories = Object.keys(grouped).sort();
      const result = {};
      sortedCategories.forEach(category => {
        result[category] = grouped[category].sort((a, b) => a.name.localeCompare(b.name));
      });
      return result;
    }, [clubs]);

    // Since we removed the search bar, always return all clubs
    const filteredClubs = useMemo(() => {
      return clubsByCategory;
    }, [clubsByCategory]);

    return { clubsByCategory, filteredClubs };
  };

  const { clubsByCategory, filteredClubs } = useClubFilter(clubsData, searchTerm);
  const selectedClubData = clubsData.find(club => club.id === selectedClub);

  const CategoryColors = {
    'Academic': 'bg-blue-100 text-blue-800 border-blue-200',
    'Arts': 'bg-purple-100 text-purple-800 border-purple-200',
    'Business': 'bg-green-100 text-green-800 border-green-200',
    'Career': 'bg-orange-100 text-orange-800 border-orange-200',
    'Cultural': 'bg-pink-100 text-pink-800 border-pink-200',
    'Recreation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Religious': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Service': 'bg-red-100 text-red-800 border-red-200',
    'Sports': 'bg-teal-100 text-teal-800 border-teal-200',
    'STEM': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Support': 'bg-gray-100 text-gray-800 border-gray-200',
    'Leadership': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  const CategoryGrid = ({ categories, categoryColors, clubsByCategory, onCategorySelect }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg text-left ${categoryColors[category]}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">{category}</h3>
            <ChevronRight size={20} />
          </div>
          <p className="text-sm opacity-75 mb-3">
            Explore {category.toLowerCase()} clubs and organizations
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {clubsByCategory[category]?.length || 0}
            </span>
            <span className="text-xs font-medium">
              {clubsByCategory[category]?.length === 1 ? 'Club' : 'Clubs'}
            </span>
          </div>
        </button>
      ))}
    </div>
  );

  const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <div className="p-6 border-b border-gray-200">
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const ClubCard = ({ club, categoryColors, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{club.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[club.category]}`}>
            {club.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{club.description}</p>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Sponsor:</span> {club.sponsor}
        </div>
      </div>
    </div>
  );

  const ClubDetails = ({ club, categoryColors, onBack }) => (
    <div>
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ChevronRight size={20} className="rotate-180 mr-2" />
        Club Section Page
      </button>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${categoryColors[club.category]}`}>
              {club.category}
            </span>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{club.description}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Sponsor</h2>
              <p className="text-gray-700">{club.sponsor}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Category</h2>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${categoryColors[club.category]}`}>
                {club.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-80 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white pt-0`}>
        {/* Sidebar Header - Updated to match login page aesthetic */}
        <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white px-6 py-6 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h1 className="text-xl font-bold text-yellow-800 drop-shadow-sm">WFHS Clubs</h1>
              <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                <p className="text-sm font-medium mt-1">& Organizations</p>
              </div>
            </div>
            {/* Close button for sidebar */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 transition-all duration-300"
            >
              <X size={20} className="text-black" />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 overflow-y-auto">
          <button
            onClick={handleHomeClick}
            className="w-full text-left p-3 rounded-lg mb-2 transition-colors"
          >
            <div className="flex items-center">
              <Users size={18} className="mr-3" />
              All Clubs
            </div>
          </button>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Categories
            </h3>
            {Object.keys(CategoryColors).map(category => (
              <button
                key={category}
                onClick={() => { setSelectedCategory(category); setSelectedClub(null); }}
                className={`w-full text-left p-2 rounded-lg mb-1 transition-colors ${
                  selectedCategory === category && !selectedClub
                    ? CategoryColors[category]
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${CategoryColors[category]}`}>
                    {clubsByCategory[category]?.length || 0}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
                  {/* Topbar - Updated to match login page aesthetic */}
          <div className="w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white h-[104px] flex items-center justify-between shadow-lg border-b border-white/50 backdrop-blur-sm relative overflow-hidden px-6 z-10">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-2000"></div>
            </div>
            
            {/* Left side - Menu and buttons */}
            <div className="flex items-center space-x-3 relative z-10">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 hover:shadow-lg transition-all duration-300"
              >
                {sidebarOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
              </button>

              {/* Compare Button */}
              <button
                onClick={handleCompareClick}
                className="px-3 py-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 hover:shadow-lg transition-all duration-300 text-sm font-medium text-black"
              >
                Compare
              </button>

              {/* Events Button */}
              <button
                onClick={handleEventsClick}
                className="px-3 py-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 hover:shadow-lg transition-all duration-300 text-sm font-medium text-black"
              >
                Events
              </button>
              {/* About Button */}
              <button
                onClick={handleAboutClick}
                className="px-3 py-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 hover:shadow-lg transition-all duration-300 text-sm font-medium text-black"
              >
                About
              </button>
            </div>
            
            {/* Center - Title */}
            <div className="flex-1 text-center relative z-10 px-4">
              <button
                onClick={handleHomeClick}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                <h1 className="text-2xl font-bold leading-tight text-yellow-800 drop-shadow-sm">The Club Network @ WFHS</h1>
                <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                  <p className="text-sm font-medium mt-1 leading-snug">
                    Explore clubs and organizations at West Forsyth High School
                  </p>
                </div>
              </button>
            </div>

            {/* Right side - User menu */}
            {user && (
              <div className="flex items-center relative z-[9999]">
                <UserMenu user={user} />
              </div>
            )}
          </div>

        <div className="p-6">
          {!selectedCategory && !selectedClub ? (
            <>
              <CategoryGrid 
                categories={Object.keys(CategoryColors)}
                categoryColors={CategoryColors}
                clubsByCategory={clubsByCategory}
                onCategorySelect={setSelectedCategory}
              />
            </>
          ) : selectedCategory && !selectedClub ? (
            <div>
              <button
                onClick={handleHomeClick}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ChevronRight size={20} className="rotate-180 mr-2" />
                Home Page
              </button>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCategory} Clubs</h2>
              <p className="text-gray-600">Clubs in the {selectedCategory} category</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs[selectedCategory]?.map(club => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    categoryColors={CategoryColors}
                    onClick={() => setSelectedClub(club.id)}
                  />
                )) || (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No clubs found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          ) : selectedClubData ? (
            <ClubDetails
              club={selectedClubData}
              categoryColors={CategoryColors}
              onBack={() => setSelectedClub(null)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <>
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-50 flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-80 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white pt-0`}>
          {/* Sidebar Header - UPDATED gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">WFHS Clubs</h1>
                <p className="text-blue-100 text-sm mt-1">& Organizations</p>
              </div>
              {/* Close button for sidebar */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          </div>
          <div className="px-6 py-4 overflow-y-auto">
            <button
              onClick={handleHomeClick}
              className="w-full text-left p-3 rounded-lg mb-2 transition-colors"
            >
              <div className="flex items-center">
                <Users size={18} className="mr-3" />
                All Clubs
              </div>
            </button>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                Categories
              </h3>
              {Object.keys(CategoryColors).map(category => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setSelectedClub(null); }}
                  className={`w-full text-left p-2 rounded-lg mb-1 transition-colors ${
                    selectedCategory === category && !selectedClub
                      ? CategoryColors[category]
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${CategoryColors[category]}`}>
                      {clubsByCategory[category]?.length || 0}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
          {/* Topbar - Updated to match login page aesthetic */}
          <div className="w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white h-[104px] flex items-center justify-between shadow-lg border-b border-white/50 backdrop-blur-sm relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-2000"></div>
            </div>
            
            {/* Left side - Menu and buttons */}
            <div className="flex items-center space-x-4 relative z-10">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                {sidebarOpen ? <X size={24} className="text-blue-600" /> : <Menu size={24} className="text-blue-600" />}
              </button>

              {/* Compare Button */}
              <button
                onClick={handleCompareClick}
                className="px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 text-sm font-medium text-blue-600"
              >
                Compare
              </button>

              {/* Events Button */}
              <button
                onClick={handleEventsClick}
                className="px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 text-sm font-medium text-blue-600"
              >
                Events
              </button>
              {/* About Button */}
              <button
                onClick={handleAboutClick}
                className="px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 text-sm font-medium text-blue-600"
              >
                About
              </button>
            </div>
            
            {/* Center - Title */}
            <div className="flex-1 text-center relative z-10">
              <button
                onClick={handleHomeClick}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                <h1 className="text-2xl font-bold leading-tight text-yellow-800 drop-shadow-sm">The Club Network @ WFHS</h1>
                <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                  <p className="text-sm font-medium mt-1 leading-snug">
                    Explore clubs and organizations at West Forsyth High School
                  </p>
                </div>
              </button>
            </div>

            {/* Right side - User menu */}
            {user && (
              <div className="flex items-center relative z-[9999]">
                <UserMenu user={user} />
              </div>
            )}
          </div>

          <div className="p-6">
            {!selectedCategory && !selectedClub ? (
              <>
                <CategoryGrid 
                  categories={Object.keys(CategoryColors)}
                  categoryColors={CategoryColors}
                  clubsByCategory={clubsByCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </>
            ) : selectedCategory && !selectedClub ? (
              <div>
                <button
                  onClick={handleHomeClick}
                  className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ChevronRight size={20} className="rotate-180 mr-2" />
                  Home Page
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCategory} Clubs</h2>
                <p className="text-gray-600">Clubs in the {selectedCategory} category</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClubs[selectedCategory]?.map(club => (
                    <ClubCard
                      key={club.id}
                      club={club}
                      categoryColors={CategoryColors}
                      onClick={() => setSelectedClub(club.id)}
                    />
                  )) || (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No clubs found in this category.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : selectedClubData ? (
              <ClubDetails
                club={selectedClubData}
                categoryColors={CategoryColors}
                onBack={() => setSelectedClub(null)}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubsWebsite;