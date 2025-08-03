import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, Menu, X, Users, ChevronRight, BarChart3, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { useAuth } from '../firebase';
import UserMenu from '../components/auth/userMenu';
import { useNavigate } from 'react-router-dom';

const ClubsWebsite = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('West Forsyth High School');
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();

  // Club data for all schools
  const allClubData = [
    {
      school: 'West Forsyth High School',
      clubs: [
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
      ],
    },
    {
      school: 'Lambert High School',
      clubs: [
        {
          id: '21st-century-leaders',
          name: '21st Century Leaders',
          description: 'Connects, transforms, and inspires high school students across Georgia to become leaders in their schools, communities, and careers through diversity, service projects, and leadership forums.',
          sponsor: 'Phinizy Spaulding',
          category: 'Leadership',
          socialMedia: {
            instagram: '@lhs21cl_club'
          },
          website: 'https://www.21stcenturyleaders.org/for-students/our-programs/leadership-connect/'
        },
        {
          id: 'agni-dance-club',
          name: 'Agni Dance Club',
          description: 'A dance team that celebrates Indian classical and contemporary styles through performance and creativity.',
          sponsor: 'n/a',
          category: 'Cultural'
        },
        {
          id: 'american-heart-association',
          name: 'American Heart Association Club',
          description: 'Promotes heart health awareness and community service through advocacy, volunteerism, and fundraising in partnership with the national American Heart Association.',
          sponsor: 'Kerry Langley',
          category: 'Service',
          socialMedia: {
            instagram: 'lambert_aha',
            groupMe: 'https://groupme.com/join_group/102434079/2ZWX3SFz'
          }
        },
        {
          id: 'art-club',
          name: 'Art Club',
          description: 'A welcoming space for students of all skill levels to explore visual arts through collaborative projects, workshops, and events.',
          sponsor: 'Ms. McSpadden',
          category: 'Arts'
        },
        {
          id: 'astronomy-club',
          name: 'Astronomy Club',
          description: 'For students curious about space and stargazing. Participate in night observations and meetings to discuss celestial events and astronomy topics.',
          sponsor: 'Phinizy Spalding',
          category: 'STEM'
        },
        {
          id: 'band',
          name: 'Band',
          description: 'Join a performance-based group including marching band, wind ensemble, and concert band. Opportunities to compete and perform throughout the school year.',
          sponsor: 'Ms. Tonya Mashburn',
          category: 'Arts'
        },
        {
          id: 'blessings-in-a-backpack',
          name: 'Blessings in a Backpack',
          description: 'Provides weekend meals to students in need in Forsyth County. Lambert’s chapter supports over 500 students through volunteer packing and fundraising.',
          sponsor: 'Ed Gray',
          category: 'Service',
          socialMedia: {
            instagram: '@lambertblessings',
            website: 'http://www.lambertblessings.com',
            email: 'lambert_bib@yahoo.com'
          }
        },
        {
          id: 'car-club',
          name: 'Car Club',
          description: 'A club for car enthusiasts to gather for shows and hands-on experience with entry-level car maintenance in a supervised workspace.',
          sponsor: 'Joshua Sullivan, Anupam Goli',
          category: 'Recreation'
        },
        {
          id: 'change-the-earth',
          name: 'Change the Earth',
          description: 'Dedicated to sustainability and environmental activism through initiatives like school garden workshops, recycling, and water quality testing.',
          sponsor: 'Mrs. Helm, Mrs. Spalding',
          category: 'Service'
        },
        {
          id: 'chinese-culture-club',
          name: 'Chinese Culture Club',
          description: 'Celebrates Chinese heritage and culture through food, traditions, and engaging student-led events. Open to all.',
          sponsor: 'Ms. Muller',
          category: 'Cultural',
          socialMedia: {
            instagram: '@Lambert.ChineseCultureCub',
            groupMe: 'https://groupme.com/join_group/95902365/YUVgp4eb',
            discord: 'https://discord.gg/KcM9jK2t'
          }
        },
      {
          id: 'chorus',
          name: 'Chorus',
          description: 'Lambert Choruses offer outstanding musical performance experiences including National Anthem appearances, honor chorus selections, and GMEA competitions.',
          sponsor: 'Mr. Wason',
          category: 'Arts',
          website: 'http://tinyurl.com/lambertchorus'
        },
        {
          id: 'color-me-blue',
          name: 'Color Me Blue',
          description: 'Supports the autistic community through art. Activities include creating artwork, hosting fundraisers, and promoting awareness through community events.',
          sponsor: 'Mrs. Cristina Wardrip',
          category: 'Service'
        },
        {
          id: 'creative-writing-and-arts',
          name: 'Creative Writing & Arts Club',
          description: 'A creative space where students can write, create art, publish their work, compete in contests, and showcase their creativity.',
          sponsor: 'n/a',
          category: 'Arts',
          website: 'https://lambertcreativewritingandart.godaddysites.com'
        },
        {
          id: 'crochet-club',
          name: 'Crochet Club',
          description: 'Builds community through crafting and service. Members crochet for causes like children’s hospitals while learning and sharing new skills.',
          sponsor: 'Abigail Jackson',
          category: 'Service'
        },
        {
          id: 'cybersecurity-club',
          name: 'Cybersecurity Club',
          description: 'Learn industry-recognized cybersecurity skills, pursue certifications like Security+, and compete in events like CyberPatriot. Great for aspiring IT professionals.',
          sponsor: 'Ms. Yunus',
          category: 'STEM',
          socialMedia: {
            instagram: '@lhscybersecurityclub',
            groupMe: 'https://groupme.com/join_group/102604260/efW52Quw',
            website: 'https://www.lhscybersecurity.com'
          }
        },
        {
          id: 'debate-team',
          name: 'Debate Team',
          description: 'A competitive team for speech and debate, including Public Forum, Lincoln Douglas, and Original Oratory. Develop research, communication, and argumentation skills.',
          sponsor: 'n/a',
          category: 'Academic',
          website: 'https://speechanddebate.org'
        },
        {
          id: 'doctors-without-borders',
          name: 'Doctors Without Borders',
          description: 'Lambert’s MSF chapter raises awareness for international health issues and connects students to global humanitarian efforts. The first high school MSF branch in Georgia.',
          sponsor: 'TBD',
          category: 'Service',
          website: 'https://www.ugamsf.org/high-school-branches'
        },
        {
          id: 'drumline',
          name: 'Drumline',
          description: 'Percussion-based performance group featuring Snares, Quads, Basses, Cymbals, and Pit. Members perform in SAPA and WGI competitions.',
          sponsor: 'Ms. Tonya Mashburn',
          category: 'Arts',
          website: 'http://lamberthsband.com'
        },
        {
          id: 'dungeons-and-dragons',
          name: 'Dungeons & Dragons',
          description: 'Explore storytelling, strategy, and fantasy role-playing in this welcoming club for beginners and experienced players alike.',
          sponsor: 'Dr. Norton, Mr. Langley',
          category: 'Recreation'
        },
        {
          id: 'economics-club',
          name: 'Economics Club',
          description: 'Builds economic literacy and competition excellence. Members compete in state and global contests, including World Economics Cup and National Economics Challenge.',
          sponsor: 'Catherine Arbeiter, John McCormick',
          category: 'Academic'
        },
        {
          id: 'family-promise',
          name: 'Family Promise Club',
          description: 'A volunteer club partnered with the national Family Promise organization to prevent and end homelessness. Students lead donation drives, awareness campaigns, and service projects.',
          sponsor: 'Jessica Yi',
          category: 'Service',
          socialMedia: {
            instagram: 'lambertfamilypromise',
            groupMe: 'https://groupme.com/join_group/71386403/ngWu554k'
          }
        },
        {
          id: 'fca',
          name: 'Fellowship of Christian Athletes (FCA)',
          description: 'An interdenominational Christian sports ministry open to all students. Join Bible studies, huddles, and community service events.',
          sponsor: 'Tara Beth Hughey, Catherine Arbeiter, Sara Shepherd, Angela Rodriguez',
          category: 'Religious'
        },
        {
          id: 'fccla',
          name: 'FCCLA (Family, Career, and Community Leaders of America)',
          description: 'National CTSO that supports students in Culinary Arts, Teaching, and Food Science. Members compete in events and serve their communities through leadership projects.',
          sponsor: 'Mrs. Barley, Chef Guerrasio, Ms. Isham',
          category: 'Career'
        },
        {
          id: 'fencing-team',
          name: 'Fencing Team',
          description: 'Train in Olympic-style fencing and compete in Georgia High School Fencing League events. Open to all experience levels.',
          sponsor: 'Ashley Gower',
          category: 'Sports'
        },
        {
          id: 'french-honor-society',
          name: 'French Honor Society',
          description: 'Celebrates and promotes the French language and culture. Membership requires academic excellence in French and participation in tutoring and events.',
          sponsor: 'Abigail Jackson',
          category: 'Academic'
        },
        {
          id: 'health-and-wellness-society',
          name: 'Health and Wellness Society',
          description: 'Promotes mental, social, and physical health through events and advocacy projects. Open to all students interested in wellbeing.',
          sponsor: 'Mrs. Potter',
          category: 'Support'
        },
        {
          id: 'human-rights-campaign',
          name: 'Human Rights Campaign',
          description: 'Student-led LGBTQ+ advocacy club promoting equality, visibility, and community support. Hosts educational, artistic, and service events.',
          sponsor: 'Joanna Spalding',
          category: 'Support'
        },
        {
          id: 'igem',
          name: 'iGEM (Synthetic Biology)',
          description: 'Lambert’s iGEM program prepares students for international synthetic biology competition. Includes lab work, bioengineering, and research presentations.',
          sponsor: 'Mrs. Janet Standeven, Dr. Brittney Cantrell, Mrs. Kate Sharer',
          category: 'STEM',
          website: 'https://igem.org'
        },
        {
          id: 'indian-classical-dance',
          name: 'Indian Classical Dance Club',
          description: 'A performance club focused on promoting classical Indian dance forms such as Bharatanatyam and Kathak. Open to all who appreciate cultural expression.',
          sponsor: 'n/a',
          category: 'Cultural'
        },
        {
          id: 'indian-cultural-society',
          name: 'Indian Cultural Society',
          description: 'Celebrates Indian culture through events like Garba and Diwali night. Members engage in service, tradition sharing, and cultural education.',
          sponsor: 'Ms. Blanc',
          category: 'Cultural',
          socialMedia: {
            instagram: '@lambert_ics',
            groupMe: 'https://groupme.com/join_group/107435771/f6yzLBmx'
          }
        },
        {
          id: 'international-club',
          name: 'International Club',
          description: 'Brings together diverse cultures within the school community. Hosts events like International Night to celebrate and educate about global traditions.',
          sponsor: 'Mrs. Dodds, Mrs. Potter',
          category: 'Cultural',
          socialMedia: {
            groupMe: 'https://groupme.com/join_group/102761005/VtvX3fLI'
          }
        },
        {
          id: 'jewish-culture-club',
          name: 'Jewish Culture Club',
          description: 'Explores Jewish heritage, holidays, and traditions through hands-on and educational activities. Open to all students.',
          sponsor: 'Rachel Smirnov',
          category: 'Cultural'
        },
        {
          id: 'journalism',
          name: 'Journalism (The Lambert Post)',
          description: 'A student journalism program focused on storytelling, truth-seeking, and multimedia reporting. Writers, editors, and creatives are welcome.',
          sponsor: 'Mrs. Ali Barlow',
          category: 'Academic',
          website: 'https://thelambertpost.com'
        },
        {
          id: 'kpop-dance-club',
          name: 'K-Pop Dance Club',
          description: 'A fun and inclusive space for K-pop fans to learn choreography and perform together. Hosts workshops and showcases.',
          sponsor: 'Jessica Wilkie',
          category: 'Cultural',
          socialMedia: {
            instagram: '@lambert.kpopdanceclub',
            linktree: 'https://linktr.ee/lambert.kpop'
          }
        },
        {
          id: 'lambert-economics-club',
          name: 'Lambert Economics Club',
          description: 'Advanced economics club focused on high-level competition and financial literacy. Competes in national and international tournaments.',
          sponsor: 'n/a',
          category: 'Academic'
        },
        {
          id: 'medlife',
          name: 'MEDLIFE',
          description: 'MEDLIFE (Medicine, Education, Development for Low-Income Families Everywhere) organizes service events and international service trips.',
          sponsor: 'Viviana Corso',
          category: 'Service',
          socialMedia: {
            instagram: '@lambert_medlife',
            groupMe: 'https://groupme.com/join_group/102356682/CO5JivKZ'
          }
        },
        {
          id: 'melodymed-club',
          name: 'MelodyMed Club',
          description: 'Combines music and service by offering music therapy experiences to support patients in healthcare settings.',
          sponsor: 'Mrs. Potter',
          category: 'Service'
        },
        {
          id: 'mu-alpha-theta',
          name: 'Mu Alpha Theta',
          description: 'National mathematics honor society promoting interest and excellence in math through service and competition.',
          sponsor: 'Mrs. Echeverria',
          category: 'Academic'
        },
        {
          id: 'musical-passport-club',
          name: 'Musical Passport Club',
          description: 'Travel the globe through music! Monthly student and guest performances highlight music from around the world.',
          sponsor: 'Julie Rosseter',
          category: 'Arts'
        },
        {
          id: 'muslim-student-association',
          name: 'Muslim Student Association',
          description: 'An inclusive club open to all students that promotes understanding of Islam and cultural dialogue.',
          sponsor: 'Mr. Tony Sims',
          category: 'Religious'
        },
      {
          id: 'national-honor-society',
          name: 'National Honor Society (NHS)',
          description: 'Recognizes students who demonstrate excellence in scholarship, leadership, service, and character. Membership by invitation based on GPA and community involvement.',
          sponsor: 'Ed Gray',
          category: 'Academic',
          socialMedia: {
            email: 'nhslambert@gmail.com'
          }
        },
        {
          id: 'physics-team',
          name: 'Physics Team',
          description: 'Competition-based academic team focused on advanced physics concepts and problem-solving. Competes in local and national events.',
          sponsor: 'Rebecca Howell',
          category: 'STEM',
          website: 'https://www.lambertphysicsteam.com'
        },
        {
          id: 'pickleball-club',
          name: 'Pickleball Club',
          description: 'Encourages fun and fitness through the fast-growing sport of pickleball. Open to players of all skill levels.',
          sponsor: 'Jordan Hill',
          category: 'Recreation'
        },
        {
          id: 'robotics-club',
          name: 'Robotics Club (FIRST Robotics)',
          description: 'Students design, build, and code industrial-sized robots for global competition. Develops leadership, teamwork, and STEM skills.',
          sponsor: 'Laura Bender, Bill Schuyler',
          category: 'STEM',
          socialMedia: {
            instagram: '@lamberthsrobotics',
            website: 'https://www.lambertrobotics.org'
          }
        },
        {
          id: 'save-a-childs-heart',
          name: 'Save A Child’s Heart',
          description: 'Raises awareness and funds for children with heart conditions globally. A PVSA-certified service club.',
          sponsor: 'Mrs. Potter',
          category: 'Service',
          socialMedia: {
            groupMe: 'https://groupme.com/join_group/95800883/GNQq8xjp'
          }
        },
        {
          id: 'science-honor-society',
          name: 'Science National Honor Society',
          description: 'Honors students with strong interest and excellence in science. Members participate in service, tutoring, and science outreach.',
          sponsor: 'Nikki Ferreira',
          category: 'Academic'
        },
        {
          id: 'short-film-club',
          name: 'Short Film Club',
          description: 'A student-run team of writers, directors, and crew members working to create original short films and learn media production.',
          sponsor: 'Woody Van Treek',
          category: 'Arts',
          socialMedia: {
            instagram: '@LonghornFilm'
          }
        },
        {
          id: 'skillsusa',
          name: 'SkillsUSA',
          description: 'Prepares students for careers in trade, technical, and skilled service occupations through competition and leadership training.',
          sponsor: 'Waheetha Banu Yunus, Ben Cook',
          category: 'Career'
        },
        {
          id: 'stem-in-space',
          name: 'STEM in Space',
          description: 'Offers students opportunities to participate in space-related STEM research and national competitions, like the NASA App Development Challenge.',
          sponsor: 'Mr. Spalding',
          category: 'STEM'
        },
        {
          id: 'student-ambassadors',
          name: 'Student Ambassador Program',
          description: 'Promotes civic leadership and engagement through voter registration, outreach, and a statewide competition hosted by the Secretary of State.',
          sponsor: 'Mrs. Lauren Watkins',
          category: 'Leadership'
        },
      {
          id: 'student-government',
          name: 'Student Government Association (SGA)',
          description: 'Organizes school-wide events to build spirit and morale among students and staff. Members are elected and serve in leadership roles across all grades.',
          sponsor: 'Jessica Page, Laura Goode, Macy Calatayud',
          category: 'Leadership'
        },
        {
          id: 'united-cancer-association',
          name: 'United Cancer Association',
          description: 'Raises awareness for all types of cancer, supports patients and healthcare workers, and organizes fundraisers and service events.',
          sponsor: 'Mrs. Wallace',
          category: 'Service',
          socialMedia: {
            instagram: '@lhsunitedcancerassociation',
            website: 'https://ucassociation.wixsite.com/united-cancer-associ',
            groupMe: 'https://groupme.com/join_group/100574430/D1dxn6rt'
          }
        },
        {
          id: 'women-in-stem',
          name: 'Women in STEM',
          description: 'Empowers young women to explore careers and opportunities in science, technology, engineering, and math through mentorship, collaboration, and innovation.',
          sponsor: 'S. Bhardwaj',
          category: 'STEM'
        },
        {
          id: 'xr-club',
          name: 'XR (Extended Reality) Club',
          description: 'Explores immersive technologies including virtual, augmented, and mixed reality. Members discuss XR trends, host demos, and network with tech leaders.',
          sponsor: 'n/a',
          category: 'STEM',
          website: 'https://lambertxr.wixsite.com/official'
        },
        {
          id: 'yearbook',
          name: 'Yearbook',
          description: 'Student editorial staff produces Lambert’s annual yearbook. Members contribute to photography, layout, editing, and publishing.',
          sponsor: 'Ms. Chelsea McClain',
          category: 'Arts'
        },
        {
          id: 'yp-stem',
          name: 'YP STEM',
          description: 'Focuses on building professional STEM experience for youth through mentorship, workshops, and project-based learning.',
          sponsor: 'Ms. Roopa Yadavalli',
          category: 'STEM'
        }      
      ],
    },
    {
      school: 'Forsyth Central High School',
      clubs: [
        {
          "id": "academic-bowl",
          "name": "Academic Bowl",
          "description": "n/a",
          "sponsor": "Cobb",
          "category": "Academic"
        },
        {
          "id": "asl-american-sign-language-club",
          "name": "ASL (American Sign Language) Club",
          "description": "n/a",
          "sponsor": "Kiser",
          "category": "Cultural"
        },
        {
          "id": "astronomy-club",
          "name": "Astronomy Club",
          "description": "n/a",
          "sponsor": "Ille",
          "category": "STEM"
        },
        {
          "id": "beta-club",
          "name": "Beta Club",
          "description": "n/a",
          "sponsor": "Dean",
          "category": "Academic"
        },
        {
          "id": "black-student-union",
          "name": "Black Student Union",
          "description": "n/a",
          "sponsor": "TBD",
          "category": "Cultural"
        },
        {
          "id": "central-ambassadors",
          "name": "Central Ambassadors",
          "description": "n/a",
          "sponsor": "Mosher",
          "category": "Leadership"
        },
        {
          "id": "chess-club",
          "name": "Chess Club",
          "description": "n/a",
          "sponsor": "Teems",
          "category": "Recreational"
        },
        {
          "id": "chinese-watercolor-club",
          "name": "Chinese Watercolor Club",
          "description": "n/a",
          "sponsor": "Butterworth",
          "category": "Arts"
        },
        {
          "id": "coding-club",
          "name": "Coding Club",
          "description": "n/a",
          "sponsor": "John",
          "category": "STEM"
        },
        {
          "id": "color-guard-winter-guard",
          "name": "Color Guard & Winter Guard",
          "description": "n/a",
          "sponsor": "Rochester",
          "category": "Arts"
        },
        {
          "id": "cricket-club",
          "name": "Cricket Club",
          "description": "n/a",
          "sponsor": "Ali",
          "category": "Recreational"
        },
        {
          "id": "crochet-club",
          "name": "Crochet Club",
          "description": "n/a",
          "sponsor": "Tisdale",
          "category": "Arts"
        },
        {
          "id": "debate-club",
          "name": "Debate Club",
          "description": "n/a",
          "sponsor": "Morrison",
          "category": "Academic"
        },
        {
          "id": "deca",
          "name": "DECA",
          "description": "n/a",
          "sponsor": "Echols",
          "category": "Business"
        },
        {
          "id": "dola",
          "name": "DOLA",
          "description": "n/a",
          "sponsor": "Morris",
          "category": "Support"
        },
        {
          "id": "dungeons-disports",
          "name": "Dungeons & Disports",
          "description": "n/a",
          "sponsor": "Shearer",
          "category": "Recreational"
        },
        {
          "id": "eco-club",
          "name": "Eco Club",
          "description": "n/a",
          "sponsor": "Fancher",
          "category": "Service"
        },
        {
          "id": "electric-vehicle-club",
          "name": "Electric Vehicle Club",
          "description": "n/a",
          "sponsor": "Willingham",
          "category": "STEM"
        },
        {
          "id": "engage-club",
          "name": "Engage Club",
          "description": "n/a",
          "sponsor": "Delk",
          "category": "Support"
        },
        {
          "id": "fbla",
          "name": "FBLA",
          "description": "n/a",
          "sponsor": "Deininger",
          "category": "Business"
        },
        {
          "id": "fccla",
          "name": "FCCLA",
          "description": "n/a",
          "sponsor": "Zaring",
          "category": "Career"
        },
        {
          "id": "fellowship-of-christian-athletes",
          "name": "Fellowship of Christian Athletes",
          "description": "n/a",
          "sponsor": "Hutchins",
          "category": "Religious"
        },
        {
          "id": "film-club",
          "name": "Film Club",
          "description": "n/a",
          "sponsor": "Harmon",
          "category": "Arts"
        },
        {
          "id": "french-club",
          "name": "French Club",
          "description": "n/a",
          "sponsor": "Clements",
          "category": "Cultural"
        },
        {
          "id": "future-healthcare-professionals",
          "name": "Future Healthcare Professionals",
          "description": "n/a",
          "sponsor": "Howard",
          "category": "Career"
        },
        {
          "id": "georgia-thespian-society",
          "name": "Georgia Thespian Society",
          "description": "n/a",
          "sponsor": "Harmon",
          "category": "Arts"
        },
        {
          "id": "girls-who-code",
          "name": "Girls Who Code",
          "description": "n/a",
          "sponsor": "Jackson",
          "category": "STEM"
        },
        {
          "id": "green-club",
          "name": "Green Club",
          "description": "n/a",
          "sponsor": "Fancher",
          "category": "Service"
        },
        {
          "id": "gsu-scholars",
          "name": "GSU Scholars",
          "description": "n/a",
          "sponsor": "Mosher",
          "category": "Academic"
        },
        {
          "id": "guitar-club",
          "name": "Guitar Club",
          "description": "n/a",
          "sponsor": "Ayers",
          "category": "Arts"
        },
        {
          "id": "hispanic-organization-promoting-education-hope",
          "name": "Hispanic Organization Promoting Education (HOPE)",
          "description": "n/a",
          "sponsor": "Rendon",
          "category": "Cultural"
        },
        {
          "id": "hosa",
          "name": "HOSA",
          "description": "n/a",
          "sponsor": "Howard",
          "category": "Career"
        },
        {
          "id": "international-club",
          "name": "International Club",
          "description": "n/a",
          "sponsor": "Rendon",
          "category": "Cultural"
        },
        {
          "id": "international-thespian-society",
          "name": "International Thespian Society",
          "description": "n/a",
          "sponsor": "Harmon",
          "category": "Arts"
        },
        {
          "id": "japanese-club",
          "name": "Japanese Club",
          "description": "n/a",
          "sponsor": "TBD",
          "category": "Cultural"
        },
        {
          "id": "k-pop-club",
          "name": "K-Pop Club",
          "description": "n/a",
          "sponsor": "Butterworth",
          "category": "Cultural"
        },
        {
          "id": "key-club",
          "name": "Key Club",
          "description": "n/a",
          "sponsor": "Parrish",
          "category": "Service"
        },
        {
          "id": "knitting-club",
          "name": "Knitting Club",
          "description": "n/a",
          "sponsor": "Tisdale",
          "category": "Arts"
        },
        {
          "id": "latinos-in-stem",
          "name": "Latinos in STEM",
          "description": "n/a",
          "sponsor": "Rendon",
          "category": "STEM"
        },
        {
          "id": "math-team",
          "name": "Math Team",
          "description": "n/a",
          "sponsor": "Weber",
          "category": "Academic"
        },
        {
          "id": "mu-alpha-theta",
          "name": "Mu Alpha Theta",
          "description": "n/a",
          "sponsor": "Weber",
          "category": "Academic"
        },
        {
          "id": "muslim-student-association",
          "name": "Muslim Student Association",
          "description": "n/a",
          "sponsor": "Rendon",
          "category": "Religious"
        },
        {
          "id": "national-art-honor-society",
          "name": "National Art Honor Society",
          "description": "n/a",
          "sponsor": "Butterworth",
          "category": "Arts"
        },
        {
          "id": "national-honor-society",
          "name": "National Honor Society",
          "description": "n/a",
          "sponsor": "Mosher",
          "category": "Academic"
        },
        {
          "id": "onramps",
          "name": "OnRamps",
          "description": "n/a",
          "sponsor": "Zaring",
          "category": "Support"
        },
        {
          "id": "open-mic-club",
          "name": "Open Mic Club",
          "description": "n/a",
          "sponsor": "TBD",
          "category": "Arts"
        },
        {
          "id": "project-life",
          "name": "Project Life",
          "description": "n/a",
          "sponsor": "Delk",
          "category": "Service"
        },
        {
          "id": "robotics-team",
          "name": "Robotics Team",
          "description": "n/a",
          "sponsor": "John",
          "category": "STEM"
        },
        {
          "id": "scholastic-bowl",
          "name": "Scholastic Bowl",
          "description": "n/a",
          "sponsor": "Mosher",
          "category": "Academic"
        },
        {
          "id": "science-club",
          "name": "Science Club",
          "description": "n/a",
          "sponsor": "Ille",
          "category": "STEM"
        },
        {
          id: "skills-usa-club",
          name: "Skills USA Club",
          description: "n/a",
          sponsor: "Hanline/Graham/Brown",
          category: "Career"
        },
        {
          id: "spanish-club",
          name: "Spanish Club",
          description: "n/a",
          sponsor: "Wallace",
          category: "Cultural"
        },
        {
          id: "special-olympics-buddies",
          name: "Special Olympics Buddies",
          description: "n/a",
          sponsor: "Bell",
          category: "Support"
        },
        {
          id: "thespians-honor-society",
          name: "Thespians Honor Society",
          description: "n/a",
          sponsor: "Neal",
          category: "Arts"
        },
        {
          id: "tri-m-music-honor-society",
          name: "Tri-M Music Honor Society",
          description: "n/a",
          sponsor: "Tucker",
          category: "Arts"
        },
        {
          id: "tsa-technology-student-association",
          name: "TSA (Technology Student Association)",
          description: "n/a",
          sponsor: "John",
          category: "STEM"
        },
        {
          id: "women-in-stem",
          name: "Women in STEM",
          description: "n/a",
          sponsor: "Hatfield",
          category: "STEM"
        },
        {
          id: "yearbook",
          name: "Yearbook",
          description: "n/a",
          sponsor: "Ware",
          category: "Arts"
        },
        {
          id: "youth-leadership",
          name: "Youth Leadership",
          description: "n/a",
          sponsor: "Smith",
          category: "Leadership"
        },
        {
          id: "zoology-club",
          name: "Zoology Club",
          description: "n/a",
          sponsor: "Brown",
          category: "STEM"
        }        
      ],
    },
    {
      school: 'Denmark High School',
      clubs: [
        {
          id: '3d-printing-club',
          name: '3D Printing Club',
          description: 'Learn how to design, model, and print 3D objects using modern tools and techniques. Open to students of all experience levels.',
          sponsor: 'Shawn Prince',
          category: 'STEM'
        },
        {
          id: 'american-sign-language-club',
          name: 'American Sign Language Club (ASL Club)',
          description: 'Promotes awareness of Deaf culture and teaches American Sign Language through interactive meetings and events.',
          sponsor: 'Mary Thigpen',
          category: 'Cultural'
        },
        {
          id: 'anime-club',
          name: 'Anime Club',
          description: 'A place for fans of anime and manga to gather, watch shows, and share Japanese culture.',
          sponsor: 'James Bush',
          category: 'Cultural'
        },
        {
          id: 'art-club',
          name: 'Art Club',
          description: 'Explore your creativity through hands-on projects and art-based community service.',
          sponsor: 'Amanda Holland',
          category: 'Arts'
        },
        {
          id: 'astronomy-club',
          name: 'Astronomy Club',
          description: 'For students interested in stargazing, astrophysics, and celestial phenomena. Includes night-sky observations and discussions.',
          sponsor: 'Shawn Prince',
          category: 'STEM'
        },
        {
          id: 'beta-club',
          name: 'Beta Club',
          description: 'Recognizes academic achievement while promoting leadership and service among students.',
          sponsor: 'Stacey Parham',
          category: 'Leadership'
        },
        {
          id: 'black-student-union',
          name: 'Black Student Union (BSU)',
          description: 'Fosters cultural identity, leadership, and unity through meaningful discussions and cultural celebrations.',
          sponsor: 'Sherise Gooding',
          category: 'Cultural'
        },
        {
          id: 'book-club',
          name: 'Book Club',
          description: 'Join fellow readers to discuss novels, share recommendations, and celebrate the joy of reading.',
          sponsor: 'Jessica Teixeira',
          category: 'Academic'
        },
        {
          id: 'broadcasting-club',
          name: 'Broadcasting Club',
          description: 'Hands-on experience in video production, reporting, and journalism for school announcements and media.',
          sponsor: 'Brian Young',
          category: 'Arts'
        },
        {
          id: 'business-club',
          name: 'Business Club',
          description: 'Explore business fundamentals, entrepreneurship, and marketing through discussions, guest speakers, and competitions.',
          sponsor: 'Laura Martin',
          category: 'Business'
        },
        {
          id: 'car-club',
          name: 'Car Club',
          description: 'Unites car enthusiasts to learn about automotive engineering, maintenance, and car culture. Open to all interested students.',
          sponsor: 'James Bush',
          category: 'Recreation'
        },
        {
          id: 'chess-club',
          name: 'Chess Club',
          description: 'For players of all levels to practice strategy, compete, and enjoy the classic game of chess.',
          sponsor: 'Piper Wilson',
          category: 'Recreation'
        },
        {
          id: 'choir',
          name: 'Choir',
          description: 'School-wide vocal performance group that participates in concerts, festivals, and community events.',
          sponsor: 'Kevin Whitley',
          category: 'Arts'
        },
        {
          id: 'computer-science-club',
          name: 'Computer Science Club',
          description: 'Explore programming, app development, and software problem-solving in a collaborative environment.',
          sponsor: 'Piper Wilson',
          category: 'STEM'
        },
        {
          id: 'crochet-club',
          name: 'Crochet Club',
          description: 'Learn and share crochet skills while making items for local charities and relaxation.',
          sponsor: 'Sarah Ewing',
          category: 'Service'
        },
        {
          id: 'cultural-dance-club',
          name: 'Cultural Dance Club',
          description: 'Celebrates dance traditions from around the world with performances and educational events.',
          sponsor: 'Leigh McGlumphy',
          category: 'Cultural'
        },
        {
          id: 'debate-team',
          name: 'Debate Team',
          description: 'Competitive speech and debate team where students develop argumentation and public speaking skills.',
          sponsor: 'Karen Troy',
          category: 'Academic'
        },
        {
          id: 'deca',
          name: 'DECA',
          description: 'A business-oriented organization that prepares students for careers in marketing, finance, hospitality, and management.',
          sponsor: 'Laura Martin',
          category: 'Business'
        },
        {
          id: 'dhs-girls-who-code',
          name: 'DHS Girls Who Code',
          description: 'Encourages girls to pursue coding and computer science through collaboration, mentorship, and project-based learning.',
          sponsor: 'Erin Foy',
          category: 'STEM'
        },
        {
          id: 'drama-club',
          name: 'Drama Club',
          description: 'Supports theatrical productions and provides opportunities for students to explore acting, tech, and directing.',
          sponsor: 'Heather Huff',
          category: 'Arts'
        },
      {
          id: 'computer-science-club',
          name: 'Computer Science Club',
          description: 'The Computer Science Club reinforces the concepts and skills needed to succeed in the digital world, focusing on programming, development, and innovation.',
          sponsor: 'Eric Arnold',
          category: 'STEM'
        },
        {
          id: 'creative-writing-club',
          name: 'Creative Writing Club',
          description: 'Denmark Creative Writing Club encourages students to express themselves through poetry, short stories, and other forms of creative writing.',
          sponsor: 'Amelia Pepper',
          category: 'Arts',
          socialMedia: {
            instagram: 'https://www.instagram.com/cwcdenmark/'
          }
        },
        {
          id: 'cricket-club',
          name: 'Cricket Club',
          description: 'Denmark High School Cricket Club gives the opportunity for students to learn and play the game of cricket while fostering teamwork and sportsmanship.',
          sponsor: 'Janelle Yearwood',
          category: 'Recreation'
        },
        {
          id: 'crochet-club',
          name: 'Crochet Club',
          description: 'The DHS Crochet Club mission is to give stress relief through creative crafting while supporting local charities with handmade items.',
          sponsor: 'Brittany Rhodes',
          category: 'Service'
        },
        {
          id: 'deca',
          name: 'DECA',
          description: 'DECA prepares emerging leaders and entrepreneurs in marketing, finance, hospitality, and management in high schools and colleges around the globe.',
          sponsor: 'Brittney Baker',
          category: 'Business'
        },
        {
          id: 'denmark-wishes',
          name: 'Denmark Wishes',
          description: 'The goal of Denmark Wishes is to provide volunteer opportunities and support for local and global wish-granting foundations.',
          sponsor: 'Billie Jatko',
          category: 'Service'
        },
        {
          id: 'dharmic-students-association',
          name: 'Dharmic Students\' Association',
          description: 'The Dharmic Students\' Association promotes awareness of Hindu, Jain, Buddhist, and Sikh cultures and values through discussion and celebration.',
          sponsor: 'Dustin Daniel',
          category: 'Cultural'
        },
        {
          id: 'doctors-without-borders',
          name: 'Doctors Without Borders',
          description: 'Doctors Without Borders is a local chapter of the international humanitarian organization that educates students about global health and medical volunteering.',
          sponsor: 'Mary Cartenuto',
          category: 'Service'
        },
        {
          id: 'environmental-preservation-club',
          name: 'Environmental Preservation Club',
          description: 'The purpose of the club is to promote safekeeping of the environment through sustainability projects, awareness campaigns, and campus initiatives.',
          sponsor: 'Billie Jatko',
          category: 'Service'
        },
        {
          id: 'equestrian-team',
          name: 'Equestrian Team',
          description: 'Students learn about horsemanship and horse shows while participating in team competitions and learning animal care.',
          sponsor: 'Tammie Hennelly and Deena Cook',
          category: 'Recreation',
          socialMedia: {
            website: 'https://prezi.com/view/fpt3aXYgRDBQ0WFf7ihy/'
          }
        },
      {
          id: 'fbla',
          name: 'FBLA (Future Business Leaders of America)',
          description: 'FBLA is a student organization with a primary focus on developing business skills, leadership, and career preparation through competitions and community involvement.',
          sponsor: 'Eric Arnold',
          category: 'Business',
          socialMedia: {
            website: 'https://denmarkhsfbla.weebly.com/'
          }
        },
        {
          id: 'fca',
          name: 'FCA (Fellowship of Christian Athletes)',
          description: 'Fellowship of Christian Athletes is an international student-led Christian club focused on faith, fellowship, and leadership through sports and mentorship.',
          sponsor: 'Dawn Brown',
          category: 'Service'
        },
        {
          id: 'fccla',
          name: 'FCCLA (Family, Career, & Community Leaders of America)',
          description: 'FCCLA promotes personal growth and leadership development through family and consumer sciences education, focusing on family, career, and community leadership.',
          sponsor: 'Patrice Mathauer',
          category: 'Leadership'
        },
        {
          id: 'finance-club',
          name: 'Finance Club',
          description: 'The Finance Club will foster members\' understanding of financial literacy, investing, and real-world money management through workshops and competitions.',
          sponsor: 'Ryan Corbett',
          category: 'Academic'
        },
        {
          id: 'first-robotics-competition-club',
          name: 'First Robotics Competition Club',
          description: 'This club provides students with hands-on experience in engineering, coding, and robotics through participation in national robotics competitions.',
          sponsor: 'Wally Moon',
          category: 'STEM'
        },
        {
          id: 'ffa',
          name: 'FFA (Future Farmers of America)',
          description: 'FFA makes a positive difference in the lives of students by developing leadership, personal growth, and career success through agricultural education.',
          sponsor: 'Donovan Hemmings',
          category: 'STEM'
        },
        {
          id: 'gaming-club',
          name: 'Gaming Club',
          description: 'The mission of Gaming Club @ DHS is to foster a community for all types of gamers while promoting social interaction and friendly competition.',
          sponsor: 'Robert Oswald',
          category: 'Recreation'
        },
        {
          id: 'geografans',
          name: 'Geografans',
          description: 'Geografans aims to spread appreciation and knowledge of geography and cultures through games, activities, and competitions.',
          sponsor: 'Lindsay Bone',
          category: 'Academic'
        },
        {
          id: 'gifts-of-grace',
          name: 'Gifts of Grace',
          description: 'Join us in making a real difference in our community through charitable giving, outreach events, and service projects with a heart of compassion.',
          sponsor: 'Cindy Cooper',
          category: 'Service'
        },
        {
          id: 'girls-who-code',
          name: 'Girls Who Code',
          description: 'Part of the national Girls Who Code organization, this club empowers female students to pursue computer science through coding, mentoring, and collaboration.',
          sponsor: 'Eric Arnold',
          category: 'STEM'
        },
      {
          id: 'habitat-for-humanity',
          name: 'Habitat for Humanity',
          description: 'This club partners with Habitat for Humanity to support local housing projects and provide students with meaningful community service opportunities.',
          sponsor: 'Gabriela Elias (co-sponsor)',
          category: 'Service'
        },
        {
          id: 'hosa',
          name: 'HOSA (Future Health Professionals)',
          description: 'HOSA is an international student organization recognized by the U.S. Department of Education that promotes career opportunities in the health industry.',
          sponsor: 'Deborah Dumphy (co-sponsor)',
          category: 'STEM'
        },
        {
          id: 'igem',
          name: 'iGEM',
          description: 'iGEM (International Genetically Engineered Machine) Club is dedicated to synthetic biology, offering students the opportunity to engage in research and competitions.',
          sponsor: 'Mary Cartenuto',
          category: 'STEM'
        },
        {
          id: 'key-club',
          name: 'Key Club',
          description: 'Key Club members around the world learn leadership through service as they build character and work to make a positive impact in their schools and communities.',
          sponsor: 'Jeannine Crowe',
          category: 'Service'
        },
        {
          id: 'link',
          name: 'LINK',
          description: 'Discover purpose and make a difference with LINK, a leadership-based club focused on peer mentorship, school involvement, and connection.',
          sponsor: 'Ryan Corbett',
          category: 'Leadership'
        },
        {
          id: 'joi-club',
          name: 'JOI Club (Junior Optimist International)',
          description: 'Junior Optimist International is a non-profit youth organization that fosters optimism and community service through student-led projects.',
          sponsor: 'Unknown',
          category: 'Service'
        },
        {
          id: 'madhatter-knits',
          name: 'MADhatter Knits',
          description: 'We are a non-profit working to support premature babies by knitting tiny hats and providing warmth and care to NICU families.',
          sponsor: 'TBD',
          category: 'Service'
        },
        {
          id: 'math-team',
          name: 'Math Team',
          description: 'The purpose of Math Team is to help students develop mathematical skills, compete in tournaments, and explore problem-solving strategies.',
          sponsor: 'Caitlyn Sloan',
          category: 'Academic'
        },
        {
          id: 'md-junior',
          name: 'MD Junior',
          description: 'MD Junior provides medical mentorship and volunteer opportunities while inspiring students to pursue health-related careers.',
          sponsor: 'Courtney Jewett',
          category: 'STEM'
        },
        {
          id: 'medical-explorers',
          name: 'Medical Explorers',
          description: 'This club\'s main objective is to offer students insight into the medical field through guest speakers, field trips, and mentorship.',
          sponsor: 'Caitlen Stovall',
          category: 'STEM'
        },
      {
          id: 'mock-trial',
          name: 'Mock Trial',
          description: 'The goal of Mock Trial is to educate high school students about the legal system and enhance public speaking, critical thinking, and analytical skills through simulated court cases.',
          sponsor: 'Jarrod Shirley',
          category: 'Academic'
        },
        {
          id: 'model-united-nations',
          name: 'Model United Nations (Model UN)',
          description: 'MUN teaches participants skills like research, public speaking, debate, and diplomacy as they simulate international committees and represent various countries.',
          sponsor: 'Marsha McPherson',
          category: 'Academic'
        },
        {
          id: 'mountain-bike-club',
          name: 'Mountain Bike Club',
          description: 'The Denmark Mountain Bike Team is open to all students and provides a fun, active way to compete and enjoy trail biking through school-sponsored events.',
          sponsor: 'Jonathon Kent',
          category: 'Athletics'
        },
        {
          id: 'muslim-student-association',
          name: 'MSA (Muslim Student Association)',
          description: 'Muslim Student Association serves as a platform for students to learn about Islam, engage in interfaith dialogue, and create a welcoming space for Muslim students.',
          sponsor: 'Ryan Corbett',
          category: 'Cultural'
        },
        {
          id: 'mu-alpha-theta',
          name: 'Mu Alpha Theta',
          description: 'Mu Alpha Theta is a national mathematics honor society that inspires students to develop strong mathematical abilities through competitions and academic activities.',
          sponsor: 'Caitlyn Sloan',
          category: 'Academic'
        },
        {
          id: 'national-art-honor-society',
          name: 'National Art Honor Society (NAHS)',
          description: 'In 1978, the National Art Education Association began NAHS to inspire and recognize students who show outstanding ability and interest in the visual arts.',
          sponsor: 'Kimmy Wood',
          category: 'Arts'
        },
        {
          id: 'national-english-honor-society',
          name: 'National English Honor Society (NEHS)',
          description: 'The purpose of this club is to celebrate the English language through reading, writing, service, and literary exploration in an honors context.',
          sponsor: 'Debbie Rager',
          category: 'Academic'
        },
        {
          id: 'national-french-honor-society',
          name: 'National French Honor Society',
          description: 'An academic society focused on the continuing study of French language and culture while promoting excellence and cultural awareness.',
          sponsor: 'Dustin Daniel',
          category: 'Cultural'
        },
        {
          id: 'national-honor-society',
          name: 'National Honor Society (NHS)',
          description: 'National Honor Society (NHS) recognizes students for academic excellence, leadership, service, and character, and promotes civic engagement.',
          sponsor: 'Clair Patterson',
          category: 'Leadership'
        },
        {
          id: 'national-technical-honor-society',
          name: 'National Technical Honor Society (NTHS)',
          description: 'The National Technical Honor Society is an educational non-profit that celebrates career and technical achievements and promotes student leadership and service.',
          sponsor: 'Donna Stohr',
          category: 'STEM'
        },
      {
          id: 'newspaper-denmark-unleashed',
          name: 'Newspaper (Denmark Unleashed)',
          description: 'Are you interested in journalism or media? Join Denmark Unleashed to write, report, and produce content that keeps the school community informed and engaged.',
          sponsor: 'Jacey Sherman',
          category: 'Academic'
        },
        {
          id: 'onestep-chapter',
          name: 'OneStep Chapter',
          description: 'OneStep is a Georgia chapter of a nonprofit organization that empowers students to make a difference through awareness, leadership, and community service.',
          sponsor: 'Unknown',
          category: 'Service'
        },
        {
          id: 'orchestra-club',
          name: 'Orchestra Club',
          description: 'The purpose of the Orchestra Club is to provide additional opportunities for string musicians to collaborate, perform, and celebrate orchestral music.',
          sponsor: 'Unknown',
          category: 'Arts'
        },
        {
          id: 'performance-dance-team',
          name: 'Performance Dance Team',
          description: 'The Denmark Performance Dance Team provides an outlet for students to express themselves through dance and build school spirit with performances at events.',
          sponsor: 'Unknown',
          category: 'Arts'
        },
        {
          id: 'physics-club',
          name: 'Physics Club',
          description: 'The purpose of Physics Club is to participate in competitions, explore physics concepts beyond the classroom, and make science fun through interactive experiments.',
          sponsor: 'John Cooper',
          category: 'STEM'
        },
        {
          id: 'psychology-club',
          name: 'Psychology Club',
          description: 'This club aims to enhance students’ knowledge of human behavior and the mind through discussions, experiments, and psychology-related activities.',
          sponsor: 'Rene White',
          category: 'Academic'
        },
        {
          id: 'science-national-honor-society',
          name: 'Science National Honor Society',
          description: 'The Science National Honor Society is made up of students with a passion for science who demonstrate academic excellence and promote scientific literacy.',
          sponsor: 'Courtney Jewett',
          category: 'STEM'
        },
        {
          id: 'sequoia-club',
          name: 'S.E.Q.U.O.I.A Club',
          description: 'The S.E.Q.U.O.I.A Club (Students Encouraging Quality, Unity, Opportunity, Integrity, and Achievement) promotes leadership, school culture, and student empowerment.',
          sponsor: 'Ryan Corbett',
          category: 'Leadership'
        },
        {
          id: 'sewa',
          name: 'SEWA',
          description: 'Help students connect with their communities by volunteering and giving back. SEWA focuses on selfless service through local and global outreach.',
          sponsor: 'John Clendenen',
          category: 'Service'
        },
        {
          id: 'sga-freshman-class',
          name: 'SGA – Freshman Class',
          description: 'Plans, organizes, and manages the activities of the freshman student body, fostering leadership, school involvement, and class unity.',
          sponsor: 'Kelsie Hand',
          category: 'Leadership'
        },
      {
          id: 'sga-junior-class',
          name: 'SGA – Junior Class',
          description: 'Plans, organizes, and manages the activities of the junior class, fostering class spirit and participation in school events.',
          sponsor: 'Laura Sweeney',
          category: 'Leadership'
        },
        {
          id: 'sga-senior-class',
          name: 'SGA – Senior Class',
          description: 'Plans, organizes, and manages the activities of the senior class including major events such as graduation and senior week.',
          sponsor: 'Erica Nelson',
          category: 'Leadership'
        },
        {
          id: 'sga-sophomore-class',
          name: 'SGA – Sophomore Class',
          description: 'Plans, organizes, and manages the activities of the sophomore class to build unity and encourage participation in school culture.',
          sponsor: 'Corrine Leeman',
          category: 'Leadership'
        },
        {
          id: 'sga-student-body',
          name: 'SGA (Entire Student Body Leaders)',
          description: 'SGA is the governing body for the development, coordination, and implementation of student activities and leadership across all grade levels.',
          sponsor: 'Jennifer Lombard',
          category: 'Leadership'
        },
        {
          id: 'smart-yogis',
          name: 'Smart Yogis',
          description: 'The purpose of Smart Yogis club is to help improve student well-being and mental health through mindfulness, yoga, and stress-relief activities.',
          sponsor: 'Andrew Robinson',
          category: 'Wellness'
        },
        {
          id: 'society-for-science',
          name: 'Society for Science',
          description: 'This club aims to inspire and support students engaged in scientific research, promoting inquiry, innovation, and participation in science fairs and competitions.',
          sponsor: 'Shelby Cochran',
          category: 'STEM'
        },
        {
          id: 'spanish-national-honor-society',
          name: 'Spanish National Honor Society',
          description: 'Spanish Honor Society (Sociedad Honoraria Hispánica) celebrates excellence in Spanish language studies and promotes Hispanic culture through service and scholarship.',
          sponsor: 'Jonathan Kent',
          category: 'Cultural'
        },
        {
          id: 'speech-debate-club',
          name: 'Speech/Debate Club',
          description: 'The purpose of the club is to enhance students’ communication, argumentation, and performance skills through speech and debate competitions.',
          sponsor: 'Mr. Mouton',
          category: 'Academic'
        },
        {
          id: 'study-smarter-not-harder',
          name: 'Study Smarter, Not Harder (SSNH)',
          description: 'The purpose of SSNH is to assist students in forming effective study habits, improving academic performance, and managing time more efficiently.',
          sponsor: 'Marci Cooper',
          category: 'Academic'
        },
        {
          id: 'tsa',
          name: 'Technology Student Association (TSA)',
          description: 'The Technology Student Association enhances personal growth, leadership, and career opportunities in STEM through technology-based competitions and activities.',
          sponsor: 'Wally Moon',
          category: 'STEM'
        },
      {
          id: 'thespian-society',
          name: 'Thespian Society',
          description: 'More info coming soon',
          sponsor: 'Kirk Grizzle',
          category: 'Arts'
        },
        {
          id: 'tri-m-music-honor-society',
          name: 'Tri-M Music Honor Society',
          description: 'More info coming soon',
          sponsor: 'Kayla Poor',
          category: 'Arts'
        },
        {
          id: 'unicef-club',
          name: 'UNICEF Club – Denmark Chapter',
          description: 'Student supporting UNICEF which was created with a focus on education, equality, and emergency relief.',
          sponsor: 'Brittany Rhodes',
          category: 'Service'
        },
        {
          id: 'unified-flag-football-club',
          name: 'Unified Flag Football Club',
          description: 'The goal of this club is to promote inclusion through sport by uniting students with and without intellectual disabilities.',
          sponsor: 'Eric Carrion',
          category: 'Athletics'
        },
        {
          id: 'vex-robotics',
          name: 'VEX Robotics',
          description: 'The purpose of this club is to show students how to apply computer science and engineering skills through robotics competitions.',
          sponsor: 'Wally Moon',
          category: 'STEM'
        },
        {
          id: 'women-in-stem',
          name: 'Women in STEM',
          description: 'The purpose of Women in STEM is to bridge the gender gap in STEM fields through mentorship and community involvement.',
          sponsor: 'Katie Praskovich',
          category: 'STEM'
        }      
      ],
    },
    {
      school: 'South Forsyth High School',
      clubs: [
        {
          id: 'academic-bowl',
          name: 'Academic Bowl',
          description: 'We compete regionally and at several state-level competitions for general trivia.',
          sponsor: 'Laura Pearce',
          category: 'Academic'
        },
        {
          id: 'chemistry-olympiad',
          name: 'Chemistry Olympiad',
          description: 'The U.S. National Chemistry Olympiad (USNCO) program is a multi-tiered chemistry competition for high school students.',
          sponsor: 'Cindy Philpot',
          category: 'STEM'
        },
        {
          id: 'creative-writing-club',
          name: 'Creative Writing Club',
          description: 'A supportive community space for students to hone the craft of creative writing, whether it\'s poetry, fiction, or screenwriting.',
          sponsor: 'Chelsey Favini',
          category: 'Arts'
        },
        {
          id: 'debate-club',
          name: 'Debate Club',
          description: 'Speech and Debate helps students grow as individuals and achieve educational goals through public speaking and structured debate.',
          sponsor: 'Michael Holmes',
          category: 'Academic'
        },
        {
          id: 'economics-club',
          name: 'Economics Club',
          description: 'Supports students interested in economic education and competition through workshops and games.',
          sponsor: 'Jason Mendez',
          category: 'Academic'
        },
        {
          id: 'french-club',
          name: 'French Club',
          description: 'Promotes the French language and Francophone culture through social and service activities.',
          sponsor: 'Jen Grobeck',
          category: 'Cultural'
        },
        {
          id: 'german-club',
          name: 'German Club',
          description: 'Provides students with fun, authentic experiences with German culture. Open to all students.',
          sponsor: 'Jonas Strecker, Steffi Legall-Riddle',
          category: 'Cultural'
        },
        {
          id: 'hsafp',
          name: 'High School Alliance of Future Physicians (HSAFP)',
          description: 'Empowers students with opportunities and resources to pursue a career in healthcare.',
          sponsor: 'Ethel Zuniga',
          category: 'STEM'
        },
        {
          id: 'mock-trial',
          name: 'Mock Trial',
          description: 'Students prepare a case and compete in courtroom simulations, including work with local law enforcement.',
          sponsor: 'Brian Fahey',
          category: 'Academic'
        },
        {
          id: 'model-un',
          name: 'Model United Nations',
          description: 'Students simulate United Nations committees by roleplaying as delegates.',
          sponsor: 'Dr. Julie Strecker',
          category: 'Academic'
        },
    {
          id: 'optimist-oratorical',
          name: 'Optimist Oratorical',
          description: 'A public speaking competition designed to help students gain self-assurance, communication skills, and compete for college scholarships.',
          sponsor: 'TBD',
          category: 'Leadership'
        },
        {
          id: 'physics-club',
          name: 'Physics Club',
          description: 'Explore fun physics problems and prepare for the national F=ma exam through monthly meetings.',
          sponsor: 'Grant Butler',
          category: 'STEM'
        },
        {
          id: 'science-olympiad',
          name: 'Science Olympiad',
          description: 'Prepares for and competes in a variety of STEM events. Tryouts held at the beginning of the school year.',
          sponsor: 'Jenny Demos & Christie Chow',
          category: 'STEM'
        },
        {
          id: 'sfhs-math-team',
          name: 'SFHS Math Team',
          description: 'Welcomes all students interested in competitive mathematics. Competitions held for both teams and individuals.',
          sponsor: 'Carrie Paulson',
          category: 'STEM'
        },
        {
          id: 'forensic-science-club',
          name: 'SFHS Forensic Science Club',
          description: 'Hands-on club exploring fingerprinting, DNA, ballistics, toxicology, and more. Includes guest speakers and mock crime scenes.',
          sponsor: 'Erin Loggins',
          category: 'STEM'
        },
        {
          id: 'gavel-club',
          name: 'SFHS Gavel Club',
          description: 'Affiliated with Toastmasters International. Develops students\' public speaking and leadership skills.',
          sponsor: 'Jesica Sloan',
          category: 'Leadership'
        },
        {
          id: 'spanish-club',
          name: 'Spanish Club',
          description: 'Open to all students. Promotes and celebrates Hispanic cultures through activities and events.',
          sponsor: 'Claudia Salamanca, Ross Ellison',
          category: 'Cultural'
        },
        {
          id: 'student-ambassadors',
          name: 'Student Ambassadors to the State House of Representative',
          description: 'Promotes Georgia Civics through opportunities to engage with the state legislative process.',
          sponsor: 'Dr. Maria Thurmond',
          category: 'Civic Engagement'
        },
        {
          id: 'wistem',
          name: 'WiSTEM (Women in STEM)',
          description: 'International club that inspires and empowers young women to pursue STEM careers.',
          sponsor: 'Kelsey Fusco',
          category: 'STEM'
        },
        {
          id: 'deca',
          name: 'DECA',
          description: 'Prepares students for careers in marketing, finance, hospitality, and management through competitive events and leadership development.',
          sponsor: 'Katie Urbanovitch, Kristy Heath',
          category: 'Business'
        },
    {
          id: 'fbla',
          name: 'FBLA (Future Business Leaders of America)',
          description: 'Prepares students to become community-minded business leaders through career preparation and leadership experiences.',
          sponsor: 'Yonk, Burlison, Zhou, Moultrie, Moody',
          category: 'Business'
        },
        {
          id: 'fccla',
          name: 'FCCLA',
          description: 'Career and technical student organization for Culinary and Teaching pathways. Offers leadership development and competitions.',
          sponsor: 'Mikki Cossin, Dawn Martin',
          category: 'CTAE'
        },
        {
          id: 'hosa',
          name: 'HOSA',
          description: 'Career and technical student organization for the BioTechnology pathway. Develops leadership and healthcare skills.',
          sponsor: 'Jennifer Clendenan, Trish Hungerbuhler, Kaylee Brower',
          category: 'Healthcare'
        },
        {
          id: 'skillsusa',
          name: 'SkillsUSA',
          description: 'Prepares students for the workforce with a focus on leadership and technical skills, especially in film and AV production.',
          sponsor: 'Vincent Saponara',
          category: 'CTAE'
        },
        {
          id: 'tsa',
          name: 'Technology Student Association (TSA)',
          description: 'Supports students in engineering and technology pathways through leadership, invention, and design projects.',
          sponsor: 'Travis Hodges',
          category: 'STEM'
        },
        {
          id: 'french-honor-society',
          name: 'French Honor Society',
          description: 'Recognizes high achievement in French and promotes cultural understanding.',
          sponsor: 'Jen Grobeck',
          category: 'Honor Society'
        },
        {
          id: 'mu-alpha-theta',
          name: 'Mu Alpha Theta',
          description: 'Math Honor Society recognizing excellence in mathematics and encouraging participation in math activities.',
          sponsor: 'Stacey Anderson',
          category: 'Honor Society'
        },
        {
          id: 'national-art-honor-society',
          name: 'National Art Honor Society',
          description: 'Recognizes artistic achievement and promotes art in the community. Open to nominated juniors and seniors.',
          sponsor: 'Sarah Rising, Sherry Allen, Joe Parson',
          category: 'Honor Society'
        },
        {
          id: 'national-english-honor-society',
          name: 'National English Honor Society',
          description: 'Honor society for juniors and seniors recognizing achievement in English.',
          sponsor: 'Daneen Daws',
          category: 'Honor Society'
        },
        {
          id: 'national-honor-society',
          name: 'National Honor Society',
          description: 'Recognizes students for outstanding academic achievement, leadership, and community service.',
          sponsor: 'Jordan White',
          category: 'Honor Society'
        },
    {
          id: 'national-latin-honor-society',
          name: 'National Latin Honor Society',
          description: 'Open to any student who made an A in Latin 1. Promotes excellence in the study of Latin.',
          sponsor: 'Eric Eben',
          category: 'Honor Society'
        },
        {
          id: 'nstem',
          name: 'National STEM Honor Society (NSTEM)',
          description: 'Recognizes students in grades 10–12 who excel in STEM subjects with a GPA of 3.5 or higher.',
          sponsor: 'Rachel Collins',
          category: 'Honor Society'
        },
        {
          id: 'nths',
          name: 'National Technical Honor Society (NTHS)',
          description: 'Honors achievement and leadership in CTAE pathways while promoting educational excellence and scholarship opportunities.',
          sponsor: 'Carla Yonk',
          category: 'Honor Society'
        },
        {
          id: 'psi-alpha',
          name: 'Psi Alpha – Psychology National Honor Society',
          description: 'Honor society for students interested in psychology. Promotes academic excellence and exploration of the field.',
          sponsor: 'Tricia Pileggi',
          category: 'Honor Society'
        },
        {
          id: 'rho-kappa',
          name: 'Rho Kappa',
          description: 'National Social Studies Honor Society that promotes civic engagement and excellence in the study of history and social sciences.',
          sponsor: 'Brad Frilot, Christin Funderburk',
          category: 'Honor Society'
        },
        {
          id: 'science-nhs',
          name: 'Science National Honor Society',
          description: 'Recognizes and promotes excellence in science through guest speakers, outreach, and community engagement.',
          sponsor: 'Cindy Philpot, Amanda Colavito',
          category: 'Honor Society'
        },
        {
          id: 'spanish-nhs',
          name: 'Spanish National Honor Society',
          description: 'Promotes the study of Spanish and Hispanic cultures. Offers extracurricular activities and national affiliation.',
          sponsor: 'Ross Ellison, Claudia Salamanca',
          category: 'Honor Society'
        },
        {
          id: 'black-student-union',
          name: 'Black Student Union',
          description: 'Promotes diversity, inclusion, and education about Black history and culture on campus.',
          sponsor: 'Melissa Audorff',
          category: 'Cultural'
        },
        {
          id: 'brain-bee-club',
          name: 'Brain Bee Club',
          description: 'Prepares students for neuroscience competitions and promotes mental health awareness through guest speakers and workshops.',
          sponsor: 'Adrian Antonini',
          category: 'STEM'
        },
        {
          id: 'book-club',
          name: 'Book Club',
          description: 'Provides students the opportunity to read and study books together in a community setting.',
          sponsor: 'Ashley Fireall',
          category: 'Literary'
        },
    {
          id: 'civic-awareness-club',
          name: 'Civic Awareness Club',
          description: 'A safe space for students to discuss civic matters and raise awareness of community engagement opportunities.',
          sponsor: 'Chelsea Favini, Jonas Strecker',
          category: 'Civic Engagement'
        },
        {
          id: 'environmental-club',
          name: 'Environmental Club',
          description: 'Promotes sustainability and environmental awareness through activities, projects, and leadership.',
          sponsor: 'Leigh Anne Donnelly, Tasha Ryles',
          category: 'Service'
        },
        {
          id: 'evosol-pediatrics',
          name: 'EvoSol Pediatrics',
          description: 'Raises awareness for pediatric healthcare issues and advocates for compassionate medical access for children.',
          sponsor: 'Kelsey Fusco',
          category: 'Healthcare'
        },
        {
          id: 'fca',
          name: 'Fellowship of Christian Athletes (FCA)',
          description: 'Provides a safe space for Christian fellowship and leadership, especially for student-athletes.',
          sponsor: 'Kelsey Fusco, Rachel Munn',
          category: 'Faith-Based'
        },
        {
          id: 'improv-club',
          name: 'Improv Club',
          description: 'Fun and inclusive club where students practice improvisational comedy and theater games.',
          sponsor: 'Grant Butler',
          category: 'Arts'
        },
        {
          id: 'indian-student-association',
          name: 'Indian Student Association (ISA)',
          description: 'Celebrates Indian culture and traditions through social and cultural gatherings.',
          sponsor: 'James Pratt',
          category: 'Cultural'
        },
        {
          id: 'just-one-africa',
          name: 'Just One Africa',
          description: 'Supports clean water initiatives for vulnerable children in Kenya through service and awareness campaigns.',
          sponsor: 'Wendy Burkus',
          category: 'Service'
        },
        {
          id: 'kpop-club',
          name: 'K-pop Club',
          description: 'Explores Korean pop culture through music, dance, and media appreciation.',
          sponsor: 'Erin Jones',
          category: 'Cultural'
        },
        {
          id: 'logic-strategy-club',
          name: 'Logic and Strategy Game Club',
          description: 'Students play and compete in logic-based games like trading card games and Rubik’s Cubes.',
          sponsor: 'CJ Ash',
          category: 'Recreational'
        },
        {
          id: 'muslim-student-association',
          name: 'Muslim Students Association (MSA)',
          description: 'Hosts social and cultural events rooted in Islamic tradition and interfaith dialogue.',
          sponsor: 'Jenna Kasmarik',
          category: 'Cultural'
        },
    {
          id: 'pride-club',
          name: 'Pride Club',
          description: 'Recognizes and supports the LGBTQ community at SFHS. Open to all students.',
          sponsor: 'Megan Mendez',
          category: 'Inclusion'
        },
        {
          id: 'sikh-student-association',
          name: 'Sikh Student Association',
          description: 'A gathering for Sikh students to connect and celebrate their shared faith and experiences.',
          sponsor: 'Chelsey Favini',
          category: 'Cultural'
        },
        {
          id: 'sewa',
          name: 'SEWA',
          description: 'Promotes selfless service and community involvement through bi-monthly service events.',
          sponsor: 'Laura Pearce',
          category: 'Service'
        },
        {
          id: 'sofo-cornhole-eagle-stars',
          name: 'SoFo Cornhole Eagle Stars',
          description: 'Inclusive cornhole club designed for students in the SI programs, supported by general ed students.',
          sponsor: 'Christine Tuttle, Francesa Higham, Sydney Littleton',
          category: 'Recreational'
        },
        {
          id: 'equestrian-team',
          name: 'South Forsyth Equestrian Team',
          description: 'Varsity-level team competing in Hunt Seat Equitation through the IEA. Practices off-campus.',
          sponsor: 'Gina Calvird',
          category: 'Athletics'
        },
        {
          id: 'southside-dance-co',
          name: 'Southside Dance Co',
          description: 'Student-choreographed dance group performing in semester showcases.',
          sponsor: 'Erin Maley',
          category: 'Arts'
        },
        {
          id: 'sports-medicine-club',
          name: 'Sports Medicine Club',
          description: 'Provides hands-on training and experience working with coaches and athletic trainers.',
          sponsor: 'Luke Wagner',
          category: 'Healthcare'
        },
        {
          id: 'student-council',
          name: 'Student Council',
          description: 'Represents the SFHS student body and promotes positivity, school spirit, and service.',
          sponsor: 'Madison Kimbrell, Anne Knight (Perry)',
          category: 'Leadership'
        },
        {
          id: 'figure-skating-club',
          name: 'War Eagle Figure Skating Club',
          description: 'Provides a space for students interested in figure skating to connect and participate.',
          sponsor: 'Emy Palermo',
          category: 'Athletics'
        },
        {
          id: 'womens-student-association',
          name: 'Women’s Student Association',
          description: 'Safe space for students to celebrate female identity and advocate for campus-wide improvement.',
          sponsor: 'Chelsea Favini, Emma Daklouche, Haley Bean',
          category: 'Leadership'
        },
     {
          id: 'alzheimers-foundation-club',
          name: 'Alzheimer’s Foundation of America Club',
          description: 'Educates students about Alzheimer’s disease and provides volunteer opportunities to support the community.',
          sponsor: 'Laura Pearce',
          category: 'Service'
        },
        {
          id: 'beta-club',
          name: 'Beta Club',
          description: 'Recognizes academic achievement and promotes character, service, and leadership.',
          sponsor: 'Megan Hart, Stephanie Lovelace',
          category: 'Honor Society'
        },
        {
          id: 'habitat-for-humanity',
          name: 'Habitat for Humanity',
          description: 'Partners with a nonprofit organization to help build and improve homes for those in need.',
          sponsor: 'Jonas Strecker',
          category: 'Service'
        },
        {
          id: 'interact-club',
          name: 'Interact Club',
          description: 'Youth branch of Rotary International focused on student-led community service projects.',
          sponsor: 'Emma Daklouche',
          category: 'Service'
        },
        {
          id: 'junior-civitan',
          name: 'Junior Civitan',
          description: 'Volunteer club dedicated to citizenship and helping people with developmental disabilities.',
          sponsor: 'John Arant',
          category: 'Service'
        },
        {
          id: 'junior-optimist',
          name: 'Junior Optimist International',
          description: 'Promotes citizenship, teamwork, and leadership through community service activities.',
          sponsor: 'Erin Jones',
          category: 'Service'
        },
        {
          id: 'madhatter-knits',
          name: 'Madhatter Knits Club',
          description: 'Knits mini beanies for premature babies in NICUs. A creative and charitable service initiative.',
          sponsor: 'Stacey Anderson',
          category: 'Service'
        },
        {
          id: 'md-junior',
          name: 'MD Junior',
          description: 'Service and learning club for students interested in any field of medicine.',
          sponsor: 'Angela Piszczek',
          category: 'Healthcare'
        },
        {
          id: 'red-cross-club',
          name: 'Red Cross Club',
          description: 'Empowers students to engage in humanitarian efforts, promote health education, and support disaster relief.',
          sponsor: 'Madison Fletcher',
          category: 'Service'
        },
        {
          id: 'sources-of-strength',
          name: 'Sources of Strength',
          description: 'Promotes resilience, mental health, and well-being using a strength-based, upstream approach.',
          sponsor: 'SFHS Counseling Department',
          category: 'Wellness'
        },
    {
          id: 'special-olympics',
          name: 'Special Olympics',
          description: 'Promotes inclusion and joy through athletic experiences for individuals with intellectual disabilities.',
          sponsor: 'John Arant',
          category: 'Service'
        },
        {
          id: 'unicef-club',
          name: 'UNICEF Club',
          description: 'Partners with UNICEF to promote children’s rights and well-being through education, advocacy, and fundraising.',
          sponsor: 'Leigh Anne Donnelly, Tasha Ryles',
          category: 'Service'
        },
        {
          id: 'vibha-club',
          name: 'Vibha Club',
          description: 'A student-led service organization focused on improving the lives of underprivileged children.',
          sponsor: 'Ethel Zuniga',
          category: 'Service'
        },
        {
          id: 'volunteers-in-action',
          name: 'Volunteers in Action (VIA)',
          description: 'Student-led service club organizing school cleanups and off-campus community service projects.',
          sponsor: 'Claudia Salamanca',
          category: 'Service'
        },
        {
          id: 'thespian-society',
          name: 'Thespian Society',
          description: 'The honors component of the theatre program. Recognizes achievement and promotes excellence in theatre.',
          sponsor: 'Joni Smithwick, Rachel Munn',
          category: 'Arts'
        },
        {
          id: 'tri-m-honor-society',
          name: 'Tri-M Music Honor Society',
          description: 'Recognizes musical and academic achievement and provides opportunities for community service through music.',
          sponsor: 'Rachel Munn',
          category: 'Honor Society'
        },
        {
          id: 'cyberpatriot-teams',
          name: 'Cyberpatriot Competition Teams',
          description: 'Students compete in national cyber defense competitions to strengthen IT and cybersecurity skills.',
          sponsor: 'Lidan Zhou',
          category: 'STEM'
        },
        {
          id: 'first-robotics',
          name: 'FIRST Robotics Competition',
          description: 'Teams design, build, and program robots to compete in real-world engineering challenges.',
          sponsor: 'John Hendy',
          category: 'STEM'
        },
        {
          id: 'girls-who-code',
          name: 'Girls Who Code',
          description: 'Fosters a sisterhood of students learning computer science and applying their skills for social good.',
          sponsor: 'Stacey Moultrie',
          category: 'STEM'
        },
        {
          id: 'machine-learning-club',
          name: 'Machine Learning Club',
          description: 'Introduces students to core concepts in machine learning through approachable virtual sessions.',
          sponsor: 'Laura Pearce',
          category: 'STEM'
        }    
      ],
    },
    {
      school: 'North Forsyth High School',
      clubs: [
        {
          id: 'mcjrotc',
          name: 'MCJROTC',
          description: 'Instills citizenship, service, and leadership in students while teaching Marine Corps history, values, and structure.',
          sponsor: 'CWO3 C.K. Villarouel, MGySgt Randy Merritt',
          category: 'Leadership'
        },
        {
          id: 'raider-team',
          name: 'Raider Team',
          description: 'Physical fitness team that competes in military-based athletic events including Cross Country Rescue, tire flips, and more.',
          sponsor: 'MCJROTC Program',
          category: 'Athletics'
        },
        {
          id: 'drill-team',
          name: 'Drill Team',
          description: 'Specializes in drill and ceremonies, competing nationally in armed/unarmed events and supporting MCJROTC ceremonies.',
          sponsor: 'MCJROTC Program',
          category: 'Leadership'
        },
        {
          id: 'color-guard',
          name: 'Color Guard',
          description: 'Presents the Nation\'s Colors at school and community events, requiring high standards of professionalism and discipline.',
          sponsor: 'Cadet Lt. Col. Hencely / MCJROTC Program',
          category: 'Leadership'
        },
        {
          id: 'rifle-team',
          name: 'Rifle Team',
          description: 'Competitive precision shooting team under GHSA. Requires morning practices and strong academic standing.',
          sponsor: 'MCJROTC Program',
          category: 'Athletics'
        },
        {
          id: 'jlab',
          name: 'JLAB',
          description: 'Academic team competing on SAT/ACT, JROTC knowledge, and current events. Cadet-led, GPA and test score eligibility required.',
          sponsor: 'MCJROTC Program',
          category: 'Academic'
        },
        {
          id: 'family-promise-club',
          name: 'Family Promise Club',
          description: 'Promotes civic engagement through volunteerism and fundraising to support families facing homelessness.',
          sponsor: 'Jessica Younghouse',
          category: 'Service'
        },
        {
          id: 'unified-raiders',
          name: 'Unified Raiders',
          description: 'Unites students with and without disabilities through participation in Special Olympic sports and peer collaboration.',
          sponsor: 'Erica Ford, Ashley Todd',
          category: 'Inclusion'
        },
        {
          id: 'y-club',
          name: 'Y-Club',
          description: 'Promotes Christian values and civic engagement. Hosts monthly meetings, service projects, and Youth Assembly conference.',
          sponsor: 'Mr. Mooney',
          category: 'Faith-Based'
        },
        {
          id: 'art-club',
          name: 'Art Club',
          description: 'Open to all students interested in visual arts. Collaborates with NAHS to work on creative projects and attend meetings.',
          sponsor: 'NFHS Art Department',
          category: 'Arts'
        },
    {
          id: 'beta-club',
          name: 'Beta Club',
          description: 'Recognizes high academic achievement, character, service, and leadership. Requires GPA minimum, good behavior, and service hours.',
          sponsor: 'Allison Elis, James Bassett, Meighan Bassett, Eli Jones',
          category: 'Honor Society'
        },
        {
          id: 'fca',
          name: 'Fellowship of Christian Athletes (FCA)',
          description: 'Open to all students. Offers praise, worship, speakers, scripture, and fellowship. Monthly morning and devotional meetings.',
          sponsor: 'Jamie Clark',
          category: 'Faith-Based'
        },
        {
          id: 'science-ambassadors',
          name: 'Science Ambassadors',
          description: 'Volunteers lead hands-on STEM activities at elementary school STEAM nights. Great for students interested in science or teaching.',
          sponsor: 'Charlotte Stevens',
          category: 'STEM'
        },
        {
          id: 'nahs',
          name: 'National Art Honor Society (NAHS)',
          description: 'Recognizes students for excellence in visual arts and promotes art in the school and community through service and leadership.',
          sponsor: 'Mrs. Fowler, Ms. Boyanton',
          category: 'Honor Society'
        },
        {
          id: 'orchestra-club',
          name: 'Orchestra Club',
          description: 'Provides a space for students who play orchestral instruments to rehearse, perform, and serve the community.',
          sponsor: 'Heather Transue',
          category: 'Arts'
        },
        {
          id: 'poetry-club',
          name: 'Poetry Club',
          description: 'Fosters poetic expression and writing skills in a supportive environment. Encourages creativity through reading and writing poetry.',
          sponsor: 'James Bassett',
          category: 'Literary'
        },    
      ],
    },
    {
      school: 'Alliance Academy for Innovation',
      clubs: [
          
    {
      id: 'biology-olympiad',
      name: 'Biology Olympiad - Science National Honor Society(SNHS)',
      description: 'No description provided.',
      sponsor: 'Tiffany Aikens',
      category: 'Academic'
    },

{
      id: 'skills-usa',
      name: 'Skills USA',
      description: 'No description provided.',
      sponsor: 'Mike Arguel',
      category: 'Career'
    },
    {
      id: 'quill--scroll',
      name: 'Quill & Scroll',
      description: 'No description provided.',
      sponsor: 'Lainey Bradley',
      category: 'Arts'
    },
    {
      id: 'ecoalliance',
      name: 'EcoAlliance',
      description: 'No description provided.',
      sponsor: 'Lainey Bradley',
      category: 'Uncategorized'
    },
    {
      id: 'national-english-honor-society',
      name: 'National English Honor Society',
      description: 'No description provided.',
      sponsor: 'Chandler Burnell',
      category: 'Uncategorized'
    },
    {
      id: 'vt-seva',
      name: 'VT Seva',
      description: 'No description provided.',
      sponsor: 'Chandler Burnell',
      category: 'Uncategorized'
    },
    {
      id: 'alliance-christian-fellowship',
      name: 'Alliance Christian Fellowship',
      description: 'No description provided.',
      sponsor: 'Jennifer Burnham',
      category: 'Religious'
    },
    {
      id: 'oratorical-contest',
      name: 'Oratorical Contest',
      description: 'No description provided.',
      sponsor: 'Candi Clark',
      category: 'Academic'
    },
    {
      id: 'forthekids',
      name: 'ForTheKids',
      description: 'No description provided.',
      sponsor: 'Candi Clark',
      category: 'Service'
    },
{
      id: 'nhs',
      name: 'NHS',
      description: 'No description provided.',
      sponsor: 'Katie Cosgrove',
      category: 'Academic'
    },
    {
      id: 'color-me-blue',
      name: 'Color me Blue',
      description: 'No description provided.',
      sponsor: 'Katie Cosgrove',
      category: 'Uncategorized'
    },
    {
      id: 'tsa',
      name: 'TSA',
      description: 'No description provided.',
      sponsor: 'Jennifer Crowder',
      category: 'STEM'
    },
    {
      id: 'vex-robotics',
      name: 'Vex Robotics',
      description: 'No description provided.',
      sponsor: 'Jennifer Crowder',
      category: 'Sports'
    },
    {
      id: 'cyber-avengers',
      name: 'Cyber Avengers',
      description: 'No description provided.',
      sponsor: 'Jennifer Crowder',
      category: 'Sports'
    },
    {
      id: 'aai-grils-who-code',
      name: 'AAI Grils Who Code',
      description: 'No description provided.',
      sponsor: 'Jennifer Crowder',
      category: 'STEM'
    },
    {
      id: 'flag-corp',
      name: 'Flag Corp',
      description: 'No description provided.',
      sponsor: 'Nick Crowder',
      category: 'Recreational'
    },
    {
      id: 'science-olympiad',
      name: 'Science Olympiad',
      description: 'No description provided.',
      sponsor: 'Brad Davis',
      category: 'STEM'
    },
    {
      id: 'physics-olympiad',
      name: 'Physics Olympiad',
      description: 'No description provided.',
      sponsor: 'Brad Davis',
      category: 'STEM'
    },
      ],
    },
    {
      school: 'East Forsyth High School',
      clubs: [
        {
          id: 'asl-club',
          name: 'American Sign Language Club',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Cultural'
        },
        {
          id: 'art-club',
          name: 'Art Club',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Arts'
        },
        {
          id: 'beta-club',
          name: 'Beta Club',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Leadership'
        },
        {
          id: 'chess-club',
          name: 'Chess',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Recreation'
        },
        {
          id: 'color-guard',
          name: 'Color Guard',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Arts'
        },
        {
          id: 'debate-team',
          name: 'Debate Team',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Academic'
        },
        {
          id: 'esports',
          name: 'ESports',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'STEM'
        },
        {
          id: 'fca',
          name: 'Fellowship of Christian Athletes',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Religious'
        },
        {
          id: 'gsa',
          name: 'Gay Straight Alliance',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Support'
        },
        {
          id: 'international-club',
          name: 'International Club',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Cultural'
        },
        {
          id: 'latinos-at-east',
          name: 'Latinos at East',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Cultural'
        },
        {
          id: 'literary-team',
          name: 'Literary Team',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Academic'
        },
        {
          id: 'math-team',
          name: 'Math Team',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Academic'
        },
        {
          id: 'mock-trial',
          name: 'Mock Trial',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Academic'
        },
        {
          id: 'naacp',
          name: 'NAACP',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Cultural'
        },
        {
          id: 'robotics-club',
          name: 'Robotics Club',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'STEM'
        },
        {
          id: 'science-ambassadors',
          name: 'Science Ambassadors',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'STEM'
        },
        {
          id: 'science-olympiad',
          name: 'Science Olympiad',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'STEM'
        },
        {
          id: 'student-council',
          name: 'Student Council',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Leadership'
        },
        {
          id: 'deca',
          name: 'DECA',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Business'
        },
        {
          id: 'fbla',
          name: 'FBLA',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Business'
        },
        {
          id: 'skillsusa',
          name: 'SkillsUSA',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Career'
        },
        {
          id: 'tsa',
          name: 'Technology Student Association',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'STEM'
        },
        {
          id: 'fccla',
          name: 'FCCLA',
          description: 'n/a',
          sponsor: 'n/a',
          category: 'Career'
        }      
      ],
    }
  ]
  // Available schools
  const availableSchools = allClubData.map(school => school.school);
  // Filter clubs by selected school
  const filteredClubsData = useMemo(() => {
    const schoolData = allClubData.find(school => school.school === selectedSchool);
    return schoolData ? schoolData.clubs : [];
  }, [selectedSchool]);

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

  // Add handler for Calendar button
  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const { clubsByCategory, filteredClubs } = useClubFilter(filteredClubsData, searchTerm);
  const selectedClubData = filteredClubsData.find(club => club.id === selectedClub);

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

  // Rename the local CategoryGrid to avoid conflict
  const LocalCategoryGrid = ({ categories, categoryColors, clubsByCategory, onCategorySelect }) => (
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
            {/* Calendar Button */}
            <button
              onClick={handleCalendarClick}
              className="flex items-center px-3 py-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 hover:shadow-lg transition-all duration-300 text-sm font-medium text-black"
            >
              <CalendarIcon size={18} className="mr-1" /> Calendar
            </button>
            {/* School Selector Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setDropdownPosition({
                    top: rect.bottom + 8,
                    left: rect.left
                  });
                  setSchoolDropdownOpen(!schoolDropdownOpen);
                }}
                className="flex items-center px-3 py-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 hover:shadow-lg transition-all duration-300 text-sm font-medium text-black"
              >
                <span className="mr-2">{selectedSchool}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${schoolDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {schoolDropdownOpen && createPortal(
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div 
                    className="fixed inset-0 z-[9998]" 
                    onClick={() => setSchoolDropdownOpen(false)}
                  />
                  <div 
                    className="fixed w-64 bg-white border-2 border-black rounded-lg shadow-xl z-[9999]"
                    style={{
                      top: `${dropdownPosition.top}px`,
                      left: `${dropdownPosition.left}px`
                    }}
                  >
                    {availableSchools.map(school => (
                      <button
                        key={school}
                        onClick={() => {
                          setSelectedSchool(school);
                          setSchoolDropdownOpen(false);
                          setSelectedCategory(null);
                          setSelectedClub(null);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                          selectedSchool === school ? 'bg-blue-50 text-blue-800' : ''
                        }`}
                      >
                        {school}
                      </button>
                    ))}
                  </div>
                </>,
                document.body
              )}
            </div>
          </div>
          
          {/* Center - Title */}
          <div className="flex-1 text-center relative z-10 px-4">
            <button
              onClick={handleHomeClick}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <h1 className="text-2xl font-bold leading-tight text-yellow-800 drop-shadow-sm">The Club Network @ {selectedSchool.split(' ')[0]}</h1>
              <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                <p className="text-sm font-medium mt-1 leading-snug">
                  Explore clubs and organizations at {selectedSchool}
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
              <LocalCategoryGrid 
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
              {/* Category club grid rendering - fix fallback rendering */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(filteredClubs[selectedCategory]) && filteredClubs[selectedCategory].length > 0 ? (
                  filteredClubs[selectedCategory].map(club => (
                    <ClubCard
                      key={club.id}
                      club={club}
                      categoryColors={CategoryColors}
                      onClick={() => setSelectedClub(club.id)}
                    />
                  ))
                ) : (
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
};

export default ClubsWebsite;