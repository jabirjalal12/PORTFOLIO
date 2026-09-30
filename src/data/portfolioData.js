export const personalInfo = {
  fullName: 'MUHAMMAD JABIR JALAL',
  prefix: 'MUHAMMAD',
  mainName: 'JABIR JALAL',
  codeName: 'SAMURAI TECH',
  englishSubtitle: 'Aeronautical Engineering × Cybersecurity × Creative Technology',
  tagline: 'Engineering the future with precision, curiosity and relentless learning.',
  coreQuote: 'One person. Multiple disciplines. One path.',
  statement: 'Aeronautical engineer, cybersecurity researcher, and creative technologist operating at the intersection of physical flight dynamics, defensive computing, and digital craftsmanship.',
  email: 'jabirjalal785@gmail.com',
  github: 'https://github.com/jabirjalal12',
  linkedin: 'https://www.linkedin.com/in/muhammad-jabir-jalal-141661334',
  instagram: 'https://www.instagram.com/_ja_bir.ja_la.l?stkn=NHJrNnFsbmFsNzRz',
  location: 'Kerala, India',
  status: 'Open for High-Impact Engineering & Tech Collaborations'
};

export const portraits = {
  heroAero: '/assets/images/aero-portrait.png',
  heroCutout: '/assets/images/jabir-cutout.png',
  cybersecurity: '/assets/images/cyber-portrait.png',
  professional: '/assets/images/suit-portrait.png'
};

export const bushidoVirtues = [
  { name: 'INTEGRITY', subtitle: 'Rectitude in Code & Physics', desc: 'Absolute truth in mathematical calculations, boundary conditions, and cryptographic constraints.' },
  { name: 'PRECISION', subtitle: 'Exactness Without Compromise', desc: 'In CATIA modeling, airfoil vortex dissipation, and packet analysis, precision dictates success.' },
  { name: 'VIGILANCE', subtitle: 'Heightened Awareness (Zanshin)', desc: 'Anticipating web vulnerabilities and airframe structural fatigue before they manifest.' },
  { name: 'MASTERY', subtitle: 'Continuous Kaizen', desc: 'Relentless refinement of craftsmanship across CAD, penetration testing, and After Effects motion design.' }
];

export const identities = [
  {
    id: 'aero',
    label: 'AERONAUTICAL ENGINEER',
    samuraiMetaphor: 'THE PRIMARY BLADE (KATANA)',
    subtitle: 'CATIA • Aerodynamics • Aircraft Structures',
    badge: 'AERO SYSTEMS',
    desc: 'CATIA V5 3D surface modeling, subsonic aerodynamics & NACA 0012 vortex dissipation, and airframe structural stress analysis.',
    image: '/assets/images/aero-portrait.png',
    accentColor: '#C8527A'
  },
  {
    id: 'cyber',
    label: 'CYBERSECURITY & PENTESTING',
    samuraiMetaphor: 'THE COMPANION SHIELD (WAKIZASHI)',
    subtitle: 'Web Pentesting • Network Recon • Threat Intel',
    badge: 'CYBERSECURITY',
    desc: 'Web application penetration testing (OWASP Top 10), Burp Suite traffic proxying, Nmap reconnaissance, and authorized defense.',
    image: '/assets/images/cyber-portrait.png',
    accentColor: '#7C3B5C'
  },
  {
    id: 'exec',
    label: 'CREATIVE & DIGITAL DESIGN',
    samuraiMetaphor: 'THE PRECISION CRAFT (TANTO)',
    subtitle: 'Graphic Design • After Effects Motion',
    badge: 'CREATIVE TECH',
    desc: 'Adobe After Effects motion graphics, video editing, brand identity graphic design, kinetic typography, and embedded IoT systems.',
    image: '/assets/images/suit-portrait.png',
    accentColor: '#C9A55A'
  }
];

