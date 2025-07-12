import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, Users, Calendar, MapPin, User, Trophy, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComparePage = () => {
  const navigate = useNavigate();
  const [selectedClubs, setSelectedClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Complete club data with all required fields
  const clubsData = [
    {
      name: 'Academic Bowl',
      slug: 'academic-bowl',
      category: 'Academic',
      advisor: 'J. Bush',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'A student group that practices & competes in core academic competitions',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'Anime Club',
      slug: 'anime-club',
      category: 'Cultural',
      advisor: 'T. Porch',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Do you love anime, manga, and all things Japanese?! Then this is the club for you! All are welcome whether you\'re new to the wonderful world of Anime or you are an expert!',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'Art Club',
      slug: 'art-club',
      category: 'Arts',
      advisor: 'A. Henke, A. Holland',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'This club is a place for students interested in art to gather, create, and plan service projects in the community. Instagram @wfhs.nahs',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Asian Culture Club',
      slug: 'asian-culture-club',
      category: 'Cultural',
      advisor: 'S. Carder',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'An inclusive club for celebrating and further commemorating important aspects of a variety of asian cultures for people who are and are not of asian descent who want an opportunity to engage in fun, creative projects and eat delicious food.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'BETA Club',
      slug: 'beta-club',
      category: 'Leadership',
      advisor: 'A. Carlisle, K. Ashe',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Promotes character, develops leadership skills & encourages service involvement Beta Club',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'Bingo Club',
      slug: 'bingo-club',
      category: 'Recreation',
      advisor: 'P. Valentino',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'To maintain wellness and balance in life through playing Bingo',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'Black Student Union (BSU)',
      slug: 'black-student-union',
      category: 'Cultural',
      advisor: 'S. Gooding, D. Barker, B. Lane',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'We are a social and service organization of students interested in developing leadership abilities in our school and community.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Cadence Connoisseurs - Music Theory Club',
      slug: 'cadence-connoisseurs',
      category: 'Arts',
      advisor: 'J. Hoffman, N. Tucker',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Music enthusiasts of all levels come together to explore music in a welcoming and engaging atmosphere.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Chess Club',
      slug: 'chess-club',
      category: 'Recreation',
      advisor: 'P. Wilson',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'To play with new and experienced chess players for fun and competitions.',
      commitment: 'Medium',
      eventsPerMonth: 1,
      competitive: true
    },
    {
      name: 'Computer Science Club',
      slug: 'computer-science-club',
      category: 'STEM',
      advisor: 'P. Wilson',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The Computer Science Club provides students in the West Forsyth community with the opportunity to code and collaborate with new people. We will acquire fresh information from each other and flourish as a community.',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'Conditions Awareness Club',
      slug: 'conditions-awareness-club',
      category: 'Support',
      advisor: 'J. Bush',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'To increase awareness of conditions that affect students at West. CAC gives students an opportunity to present conditions they may have, to learn about other conditions, and ultimately to feel a sense of belonging.',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'Create X',
      slug: 'create-x',
      category: 'Business',
      advisor: 'J. Martin',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Inspire, educate, and empower students to explore entrepreneurship, creativity, and innovation.',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Creative Writing',
      slug: 'creative-writing',
      category: 'Arts',
      advisor: 'L. Smith',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Students get together for games, write papers and give feedback together, and have parties.',
      commitment: 'Medium',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'Cricket Club',
      slug: 'cricket-club',
      category: 'Sports',
      advisor: 'E. Hardy',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Designed to express student\'s interest, passion, and desire to play, compete, and help represent our school by participating in regional tournaments across Georgia.',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'Crocheting for a Cause',
      slug: 'crocheting-for-a-cause',
      category: 'Service',
      advisor: 'S. Ewing',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'To provide community service with handmade goods for those in need as well as educating and assisting beginning crocheters to further develop new techniques, problem solving skills, and patience.',
      commitment: 'Medium',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'CTI',
      slug: 'cti',
      category: 'Career',
      advisor: 'K. Dankowsky',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Through West/Georgia CTI works with students with disabilities seeking to explore multiple career interests by offering leadership and work readiness conferences in various settings through groups and/or individually.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Data Science',
      slug: 'data-science',
      category: 'STEM',
      advisor: 'J. Hoffman',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'A club that builds programming and statistical skills – from scratch! We aim to benefit each other\'s understanding of the data and AI driven business world through fun, digestible collaborative activities.',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Debate Team',
      slug: 'debate-team',
      category: 'Academic',
      advisor: 'K. Troy',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Competitive Debate',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'DECA',
      slug: 'deca',
      category: 'Business',
      advisor: 'S. Boone Williams, L. Martin, J. Olson, C. Stemple',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'DECA prepares emerging leaders and entrepreneurs in marketing, finance, hospitality and management in high school and colleges around the globe. Follow us on Instagram and Twitter to learn more! @westforsythDECA',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'Environmental Club',
      slug: 'environmental-club',
      category: 'Service',
      advisor: 'A. Lovewell, K. Clark',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Promote the conservation of the environment through activities and education. Students participate in and create ways to encourage the community around them to help save the environment.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'FBLA',
      slug: 'fbla',
      category: 'Business',
      advisor: 'B. Fink, P. Wilson',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Future Business Leaders of America prepares students to be emerging leaders in business & technology through competition.',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'FCA',
      slug: 'fca',
      category: 'Religious',
      advisor: 'J. Dickey',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Interdenominational ministry reaching out to athletes Instagram: @westforsyth_fca',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'FCCLA',
      slug: 'fccla',
      category: 'Career',
      advisor: 'M. Compton, E. Bowden, C. Sweat, K. DiCeasre',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Family, Career & Comm. Leaders of America Family and Consumer Science Organization',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'Fencing Club',
      slug: 'fencing-club',
      category: 'Sports',
      advisor: 'B. Hardy',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'To foster a sense of thrill and compete with growth in the sport of fencing.',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'Health Occupations Students of America',
      slug: 'hosa',
      category: 'Career',
      advisor: 'G. Dutton, H. Foy, K. Bell',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Empower HOSA-Future Health Professionals to become leaders in the global health community through education, collaboration, and experience.',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'Hindu YUVA',
      slug: 'hindu-yuva',
      category: 'Cultural',
      advisor: 'S. Rodriguez',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Celebrate, promote, and help others experience the rich deep cultures and religions of India',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Interact Club',
      slug: 'interact-club',
      category: 'Service',
      advisor: 'P. Valentino',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Service above self',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Investing Club',
      slug: 'investing-club',
      category: 'Business',
      advisor: 'S. Englebert',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The investing club aims to impact crucial investing skills that will significantly enhance student\'s financial abilities.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'International Dance Club',
      slug: 'international-dance-club',
      category: 'Arts',
      advisor: 'L. McGlumphy',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Created to recognize outstanding artistic merit, leadership, and academic achievement in students studying dance in dance studios, cultural/community centers, and performing arts organizations.',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'JOI Club (Junior Optimist Club)',
      slug: 'joi-club',
      category: 'Leadership',
      advisor: 'S. Carder',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Members hone their leadership skills by identifying needs in the community and planning events, projects, and fundraisers to meet these needs.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Key Club',
      slug: 'key-club',
      category: 'Service',
      advisor: 'S. Martin',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Student-led organization whose goal is to teach leadership through serving others',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'K-Pop Club',
      slug: 'kpop-club',
      category: 'Cultural',
      advisor: 'M. Barcia',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Club to provide K-Pop fans or just people who have an interest in Korean culture a space to connect with others.',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'Latin Club',
      slug: 'latin-club',
      category: 'Cultural',
      advisor: 'D. Duncan',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'To promote the culture of Ancient Rome',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'Math Team',
      slug: 'math-team',
      category: 'Academic',
      advisor: 'J. Martin',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Students practice & compete in math competitions',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'Media Production Club',
      slug: 'media-production-club',
      category: 'Arts',
      advisor: 'S. Boone Williams',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The Media Production Club aims to impact crucial video editing skills that will significantly enhance students\' content creation abilities.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Mock Trial',
      slug: 'mock-trial',
      category: 'Academic',
      advisor: 'S. Marcus',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Students try out, practice & compete in a courtroom setting',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'Muslim Student Association',
      slug: 'muslim-student-association',
      category: 'Religious',
      advisor: 'P. Wilson',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Students compete as a team on issues of concern to the Muslim community',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'My Medical Message',
      slug: 'my-medical-message',
      category: 'Career',
      advisor: 'A. Carlisle',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Dedicated to allowing students to explore their medical related interests in a collaborative and educational setting',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'NASA Club',
      slug: 'nasa-club',
      category: 'STEM',
      advisor: 'E. Addis',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'To learn more about space and study the observations and findings of NASA',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Numismatic Club',
      slug: 'numismatic-club',
      category: 'Recreation',
      advisor: 'M. Haas',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Coin Collecting',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'PRISM',
      slug: 'prism',
      category: 'Support',
      advisor: 'B. Liming',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'PRISM is a student-led organization that provides a safe and supportive environment for lesbian, gay, bisexual, and transgender (LGBT) students. All are welcome.',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'Red Cross Club',
      slug: 'red-cross-club',
      category: 'Service',
      advisor: 'S. Loftus',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'A group that provides you and your peers with opportunities to make a difference by addressing your community\'s greatest needs and developing leadership skills Instagram - @redcrosswfhs',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Relay For Life',
      slug: 'relay-for-life',
      category: 'Service',
      advisor: 'K. Ashe',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Life-changing cancer fundraising events that help communities across the globe fight back against cancer',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Robotics Club (FRC)',
      slug: 'robotics-club',
      category: 'STEM',
      advisor: 'D. Biskup, J. Neuhaus',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Students have 2 months study code, build & compete with their robotics contest',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'Science Olympiad',
      slug: 'science-olympiad',
      category: 'STEM',
      advisor: 'A. Carlisle, N. McAllister',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Science and engineering competition team',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'SEWA Club',
      slug: 'sewa-club',
      category: 'Service',
      advisor: 'S. Ewing',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'SEWA is an international organization based upon Hindu beliefs of serving your community. Their motto is "selfless service", and they implement that all around the globe.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'SkillsUSA',
      slug: 'skillsusa',
      category: 'Career',
      advisor: 'J. Crosby, L. Davis',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'A partnership with industry working together to ensure America has a skilled workforce',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'Sickle Cell Care Organization',
      slug: 'sickle-cell-care',
      category: 'Support',
      advisor: 'K. Enns',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The club will aim to engage students in raising awareness and supporting those affected by Sickle Cell disease.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'STEM-E',
      slug: 'stem-e',
      category: 'STEM',
      advisor: 'S. Englebert',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The club sparks curiosity and empowers students to solve real-world problems through science, technology, engineering, math, and entrepreneurship. We provide hands-on learning experiences that showcase STEM careers.',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: false
    },
    {
      name: 'Stock Market',
      slug: 'stock-market',
      category: 'Business',
      advisor: 'S. Englebert',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The purpose is to educate the current youth about investing in stocks and cryptocurrency',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Student Government Association',
      slug: 'student-government',
      category: 'Leadership',
      advisor: 'S. Loftus, S. Marcus, K. DiCesare',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The purpose of this organization is to support the faculty and student body of WFHS through community service, leadership development, and the promotion of school pride. Instagram: WFHS_SGA_',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: false
    },
    {
      name: 'Students For Animal Wellness Club',
      slug: 'students-for-animal-wellness',
      category: 'Service',
      advisor: 'S. Rodriguez',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'This club aims to provide students with a platform to actively engage in activities that promote responsible pet ownership, advocate for animal welfare, and contribute to the well-being of animals in our community.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Technology Student Association (TSA)',
      slug: 'tsa',
      category: 'STEM',
      advisor: 'D. Biskup, J. Neuhaus',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Developing technological literacy among young adults',
      commitment: 'High',
      eventsPerMonth: 3,
      competitive: true
    },
    {
      name: 'Vibha',
      slug: 'vibha',
      category: 'Service',
      advisor: 'M. Weber',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Non-profit organization that helps raise money to aid the underprivileged children in India.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'VT Seva',
      slug: 'vt-seva',
      category: 'Service',
      advisor: 'A. Lovewell',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'The purpose of this club is to empower youth through participation, volunteer work and philanthropic projects.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'Welcoming Wolverines',
      slug: 'welcoming-wolverines',
      category: 'Support',
      advisor: 'J. Rotunda, L. Golden',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'A group of students who help new students to Forsyth County or anyone struggling to make a connection find community',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'West Forsyth Book Club',
      slug: 'west-forsyth-book-club',
      category: 'Academic',
      advisor: 'A. Teixeira',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Our goal is to foster a sense of community among readers as well as nurture students\' fondness for reading through guiding students to share ideas and perspectives.',
      commitment: 'Low',
      eventsPerMonth: 1,
      competitive: false
    },
    {
      name: 'WFHS Boys Volleyball Club',
      slug: 'boys-volleyball-club',
      category: 'Sports',
      advisor: 'S. Ewing',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'An organization for boys to participate in organized volleyball',
      commitment: 'High',
      eventsPerMonth: 2,
      competitive: true
    },
    {
      name: 'West Student Visionaries of the Year',
      slug: 'student-visionaries',
      category: 'Service',
      advisor: 'H. Foy',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Plan fundraisers to support the Leukemia and Lymphoma Society.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'WFHS Barbell Club',
      slug: 'barbell-club',
      category: 'Sports',
      advisor: 'S. Cantrell, K. Eversole',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Designed to develop relationships with students who share a common interest in the gym.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    },
    {
      name: 'World Language Learning Club',
      slug: 'world-language-learning',
      category: 'Academic',
      advisor: 'L. McGlumphy',
      president: 'TBD',
      meetingTime: 'TBD',
      location: 'TBD',
      description: 'Form a community where students are supported in learning any language they want for personal growth and to help others.',
      commitment: 'Medium',
      eventsPerMonth: 2,
      competitive: false
    }
  ];

  const handleClubSelect = (club) => {
    if (selectedClubs.find(c => c.slug === club.slug)) {
      setSelectedClubs(selectedClubs.filter(c => c.slug !== club.slug));
    } else if (selectedClubs.length < 3) {
      setSelectedClubs([...selectedClubs, club]);
    }
    setShowDropdown(false);
    setSearchTerm('');
  };

  const handleRemoveClub = (clubSlug) => {
    setSelectedClubs(selectedClubs.filter(c => c.slug !== clubSlug));
  };

  const handleClearAll = () => {
    setSelectedClubs([]);
  };

  const filteredClubs = clubsData.filter(club =>
    !selectedClubs.find(c => c.slug === club.slug) &&
    (club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     club.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCommitmentColor = (commitment) => {
    switch (commitment) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'STEM': 'bg-blue-100 text-blue-800',
      'Academic': 'bg-purple-100 text-purple-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Recreation': 'bg-green-100 text-green-800',
      'Service': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCompetitiveIcon = (competitive) => {
    return competitive ? (
      <Trophy className="w-4 h-4 text-yellow-600" />
    ) : (
      <Users className="w-4 h-4 text-gray-400" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-50">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 h-[104px] flex items-center shadow-md text-white px-6 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="max-w-7xl mx-auto w-full text-center">
          <h1 className="text-2xl font-bold leading-tight">Club Comparison Tool</h1>
          <p className="text-sm text-blue-100 mt-1 leading-snug">
            Select up to 3 clubs to compare their features side-by-side
          </p>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Club Selector Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Clubs to Compare</h2>
          
          {/* Selected Clubs Display */}
          {selectedClubs.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Selected ({selectedClubs.length}/3)
                </span>
                <button
                  onClick={handleClearAll}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedClubs.map(club => (
                  <div
                    key={club.slug}
                    className="flex items-center bg-blue-50 border border-blue-200 rounded-full px-3 py-1"
                  >
                    <span className="text-sm font-medium text-blue-800 mr-2">{club.name}</span>
                    <button
                      onClick={() => handleRemoveClub(club.slug)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Club Search and Selection */}
          <div className="relative">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={selectedClubs.length >= 3 ? "Maximum 3 clubs selected" : "Search clubs to add..."}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                disabled={selectedClubs.length >= 3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Dropdown */}
            {showDropdown && searchTerm && filteredClubs.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredClubs.map(club => (
                  <button
                    key={club.slug}
                    onClick={() => handleClubSelect(club)}
                    className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{club.name}</div>
                        <div className="text-sm text-gray-600">{club.category}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(club.category)}`}>
                        {club.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedClubs.length >= 2 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Club Comparison</h2>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {/* Name Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">Name</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4">
                        <div className="font-semibold text-lg text-gray-900">{club.name}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Category Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">Category</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(club.category)}`}>
                          {club.category}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Advisor Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                      <User size={16} className="mr-2" />
                      Advisor
                    </td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4 text-gray-700">{club.advisor}</td>
                    ))}
                  </tr>

                  {/* President Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">President</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4 text-gray-700">{club.president}</td>
                    ))}
                  </tr>

                  {/* Meeting Time Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                      <Clock size={16} className="mr-2" />
                      Meeting Time
                    </td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4 text-gray-700">{club.meetingTime}</td>
                    ))}
                  </tr>

                  {/* Location Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                      <MapPin size={16} className="mr-2" />
                      Location
                    </td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4 text-gray-700">{club.location}</td>
                    ))}
                  </tr>

                  {/* Description Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">Description</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4 text-gray-700 text-sm">{club.description}</td>
                    ))}
                  </tr>

                  {/* Commitment Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">Commitment Level</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCommitmentColor(club.commitment)}`}>
                          {club.commitment}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Events Per Month Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">Events Per Month</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4 text-gray-700">{club.eventsPerMonth}</td>
                    ))}
                  </tr>

                  {/* Competitive Row */}
                  <tr className="border-b border-gray-100">
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">Competitive</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4">
                        <div className="flex items-center">
                          {getCompetitiveIcon(club.competitive)}
                          <span className="ml-2 text-gray-700">
                            {club.competitive ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* View Profile Row */}
                  <tr>
                    <td className="w-48 p-4 bg-gray-50 font-medium text-gray-700">View Profile</td>
                    {selectedClubs.map(club => (
                      <td key={club.slug} className="p-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Details
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {selectedClubs.map((club, index) => (
                <div key={club.slug} className="p-6 border-b border-gray-100 last:border-b-0">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(club.category)}`}>
                      {club.category}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User size={16} className="mr-3 text-gray-400" />
                      <span className="text-sm text-gray-600">Advisor:</span>
                      <span className="ml-2 text-sm font-medium">{club.advisor}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">President:</span>
                      <span className="ml-2 text-sm font-medium">{club.president}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock size={16} className="mr-3 text-gray-400" />
                      <span className="text-sm text-gray-600">Meeting:</span>
                      <span className="ml-2 text-sm font-medium">{club.meetingTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-3 text-gray-400" />
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="ml-2 text-sm font-medium">{club.location}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Description:</span>
                      <p className="mt-1 text-sm text-gray-700">{club.description}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Commitment:</span>
                      <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getCommitmentColor(club.commitment)}`}>
                        {club.commitment}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Events per month:</span>
                      <span className="ml-2 text-sm font-medium">{club.eventsPerMonth}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Competitive:</span>
                      <div className="ml-2 flex items-center">
                        {getCompetitiveIcon(club.competitive)}
                        <span className="ml-1 text-sm font-medium">
                          {club.competitive ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedClubs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Comparing Clubs</h3>
            <p className="text-gray-600">Select 2 or 3 clubs above to see a detailed comparison</p>
          </div>
        )}

        {/* Single Club Selected */}
        {selectedClubs.length === 1 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={24} className="text-yellow-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Almost There!</h3>
            <p className="text-gray-600">Select one more club to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage; 