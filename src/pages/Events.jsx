import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Calendar, MapPin, Clock, Users, Filter, X } from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Club data for reference
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

  // Sample events data
  const eventsData = [
    {
      id: 1,
      title: 'Academic Bowl Competition',
      description: 'Join us for the annual Academic Bowl competition where teams compete in various academic subjects.',
      date: '2024-02-15',
      time: '3:30 PM',
      location: 'Room 201',
      organizer: 'Academic Bowl',
      category: 'Academic',
      attendees: 24,
      maxAttendees: 30,
      isRegistrationRequired: true,
      image: 'https://images.unsplash.com/photo-1523240794102-9ebd172decd7?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Art Club Exhibition',
      description: 'Showcase of student artwork and creative projects from the Art Club.',
      date: '2024-02-20',
      time: '4:00 PM',
      location: 'Art Gallery',
      organizer: 'Art Club',
      category: 'Arts',
      attendees: 45,
      maxAttendees: 50,
      isRegistrationRequired: false,
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8a?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'DECA Business Competition',
      description: 'Regional DECA competition for business and marketing students.',
      date: '2024-02-25',
      time: '8:00 AM',
      location: 'Conference Center',
      organizer: 'DECA',
      category: 'Business',
      attendees: 18,
      maxAttendees: 20,
      isRegistrationRequired: true,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Environmental Club Cleanup',
      description: 'Community service event to clean up the school grounds and promote environmental awareness.',
      date: '2024-03-01',
      time: '2:30 PM',
      location: 'School Grounds',
      organizer: 'Environmental Club',
      category: 'Service',
      attendees: 32,
      maxAttendees: 40,
      isRegistrationRequired: true,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Science Olympiad Practice',
      description: 'Weekly practice session for Science Olympiad team members.',
      date: '2024-03-05',
      time: '3:00 PM',
      location: 'Science Lab 3',
      organizer: 'Science Olympiad',
      category: 'STEM',
      attendees: 15,
      maxAttendees: 15,
      isRegistrationRequired: true,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Cultural Festival',
      description: 'Celebration of diverse cultures through food, music, and performances.',
      date: '2024-03-10',
      time: '5:00 PM',
      location: 'Gymnasium',
      organizer: 'Asian Culture Club',
      category: 'Cultural',
      attendees: 120,
      maxAttendees: 150,
      isRegistrationRequired: false,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Chess Tournament',
      description: 'Monthly chess tournament open to all skill levels.',
      date: '2024-03-15',
      time: '3:30 PM',
      location: 'Library',
      organizer: 'Chess Club',
      category: 'Recreation',
      attendees: 28,
      maxAttendees: 32,
      isRegistrationRequired: true,
      image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Leadership Workshop',
      description: 'Workshop focused on developing leadership skills and team building.',
      date: '2024-03-20',
      time: '4:00 PM',
      location: 'Room 105',
      organizer: 'BETA Club',
      category: 'Leadership',
      attendees: 22,
      maxAttendees: 25,
      isRegistrationRequired: true,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      title: 'Robotics Competition',
      description: 'FRC robotics competition preparation and practice.',
      date: '2024-03-25',
      time: '3:00 PM',
      location: 'Robotics Lab',
      organizer: 'Robotics Club',
      category: 'STEM',
      attendees: 12,
      maxAttendees: 15,
      isRegistrationRequired: true,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      title: 'Book Club Discussion',
      description: 'Monthly book discussion and literary analysis session.',
      date: '2024-04-01',
      time: '3:30 PM',
      location: 'Library Conference Room',
      organizer: 'West Forsyth Book Club',
      category: 'Academic',
      attendees: 18,
      maxAttendees: 20,
      isRegistrationRequired: false,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    }
  ];

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

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const categories = ['All', ...Object.keys(CategoryColors)];

  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      
      const eventMonth = new Date(event.date).toLocaleString('default', { month: 'long' });
      const matchesMonth = selectedMonth === 'All' || eventMonth === selectedMonth;
      
      return matchesSearch && matchesCategory && matchesMonth;
    });
  }, [searchTerm, selectedCategory, selectedMonth]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthFromDate = (dateString) => {
    return new Date(dateString).toLocaleString('default', { month: 'long' });
  };

  const groupedEvents = useMemo(() => {
    const grouped = {};
    filteredEvents.forEach(event => {
      const month = getMonthFromDate(event.date);
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(event);
    });
    return grouped;
  }, [filteredEvents]);

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
            <h1 className="text-3xl font-bold text-yellow-800 drop-shadow-sm">Club Events</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Events</h2>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, description, or organizer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-black"
              />
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-black"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-black"
                >
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {Object.keys(groupedEvents).length > 0 ? (
            Object.entries(groupedEvents).map(([month, events]) => (
              <div key={month} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">{month} Events</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                      <div key={event.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 relative">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${CategoryColors[event.category]}`}>
                              {event.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar size={16} className="mr-2" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock size={16} className="mr-2" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin size={16} className="mr-2" />
                              {event.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users size={16} className="mr-2" />
                              {event.attendees}/{event.maxAttendees} attendees
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Organized by {event.organizer}</span>
                            {event.isRegistrationRequired && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Registration Required
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters to find events.</p>
            </div>
          )}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Events; 