export const technicalArsenal = {
  aeronautical: {
    title: 'Aeronautical Engineering',
    metaphor: 'The Primary Blade (Katana)',
    domains: [
      {
        name: 'CATIA V5 / 3D CAD Modeling',
        description: 'Advanced 3D surface modeling, parametric part assembly, aerodynamic lofting, and precision mechanical drafting.',
        badge: 'Airframe CAD & Lofting'
      },
      {
        name: 'Aerodynamics & Wind Tunnel',
        description: 'Subsonic smoke flow visualization, NACA 0012 airfoil testing, winglet vortex dissipation, and lift-to-drag optimization.',
        badge: 'Subsonic Flight Dynamics'
      },
      {
        name: 'Aircraft Structures & Stress Analysis',
        description: 'Airframe structural mechanics, spar and rib load distribution, stress/deflection analysis, and aerospace materials.',
        badge: 'Structural Integrity'
      }
    ],
    tools: [
      { name: 'CATIA V5', category: '3D CAD & Surface Modeling', level: 'Advanced' },
      { name: 'Subsonic Wind Tunnel', category: 'Flow Testing & Smoke Wire', level: 'Specialist' },
      { name: 'ANSYS Fluent / CFD', category: 'Aerodynamic Simulation', level: 'Intermediate' },
      { name: 'MATLAB / Simulink', category: 'Numerical Flight Dynamics', level: 'Proficient' },
      { name: 'XFLR5', category: 'Airfoil & Wing Polar Analysis', level: 'Proficient' },
      { name: 'AutoCAD Mechanical', category: 'Engineering Drafting & Schematics', level: 'Proficient' }
    ]
  },
  cybersecurity: {
    title: 'Cybersecurity & Ethical Hacking',
    metaphor: 'The Companion Shield (Wakizashi)',
    domains: [
      {
        name: 'Web Penetration Testing',
        description: 'Targeted vulnerability assessments against OWASP Top 10: SQL Injection, XSS, CSRF, SSRF, IDOR, and authentication flaws.',
        badge: 'OWASP Top 10 Web Auditing'
      },
      {
        name: 'Network Reconnaissance & Auditing',
        description: 'Port scanning, service fingerprinting, perimeter mapping, packet triage, and wireless security analysis.',
        badge: 'Network Defense & Triage'
      },
      {
        name: 'Defensive Hardening & Forensics',
        description: 'Hardened Linux environments, firewall iptables configuration, protocol forensics, and cryptographic validation.',
        badge: 'Zero-Trust System Security'
      }
    ],
    tools: [
      { name: 'Burp Suite', category: 'Web App Pentesting & Intercept', level: 'Advanced' },
      { name: 'Kali Linux', category: 'Security OS & Pentest Suite', level: 'Advanced' },
      { name: 'Wireshark', category: 'Deep Packet Capture & TLS Triage', level: 'Advanced' },
      { name: 'Nmap', category: 'Network Exploration & NSE Scripts', level: 'Advanced' },
      { name: 'OWASP ZAP', category: 'Automated Web Vulnerability Scanner', level: 'Proficient' },
      { name: 'Metasploit', category: 'Vulnerability Validation & Exploit Lab', level: 'Proficient' },
      { name: 'Gobuster / ffuf', category: 'Web Directory & Parameter Fuzzing', level: 'Advanced' },
      { name: 'Sqlmap', category: 'Automated SQL Injection Testing', level: 'Proficient' },
      { name: 'Nikto', category: 'Web Server Vulnerability Scanner', level: 'Proficient' },
      { name: 'Linux Hardening', category: 'Kernel Isolation & Iptables', level: 'Advanced' }
    ]
  },
  creative: {
    title: 'Creative Technology & Digital Design',
    metaphor: 'The Precision Craft (Tanto)',
    domains: [
      {
        name: 'Graphic Design & Visual Identity',
        description: 'Brand identity systems, vector emblems, typography hierarchies, minimalist Japanese motifs, and modern UI/UX layouts.',
        badge: 'Brand Identity & Vector Systems'
      },
      {
        name: 'After Effects Motion Graphics & Video',
        description: 'Adobe After Effects kinetic motion design, visual effects, sequence editing, audio mixing, and technical showreels.',
        badge: 'After Effects & Motion Systems'
      },
      {
        name: 'Embedded Systems & Software',
        description: 'Native Android Kotlin/CameraX low-latency live streaming apps and ESP32 wireless telemetry sensor hubs.',
        badge: 'Mobile Systems & IoT Hardware'
      }
    ],
    tools: [
      { name: 'Adobe After Effects', category: 'Motion Graphics, VFX & Editorial', level: 'Advanced' },
      { name: 'Adobe Premiere Pro', category: 'Video Editorial & Timeline Assembly', level: 'Proficient' },
      { name: 'Adobe Photoshop', category: 'Raster Graphics & Photo Retouching', level: 'Advanced' },
      { name: 'Adobe Illustrator', category: 'Vector Art & Emblems', level: 'Proficient' },
      { name: 'Figma', category: 'UI/UX Interface Prototyping', level: 'Advanced' },
      { name: 'CapCut Pro', category: 'Short-Form Editorial & Audio Sync', level: 'Advanced' },
      { name: 'Canva Pro', category: 'Brand Assets & Presentation Design', level: 'Advanced' },
      { name: 'Android Kotlin', category: 'Native Mobile & CameraX Pipelines', level: 'Advanced' },
      { name: 'ESP32 / Arduino C++', category: 'Microcontroller Telemetry & Sensors', level: 'Proficient' }
    ]
  }
};

