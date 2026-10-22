import { TimelineItem } from '@/types/portfolio'

export const timelineData: TimelineItem[] = [
  {
    id: 'timeline-intelliod',
    role: 'Full Stack Developer Intern',
    organization: 'Intelliod Pvt. Ltd.',
    location: 'Visakhapatnam, India (On-Site)',
    period: 'June 2026',
    type: 'experience',
    metricHighlights: [
      '50m Geofenced EMS Module',
      '30%+ MongoDB Latency Reduction',
      'Zero Remote Attendance Spoofing',
    ],
    descriptionBullets: [
      'Engineered a 50m-radius geofenced attendance and lunch-tracking module for the internal enterprise Employee Management System (EMS), strictly restricting employee check-in and break timestamps to verified office coordinates.',
      'Constructed high-throughput Node.js/Express REST API endpoints and optimized MongoDB aggregation pipelines, cutting database query latency by over 30%.',
      'Integrated frontend HTML5 Geolocation APIs with backend coordinate distance validation (Haversine formula), eliminating remote location spoofing and automating attendance policy compliance across the enterprise.',
      'Collaborated in Agile sprints to enforce high security standards, strict input sanitization, and clean modular code architecture.',
    ],
  },
  {
    id: 'timeline-gdg',
    role: 'Event Management Lead — Campus Chapter',
    organization: 'Google Developer Groups (GDG) on Campus',
    location: 'Patna, Bihar, India',
    period: 'Oct 2025 – Present',
    type: 'leadership',
    metricHighlights: [
      '500+ Student Developers Managed',
      'Campus Hackathons & Bootcamps',
      'Technical Strategy & Logistics',
    ],
    descriptionBullets: [
      'Spearheaded technical strategy, campus hackathons, hands-on workshops, and developer bootcamps for 500+ student engineers across Bihar engineering colleges.',
      'Delivered workshops on full-stack web architectures, Git workflows, and open-source contribution roadmaps.',
      'Coordinated sponsorship pipelines, mentor panels, and project evaluation criteria for campus-wide hackathon competitions.',
    ],
  },
  {
    id: 'timeline-youth-parliament',
    role: 'State-Level Delegate & Public Speaker',
    organization: 'Viksit Bharat Youth Parliament',
    location: 'Bihar Legislative Assembly, Patna',
    period: '2025',
    type: 'leadership',
    metricHighlights: [
      'Qualified as State Delegate',
      'Presented Before Assembly Chairperson',
      'Technology & National Development',
    ],
    descriptionBullets: [
      'Qualified as a State Delegate through competitive regional evaluations and represented youth perspectives inside the Bihar Legislative Assembly.',
      'Delivered a formal presentation before the Assembly Chairperson advocating for technology-driven national development frameworks and youth engineering ecosystems.',
      'Honed executive presence, technical debate argumentation, and high-pressure public communication skills.',
    ],
  },
  {
    id: 'timeline-education',
    role: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    organization: 'Bakhtiyarpur College of Engineering (BCE Patna)',
    location: 'Patna, Bihar, India',
    period: 'Expected May 2027',
    type: 'education',
    metricHighlights: [
      'CGPA: 7.98 / 10',
      'Smart India Hackathon 2025 Finalist',
      '4x NPTEL Certifications',
    ],
    descriptionBullets: [
      'Rigorous foundational coursework: Data Structures & Algorithms (DSA), Operating Systems (OS), Database Management Systems (DBMS), Computer Networks (CN), Object-Oriented Programming (OOP), System Design Fundamentals.',
      'Smart India Hackathon (SIH) 2025 Grand Finale National Finalist for the Ministry of Defence, Pune (LEO-PNT Positioning System).',
      'Completed NPTEL National Certifications in Data Structures & Algorithms Using Python, Graph Algorithms, Operating Systems, and DBMS.',
    ],
  },
]
