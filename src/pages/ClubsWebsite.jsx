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

  // Club data for all schools - PASTE YOUR DATA HERE
  const allClubData = [
    {
    school: 'East Forsyth High School',
    clubs: [
      {
        id: 'asl-club',
        name: 'American Sign Language Club',
        description: 'A student group that teaches and practices American Sign Language and Deaf culture. Members learn conversational signs, fingerspelling, and basic interpreting skills; host awareness events for the school community; and coordinate volunteer opportunities with local Deaf/Hard-of-Hearing organizations. The club also supports students interested in the National ASL Honor Society and sometimes partners with language classes for joint events.',
        sponsor: 'Not listed on EFHS site (club page available) — contact EFHS Clubs/Staff Directory for advisor',
        category: 'Cultural',
        meetingFrequency: 'Weekly',
        meetingDay: 'Fridays at lunch (approx. 12:30–1:00pm) — (placeholder; check Remind/club page)',
        requirements: 'Open to all students; no prior ASL experience required',
        activities: ['Beginner & intermediate sign lessons', 'Deaf culture workshops', 'Guest speakers / interpreters', 'Community outreach and volunteering', 'Preparation for National ASL Honor Society membership'],
        commitment: 'Low–Medium — weekly practice plus occasional weekend outreach events',
        benefits: ['Basic ASL fluency', 'Cultural competency', 'Volunteer/service opportunities', 'Resume/college activity']
      },
      {
        id: 'art-club',
        name: 'Art Club',
        description: 'Informal studio club for students who enjoy drawing, painting, and mixed media. Students work on personal projects, build portfolios, collaborate on campus murals and decorations, and prepare pieces for local shows and the school art exhibition.',
        sponsor: 'Aimee Seaney (visual arts teacher / Fine Arts contact on EFHS site)',
        category: 'Arts',
        meetingFrequency: 'Weekly',
        meetingDay: 'Tuesdays after school, 3:30–4:45pm (typical placeholder; confirm with sponsor)',
        requirements: 'Open to all students; bring own materials or request school supplies for projects',
        activities: ['Open-studio time', 'Portfolio prep', 'Murals and campus art projects', 'Field trips to local galleries', 'Art contests and shows'],
        commitment: 'Low–Medium — flexible weekly meetings, extra time for shows or murals',
        benefits: ['Portfolio development', 'Creative community', 'College application support', 'Collaborative project experience']
      },
      {
        id: 'beta-club',
        name: 'Beta Club',
        description: 'Chapter of the National Beta Club recognizing academic achievement and promoting leadership and service. Members participate in service projects, leadership opportunities, and an induction ceremony; the club focuses on character, leadership, and academics.',
        sponsor: 'Laura Englebert & Paula Zaimis (contacts listed on the EFHS Beta Club page).',
        category: 'Leadership',
        meetingFrequency: 'Monthly (with additional service-project meetings as needed)',
        meetingDay: 'TBD — meeting announcements made via Remind/Canvas (per EFHS Beta page).',
        requirements: 'Open to grades 10–12 who maintain a minimum GPA of 3.5 (per EFHS Beta Club page).',
        activities: ['Community & school service projects', 'Induction ceremony for new members', 'Fundraisers', 'Leadership workshops', 'Recordkeeping of service hours via Canvas/Remind'],
        commitment: 'Medium — monthly meetings plus required service hours and participation in induction/fundraising',
        benefits: ['Leadership development', 'Community service hours', 'Honor recognition for transcripts', 'Scholarship/college resume advantage']
      },
      {
        id: 'chess-club',
        name: 'Chess',
        description: 'Casual and competitive chess club where members of all skill levels learn strategy, play friendly matches, and prepare for local scholastic tournaments.',
        sponsor: 'Not listed on EFHS site — contact EFHS Clubs/Staff Directory for advisor',
        category: 'Recreational',
        meetingFrequency: 'Weekly',
        meetingDay: 'Wednesdays after school, 3:30–4:30pm (placeholder)',
        requirements: 'Open to all students; no experience required',
        activities: ['Club matches', 'Tactics & strategy workshops', 'Inter-school tournaments', 'Puzzle/problem-solving sessions'],
        commitment: 'Low — attend as able; tournament players may practice more frequently',
        benefits: ['Critical thinking', 'Concentration', 'Competitive experience', 'Community']
      },
      {
        id: 'color-guard',
        name: 'Color Guard',
        description: 'Performance ensemble that performs with the marching band for halftime shows and competes in winterguard events. Members rehearse choreography with flags, rifles, and sabres; learn marching/visual techniques; and travel for competitions and football games.',
        sponsor: 'Rachael Bearden (Color Guard director listed on EFHS Band/Fine Arts staff information).',
        category: 'Arts',
        meetingFrequency: 'Weekly — daily/extended rehearsals during marching/winterguard season',
        meetingDay: 'Tuesdays & Thursdays 4:00–6:00pm; extra rehearsals and weekend competitions in season (placeholder—confirm with director)',
        requirements: 'Auditions required (yearly); students must attend rehearsals and performances',
        activities: ['Choreography & equipment work', 'Drill rehearsals with band', 'Winterguard competitions', 'Game-day performances', 'Fitness & conditioning'],
        commitment: 'High — regular rehearsals, performances at games, and competition travel during season',
        benefits: ['Performance experience', 'Teamwork', 'Physical fitness', 'Competition & travel']
      },
      {
        id: 'debate-team',
        name: 'Debate Team',
        description: 'Competitive speech & debate team that prepares students for local and state debate tournaments. Training covers argumentation, research skills, public speaking, and tournament strategy.',
        sponsor: 'Not listed on EFHS site — contact EFHS Clubs/Staff Directory for advisor',
        category: 'Academic',
        meetingFrequency: 'Weekly',
        meetingDay: 'Mondays 3:30–5:00pm (realistic placeholder; tournament schedules vary)',
        requirements: 'Open to interested students; tryouts may be used to select tournament teams',
        activities: ['Round practice', 'Case-writing workshops', 'Mock debates', 'Tournament travel', 'Speech & interp coaching'],
        commitment: 'High — weekly practices plus weekend tournaments during season',
        benefits: ['Public speaking', 'Research & critical thinking', 'College-ready skills', 'Competitive recognition']
      },
      {
        id: 'esports',
        name: 'ESports',
        description: 'Student-run esports club that organizes varsity and club-level gaming teams for common competitive titles. Members practice strategy, scrimmage other schools, and learn streaming/production basics.',
        sponsor: 'Not listed on EFHS site — contact EFHS Clubs/Staff Directory for advisor',
        category: 'STEM',
        meetingFrequency: 'Weekly',
        meetingDay: 'Fridays 3:30–5:30pm (placeholder — online scrimmages may occur evenings/weekends)',
        requirements: 'Sign-up form and parent permission; game account(s) as required by team',
        activities: ['Team practices', 'Online scrimmages & ladder matches', 'League/tournament participation', 'Streaming and production workshops'],
        commitment: 'Medium — regular practice and evening/weekend matches for competitive rosters',
        benefits: ['Teamwork', 'Strategic thinking', 'Potential scholarship/competitive opportunities', 'Technical skills (streaming, team ops)']
      },
      {
        id: 'fca',
        name: 'Fellowship of Christian Athletes',
        description: 'Faith-based student club that brings together athletes and non-athletes for Bible study, fellowship, and community service. Meetings often include speakers, testimonies, and service projects focused on local needs.',
        sponsor: 'Not listed on EFHS site — often sponsored by a staff member and local FCA volunteer (contact EFHS for current advisor)',
        category: 'Religious',
        meetingFrequency: 'Weekly',
        meetingDay: 'Wednesdays before school (7:30–8:00am) or lunch meetings (placeholder)',
        requirements: 'Open to all students',
        activities: ['Bible study groups', 'Team devotionals', 'Service projects', 'Guest speakers and athlete mentors'],
        commitment: 'Low — optional weekly fellowship with occasional service events',
        benefits: ['Peer support', 'Spiritual growth', 'Community service opportunities']
      },
      {
        id: 'gsa',
        name: 'Gay Straight Alliance',
        description: 'Supportive student group focused on providing a safe, inclusive space for LGBTQ+ students and allies. Activities include discussion groups, advocacy, awareness events, and ally training.',
        sponsor: 'Not listed on EFHS site — contact EFHS Clubs/Staff Directory for current advisor',
        category: 'Support',
        meetingFrequency: 'Biweekly',
        meetingDay: 'Thursdays at lunch (placeholder)',
        requirements: 'Open to all students; confidentiality and respectful behavior expected',
        activities: ['Support circles', 'Awareness campaigns', 'Ally training', 'Planning for Pride/awareness events'],
        commitment: 'Low — drop-in support with occasional event planning',
        benefits: ['Peer support', 'Safe space', 'Advocacy experience', 'Leadership opportunities']
      },
      {
        id: 'international-club',
        name: 'International Club',
        description: 'Celebrates global cultures through student-led presentations, food nights, and language exchanges. The club promotes cultural awareness, global citizenship, and international friendships.',
        sponsor: 'Not listed on EFHS site — likely a world language or social studies teacher (contact EFHS for advisor)',
        category: 'Cultural',
        meetingFrequency: 'Monthly',
        meetingDay: 'Third Wednesday at lunch (placeholder)',
        requirements: 'Open to all students',
        activities: ['Cultural showcases', 'International food nights', 'Language practice sessions', 'Collaborations with world language classes'],
        commitment: 'Low — monthly involvement with extra work for events',
        benefits: ['Cultural competency', 'Networking with international students', 'Event planning experience']
      },
      {
        id: 'latinos-at-east',
        name: 'Latinos at East',
        description: 'Student organization that supports Latino/Hispanic students and promotes cultural events, mentorship, and academic support. The club hosts celebrations, tutoring sessions, and community outreach projects.',
        sponsor: 'Not listed on EFHS site — contact EFHS for advisor name',
        category: 'Cultural',
        meetingFrequency: 'Monthly',
        meetingDay: 'Wednesdays after school 4:00–5:00pm (placeholder)',
        requirements: 'Open to all students; targeted outreach to Latino/Hispanic community',
        activities: ['Cultural events', 'Peer tutoring', 'Family/community outreach', 'College & scholarship information sessions'],
        commitment: 'Low–Medium — monthly meetings with added event planning',
        benefits: ['Cultural affirmation', 'Academic support', 'Community connections', 'Leadership roles']
      },
      {
        id: 'literary-team',
        name: 'Literary Team',
        description: 'Group for student writers who compete in literary contests and produce the school literary magazine. Activities include writing workshops, critique sessions, and submissions to regional competitions.',
        sponsor: 'Not listed on EFHS site — often an English teacher (contact EFHS for advisor)',
        category: 'Academic',
        meetingFrequency: 'Weekly',
        meetingDay: 'Thursdays after school 3:30–4:30pm (placeholder)',
        requirements: 'Open to writers; tryouts or submission-based selection for competitive squads',
        activities: ['Writing workshops', 'Peer critique', 'Magazine publishing', 'Entry into writing contests'],
        commitment: 'Medium — weekly workshops and deadlines for submissions',
        benefits: ['Improved writing', 'Publication credits', 'Critical feedback', 'Contest awards']
      },
      {
        id: 'math-team',
        name: 'Math Team',
        description: 'Competitive math team preparing for contests (AMC, regional contests). Members practice advanced problem-solving, team rounds, and attend competitions representing EFHS.',
        sponsor: 'Not listed on EFHS site — contact EFHS Math Department/Staff Directory for advisor',
        category: 'Academic',
        meetingFrequency: 'Weekly',
        meetingDay: 'Tuesdays 3:30–4:30pm (placeholder)',
        requirements: 'Open to students with interest in math; tryouts for varsity/competitive teams may occur',
        activities: ['Problem-solving practice', 'Mock contests', 'AMC/AIME/MathCounts preparation', 'Regional competitions'],
        commitment: 'Medium–High — weekly practice plus weekend competitions for competitive members',
        benefits: ['Advanced problem-solving', 'College application strength', 'Scholarship & contest opportunities']
      },
      {
        id: 'mock-trial',
        name: 'Mock Trial',
        description: 'Hands-on legal simulation team where students role-play attorneys and witnesses to prepare cases and compete in regional/state mock trial competitions. Students learn courtroom procedure, case-building, and public speaking.',
        sponsor: 'Not listed on EFHS site — contact EFHS for current advisor',
        category: 'Academic',
        meetingFrequency: 'Weekly',
        meetingDay: 'Wednesdays 3:30–5:30pm (placeholder; more frequent closer to competitions)',
        requirements: 'Tryouts typically required for competitive team roles; open to learners for practice positions',
        activities: ['Case prep & witness coaching', 'Mock courtroom practice', 'Regional competitions', 'Guest attorney Q&A'],
        commitment: 'High — heavy prep and weekend competitions',
        benefits: ['Legal knowledge', 'Public speaking', 'Teamwork', 'College resume enhancement']
      },
      {
        id: 'naacp',
        name: 'NAACP',
        description: 'Student chapter that focuses on civil rights education, advocacy, and community service. The club organizes awareness events, voter education (when age-appropriate), and local partnerships.',
        sponsor: 'Not listed on EFHS site — contact EFHS for advisor',
        category: 'Cultural',
        meetingFrequency: 'Monthly',
        meetingDay: 'First Monday at lunch (placeholder)',
        requirements: 'Open to all students',
        activities: ['Educational events', 'Community service', 'Discussion forums', 'Partnerships with local NAACP chapter'],
        commitment: 'Low–Medium — monthly meetings plus project work',
        benefits: ['Civic engagement', 'Leadership development', 'Community connections']
      },
      {
        id: 'robotics-club',
        name: 'Robotics Club',
        description: 'Build-and-compete club for students interested in robotics and engineering (VEX/FTC/FRC-style activities). Members design, build, program robots, troubleshoot systems, and prepare for regional competitions.',
        sponsor: 'Not listed on EFHS site — contact EFHS Clubs/Staff Directory for advisor',
        category: 'STEM',
        meetingFrequency: 'Weekly (more frequent during build season)',
        meetingDay: 'Tuesdays & Thursdays 3:30–5:30pm (placeholder)',
        requirements: 'Open to students interested in design, engineering, or programming; safety training required; sign-up recommended',
        activities: ['Robot design & build', 'Programming sessions', 'Competition strategy', 'Outreach/demos at feeder schools'],
        commitment: 'High — regular after-school build time and weekend competitions',
        benefits: ['Engineering & programming experience', 'Team problem-solving', 'STEM competition exposure', 'College/career prep']
      },
      {
        id: 'science-ambassadors',
        name: 'Science Ambassadors',
        description: 'Student outreach group that runs science demos, tutoring sessions, and campus STEM outreach. Members help at science nights, mentor younger students, and promote STEM in the community.',
        sponsor: 'Not listed on EFHS site — contact EFHS Science Department for advisor',
        category: 'STEM',
        meetingFrequency: 'Monthly',
        meetingDay: 'Second Tuesday at lunch (placeholder)',
        requirements: 'Interest in STEM and outreach; attendance at outreach events expected',
        activities: ['Hands-on demos', 'Science fair mentorship', 'Middle-school outreach', 'STEM tutoring'],
        commitment: 'Medium — monthly meetings plus event participation',
        benefits: ['Communication skills', 'STEM outreach experience', 'Volunteer hours', 'Leadership opportunities']
      },
      {
        id: 'science-olympiad',
        name: 'Science Olympiad',
        description: 'Competitive STEM team preparing for Science Olympiad events across disciplines (biology, chemistry, engineering, etc.). Students specialize in events, perform lab/build tasks, and compete regionally/statewide.',
        sponsor: 'Not listed on EFHS site — contact EFHS Science Department for advisor',
        category: 'STEM',
        meetingFrequency: 'Weekly',
        meetingDay: 'Mondays 3:30–5:00pm (placeholder)',
        requirements: 'Open to students interested in STEM; tryouts/selection for certain events possible',
        activities: ['Event-specific practice', 'Lab work', 'Engineering builds', 'Regional/state competitions'],
        commitment: 'High — frequent practices and competition travel',
        benefits: ['Deep STEM knowledge', 'Competition experience', 'Teamwork', 'College prep']
      },
      {
        id: 'student-council',
        name: 'Student Council',
        description: 'Representative student government responsible for planning school events, fundraisers, and serving as a student voice in school decisions. Officers and class representatives organize dances, spirit weeks, and community service.',
        sponsor: 'Not listed on EFHS site — check EFHS Student Services / Staff Directory for current advisor',
        category: 'Leadership',
        meetingFrequency: 'Weekly',
        meetingDay: 'Fridays after school 3:30–4:30pm (placeholder)',
        requirements: 'Elected positions for officers; grade-level representatives may be selected or elected',
        activities: ['Event planning (dances, spirit week)', 'Fundraising', 'Leadership training', 'Liaison with administration'],
        commitment: 'Medium–High — weekly meetings and event duties (peak work around major events)',
        benefits: ['Leadership experience', 'Event management', 'Community engagement', 'Resume/college references']
      },
      {
        id: 'deca',
        name: 'DECA',
        description: 'Career and technical student organization that prepares emerging leaders and entrepreneurs in marketing, finance, hospitality, and management. The chapter runs competitive events, fundraising, and industry partnerships.',
        sponsor: 'MacKenzie Dye (contact listed on EFHS DECA page).',
        category: 'Business',
        meetingFrequency: 'Weekly',
        meetingDay: 'Tuesdays after school (typical placeholder; chapter announces schedule via school store/Remind).',
        requirements: 'Membership tiers and dues (EFHS lists Gold/Silver/Bronze membership options and associated fees).',
        activities: ['Competitive case and role-play preparation', 'Conferences & state/national competitions', 'Fundraising', 'Business partner events'],
        commitment: 'Medium–High — regular meetings plus conference travel for competitive members',
        benefits: ['Business & leadership skills', 'Networking', 'Scholarship & career pathways', 'Competitive recognition']
      },
      {
        id: 'fbla',
        name: 'FBLA',
        description: 'Future Business Leaders of America chapter that provides business education, competitive events, and leadership training for students interested in business careers.',
        sponsor: 'Not listed on EFHS site — contact EFHS Career & Technical Education (CTE) / Staff Directory',
        category: 'Business',
        meetingFrequency: 'Weekly',
        meetingDay: 'Wednesdays after school 3:30–4:30pm (placeholder)',
        requirements: 'Student membership registration (state/national FBLA dues may apply)',
        activities: ['Competition prep (entrepreneurship, finance, marketing)', 'Workshops', 'Community business partnerships', 'Fundraising'],
        commitment: 'Medium — weekly meetings and competitions/conferences',
        benefits: ['Business skills', 'Resume/portfolio items', 'Scholarship opportunities', 'Networking']
      },
      {
        id: 'skillsusa',
        name: 'SkillsUSA',
        description: 'Career/technical student organization focused on skilled trades and leadership. Members compete in hands-on contests, attend leadership conferences, and gain workplace-ready skills.',
        sponsor: 'Not listed on EFHS site — typically a CTE instructor (contact EFHS CTE for advisor)',
        category: 'Career',
        meetingFrequency: 'Monthly',
        meetingDay: 'Varies (workshop evenings and event days; placeholder)',
        requirements: 'Often aligned with CTE course enrollment; membership may require dues',
        activities: ['Skills competitions', 'Hands-on workshops', 'Industry visits', 'Leadership development'],
        commitment: 'Medium — project-based with occasional weekend competitions',
        benefits: ['Trade skills', 'Certifications/workplace readiness', 'Competition exposure', 'Career networking']
      },
      {
        id: 'tsa',
        name: 'Technology Student Association',
        description: 'STEM organization for students interested in engineering, design, and technology. Members build projects, enter competitive events, and develop engineering/design documentation skills.',
        sponsor: 'Not listed on EFHS site — contact EFHS CTE or Computer Science department for advisor',
        category: 'STEM',
        meetingFrequency: 'Weekly',
        meetingDay: 'Thursdays 3:30–5:00pm (placeholder)',
        requirements: 'Membership registration for TSA competitions; open to students interested in STEM/engineering',
        activities: ['Design & build projects', 'Documenting engineering processes', 'Regional & state competitions', 'Workshops'],
        commitment: 'Medium–High — weekly build/practice time plus competitions',
        benefits: ['Engineering design experience', 'Competition credits', 'Teamwork & documentation skills']
      },
      {
        id: 'fccla',
        name: 'FCCLA',
        description: 'Family, Career and Community Leaders of America — a student organization connected to Family & Consumer Sciences. FCCLA focuses on leadership, career preparation, and family/community programming.',
        sponsor: 'Not listed on EFHS site — contact EFHS Family & Consumer Sciences department for advisor',
        category: 'Career',
        meetingFrequency: 'Weekly',
        meetingDay: 'Wednesdays during lunch or after school (placeholder)',
        requirements: 'Membership registration (often open to students enrolled in related courses)',
        activities: ['Leadership projects', 'Community service', 'Culinary/CTE events', 'Competitive STAR events'],
        commitment: 'Medium — meetings plus event/project work',
        benefits: ['Career skills', 'Leadership development', 'Competitive opportunities', 'Community service']
      }
]
},
{
  school: 'West Forsyth High School',
  clubs: [
    {
      id: 'academic-bowl',
      name: 'Academic Bowl',
      description: 'Competitive team that prepares for local and state quiz bowl / academic competitions in categories such as history, science, literature, and math.',
      sponsor: 'J. Bush',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all students; tryout for competitive team members',
      activities: ['Practice matches', 'Study nights', 'Regional tournaments', 'Question-writing workshops'],
      commitment: 'Medium - weekly practices + occasional Saturday tournaments',
      benefits: ['Critical thinking', 'Teamwork', 'College application boost', 'Scholarship eligibility']
    },
    {
      id: 'anime-club',
      name: 'Anime Club',
      description: 'A social club for fans of anime, manga, and Japanese pop culture. Activities include viewings, discussions, and event planning.',
      sponsor: 'T. Porch',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Anime screenings', 'Manga swaps', 'Cosplay prep', 'Cultural discussions'],
      commitment: 'Low - casual attendance encouraged',
      benefits: ['Community', 'Cultural exposure', 'Creative expression']
    },
    {
      id: 'art-club',
      name: 'Art Club',
      description: 'A space for students to explore visual arts, collaborate on projects, and organize community art service projects and school exhibitions.',
      sponsor: 'A. Henke, A. Holland',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all skill levels',
      activities: ['Portfolio development', 'Community murals', 'Gallery visits', 'Art shows'],
      commitment: 'Medium',
      benefits: ['Portfolio pieces', 'Skill improvement', 'Leadership through project leads']
    },
    {
      id: 'asian-culture-club',
      name: 'Asian Culture Club',
      description: 'Celebrates and shares the diversity of Asian cultures through food, performances, cultural workshops, and education.',
      sponsor: 'S. Carder',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday of month',
      requirements: 'Open to all',
      activities: ['Cultural nights', 'Cooking demos', 'Language activities', 'Cultural heritage events'],
      commitment: 'Low to Medium',
      benefits: ['Cultural literacy', 'Community building', 'Event planning experience']
    },
    {
      id: 'beta-club',
      name: 'BETA Club',
      description: 'Honors and service organization that promotes leadership, character, and community service among high-achieving students.',
      sponsor: 'A. Carlisle, K. Ashe',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday of month',
      requirements: 'GPA minimum (typ. 3.0-3.5), faculty nomination',
      activities: ['Service projects', 'Leadership training', 'Induction ceremony', 'Volunteer coordination'],
      commitment: 'Medium',
      benefits: ['Leadership experience', 'Scholarship opportunities', 'Community service hours']
    },
    {
      id: 'bingo-club',
      name: 'Bingo Club',
      description: 'A recreational club focused on social bingo events to promote wellness, relaxation, and student community.',
      sponsor: 'P. Valentino',
      category: 'Recreational',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fridays during advisory or after school',
      requirements: 'Open to all',
      activities: ['Bingo nights', 'Fundraiser events', 'Intergenerational outreach (senior centers)'],
      commitment: 'Low',
      benefits: ['Social connection', 'Stress relief', 'Volunteer opportunities']
    },
    {
      id: 'black-student-union',
      name: 'Black Student Union (BSU)',
      description: 'Student organization promoting cultural awareness, leadership, and service within the Black student community and the school.',
      sponsor: 'S. Gooding, D. Barker, B. Lane',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all students',
      activities: ['Cultural events', 'Discussion panels', 'Community service', 'Heritage month programming'],
      commitment: 'Medium',
      benefits: ['Advocacy experience', 'Networking', 'Leadership development']
    },
    {
      id: 'cadence-connoisseurs',
      name: 'Cadence Connoisseurs - Music Theory Club',
      description: 'Explores music theory, listening skills, and composition for students interested in deeper musical study.',
      sponsor: 'J. Hoffman, N. Tucker',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays during lunch',
      requirements: 'Interest in music theory; music class recommended',
      activities: ['Ear training', 'Score study', 'Composition workshops', 'Guest clinician sessions'],
      commitment: 'Medium',
      benefits: ['Musical understanding', 'Audition preparation', 'College music readiness']
    },
    {
      id: 'chess-club',
      name: 'Chess Club',
      description: 'Casual and competitive chess play for beginners through advanced players; occasional local tournaments.',
      sponsor: 'P. Wilson',
      category: 'Recreational',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Weekly play', 'Strategy lessons', 'Inter-school matches', 'Tournaments'],
      commitment: 'Low to Medium',
      benefits: ['Strategic thinking', 'Sportsmanship', 'Tournament experience']
    },
    {
      id: 'computer-science-club',
      name: 'Computer Science Club',
      description: 'Provides students opportunities to learn coding, work on projects, and prepare for competitions and internships.',
      sponsor: 'P. Wilson',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all; recommended computer science class enrollment',
      activities: ['Coding projects', 'Hackathons', 'Guest speakers', 'Competition prep'],
      commitment: 'Medium',
      benefits: ['Technical skills', 'Project portfolio', 'Career exposure']
    },
    {
      id: 'conditions-awareness-club',
      name: 'Conditions Awareness Club',
      description: 'Support and awareness group for students with chronic conditions and disabilities and their allies.',
      sponsor: 'J. Bush',
      category: 'Support',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday during advisory',
      requirements: 'Open to all',
      activities: ['Awareness campaigns', 'Peer support meetings', 'Guest speakers', 'Advocacy projects'],
      commitment: 'Low',
      benefits: ['Peer support', 'Advocacy experience', 'Community resources']
    },
    {
      id: 'create-x',
      name: 'Create X',
      description: 'Entrepreneurship club that helps students explore startup ideas, product design, and business basics.',
      sponsor: 'J. Martin',
      category: 'Business',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Pitch nights', 'Prototype workshops', 'Mentor sessions', 'Local startup visits'],
      commitment: 'Medium',
      benefits: ['Entrepreneurial skills', 'Portfolio projects', 'Networking']
    },
    {
      id: 'creative-writing',
      name: 'Creative Writing',
      description: 'A club where students share writing, give peer feedback, and work on poetry, short stories, and publishing projects.',
      sponsor: 'L. Smith',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Writing prompts', 'Peer critique', 'Publishing the school zine', 'Open mic nights'],
      commitment: 'Low to Medium',
      benefits: ['Improved writing', 'Publication opportunities', 'Peer critique skills']
    },
    {
      id: 'cricket-club',
      name: 'Cricket Club',
      description: 'Offers students the chance to learn and play cricket, practicing skills and competing regionally.',
      sponsor: 'E. Hardy',
      category: 'Sports',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Skill drills', 'Practice matches', 'Regional tournaments'],
      commitment: 'Medium',
      benefits: ['Teamwork', 'Athletic skill development', 'Competition exposure']
    },
    {
      id: 'crocheting-for-a-cause',
      name: 'Crocheting for a Cause',
      description: 'Students crochet items for donation while learning technique and supporting local charities.',
      sponsor: 'S. Ewing',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Fridays during lunch',
      requirements: 'Open to all; materials provided or bring your own',
      activities: ['Crochet workshops', 'Service donation drives', 'Skill mentoring'],
      commitment: 'Low',
      benefits: ['Service hours', 'Craft skills', 'Community impact']
    },
    {
      id: 'cti',
      name: 'CTI (Career & Technical Instruction)',
      description: 'Supports students exploring career/technical education pathways through workshops and career readiness events.',
      sponsor: 'K. Dankowsky',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Tuesday after school',
      requirements: 'Open to students interested in career/technical programs',
      activities: ['Workshops', 'Industry speakers', 'Field trips', 'Cert prep'],
      commitment: 'Medium',
      benefits: ['Career readiness', 'Certifications', 'Workplace skills']
    },
    {
      id: 'data-science',
      name: 'Data Science Club',
      description: 'Introduces students to data analysis, statistics, and machine learning through projects and competitions.',
      sponsor: 'J. Hoffman',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Interest in math/programming; prior coding helpful',
      activities: ['Project-based learning', 'Kaggle-style challenges', 'Visualization workshops'],
      commitment: 'Medium to High',
      benefits: ['Analytical skills', 'Project portfolio', 'Career exposure']
    },
    {
      id: 'debate-team',
      name: 'Debate Team',
      description: 'Competitive debate organization focusing on policy, public forum, and Lincoln-Douglas formats.',
      sponsor: 'K. Troy',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays and Thursdays after school',
      requirements: 'Tryout required for varsity team; open practices for newcomers',
      activities: ['Practice debates', 'Research workshops', 'Tournaments'],
      commitment: 'High',
      benefits: ['Public speaking', 'Research skills', 'Tournament recognition']
    },
    {
      id: 'deca',
      name: 'DECA',
      description: 'Business and marketing career organization that prepares emerging leaders through competitions and projects.',
      sponsor: 'S. Boone Williams, L. Martin, J. Olson, C. Stemple',
      category: 'Business',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to members enrolled in business classes encouraged',
      activities: ['Case studies', 'Mock interviews', 'State and national competitions'],
      commitment: 'Medium to High',
      benefits: ['Competition awards', 'Career skills', 'Networking']
    },
    {
      id: 'environmental-club',
      name: 'Environmental Club',
      description: 'Promotes sustainability and environmental stewardship through campus projects and outreach.',
      sponsor: 'A. Lovewell, K. Clark',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Clean-ups', 'Recycling campaigns', 'Awareness events', 'Community gardens'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Environmental education', 'Leadership experience']
    },
    {
      id: 'fbla',
      name: 'FBLA (Future Business Leaders of America)',
      description: 'Prepares students for careers in business and technology via competitions, leadership events, and community projects.',
      sponsor: 'B. Fink, P. Wilson',
      category: 'Business',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all students interested in business',
      activities: ['Competitions', 'Workshops', 'Community outreach'],
      commitment: 'Medium',
      benefits: ['Professional skills', 'Scholarships', 'Networking']
    },
    {
      id: 'fca',
      name: 'FCA (Fellowship of Christian Athletes)',
      description: 'Faith-based group that meets for Bible study, fellowship, and service oriented mainly toward student-athletes.',
      sponsor: 'J. Dickey',
      category: 'Religious',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays before school or during lunch',
      requirements: 'Open to all',
      activities: ['Bible study', 'Community outreach', 'Athlete-focused events'],
      commitment: 'Low',
      benefits: ['Spiritual growth', 'Community support', 'Leadership']
    },
    {
      id: 'fccla',
      name: 'FCCLA',
      description: 'Career and technical student organization focused on family and consumer sciences, leadership, and community service.',
      sponsor: 'M. Compton, E. Bowden, C. Sweat, K. DiCeasre',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday after school',
      requirements: 'Open to students with interest in family/consumer sciences',
      activities: ['Competitions', 'Workshops', 'Community service'],
      commitment: 'Medium',
      benefits: ['Career preparation', 'Competition experience', 'Leadership']
    },
    {
      id: 'fencing-club',
      name: 'Fencing Club',
      description: 'Introductory and practice club for students interested in fencing; emphasis on skill development and safe practice.',
      sponsor: 'B. Hardy',
      category: 'Sports',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all; safety equipment provided or required',
      activities: ['Technique drills', 'Sparring', 'Local competitions'],
      commitment: 'Medium',
      benefits: ['Physical fitness', 'Competitive opportunities', 'Discipline']
    },
    {
      id: 'hosa',
      name: 'HOSA (Future Health Professionals)',
      description: 'Organization for students interested in health careers; provides competitions, leadership, and healthcare exposure.',
      sponsor: 'G. Dutton, H. Foy, K. Bell',
      category: 'Career',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to students interested in health science',
      activities: ['Skill workshops', 'Medical competitions', 'Service projects'],
      commitment: 'Medium',
      benefits: ['Healthcare exposure', 'Competition awards', 'Networking']
    },
    {
      id: 'hindu-yuva',
      name: 'Hindu YUVA',
      description: 'Cultural club that celebrates Indian culture and traditions through events, festivals, and service.',
      sponsor: 'S. Rodriguez',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday after school',
      requirements: 'Open to all',
      activities: ['Festival events', 'Cultural outreach', 'Service projects'],
      commitment: 'Low',
      benefits: ['Cultural connection', 'Event planning', 'Community']
    },
    {
      id: 'interact-club',
      name: 'Interact Club',
      description: 'Rotary-sponsored youth service club focused on community service, leadership, and global citizenship.',
      sponsor: 'P. Valentino',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all; membership encouraged for service-minded students',
      activities: ['Volunteer projects', 'Fundraisers', 'Service trips'],
      commitment: 'Medium',
      benefits: ['Service hours', 'Leadership', 'Community connections']
    },
    {
      id: 'investing-club',
      name: 'Investing Club',
      description: 'Teaches students investing basics, stock market simulation, personal finance, and portfolio management.',
      sponsor: 'S. Englebert',
      category: 'Business',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Portfolio simulation', 'Guest finance speakers', 'Market analysis workshops'],
      commitment: 'Low to Medium',
      benefits: ['Financial literacy', 'Real-world investing experience', 'Resume skills']
    },
    {
      id: 'international-dance-club',
      name: 'International Dance Club',
      description: 'Performance and cultural dance club that showcases dance styles from around the world and performs at school events.',
      sponsor: 'L. McGlumphy',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all; audition may be required for performances',
      activities: ['Choreography', 'Cultural showcases', 'Performances'],
      commitment: 'Medium',
      benefits: ['Performance experience', 'Cultural appreciation', 'Teamwork']
    },
    {
      id: 'joi-club',
      name: 'JOI Club (Junior Optimist Club)',
      description: 'Leadership and service club that helps students plan community events and develop leadership skills.',
      sponsor: 'S. Carder',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Tuesday of month',
      requirements: 'Open to all',
      activities: ['Service projects', 'Leadership workshops', 'Fundraisers'],
      commitment: 'Low to Medium',
      benefits: ['Leadership development', 'Service experience', 'College resume building']
    },
    {
      id: 'key-club',
      name: 'Key Club',
      description: 'Student-led volunteer organization that promotes leadership through community service projects.',
      sponsor: 'S. Martin',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Community service', 'Volunteer fairs', 'Fundraising'],
      commitment: 'Medium',
      benefits: ['Service hours', 'Leadership', 'Networking with community organizations']
    },
    {
      id: 'kpop-club',
      name: 'K-Pop Club',
      description: 'Community for students who enjoy K-Pop music and Korean culture with dance sessions, watch parties, and events.',
      sponsor: 'M. Barcia',
      category: 'Cultural',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Dance practice', 'MV viewings', 'Fan events'],
      commitment: 'Low',
      benefits: ['Social connection', 'Performance opportunities']
    },
    {
      id: 'latin-club',
      name: 'Latin Club',
      description: 'Promotes interest in Latin language, Roman culture, and classical studies through activities and competitions.',
      sponsor: 'D. Duncan',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday of month',
      requirements: 'Open to all students interested in classical studies',
      activities: ['Reading groups', 'Cultural events', 'Certamen practice'],
      commitment: 'Low',
      benefits: ['Classical knowledge', 'Competition opportunities', 'Cultural appreciation']
    },
    {
      id: 'math-team',
      name: 'Math Team',
      description: 'Competitive math team preparing students for math meets and contests at regional and state levels.',
      sponsor: 'J. Martin',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all; tryouts for certain squads',
      activities: ['Problem-solving sessions', 'Mock contests', 'Regional meets'],
      commitment: 'Medium to High',
      benefits: ['Advanced math skills', 'Competition awards', 'College application boost']
    },
    {
      id: 'media-production-club',
      name: 'Media Production Club',
      description: 'Student-run media club focusing on video production, editing, and content creation for school platforms.',
      sponsor: 'S. Boone Williams',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all; interest in media production',
      activities: ['Video projects', 'Editing workshops', 'School announcements'],
      commitment: 'Medium',
      benefits: ['Media skills', 'Portfolio content', 'Collaboration experience']
    },
    {
      id: 'mock-trial',
      name: 'Mock Trial',
      description: 'Students practice courtroom procedures, legal argumentation, and compete in mock trial competitions.',
      sponsor: 'S. Marcus',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Tryouts required for competition teams',
      activities: ['Practice trials', 'Legal research', 'Competitions'],
      commitment: 'High',
      benefits: ['Public speaking', 'Legal understanding', 'Competition recognition']
    },
    {
      id: 'muslim-student-association',
      name: 'Muslim Student Association',
      description: 'Provides a space for students to learn about, practice, and discuss Islam while promoting interfaith understanding.',
      sponsor: 'P. Wilson',
      category: 'Religious',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays during lunch',
      requirements: 'Open to all',
      activities: ['Discussions', 'Cultural events', 'Community service'],
      commitment: 'Low',
      benefits: ['Cultural literacy', 'Community support', 'Interfaith dialogue']
    },
    {
      id: 'my-medical-message',
      name: 'My Medical Message',
      description: 'Club for students exploring medical careers through hands-on projects, guest speakers, and healthcare outreach.',
      sponsor: 'A. Carlisle',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'Interest in healthcare',
      activities: ['Guest speakers', 'Medical workshops', 'Service projects'],
      commitment: 'Low to Medium',
      benefits: ['Career exploration', 'Healthcare skills', 'Volunteer opportunities']
    },
    {
      id: 'nasa-club',
      name: 'NASA Club',
      description: 'Students explore space science topics, model rocketry, and astronomy; engages with regional NASA educational programs.',
      sponsor: 'E. Addis',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Rocketry', 'Space mission projects', 'Astronomy nights'],
      commitment: 'Medium',
      benefits: ['STEM experience', 'Competition readiness', 'Career exposure']
    },
    {
      id: 'numismatic-club',
      name: 'Numismatic Club',
      description: 'Explores coin collecting, history of currency, and numismatic research and trade.',
      sponsor: 'M. Haas',
      category: 'Recreational',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday of month',
      requirements: 'Open to all',
      activities: ['Coin shows', 'Guest speakers', 'Trading events'],
      commitment: 'Low',
      benefits: ['Historical knowledge', 'Collecting skills', 'Hobby community']
    },
    {
      id: 'prism',
      name: 'PRISM (LGBTQ+ Support)',
      description: 'Provides a safe, supportive environment for LGBTQ+ students and allies; focuses on advocacy and education.',
      sponsor: 'B. Liming',
      category: 'Support',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays during lunch',
      requirements: 'Open to all',
      activities: ['Peer support', 'Awareness campaigns', 'Allied training'],
      commitment: 'Low',
      benefits: ['Safe space', 'Advocacy skills', 'Community']
    },
    {
      id: 'red-cross-club',
      name: 'Red Cross Club',
      description: 'Local chapter supporting Red Cross initiatives with volunteer work, blood drives, and disaster preparedness education.',
      sponsor: 'S. Loftus',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday after school',
      requirements: 'Open to all; CPR training may be offered',
      activities: ['Blood drives', 'First aid workshops', 'Service projects'],
      commitment: 'Medium',
      benefits: ['CPR/first aid training', 'Service hours', 'Leadership']
    },
    {
      id: 'relay-for-life',
      name: 'Relay For Life',
      description: 'Student-led fundraising team supporting the American Cancer Society via events and community fundraising.',
      sponsor: 'K. Ashe',
      category: 'Service',
      meetingFrequency: 'Monthly (event-driven)',
      meetingDay: 'Varies with planning needs',
      requirements: 'Open to all',
      activities: ['Fundraising', 'Event planning', 'Awareness campaigns'],
      commitment: 'Medium during event season',
      benefits: ['Fundraising experience', 'Service hours', 'Community impact']
    },
    {
      id: 'robotics-club',
      name: 'Robotics Club (FRC)',
      description: 'FIRST Robotics Competition team designing, building, and programming robots to compete in regional and national events.',
      sponsor: 'D. Biskup, J. Neuhaus',
      category: 'STEM',
      meetingFrequency: 'Multiple times per week (seasonal)',
      meetingDay: 'Mon/Wed/Fri after school (seasonal build)',
      requirements: 'Open to all; interest in engineering/programming; application for travel team',
      activities: ['Robot design', 'Fabrication', 'Programming', 'Competitions'],
      commitment: 'High - especially during build season',
      benefits: ['Engineering experience', 'Scholarship opportunities', 'Teamwork']
    },
    {
      id: 'science-olympiad',
      name: 'Science Olympiad',
      description: 'Competitive team that trains for a broad range of science and engineering events at regional and state tournaments.',
      sponsor: 'A. Carlisle, N. McAllister',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to motivated students; sign-up for events',
      activities: ['Event-specific training', 'Practice competitions', 'Lab sessions'],
      commitment: 'High',
      benefits: ['STEM skills', 'Competition awards', 'College preparedness']
    },
    {
      id: 'sewa-club',
      name: 'SEWA Club',
      description: 'Volunteer club inspired by the SEWA philosophy focused on service and selfless community work.',
      sponsor: 'S. Ewing',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday after school',
      requirements: 'Open to all',
      activities: ['Service projects', 'Fundraisers', 'Community outreach'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Community engagement', 'Leadership']
    },
    {
      id: 'skillsusa',
      name: 'SkillsUSA',
      description: 'Career and technical student organization emphasizing trade skills, leadership, and industry certifications.',
      sponsor: 'J. Crosby, L. Davis',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Tuesday after school',
      requirements: 'Open to students in CTE classes',
      activities: ['Skills competitions', 'Industry workshops', 'Leadership training'],
      commitment: 'Medium',
      benefits: ['Certifications', 'Career readiness', 'Competition recognition']
    },
    {
      id: 'sickle-cell-care',
      name: 'Sickle Cell Care Organization',
      description: 'Awareness and support group dedicated to educating peers about sickle cell disease and supporting affected students.',
      sponsor: 'K. Enns',
      category: 'Support',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fourth Thursday of month',
      requirements: 'Open to all',
      activities: ['Awareness events', 'Fundraisers', 'Peer support'],
      commitment: 'Low',
      benefits: ['Community awareness', 'Support network', 'Leadership']
    },
    {
      id: 'stem-e',
      name: 'STEM-E',
      description: 'Promotes hands-on STEM + entrepreneurship projects to solve real-world problems with student-led teams.',
      sponsor: 'S. Englebert',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all; recommended interest in STEM or business',
      activities: ['Design challenges', 'Prototype building', 'Pitch competitions'],
      commitment: 'Medium',
      benefits: ['Problem-solving', 'Project portfolio', 'Entrepreneurial skills']
    },
    {
      id: 'stock-market',
      name: 'Stock Market Club',
      description: 'Teaches investing basics with simulated portfolios, market analysis, and guest speaker sessions.',
      sponsor: 'S. Englebert',
      category: 'Business',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Simulated investing', 'Market research', 'Guest talks from finance professionals'],
      commitment: 'Low to Medium',
      benefits: ['Financial literacy', 'Practical investing experience', 'Resume skills']
    },
    {
      id: 'student-government',
      name: 'Student Government Association (SGA)',
      description: 'Student-led organization that plans school events, represents student interests, and develops leadership skills.',
      sponsor: 'S. Loftus, S. Marcus, K. DiCesare',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays during advisory or after school',
      requirements: 'Elected or appointed positions; class GPA requirement typically',
      activities: ['Event planning', 'Student advocacy', 'School initiatives'],
      commitment: 'Medium to High',
      benefits: ['Leadership experience', 'Event planning', 'Student representation']
    },
    {
      id: 'students-for-animal-wellness',
      name: 'Students For Animal Wellness Club',
      description: 'Promotes responsible pet ownership, animal welfare awareness, and volunteer projects supporting shelters.',
      sponsor: 'S. Rodriguez',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Monday after school',
      requirements: 'Open to all',
      activities: ['Shelter volunteering', 'Adoption awareness', 'Fundraisers'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Animal welfare education', 'Volunteer experience']
    },
    {
      id: 'tsa',
      name: 'Technology Student Association (TSA)',
      description: 'Competitive STEM organization focusing on engineering, design, and technology projects and competitions.',
      sponsor: 'D. Biskup, J. Neuhaus',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all students interested in tech; project teams may require sign-up',
      activities: ['Design challenges', 'Competitions', 'Workshops'],
      commitment: 'Medium to High',
      benefits: ['Technical skills', 'Competition awards', 'Portfolio projects']
    },
    {
      id: 'vibha',
      name: 'Vibha',
      description: 'Student organization focused on fundraising and volunteering to support underprivileged children in India.',
      sponsor: 'M. Weber',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Open to all',
      activities: ['Fundraising', 'Awareness campaigns', 'Community outreach'],
      commitment: 'Low',
      benefits: ['Service hours', 'Global perspective', 'Leadership']
    },
    {
      id: 'vt-seva',
      name: 'VT Seva',
      description: 'Youth empowerment and service club focused on volunteerism and philanthropic projects.',
      sponsor: 'A. Lovewell',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to all',
      activities: ['Volunteer coordination', 'Philanthropy events', 'Community partnerships'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Leadership opportunities', 'Community impact']
    },
    {
      id: 'welcoming-wolverines',
      name: 'Welcoming Wolverines',
      description: 'Peer-led program to help new students transition to West Forsyth and build inclusive peer communities.',
      sponsor: 'J. Rotunda, L. Golden',
      category: 'Support',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays during advisory',
      requirements: 'Open to volunteers who apply',
      activities: ['Peer mentoring', 'Orientation events', 'Social meetups'],
      commitment: 'Low to Medium',
      benefits: ['Leadership', 'Peer mentoring experience', 'Community building']
    },
    {
      id: 'west-forsyth-book-club',
      name: 'West Forsyth Book Club',
      description: 'Student book club for readers to discuss novels, develop critical reading skills, and host author events.',
      sponsor: 'A. Teixeira',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Last Thursday of month',
      requirements: 'Open to all',
      activities: ['Book discussions', 'Author Q&A', 'Reading challenges'],
      commitment: 'Low',
      benefits: ['Literacy skills', 'Critical thinking', 'Community of readers']
    },
    {
      id: 'boys-volleyball-club',
      name: 'WFHS Boys Volleyball Club',
      description: 'Club for boys interested in playing organized volleyball outside of school varsity programs.',
      sponsor: 'S. Ewing',
      category: 'Sports',
      meetingFrequency: 'Twice weekly',
      meetingDay: 'Mon & Wed after school',
      requirements: 'Open to all; tryouts for competitive squads',
      activities: ['Practice drills', 'Inter-school scrimmages', 'Fitness training'],
      commitment: 'Medium',
      benefits: ['Athletic development', 'Teamwork', 'Competition exposure']
    },
    {
      id: 'student-visionaries',
      name: 'West Student Visionaries of the Year',
      description: 'Group that plans fundraisers to support Leukemia & Lymphoma Society and other philanthropic goals.',
      sponsor: 'H. Foy',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday of month',
      requirements: 'Open to all',
      activities: ['Fundraising', 'Awareness campaigns', 'Event planning'],
      commitment: 'Medium (during fundraisers)',
      benefits: ['Fundraising experience', 'Community impact', 'Leadership']
    },
    {
      id: 'barbell-club',
      name: 'WFHS Barbell Club',
      description: 'Weight training club focused on strength training, conditioning, and safe lifting technique.',
      sponsor: 'S. Cantrell, K. Eversole',
      category: 'Sports',
      meetingFrequency: 'Three times weekly',
      meetingDay: 'Mon/Wed/Fri mornings or after school',
      requirements: 'Open to all; parental consent required for early hours',
      activities: ['Strength workouts', 'Technique coaching', 'Fitness testing'],
      commitment: 'Medium to High',
      benefits: ['Fitness', 'Strength gains', 'Health education']
    },
    {
      id: 'world-language-learning',
      name: 'World Language Learning Club',
      description: 'Supports students learning languages via conversation practice, cultural events, and tutoring.',
      sponsor: 'L. McGlumphy',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays during lunch',
      requirements: 'Open to all',
      activities: ['Language tables', 'Cultural nights', 'Peer tutoring'],
      commitment: 'Low',
      benefits: ['Language practice', 'Cultural literacy', 'Tutoring experience']
    },
    {
      id: 'creative-journalism-club',
      name: 'Creative Journalism Club',
      description: 'Develops student reporting, journalism skills, and helps produce creative content for school publications.',
      sponsor: 'J. Bush',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to writers, photographers, and designers',
      activities: ['Article writing', 'Editing workshops', 'Publication production'],
      commitment: 'Medium',
      benefits: ['Portfolio pieces', 'Journalism skills', 'Publication experience']
    },
    {
      id: 'greek-club',
      name: 'Greek Club',
      description: 'Club focused on Koine/Ancient Greek language and literature study through reading and discussion.',
      sponsor: 'M. Swindle',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to those interested in classical languages',
      activities: ['Reading groups', 'Translation workshops', 'Cultural events'],
      commitment: 'Low to Medium',
      benefits: ['Classical language exposure', 'Analytical reading', 'Academic enrichment']
    },
    {
      id: 'literary-team',
      name: 'Literary Team',
      description: 'Co-curricular team that prepares for literary competitions and performances (poetry, prose, dramatic readings).',
      sponsor: 'C. Pappas',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Audition or selection for competition slots',
      activities: ['Performance practice', 'Writing workshops', 'Competitions'],
      commitment: 'Medium to High',
      benefits: ['Public performance skills', 'Competition accolades', 'Creative development']
    },
    {
      id: 'drama-one-act-play',
      name: 'Drama (One Act Play)',
      description: 'Theater program focusing on one-act productions for competition and showcase.',
      sponsor: 'R. Stern',
      category: 'Arts',
      meetingFrequency: 'Multiple times weekly during rehearsal periods',
      meetingDay: 'Varies per rehearsal schedule',
      requirements: 'Audition required for cast/crew',
      activities: ['Rehearsals', 'Performances', 'Technical theater workshops'],
      commitment: 'High during production runs',
      benefits: ['Performance experience', 'Technical theater skills', 'College portfolio']
    },
    {
      id: 'e-sports',
      name: 'E-sports',
      description: 'Competitive gaming team representing the school in organized high school e-sports leagues.',
      sponsor: 'C. Lyles',
      category: 'Sports',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Tryouts or sign-ups for league teams',
      activities: ['Practice scrims', 'Tactical coaching', 'League matches'],
      commitment: 'Medium',
      benefits: ['Teamwork', 'Strategic thinking', 'Competition opportunities']
    },
    {
      id: 'bass-fishing-team',
      name: 'Bass Fishing Team',
      description: 'Rods-and-reel team that trains and competes in high school bass fishing tournaments.',
      sponsor: 'E. Goff',
      category: 'Sports',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays early morning/after school (seasonal)',
      requirements: 'Open to anglers; safety course may be required',
      activities: ['Practice outings', 'Tournament competition', 'Boater safety'],
      commitment: 'Medium',
      benefits: ['Outdoor skills', 'Competition experience', 'Team camaraderie']
    },
    {
      id: 'mu-alpha-theta',
      name: 'Mu Alpha Theta',
      description: 'Mathematics honor society promoting scholarship and service in mathematics.',
      sponsor: 'L. Brock',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday of month',
      requirements: 'GPA and teacher recommendation specific to math (school sets threshold)',
      activities: ['Tutoring', 'Math outreach', 'Honor society induction'],
      commitment: 'Low to Medium',
      benefits: ['Tutoring experience', 'Honor recognition', 'Scholarship possibilities']
    },
    {
      id: 'national-english-honor-society',
      name: 'National English Honor Society',
      description: 'Recognizes high achievement in English language arts and encourages literary service and scholarship.',
      sponsor: 'N. Souders, L. Smith',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Monday of month',
      requirements: 'GPA and writing/teacher nomination requirements set by chapter',
      activities: ['Tutoring', 'Literary events', 'Community outreach'],
      commitment: 'Low to Medium',
      benefits: ['Honor recognition', 'Leadership', 'Resume enhancement']
    },
    {
      id: 'national-honor-society',
      name: 'National Honor Society (NHS)',
      description: 'Recognizes students for scholarship, leadership, service, and character; chapter organizes service projects and induction.',
      sponsor: 'J. Wallace, J. Banks',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday of month',
      requirements: 'GPA threshold (varies by chapter), application, faculty review',
      activities: ['Community service', 'Induction ceremony', 'Leadership workshops'],
      commitment: 'Medium',
      benefits: ['Prestige', 'Scholarship opportunities', 'Leadership development']
    },
    {
      id: 'national-art-honor-society',
      name: 'National Art Honor Society',
      description: 'Recognizes artistic achievement and encourages service through art-related projects and exhibitions.',
      sponsor: 'A. Holland, A. Henke',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Tuesday of month',
      requirements: 'Portfolio review and GPA threshold',
      activities: ['Exhibitions', 'Community art projects', 'Peer mentoring'],
      commitment: 'Medium',
      benefits: ['Portfolio building', 'Art leadership', 'Community engagement']
    },
    {
      id: 'national-latin-honor-society',
      name: 'National Latin Honor Society',
      description: 'Honors excellence in Latin studies and encourages service and scholarship among members.',
      sponsor: 'D. Duncan',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday of month',
      requirements: 'Academic achievement in Latin classes; teacher nomination',
      activities: ['Tutoring', 'Cultural events', 'Induction'],
      commitment: 'Low to Medium',
      benefits: ['Academic recognition', 'Cultural enrichment', 'Leadership']
    },
    {
      id: 'national-technical-honor-society',
      name: 'National Technical Honor Society',
      description: 'Recognizes excellence in career and technical education, encouraging leadership and service among CTE students.',
      sponsor: 'L. Schultheiss',
      category: 'Career',
      meetingFrequency: 'Quarterly',
      meetingDay: 'Varies',
      requirements: 'CTE course performance criteria and nomination',
      activities: ['CTE outreach', 'Industry events', 'Service projects'],
      commitment: 'Low to Medium',
      benefits: ['CTE recognition', 'Career networking', 'Scholarship eligibility']
    },
    {
      id: 'national-thespian-honor-society',
      name: 'National Thespian Honor Society',
      description: 'Recognizes excellence in theater arts and supports student involvement in productions and festivals.',
      sponsor: 'R. Stern',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Tuesday of month',
      requirements: 'Points earned through theater participation; audition/performance history',
      activities: ['Theater festivals', 'Workshops', 'Service through theater'],
      commitment: 'Medium',
      benefits: ['Theater credentials', 'Festival opportunities', 'Leadership roles']
    },
    {
      id: 'quill-and-scroll',
      name: 'Quill & Scroll (Journalism Honor Society)',
      description: 'International journalism honor society that recognizes excellence in high school journalism and yearbook staffs.',
      sponsor: 'M. Farry',
      category: 'Academic',
      meetingFrequency: 'As needed (induction and events)',
      meetingDay: 'Varies',
      requirements: 'Journalism production credits and GPA requirements',
      activities: ['Induction', 'Journalism workshops', 'Publication support'],
      commitment: 'Low',
      benefits: ['Honor recognition', 'Resume/portfolio enhancement', 'Networking']
    },
    {
      id: 'rho-kappa',
      name: 'Rho Kappa (Social Studies Honor Society)',
      description: 'Honors achievement in social studies and encourages civic engagement and scholarship.',
      sponsor: 'S. Ewing',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday',
      requirements: 'Social studies excellence and teacher recommendation',
      activities: ['Tutoring', 'Civic projects', 'Field trips'],
      commitment: 'Low to Medium',
      benefits: ['Academic recognition', 'Civic engagement', 'Leadership']
    },
    {
      id: 'science-national-honor-society',
      name: 'Science National Honor Society (SNHS)',
      description: 'Encourages interest and excellence in science; members participate in tutoring, outreach, and science fairs.',
      sponsor: 'P. Valentino',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday',
      requirements: 'GPA/biology or science course achievement and application',
      activities: ['Tutoring', 'Science outreach', 'Competition prep'],
      commitment: 'Medium',
      benefits: ['STEM recognition', 'Tutoring experience', 'College readiness']
    },
    {
      id: 'spanish-national-honor-society',
      name: 'Spanish National Honor Society',
      description: 'Recognizes excellence in Spanish language study and promotes cultural events and tutoring.',
      sponsor: 'M. Wilson',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Monday',
      requirements: 'Spanish course achievement and faculty nomination',
      activities: ['Tutoring', 'Cultural events', 'Induction ceremony'],
      commitment: 'Low to Medium',
      benefits: ['Language credentials', 'Cultural exposure', 'Tutoring experience']
    },
    {
      id: 'tri-m-honor-society',
      name: 'Tri-M National Music Honor Society',
      description: 'Recognizes student musicians for academic and musical excellence and promotes music service projects.',
      sponsor: 'C. Pappas',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday of month',
      requirements: 'Music participation and GPA requirements',
      activities: ['Music outreach', 'Concert volunteering', 'Induction'],
      commitment: 'Low to Medium',
      benefits: ['Music credentials', 'Performance service', 'Leadership']
    }
    ]
  },
  {
    school: 'Lambert High School',
    clubs: [
    {
      id: '21st-century-leaders',
      name: '21st Century Leaders',
      description: 'Connects, transforms, and inspires students across Georgia to become leaders through diversity, service projects, and leadership forums.',
      sponsor: 'Phinizy Spaulding',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to all with leadership interest',
      activities: ['Leadership retreats', 'Service projects', 'Peer mentoring forums'],
      commitment: 'Medium – monthly meetings plus event participation',
      benefits: ['Leadership development', 'Networking opportunities', 'Community involvement']
    },
    {
      id: 'agni-dance-club',
      name: 'Agni Dance Club',
      description: 'Dance team celebrating Indian classical and contemporary styles through performances and cultural expression.',
      sponsor: 'n/a',
      category: 'Cultural',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all; rehearsal attendance expected for performances',
      activities: ['Choreography sessions', 'Cultural showcases', 'Competition preparation'],
      commitment: 'Medium',
      benefits: ['Performance experience', 'Cultural connection', 'Team collaboration']
    },
    {
      id: 'american-heart-association',
      name: 'American Heart Association Club',
      description: 'Promotes heart health awareness and community service through advocacy, volunteerism, and fundraising with the AHA.',
      sponsor: 'Kerry Langley',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'First and third Tuesday after school',
      requirements: 'Open to all',
      activities: ['Fundraising campaigns', 'Health awareness events', 'Volunteer outreach'],
      commitment: 'Low to Medium',
      benefits: ['Community service hours', 'Health promotion experience', 'Resumé enhancement']
    },
    {
      id: 'art-club',
      name: 'Art Club',
      description: 'Welcomes students of all skill levels to explore visual arts through collaborative projects, workshops, and events.',
      sponsor: 'Ms. McSpadden',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Art workshops', 'Campus murals', 'Art showcase planning'],
      commitment: 'Low to Medium',
      benefits: ['Creative expression', 'Portfolio building', 'Community engagement']
    },
    {
      id: 'astronomy-club',
      name: 'Astronomy Club',
      description: 'For students interested in space and stargazing; includes night observations and celestial topic discussions.',
      sponsor: 'Phinizy Spalding',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday at dusk',
      requirements: 'Open to all',
      activities: ['Night sky observation', 'Telescope use workshops', 'Astronomy talks'],
      commitment: 'Low to Medium',
      benefits: ['Astronomical knowledge', 'Scientific curiosity', 'Outdoor experience']
    },
    {
      id: 'band',
      name: 'Band',
      description: 'Performance-based group including marching band, wind ensemble, and concert band with opportunities to compete and perform.',
      sponsor: 'Ms. Tonya Mashburn',
      category: 'Arts',
      meetingFrequency: 'Multiple times a week',
      meetingDay: 'Mon/Wed/Fri afternoons + game nights',
      requirements: 'Audition required; music class enrollment recommended',
      activities: ['Rehearsals', 'Performances at games and competitions', 'Sectionals'],
      commitment: 'High',
      benefits: ['Musical proficiency', 'Performance résumé', 'Team discipline']
    },
    {
      id: 'blessings-in-a-backpack',
      name: 'Blessings in a Backpack',
      description: 'Provides weekend meals to students in need through volunteer packing and fundraising.',
      sponsor: 'Ed Gray',
      category: 'Service',
      meetingFrequency: 'Monthly packing event',
      meetingDay: 'Second Saturday morning',
      requirements: 'Open to all; volunteers encouraged',
      activities: ['Pack food bags', 'Fundraising drives', 'Community outreach projects'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Community impact', 'Volunteer experience']
    },
    {
      id: 'car-club',
      name: 'Car Club',
      description: 'For car enthusiasts to gather for shows and hands-on entry-level maintenance in a supervised environment.',
      sponsor: 'Joshua Sullivan, Anupam Goli',
      category: 'Recreational',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all; parental consent for equipment use',
      activities: ['Maintenance workshops', 'Car show prep', 'Guest speaker presentations'],
      commitment: 'Low',
      benefits: ['Mechanical exposure', 'Social connections', 'Event participation']
    },
    {
      id: 'change-the-earth',
      name: 'Change the Earth',
      description: 'Environmental activism through sustainability initiatives such as school gardens, recycling, and water quality projects.',
      sponsor: 'Mrs. Helm, Mrs. Spalding',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to all',
      activities: ['Garden care', 'Recycling events', 'Environmental workshops'],
      commitment: 'Low to Medium',
      benefits: ['Environmental awareness', 'Service hours', 'Leadership in green initiatives']
    },
    {
      id: 'chinese-culture-club',
      name: 'Chinese Culture Club',
      description: 'Celebrates Chinese heritage through food, traditions, and student-led events; open to everyone.',
      sponsor: 'Ms. Muller',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Open to all',
      activities: ['Cultural festivals', 'Food tastings', 'Language/calligraphy', 'Event planning'],
      commitment: 'Low',
      benefits: ['Cultural literacy', 'Event experience', 'Community connection']
    },
    {
      id: 'chorus',
      name: 'Chorus',
      description: 'Offers musical performance experiences including honor chorus selections, competitions, and concert opportunities.',
      sponsor: 'Mr. Wason',
      category: 'Arts',
      meetingFrequency: 'Twice weekly',
      meetingDay: 'Tuesdays & Fridays after school',
      requirements: 'Audition or choir enrollment preferred',
      activities: ['Vocal rehearsals', 'Performances', 'Competition preparation'],
      commitment: 'Medium to High',
      benefits: ['Vocal performance skills', 'Competitive opportunities', 'Teamwork']
    },
    {
      id: 'color-me-blue',
      name: 'Color Me Blue',
      description: 'Supports the autistic community through art-focused awareness campaigns and fundraising activities.',
      sponsor: 'Mrs. Cristina Wardrip',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Monday after school',
      requirements: 'Open to all',
      activities: ['Art workshops', 'Awareness events', 'Fundraising'],
      commitment: 'Low',
      benefits: ['Inclusive community engagement', 'Creative advocacy', 'Volunteer experience']
    },
    {
      id: 'creative-writing-and-arts',
      name: 'Creative Writing & Arts Club',
      description: 'A creative space to write, art, publish, and compete while showcasing students’ creativity.',
      sponsor: 'n/a',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Writing prompts', 'Art-making', 'Publication planning'],
      commitment: 'Low to Medium',
      benefits: ['Creative expression', 'Published work', 'Peer feedback']
    },
    {
      id: 'crochet-club',
      name: 'Crochet Club',
      description: 'Crafts handmade items for charities while teaching and sharing crochet skills within the community.',
      sponsor: 'Abigail Jackson',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays during lunch',
      requirements: 'Open to all; materials provided or bring your own',
      activities: ['Crochet sessions', 'Charity crafting', 'Skill sharing workshops'],
      commitment: 'Low',
      benefits: ['Service hours', 'Relaxation skill-building', 'Community impact']
    },
    {
      id: 'cybersecurity-club',
      name: 'Cybersecurity Club',
      description: 'Students learn cybersecurity skills, work toward certifications like Security+, and compete in CyberPatriot.',
      sponsor: 'Ms. Yunus',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Interest in cybersecurity; open to all',
      activities: ['Certification prep', 'CyberPatriot practice', 'Guest speaker demos'],
      commitment: 'Medium',
      benefits: ['Technical certification', 'Competition readiness', 'STEM career exposure']
    },
    {
      id: 'debate-team',
      name: 'Debate Team',
      description: 'Competitive speech and debate in Public Forum, Lincoln-Douglas, and Oratory formats for skill development.',
      sponsor: 'n/a',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays & Wednesdays after school',
      requirements: 'Open to all with tryouts for tournament team',
      activities: ['Practice debates', 'Research sessions', 'Tournament travel'],
      commitment: 'High',
      benefits: ['Oral advocacy', 'Critical thinking', 'Competitive recognition']
    },
    {
      id: 'doctors-without-borders',
      name: 'Doctors Without Borders',
      description: 'MSF chapter raising awareness for global health issues and involvement in humanitarian outreach.',
      sponsor: 'TBD',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Open to all with interest in global health',
      activities: ['Awareness campaigns', 'Fundraisers', 'Guest presentations'],
      commitment: 'Low to Medium',
      benefits: ['Global awareness', 'Service involvement', 'Cultural understanding']
    },
    {
      id: 'drumline',
      name: 'Drumline',
      description: 'Percussion ensemble performing in competitions and events, featuring snares, quads, basses, cymbals, and percussion pit.',
      sponsor: 'Ms. Tonya Mashburn',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays & Thursdays after school',
      requirements: 'Percussion experience recommended; tryout required',
      activities: ['Drum rehearsals', 'Choreography', 'Competition performances'],
      commitment: 'High',
      benefits: ['Musical performance', 'Competitive experience', 'Team discipline']
    },
    {
      id: 'dungeons-and-dragons',
      name: 'Dungeons & Dragons',
      description: 'Welcoming role-playing club exploring storytelling, strategy, and fantasy through D&D campaigns.',
      sponsor: 'Dr. Norton, Mr. Langley',
      category: 'Recreational',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Dungeon Master assignment or player interest required',
      activities: ['Campaign sessions', 'Character creation', 'Mini-events'],
      commitment: 'Low to Medium',
      benefits: ['Creative storytelling', 'Strategic thinking', 'Social connection']
    },
    {
      id: 'economics-club',
      name: 'Economics Club',
      description: 'Enhances economic literacy through competition (World Economics Cup, National Economics Challenge) and financial discussion.',
      sponsor: 'Catherine Arbeiter, John McCormick',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all economics students',
      activities: ['Competition prep', 'Economic debates', 'Guest lectures'],
      commitment: 'Medium',
      benefits: ['Competition awards', 'Economic understanding', 'College readiness']
    },
    {
      id: 'family-promise',
      name: 'Family Promise Club',
      description: 'Partners with Family Promise national organization to lead donation drives, awareness, and service to prevent homelessness.',
      sponsor: 'Jessica Yi',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Open to all',
      activities: ['Donation drives', 'Awareness campaigns', 'Volunteer coordination'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Leadership', 'Community awareness']
    },
    {
      id: 'fca',
      name: 'Fellowship of Christian Athletes (FCA)',
      description: 'Christian sports ministry open to all students offering Bible study, fellowship, and community service events.',
      sponsor: 'Tara Beth Hughey, Catherine Arbeiter, Sara Shepherd, Angela Rodriguez',
      category: 'Religious',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays before school or during lunch',
      requirements: 'Open to all',
      activities: ['Bible study', 'Fellowship events', 'Service outreach'],
      commitment: 'Low',
      benefits: ['Spiritual growth', 'Community support', 'Leadership development']
    },
    {
      id: 'fccla',
      name: 'FCCLA (Family, Career, & Community Leaders of America)',
      description: 'CTSO supporting students in Culinary Arts, Teaching, and Food Science with competitions and community leadership projects.',
      sponsor: 'Mrs. Barley, Chef Guerrasio, Ms. Isham',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday after school',
      requirements: 'Open to all interested in family/consumer sciences',
      activities: ['Leadership projects', 'Competitions', 'Community service'],
      commitment: 'Medium',
      benefits: ['Career skills', 'Competition recognition', 'Leadership experience']
    },
    {
      id: 'fencing-team',
      name: 'Fencing Team',
      description: 'Olympic-style fencing team that competes in the Georgia High School Fencing League.',
      sponsor: 'Ashley Gower',
      category: 'Sports',
      meetingFrequency: 'Twice weekly',
      meetingDay: 'Tuesdays & Thursdays after school',
      requirements: 'Open to all; equipment provided or required rental',
      activities: ['Technique drills', 'Sparring', 'League competitions'],
      commitment: 'Medium',
      benefits: ['Athletic skill', 'Discipline', 'Competitive opportunities']
    },
    {
      id: 'french-honor-society',
      name: 'French Honor Society',
      description: 'Promotes French language and culture through tutoring, events, and academic recognition.',
      sponsor: 'Abigail Jackson',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Monday after school',
      requirements: 'High achievement in French and teacher nomination',
      activities: ['Tutoring', 'Cultural events', 'Induction ceremony'],
      commitment: 'Low to Medium',
      benefits: ['Honor recognition', 'Cultural engagement', 'Language leadership']
    },
    {
      id: 'health-and-wellness-society',
      name: 'Health and Wellness Society',
      description: 'Focuses on mental, social, and physical health advocacy through events and wellbeing projects.',
      sponsor: 'Mrs. Potter',
      category: 'Support',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to all interested in wellness',
      activities: ['Wellness workshops', 'Health fairs', 'Stress-relief activities'],
      commitment: 'Low',
      benefits: ['Wellbeing awareness', 'Peer support', 'Advocacy skills']
    },
    {
      id: 'human-rights-campaign',
      name: 'Human Rights Campaign',
      description: 'LGBTQ+ advocacy club focusing on equality, visibility, and community support via educational and service events.',
      sponsor: 'Joanna Spalding',
      category: 'Support',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Awareness campaigns', 'Educational workshops', 'Support meetings'],
      commitment: 'Low to Medium',
      benefits: ['Advocacy experience', 'Community support', 'Leadership skills']
    },
    {
      id: 'igem',
      name: 'iGEM (Synthetic Biology)',
      description: 'International competition team in synthetic biology focusing on lab work, bioengineering, and research projects.',
      sponsor: 'Mrs. Janet Standeven, Dr. Brittney Cantrell, Mrs. Kate Sharer',
      category: 'STEM',
      meetingFrequency: 'Weekly (seasonal)',
      meetingDay: 'Mondays after school',
      requirements: 'Application and interest in biology/Biotech',
      activities: ['Lab work', 'Project design', 'Competition preparation'],
      commitment: 'High during competition season',
      benefits: ['Research experience', 'STEM leadership', 'Global recognition']  
    },
    {
      id: 'indian-classical-dance',
      name: 'Indian Classical Dance Club',
      description: 'Performance club dedicated to Bharatanatyam and Kathak; promotes cultural expression through dance projects.',
      sponsor: 'n/a',
      category: 'Cultural',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all; audition for performances',
      activities: ['Dance workshops', 'Cultural showcases', 'Performance training'],
      commitment: 'Medium',
      benefits: ['Cultural learning', 'Performance résumé', 'Creative discipline']
    },
    {
      id: 'indian-cultural-society',
      name: 'Indian Cultural Society',
      description: 'Promotes Indian culture via events like Garba and Diwali night, engaging in service and cultural education.',
      sponsor: 'Ms. Blanc',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Friday after school',
      requirements: 'Open to all',
      activities: ['Festival events', 'Cultural workshops', 'Community outreach'],
      commitment: 'Low to Medium',
      benefits: ['Cultural appreciation', 'Event planning', 'Community building']
    },
    {
      id: 'international-club',
      name: 'International Club',
      description: 'Celebrates global diversity through International Night and cultural awareness events.',
      sponsor: 'Mrs. Dodds, Mrs. Potter',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday after school',
      requirements: 'Open to all',
      activities: ['Heritage Festival', 'Cultural presentations', 'International potlucks'],
      commitment: 'Low to Medium',
      benefits: ['Global understanding', 'Event leadership', 'Inclusive community']  
    },
    {
      id: 'jewish-culture-club',
      name: 'Jewish Culture Club',
      description: 'Explores Jewish heritage, holidays, and traditions through hands-on educational activities.',
      sponsor: 'Rachel Smirnov',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Tuesday after school',
      requirements: 'Open to all',
      activities: ['Holiday celebrations', 'Cultural dialogues', 'Educational events'],
      commitment: 'Low',
      benefits: ['Cultural literacy', 'Community empathy', 'Cultural practice']
    },
    {
      id: 'journalism',
      name: 'Journalism (The Lambert Post)',
      description: 'Student journalism program focused on storytelling, reporting, and multimedia production for The Lambert Post.',
      sponsor: 'Mrs. Ali Barlow',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to writers, editors, photographers',
      activities: ['News reporting', 'Layout/editing', 'Online publishing'],
      commitment: 'Medium',
      benefits: ['Journalism portfolio', 'Media skills', 'Storytelling experience']
    },
    {
      id: 'kpop-dance-club',
      name: 'K-Pop Dance Club',
      description: 'Inclusive K-pop fan community for learning choreography, performances, workshops, and showcases.',
      sponsor: 'Jessica Wilkie',
      category: 'Cultural',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all; comfortable dancing encouraged',
      activities: ['Choreography practice', 'Music video viewings', 'Showcase performances'],
      commitment: 'Low to Medium',
      benefits: ['Dance skills', 'Social connection', 'Performance fun']
    },
    {
      id: 'lambert-economics-club',
      name: 'Lambert Economics Club',
      description: 'Advanced economics club focusing on financial literacy and competition preparation.',
      sponsor: 'n/a',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all interested in economics',
      activities: ['Economic discussions', 'Mock challenges', 'Competition prep'],
      commitment: 'Medium',
      benefits: ['Economic literacy', 'Competition experience', 'College readiness']
    },
    {
      id: 'medlife',
      name: 'MEDLIFE',
      description: 'Organizes service events and international service trips focused on medicine, education, and development.',
      sponsor: 'Viviana Corso',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fourth Thursday after school',
      requirements: 'Open to all; applications for travel team',
      activities: ['Service events', 'Fundraising', 'Trip planning'],
      commitment: 'Medium',
      benefits: ['Global service experience', 'Healthcare insight', 'Leadership']
    },
    {
      id: 'melodymed-club',
      name: 'MelodyMed Club',
      description: 'Combines music and service by offering music therapy experiences to support patients in healthcare settings.',
      sponsor: 'Mrs. Potter',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Musical interest preferred',
      activities: ['Music therapy sessions', 'Hospital visits', 'Fundraising concerts'],
      commitment: 'Medium',
      benefits: ['Therapy experience', 'Musical application', 'Community service']
    },
    {
      id: 'mu-alpha-theta',
      name: 'Mu Alpha Theta',
      description: 'National math honor society promoting excellence in math through service and competitions.',
      sponsor: 'Mrs. Echeverria',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday after school',
      requirements: 'High math GPA and teacher nomination',
      activities: ['Tutoring', 'Math contests', 'Service tutoring events'],
      commitment: 'Low to Medium',
      benefits: ['Academic recognition', 'Tutoring skills', 'Leadership experience']
    },
    {
      id: 'musical-passport-club',
      name: 'Musical Passport Club',
      description: 'Global music exploration through monthly student and guest performances from around the world.',
      sponsor: 'Julie Rosseter',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Friday during lunch',
      requirements: 'Open to all',
      activities: ['Live performances', 'Cultural music education', 'Guest artists'],
      commitment: 'Low',
      benefits: ['Global music exposure', 'Performance opportunity', 'Cultural learning']
    },
    {
      id: 'muslim-student-association',
      name: 'Muslim Student Association',
      description: 'Inclusive organization promoting understanding of Islam and cultural dialogue among students.',
      sponsor: 'Mr. Tony Sims',
      category: 'Religious',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Cultural discussions', 'Interfaith events', 'Community outreach'],
      commitment: 'Low',
      benefits: ['Cultural dialogue', 'Community building', 'Faith representation']
    },
    {
      id: 'national-honor-society',
      name: 'National Honor Society (NHS)',
      description: 'Recognizes scholarship, leadership, service, and character; organizes community service projects and induction.',
      sponsor: 'Ed Gray',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'GPA threshold, application, teacher recommendation',
      activities: ['Service projects', 'Leadership workshops', 'Induction'],
      commitment: 'Medium',
      benefits: ['Honor recognition', 'Resume enhancement', 'College scholarships']
    },
    {
      id: 'physics-team',
      name: 'Physics Team',
      description: 'Academic team focusing on advanced physics concepts and competitive problem-solving.',
      sponsor: 'Rebecca Howell',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Interest in physics; strong math background recommended',
      activities: ['Problem-solving sessions', 'Mock competitions', 'Academic events'],
      commitment: 'Medium to High',
      benefits: ['Analytical skills', 'Competition awards', 'STEM readiness']
    },
    {
      id: 'pickleball-club',
      name: 'Pickleball Club',
      description: 'Encourages fun, fitness, and social play through pickleball; open to all levels.',
      sponsor: 'Jordan Hill',
      category: 'Recreation',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Game play', 'Skill clinics', 'Friendly matches'],
      commitment: 'Low',
      benefits: ['Fitness', 'Social interaction', 'Recreation']
    },
    {
      id: 'robotics-club',
      name: 'Robotics Club (FIRST Robotics)',
      description: 'Designs, builds, and codes robots for global competition through the FIRST Robotics program.',
      sponsor: 'Laura Bender, Bill Schuyler',
      category: 'STEM',
      meetingFrequency: 'Multiple times weekly (seasonal)',
      meetingDay: 'Mon/Wed/Fri after school (build season)',
      requirements: 'Interest in engineering; team application required',
      activities: ['Robot design', 'Programming', 'Competition travel'],
      commitment: 'High during season',
      benefits: ['Engineering skills', 'Teamwork', 'Scholarship opportunities']
    },
    {
      id: 'save-a-childs-heart',
      name: 'Save A Child’s Heart',
      description: 'Awareness and fundraising club supporting children with heart conditions; PVSA-certified.',
      sponsor: 'Mrs. Potter',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Open to all',
      activities: ['Awareness events', 'Fundraisers', 'Volunteer campaigns'],
      commitment: 'Low to Medium',
      benefits: ['Community service', 'Global health awareness', 'Volunteer hours']
    },
    {
      id: 'science-honor-society',
      name: 'Science National Honor Society',
      description: 'Honors scientific achievement; members engage in tutoring, outreach, and science fair prep.',
      sponsor: 'Nikki Ferreira',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Tuesday after school',
      requirements: 'Science course excellence and faculty recommendation',
      activities: ['Tutoring sessions', 'Outreach projects', 'Science competition prep'],
      commitment: 'Low to Medium',
      benefits: ['STEM scholarship', 'Tutoring experience', 'Academic recognition']
    },
    {
      id: 'short-film-club',
      name: 'Short Film Club',
      description: 'Student-run team creating original short films and learning media production.',
      sponsor: 'Woody Van Treek',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Interest in filmmaking',
      activities: ['Scriptwriting', 'Filming', 'Editing workshops', 'Screenings'],
      commitment: 'Medium',
      benefits: ['Filmmaking skills', 'Portfolio content', 'Creative collaboration']
    },
    {
      id: 'skillsusa',
      name: 'SkillsUSA',
      description: 'Career and technical student organization focused on trade skills, leadership, and competition training.',
      sponsor: 'Waheetha Banu Yunus, Ben Cook',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to CTE students',
      activities: ['Skills competitions', 'Leadership workshops', 'Industry events'],
      commitment: 'Medium',
      benefits: ['Certification opportunities', 'Career readiness', 'Competitions']
    },
    {
      id: 'stem-in-space',
      name: 'STEM in Space',
      description: 'Offers opportunities for space-related STEM research and participation in competitions like NASA App Dev Challenge.',
      sponsor: 'Mr. Spalding',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Interest in STEM and space',
      activities: ['Research projects', 'Competition prep', 'Guest speaker sessions'],
      commitment: 'Medium',
      benefits: ['Scientific investigation', 'Competition exposure', 'STEM networking']
    },
    {
      id: 'student-ambassadors',
      name: 'Student Ambassador Program',
      description: 'Promotes civic leadership via voter registration outreach, public engagement, and competitions by Secretary of State’s office.',
      sponsor: 'Mrs. Lauren Watkins',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Application required; leadership interest',
      activities: ['Peer mentorship', 'Voter registration events', 'Civic competitions'],
      commitment: 'Medium',
      benefits: ['Civic skills', 'Public service experience', 'Leadership credentials']
    },
    {
      id: 'student-government',
      name: 'Student Government Association (SGA)',
      description: 'Organizes school-wide events, builds spirit, and represents students; members are elected or appointed.',
      sponsor: 'Jessica Page, Laura Goode, Macy Calatayud',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays during advisory',
      requirements: 'Election or appointment with GPA requirements',
      activities: ['Event planning', 'Student initiatives', 'Leadership forums'],
      commitment: 'Medium to High',
      benefits: ['School leadership', 'Event coordination', 'Advocacy experience']
    },
    {
      id: 'united-cancer-association',
      name: 'United Cancer Association',
      description: 'Raises awareness and funds for cancer research through advocacy and service events.',
      sponsor: 'Mrs. Wallace',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Tuesday after school',
      requirements: 'Open to all',
      activities: ['Fundraisers', 'Awareness campaigns', 'Support drives'],
      commitment: 'Low to Medium',
      benefits: ['Fundraising experience', 'Community impact', 'Awareness advocacy']
    },
    {
      id: 'women-in-stem',
      name: 'Women in STEM',
      description: 'Empowers young women to explore STEM careers through mentorship, collaboration, and skill-building.',
      sponsor: 'S. Bhardwaj',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all, especially female-identifying students interested in STEM',
      activities: ['Mentorship circles', 'STEM workshops', 'Panel discussions'],
      commitment: 'Low to Medium',
      benefits: ['STEM encouragement', 'Networking', 'Skill development']
    },
    {
      id: 'xr-club',
      name: 'XR (Extended Reality) Club',
      description: 'Explores VR, AR, and mixed reality through demos, trend discussions, and tech networking.',
      sponsor: 'n/a',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday after school',
      requirements: 'Open to all tech-interested students',
      activities: ['Tech demos', 'Project showcases', 'Industry guest talks'],
      commitment: 'Low',
      benefits: ['XR knowledge', 'Innovation exposure', 'Tech networking']
    },
    {
      id: 'yearbook',
      name: 'Yearbook',
      description: 'Editorial staff producing the annual yearbook including photography, layout, editing, and publishing.',
      sponsor: 'Ms. Chelsea McClain',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Application or open to all with interest in media',
      activities: ['Photography', 'Design layout', 'Writing and editing'],
      commitment: 'Medium',
      benefits: ['Publishing experience', 'Media skills', 'Creative teamwork']
    },
    {
      id: 'yp-stem',
      name: 'YP STEM',
      description: 'Focuses on professional STEM development through mentorship, workshops, and project-based learning.',
      sponsor: 'Ms. Roopa Yadavalli',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fourth Friday after school',
      requirements: 'Open to all interested in STEM careers',
      activities: ['Mentorship sessions', 'Professional workshops', 'Project showcases'],
      commitment: 'Low to Medium',
      benefits: ['Professional exposure', 'Project experience', 'STEM mentorship']
    },
    {
      id: 'beta-club',
      name: 'Beta Club',
      description: 'Leadership and service organization that recognizes academic achievement and encourages community involvement.',
      sponsor: 'TBD',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Monday after school',
      requirements: 'GPA threshold and faculty recommendation',
      activities: ['Service projects', 'Leadership trainings', 'Induction ceremonies'],
      commitment: 'Medium',
      benefits: ['Leadership skills', 'Honor recognition', 'Community service']
    },
    {
      id: 'deca',
      name: 'DECA',
      description: 'Preparing future leaders in marketing, finance, hospitality, and management; offers competitions and leadership development.',
      sponsor: 'TBD',
      category: 'Business',
      meetingFrequency: 'Monthly (2nd Tuesday)',
      meetingDay: 'Second Tuesday after school',
      requirements: 'Membership; marketing class recommended for competition eligibility',
      activities: ['Case study prep', 'Leadership conferences', 'Service projects'],
      commitment: 'Medium to High',
      benefits: ['Competition awards', 'Networking', 'Career readiness']  
    },
    {
      id: 'fbla',
      name: 'FBLA (Future Business Leaders of America)',
      description: 'Promotes leadership, networking, and career development in business through conferences, competitions, and service.',
      sponsor: 'TBD',
      category: 'Business',
      meetingFrequency: 'Monthly (1st Friday)',
      meetingDay: 'First Friday after school',
      requirements: 'Membership fee required',
      activities: ['Conferences', 'Competitions', 'Community projects'],
      commitment: 'Medium',
      benefits: ['Professional development', 'Scholarships', 'Resume-building']
    },
    {
      id: 'key-club',
      name: 'Key Club',
      description: 'Student-led organization that teaches leadership through service to others via community projects.',
      sponsor: 'TBD',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Service events', 'Fundraisers', 'Leadership panels'],
      commitment: 'Medium',
      benefits: ['Service hours', 'Leadership development', 'Community connections']
    },
    {
      id: 'lhs-lit-mag',
      name: 'Lambert Literary Magazine (The Lit)',
      description: 'Publishes student literary and visual art in an annual magazine showcasing creative talent.',
      sponsor: 'TBD',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all writers and artists',
      activities: ['Submission review', 'Layout design', 'Publication planning'],
      commitment: 'Low to Medium',
      benefits: ['Publication credits', 'Creative exposure', 'Editorial experience']
    },
    {
      id: 'national-art-honor-society',
      name: 'National Art Honor Society',
      description: 'Recognizes outstanding art students and encourages service through art projects and exhibitions.',
      sponsor: 'TBD',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Monday after school',
      requirements: 'Portfolio review and academic criteria',
      activities: ['Exhibitions', 'Community art projects', 'Peer mentoring'],
      commitment: 'Medium',
      benefits: ['Art credentials', 'Portfolio development', 'Leadership access']
    },
    {
      id: 'national-technical-honor-society',
      name: 'National Technical Honor Society',
      description: 'Honors excellence in career and technical education, fostering leadership and service among CTE students.',
      sponsor: 'TBD',
      category: 'Career',
      meetingFrequency: 'Quarterly',
      meetingDay: 'Varies',
      requirements: 'Excellence in CTE coursework and teacher nomination',
      activities: ['CTE outreach', 'Industry partnerships', 'Service projects'],
      commitment: 'Low to Medium',
      benefits: ['CTE recognition', 'Professional exposure', 'Scholarships']
    },
    {
      id: 'rho-kappa',
      name: 'Rho Kappa (Social Studies Honor Society)',
      description: 'Honors excellence in social studies and promotes civic engagement and scholarship.',
      sponsor: 'TBD',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Outstanding social studies performance and recommendation',
      activities: ['Tutoring', 'Civic projects', 'Field trips'],
      commitment: 'Low to Medium',
      benefits: ['Academic prestige', 'Civic participation', 'Leadership growth']
    },
    {
      id: 'spanish-honor-society',
      name: 'Spanish National Honor Society',
      description: 'Recognizes high achievement in Spanish language and promotes cultural awareness and tutoring.',
      sponsor: 'TBD',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Friday after school',
      requirements: 'High Spanish GPA and faculty nomination',
      activities: ['Tutoring', 'Cultural events', 'Induction'],
      commitment: 'Low to Medium',
      benefits: ['Language recognition', 'Cultural enrichment', 'Tutoring experience']
    },
    {
      id: 'tri-m-honor-society',
      name: 'Tri-M Music Honor Society',
      description: 'Recognizes musical and academic excellence; promotes music through service and performance.',
      sponsor: 'TBD',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday after school',
      requirements: 'Music involvement and academic achievement',
      activities: ['Concert volunteering', 'Music outreach', 'Honor induction'],
      commitment: 'Low to Medium',
      benefits: ['Music credentials', 'Service performance', 'Peer leadership']
    },
    {
      id: 'vex-robotics',
      name: 'VEX Robotics',
      description: 'Competitive robotics club focused on VEX Design System and competitions.',
      sponsor: 'TBD',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Interest in robotics; open to all',
      activities: ['Robot design', 'Building sessions', 'Competition prep'],
      commitment: 'Medium to High',
      benefits: ['Engineering experience', 'Competition skills', 'Team experience']
    },
    {
      id: 'unicef-club',
      name: 'UNICEF Club',
      description: 'Advocates for children’s rights globally through education, fundraising, and service.',
      sponsor: 'TBD',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Friday after school',
      requirements: 'Open to all',
      activities: ['Awareness campaigns', 'Fundraisers', 'Education activities'],
      commitment: 'Low to Medium',
      benefits: ['Global advocacy', 'Service hours', 'Leadership building']
    },
    {
      id: 'red-cross-club',
      name: 'American Red Cross Club',
      description: 'Supports Red Cross initiatives through volunteering and fundraising activities.',
      sponsor: 'TBD',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday after school',
      requirements: 'Open to all',
      activities: ['Blood drives', 'First aid training', 'Fundraising'],
      commitment: 'Medium',
      benefits: ['CPR training', 'Service hours', 'Community connections']
    },
    {
      id: 'drug-awareness-council',
      name: 'Forsyth County Drug Awareness Council',
      description: 'Promotes drug prevention education through campaigns and peer leadership.',
      sponsor: 'TBD',
      category: 'Support',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fourth Monday after school',
      requirements: 'Open to all',
      activities: ['Awareness campaigns', 'Educational presentations', 'Peer outreach'],
      commitment: 'Low to Medium',
      benefits: ['Public health awareness', 'Leadership', 'Peer advocacy']
    },
    {
      id: 'american-cancer-society-club',
      name: 'American Cancer Society Club',
      description: 'Raises awareness and funds for cancer research and supports patients and families.',
      sponsor: 'TBD',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday after school',
      requirements: 'Open to all',
      activities: ['Fundraisers', 'Awareness advocacy', 'Support events'],
      commitment: 'Low to Medium',
      benefits: ['Community impact', 'Fundraising experience', 'Cancer awareness']
    }
  ]
},
    {
  school: 'Forsyth Central High School',
  clubs: [
    {
      id: 'academic-bowl',
      name: 'Academic Bowl',
      description: 'Team-based quiz competition covering history, science, literature, and more in a fast-paced format.',
      sponsor: 'Cobb',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open tryouts in September',
      activities: ['Practice matches', 'Quiz bowl scrimmages', 'Regional competition'],
      commitment: 'Medium – preparation and travel for contests',
      benefits: ['Critical thinking', 'Teamwork', 'Academic recognition']
    },
    {
      id: 'asl-american-sign-language-club',
      name: 'ASL (American Sign Language) Club',
      description: 'Explores ASL basics and Deaf culture through practice, games, and community interaction.',
      sponsor: 'Kiser',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays during lunch',
      requirements: 'Open to all',
      activities: ['Sign language practice', 'Cultural awareness workshops', 'Peer practice'],
      commitment: 'Low',
      benefits: ['Language exposure', 'Cultural empathy', 'Communication skills']
    },
    {
      id: 'astronomy-club',
      name: 'Astronomy Club',
      description: 'Explores celestial objects and basic astrophysics; includes after-dark viewing sessions.',
      sponsor: 'Ille',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fridays at dusk',
      requirements: 'Open to all',
      activities: ['Night sky observations', 'Stargazing sessions', 'Telescope tutorials'],
      commitment: 'Low to Medium',
      benefits: ['Scientific interest', 'Observation skills', 'Community building']
    },
    {
      id: 'beta-club',
      name: 'Beta Club',
      description: 'Honor society that recognizes academic achievement and emphasizes leadership and service.',
      sponsor: 'Dean',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday after school',
      requirements: 'Minimum GPA requirement + faculty nomination',
      activities: ['Service projects', 'Leadership workshops', 'Induction ceremonies'],
      commitment: 'Medium',
      benefits: ['Honor recognition', 'Service hours', 'Leadership development']
    },
    {
      id: 'black-student-union',
      name: 'Black Student Union',
      description: 'Promotes cultural empowerment, dialogue, and awareness via events and community action.',
      sponsor: 'TBD',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Cultural discussions', 'Heritage celebrations', 'Community outreach'],
      commitment: 'Low to Medium',
      benefits: ['Cultural understanding', 'Advocacy skills', 'Peer support']
    },
    {
      id: 'central-ambassadors',
      name: 'Central Ambassadors',
      description: 'Represents the school as student liaisons, welcoming visitors and supporting events.',
      sponsor: 'Mosher',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays during advisory',
      requirements: 'Application and interview process',
      activities: ['Guiding tours', 'Event hosting', 'Peer mentoring'],
      commitment: 'Medium',
      benefits: ['Leadership skills', 'Communication experience', 'School pride']
    },
    {
      id: 'chess-club',
      name: 'Chess Club',
      description: 'Gather to play and learn chess strategies at all levels; occasional club tournaments.',
      sponsor: 'Teems',
      category: 'Recreational',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Friendly matches', 'Strategy lessons', 'In-school tournaments'],
      commitment: 'Low',
      benefits: ['Critical thinking', 'Strategic skills', 'Relaxing community']
    },
    {
      id: 'chinese-watercolor-club',
      name: 'Chinese Watercolor Club',
      description: 'Combines traditional Chinese watercolor techniques with modern painting practices.',
      sponsor: 'Butterworth',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Painting sessions', 'Technique workshops', 'Exhibition planning'],
      commitment: 'Low to Medium',
      benefits: ['Art technique learning', 'Creative expression', 'Cultural integration']
    },
    {
      id: 'coding-club',
      name: 'Coding Club',
      description: 'Practices programming in Python, Java, and web development with collaborative mini-projects.',
      sponsor: 'John',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all with interest in coding',
      activities: ['Code-along sessions', 'Project collaboration', 'Coding challenges'],
      commitment: 'Medium',
      benefits: ['Programming skills', 'Project development', 'Problem-solving']
    },
    {
      id: 'color-guard-winter-guard',
      name: 'Color Guard & Winter Guard',
      description: 'Performs choreographed routines with flags and rifles during marching and indoor seasons.',
      sponsor: 'Rochester',
      category: 'Arts',
      meetingFrequency: 'Seasonal, multiple times a week',
      meetingDay: 'Tues/Wed/Fri afternoons (seasonal)',
      requirements: 'Audition required',
      activities: ['Routine practice', 'Marching performances', 'Competition prep'],
      commitment: 'High',
      benefits: ['Performance skills', 'Teamwork', 'Artistic discipline']
    },
    {
      id: 'cricket-club',
      name: 'Cricket Club',
      description: 'Introduces cricket through practice sessions, rules instruction, and friendly matches.',
      sponsor: 'Ali',
      category: 'Recreational',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to beginners and experienced players',
      activities: ['Skill drills', 'Mini-matches', 'Rules tutorials'],
      commitment: 'Low to Medium',
      benefits: ['Physical activity', 'Team sport experience', 'Cultural exposure']
    },
    {
      id: 'crochet-club',
      name: 'Crochet Club',
      description: 'Teaches and practices crochet while creating items for charity and relaxation.',
      sponsor: 'Tisdale',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays during lunch',
      requirements: 'Open to all',
      activities: ['Crafting sessions', 'Skill sharing', 'Charity donations'],
      commitment: 'Low',
      benefits: ['Craft skills', 'Community service', 'Stretch break']
    },
    {
      id: 'debate-club',
      name: 'Debate Club',
      description: 'Hosts informal debates on current topics to build public speaking and argumentation skills.',
      sponsor: 'Morrison',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Practice debates', 'Speech writing', 'Guest speakers'],
      commitment: 'Medium',
      benefits: ['Public speaking', 'Critical thinking', 'Confidence']
    },
    {
      id: 'deca',
      name: 'DECA',
      description: 'Prepares students for marketing, finance, hospitality, and management competitions and leadership.',
      sponsor: 'Echols',
      category: 'Business',
      meetingFrequency: 'Weekly during competition season',
      meetingDay: 'Wednesdays after school',
      requirements: 'Membership required; class in business helpful',
      activities: ['Roleplay prep', 'Case study training', 'Competition attendance'],
      commitment: 'High during contest season',
      benefits: ['Business acumen', 'Competition awards', 'Networking skills']
    },
    {
      id: 'dola',
      name: 'DOLA',
      description: 'Support organization fostering peer assistance and inclusivity for under-served student groups.',
      sponsor: 'Morris',
      category: 'Support',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Peer mentoring', 'Support discussions', 'Awareness events'],
      commitment: 'Low to Medium',
      benefits: ['Empathy building', 'Social support', 'Leadership through guidance']
    },
    {
      id: 'dungeons-disports',
      name: 'Dungeons & Disports',
      description: 'Combines fantasy role-playing with light physical activities and team-building games.',
      sponsor: 'Shearer',
      category: 'Recreational',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Open to all',
      activities: ['Hybrid gaming sessions', 'Creative challenges'],
      commitment: 'Low',
      benefits: ['Creativity', 'Physical fun', 'Social interaction']
    },
    {
      id: 'eco-club',
      name: 'Eco Club',
      description: 'Focuses on sustainability through school cleanups, recycling efforts, and environmental advocacy.',
      sponsor: 'Fancher',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Clean-up events', 'Recycling drives', 'Environmental education'],
      commitment: 'Low to Medium',
      benefits: ['Environmental stewardship', 'Service hours', 'Awareness activism']
    },
    {
      id: 'electric-vehicle-club',
      name: 'Electric Vehicle Club',
      description: 'Explores EV technology through research, models, guest talks, and possible prototyping projects.',
      sponsor: 'Willingham',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Interest in EV and engineering',
      activities: ['Research projects', 'Guest speaker sessions', 'Model building'],
      commitment: 'Medium',
      benefits: ['Technical knowledge', 'STEM exposure', 'Team projects']
    },
    {
      id: 'engage-club',
      name: 'Engage Club',
      description: 'Promotes student involvement through inclusive social events and peer connection opportunities.',
      sponsor: 'Delk',
      category: 'Support',
      meetingFrequency: 'Monthly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Social mixers', 'Campus events planning', 'Peer outreach'],
      commitment: 'Low',
      benefits: ['Community building', 'Social connection', 'Event planning experience']
    },
    {
      id: 'fbla',
      name: 'FBLA (Future Business Leaders of America)',
      description: 'Encourages leadership, networking, and career development in business through competitions and events.',
      sponsor: 'Deininger',
      category: 'Business',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Membership fee required',
      activities: ['Competitions', 'Business challenges', 'Leadership workshops'],
      commitment: 'Medium',
      benefits: ['Business experience', 'Scholarships', 'Networking']
    },
    {
      id: 'fccla',
      name: 'FCCLA (Family, Career & Community Leaders of America)',
      description: 'Develops personal growth and leadership in family, career, and consumer sciences through projects and competitions.',
      sponsor: 'Zaring',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday after school',
      requirements: 'Open to all interested in family/consumer sciences',
      activities: ['Skills workshops', 'Competitions', 'Community service'],
      commitment: 'Medium',
      benefits: ['Career skills', 'Competition recognition', 'Leadership']
    },
    {
      id: 'fellowship-of-christian-athletes',
      name: 'Fellowship of Christian Athletes',
      description: 'Interdenominational sports-ministry connecting faith and athletics through fellowship and service.',
      sponsor: 'Hutchins',
      category: 'Religious',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays before school',
      requirements: 'Open to all athletes',
      activities: ['Bible study', 'Service events', 'Team huddles'],
      commitment: 'Low',
      benefits: ['Spiritual support', 'Community connection', 'Faith development']
    },
    {
      id: 'film-club',
      name: 'Film Club',
      description: 'Allows filmmaking enthusiasts to collaborate on short films, discuss cinema, and learn production techniques.',
      sponsor: 'Harmon',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Interest in film and media',
      activities: ['Scriptwriting', 'Filming', 'Editing workshops', 'Screenings'],
      commitment: 'Medium',
      benefits: ['Media skills', 'Collaboration', 'Creative expression']
    },
    {
      id: 'french-club',
      name: 'French Club',
      description: 'Promotes appreciation of French language and culture through customs, films, food, and games.',
      sponsor: 'Clements',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all French enthusiasts',
      activities: ['Culture nights', 'Language practice', 'Themed events'],
      commitment: 'Low',
      benefits: ['Cultural exposure', 'Language learning', 'Social interaction']
    },
    {
      id: 'future-healthcare-professionals',
      name: 'Future Healthcare Professionals',
      description: 'Introduces students to healthcare careers via guest speakers, field trips, and skills workshops.',
      sponsor: 'Howard',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Monday after school',
      requirements: 'Open to all with healthcare interest',
      activities: ['Medical demos', 'Field visits', 'Career panels'],
      commitment: 'Low to Medium',
      benefits: ['Career insight', 'Networking', 'Hands-on exposure']
    },
    {
      id: 'georgia-thespian-society',
      name: 'Georgia Thespian Society',
      description: 'Honor society for theater arts promoting performance skills, conferences, and recognition.',
      sponsor: 'Harmon',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fridays after school',
      requirements: 'Theater involvement and GPA requirement',
      activities: ['Performances', 'Thespian conventions', 'Inductions'],
      commitment: 'Medium',
      benefits: ['Artistic recognition', 'Performance experience', 'Conference opportunities']
    },
    {
      id: 'girls-who-code',
      name: 'Girls Who Code',
      description: 'Empowers young women in tech through coding projects, mentorship, and supportive community.',
      sponsor: 'Jackson',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to female-identifying students interested in coding',
      activities: ['Coding projects', 'Guest talks', 'Mentorship sessions'],
      commitment: 'Medium',
      benefits: ['Tech skills', 'Support network', 'Confidence building']
    },
    {
      id: 'green-club',
      name: 'Green Club',
      description: 'Advocates for environmental sustainability via campus initiatives and community action.',
      sponsor: 'Fancher',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Garden projects', 'Recycling campaigns', 'Environmental workshops'],
      commitment: 'Low to Medium',
      benefits: ['Environmental activism', 'Service hours', 'Teamwork']
    },
    {
      id: 'gsu-scholars',
      name: 'GSU Scholars',
      description: 'Provides students with enriched academic challenges and leadership opportunities through GSU partnership.',
      sponsor: 'Mosher',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Tuesday after school',
      requirements: 'Application with academic criteria',
      activities: ['Leadership workshops', 'Academic seminars', 'GSU events'],
      commitment: 'Medium',
      benefits: ['Leadership development', 'College exposure', 'Academic enrichment']
    },
    {
      id: 'guitar-club',
      name: 'Guitar Club',
      description: 'Welcomes guitar players and learners for practice sessions, jams, and music sharing.',
      sponsor: 'Ayers',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all levels',
      activities: ['Jam sessions', 'Technique sharing', 'Open mic nights'],
      commitment: 'Low',
      benefits: ['Music skills', 'Social atmosphere', 'Creative expression']
    },
    {
      id: 'hispanic-organization-promoting-education-hope',
      name: 'Hispanic Organization Promoting Education (HOPE)',
      description: 'Empowers Hispanic students via cultural events, educational support, and community outreach.',
      sponsor: 'Rendon',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Cultural celebrations', 'Support services', 'Awareness events'],
      commitment: 'Low to Medium',
      benefits: ['Cultural pride', 'Peer support', 'Academic encouragement']
    },
    {
      id: 'hosa',
      name: 'HOSA',
      description: 'Fosters leadership in health sciences through competitions, community service, and career prep.',
      sponsor: 'Howard',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday after school',
      requirements: 'Membership fee and health interest',
      activities: ['Health competitions', 'Service projects', 'Career panels'],
      commitment: 'Medium',
      benefits: ['Healthcare exposure', 'Competition experience', 'Leadership skills']
    },
    {
      id: 'international-club',
      name: 'International Club',
      description: 'Celebrates global cultures via festivals, sharing events, and international dialogues.',
      sponsor: 'Rendon',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Open to all',
      activities: ['Cultural presentations', 'Food tastings', 'Heritage celebrations'],
      commitment: 'Low',
      benefits: ['Global awareness', 'Cultural exchange', 'Social engagement']
    },
    {
      id: 'international-thespian-society',
      name: 'International Thespian Society',
      description: 'Recognizes theatrical achievement and connects students through performance and scholarship.',
      sponsor: 'Harmon',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'Theater participation and criteria',
      activities: ['Awards recognition', 'Performance projects', 'Conference attendance'],
      commitment: 'Medium',
      benefits: ['Theater leadership', 'Performance prestige', 'Networking']
    },
    {
      id: 'japanese-club',
      name: 'Japanese Club',
      description: 'Explores Japanese culture, language, and traditions through fun, student-led activities.',
      sponsor: 'TBD',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Cultural crafts', 'Language games', 'Event planning'],
      commitment: 'Low',
      benefits: ['Cultural exposure', 'Language interest', 'Social connection']
    },
    {
      id: 'k-pop-club',
      name: 'K-Pop Club',
      description: 'Brings together K-Pop fans for dance sessions, music sharing, and performance planning.',
      sponsor: 'Butterworth',
      category: 'Cultural',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Dance practice', 'Music discussions', 'Showcase planning'],
      commitment: 'Low to Medium',
      benefits: ['Dance fun', 'Community building', 'Cultural engagement']
    },
    {
      id: 'key-club',
      name: 'Key Club',
      description: 'Student-led service organization that develops leadership through volunteerism and community projects.',
      sponsor: 'Parrish',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Service events', 'Leadership workshops', 'Community outreach'],
      commitment: 'Medium',
      benefits: ['Service hours', 'Leadership building', 'Community connections']
    },
    {
      id: 'knitting-club',
      name: 'Knitting Club',
      description: 'Crafters gather to knit for fun and charity; materials shared or brought by students.',
      sponsor: 'Tisdale',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays during lunch',
      requirements: 'Open to all',
      activities: ['Knitting circles', 'Charity crafts', 'Skill sharing'],
      commitment: 'Low',
      benefits: ['Relaxation', 'Craft skills', 'Community giving']
    },
    {
      id: 'latinos-in-stem',
      name: 'Latinos in STEM',
      description: 'Encourages Hispanic students in STEM via mentorship, study sessions, and STEM events.',
      sponsor: 'Rendon',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Mentorship', 'STEM workshops', 'Event outreach'],
      commitment: 'Medium',
      benefits: ['Support network', 'STEM encouragement', 'Academic collaboration']
    },
    {
      id: 'math-team',
      name: 'Math Team',
      description: 'Competes in math contests with training sessions in algebra, geometry, and problem solving.',
      sponsor: 'Weber',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Tryout or invitation by coach',
      activities: ['Problem sets', 'Practice competitions', 'Regional meets'],
      commitment: 'High during season',
      benefits: ['Math skills', 'Competition awards', 'Team spirit']
    },
    {
      id: 'mu-alpha-theta',
      name: 'Mu Alpha Theta',
      description: 'National math honor society promoting excellence in mathematics via tutoring and contests.',
      sponsor: 'Weber',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'High math grade and nomination',
      activities: ['Peer tutoring', 'Math challenges', 'Honor induction'],
      commitment: 'Low to Medium',
      benefits: ['Honor recognition', 'Tutoring experience', 'Academic leadership']
    },
    {
      id: 'muslim-student-association',
      name: 'Muslim Student Association',
      description: 'Encourages cultural dialogue, religious education, and community service related to Islam.',
      sponsor: 'Rendon',
      category: 'Religious',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Cultural discussions', 'Community service', 'Holiday observations'],
      commitment: 'Low',
      benefits: ['Cultural understanding', 'Faith awareness', 'Community engagement']
    },
    {
      id: 'national-art-honor-society',
      name: 'National Art Honor Society',
      description: 'Recognizes student artists and encourages service through art exhibitions and mentoring.',
      sponsor: 'Butterworth',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday after school',
      requirements: 'Portfolio review and academic criteria',
      activities: ['Community art projects', 'Mentoring', 'Exhibitions'],
      commitment: 'Medium',
      benefits: ['Artistic recognition', 'Portfolio building', 'Service leadership']
    },
    {
      id: 'national-honor-society',
      name: 'National Honor Society',
      description: 'Honors students with scholarship, leadership, service, and character; leads service projects.',
      sponsor: 'Mosher',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'GPA threshold, application, faculty recommendation',
      activities: ['Service projects', 'Leadership training', 'Induction ceremony'],
      commitment: 'Medium',
      benefits: ['Recognition', 'College résumé', 'Scholarship eligibility']
    },
    {
      id: 'onramps',
      name: 'OnRamps',
      description: 'Academic support initiative offering dual-enrollment support and college prep.',
      sponsor: 'Zaring',
      category: 'Support',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday after school',
      requirements: 'Enrolled in OnRamps courses',
      activities: ['Study groups', 'College guidance', 'Tutoring sessions'],
      commitment: 'Low to Medium',
      benefits: ['Academic assistance', 'College readiness', 'Skill reinforcement']
    },
    {
      id: 'open-mic-club',
      name: 'Open Mic Club',
      description: 'Allows performers—musicians, poets, speakers—to practice and perform in a safe space.',
      sponsor: 'TBD',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday during lunch',
      requirements: 'Open sign-up to perform',
      activities: ['Performance slots', 'Peer feedback', 'Creative showcases'],
      commitment: 'Low',
      benefits: ['Performance comfort', 'Creative expression', 'Peer support']
    },
    {
      id: 'project-life',
      name: 'Project Life',
      description: 'Encourages personal growth and wellness through goal-setting workshops and peer support.',
      sponsor: 'Delk',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all students',
      activities: ['Goal-setting workshops', 'Peer mentorship', 'Progress check-ins'],
      commitment: 'Low',
      benefits: ['Self-awareness', 'Personal development', 'Supportive community']
    },
    {
      id: 'robotics-team',
      name: 'Robotics Team',
      description: 'Designs and programs robots for competitions, emphasizing engineering and teamwork.',
      sponsor: 'John',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Application preferred; interest in engineering',
      activities: ['Build sessions', 'Programming', 'Regional competitions'],
      commitment: 'High',
      benefits: ['STEM skills', 'Teamwork', 'Competition recognition']
    },
    {
      id: 'scholastic-bowl',
      name: 'Scholastic Bowl',
      description: 'Academic quiz team practicing knowledge challenges in science, history, and more.',
      sponsor: 'Mosher',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open tryouts',
      activities: ['Practice quizzes', 'Team drills', 'Match participation'],
      commitment: 'Medium',
      benefits: ['Knowledge building', 'Competition rewards', 'Team collaboration']
    },
    {
      id: 'science-club',
      name: 'Science Club',
      description: 'Engages students in experiments, science fair prep, and STEM outreach projects.',
      sponsor: 'Ille',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Hands-on experiments', 'Fair project mentoring', 'STEM outreach'],
      commitment: 'Low to Medium',
      benefits: ['Scientific curiosity', 'Experiment experience', 'Community teaching']
    },
    {
      id: 'skills-usa-club',
      name: 'Skills USA Club',
      description: 'Career and technical organization that fosters trade skills, leadership, and professional development.',
      sponsor: 'Hanline/Graham/Brown',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'Open to CTE students',
      activities: ['Skill competitions', 'Leadership workshops', 'Industry events'],
      commitment: 'Medium',
      benefits: ['Career-focused training', 'Competition experience', 'Industry networking']
    },
    {
      id: 'spanish-club',
      name: 'Spanish Club',
      description: 'Celebrates Hispanic cultures through music, food, games, and language activities.',
      sponsor: 'Wallace',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Cultural game nights', 'Language practice', 'Celebration events'],
      commitment: 'Low',
      benefits: ['Cultural exposure', 'Language fun', 'Social interaction']
    },
    {
      id: 'special-olympics-buddies',
      name: 'Special Olympics Buddies',
      description: 'Pairs students with Special Olympics athletes for inclusive social and support activities.',
      sponsor: 'Bell',
      category: 'Support',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday after school',
      requirements: 'Open to all students',
      activities: ['Partner events', 'Support activities', 'Team camaraderie'],
      commitment: 'Low to Medium',
      benefits: ['Inclusion', 'Service', 'Friendship']
    },
    {
      id: 'thespians-honor-society',
      name: 'Thespians Honor Society',
      description: 'Honor society for theatre students with performance leadership, conventions, and recognition.',
      sponsor: 'Neal',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Tuesday after school',
      requirements: 'Performance credits and GPA requirement',
      activities: ['Conventions', 'Performances', 'Honor recognition'],
      commitment: 'Medium',
      benefits: ['Theater prestige', 'Performance opportunities', 'Networking']
    },
    {
      id: 'tri-m-music-honor-society',
      name: 'Tri-M Music Honor Society',
      description: 'Recognizes musical achievement and promotes service and performance through music outreach.',
      sponsor: 'Tucker',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday after school',
      requirements: 'Music participation and academic standards',
      activities: ['Concert volunteering', 'Community performances', 'Honor induction'],
      commitment: 'Medium',
      benefits: ['Music recognition', 'Service performance', 'Leadership']
    },
    {
      id: 'tsa-technology-student-association',
      name: 'TSA (Technology Student Association)',
      description: 'Technical student org focusing on STEM, innovation, and competitions in technology fields.',
      sponsor: 'John',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday after school',
      requirements: 'Interest in tech; membership required',
      activities: ['Tech competitions', 'Project showcases', 'Innovation workshops'],
      commitment: 'Medium',
      benefits: ['STEM skills', 'Competition recognition', 'Innovation mindset']
    },
    {
      id: 'women-in-stem',
      name: 'Women in STEM',
      description: 'Promotes gender equity in STEM with mentorship, workshops, and peer collaboration.',
      sponsor: 'Hatfield',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all, especially female-identifying students',
      activities: ['Mentorship', 'STEM workshops', 'Networking events'],
      commitment: 'Low to Medium',
      benefits: ['STEM empowerment', 'Networking', 'Skill growth']
    },
    {
      id: 'yearbook',
      name: 'Yearbook',
      description: 'Produces the annual yearbook with contributions in photography, layout, editing, and storytelling.',
      sponsor: 'Ware',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Application preferred but open to all',
      activities: ['Photo shoots', 'Layout editing', 'Story collection'],
      commitment: 'High during publication months',
      benefits: ['Media experience', 'Creative teamwork', 'Publication credits']
    },
    {
      id: 'youth-leadership',
      name: 'Youth Leadership',
      description: 'Develops student leadership through workshops, civic engagement, and community initiatives.',
      sponsor: 'Smith',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Application required',
      activities: ['Leadership workshops', 'Community service', 'Civic engagement'],
      commitment: 'Medium',
      benefits: ['Leadership development', 'Civic awareness', 'Network building']
    },
    {
      id: 'zoology-club',
      name: 'Zoology Club',
      description: 'Explores animal biology and ecology through presentations, field trips, and conservation projects.',
      sponsor: 'Brown',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Open to all animal enthusiasts',
      activities: ['Species presentations', 'Zoo visits', 'Conservation projects'],
      commitment: 'Low to Medium',
      benefits: ['Scientific knowledge', 'Field experience', 'Conservation awareness']
    },
    {
      id: 'la-familia-hispana',
      name: 'La Familia Hispana',
      description: 'Celebrates Hispanic heritage with cultural activities, language support, and community outreach.',
      sponsor: 'Cardoso',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Cultural events', 'Language practice', 'Heritage projects'],
      commitment: 'Low to Medium',
      benefits: ['Cultural pride', 'Community engagement', 'Language interaction']
    },
    {
      id: 'ffa',
      name: 'FFA',
      description: 'Empowers students in agriculture and related sciences through leadership and technical skill development.',
      sponsor: 'Dowdy',
      category: 'Career',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Open to all interested in agriculture',
      activities: ['Agricultural projects', 'Competitions', 'Community outreach'],
      commitment: 'Medium',
      benefits: ['Career readiness', 'Leadership experience', 'Hands-on learning']
    },
    {
      id: 'food4lives',
      name: 'Food4Lives',
      description: 'Organizes food drives and meal initiatives to combat local hunger in the community.',
      sponsor: 'Neal',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Open to all',
      activities: ['Food drives', 'Meal prep events', 'Fundraising'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Community impact', 'Team volunteering']
    },
    {
      id: 'girl-up-club',
      name: 'Girl Up Club',
      description: 'Advocates for girls’ rights globally through awareness campaigns and fundraising initiatives.',
      sponsor: 'Valadez',
      category: 'Leadership',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Awareness campaigns', 'Fundraisers', 'Leadership activities'],
      commitment: 'Medium',
      benefits: ['Advocacy skills', 'Service involvement', 'Global awareness']
    },
    {
      id: 'indoor-drumline-winds-ensemble',
      name: 'Indoor Drumline/Winds Ensemble',
      description: 'Ensemble focusing on competitive percussion and wind chamber music performance.',
      sponsor: 'Tucker',
      category: 'Arts',
      meetingFrequency: 'Weekly (seasonal)',
      meetingDay: 'Tues/Wed after school (seasonal)',
      requirements: 'Audition required',
      activities: ['Rehearsals', 'Routine design', 'Competitions'],
      commitment: 'High during season',
      benefits: ['Musical performance', 'Teamwork', 'Competitive experience']
    },
    {
      id: 'interact-club',
      name: 'Interact Club',
      description: 'Rotary-sponsored youth service club promoting leadership through local community projects.',
      sponsor: 'Brasher',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'Open to all',
      activities: ['Service events', 'Community service', 'Rotary involvement'],
      commitment: 'Medium',
      benefits: ['Leadership development', 'Service experience', 'Networking']
    },
    {
      id: 'jewish-student-union',
      name: 'Jewish Student Union',
      description: 'Explores Jewish culture through events, dialogue, and community service.',
      sponsor: 'Thompson/Corin',
      category: 'Religious',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday after school',
      requirements: 'Open to all',
      activities: ['Cultural events', 'Discussions', 'Community actions'],
      commitment: 'Low to Medium',
      benefits: ['Cultural awareness', 'Community support', 'Faith exploration']
    },
    {
      id: 'marching-band',
      name: 'Marching Band',
      description: 'Instrumental ensemble performing at school events, parades, and competitions throughout the year.',
      sponsor: 'Tucker/Rochester',
      category: 'Arts',
      meetingFrequency: 'Multiple times weekly (seasonal)',
      meetingDay: 'Mon/Wed/Fri afternoons and event days',
      requirements: 'Band class enrollment and auditions required',
      activities: ['Rehearsals', 'Performances', 'Competition preparation'],
      commitment: 'High',
      benefits: ['Musical performance', 'Team discipline', 'School spirit']
    },
    {
      id: 'mock-trial-team',
      name: 'Mock Trial Team',
      description: 'Students practice courtroom procedure and compete in simulated trial contests regionally.',
      sponsor: 'TBD',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Tryouts required',
      activities: ['Court simulations', 'Case preparation', 'Competition',
      ],
      commitment: 'High',
      benefits: ['Legal thinking', 'Public speaking', 'Team experience']
    },
    {
      id: 'model-un',
      name: 'Model UN',
      description: 'Simulates United Nations conferences, developing diplomacy, research, and public speaking skills.',
      sponsor: 'Henderson',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Simulation sessions', 'Research assignments', 'Conference participation'],
      commitment: 'Medium',
      benefits: ['Diplomacy skills', 'Global awareness', 'Academic recognition']
    },
    {
      id: 'multicultural-student-union',
      name: 'Multicultural Student Union',
      description: 'Promotes cultural diversity via inclusive events and cross-cultural student initiatives.',
      sponsor: 'Srinivasan',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Cultural showcases', 'Discussion forums', 'Diversity events'],
      commitment: 'Low to Medium',
      benefits: ['Diversity promotion', 'Inclusive community', 'Event leadership']
    },
    {
      id: 'national-science-honor-society',
      name: 'National Science Honor Society',
      description: 'Honors scientific excellence; members tutor peers and lead STEM outreach.',
      sponsor: 'TBD',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday after school',
      requirements: 'Science GPA requirement + faculty recommendation',
      activities: ['Tutoring', 'STEM outreach', 'Honor induction'],
      commitment: 'Low to Medium',
      benefits: ['Academic recognition', 'Tutoring experience', 'STEM leadership']
    },
    {
      id: 'national-spanish-honor-society',
      name: 'National Spanish Honor Society',
      description: 'Honors achievement in Spanish and promotes cultural awareness and tutoring.',
      sponsor: 'TBD',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Friday after school',
      requirements: 'High Spanish GPA and nomination',
      activities: ['Tutoring', 'Cultural events', 'Induction ceremonies'],
      commitment: 'Low to Medium',
      benefits: ['Language recognition', 'Cultural knowledge', 'Peer tutoring']
    },
    {
      id: 'national-technical-honor-society',
      name: 'National Technical Honor Society',
      description: 'Recognizes excellence in career/technical education, emphasizing service, leadership, and industry connections.',
      sponsor: 'Feicht',
      category: 'Career',
      meetingFrequency: 'Quarterly',
      meetingDay: 'Varies',
      requirements: 'CTE excellence and teacher nomination',
      activities: ['Industry events', 'Service projects', 'Student mentoring'],
      commitment: 'Low to Medium',
      benefits: ['Career acknowledgment', 'Network building', 'Service credentials']
    },
    {
      id: 'photography-drone-club',
      name: 'Photography & Drone Club',
      description: 'Explores creative media through photography and drone technology with hands-on projects.',
      sponsor: 'Henderson',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Interest in photography or drones',
      activities: ['Photo/drone shoots', 'Editing workshops', 'Project showcases'],
      commitment: 'Medium',
      benefits: ['Creative media skills', 'Tech integration', 'Portfolio building']
    },
    {
      id: 'physics-club',
      name: 'Physics Club',
      description: 'Explore physics through interactive experiments, competitions, and student-led presentations.',
      sponsor: 'TBD',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Interest in physics',
      activities: ['Experiments', 'Quiz practice', 'Peer presentations'],
      commitment: 'Low to Medium',
      benefits: ['Scientific thinking', 'STEM outreach', 'Academic growth']
    },
    {
      id: 'political-discourse-club',
      name: 'Political Discourse Club',
      description: 'Discusses current events, policies, and civic issues in a structured and respectful forum.',
      sponsor: 'Henderson/Stern',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Debate forums', 'Current events analysis', 'Guest lectures'],
      commitment: 'Low to Medium',
      benefits: ['Civic engagement', 'Public speaking', 'Critical thinking']
    },
    {
      id: 'sat-club',
      name: 'SAT Club',
      description: 'Prepares students for SAT through peer tutoring, practice tests, and test-taking strategies.',
      sponsor: 'Ille',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Practice tests', 'Strategy workshops', 'Peer tutoring'],
      commitment: 'Medium',
      benefits: ['Test readiness', 'Score improvement', 'Study group support']
    },
    {
      id: 'science-olympiad',
      name: 'Science Olympiad',
      description: 'Student team preparing for STEM competitions through hands-on building and experiments.',
      sponsor: 'Kufrovich',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Application or tryout',
      activities: ['Event labs', 'Team drills', 'Competition attendance'],
      commitment: 'High during season',
      benefits: ['Scientific excellence', 'Competition medals', 'Collaborative skills']
    },
    {
      id: 'self-improvement-club',
      name: 'Self-Improvement Club',
      description: 'Focuses on personal growth via workshops on goal setting, mental wellness, and peer support.',
      sponsor: 'DuVal',
      category: 'Support',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Wellness workshops', 'Group discussions', 'Goal tracking'],
      commitment: 'Low',
      benefits: ['Personal development', 'Mental wellness', 'Support community']
    },
    {
      id: 'seva',
      name: 'SEVA',
      description: 'Service-oriented club inspired by youth philanthropy, organizing volunteer and outreach projects.',
      sponsor: 'Srinivasan',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday after school',
      requirements: 'Open to all',
      activities: ['Volunteer projects', 'Fundraising', 'Outreach campaigns'],
      commitment: 'Low to Medium',
      benefits: ['Service hours', 'Leadership opportunities', 'Community impact']
    },
  ],
},
    {
  school: 'Denmark High School',
  clubs: [
    {
      id: '3d-printing-club',
      name: '3D Printing Club',
      description: 'Students learn how to design, model, and print 3D objects using modern tools—from CAD basics to final prints.',
      sponsor: 'Shawn Prince',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all; basic computer literacy recommended',
      activities: ['CAD modeling workshops', 'Printer operation sessions', 'Collaborative project builds'],
      commitment: 'Low to Medium',
      benefits: ['3D modeling skills', 'Hands-on tech experience', 'Project completion']
    },
    {
      id: 'american-sign-language-club',
      name: 'American Sign Language Club (ASL Club)',
      description: 'Promotes awareness of Deaf culture and teaches ASL basics through interactive sessions and social events.',
      sponsor: 'Mary Thigpen',
      category: 'Cultural',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays during lunch',
      requirements: 'Open to all',
      activities: ['ASL basics', 'Deaf culture presentations', 'Guest interpreters'],
      commitment: 'Low',
      benefits: ['Language exposure', 'Cultural empathy', 'Communication skills']
    },
    {
      id: 'anime-club',
      name: 'Anime Club',
      description: 'Gather to watch anime, discuss manga, explore Japanese culture, and occasionally organize cosplay or shout-outs.',
      sponsor: 'James Bush',
      category: 'Cultural',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Anime screenings', 'Manga reading', 'Culture trivia and cosplay days'],
      commitment: 'Low',
      benefits: ['Cultural engagement', 'Social community', 'Creative expression']
    },
    {
      id: 'art-club',
      name: 'Art Club',
      description: 'Encourages creative expression through hands-on art projects and community-engaged art service.',
      sponsor: 'Amanda Holland',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Studio art sessions', 'School mural projects', 'Art showcases'],
      commitment: 'Low to Medium',
      benefits: ['Creative growth', 'Community art building', 'Portfolio pieces']
    },
    {
      id: 'astronomy-club',
      name: 'Astronomy Club',
      description: 'Explores celestial phenomena, astronomy fundamentals, telescope use, and occasional stargazing meets.',
      sponsor: 'Shawn Prince',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Open to all',
      activities: ['Planetary talks', 'Telescope demos', 'Stargazing outings'],
      commitment: 'Low',
      benefits: ['Astronomy knowledge', 'Observation practice', 'STEM engagement']
    },
    {
      id: 'beta-club',
      name: 'Beta Club',
      description: 'Recognizes academic excellence and promotes leadership and service through community projects.',
      sponsor: 'Stacey Parham',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday after school',
      requirements: 'GPA threshold and teacher nomination',
      activities: ['Service outreach', 'Leadership workshops', 'Honor inductees'],
      commitment: 'Medium',
      benefits: ['Recognition', 'Service experience', 'Leadership skills']
    },
    {
      id: 'black-student-union',
      name: 'Black Student Union (BSU)',
      description: 'Fosters cultural identity, leadership, and unity through discussions and celebrations of Black heritage.',
      sponsor: 'Sherise Gooding',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Heritage events', 'Guest speakers', 'Cultural workshops'],
      commitment: 'Low to Medium',
      benefits: ['Cultural pride', 'Community building', 'Advocacy engagement']
    },
    {
      id: 'book-club',
      name: 'Book Club',
      description: 'Read diverse genres, discuss literature, and build community through storytelling and reading events.',
      sponsor: 'Jessica Teixeira',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday after school',
      requirements: 'Open to all readers',
      activities: ['Book discussions', 'Reading challenges', 'Author Q&A or local library visits'],
      commitment: 'Low',
      benefits: ['Critical thinking', 'Literary exposure', 'Peer connection']
    },
    {
      id: 'broadcasting-club',
      name: 'Broadcasting Club',
      description: 'Hands-on experience in video production, reporting, and journalism for school announcements and media.',
      sponsor: 'Brian Young',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all; interest in media helpful',
      activities: ['News scripting', 'Filming segments', 'Editing and production'],
      commitment: 'Medium',
      benefits: ['Broadcast skills', 'Media literacy', 'Creative teamwork']
    },
    {
      id: 'business-club',
      name: 'Business Club',
      description: 'Explore entrepreneurship, marketing, and business fundamentals with guest speakers and project challenges.',
      sponsor: 'Laura Martin',
      category: 'Business',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Tuesday after school',
      requirements: 'Open to all',
      activities: ['Business case simulations', 'Entrepreneur workshops', 'Local business visits'],
      commitment: 'Low to Medium',
      benefits: ['Business awareness', 'Networking', 'Real-world challenges']
    },
    {
      id: 'car-club',
      name: 'Car Club',
      description: 'Connects car enthusiasts to learn about automotive mechanics, culture, and maintenance basics.',
      sponsor: 'James Bush',
      category: 'Recreation',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to all; parental consent for hands-on activities',
      activities: ['Maintenance demos', 'Field trips to car shows', 'Guest mechanic talks'],
      commitment: 'Low',
      benefits: ['Mechanical exposure', 'Shared passions', 'Community interest']
    },
    {
      id: 'chess-club',
      name: 'Chess Club',
      description: 'Practice chess strategy, challenge peers, and elevate skills with friendly tournaments and coaching.',
      sponsor: 'Piper Wilson',
      category: 'Recreation',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Strategy sessions', 'Friendly matches', 'School tournaments'],
      commitment: 'Low',
      benefits: ['Critical thinking', 'Focus building', 'Friendly competition']
    },
    {
      id: 'choir',
      name: 'Choir',
      description: 'Vocal ensemble that performs in concerts, festivals, and community events reflecting diverse repertoire.',
      sponsor: 'Kevin Whitley',
      category: 'Arts',
      meetingFrequency: 'Twice weekly',
      meetingDay: 'Tuesdays & Thursdays after school',
      requirements: 'Audition or enrollment in choir class',
      activities: ['Vocal rehearsals', 'Performance prep', 'Concert tours'],
      commitment: 'High',
      benefits: ['Vocal training', 'Public performance', 'Musical growth']
    },
    {
      id: 'computer-science-club',
      name: 'Computer Science Club',
      description: 'Collaborative environment for programming, app development, and tech problem-solving projects.',
      sponsor: 'Eric Arnold',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Code projects', 'Debug challenges', 'Hackathon prep'],
      commitment: 'Medium',
      benefits: ['Coding fluency', 'Project experience', 'STEM collaboration']
    },
    {
      id: 'crochet-club',
      name: 'Crochet Club',
      description: 'Crafting community to learn and create crochet items for charity and stress-relief.',
      sponsor: 'Brittany Rhodes',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays during lunch',
      requirements: 'Open to all',
      activities: ['Crochet sessions', 'Charity item creation', 'Skill share'],
      commitment: 'Low',
      benefits: ['Relaxation', 'Charitable giving', 'Craft skills']
    },
    {
      id: 'cultural-dance-club',
      name: 'Cultural Dance Club',
      description: 'Celebrates global dance traditions through learning choreography and staging cultural performances.',
      sponsor: 'Leigh McGlumphy',
      category: 'Cultural',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all',
      activities: ['Dance workshops', 'Cultural showcases', 'Festival prep'],
      commitment: 'Low to Medium',
      benefits: ['Cultural expression', 'Performance artistry', 'Community involvement']
    },
    {
      id: 'debate-team',
      name: 'Debate Team',
      description: 'Competes in speech and debate formats; sharpens research and public speaking through tournaments.',
      sponsor: 'Karen Troy',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to interested students',
      activities: ['Debate training', 'Research prep', 'Competitive tournaments'],
      commitment: 'High',
      benefits: ['Critical reasoning', 'Public speaking', 'Academic recognition']
    },
    {
      id: 'deca',
      name: 'DECA',
      description: 'Prepares students for marketing, finance, hospitality, and management careers through competitive events.',
      sponsor: 'Brittney Baker',
      category: 'Business',
      meetingFrequency: 'Weekly (seasonal)',
      meetingDay: 'Tuesdays after school',
      requirements: 'Membership; related coursework encouraged',
      activities: ['Business case training', 'Leadership workshops', 'State/national competitions'],
      commitment: 'High during season',
      benefits: ['Business insight', 'Contest achievements', 'Professional networking']
    },
    {
      id: 'denmark-wishes',
      name: 'Denmark Wishes',
      description: 'Volunteers coordinate support for wish-granting organizations, creating heartfelt community experiences.',
      sponsor: 'Billie Jatko',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Thursday after school',
      requirements: 'Open to all',
      activities: ['Fundraising', 'Wish event planning', 'Volunteer outreach'],
      commitment: 'Medium',
      benefits: ['Service impact', 'Empathy building', 'Event involvement']
    },
    {
      id: 'dharmic-students-association',
      name: "Dharmic Students' Association",
      description: 'Promotes awareness of Hindu, Jain, Buddhist, and Sikh cultures through discussion and celebration.',
      sponsor: 'Dustin Daniel',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday after school',
      requirements: 'Open to all',
      activities: ['Cultural fairs', 'Discussion circles', 'Festival organization'],
      commitment: 'Low to Medium',
      benefits: ['Interfaith understanding', 'Cultural celebration', 'Community learning']
    },
    {
      id: 'doctors-without-borders',
      name: 'Doctors Without Borders',
      description: 'Educates students about global health and encourages humanitarian advocacy aligned with MSF values.',
      sponsor: 'Mary Cartenuto',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to all',
      activities: ['Awareness campaigns', 'Health education events', 'Fundraising'],
      commitment: 'Low to Medium',
      benefits: ['Global health awareness', 'Service engagement', 'Humanitarian insight']
    },
    {
      id: 'environmental-preservation-club',
      name: 'Environmental Preservation Club',
      description: 'Encourages sustainability through campus green initiatives, awareness campaigns, and habitat projects.',
      sponsor: 'Billie Jatko',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Friday after school',
      requirements: 'Open to all',
      activities: ['Garden care', 'Clean-up drives', 'Eco workshops'],
      commitment: 'Low to Medium',
      benefits: ['Environmental leadership', 'Service contributions', 'STEM connection']
    },
    {
      id: 'equestrian-team',
      name: 'Equestrian Team',
      description: 'Students learn horsemanship, animal care, and equestrian competition through team-oriented riding.',
      sponsor: 'Tammie Hennelly & Deena Cook',
      category: 'Recreation',
      meetingFrequency: 'Weekly (seasonal)',
      meetingDay: 'Fridays after school',
      requirements: 'Riding experience recommended; gear required',
      activities: ['Riding practice', 'Horse care training', 'Show team prep'],
      commitment: 'High during season',
      benefits: ['Responsibility', 'Teamwork', 'Equine knowledge']
    },
    {
      id: 'fbla',
      name: 'FBLA (Future Business Leaders of America)',
      description: 'Builds leadership and professional skills through business competitions, conferences, and community projects.',
      sponsor: 'Eric Arnold',
      category: 'Business',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Monday after school',
      requirements: 'Membership fee',
      activities: ['Conference prep', 'Case competitions', 'Networking events'],
      commitment: 'Medium',
      benefits: ['Business leadership', 'Competition skills', 'Resume enhancement']
    },
    {
      id: 'fca',
      name: 'FCA (Fellowship of Christian Athletes)',
      description: 'Combines faith, fellowship, and athletics in Bible studies, service, and mentoring among student athletes.',
      sponsor: 'Dawn Brown',
      category: 'Service',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays before school',
      requirements: 'Open to all athletes',
      activities: ['Devotions', 'Mentor outreach', 'Service gatherings'],
      commitment: 'Low',
      benefits: ['Faith community', 'Peer support', 'Service involvement']
    },
    {
      id: 'fccla',
      name: 'FCCLA (Family, Career & Community Leaders of America)',
      description: 'Develops leadership through family and consumer sciences competitions, projects, and service.',
      sponsor: 'Patrice Mathauer',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Friday after school',
      requirements: 'Open to all interested students',
      activities: ['Skill challenges', 'Community service', 'Leadership workshops'],
      commitment: 'Medium',
      benefits: ['Life skills', 'Leadership development', 'Competitive experience']
    },
    {
      id: 'finance-club',
      name: 'Finance Club',
      description: 'Promotes financial literacy, investing knowledge, and real-world money management via workshops and competitions.',
      sponsor: 'Ryan Corbett',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Budgeting simulations', 'Investment challenges', 'Guest financial experts'],
      commitment: 'Low to Medium',
      benefits: ['Financial savvy', 'Market understanding', 'STEM/Business crossover']
    },
    {
      id: 'first-robotics-competition-club',
      name: 'First Robotics Competition Club',
      description: 'Hands-on club for designing, building, and coding robots for FRC competitions.',
      sponsor: 'Wally Moon',
      category: 'STEM',
      meetingFrequency: 'Multiple times weekly during build season',
      meetingDay: 'Tue/Wed/Thu after school',
      requirements: 'Interest in robotics/engineering; team application encouraged',
      activities: ['Robot assembly', 'Coding coordination', 'Competition travel'],
      commitment: 'High during season',
      benefits: ['STEM prowess', 'Team collaboration', 'Scholarship potential']
    },
    {
      id: 'ffa',
      name: 'FFA (Future Farmers of America)',
      description: 'Develops leadership and agricultural proficiency through hands-on learning and competitions.',
      sponsor: 'Donovan Hemmings',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday after school',
      requirements: 'Open to all interested in agriculture',
      activities: ['Livestock projects', 'Ag competitions', 'Career tours'],
      commitment: 'Medium',
      benefits: ['Agricultural knowledge', 'Leadership credentials', 'Community contribution']
    },
    {
      id: 'gaming-club',
      name: 'Gaming Club',
      description: 'Fosters a community for gamers through social play, strategy games, and occasional tournaments.',
      sponsor: 'Robert Oswald',
      category: 'Recreation',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Game nights', 'Esports sessions', 'Strategy discussions'],
      commitment: 'Low',
      benefits: ['Social connection', 'Fun engagement', 'Gaming culture']
    },
    {
      id: 'geografans',
      name: 'Geografans',
      description: 'Promotes geography and cultural awareness through interactive activities, games, and competitions.',
      sponsor: 'Lindsay Bone',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday after school',
      requirements: 'Open to all',
      activities: ['Geography trivia', 'Cultural presentations', 'Competition prep'],
      commitment: 'Low',
      benefits: ['Global knowledge', 'Problem-solving', 'Cultural appreciation']
    },
    {
      id: 'gifts-of-grace',
      name: 'Gifts of Grace',
      description: 'Mobilizes students in charitable outreach to support local communities through generous action.',
      sponsor: 'Cindy Cooper',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Tuesday after school',
      requirements: 'Open to all',
      activities: ['Charity events', 'Donation drives', 'Volunteer coordination'],
      commitment: 'Medium',
      benefits: ['Service involvement', 'Community empathy', 'Leadership chance']
    },
    {
      id: 'habitat-for-humanity',
      name: 'Habitat for Humanity',
      description: 'Partners with Habitat for Humanity to participate in home-building service projects and advocacy.',
      sponsor: 'Gabriela Elias',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all; may require travel',
      activities: ['Build days', 'Fundraisers', 'Awareness campaigns'],
      commitment: 'High during build events',
      benefits: ['Hands-on service', 'Team collaboration', 'Construction understanding']
    },
    {
      id: 'hosa',
      name: 'HOSA (Future Health Professionals)',
      description: 'Prepares students for healthcare careers through clinical competitions and professional development.',
      sponsor: 'Deborah Dumphy',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'Open to health-focused students; membership may require fee',
      activities: ['Clinical events', 'Medical workshops', 'State/regional competitions'],
      commitment: 'Medium to High during contest season',
      benefits: ['Career exploration', 'Medical knowledge', 'Leadership skills']
    },
    {
      id: 'igem',
      name: 'iGEM',
      description: 'Engages students in synthetic biology research for the international iGEM competition.',
      sponsor: 'Mary Cartenuto',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Application and biology interest',
      activities: ['Lab experiments', 'Project design', 'Competition preparation'],
      commitment: 'High',
      benefits: ['Research experience', 'STEM innovation', 'Global teamwork']
    },
    {
      id: 'key-club',
      name: 'Key Club',
      description: 'Leads service efforts in the community and develops leadership through student-led projects.',
      sponsor: 'Jeannine Crowe',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Service drives', 'Peer leadership meetings', 'Community collaborations'],
      commitment: 'Medium',
      benefits: ['Leadership practice', 'Volunteer impact', 'Community engagement']
    },
    {
      id: 'link',
      name: 'LINK',
      description: 'Peer mentorship and leadership-based group that helps new students integrate into school life.',
      sponsor: 'Ryan Corbett',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays during advisory',
      requirements: 'Application required; leadership interest preferred',
      activities: ['Mentor sessions', 'Welcome events', 'Peer support'],
      commitment: 'Medium',
      benefits: ['Leadership experience', 'School connection', 'Mentorship skills']
    },
    {
      id: 'joi-club',
      name: 'JOI Club (Junior Optimist International)',
      description: 'Promotes optimism and community service through student-led service projects and positive outreach.',
      sponsor: 'Unknown',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Open to all',
      activities: ['Community service', 'Fundraising', 'Positive message campaigns'],
      commitment: 'Low',
      benefits: ['Community involvement', 'Positive engagement', 'Leadership building']
    },
    {
      id: 'madhatter-knits',
      name: 'MADhatter Knits',
      description: 'Non-profit club knitting tiny hats for premature babies and supporting NICU families with warmth and care.',
      sponsor: 'TBD',
      category: 'Service',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays during lunch',
      requirements: 'Open to all',
      activities: ['Knitting sessions', 'NICU donation projects', 'Skill sharing'],
      commitment: 'Low',
      benefits: ['Service impact', 'Craft skills', 'Compassion outreach']
    },
    {
      id: 'math-team',
      name: 'Math Team',
      description: 'Competitional math team practicing problem-solving strategies and participating in math tournaments.',
      sponsor: 'Caitlyn Sloan',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays after school',
      requirements: 'Tryouts encouraged',
      activities: ['Problem-solving drills', 'Math contests', 'Team strategy review'],
      commitment: 'High during competition season',
      benefits: ['Mathematical excellence', 'Competition accolades', 'Teamwork']
    },
    {
      id: 'md-junior',
      name: 'MD Junior',
      description: 'Offers medical mentorship and volunteer opportunities to inspire student interest in health careers.',
      sponsor: 'Courtney Jewett',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Tuesday after school',
      requirements: 'Open to all with health interest',
      activities: ['Medical mentor Q&A', 'Volunteer coordination', 'Field exposure'],
      commitment: 'Low to Medium',
      benefits: ['Medical insight', 'Career prep', 'Network access']
    },
    {
      id: 'medical-explorers',
      name: 'Medical Explorers',
      description: 'Provides insight into medical professions via guest speakers, field trips, and hands-on learning.',
      sponsor: 'Caitlen Stovall',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Open to all interested',
      activities: ['Hospital tours', 'Career panels', 'Health workshops'],
      commitment: 'Low to Medium',
      benefits: ['Health industry exposure', 'Networking', 'Skill awareness']
    },
    {
      id: 'mock-trial',
      name: 'Mock Trial',
      description: 'Simulates courtroom trials—enhancing public speaking, legal reasoning, and teamwork skills.',
      sponsor: 'Jarrod Shirley',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Tryouts required',
      activities: ['Case practice', 'Legal drills', 'Regional competitions'],
      commitment: 'High',
      benefits: ['Legal skills', 'Advocacy experience', 'Team synergy']
    },
    {
      id: 'model-united-nations',
      name: 'Model United Nations (Model UN)',
      description: 'Encourages diplomacy and policy understanding by simulating UN conference committees.',
      sponsor: 'Marsha McPherson',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Mondays after school',
      requirements: 'Open to all',
      activities: ['Research assignments', 'Debate simulations', 'Conference participation'],
      commitment: 'Medium',
      benefits: ['Diplomacy skills', 'Global awareness', 'Public speaking']
    },
    {
      id: 'mountain-bike-club',
      name: 'Mountain Bike Club',
      description: 'Supports trail biking through school-sponsored competitions and group rides for biking enthusiasts.',
      sponsor: 'Jonathon Kent',
      category: 'Athletics',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all; bike needed',
      activities: ['Trail rides', 'Bike maintenance', 'Competition prep'],
      commitment: 'Medium',
      benefits: ['Fitness', 'Team riding', 'Outdoor experience']
    },
    {
      id: 'muslim-student-association',
      name: 'MSA (Muslim Student Association)',
      description: 'Provides a welcoming space for Islamic cultural and faith exploration through interfaith events.',
      sponsor: 'Ryan Corbett',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all',
      activities: ['Cultural discussion', 'Service events', 'Faith celebrations'],
      commitment: 'Low',
      benefits: ['Cultural awareness', 'Faith dialogue', 'Community inclusion']
    },
    {
      id: 'mu-alpha-theta',
      name: 'Mu Alpha Theta',
      description: 'National math honor society promoting excellence and mentorship in mathematics.',
      sponsor: 'Caitlyn Sloan',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Wednesday after school',
      requirements: 'High math GPA and faculty nomination',
      activities: ['Math tutoring', 'Contest prep', 'Induction ceremony'],
      commitment: 'Medium',
      benefits: ['Academic honor', 'Tutoring skills', 'Leadership experience']
    },
    {
      id: 'national-art-honor-society',
      name: 'National Art Honor Society (NAHS)',
      description: 'Recognizes and inspires outstanding artistic ability through peer mentorship and exhibitions.',
      sponsor: 'Kimmy Wood',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Tuesday after school',
      requirements: 'Portfolio evaluation and teacher recommendation',
      activities: ['Art exhibits', 'Service murals', 'Mentor peer artists'],
      commitment: 'Medium',
      benefits: ['Artistic recognition', 'Portfolio enhancement', 'Leadership through art']
    },
    {
      id: 'national-english-honor-society',
      name: 'National English Honor Society (NEHS)',
      description: 'Celebrates English study through literary activities, writing workshops, and community engagement.',
      sponsor: 'Debbie Rager',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday after school',
      requirements: 'English GPA threshold and recommendation',
      activities: ['Creative writing', 'Peer tutoring', 'Literary events'],
      commitment: 'Medium',
      benefits: ['Literary recognition', 'Writing experience', 'Community involvement']
    },
    {
      id: 'national-french-honor-society',
      name: 'National French Honor Society',
      description: 'Promotes French language excellence and cultural awareness through service and traditions.',
      sponsor: 'Dustin Daniel',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Friday after school',
      requirements: 'High French GPA and teacher nomination',
      activities: ['Tutoring', 'Francophone events', 'Induction ceremonies'],
      commitment: 'Low to Medium',
      benefits: ['Language recognition', 'Cultural exposure', 'Academic leadership']
    },
    {
      id: 'national-honor-society',
      name: 'National Honor Society (NHS)',
      description: 'Recognizes character, leadership, scholarship, and service—organizing school service and peer mentoring.',
      sponsor: 'Clair Patterson',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Tuesday after school',
      requirements: 'High GPA, service hours, recommendation, application',
      activities: ['Service projects', 'Leadership training', 'Inductions'],
      commitment: 'Medium',
      benefits: ['Recognition', 'College prep', 'Service leadership']
    },
    {
      id: 'national-technical-honor-society',
      name: 'National Technical Honor Society (NTHS)',
      description: 'Recognizes excellence in career and technical education, emphasizing leadership and workforce readiness.',
      sponsor: 'Donna Stohr',
      category: 'STEM',
      meetingFrequency: 'Quarterly',
      meetingDay: 'Varies',
      requirements: 'CTE excellence and teacher recommendation',
      activities: ['Industry expositions', 'Service activities', 'Peer mentoring'],
      commitment: 'Low to Medium',
      benefits: ['Technical achievement', 'Networking', 'Leadership recognition']
    },
    {
      id: 'newspaper-denmark-unleashed',
      name: 'Newspaper (Denmark Unleashed)',
      description: 'Student newspaper team creating journalistic content to inform and engage the school community.',
      sponsor: 'Jacey Sherman',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to writers, editors, and photographers',
      activities: ['Article pitching', 'Layout design', 'Publishing online/offprint'],
      commitment: 'Medium',
      benefits: ['Journalism skills', 'Byline credit', 'Media collaboration']
    },
    {
      id: 'onestep-chapter',
      name: 'OneStep Chapter',
      description: 'Empowers students through community service, leadership training, and peer awareness activities.',
      sponsor: 'Unknown',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Thursday after school',
      requirements: 'Open to all',
      activities: ['Community projects', 'Awareness campaigns', 'Leadership exercises'],
      commitment: 'Low to Medium',
      benefits: ['Service experience', 'Peer leadership', 'Community engagement']
    },
    {
      id: 'orchestra-club',
      name: 'Orchestra Club',
      description: 'Provides string musicians additional opportunities to collaborate, perform, and celebrate orchestral music.',
      sponsor: 'Unknown',
      category: 'Arts',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays after school',
      requirements: 'String instrument proficiency recommended',
      activities: ['Ensemble practice', 'Performance planning', 'Community concerts'],
      commitment: 'Medium',
      benefits: ['Ensemble experience', 'Music collaboration', 'Performance exposure']
    },
    {
      id: 'performance-dance-team',
      name: 'Performance Dance Team',
      description: 'Supports school spirit through dance performances at events, involving choreography and team building.',
      sponsor: 'Unknown',
      category: 'Arts',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Dance tryouts required',
      activities: ['Choreography sessions', 'Performance prep', 'Event showcases'],
      commitment: 'Medium',
      benefits: ['Dance skills', 'Team spirit', 'Performance confidence']
    },
    {
      id: 'physics-club',
      name: 'Physics Club',
      description: 'Engages students in experiments, competitions, and physics-focused outreach activities.',
      sponsor: 'John Cooper',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Open to all',
      activities: ['Experimental labs', 'Competition prep', 'Physics demos'],
      commitment: 'Low to Medium',
      benefits: ['Scientific reasoning', 'Hands-on practice', 'STEM outreach']
    },
    {
      id: 'psychology-club',
      name: 'Psychology Club',
      description: 'Explores behavior and mental processes through discussion, experiments, and psychology topics.',
      sponsor: 'Rene White',
      category: 'Academic',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Monday after school',
      requirements: 'Open to all',
      activities: ['Psychology discussions', 'Mini-experiments', 'Guest lectures'],
      commitment: 'Low',
      benefits: ['Critical insight', 'Curiosity growth', 'Academic enrichment']
    },
    {
      id: 'science-national-honor-society',
      name: 'Science National Honor Society',
      description: 'Celebrates academic success in science with community tutoring and STEM outreach.',
      sponsor: 'Courtney Jewett',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Wednesday after school',
      requirements: 'Science GPA requirement and recommendation',
      activities: ['STEM tutoring', 'School outreach', 'Honor ceremonies'],
      commitment: 'Medium',
      benefits: ['Academic recognition', 'Science leadership', 'Tutoring experience']
    },
    {
      id: 'sequoia-club',
      name: 'S.E.Q.U.O.I.A Club',
      description: 'Promotes leadership, unity, opportunity, integrity, and achievement through school culture enhancement.',
      sponsor: 'Ryan Corbett',
      category: 'Leadership',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'Application required',
      activities: ['Cultural events', 'Leadership workshops', 'Campus initiatives'],
      commitment: 'Medium',
      benefits: ['Leadership development', 'School engagement', 'Peer interaction']
    },
    {
      id: 'sewa',
      name: 'SEWA',
      description: 'Encourages students to serve communities through altruistic initiatives and global outreach.',
      sponsor: 'John Clendenen',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Open to all',
      activities: ['Service events', 'Charity planning', 'Awareness campaigns'],
      commitment: 'Low to Medium',
      benefits: ['Service recognition', 'Leadership exposure', 'Community impact']
    },
    {
      id: 'sga-freshman-class',
      name: 'SGA – Freshman Class',
      description: 'Leads freshman activities and builds class unity through peer leadership and event planning.',
      sponsor: 'Kelsie Hand',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays during advisory',
      requirements: 'Elected class officers',
      activities: ['Event coordination', 'Spirit planning', 'Leadership meetings'],
      commitment: 'Medium',
      benefits: ['Leadership credentials', 'Organizational skills', 'Peer collaboration']
    },
    {
      id: 'sga-sophomore-class',
      name: 'SGA – Sophomore Class',
      description: 'Plans sophomore-specific events and fosters school spirit within the class.',
      sponsor: 'Corrine Leeman',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesdays during advisory',
      requirements: 'Elected officers',
      activities: ['Event organizing', 'Spirit weeks', 'Leadership circles'],
      commitment: 'Medium',
      benefits: ['Leadership gain', 'Event management', 'Class identity']
    },
    {
      id: 'sga-junior-class',
      name: 'SGA – Junior Class',
      description: 'Coordinates junior events and encourages class engagement through leadership roles.',
      sponsor: 'Laura Sweeney',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursdays during advisory',
      requirements: 'Elected leadership',
      activities: ['Event planning', 'Spirit contests', 'Community-building efforts'],
      commitment: 'Medium',
      benefits: ['Leadership experience', 'Event skills', 'School spirit']
    },
    {
      id: 'sga-senior-class',
      name: 'SGA – Senior Class',
      description: 'Oversees senior activities including graduation planning and senior week events.',
      sponsor: 'Erica Nelson',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays during advisory',
      requirements: 'Elected class leaders',
      activities: ['Graduation prep', 'Senior events', 'Fundraising'],
      commitment: 'High',
      benefits: ['Leadership acumen', 'Event coordination', 'Legacy building']
    },
    {
      id: 'sga-student-body',
      name: 'SGA (Entire Student Body Leaders)',
      description: 'The governing SGA body coordinating schoolwide student activities, initiatives, and representation.',
      sponsor: 'Jennifer Lombard',
      category: 'Leadership',
      meetingFrequency: 'Weekly',
      meetingDay: 'Mondays during advisory',
      requirements: 'Elected or appointed members',
      activities: ['Policy discussion', 'Event execution', 'Student representation'],
      commitment: 'High',
      benefits: ['School leadership', 'Advocacy', 'Organizational skills']
    },
    {
      id: 'smart-yogis',
      name: 'Smart Yogis',
      description: 'Supports mindfulness and mental well-being through yoga, relaxation techniques, and peer support.',
      sponsor: 'Andrew Robinson',
      category: 'Wellness',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Yoga sessions', 'Mindfulness workshops', 'Stress relief events'],
      commitment: 'Low',
      benefits: ['Wellness practice', 'Focus improvement', 'Community calm']
    },
    {
      id: 'society-for-science',
      name: 'Society for Science',
      description: 'Encourages student scientific research and inquiry in preparation for science fairs and competitions.',
      sponsor: 'Shelby Cochran',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Wednesdays after school',
      requirements: 'Application encouraged',
      activities: ['Research mentoring', 'Science proposal prep', 'Competition prep'],
      commitment: 'High during research cycle',
      benefits: ['Scientific inquiry', 'Research experience', 'Project recognition']
    },
    {
      id: 'spanish-national-honor-society',
      name: 'Spanish National Honor Society',
      description: 'Celebrates excellence in Spanish studies via cultural events, tutoring, and recognition.',
      sponsor: 'Jonathan Kent',
      category: 'Cultural',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Friday after school',
      requirements: 'High Spanish GPA plus faculty nomination',
      activities: ['Tutoring', 'Cultural celebrations', 'Induction events'],
      commitment: 'Low to Medium',
      benefits: ['Language honor', 'Cultural richness', 'Peer support']
    },
    {
      id: 'speech-debate-club',
      name: 'Speech/Debate Club',
      description: 'Enhances communication and argumentation through both speech events and debate formats.',
      sponsor: 'Mr. Mouton',
      category: 'Academic',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all',
      activities: ['Speech drills', 'Debate practices', 'Tournament prep'],
      commitment: 'Medium',
      benefits: ['Public speaking', 'Logical argument', 'Confidence building']
    },
    {
      id: 'study-smarter-not-harder',
      name: 'Study Smarter, Not Harder (SSNH)',
      description: 'Supports students in building effective study habits, time management, and academic performance.',
      sponsor: 'Marci Cooper',
      category: 'Academic',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all students',
      activities: ['Study skill workshops', 'Time-management sessions', 'Group support'],
      commitment: 'Low',
      benefits: ['Study efficiency', 'Academic success', 'Peer learning']
    },
    {
      id: 'tsa',
      name: 'Technology Student Association (TSA)',
      description: 'Advances STEM interests through technology projects, competitions, and leadership challenges.',
      sponsor: 'Wally Moon',
      category: 'STEM',
      meetingFrequency: 'Monthly',
      meetingDay: 'Third Monday after school',
      requirements: 'Membership required; interest in STEM encouraged',
      activities: ['Tech design challenges', 'Competition prep', 'Industry visits'],
      commitment: 'Medium',
      benefits: ['Innovation exposure', 'STEM credentialing', 'Competitive experience']
    },
    {
      id: 'thespian-society',
      name: 'Thespian Society',
      description: 'Honor society recognizing excellence in theatre; supports performances, conventions, and recognition.',
      sponsor: 'Kirk Grizzle',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday after school',
      requirements: 'Theatre participation and scholastic criteria',
      activities: ['Conventions', 'Performance planning', 'Peer mentoring'],
      commitment: 'Medium',
      benefits: ['Theatre honors', 'Performance leadership', 'Networking']
    },
    {
      id: 'tri-m-music-honor-society',
      name: 'Tri-M Music Honor Society',
      description: 'Recognizes musical and academic excellence; promotes service and performance within music community.',
      sponsor: 'Kayla Poor',
      category: 'Arts',
      meetingFrequency: 'Monthly',
      meetingDay: 'Second Thursday after school',
      requirements: 'Music involvement and GPA requirement',
      activities: ['Concert service', 'Music outreach', 'Honor induction'],
      commitment: 'Medium',
      benefits: ['Musical recognition', 'Service performance', 'Leadership']
    },
    {
      id: 'unicef-club',
      name: 'UNICEF Club – Denmark Chapter',
      description: 'Supports UNICEF’s mission via fundraising, awareness, and advocacy projects at the school level.',
      sponsor: 'Brittany Rhodes',
      category: 'Service',
      meetingFrequency: 'Monthly',
      meetingDay: 'First Wednesday after school',
      requirements: 'Open to all',
      activities: ['Fundraising drives', 'Awareness events', 'Campaign coordination'],
      commitment: 'Low to Medium',
      benefits: ['Global impact', 'Service involvement', 'Advocacy skills']
    },
    {
      id: 'unified-flag-football-club',
      name: 'Unified Flag Football Club',
      description: 'Promotes inclusion through mixed-ability flag football, pairing students with and without intellectual disabilities.',
      sponsor: 'Eric Carrion',
      category: 'Athletics',
      meetingFrequency: 'Weekly',
      meetingDay: 'Fridays after school',
      requirements: 'Open to all; inclusive participation encouraged',
      activities: ['Practice games', 'Fun matches', 'Team bonding'],
      commitment: 'Low',
      benefits: ['Inclusion', 'Physical activity', 'Social unity']
    },
    {
      id: 'vex-robotics',
      name: 'VEX Robotics',
      description: 'Designs robots using the VEX system to compete in regional robotics competitions.',
      sponsor: 'Wally Moon',
      category: 'STEM',
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesdays after school',
      requirements: 'Open to all; interest in robotics encouraged',
      activities: ['Robot building', 'Programming', 'Competition prep'],
      commitment: 'Medium to High',
      benefits: ['Engineering skills', 'Teamwork', 'STEM competition']
    },
    {
      id: 'women-in-stem',
      name: 'Women in STEM',
      description: 'Advocates gender diversity in STEM through mentorship, projects, and community-building events.',
      sponsor: 'Katie Praskovich',
      category: 'STEM',
      meetingFrequency: 'Biweekly',
      meetingDay: 'Thursdays after school',
      requirements: 'Open to all, especially female-identifying students',
      activities: ['Mentorship circles', 'STEM workshops', 'Guest panels'],
      commitment: 'Medium',
      benefits: ['Support networks', 'STEM encouragement', 'Role modeling']
    }
  ]
},
  {
    school: "South Forsyth High School",
    clubs:[
  {
    id: "academic-bowl",
    name: "Academic Bowl",
    description: "Competitive trivia team that practices buzzer/quick-response formats and competes in regional and state tournaments.",
    sponsor: "Laura Pearce",
    category: "Academic",
    meetingFrequency: "Weekly (seasonal)",
    meetingDay: "Mondays & Wednesdays after school (3:45–4:30 PM) during the competition season",
    requirements: "Open to all students; tryouts for official competition roster may occur before tournament season.",
    activities: ["Weekly buzzer practice", "Practice matches", "Regional & state competitions", "Research and topic workshops"],
    commitment: "Medium — weekly practices with extra time during competition season.",
    benefits: ["Improves general knowledge and quick thinking", "Teamwork and competition experience", "College resume booster"]
  },
  {
    id: "chemistry-olympiad",
    name: "Chemistry Olympiad",
    description: "Prepares students for the USNCO and other chemistry competitions through problem solving, labs, and test practice.",
    sponsor: "Cindy Philpot",
    category: "STEM",
    meetingFrequency: "Monthly (with extra prep before tests)",
    meetingDay: "Tuesdays after school (monthly study sessions; extra sessions before exam windows)",
    requirements: "Interest in chemistry; strong recommendation for students enrolled in chemistry/advanced chemistry classes.",
    activities: ["Problem sets", "Lab demonstrations", "Past USNCO practice exams", "Guest lectures from local chemists"],
    commitment: "Medium — monthly meetings plus optional extra prep for competitors.",
    benefits: ["Deeper chemistry understanding", "Competition experience", "Preparation for STEM majors"]
  },
  {
    id: "creative-writing-club",
    name: "Creative Writing Club",
    description: "A supportive community for student writers (poetry, fiction, creative non-fiction, and scripts) with peer workshops and opportunities to submit to contests and the school literary magazine.",
    sponsor: "Chelsey Favini",
    category: "Arts",
    meetingFrequency: "Biweekly",
    meetingDay: "Every other Wednesday during lunch or after school (room TBA)",
    requirements: "Open to all skill levels; submissions accepted for workshops but not required.",
    activities: ["Writer workshops", "Prompt exercises", "Publication and contest prep", "Open-mic events"],
    commitment: "Low — attend when you can; members who submit to contests may invest extra time.",
    benefits: ["Improves writing craft", "Peer feedback", "Publication/contest opportunities"]
  },
  {
    id: "debate-club",
    name: "Debate Club",
    description: "Develops public speaking, argumentation, and critical thinking through practice debates and participation in speech & debate tournaments.",
    sponsor: "Michael Holmes",
    category: "Academic",
    meetingFrequency: "Weekly",
    meetingDay: "Tuesdays after school (3:45–5:00 PM)",
    requirements: "Open membership; tryouts/select teams for tournament travel.",
    activities: ["Case writing", "Mock rounds", "Public speaking drills", "Tournament travel"],
    commitment: "Medium–High for competitive members (weekly practice + travel), Low for casual participants.",
    benefits: ["Stronger public speaking and research skills", "College admissions advantage", "Confidence and leadership"]
  },
  {
    id: "economics-club",
    name: "Economics Club",
    description: "Explores economic theory, personal finance, and hosts competitions and simulations to deepen economic literacy.",
    sponsor: "Jason Mendez",
    category: "Academic",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly meetings (day/time TBA at start of school year)",
    requirements: "Open to students interested in economics; no prerequisites.",
    activities: ["Workshops", "Simulated markets and trading games", "Preparation for econ competitions", "Guest speakers"],
    commitment: "Low–Medium — monthly meetings with optional competition prep.",
    benefits: ["Financial literacy", "Analytical thinking", "Competition and leadership opportunities"]
  },
  {
    id: "french-club",
    name: "French Club",
    description: "Promotes French language and Francophone cultures through food nights, service projects, and cultural events.",
    sponsor: "Jen Grobeck",
    category: "Cultural",
    meetingFrequency: "Monthly",
    meetingDay: "3rd Wednesday or Thursday of every month (per SFHS clubs calendar)",
    requirements: "Open to all students (no language requirement).",
    activities: ["Cultural celebrations", "Language practice meetups", "Movie nights", "Community service events"],
    commitment: "Low — monthly meetings with optional events.",
    benefits: ["Cultural exposure", "Language practice", "Community/service experience"]
  },
  {
    id: "german-club",
    name: "German Club",
    description: "Provides authentic cultural experiences, language practice, and social events celebrating German traditions.",
    sponsor: "Jonas Strecker, Steffi Legall-Riddle",
    category: "Cultural",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly (specific day/time set at start of year; typically late afternoon)",
    requirements: "Open to all students.",
    activities: ["Cultural crafts & food events", "Film/showings", "Language games", "Exchange information"],
    commitment: "Low — monthly events with optional activities.",
    benefits: ["Cultural literacy", "Language exposure", "Social connections"]
  },
  {
    id: "hsafp",
    name: "High School Alliance of Future Physicians (HSAFP)",
    description: "Supports students exploring healthcare careers via volunteering, panels with medical professionals, and hands-on learning.",
    sponsor: "Ethel Zuniga",
    category: "STEM",
    meetingFrequency: "Monthly",
    meetingDay: "First Monday of each month (after school / room posted)",
    requirements: "Interest in healthcare; preference for students considering pre-med track but open to others.",
    activities: ["Guest speakers (physicians/nurses)", "Clinical exposure opportunities", "Volunteer coordination", "College/career guidance"],
    commitment: "Medium — monthly meetings plus volunteer/externship activities.",
    benefits: ["Healthcare career exposure", "Networking with professionals", "Volunteer experience for applications"]
  },
  {
    id: "mock-trial",
    name: "Mock Trial",
    description: "Students prepare and present legal cases in courtroom-style competitions; focuses on legal reasoning, public speaking, and teamwork.",
    sponsor: "Brian Fahey",
    category: "Academic",
    meetingFrequency: "Weekly (seasonal)",
    meetingDay: "Tuesdays & Thursdays after school (seasonal practices leading up to competitions)",
    requirements: "Auditions/tryouts for competitive team; open practice roles for newcomers.",
    activities: ["Case practice", "Role-play witness/exhibit prep", "Mock courtroom scrimmages", "Community legal partnerships"],
    commitment: "High for competitors (intensive practice & travel), Medium for general participants.",
    benefits: ["Public speaking", "Critical thinking", "Pre-law experience"]
  },
  {
    id: "model-un",
    name: "Model United Nations",
    description: "Students roleplay UN delegates, researching countries and policies then participating in simulated UN committee sessions.",
    sponsor: "Dr. Julie Strecker",
    category: "Academic",
    meetingFrequency: "Monthly (plus pre-conference intensives)",
    meetingDay: "Second Friday of every month at 3:45 PM (room listed on SFHS site)",
    requirements: "Interest in world affairs and research; some conferences require application.",
    activities: ["Committee simulations", "Research and position paper writing", "Conference travel"],
    commitment: "Medium — monthly meetings with extra time before conferences.",
    benefits: ["Global awareness", "Research/writing skills", "Public speaking & networking"]
  },
  {
    id: "optimist-oratorical",
    name: "Optimist Oratorical",
    description: "Prepares students for a public speaking competition focused on persuasive, uplifting orations with scholarship opportunities.",
    sponsor: "TBD",
    category: "Leadership",
    meetingFrequency: "Monthly (seasonal before competitions)",
    meetingDay: "Meeting schedule tbd; typically increases leading up to contest deadlines",
    requirements: "Interest in public speaking; contestants prepare and submit oration following Optimist rules.",
    activities: ["Speech writing workshops", "Mock presentations", "Local contest participation"],
    commitment: "Medium — more time required during competition season.",
    benefits: ["Public speaking experience", "Potential scholarship opportunities", "Confidence building"]
  },
  {
    id: "physics-club",
    name: "Physics Club",
    description: "Explores physics through demonstrations, problem-solving, and preparation for the F=ma exam and other competitions.",
    sponsor: "Grant Butler",
    category: "STEM",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly after school (day posted at start of year)",
    requirements: "Interest in physics; students preparing for AP/competition encouraged to join.",
    activities: ["Hands-on demonstrations", "Problem-of-the-week sessions", "F=ma prep", "Guest speakers"],
    commitment: "Low–Medium — monthly meetings with extra prep for competitions.",
    benefits: ["Deeper physics knowledge", "Competition readiness", "STEM mentorship"]
  },
  {
    id: "science-olympiad",
    name: "Science Olympiad",
    description: "Prepares and competes in a wide array of STEM events covering biology, chemistry, engineering and physics.",
    sponsor: "Jenny Demos & Christie Chow",
    category: "STEM",
    meetingFrequency: "Weekly (seasonal)",
    meetingDay: "Wednesdays after school (increased frequency during competition season)",
    requirements: "Tryouts often held at beginning of the school year for some events; open interest meetings available.",
    activities: ["Event-specific labs", "Practice tests", "Regional/state competitions", "Team-building exercises"],
    commitment: "High for competitors (weekly practices + weekend competitions).",
    benefits: ["Applied STEM experience", "Teamwork", "Strong college/portfolio credential"]
  },
  {
    id: "sfhs-math-team",
    name: "SFHS Math Team",
    description: "Competitive mathematics team for students interested in contests (AMC/AIME, county meets) and group problem solving.",
    sponsor: "Carrie Paulson",
    category: "STEM",
    meetingFrequency: "Weekly",
    meetingDay: "Weekly after school (day/time posted at start of season)",
    requirements: "Open to students with interest in competitive math; different teams for various contest levels.",
    activities: ["Problem-solving practice", "Mock contests", "Regional & state competitions"],
    commitment: "Medium — weekly practice and occasional weekend competitions.",
    benefits: ["Improves quantitative reasoning", "Competition recognition", "Scholarship/college value"]
  },
  {
    id: "forensic-science-club",
    name: "SFHS Forensic Science Club",
    description: "Hands-on club exploring crime-scene investigation topics such as fingerprinting, DNA basics, ballistics, and toxicology.",
    sponsor: "Erin Loggins",
    category: "STEM",
    meetingFrequency: "Monthly",
    meetingDay: "Tuesdays after school (monthly workshops and mock crime scenes)",
    requirements: "Open to interested students; some activities require parent permission for lab work.",
    activities: ["Mock crime scenes", "Hands-on labs", "Guest speakers from forensics community"],
    commitment: "Low–Medium — monthly meetings with optional field trips.",
    benefits: ["Practical lab skills", "Insight into forensic careers", "Critical thinking"]
  },
  {
    id: "gavel-club",
    name: "SFHS Gavel Club",
    description: "Affiliated with Toastmasters — develops public speaking and leadership through structured practice and peer feedback.",
    sponsor: "Jesica Sloan",
    category: "Leadership",
    meetingFrequency: "Weekly",
    meetingDay: "Mondays after school (room posted at start of year)",
    requirements: "Open to all students interested in improving communication skills.",
    activities: ["Prepared speeches", "Impromptu speaking", "Leadership roles and mentoring"],
    commitment: "Low–Medium — weekly meetings; optional leadership path.",
    benefits: ["Confidence in public speaking", "Leadership experience", "Communication skills for college/career"]
  },
  {
    id: "spanish-club",
    name: "Spanish Club",
    description: "Celebrates Hispanic cultures and provides language practice through social and service activities.",
    sponsor: "Claudia Salamanca, Ross Ellison",
    category: "Cultural",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly (day/time TBA by sponsors)",
    requirements: "Open to all students.",
    activities: ["Cultural events", "Language games", "Community outreach"],
    commitment: "Low — monthly meetings with optional event participation.",
    benefits: ["Cultural appreciation", "Language exposure", "Service opportunities"]
  },
  {
    id: "student-ambassadors",
    name: "Student Ambassadors to the State House of Representative",
    description: "Engages students in Georgia civics with opportunities to meet legislators and learn about the legislative process.",
    sponsor: "Dr. Maria Thurmond",
    category: "Civic Engagement",
    meetingFrequency: "Occasional / by appointment",
    meetingDay: "Sporadic meetings and organized visits to the State House (dates posted when available)",
    requirements: "Application/selection often required to represent the school.",
    activities: ["Legislative visits", "Civics workshops", "Advocacy projects"],
    commitment: "Medium — depends on events and legislator schedules.",
    benefits: ["Civic knowledge", "Networking with officials", "Leadership and resume value"]
  },
  {
    id: "wistem",
    name: "WiSTEM (Women in STEM)",
    description: "Supports and encourages female-identifying students interested in STEM through mentorship, projects, and outreach.",
    sponsor: "Kelsey Fusco",
    category: "STEM",
    meetingFrequency: "Monthly",
    meetingDay: "IF or one Wednesday morning each month (per tech clubs page)",
    requirements: "Open to all who support the mission; outreach projects may have volunteer requirements.",
    activities: ["STEM mentorship", "Project showcases", "Field trips and speaker events"],
    commitment: "Low–Medium — monthly meetings plus occasional events.",
    benefits: ["Mentoring", "STEM community", "Confidence and college/career preparation"]
  },
  {
    id: "deca",
    name: "DECA",
    description: "Prepares students for careers in marketing, finance, hospitality, and management via competitive events and leadership development.",
    sponsor: "Katie Urbanovitch, Kristy Heath",
    category: "Business",
    meetingFrequency: "Weekly (typical CTSO cadence)",
    meetingDay: "Weekly after school (day commonly Thursdays; exact schedule posted by advisors)",
    requirements: "Membership/dues required for competitive participation; open to students in business/marketing pathways.",
    activities: ["Competitive event prep", "Business simulations", "Community service and leadership workshops"],
    commitment: "Medium–High for competitors (regular meetings + weekend competitions).",
    benefits: ["Career skills", "Competitive achievement", "Networking and scholarship opportunities"]
  },
  {
    id: "fbla",
    name: "FBLA (Future Business Leaders of America)",
    description: "Builds leadership and career skills through competitions, workshops, and community projects for students interested in business.",
    sponsor: "Yonk, Burlison, Zhou, Moultrie, Moody",
    category: "Business",
    meetingFrequency: "Weekly",
    meetingDay: "Generally Thursdays after school (per SFHS CTSO listing)",
    requirements: "Open to students; membership dues for state/national participation.",
    activities: ["Competitive events", "Resume/workshop sessions", "Service projects"],
    commitment: "Medium — weekly meetings with additional time for competitions.",
    benefits: ["Business skill development", "Leadership", "Career exploration"]
  },
  {
    id: "fccla",
    name: "FCCLA",
    description: "Career & technical organization focused on family and consumer sciences pathways with leadership and competitive events.",
    sponsor: "Mikki Cossin, Dawn Martin",
    category: "CTAE",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly meetings (day posted by sponsors; typically Wednesday mornings)",
    requirements: "Open to students in relevant CTAE pathways; membership may require dues.",
    activities: ["Project-based competitions", "Leadership training", "Community outreach"],
    commitment: "Medium — project timeline dependent.",
    benefits: ["CTAE pathway experience", "Leadership", "Competitions and scholarships"]
  },
  {
    id: "hosa",
    name: "HOSA",
    description: "Student organization for future health professionals offering leadership development and health science competitions.",
    sponsor: "Jennifer Clendenan, Trish Hungerbuhler, Kaylee Brower",
    category: "Healthcare",
    meetingFrequency: "Monthly (with extra competition prep)",
    meetingDay: "Meetings scheduled at 3:45 PM (exact day posted by advisors)",
    requirements: "Open to students interested in healthcare careers; membership may include dues for contests.",
    activities: ["Clinical skills workshops", "Health career panels", "Competitive event prep"],
    commitment: "Medium — extra time if competing.",
    benefits: ["Healthcare exposure", "Clinical skill development", "Networking"]
  },
  {
    id: "skillsusa",
    name: "SkillsUSA",
    description: "Develops leadership and technical skills for the workforce with emphasis on CTAE pathways such as AV/film production.",
    sponsor: "Vincent Saponara",
    category: "CTAE",
    meetingFrequency: "Biweekly (typical)",
    meetingDay: "Biweekly after school (meeting room posted by sponsor; project work often required)",
    requirements: "Students in CTAE pathways encouraged; membership may require dues.",
    activities: ["Technical competitions", "Shop/project work", "Leadership development"],
    commitment: "Medium — project timelines and competitions may increase commitment.",
    benefits: ["Workforce skills", "Certifications and competitions", "Career readiness"]
  },
  {
    id: "tsa",
    name: "Technology Student Association (TSA)",
    description: "Engineering & technology student organization focusing on invention, design projects, and competitive events.",
    sponsor: "Travis Hodges",
    category: "STEM",
    meetingFrequency: "Weekly",
    meetingDay: "Tuesdays & Thursdays (per technology clubs page)",
    requirements: "Open to students with interest in engineering/technology pathways.",
    activities: ["Team design projects", "Competition prep", "Workshops in CAD/engineering"],
    commitment: "Medium — weekly meetings + competition preparation.",
    benefits: ["Hands-on technical experience", "Competition awards", "STEM career exploration"]
  },
  {
    id: "french-honor-society",
    name: "French Honor Society",
    description: "Recognizes achievement in French and supports cultural activities for students studying the language.",
    sponsor: "Jen Grobeck",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "3rd Wednesday or Thursday of every month",
    requirements: "Usually requires teacher nomination/grade threshold (details via sponsor).",
    activities: ["Cultural events", "Tutoring/mentoring", "Honor society service projects"],
    commitment: "Low–Medium — monthly meetings and occasional events.",
    benefits: ["Recognition for language achievement", "Leadership/service opportunities"]
  },
  {
    id: "mu-alpha-theta",
    name: "Mu Alpha Theta",
    description: "Math honor society encouraging participation in mathematics activities and recognizing excellence.",
    sponsor: "Stacey Anderson",
    category: "Honor Society",
    meetingFrequency: "Weekly (start-of-year orientation then monthly)",
    meetingDay: "Wednesdays (first meeting announced at start of year; see sponsor for exact dates)",
    requirements: "Typically minimum math GPA/teacher recommendation; application via sponsor.",
    activities: ["Problem-solving sessions", "Math outreach", "Competition coordination"],
    commitment: "Medium for officers/competitors; Low for members.",
    benefits: ["Academic recognition", "Math enrichment", "Scholarship possibilities"]
  },
  {
    id: "national-art-honor-society",
    name: "National Art Honor Society",
    description: "Recognizes artistic achievement; members promote art in the school and community and organize exhibits.",
    sponsor: "Sarah Rising, Sherry Allen, Joe Parson",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "Last Monday of the month",
    requirements: "Nomination-based for juniors and seniors; portfolio review is typical.",
    activities: ["Gallery shows", "Community art projects", "Peer mentoring"],
    commitment: "Medium — meetings plus project work for events.",
    benefits: ["Recognition", "Portfolio development", "Community outreach"]
  },
  {
    id: "national-english-honor-society",
    name: "National English Honor Society",
    description: "Honors excellence in English and encourages participation in literary projects and service.",
    sponsor: "Daneen Daws",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "1st Thursday of the month @ 8:00 AM",
    requirements: "Selection typically for juniors and seniors meeting GPA/English criteria.",
    activities: ["Literary events", "Service projects", "Publication opportunities"],
    commitment: "Low–Medium — monthly meetings plus event participation.",
    benefits: ["Academic recognition", "Leadership in literary activities"]
  },
  {
    id: "national-honor-society",
    name: "National Honor Society",
    description: "Recognizes students for scholarship, leadership, character, and service and organizes service projects and leadership activities.",
    sponsor: "Jordan White",
    category: "Honor Society",
    meetingFrequency: "Weekly / as-needed",
    meetingDay: "Tuesdays (regular meeting day announced by sponsor)",
    requirements: "Selection based on GPA, service, leadership and faculty recommendations.",
    activities: ["Service projects", "Peer tutoring", "Leadership training"],
    commitment: "Medium — monthly service hours and leadership responsibilities.",
    benefits: ["National recognition", "Leadership development", "College resume enhancement"]
  },
  {
    id: "national-latin-honor-society",
    name: "National Latin Honor Society",
    description: "Promotes excellence in Latin studies and rewards high-achieving students.",
    sponsor: "Eric Eben",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "Usually once a month after the school year begins",
    requirements: "Typically requires an A in Latin I and other academic criteria.",
    activities: ["Cultural events", "Tutoring", "Community service"],
    commitment: "Low–Medium — monthly involvement and event work.",
    benefits: ["Recognition for classical studies", "Leadership opportunities"]
  },
  {
    id: "nstem",
    name: "National STEM Honor Society (NSTEM)",
    description: "Recognizes students who excel in STEM; promotes STEM outreach and academic enrichment.",
    sponsor: "Rachel Collins",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly Wednesday morning meetings",
    requirements: "Open to grades 10–12; minimum GPA 3.5 and STEM coursework requirement.",
    activities: ["STEM outreach", "Speaker series", "Competition support"],
    commitment: "Medium — monthly meetings plus outreach events.",
    benefits: ["Academic recognition", "STEM networking", "Scholarship information"]
  },
  {
    id: "nths",
    name: "National Technical Honor Society (NTHS)",
    description: "Honors excellence in Career & Technical Education pathways and connects students to scholarships/employers.",
    sponsor: "Carla Yonk",
    category: "Honor Society",
    meetingFrequency: "Monthly (seasonal)",
    meetingDay: "3rd Thursday of each month (starting in October)",
    requirements: "Students in CTAE pathways; selection based on achievement and character.",
    activities: ["Recognition events", "Career networking", "Scholarship guidance"],
    commitment: "Medium — meetings and career-pathway projects.",
    benefits: ["Professional connections", "Recognition", "Scholarship access"]
  },
  {
    id: "psi-alpha",
    name: "Psi Alpha – Psychology National Honor Society",
    description: "For students interested in psychology; promotes academic excellence and exploration of the field.",
    sponsor: "Tricia Pileggi",
    category: "Honor Society",
    meetingFrequency: "TBD",
    meetingDay: "TBD (sponsor will post meeting schedule)",
    requirements: "Interest in psychology; typical chapter criteria include course completion and GPA.",
    activities: ["Psychology talks", "Research exposure", "Community outreach"],
    commitment: "Low–Medium depending on involvement.",
    benefits: ["Exploration of psychology", "Academic recognition", "Networking opportunities"]
  },
  {
    id: "rho-kappa",
    name: "Rho Kappa",
    description: "Social Studies Honor Society that promotes civic engagement and excellence in history and social sciences.",
    sponsor: "Brad Frilot, Christin Funderburk",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "Second Thursday before school once a month",
    requirements: "Selection based on social studies achievement and teacher nomination.",
    activities: ["Civic projects", "History events", "Field trips"],
    commitment: "Low–Medium — monthly meetings plus project work.",
    benefits: ["Recognition in social studies", "Civic engagement experience"]
  },
  {
    id: "science-nhs",
    name: "Science National Honor Society",
    description: "Encourages excellence in science through meetings, speakers, outreach, and competition involvement.",
    sponsor: "Cindy Philpot, Amanda Colavito",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "Tuesday after school, once a month",
    requirements: "Selection based on science achievement and involvement.",
    activities: ["Guest speakers", "Science outreach", "Competition support"],
    commitment: "Medium — monthly meetings plus outreach and competition commitments.",
    benefits: ["Recognition", "Science community involvement", "Competition help"]
  },
  {
    id: "spanish-nhs",
    name: "Spanish National Honor Society",
    description: "Promotes excellence in Spanish study and Hispanic cultures; offers trips, conventions, and service.",
    sponsor: "Ross Ellison, Claudia Salamanca",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "TBD (meetings typically monthly; sponsor will post schedule)",
    requirements: "Selection based on Spanish coursework, grades, and service requirements.",
    activities: ["Cultural events", "Service projects", "Conventions & trips"],
    commitment: "Medium — meetings plus event/trip participation.",
    benefits: ["Language recognition", "Travel and convention experience", "Leadership"]
  },
  {
    id: "black-student-union",
    name: "Black Student Union",
    description: "Promotes diversity, inclusion, and education about Black history and culture through events and programming across campus.",
    sponsor: "Melissa Audorff",
    category: "Cultural",
    meetingFrequency: "Monthly",
    meetingDay: "Wednesdays during IF once a month in Room 449 (sign up via student support time)",
    requirements: "Open to all students.",
    activities: ["Heritage events", "Panel discussions", "Community outreach"],
    commitment: "Low — monthly meetings with occasional events.",
    benefits: ["Increased cultural awareness", "Community building", "Leadership experience"]
  },
  {
    id: "brain-bee-club",
    name: "Brain Bee Club",
    description: "Prepares students for neuroscience competitions such as the Atlanta Brain Bee and promotes brain science awareness.",
    sponsor: "Adrian Antonini",
    category: "STEM",
    meetingFrequency: "Biweekly",
    meetingDay: "Bi-weekly at 3:45 PM in Room 1312",
    requirements: "Interest in neuroscience; competition team members may have extra prep commitments.",
    activities: ["Competition prep", "Workshops", "Guest lectures"],
    commitment: "Medium during competition season.",
    benefits: ["Neuroscience knowledge", "Competition experience", "Mental health awareness work"]
  },
  {
    id: "book-club",
    name: "Book Club",
    description: "Students read and discuss selected books in a relaxed, literary environment. Open to readers of all genres.",
    sponsor: "Ashley Fireall",
    category: "Literary",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly (lunchtime or after school; schedule posted by sponsor)",
    requirements: "Open to all readers.",
    activities: ["Group discussions", "Reading challenges", "Author spotlights"],
    commitment: "Low — monthly meetings.",
    benefits: ["Improves reading and discussion skills", "Community with fellow readers"]
  },
  {
    id: "civic-awareness-club",
    name: "Civic Awareness Club",
    description: "A forum for students to discuss civic matters, local government, and community engagement opportunities.",
    sponsor: "Chelsea Favini, Jonas Strecker",
    category: "Civic Engagement",
    meetingFrequency: "Bi-monthly",
    meetingDay: "Bi-monthly in Room 644 (day varies; check school calendar)",
    requirements: "Open to students interested in civic issues.",
    activities: ["Discussions", "Voter registration drives", "Civic projects"],
    commitment: "Low — bi-monthly meetings.",
    benefits: ["Civic knowledge", "Community impact", "Leadership development"]
  },
  {
    id: "environmental-club",
    name: "Environmental Club",
    description: "Promotes sustainability on campus and in the community through projects, clean-ups and awareness campaigns.",
    sponsor: "Leigh Anne Donnelly, Tasha Ryles",
    category: "Service",
    meetingFrequency: "Weekly",
    meetingDay: "Weekly (early morning at 7:50 AM in Room 486)",
    requirements: "Open to all students.",
    activities: ["Campus clean-ups", "Recycling initiatives", "Awareness events"],
    commitment: "Low–Medium depending on project work.",
    benefits: ["Environmental stewardship", "Service hours", "Leadership"]
  },
  {
    id: "evosol-pediatrics",
    name: "EvoSol Pediatrics",
    description: "Club focused on pediatric healthcare awareness and advocacy, including fundraising and awareness campaigns.",
    sponsor: "Kelsey Fusco",
    category: "Healthcare",
    meetingFrequency: "Monthly",
    meetingDay: "First Monday of the month in Room 489",
    requirements: "Interest in pediatric healthcare and advocacy.",
    activities: ["Awareness campaigns", "Fundraisers", "Panel discussions"],
    commitment: "Low–Medium depending on events.",
    benefits: ["Healthcare advocacy experience", "Volunteer opportunities", "Leadership"]
  },
  {
    id: "fca",
    name: "Fellowship of Christian Athletes (FCA)",
    description: "Provides fellowship and leadership opportunities for students, particularly athletes, rooted in Christian values.",
    sponsor: "Kelsey Fusco, Rachel Munn",
    category: "Faith-Based",
    meetingFrequency: "Weekly (leadership) / Biweekly (all-student)",
    meetingDay: "Tuesdays for leadership staff; every other Friday open to entire student body",
    requirements: "Open to all students; emphasis on student-athletes in outreach.",
    activities: ["Group devotionals", "Community service", "Leadership training"],
    commitment: "Low–Medium depending on level of involvement.",
    benefits: ["Spiritual support", "Community building", "Leadership opportunities"]
  },
  {
    id: "improv-club",
    name: "Improv Club",
    description: "Inclusive improv and theatre games to develop spontaneity, creativity, and comedic timing.",
    sponsor: "Grant Butler",
    category: "Arts",
    meetingFrequency: "Weekly",
    meetingDay: "Fridays after school in Room 1150",
    requirements: "Open to all skill levels.",
    activities: ["Theatre games", "Short-form improv exercises", "Performance nights"],
    commitment: "Low — weekly practice; performances optional.",
    benefits: ["Creativity", "Confidence", "Stage presence"]
  },
  {
    id: "indian-student-association",
    name: "Indian Student Association (ISA)",
    description: "Celebrates Indian culture and traditions through cultural events and community gatherings.",
    sponsor: "James Pratt",
    category: "Cultural",
    meetingFrequency: "Monthly",
    meetingDay: "Friday mornings monthly in Mr. Pratt’s room",
    requirements: "Open to all students.",
    activities: ["Cultural celebrations", "Festivals", "Community outreach"],
    commitment: "Low — monthly meetings and event planning.",
    benefits: ["Cultural connection", "Event leadership", "Community building"]
  },
  {
    id: "just-one-africa",
    name: "Just One Africa",
    description: "Service club supporting clean water and education projects for vulnerable children in Kenya through fundraising and awareness.",
    sponsor: "Wendy Burkus",
    category: "Service",
    meetingFrequency: "Monthly",
    meetingDay: "First Tuesday of the month in Room 647 at 7:45 AM",
    requirements: "Open to students committed to the service mission.",
    activities: ["Fundraisers", "Awareness campaigns", "Partnerships with NGOs"],
    commitment: "Low–Medium depending on project timelines.",
    benefits: ["Global service experience", "Project management", "Community impact"]
  },
  {
    id: "kpop-club",
    name: "K-pop Club",
    description: "A social and dance club to celebrate K-pop music, choreography, and Korean media.",
    sponsor: "Erin Jones",
    category: "Cultural",
    meetingFrequency: "Biweekly",
    meetingDay: "Twice a month on Fridays from 4:00–5:00 PM in Room 369",
    requirements: "Open to all students.",
    activities: ["Dance sessions", "Music/video discussions", "Showcase events"],
    commitment: "Low — biweekly meetings.",
    benefits: ["Social connection", "Dance practice", "Event participation"]
  },
  {
    id: "logic-strategy-club",
    name: "Logic and Strategy Game Club",
    description: "Club for fans of logic and strategy games (card games, tabletop, Rubik’s Cubes) with casual play and competitions.",
    sponsor: "CJ Ash",
    category: "Recreational",
    meetingFrequency: "Monthly",
    meetingDay: "Wednesday once per month in Room 1422 from 3:45–4:30 PM",
    requirements: "Open to all students; bring games if you have them.",
    activities: ["Game nights", "Local competitions", "Strategy workshops"],
    commitment: "Low — monthly meetups.",
    benefits: ["Strategic thinking", "Socializing", "Low-pressure competition"]
  },
  {
    id: "muslim-student-association",
    name: "Muslim Students Association (MSA)",
    description: "Hosts social, cultural, and interfaith events rooted in Islamic tradition and provides a safe space for dialogue.",
    sponsor: "Jenna Kasmarik",
    category: "Cultural",
    meetingFrequency: "Monthly",
    meetingDay: "Once per month after school in Ms. Kasmarik’s room",
    requirements: "Open to all students.",
    activities: ["Cultural events", "Interfaith dialogues", "Community service"],
    commitment: "Low — monthly meetings.",
    benefits: ["Cultural connection", "Faith-based community", "Interfaith understanding"]
  },
  {
    id: "pride-club",
    name: "Pride Club",
    description: "Supports LGBTQ+ students and allies through advocacy, education, and inclusive social events.",
    sponsor: "Megan Mendez",
    category: "Inclusion",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly (day/time TBA by sponsor)",
    requirements: "Open to all students; inclusive environment.",
    activities: ["Support meetings", "Awareness events", "Advocacy projects"],
    commitment: "Low — monthly meetings with optional events.",
    benefits: ["Support network", "Advocacy experience", "Safe space"]
  },
  {
    id: "sikh-student-association",
    name: "Sikh Student Association",
    description: "A place for Sikh students to connect, celebrate faith and culture, and educate the campus community.",
    sponsor: "Chelsey Favini",
    category: "Cultural",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly (rotates depending on member availability)",
    requirements: "Open to Sikh students and allies.",
    activities: ["Cultural gatherings", "Community service", "Education events"],
    commitment: "Low — occasional events.",
    benefits: ["Faith/cultural community", "Leadership opportunities"]
  },
  {
    id: "sewa",
    name: "SEWA",
    description: "Promotes selfless service with regular community service projects and volunteer coordination.",
    sponsor: "Laura Pearce",
    category: "Service",
    meetingFrequency: "Bi-monthly",
    meetingDay: "Twice per month in Room 1428 (specific days TBA)",
    requirements: "Open to students who wish to serve.",
    activities: ["Volunteer projects", "Community outreach", "Fundraising"],
    commitment: "Low–Medium depending on service projects.",
    benefits: ["Service hours", "Community impact", "Leadership"]
  },
  {
    id: "sofo-cornhole-eagle-stars",
    name: "SoFo Cornhole Eagle Stars",
    description: "Inclusive cornhole club aimed at students in SI programs with support from general education students.",
    sponsor: "Christine Tuttle, Francesa Higham, Sydney Littleton",
    category: "Recreational",
    meetingFrequency: "Biweekly",
    meetingDay: "Every other Wednesday starting Sep 10, 2025 from 3:45–4:30 PM (seasonal schedule)",
    requirements: "Open to SI program students and general ed supporters.",
    activities: ["Cornhole practice", "Inclusive social events", "Inter-school exhibitions"],
    commitment: "Low — biweekly participation.",
    benefits: ["Inclusive recreation", "Social engagement", "Motor skill development"]
  },
  {
    id: "equestrian-team",
    name: "South Forsyth Equestrian Team",
    description: "Varsity-level equestrian team competing in IEA Hunt Seat Equitation; practices are off-campus at local barns.",
    sponsor: "Gina Calvird",
    category: "Athletics",
    meetingFrequency: "Seasonal",
    meetingDay: "Practices scheduled off-campus (coach arranges; competition season Sept–Jan)",
    requirements: "Tryouts or riding proficiency typically required; membership often requires off-campus lesson arrangements.",
    activities: ["Off-site lessons", "IEA competitions", "Team conditioning"],
    commitment: "High — seasonal competition commitment and off-campus lessons.",
    benefits: ["Equestrian competition experience", "College recruiting potential", "Responsibility and horsemanship"]
  },
  {
    id: "southside-dance-co",
    name: "Southside Dance Co",
    description: "Student-choreographed dance group performing in semester showcases including hip-hop, contemporary and classical styles.",
    sponsor: "Erin Maley",
    category: "Arts",
    meetingFrequency: "Weekly",
    meetingDay: "Mondays 4:00–6:00 PM in East Commons",
    requirements: "Auditions for performance slots possible; open rehearsals available for members.",
    activities: ["Choreography creation", "Showcase rehearsals", "Performance production"],
    commitment: "Medium — weekly rehearsals plus show tech rehearsals.",
    benefits: ["Performance experience", "Choreography skills", "Teamwork"]
  },
  {
    id: "sports-medicine-club",
    name: "Sports Medicine Club",
    description: "Hands-on exposure to sports medicine; students assist athletic trainers and learn injury prevention and taping techniques.",
    sponsor: "Luke Wagner",
    category: "Healthcare",
    meetingFrequency: "Monthly",
    meetingDay: "Wednesday morning, once a month in Room 563",
    requirements: "Interest in sports medicine; some activities require permission/medical clearance.",
    activities: ["Practical training", "Event support for athletics", "First aid workshops"],
    commitment: "Medium — monthly meetings plus volunteer hours at events.",
    benefits: ["Practical skills", "Volunteer hours", "Healthcare/career exploration"]
  },
  {
    id: "student-council",
    name: "Student Council",
    description: "Representative body for students that organizes spirit events, service projects, and student engagement activities.",
    sponsor: "Madison Kimbrell, Anne Knight (Perry)",
    category: "Leadership",
    meetingFrequency: "Monthly",
    meetingDay: "Last Thursday of each month",
    requirements: "Elected or appointed representatives; some positions require teacher sponsor approval.",
    activities: ["School spirit events", "Project committees", "Service coordination"],
    commitment: "Medium — monthly meetings and additional work for events.",
    benefits: ["Leadership experience", "Event planning skills", "Student advocacy"]
  },
  {
    id: "figure-skating-club",
    name: "War Eagle Figure Skating Club",
    description: "Club for students interested in figure skating; coordinates practice and local ice time.",
    sponsor: "Emy Palermo",
    category: "Athletics",
    meetingFrequency: "Weekly (off-campus)",
    meetingDay: "TBD (off-campus ice time; sponsor posts schedule)",
    requirements: "Own transport to rink and basic skating proficiency recommended.",
    activities: ["Ice practice", "Skating lessons", "Local events & shows"],
    commitment: "Medium — regular off-campus practice.",
    benefits: ["Physical fitness", "Skating skills", "Performance opportunities"]
  },
  {
    id: "womens-student-association",
    name: "Women’s Student Association",
    description: "Safe space for students to celebrate female identity and advocate for improvements across campus.",
    sponsor: "Chelsea Favini, Emma Daklouche, Haley Bean",
    category: "Leadership",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly after school in Room 644",
    requirements: "Open to all genders supportive of the club mission.",
    activities: ["Discussion groups", "Advocacy campaigns", "Guest speakers"],
    commitment: "Low — monthly meetings with optional engagement.",
    benefits: ["Advocacy experience", "Peer support", "Leadership development"]
  },
  {
    id: "alzheimers-foundation-club",
    name: "Alzheimer’s Foundation of America Club",
    description: "Raises awareness about Alzheimer’s and volunteers at events supporting affected families and research.",
    sponsor: "Laura Pearce",
    category: "Service",
    meetingFrequency: "Monthly",
    meetingDay: "Once per month in Room 1428",
    requirements: "Open to students interested in Alzheimer’s awareness and fundraising.",
    activities: ["Awareness events", "Volunteer staffing for local events", "Fundraising campaigns"],
    commitment: "Low — monthly meetings with event involvement.",
    benefits: ["Service hours", "Community impact", "Health education"]
  },
  {
    id: "beta-club",
    name: "Beta Club",
    description: "Recognizes academic achievement and promotes character, service, and leadership through school and community projects.",
    sponsor: "Megan Hart, Stephanie Lovelace",
    category: "Honor Society",
    meetingFrequency: "Monthly (virtual option)",
    meetingDay: "Virtual meetings once per month (materials posted to Canvas)",
    requirements: "Academic achievement and teacher recommendations; selection criteria set by sponsor.",
    activities: ["Service projects", "Recognition ceremonies", "Leadership workshops"],
    commitment: "Medium — service hours required for active members.",
    benefits: ["Academic recognition", "Service leadership", "Scholarship opportunities"]
  },
  {
    id: "habitat-for-humanity",
    name: "Habitat for Humanity",
    description: "Partnered service club that helps build and improve homes for people in need through hands-on volunteer work.",
    sponsor: "Jonas Strecker",
    category: "Service",
    meetingFrequency: "Project-based (monthly/off-campus)",
    meetingDay: "Project dates scheduled with Habitat (check sponsor for calendar)",
    requirements: "Open to volunteers; parental consent required for minors on construction sites.",
    activities: ["Build days", "Fundraisers", "Community outreach"],
    commitment: "Medium — project participation sometimes requires weekend time.",
    benefits: ["Hands-on service", "Community impact", "Practical skills"]
  },
  {
    id: "interact-club",
    name: "Interact Club",
    description: "Youth branch of Rotary International focused on student-led service projects and community improvement.",
    sponsor: "Emma Daklouche",
    category: "Service",
    meetingFrequency: "Monthly",
    meetingDay: "Once a month in Room 641",
    requirements: "Open to students who want to lead community service projects.",
    activities: ["Service drives", "Local projects", "Fundraising"],
    commitment: "Low–Medium — monthly meetings plus occasional event work.",
    benefits: ["Community service hours", "Leadership", "Networking with Rotary"]
  },
  {
    id: "junior-civitan",
    name: "Junior Civitan",
    description: "Volunteer organization focused on serving community needs and helping individuals with developmental disabilities.",
    sponsor: "John Arant",
    category: "Service",
    meetingFrequency: "Monthly / project-based",
    meetingDay: "Meeting schedule posted by sponsor (project dates vary)",
    requirements: "Open to students; consistent volunteer participation encouraged.",
    activities: ["Service projects", "Advocacy", "Social events with service focus"],
    commitment: "Low–Medium depending on projects.",
    benefits: ["Service experience", "Advocacy", "Leadership"]
  },
  {
    id: "junior-optimist",
    name: "Junior Optimist International",
    description: "Promotes citizenship, teamwork, and leadership through community service and school activities.",
    sponsor: "Erin Jones",
    category: "Service",
    meetingFrequency: "Biweekly",
    meetingDay: "Second & fourth Tuesday of the month in Room 369 from 7:45–8:15 AM",
    requirements: "Open to students wanting to serve their community.",
    activities: ["Service projects", "Leadership activities", "School events"],
    commitment: "Low–Medium — biweekly morning meetings.",
    benefits: ["Service hours", "Leadership experience", "Teamwork"]
  },
  {
    id: "madhatter-knits",
    name: "Madhatter Knits Club",
    description: "Knits mini beanies for premature babies in NICUs — a creative club with a charitable mission.",
    sponsor: "Stacey Anderson",
    category: "Service",
    meetingFrequency: "Monthly (schedule TBA)",
    meetingDay: "TBD (sponsor posts meeting times)",
    requirements: "Open to knitters and beginners welcome.",
    activities: ["Knitting sessions", "Donation drives", "Community partnerships"],
    commitment: "Low — make and donate items at members' pace.",
    benefits: ["Hands-on charity work", "Craft skills", "Community impact"]
  },
  {
    id: "md-junior",
    name: "MD Junior",
    description: "Service & learning club for students interested in medicine and allied health fields.",
    sponsor: "Angela Piszczek",
    category: "Healthcare",
    meetingFrequency: "Monthly",
    meetingDay: "First Tuesday of the month at 3:45 PM in West Commons",
    requirements: "Interest in medical careers; open to all students.",
    activities: ["Healthcare panels", "Service learning projects", "Clinical exposure info"],
    commitment: "Low–Medium — monthly meetings and optional volunteering.",
    benefits: ["Healthcare exposure", "Mentorship", "Volunteer experience"]
  },
  {
    id: "red-cross-club",
    name: "Red Cross Club",
    description: "Affiliated with the American Red Cross; organizes blood drives, safety trainings and disaster-relief support.",
    sponsor: "Madison Fletcher",
    category: "Service",
    meetingFrequency: "Monthly",
    meetingDay: "First Monday of the month at 7:50 AM in Room 564",
    requirements: "Open to students; training and background checks may be required for certain activities.",
    activities: ["Blood drives", "First aid/CPR workshops", "Disaster-preparedness events"],
    commitment: "Low–Medium depending on event involvement.",
    benefits: ["First aid/CPR skills", "Service hours", "Leadership and event management"]
  },
  {
    id: "sources-of-strength",
    name: "Sources of Strength",
    description: "Strength-based wellbeing program that promotes resilience, help-seeking, and connectedness schoolwide.",
    sponsor: "SFHS Counseling Department",
    category: "Wellness",
    meetingFrequency: "Monthly / program-driven",
    meetingDay: "TBD (program events scheduled throughout the year)",
    requirements: "Selection or interest in peer-support programming.",
    activities: ["Resilience campaigns", "Peer mentoring", "Awareness events"],
    commitment: "Low–Medium depending on role.",
    benefits: ["Mental-health advocacy", "Peer leadership", "Wellness training"]
  },
  {
    id: "special-olympics",
    name: "Special Olympics",
    description: "Promotes inclusion through athletic experiences for individuals with intellectual disabilities and community volunteers.",
    sponsor: "John Arant",
    category: "Service",
    meetingFrequency: "Event-based / seasonal",
    meetingDay: "Schedules vary with Special Olympics events; sponsor posts opportunities",
    requirements: "Open to volunteers and student athletes; training may be provided.",
    activities: ["Coaching/volunteering", "Unified sports", "Fundraising"],
    commitment: "Low–Medium depending on event involvement.",
    benefits: ["Inclusive service", "Coaching experience", "Community engagement"]
  },
  {
    id: "unicef-club",
    name: "UNICEF Club",
    description: "Student-led organization supporting children's rights worldwide through education, advocacy and fundraising.",
    sponsor: "Leigh Anne Donnelly, Tasha Ryles",
    category: "Service",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly (day/time posted by sponsors)",
    requirements: "Open to students interested in global child welfare.",
    activities: ["Fundraising drives", "Awareness campaigns", "Service projects"],
    commitment: "Low–Medium — monthly meetings and campaign involvement.",
    benefits: ["Global advocacy experience", "Service hours", "Leadership"]
  },
  {
    id: "vibha-club",
    name: "Vibha Club",
    description: "Student-led service organization focused on improving the lives of underprivileged children through education and outreach.",
    sponsor: "Ethel Zuniga",
    category: "Service",
    meetingFrequency: "Monthly",
    meetingDay: "3rd Thursday of the month",
    requirements: "Open to students committed to service for children.",
    activities: ["Fundraisers", "Tutoring programs", "Community outreach"],
    commitment: "Low–Medium depending on project roles.",
    benefits: ["Service experience", "Project management", "Cross-cultural awareness"]
  },
  {
    id: "volunteers-in-action",
    name: "Volunteers in Action (VIA)",
    description: "Student-led service club that organizes campus cleanups and off-campus community service projects weekly.",
    sponsor: "Claudia Salamanca",
    category: "Service",
    meetingFrequency: "Weekly",
    meetingDay: "Weekly meetings (schedule posted by sponsor)",
    requirements: "Positive attitude and willingness to help; open to all students.",
    activities: ["School cleanups", "Off-campus volunteer events", "Service coordination"],
    commitment: "Low–Medium — weekly opportunities, flexible participation.",
    benefits: ["Regular service hours", "Community impact", "Leadership experience"]
  },
  {
    id: "thespian-society",
    name: "Thespian Society",
    description: "Honor society for theatre students recognizing achievement and supporting theatre excellence on campus.",
    sponsor: "Joni Smithwick, Rachel Munn",
    category: "Arts",
    meetingFrequency: "Monthly / event-driven",
    meetingDay: "Meeting schedule posted with theatre program events (monthly typical)",
    requirements: "Membership by nomination/points system tied to theatre participation.",
    activities: ["Production support", "Theatre honors events", "Community performances"],
    commitment: "Medium — involvement in productions required for active members.",
    benefits: ["Theatre recognition", "Performance opportunities", "Networking in arts"]
  },
  {
    id: "tri-m-honor-society",
    name: "Tri-M Music Honor Society",
    description: "Recognizes musical and academic achievement and offers community service opportunities through music.",
    sponsor: "Rachel Munn",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "Monthly (day/time posted by sponsor)",
    requirements: "Musical and academic achievement required; selection by music faculty.",
    activities: ["Performance service", "Community concerts", "Music outreach"],
    commitment: "Medium — regular performances and service.",
    benefits: ["Music leadership", "Performance opportunities", "Recognition"]
  },
  {
    id: "cyberpatriot-teams",
    name: "Cyberpatriot Competition Teams",
    description: "Competes in CyberPatriot with hands-on cyber defense challenges to develop IT/cybersecurity skills.",
    sponsor: "Lidan Zhou",
    category: "STEM",
    meetingFrequency: "Weekly",
    meetingDay: "Mondays after school",
    requirements: "Interest in cybersecurity/IT; team tryouts for competition rosters.",
    activities: ["System hardening practice", "Virtual lab exercises", "National cyber competitions"],
    commitment: "Medium–High during competition windows.",
    benefits: ["Technical cybersecurity skills", "Competition credentials", "Career pathways"]
  },
  {
    id: "first-robotics",
    name: "FIRST Robotics Competition",
    description: "Students design, build, and program robots to compete in a yearly challenge that simulates real-world engineering projects.",
    sponsor: "John Hendy",
    category: "STEM",
    meetingFrequency: "Biweekly/weekly (seasonal ramp-up)",
    meetingDay: "Mondays & Thursdays after school",
    requirements: "Team selection; prior experience helpful but not required (roles for all skill levels).",
    activities: ["Robot design & build", "Programming", "Competition travel"],
    commitment: "High — time-intensive during build season and competitions.",
    benefits: ["Engineering experience", "College/career readiness", "Teamwork & fundraising"]
  },
  {
    id: "girls-who-code",
    name: "Girls Who Code",
    description: "Builds a community of female-identifying students learning computer science through projects and sisterhood.",
    sponsor: "Stacey Moultrie",
    category: "STEM",
    meetingFrequency: "Monthly (with optional additional sessions)",
    meetingDay: "IF or before school once a month",
    requirements: "Open to all skill levels; especially welcoming to girls and non-binary students.",
    activities: ["Coding projects", "Mentorship", "Community outreach"],
    commitment: "Low–Medium — monthly meetings plus project time.",
    benefits: ["Coding skills", "Mentorship", "Community & support"]
  },
  {
    id: "machine-learning-club",
    name: "Machine Learning Club",
    description: "Introduces students to core machine learning concepts via approachable virtual sessions and project-based learning.",
    sponsor: "Laura Pearce",
    category: "STEM",
    meetingFrequency: "Virtual (monthly to start)",
    meetingDay: "Virtual meetings beginning in August (schedule announced by sponsor)",
    requirements: "Interest in ML/AI; some sessions may recommend basic Python experience.",
    activities: ["Virtual workshops", "Hands-on tutorials", "Mini-projects"],
    commitment: "Low–Medium — virtual commitments with optional project work.",
    benefits: ["Intro to ML/AI", "Project portfolio material", "STEM pathway exploration"]
}
],
  },
  {
  school:"North Forsyth High School",
  club: [
  {
    id: "mcjrotc",
    name: "MCJROTC",
    description: "Instills citizenship, service, and leadership with instruction in Marine Corps history, discipline, and values.",
    sponsor: "CWO3 C.K. Villarouel, MGySgt Randy Merritt",
    category: "Leadership",
    meetingFrequency: "Daily (during school hours)",
    meetingDay: "Daily during Raider Time in JROTC building",
    requirements: "Open to 9–12 grade students; application and physical fitness expectations apply.",
    activities: ["Drill practice", "Leadership training", "Physical fitness", "Ceremonial events"],
    commitment: "High — daily engagement and weekend events typical.",
    benefits: ["Leadership development", "Discipline", "Service recognition"]
  },
  {
    id: "raider-team",
    name: "Raider Team",
    description: "Physical fitness team competing in Raider challenges like Cross Country Rescue, tire flips, and other events.",
    sponsor: "MCJROTC Program",
    category: "Athletics",
    meetingFrequency: "Weekly training",
    meetingDay: "Tuesdays after school (3:45–5:00 PM) and optional Saturday practices",
    requirements: "Open to JROTC cadets in good standing; physical fitness test required.",
    activities: ["Obstacle course training", "Team endurance workouts", "Competitions"],
    commitment: "High during competition season; Medium otherwise.",
    benefits: ["Fitness", "Teamwork", "Competitive experience"]
  },
  {
    id: "drill-team",
    name: "Drill Team",
    description: "Specializes in drill and ceremonies—competing nationally in armed/unarmed events and supporting MCJROTC ceremonies.",
    sponsor: "MCJROTC Program",
    category: "Leadership",
    meetingFrequency: "Weekly",
    meetingDay: "Wednesdays after school (3:45–5:00 PM)",
    requirements: "Cadets only; precision drill tryouts required.",
    activities: ["Drill routines", "Competition prep", "Ceremonial performances"],
    commitment: "High during competition; Medium otherwise.",
    benefits: ["Discipline", "Precision performance", "National recognition"]
  },
  {
    id: "color-guard",
    name: "Color Guard",
    description: "Presents the Nation’s Colors at school and community events, requiring professionalism and discipline.",
    sponsor: "Cadet Lt. Col. Hencely / MCJROTC Program",
    category: "Leadership",
    meetingFrequency: "Biweekly (plus event days)",
    meetingDay: "Mondays and Fridays during Raider Time or after school, plus event preparation",
    requirements: "Cadet members; tryout or selection based on performance.",
    activities: ["Flag ceremonies", "Rehearsals", "Community and school events"],
    commitment: "Medium — increases during parade/presentation seasons.",
    benefits: ["Public presentation skills", "Discipline", "Civic pride"]
  },
  {
    id: "rifle-team",
    name: "Rifle Team",
    description: "Competitive precision shooting team under GHSA. Requires morning practices and strong academic standing.",
    sponsor: "MCJROTC Program",
    category: "Athletics",
    meetingFrequency: "Weekly",
    meetingDay: "Fridays before school (7:00–8:00 AM)",
    requirements: "Cadets only; must pass safety training and maintain academic criteria.",
    activities: ["Marksmanship training", "Precision shooting drills", "GHSA competitions"],
    commitment: "High during season; Medium otherwise.",
    benefits: ["Focus and discipline", "Competitive skill", "Teamwork"]
  },
  {
    id: "jlab",
    name: "JLAB",
    description: "Academic team competing on SAT/ACT knowledge, JROTC topics, and current events. Cadet-led, with GPA and test score requirements.",
    sponsor: "MCJROTC Program",
    category: "Academic",
    meetingFrequency: "Monthly",
    meetingDay: "Second Wednesday of each month after school",
    requirements: "Cadet with sufficient GPA/Test scores; selection by instructors.",
    activities: ["Quiz practice", "Team trivia", "Competitive events"],
    commitment: "Medium — monthly plus competition prep.",
    benefits: ["Academic competition", "Knowledge building", "Team confidence"]
  },
  {
    id: "family-promise-club",
    name: "Family Promise Club",
    description: "Promotes civic engagement through volunteerism and fundraising to support families facing homelessness.",
    sponsor: "Jessica Younghouse",
    category: "Service",
    meetingFrequency: "Biweekly",
    meetingDay: "Biweekly Tuesdays after school (3:45–4:30 PM)",
    requirements: "Open to all students.",
    activities: ["Fundraising drives", "Shelter volunteering", "Community outreach"],
    commitment: "Medium — flexible project schedule.",
    benefits: ["Community service", "Empathy development", "Leadership"]
  },
  {
    id: "unified-raiders",
    name: "Unified Raiders",
    description: "Unites students with and without disabilities through Special Olympics sports and peer collaboration.",
    sponsor: "Erica Ford, Ashley Todd",
    category: "Inclusion",
    meetingFrequency: "Weekly",
    meetingDay: "Fridays after school (3:45–5:00 PM)",
    requirements: "Open to all; commitment to inclusive community values.",
    activities: ["Unified sports", "Peer support events", "Inclusive recreation"],
    commitment: "Low–Medium — weekly with event participation.",
    benefits: ["Inclusion", "Empathy", "Friendship"]
  },
  {
    id: "y-club",
    name: "Y-Club",
    description: "Promotes Christian values and civic engagement; hosts monthly meetings, service projects, and attends Youth Assembly.",
    sponsor: "Mr. Mooney",
    category: "Faith-Based",
    meetingFrequency: "Monthly",
    meetingDay: "Last Thursday morning of each month during Raider Time in Room 1107",
    requirements: "Membership application and $30 dues required; open to all students.",
    activities: ["Service planning", "Youth Assembly prep and participation", "Faith-based events"],
    commitment: "Medium — monthly plus November conference.",
    benefits: ["Faith expression", "Civic leadership", "Scholarship opportunities"]
  },
  {
    id: "art-club",
    name: "Art Club",
    description: "For all students interested in visual arts; collaborates on creative projects and meets with NAHS.",
    sponsor: "NFHS Art Department",
    category: "Arts",
    meetingFrequency: "Biweekly",
    meetingDay: "Tuesdays after school in Art Room",
    requirements: "Open to all students.",
    activities: ["Collaborative art", "Project work", "NAHS collaboration"],
    commitment: "Low — project-based participation.",
    benefits: ["Creative expression", "Portfolio building", "Art community"]
  },
  {
    id: "beta-club",
    name: "Beta Club",
    description: "Recognizes high academic achievement, character, service, and leadership. Requires GPA minimum, behavior, and service hours.",
    sponsor: "Allison Elis, James Bassett, Meighan Bassett, Eli Jones",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "First Wednesday of each month during Raider Time",
    requirements: "Invitation based on GPA, conduct, and service.",
    activities: ["Service events", "Recognition ceremonies", "Leadership projects"],
    commitment: "Medium — service hours required.",
    benefits: ["Academic recognition", "Leadership", "College resume value"]
  },
  {
    id: "fca",
    name: "Fellowship of Christian Athletes (FCA)",
    description: "Open to all students; offers praise, worship, speakers, scripture, and fellowship in monthly meetings.",
    sponsor: "Jamie Clark",
    category: "Faith-Based",
    meetingFrequency: "Monthly",
    meetingDay: "First Friday morning of each month during Raider Time",
    requirements: "Open to all students.",
    activities: ["Devotionals", "Peer fellowship", "Speaker sessions"],
    commitment: "Low — monthly attendance.",
    benefits: ["Spiritual encouragement", "Community support", "Leadership grounding"]
  },
  {
    id: "science-ambassadors",
    name: "Science Ambassadors",
    description: "Volunteers lead hands-on STEM activities at elementary STEAM nights—great for future educators and scientists.",
    sponsor: "Charlotte Stevens",
    category: "STEM",
    meetingFrequency: "Monthly / event-based",
    meetingDay: "Meetings scheduled before STEAM nights (usually Tuesdays after school)",
    requirements: "Interest in STEM and teaching; open to all students.",
    activities: ["STEAM event planning", "Lead activities", "Outreach"],
    commitment: "Low–Medium as events occur.",
    benefits: ["STEM communication", "Outreach experience", "Portfolio building"]
  },
  {
    id: "nahs",
    name: "National Art Honor Society (NAHS)",
    description: "Recognizes excellence in visual arts; promotes art through service and leadership in school and community.",
    sponsor: "Mrs. Fowler, Ms. Boyanton",
    category: "Honor Society",
    meetingFrequency: "Monthly",
    meetingDay: "Second Thursday of each month after school",
    requirements: "Portfolio review and GPA criteria for selection.",
    activities: ["Art exhibitions", "Community art service", "Peer mentoring"],
    commitment: "Medium — project-based involvement.",
    benefits: ["Academic recognition", "Art leadership", "Community engagement"]
  },
  {
    id: "orchestra-club",
    name: "Orchestra Club",
    description: "For orchestral instrument players to rehearse, perform, and serve the community through music.",
    sponsor: "Heather Transue",
    category: "Arts",
    meetingFrequency: "Weekly",
    meetingDay: "Thursdays after school in Orchestra Room",
    requirements: "Instrument proficiency required.",
    activities: ["Rehearsal", "Performance events", "Community outreach"],
    commitment: "Medium — weekly practice and performances.",
    benefits: ["Musical development", "Performance experience", "Community service"]
  },
  {
    id: "poetry-club",
    name: "Poetry Club",
    description: "Fosters poetic expression and writing skills in a supportive environment through reading and writing poetry.",
    sponsor: "James Bassett",
    category: "Literary",
    meetingFrequency: "Biweekly",
    meetingDay: "Alternate Mondays during lunch in Room 212",
    requirements: "Open to all students.",
    activities: ["Poetry workshops", "Open mic sessions", "Publication opportunities"],
    commitment: "Low — optional participation.",
    benefits: ["Creative writing", "Self-expression", "Publication experience"]
  }
  ]
},
    {
      school: 'Alliance Academy for Innovation',
      clubs: [      
    {
    id: 'biology-olympiad',
    name: 'Biology Olympiad - Science National Honor Society(SNHS)',
    description: 'A competitive academic team that prepares students for state and national biology competitions. Members study advanced topics in molecular biology, genetics, anatomy, ecology, and evolution. The club combines elements of the Science National Honor Society, promoting scientific excellence and community service through biology-related outreach programs.',
    sponsor: 'Tiffany Aikens',
    category: 'Academic',
    meetingFrequency: 'Weekly',
    meetingDay: 'Tuesdays after school',
    requirements: 'Minimum B+ in Biology, teacher recommendation',
    activities: ['Competition preparation', 'Lab experiments', 'Science fair projects', 'Peer tutoring', 'Community science education'],
    commitment: 'High - requires study time and competition participation',
    benefits: ['College application enhancement', 'Scholarship opportunities', 'Advanced biology knowledge', 'Leadership development']
  },
  {
    id: 'skills-usa',
    name: 'Skills USA',
    description: 'A national organization that helps students develop career and technical skills through hands-on projects, competitions, and leadership activities. Members participate in skill-based competitions ranging from automotive technology to culinary arts, preparing them for careers in skilled trades and technical fields.',
    sponsor: 'Mike Arguel',
    category: 'Career',
    meetingFrequency: 'Bi-weekly',
    meetingDay: 'Thursdays after school',
    requirements: 'Enrollment in a CTE program preferred',
    activities: ['Skills competitions', 'Career exploration', 'Industry guest speakers', 'Job shadowing', 'Professional development workshops'],
    commitment: 'Medium - flexible based on competition participation',
    benefits: ['Career readiness', 'Industry connections', 'Scholarship opportunities', 'Professional skills development']
  },
  {
    id: 'quill--scroll',
    name: 'Quill & Scroll',
    description: 'An international honor society for high school journalists, recognizing excellence in writing, editing, and media production. Members work on school publications, develop journalism skills, and promote ethical reporting standards while contributing to school media outlets.',
    sponsor: 'Lainey Bradley',
    category: 'Arts',
    meetingFrequency: 'Weekly',
    meetingDay: 'Wednesdays after school',
    requirements: 'Strong writing portfolio, involvement in school media',
    activities: ['Newspaper/yearbook production', 'Writing workshops', 'Media ethics discussions', 'Interview techniques', 'Digital media creation'],
    commitment: 'Medium to High - regular publication deadlines',
    benefits: ['Journalism credentials', 'Writing portfolio development', 'Media literacy', 'College journalism preparation']
  },
  {
    id: 'ecoalliance',
    name: 'EcoAlliance',
    description: 'An environmental advocacy club focused on promoting sustainability practices within the school and local community. Members organize recycling programs, environmental awareness campaigns, and outdoor conservation projects while educating peers about climate change and ecological responsibility.',
    sponsor: 'Lainey Bradley',
    category: 'Environmental',
    meetingFrequency: 'Bi-weekly',
    meetingDay: 'Mondays after school',
    requirements: 'Interest in environmental issues',
    activities: ['Recycling programs', 'School garden maintenance', 'Environmental education presentations', 'Community cleanup events', 'Sustainability initiatives'],
    commitment: 'Medium - some weekend activities',
    benefits: ['Environmental leadership', 'Community service hours', 'Awareness of sustainability practices', 'Outdoor experience']
  },
  {
    id: 'national-english-honor-society',
    name: 'National English Honor Society',
    description: 'A prestigious honor society recognizing students who demonstrate excellence in English language arts. Members participate in literary activities, tutor peers, organize reading events, and promote literacy within the school and community through various service projects.',
    sponsor: 'Chandler Burnell',
    category: 'Academic',
    meetingFrequency: 'Monthly',
    meetingDay: 'First Friday of each month',
    requirements: 'Minimum 3.5 GPA in English, teacher recommendation',
    activities: ['Peer tutoring', 'Literary magazine production', 'Reading programs for elementary students', 'Book drives', 'Poetry contests'],
    commitment: 'Medium - service hour requirements',
    benefits: ['Academic recognition', 'College application enhancement', 'Leadership opportunities', 'Literary skills development']
  },
  {
    id: 'vt-seva',
    name: 'VT Seva',
    description: 'A service-oriented club focused on community outreach and volunteer work, with "Seva" meaning selfless service. Members organize and participate in various charitable activities, food drives, and community service projects to support local organizations and those in need.',
    sponsor: 'Chandler Burnell',
    category: 'Service',
    meetingFrequency: 'Bi-weekly',
    meetingDay: 'Thursdays after school',
    requirements: 'Commitment to community service',
    activities: ['Food drives', 'Charity fundraisers', 'Volunteer coordination', 'Community partnerships', 'Service project planning'],
    commitment: 'Medium - regular service commitments',
    benefits: ['Community service hours', 'Leadership development', 'Civic engagement', 'Social awareness']
  },
  {
    id: 'alliance-christian-fellowship',
    name: 'Alliance Christian Fellowship',
    description: 'A faith-based club that provides a supportive community for Christian students to grow spiritually, study scripture, and engage in fellowship activities. The club welcomes students of all backgrounds interested in exploring Christian faith and values through discussion, service, and worship.',
    sponsor: 'Jennifer Burnham',
    category: 'Religious',
    meetingFrequency: 'Weekly',
    meetingDay: 'Wednesdays before school',
    requirements: 'Open to all students interested in Christian fellowship',
    activities: ['Bible study', 'Prayer groups', 'Community service projects', 'Fellowship events', 'Mission trip fundraising'],
    commitment: 'Low to Medium - flexible participation',
    benefits: ['Spiritual growth', 'Community service opportunities', 'Peer support', 'Faith exploration']
  },
  {
    id: 'oratorical-contest',
    name: 'Oratorical Contest',
    description: 'A competitive speech club that prepares students for local, regional, and state oratorical competitions. Members develop public speaking skills, research and write speeches on various topics, and compete in formal speaking contests that emphasize rhetoric, delivery, and persuasive communication.',
    sponsor: 'Candi Clark',
    category: 'Academic',
    meetingFrequency: 'Weekly during competition season',
    meetingDay: 'Tuesdays and Thursdays after school',
    requirements: 'Interest in public speaking and competition',
    activities: ['Speech writing workshops', 'Competitive tournaments', 'Public speaking practice', 'Research and citation training', 'Presentation skills development'],
    commitment: 'High during competition season',
    benefits: ['Public speaking confidence', 'Research skills', 'Competition experience', 'Communication skills']
  },
  {
    id: 'forthekids',
    name: 'ForTheKids',
    description: 'A service club dedicated to supporting children in need through fundraising, mentoring, and volunteer activities. Members organize events and programs that benefit local elementary schools, children\'s hospitals, and youth organizations, focusing on making a positive impact in young lives.',
    sponsor: 'Candi Clark',
    category: 'Service',
    meetingFrequency: 'Bi-weekly',
    meetingDay: 'Fridays after school',
    requirements: 'Passion for working with children',
    activities: ['Fundraising events', 'Elementary school mentoring', 'Toy drives during holidays', 'Reading programs', 'Children\'s hospital visits'],
    commitment: 'Medium - some weekend events',
    benefits: ['Community service hours', 'Working with children experience', 'Event planning skills', 'Social impact']
  },
  {
    id: 'nhs',
    name: 'NHS',
    description: 'The National Honor Society recognizes outstanding high school students who demonstrate excellence in scholarship, service, leadership, and character. Members maintain high academic standards while completing community service projects and serving as role models for their peers.',
    sponsor: 'Katie Cosgrove',
    category: 'Academic',
    meetingFrequency: 'Monthly',
    meetingDay: 'Second Tuesday of each month',
    requirements: 'Minimum 3.5 cumulative GPA, application process',
    activities: ['Community service projects', 'Peer tutoring', 'School event volunteering', 'Fundraising for charities', 'Academic recognition ceremonies'],
    commitment: 'Medium - service hour requirements',
    benefits: ['Academic recognition', 'College application enhancement', 'Leadership opportunities', 'Service experience']
  },
  {
    id: 'color-me-blue',
    name: 'Color me Blue',
    description: 'A school spirit and pride club focused on promoting positive school culture and supporting athletic teams and school events. Members organize pep rallies, create school decorations, coordinate themed dress-up days, and work to build community spirit throughout the school year.',
    sponsor: 'Katie Cosgrove',
    category: 'Spirit',
    meetingFrequency: 'Weekly during fall and winter',
    meetingDay: 'Mondays after school',
    requirements: 'Enthusiasm for school spirit activities',
    activities: ['Pep rally organization', 'Game day decorations', 'Spirit week planning', 'Athletic team support', 'School event promotion'],
    commitment: 'Medium to High during sports seasons',
    benefits: ['School leadership', 'Event planning experience', 'Team building', 'School community involvement']
  },
  {
    id: 'tsa',
    name: 'TSA',
    description: 'Technology Student Association is a national organization for students interested in STEM fields. Members compete in technology-related events, participate in engineering challenges, and develop skills in areas such as robotics, computer programming, biotechnology, and architectural design.',
    sponsor: 'Jennifer Crowder',
    category: 'STEM',
    meetingFrequency: 'Weekly',
    meetingDay: 'Wednesdays after school',
    requirements: 'Interest in technology and engineering',
    activities: ['Engineering competitions', 'Technology projects', 'Programming challenges', 'Design competitions', 'STEM conferences'],
    commitment: 'High - project development and competitions',
    benefits: ['STEM skill development', 'Competition experience', 'College preparation', 'Technical portfolio building']
  },
  {
    id: 'vex-robotics',
    name: 'Vex Robotics',
    description: 'A competitive robotics team that designs, builds, and programs robots for VEX Robotics competitions. Members learn engineering principles, programming skills, and teamwork while competing against other schools in regional and state tournaments throughout the year.',
    sponsor: 'Jennifer Crowder',
    category: 'STEM',
    meetingFrequency: 'Daily during build season, 3x weekly off-season',
    meetingDay: 'Monday, Wednesday, Friday after school',
    requirements: 'Commitment to team participation',
    activities: ['Robot design and construction', 'Programming and testing', 'Competition tournaments', 'Engineering notebook documentation', 'Team fundraising'],
    commitment: 'Very High - intensive during competition season',
    benefits: ['Engineering experience', 'Programming skills', 'Teamwork and leadership', 'Competition awards and recognition']
  },
  {
    id: 'cyber-avengers',
    name: 'Cyber Avengers',
    description: 'A cybersecurity-focused club that teaches students about digital security, ethical hacking, and cyber defense strategies. Members participate in cybersecurity competitions, learn about network security, and develop skills to protect digital systems while promoting responsible technology use.',
    sponsor: 'Jennifer Crowder',
    category: 'STEM',
    meetingFrequency: 'Twice weekly',
    meetingDay: 'Tuesdays and Thursdays after school',
    requirements: 'Basic computer skills, interest in cybersecurity',
    activities: ['Capture the Flag competitions', 'Ethical hacking workshops', 'Network security labs', 'Digital forensics projects', 'Cybersecurity awareness campaigns'],
    commitment: 'Medium to High - competition preparation',
    benefits: ['Cybersecurity skills', 'Ethical hacking knowledge', 'Competition experience', 'Career preparation in IT security']
  },
  {
    id: 'aai-grils-who-code',
    name: 'AAI Grils Who Code',
    description: 'A chapter of the national Girls Who Code organization focused on closing the gender gap in technology. The club teaches programming skills, web development, and computer science concepts while creating a supportive environment for female students interested in technology careers.',
    sponsor: 'Jennifer Crowder',
    category: 'STEM',
    meetingFrequency: 'Weekly',
    meetingDay: 'Fridays after school',
    requirements: 'Open to all students interested in coding',
    activities: ['Programming workshops', 'Web development projects', 'Tech industry guest speakers', 'Coding competitions', 'Computer science college prep'],
    commitment: 'Medium - project-based learning',
    benefits: ['Programming skills', 'Tech industry exposure', 'College CS preparation', 'Supportive peer network']
  },
  {
    id: 'flag-corp',
    name: 'Flag Corp',
    description: 'A performance group that combines dance, choreography, and flag spinning techniques for athletic events, competitions, and school performances. Members develop coordination, rhythm, and performance skills while supporting school spirit at football games and other sporting events.',
    sponsor: 'Nick Crowder',
    category: 'Recreational',
    meetingFrequency: '3-4 times weekly during season',
    meetingDay: 'Monday, Wednesday, Thursday after school',
    requirements: 'Basic coordination and willingness to perform',
    activities: ['Choreographed performances', 'Football game entertainment', 'Competition routines', 'Flag spinning techniques', 'Dance and movement training'],
    commitment: 'High during performance season',
    benefits: ['Performance experience', 'Physical fitness', 'Team coordination', 'School spirit participation']
  },
  {
    id: 'science-olympiad',
    name: 'Science Olympiad',
    description: 'A competitive academic team that prepares for state and national Science Olympiad tournaments. Members study various scientific disciplines and compete in events ranging from astronomy and chemistry to engineering design challenges and laboratory investigations.',
    sponsor: 'Brad Davis',
    category: 'STEM',
    meetingFrequency: 'Twice weekly',
    meetingDay: 'Tuesdays and Thursdays after school',
    requirements: 'Strong science background, commitment to competition',
    activities: ['Competition preparation', 'Laboratory experiments', 'Engineering challenges', 'Scientific research', 'Team building exercises'],
    commitment: 'High - intensive study and competition preparation',
    benefits: ['Advanced science knowledge', 'Competition experience', 'College science preparation', 'Team collaboration skills']
  },
  {
    id: 'physics-olympiad',
    name: 'Physics Olympiad',
    description: 'An elite academic competition team that prepares students for national and international physics competitions. Members tackle advanced physics problems, conduct experiments, and develop deep understanding of theoretical and applied physics concepts beyond the regular curriculum.',
    sponsor: 'Brad Davis',
    category: 'STEM',
    meetingFrequency: 'Weekly',
    meetingDay: 'Fridays after school',
    requirements: 'Strong physics and mathematics background',
    activities: ['Advanced problem solving', 'Experimental physics labs', 'Competition preparation', 'Physics research projects', 'Peer collaboration'],
    commitment: 'High - requires significant study time',
    benefits: ['Advanced physics knowledge', 'Problem-solving skills', 'Competition recognition', 'College physics preparation']
  } 
]
}
]

  // Available schools
  const availableSchools = useMemo(
    () => allClubData.map(school => school.school),
    [allClubData]
  );

  // Filter clubs by selected school
  const filteredClubsData = useMemo(() => {
    const schoolData = allClubData.find(school => school.school === selectedSchool);
    return schoolData ? schoolData.clubs : [];
  }, [selectedSchool, allClubData]);

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
    <div className="max-w-6xl mx-auto">
      {/* Back Navigation */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-all duration-200 hover:translate-x-1"
      >
        <ChevronRight size={20} className="rotate-180 mr-2" />
        <span className="font-medium">Back to Clubs</span>
      </button>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl mb-8 overflow-hidden relative">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full mix-blend-overlay animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {club.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm border border-white/30`}>
                  {club.category}
                </span>
                <div className="flex items-center text-white/90">
                  <Users size={18} className="mr-2" />
                  <span className="text-sm font-medium">Join Today!</span>
                </div>
              </div>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                Join Club
              </button>
              <button className="bg-transparent hover:bg-white/10 border-2 border-white/50 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                Contact Sponsor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Users size={18} className="text-blue-600" />
                </div>
                About This Club
              </h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                {club.description}
              </p>
            </div>
          </div>

          {/* Activities & Highlights Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 size={18} className="text-green-600" />
                </div>
                What We Do
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
                    Regular Meetings
                  </h3>
                  <p className="text-gray-600 text-sm">Connect with fellow members and plan activities</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-full mr-2"></div>
                    Special Events
                  </h3>
                  <p className="text-gray-600 text-sm">Participate in competitions and showcases</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full mr-2"></div>
                    Community Service
                  </h3>
                  <p className="text-gray-600 text-sm">Make a positive impact in our community</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <div className="w-6 h-6 bg-orange-500 rounded-full mr-2"></div>
                    Skill Building
                  </h3>
                  <p className="text-gray-600 text-sm">Develop leadership and specialized skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Contact Info Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <Users size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Club Sponsor</p>
                  <p className="text-gray-600">{club.sponsor}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <BarChart3 size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Category</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[club.category]} mt-1`}>
                    {club.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Quick Facts</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Meeting Frequency</span>
                <span className="text-sm font-semibold text-gray-900">Weekly</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Open to All Grades</span>
                <span className="text-sm font-semibold text-green-600">Yes</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Experience Required</span>
                <span className="text-sm font-semibold text-blue-600">No</span>
              </div>
            </div>
          </div>

          {/* Join Now CTA Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg overflow-hidden text-white">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Ready to Join?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Connect with like-minded students and make a difference!
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105">
                Get Started Today
              </button>
            </div>
          </div>

          {/* Social Media Links (if available) */}
          {club.socialMedia && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Follow Us</h3>
              </div>
              <div className="p-6 space-y-3">
                {club.socialMedia.instagram && (
                  <a href={club.socialMedia.instagram} className="flex items-center p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">IG</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Instagram</span>
                  </a>
                )}
                {club.socialMedia.website && (
                  <a href={club.socialMedia.website} className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">WEB</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Website</span>
                  </a>
                )}
              </div>
            </div>
          )}
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
              <h1 className="text-xl font-bold text-yellow-800 drop-shadow-sm">
                {selectedSchool === 'Alliance Academy of Innovation' ? 'AAI' : selectedSchool.split(' ').map(word => word[0]).join('')} Clubs
              </h1>
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
                    className="fixed w-80 bg-white border-2 border-black rounded-lg shadow-xl z-[9999] max-h-60 overflow-y-auto"
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
              <h1 className="text-2xl font-bold leading-tight text-yellow-800 drop-shadow-sm">
                The Club Network @ {selectedSchool === 'Alliance Academy of Innovation' ? 'AAI' : selectedSchool.split(' ').map(word => word[0]).join('')}
              </h1>
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
              <p className="text-gray-600 mb-6">Clubs in the {selectedCategory} category</p>
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