export const aeroProjectFeatured = {
  title: 'FLOW VISUALISATION OF INDUCED VORTEX',
  subtitle: 'EXPERIMENTAL FLIGHT DYNAMICS RESEARCH',
  tagline: 'Experimental investigation of induced vortex behaviour with and without winglets using low-speed wind tunnel and smoke visualization.',
  airfoil: 'NACA 0012 Symmetrical Profile',
  facility: 'Subsonic Closed-Circuit Low-Speed Wind Tunnel',
  coreFocus: [
    { label: 'Airfoil Model', value: 'NACA 0012' },
    { label: 'Flow Velocity', value: '12 - 25 m/s' },
    { label: 'Reynolds Number', value: '~1.8 × 10⁵' },
    { label: 'Testing Method', value: 'Kerosene Smoke Wire Injection' },
    { label: 'CAD & Modeling', value: 'CATIA V5 Parametric Lofting' },
    { label: 'Measurement Metric', value: 'Tip Vortex Core Diameter & Induced Drag' }
  ],
  comparison: {
    withoutWinglet: {
      title: 'Baseline Wing (Without Winglet)',
      vortexCore: 'Intense, tightly rolled vortex core extending far downstream',
      inducedDrag: 'High induced drag coefficient (CDi) resulting from pressure equalization across wingtip',
      pressureDifferential: 'Direct leakage from high-pressure lower surface to low-pressure upper surface',
      smokePattern: 'Violent spiral rotation visible immediately at wingtip chord termination'
    },
    withWinglet: {
      title: 'Blended Winglet Configuration',
      vortexCore: 'Diffused and displaced outward/upward, reducing concentrated downwash',
      inducedDrag: 'Calculated 14% to 22% reduction in wingtip-induced drag component',
      pressureDifferential: 'Physical barrier inhibits spanwise crossflow, improving effective aspect ratio',
      smokePattern: 'Gentle, distributed dissipation streamline pattern downstream'
    }
  }
};

