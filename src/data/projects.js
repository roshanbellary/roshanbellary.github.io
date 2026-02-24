const projects = [
  {
    title: 'EarlyBird',
    award: '3rd Place - ElevenLabs @ TreeHacks',
    date: 'Feb 2025',
    description:
      'AI-driven podcast system that generates personalized news content in real time with interactive user engagement. Modular pipeline integrating Perplexity Sonar for news retrieval, ChatGPT for research distillation, and Mistral for dynamic response generation.',
    technologies: ['Flask', 'LangChain', 'Next.js', 'ShadCN', 'ElevenLabs', 'Python'],
    links: [{ label: 'GitHub', url: 'https://github.com/roshanbellary/EarlyBird' }],
  },
  {
    title: 'Percival',
    award: '1st Place @ YHacks',
    date: 'Oct 2024',
    description:
      'AI-powered platform leveraging speech-to-text and PDF data extraction to automate and anonymize patient data entry for doctors. Converts verbal notes into structured medical forms with integrated speech-to-text capabilities.',
    technologies: ['Flask', 'MongoDB', 'Next.js', 'Cloudflare', 'OpenAI Whisper'],
    links: [{ label: 'GitHub', url: 'https://github.com/roshanbellary/Percival' }],
  },
  {
    title: 'PennOS',
    award: null,
    date: 'Jan 2025 - May 2025',
    description:
      'Unix-inspired operating system in 7,000+ lines of pure C, featuring a custom round-robin scheduler, thread-based process model, terminal shell with foreground/background jobs, signal handling, and built-in commands replicating core Bash functionality.',
    technologies: ['C', 'Operating Systems', 'Scheduling', 'Memory Management'],
    links: [{ label: 'GitHub', url: 'https://github.com/roshanbellary/OS' }],
  },
  {
    title: 'Catalyst Kitchens Dashboard',
    award: null,
    date: '2024',
    description:
      'Full-stack data analytics dashboard for a 1,500+ food bank network, processing 100K+ distribution records. Built through UPenn Hack4Impact, reducing reporting time by 80%.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    links: [],
  },
  {
    title: 'ISS Microgravity Microbial Fuel Cell',
    award: '1st Place - ASGSR',
    date: '2021 - 2023',
    description:
      'Led a team of 8 to design and launch a microbial fuel cell experiment aboard the International Space Station, studying bioelectricity generation in microgravity conditions.',
    technologies: ['Experimental Design', 'Data Analysis', 'Microbiology'],
    links: [],
  },
  {
    title: 'Ukraine-Russia Conflict NLP Analysis',
    award: null,
    date: '2022',
    description:
      'Conducted NLP and sentiment analysis on public discourse surrounding the Ukraine-Russia conflict using R and Python. Produced a research paper and poster on findings.',
    technologies: ['Python', 'R', 'NLP', 'Sentiment Analysis'],
    links: [{ label: 'GitHub', url: 'https://github.com/roshanbellary/Ukrainian-Russian-Conflict-Tweet-Analysis' }],
  },
  {
    title: 'Double Star & Eclipsing Binary Research',
    award: null,
    date: '2021 - 2022',
    description:
      'Performed double star analysis and eclipsing binary light curve modeling. Published research on observational findings in stellar astronomy.',
    technologies: ['Python', 'Astrophysics', 'Data Analysis'],
    links: [],
  },
];

export default projects;
