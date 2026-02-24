const experience = [
  {
    role: 'Incoming Software Engineering Intern',
    company: 'Citadel Securities',
    dates: 'Summer 2026',
    description: [
      'Joining the Trading Ecosystems team to build scalable, low-latency software systems that power data infrastructure and analysis systems',
    ],
    technologies: ['C++', 'Python', 'Distributed Systems'],
  },
  {
    role: 'Forward Deployed Software Engineering Intern',
    company: 'Palantir Technologies',
    dates: 'Aug 2025 - Dec 2025',
    description: [
      'Built and optimized enterprise-scale data pipeline infrastructure for a major client, combining real-time data ingestion with forecasting models to improve operational throughput',
      'Delivered a production ML system for operational forecasting with calibrated uncertainty, enabling better resource management and fewer scheduling overruns',
      'Implemented a Monte-Carlo optimization system that identified latent capacity and increased daily throughput by filling previously unusable schedule gaps',
    ],
    technologies: ['Python', 'Java', 'SQL', 'Palantir Foundry'],
  },
  {
    role: 'Quantitative Developer Intern',
    company: 'Tanius Technology',
    dates: 'May 2025 - Aug 2025',
    description: [
      'Built a multi-threaded low-latency C/C++ packet capture and transmission system for ingesting proprietary trading messages over TCP/UDP, decoding fill and order placement events',
      'Rewrote Smart-NIC drivers in C/C++ for firmwide upgrade; developed comprehensive testing suite to validate TCP/UDP communication across protocols',
      'Designed and implemented a CME market simulator to test trading strategies\' order placements and data ingestion behavior prior to FPGA deployment',
      'Researched and backtested a PCA mean reversion strategy on commodities contracts, implemented as a systematic trading algorithm',
    ],
    technologies: ['C', 'C++', 'TCP/UDP', 'FPGA', 'Python'],
  },
  {
    role: 'AI Developer Intern',
    company: 'Tenere Capital',
    dates: 'Feb 2025 - May 2025',
    description: [
      'Architected multi-agent LLM systems in Python using LangChain for automated research and analysis workflows, processing large volumes of documents daily',
      'Implemented Graph RAG architecture for structured knowledge extraction, increasing research workflow efficiency and reducing manual analysis time significantly',
      'Built automated intelligence reporting tools for investment research, directly contributing to portfolio decision-making',
    ],
    technologies: ['Python', 'LangChain', 'Graph RAG', 'OpenAI API'],
  },
  {
    role: 'Technical Advisor Intern',
    company: 'Scale AI',
    dates: 'Feb 2025 - May 2025',
    description: [
      'Contributing to AI research initiatives, improving model reasoning and identifying failure modes in generative AI systems',
      'Conducting independent research and experiments on model behavior',
    ],
    technologies: ['Python', 'LLMs', 'AI Safety'],
  },
  {
    role: 'Fullstack and AI Engineering Intern',
    company: 'Catio',
    dates: 'May 2024 - Aug 2024',
    description: [
      'Built comprehensive analytics platform in Go and Python extracting conversation metrics, latency data, and output quality from agent interactions',
      'Expanded LLM knowledge bases with 10K+ diverse technical documents and implemented advanced RAG architectures, achieving 89% accuracy in tech stack recommendations',
      'Developed entity-relationship mapping system that automatically generates client deployment architecture diagrams',
    ],
    technologies: ['Go', 'Python', 'RAG', 'LLMs', 'Analytics'],
  },
  {
    role: 'Full-stack Developer, VP of External & Technical Lead',
    company: 'UPenn Hack4Impact',
    dates: 'Nov 2023 - Present',
    description: [
      'Directed 10-developer team delivering mission-critical applications for nonprofits with 100% on-time delivery rate',
      'Built full-stack data analytics dashboard for a national food bank network, processing 100K+ distribution records and reducing reporting time by 80%',
      'Created automated deployment platform using Terraform, Docker, and GitHub Actions, reducing client deployment time from 2 weeks to 2 hours',
    ],
    technologies: ['React', 'Next.js', 'Terraform', 'Docker', 'GitHub Actions', 'Node.js'],
  },
];

export default experience;