export const projects = [
  {
    id: 'vortex-windtunnel',
    title: 'Flow Visualisation of Induced Vortex (NACA 0012)',
    category: 'AERONAUTICAL',
    badge: 'Aerodynamics Research',
    desc: 'Experimental investigation of wingtip vortex behavior on a NACA 0012 airfoil using a low-speed wind tunnel and kerosene smoke injection.',
    details: 'Constructed airfoil models with interchangeable blended winglets. Analyzed vortex dissipation, downwash angle reduction, and lift-to-drag efficiency gains across angles of attack from 0° to 14°.',
    technologies: ['Aerodynamics', 'NACA 0012', 'Wind Tunnel', 'Smoke Wire Flow', 'Vortex Mitigation', 'MATLAB'],
    image: '/assets/projects/project-vortex-windtunnel.jpg',
    link: '#pillars'
  },
  {
    id: 'catia-structures-cad',
    title: 'Aircraft Wing Rib & Spar Structural Analysis in CATIA V5',
    category: 'AERONAUTICAL',
    badge: 'CATIA & Structures',
    desc: '3D parametric modeling and structural load distribution analysis for an aircraft wing internal skeleton using CATIA V5.',
    details: 'Modeled aerodynamic surface lofts, internal spars, lightening holes, and rib stations in CATIA V5. Evaluated bending moments, shear stress distribution, and weight optimization for aerospace aluminum alloys.',
    technologies: ['CATIA V5', 'Aircraft Structures', 'Surface Modeling', 'CAD Lofting', 'Stress Analysis', 'Airframe Design'],
    image: '/assets/projects/project-catia-cad.jpg',
    link: '#pillars'
  },
  {
    id: 'web-pentest-lab',
    title: 'Web Application Penetration Testing & OWASP Top 10 Audit',
    category: 'CYBERSECURITY',
    badge: 'Web Pentesting',
    desc: 'Targeted web vulnerability assessment identifying SQL injection, cross-site scripting (XSS), broken access control, and authentication bypasses.',
    details: 'Utilized Burp Suite Professional to intercept and manipulate HTTP/S traffic, automate fuzzing using Gobuster and ffuf, perform SQLi validation with Sqlmap, and produce remediation documentation.',
    technologies: ['Web Pentesting', 'Burp Suite', 'OWASP Top 10', 'Kali Linux', 'Gobuster', 'Sqlmap', 'Nikto'],
    image: '/assets/projects/project-web-pentest.jpg',
    link: '#pillars'
  },
  {
    id: 'cyber-recon-lab',
    title: 'Network Reconnaissance & Threat Forensics Operations',
    category: 'CYBERSECURITY',
    badge: 'Network Defense',
    desc: 'Comprehensive authorized security lab executing network mapping, packet forensics, and perimeter baselining.',
    details: 'Conducted network discovery using Nmap with custom NSE scripts, deep packet inspection of encrypted TLS handshakes via Wireshark, and defensive Linux hardening against unauthorized ingress.',
    technologies: ['Wireshark', 'Nmap', 'Kali Linux', 'Metasploit', 'Packet Analysis', 'Linux Hardening'],
    image: '/assets/projects/project-network-recon.jpg',
    link: '#pillars'
  },
  {
    id: 'after-effects-editorial',
    title: 'Adobe After Effects Motion Graphics & Cinematic Visual Reel',
    category: 'VIDEO',
    badge: 'Motion Design',
    desc: 'High-production value motion graphics, visual effects choreography, kinetic typography, and technical showreels.',
    details: 'Engineered custom kinetic title sequences in Adobe After Effects, dynamic visual rhythm, procedural transitions, Fairlight audio mixing, and technical project reels.',
    technologies: ['Adobe After Effects', 'Motion Graphics', 'Visual Effects', 'Kinetic Typography', 'Adobe Premiere Pro', 'Sound Design'],
    image: '/assets/projects/project-after-effects.jpg',
    link: '#pillars'
  },
  {
    id: 'graphic-brand-system',
    title: 'Samurai Tech Brand Identity & Graphic Design Systems',
    category: 'DESIGN',
    badge: 'Graphic Design',
    desc: 'Brand identity systems, vector iconography, and editorial poster series fusing Samurai Bushido aesthetics with futuristic technological motifs.',
    details: 'Designed cohesive visual systems, logo emblems, typography hierarchies, and digital UI layouts using Figma, Adobe Illustrator, and Canva Pro.',
    technologies: ['Graphic Design', 'Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Canva Pro', 'Typography'],
    image: '/assets/projects/project-brand-design.jpg',
    link: '#pillars'
  },
  {
    id: 'android-rtmp-cam',
    title: 'Native Android CameraX & RTMP Broadcaster',
    category: 'SOFTWARE',
    badge: 'Mobile Systems',
    desc: 'High-performance Android application built with Kotlin and Jetpack Compose for low-latency live video streaming.',
    details: 'Direct integration with Android CameraX hardware pipeline, real-time audio/video multiplexing, and direct RTMP transmission with telemetry diagnostics.',
    technologies: ['Android', 'Kotlin', 'Jetpack Compose', 'CameraX', 'RTMP', 'Coroutines'],
    image: '/assets/projects/project-android-camerax.jpg',
    link: '#pillars'
  },
  {
    id: 'esp32-telemetry',
    title: 'ESP32-CAM Remote Surveillance & Sensor Hub',
    category: 'ELECTRONICS',
    badge: 'IoT Hardware',
    desc: 'Wireless embedded telemetry station featuring camera streaming, environmental sensors, and OLED real-time diagnostics.',
    details: 'Engineered an autonomous sensing platform with OV2640 video capture, Wi-Fi web socket feed, I2C telemetry, and motor control triggering.',
    technologies: ['ESP32', 'ESP32-CAM', 'Arduino C++', 'I2C OLED', 'Servo Gimbal', 'WebSockets'],
    image: '/assets/projects/project-esp32-telemetry.jpg',
    link: '#pillars'
  }
];
