import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Users, Calendar, MapPin, Star, X } from 'lucide-react';

const Compare = () => {
  const navigate = useNavigate();
  const [selectedClubs, setSelectedClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample club data - in a real app, this would come from props or context
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


  const filteredClubs = useMemo(() => {
    return clubsData.filter(club =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const addClubToCompare = (club) => {
    if (selectedClubs.length < 3 && !selectedClubs.find(c => c.id === club.id)) {
      setSelectedClubs([...selectedClubs, club]);
    }
  };

  const removeClubFromCompare = (clubId) => {
    setSelectedClubs(selectedClubs.filter(club => club.id !== clubId));
  };

  const clearAll = () => {
    setSelectedClubs([]);
  };

  const CategoryColors = {
    'Academic': 'bg-blue-100 text-blue-800 border-blue-200',
    'Arts': 'bg-purple-100 text-purple-800 border-purple-200',
    'Business': 'bg-green-100 text-green-800 border-green-200',
    'Career': 'bg-orange-100 text-orange-800 border-orange-200',
    'Cultural': 'bg-pink-100 text-pink-800 border-pink-200',
    'Recreation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Service': 'bg-red-100 text-red-800 border-red-200',
    'STEM': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Leadership': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white border-b border-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
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
            <h1 className="text-3xl font-bold text-yellow-800 drop-shadow-sm">Compare Clubs</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Selection */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Clubs to Compare (Max 3)</h2>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clubs by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-black"
              />
            </div>

            {/* Selected Clubs */}
            {selectedClubs.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">Selected Clubs ({selectedClubs.length}/3)</h3>
                  <button
                    onClick={clearAll}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedClubs.map(club => (
                    <div
                      key={club.id}
                      className="flex items-center space-x-2 bg-white border-2 border-gray-300 rounded-lg px-3 py-2"
                    >
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${CategoryColors[club.category]}`}>
                        {club.category}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{club.name}</span>
                      <button
                        onClick={() => removeClubFromCompare(club.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Club List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredClubs.map(club => {
                const isSelected = selectedClubs.find(c => c.id === club.id);
                const canAdd = selectedClubs.length < 3 && !isSelected;
                
                return (
                  <div
                    key={club.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300'
                        : canAdd
                        ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canAdd && addClubToCompare(club)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{club.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${CategoryColors[club.category]}`}>
                        {club.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{club.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Users size={12} className="mr-1" />
                        {club.members}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {club.meetings}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedClubs.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Club Comparison</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 border-r border-gray-200">
                      Features
                    </th>
                    {selectedClubs.map(club => (
                      <th key={club.id} className="px-6 py-4 text-left text-sm font-medium text-gray-900 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${CategoryColors[club.category]}`}>
                            {club.category}
                          </span>
                          <span className="font-semibold">{club.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Description</td>
                    {selectedClubs.map(club => (
                      <td key={club.id} className="px-6 py-4 text-sm text-gray-600 border-r border-gray-200">
                        {club.description}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Sponsor</td>
                    {selectedClubs.map(club => (
                      <td key={club.id} className="px-6 py-4 text-sm text-gray-600 border-r border-gray-200">
                        {club.sponsor}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Members</td>
                    {selectedClubs.map(club => (
                      <td key={club.id} className="px-6 py-4 text-sm text-gray-600 border-r border-gray-200">
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-gray-400" />
                          {club.members}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Meeting Frequency</td>
                    {selectedClubs.map(club => (
                      <td key={club.id} className="px-6 py-4 text-sm text-gray-600 border-r border-gray-200">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          {club.meetings}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Location</td>
                    {selectedClubs.map(club => (
                      <td key={club.id} className="px-6 py-4 text-sm text-gray-600 border-r border-gray-200">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-gray-400" />
                          {club.location}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedClubs.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mb-4">
              <Star size={32} className="text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs selected</h3>
            <p className="text-gray-600">Select up to 3 clubs from the list above to compare their features.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare; 