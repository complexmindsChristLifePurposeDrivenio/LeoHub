import { BlueprintWeek, ScheduledCalendarEvent, BrandDivision } from "../types";

export const BLUEPRINT_START_DATE = "2026-09-21";
export const BLUEPRINT_END_DATE = "2026-12-18";
export const BLUEPRINT_TOTAL_WEEKS = 13;
export const BLUEPRINT_TOTAL_EVENTS = 143;

export const BLUEPRINT_WEEKS_RAW: Omit<BlueprintWeek, "days">[] = [
  {
    weekNumber: 1,
    phase: "Foundation",
    primaryFocus: "Cornerstone, GitHub, Supabase, Sanity",
    startDate: "2026-09-21",
    endDate: "2026-09-25",
    brandDivision: "Cornerstone OS",
    primaryOutcome: "Spin up primary GitHub monorepo, Supabase Postgres database with row-level security, Sanity studio content schema, and central secret manager.",
    techStack: ["Cornerstone OS", "GitHub", "Supabase", "Sanity CMS", "n8n", "TypeScript"],
    associatedModuleTab: "developer_portal",
    keyDeliverables: [
      { id: "w1-1", title: "Cornerstone OS Monorepo initialized on GitHub with strict branch rules", category: "Infrastructure" },
      { id: "w1-2", title: "Supabase project provisioned with auth & master tenant schema", category: "Database" },
      { id: "w1-3", title: "Sanity v3 Studio deployed with core content types (video, essay, drop)", category: "CMS" },
      { id: "w1-4", title: "Cornerstone base environment variables & CI/CD deployment pipeline", category: "DevOps" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Monorepo Build Status", target: "100% Passing" },
        { label: "Supabase DB Latency", target: "< 45ms" },
        { label: "Sanity Schema Deploy", target: "4 schemas active" },
      ],
      notes: "Establish zero-friction foundational layer to prevent rework down the line.",
    },
  },
  {
    weekNumber: 2,
    phase: "Data + Agents",
    primaryFocus: "Master schema, agents, GODMOD3",
    startDate: "2026-09-28",
    endDate: "2026-10-02",
    brandDivision: "ComplexMinds",
    primaryOutcome: "Deploy cross-brand Master Data Schema, multi-agent orchestrator, and GODMOD3 autonomous synthesis loop.",
    techStack: ["AI Agents", "GODMOD3", "n8n", "Supabase pgvector", "Gemini 3.8", "LangChain"],
    associatedModuleTab: "ai_lab",
    keyDeliverables: [
      { id: "w2-1", title: "Cross-system Master Schema mapping content, products, and creator assets", category: "Architecture" },
      { id: "w2-2", title: "Autonomous research agent loop wired with n8n webhook triggers", category: "AI Agents" },
      { id: "w2-3", title: "GODMOD3 execution pipeline with verification gates", category: "Agent Engine" },
      { id: "w2-4", title: "pgvector semantic index for prompt memories and brand knowledge", category: "Vector DB" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Agent Task Success Rate", target: "> 94%" },
        { label: "GODMOD3 Loop Iteration Time", target: "< 12s" },
        { label: "Vector Index Embeddings", target: "1,500 docs indexed" },
      ],
      notes: "Agents must adhere to strict human-in-the-loop verification gates before publishing.",
    },
  },
  {
    weekNumber: 3,
    phase: "Content Engine",
    primaryFocus: "Content models, prompts, asset system",
    startDate: "2026-10-05",
    endDate: "2026-10-09",
    brandDivision: "Cornerstone OS",
    primaryOutcome: "Finalize structured content models, master prompt repository, and automated asset storage pipeline for high-output creator production.",
    techStack: ["Content Models", "Prompt Engineering", "Cloudflare R2", "Sanity Assets", "Liquid Glass UI"],
    associatedModuleTab: "creator_studio",
    keyDeliverables: [
      { id: "w3-1", title: "Reusable video script and 9:16 short-form prompt taxonomy", category: "Content" },
      { id: "w3-2", title: "Automated media transcoding and thumbnail generation pipeline", category: "Asset System" },
      { id: "w3-3", title: "Brand design tokens (Liquid Glass, neon highlights, typography)", category: "Design System" },
      { id: "w3-4", title: "High-retention hook template matrix across 4 media formats", category: "Creative" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Prompt Pack Variations", target: "25 tested models" },
        { label: "Asset Upload Latency", target: "< 1.2s to CDN" },
        { label: "Hook Retention Benchmark", target: "> 70% 3s hold" },
      ],
      notes: "Week 3 is the active benchmark phase. Lock down repeatable creative infrastructure.",
    },
  },
  {
    weekNumber: 4,
    phase: "Distribution",
    primaryFocus: "YouTube-first publishing + analytics",
    startDate: "2026-10-12",
    endDate: "2026-10-16",
    brandDivision: "CMPlay",
    primaryOutcome: "Build YouTube-first syndication engine, automated cross-posting to TikTok/Reels/X, and unified telemetry dashboard.",
    techStack: ["YouTube Data API", "n8n Automation", "Analytics Telemetry", "Buffer/PostBridge", "Supabase"],
    associatedModuleTab: "video_lab",
    keyDeliverables: [
      { id: "w4-1", title: "Automated YouTube video package generator (metadata, tags, chapters)", category: "Distribution" },
      { id: "w4-2", title: "9:16 vertical derivative clipper with dynamic burned-in subtitles", category: "ClipForge" },
      { id: "w4-3", title: "Real-time viewer retention analytics connector", category: "Analytics" },
      { id: "w4-4", title: "Multi-brand distribution queue with scheduled release windows", category: "Syndication" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Publish-to-Distribution Time", target: "< 15 minutes" },
        { label: "Cross-platform Syndication", target: "4 networks synchronized" },
        { label: "Click-Through Rate Target", target: "> 8.5% CTR" },
      ],
      notes: "YouTube longform serves as the anchor asset; vertical cutdowns feed the top-of-funnel.",
    },
  },
  {
    weekNumber: 5,
    phase: "ComplexMinds",
    primaryFocus: "AI/software/automation products",
    startDate: "2026-10-19",
    endDate: "2026-10-23",
    brandDivision: "ComplexMinds",
    primaryOutcome: "Ship ComplexMinds automation kits, AI consulting workflows, and downloadable enterprise prompt architectures.",
    techStack: ["ComplexMinds", "Next.js", "Docker", "n8n Workflows", "Stripe API"],
    associatedModuleTab: "ai_lab",
    keyDeliverables: [
      { id: "w5-1", title: "ComplexMinds autonomous workflow starter kit (n8n + Gemini)", category: "Product" },
      { id: "w5-2", title: "Enterprise AI prompt and RAG architecture documentation pack", category: "Documentation" },
      { id: "w5-3", title: "ComplexMinds client portal with self-service API key management", category: "Software" },
      { id: "w5-4", title: "Lead capture assessment tool for software automation audits", category: "Marketing" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Workflow Templates Shipped", target: "6 turnkey workflows" },
        { label: "Audit Assessment Submissions", target: "> 25 qualified leads" },
        { label: "Kit Download Conversion Rate", target: "> 14%" },
      ],
      notes: "Position ComplexMinds as the premium technical arm of the Cornerstone ecosystem.",
    },
  },
  {
    weekNumber: 6,
    phase: "CMPlay",
    primaryFocus: "Gaming/media infrastructure",
    startDate: "2026-10-26",
    endDate: "2026-10-30",
    brandDivision: "CMPlay",
    primaryOutcome: "Solidify CMPlay gaming hub, GTA VI countdown tracker, Leonida intelligence map, and Dojo creator curriculum.",
    techStack: ["CMPlay", "Leonida Intelligence", "ClipForge", "Three.js/Map", "WebSockets"],
    associatedModuleTab: "overdrive_vi",
    keyDeliverables: [
      { id: "w6-1", title: "CMPlay Leonida geographic coordinates map & district deep-dives", category: "Gaming" },
      { id: "w6-2", title: "GTA Dojo belt progression curriculum (White to Black Belt)", category: "Education" },
      { id: "w6-3", title: "Countdown telemetry to Nov 19, 2026 GTA VI launch", category: "Telemetry" },
      { id: "w6-4", title: "Community clip submission board with rights verification checks", category: "Community" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Map Entity Points of Interest", target: "120+ verified nodes" },
        { label: "Dojo Course Completion Rate", target: "> 65%" },
        { label: "Clip Submissions Vetted", target: "50+ clips" },
      ],
      notes: "Prep the gaming community for the massive surge ahead of the Leonida release.",
    },
  },
  {
    weekNumber: 7,
    phase: "ChristLIFE.io",
    primaryFocus: "Faith content/community pipeline",
    startDate: "2026-11-02",
    endDate: "2026-11-06",
    brandDivision: "ChristLIFE.io",
    primaryOutcome: "Launch ChristLIFE.io faith-driven devotionals, discipleship community pipelines, and scripture study tools.",
    techStack: ["ChristLIFE.io", "Sanity CMS", "Supabase Auth", "Audio Podcasting", "Community Forums"],
    associatedModuleTab: "community",
    keyDeliverables: [
      { id: "w7-1", title: "Daily scripture audio reflection generation and RSS distribution", category: "Audio/Podcasting" },
      { id: "w7-2", title: "ChristLIFE community prayer and discipleship study groups", category: "Community" },
      { id: "w7-3", title: "Clean, uplifting visual design system and scripture typography cards", category: "Design" },
      { id: "w7-4", title: "Member onboarding journey and email spiritual discipleship sequence", category: "Email Engine" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Daily Devotionals Automated", target: "30 days in advance" },
        { label: "Active Prayer Circles", target: "15 active cohorts" },
        { label: "Email Open Rate Benchmark", target: "> 52%" },
      ],
      notes: "Ensure reverence, fidelity, and authentic community connection across all media.",
    },
  },
  {
    weekNumber: 8,
    phase: "Sports",
    primaryFocus: "Analytics + sports media",
    startDate: "2026-11-09",
    endDate: "2026-11-13",
    brandDivision: "Sports Analytics",
    primaryOutcome: "Build sports performance analytics engine, game breakdown visuals, and high-cadence highlight reels.",
    techStack: ["Sports Data APIs", "Python/Polars", "Motion Graphics", "Chart.js", "ClipForge"],
    associatedModuleTab: "analytics",
    keyDeliverables: [
      { id: "w8-1", title: "Live sports box score and advanced metric ingestion pipeline", category: "Data Ingestion" },
      { id: "w8-2", title: "Dynamic chart and shot-chart motion graphic overlays", category: "Visuals" },
      { id: "w8-3", title: "Automated post-game stat recap thread generator for X & YouTube", category: "Social" },
      { id: "w8-4", title: "Betting intelligence and predictive analytical model sandbox", category: "Analytics" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Stat Ingestion Latency", target: "< 5s post-whistle" },
        { label: "Recap Graphic Render Speed", target: "< 30s" },
        { label: "Analytical Model Accuracy", target: "> 68% prediction" },
      ],
      notes: "Deliver data-backed clarity faster than mainstream sports television feeds.",
    },
  },
  {
    weekNumber: 9,
    phase: "FCI",
    primaryFocus: "Wrestling universe + simulator architecture",
    startDate: "2026-11-16",
    endDate: "2026-11-20",
    brandDivision: "FCI Wrestling",
    primaryOutcome: "Architect the FCI Wrestling fictional universe, character storylines, match simulator, and retro PS2 aesthetic engine.",
    techStack: ["FCI Universe", "State Machine", "Canvas/3D Sim", "Procedural Storyline Gen", "Retro Shaders"],
    associatedModuleTab: "nostalgia_lab",
    keyDeliverables: [
      { id: "w9-1", title: "FCI Roster database with attributes, signature finishers, and rivalries", category: "Universe Lore" },
      { id: "w9-2", title: "Interactive text & visual match outcome simulator engine", category: "Simulation" },
      { id: "w9-3", title: "Retro CRT PS2 shader suite for promos, arena entrances, and PPV posters", category: "Aesthetic" },
      { id: "w9-4", title: "Weekly episodic show script generator with promo dialogue trees", category: "Storytelling" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Roster Wrestlers Registered", target: "64 unique characters" },
        { label: "Simulated Match Realism Rating", target: "> 90% positive" },
        { label: "Retro Shader Frame Rate", target: "Locked 60 FPS" },
      ],
      notes: "Week 9 aligns with the historic Nov 19, 2026 GTA VI launch milestone.",
    },
  },
  {
    weekNumber: 10,
    phase: "StreamMinds",
    primaryFocus: "AI influencers + media factories",
    startDate: "2026-11-23",
    endDate: "2026-11-27",
    brandDivision: "StreamMinds",
    primaryOutcome: "Deploy StreamMinds autonomous AI persona broadcast pipelines, synthetic voice synthesis, and multi-stream factories.",
    techStack: ["StreamMinds", "ElevenLabs", "LivePortrait", "OBS WebSocket", "Chatbot Personas"],
    associatedModuleTab: "clipforge",
    keyDeliverables: [
      { id: "w10-1", title: "Persona prompt matrix with distinctive tone, beliefs, and visual identity", category: "Personas" },
      { id: "w10-2", title: "Automated lip-synced avatar render pipeline using GPU worker nodes", category: "Media Factory" },
      { id: "w10-3", title: "Interactive livestream audience response engine with twitch/yt chat hooks", category: "Streaming" },
      { id: "w10-4", title: "24/7 autonomous radio/podcast stream loop with dynamic music cues", category: "Broadcast" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Avatar Lip-Sync Drift", target: "< 40ms offset" },
        { label: "Live Chat Response Latency", target: "< 1.8s" },
        { label: "Factory Output Capacity", target: "20 short clips/hour" },
      ],
      notes: "Strict guardrails against uncanny valley; prioritize stylized, expressive virtual avatars.",
    },
  },
  {
    weekNumber: 11,
    phase: "Products",
    primaryFocus: "Templates, prompts, workflows",
    startDate: "2026-11-30",
    endDate: "2026-12-04",
    brandDivision: "Products & Commerce",
    primaryOutcome: "Package and polish commercial digital products: Notion OS templates, n8n automation blueprints, LUT packs, and prompt libraries.",
    techStack: ["Digital Products", "Notion API", "Gumroad/LemonSqueezy", "ZIP Bundler", "License DRM"],
    associatedModuleTab: "marketplace",
    keyDeliverables: [
      { id: "w11-1", title: "Cornerstone Creator Notion OS Template (clean workspace duplication)", category: "Product Bundle" },
      { id: "w11-2", title: "Leonida / GTA VI 4K LUT & Motion Graphic Assets Kit", category: "Creative Pack" },
      { id: "w11-3", title: "ComplexMinds Production-Grade n8n Workflow Library (10 workflows)", category: "Automation" },
      { id: "w11-4", title: "Product documentation, onboarding video guides, and license keys", category: "Fulfillment" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Packaged Product SKUs", target: "4 premium products" },
        { label: "Product Documentation Completeness", target: "100% video verified" },
        { label: "Average Product Rating Benchmark", target: "4.9 / 5.0" },
      ],
      notes: "Products must be turnkey: buyer should realize initial value within 5 minutes of purchase.",
    },
  },
  {
    weekNumber: 12,
    phase: "Sales",
    primaryFocus: "Offers, landing pages, Stripe, CRM",
    startDate: "2026-12-07",
    endDate: "2026-12-11",
    brandDivision: "Products & Commerce",
    primaryOutcome: "Construct high-converting sales funnels, checkout flows with Stripe Elements, automated CRM pipelines, and lead scoring.",
    techStack: ["Stripe Elements", "HubSpot/Attio CRM", "Tailwind Checkout", "Webhooks", "Postmark Email"],
    associatedModuleTab: "monetization",
    keyDeliverables: [
      { id: "w12-1", title: "High-converting offer landing page with social proof & interactive ROI calculator", category: "Sales Funnel" },
      { id: "w12-2", title: "Stripe subscription & one-time payment integration with Apple Pay / Google Pay", category: "Payments" },
      { id: "w12-3", title: "CRM customer onboarding lifecycle & abandon-cart recapture automations", category: "CRM" },
      { id: "w12-4", title: "Affiliate partner portal and creator commission payout tracker", category: "Growth" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "Checkout Conversion Rate", target: "> 6.2%" },
        { label: "Stripe Webhook Delivery Success", target: "99.9%" },
        { label: "CRM Lead Routing Speed", target: "< 3 seconds" },
      ],
      notes: "Every friction point between product interest and checkout confirmation eliminated.",
    },
  },
  {
    weekNumber: 13,
    phase: "Integration",
    primaryFocus: "Audit, SOPs, integration, next-quarter plan",
    startDate: "2026-12-14",
    endDate: "2026-12-18",
    brandDivision: "Cornerstone OS",
    primaryOutcome: "Full systems audit, comprehensive SOP documentation library, cross-brand integration review, and 2027 Q1 blueprint synthesis.",
    techStack: ["Cornerstone Audit", "Markdown SOPs", "Security Hardening", "Q1 2027 Roadmap"],
    associatedModuleTab: "command_center",
    keyDeliverables: [
      { id: "w13-1", title: "Comprehensive architecture audit & database index optimization", category: "Engineering Audit" },
      { id: "w13-2", title: "Standard Operating Procedures (SOP) Master Index for autonomous operation", category: "Documentation" },
      { id: "w13-3", title: "End-of-Quarter Cornerstone Financial & Creator Analytics Report", category: "Finance" },
      { id: "w13-4", title: "Q1 2027 Blueprint roadmap and 90-day operating calendar iteration", category: "Strategy" },
    ],
    scorecardDefaults: {
      kpis: [
        { label: "System Uptime Quarter Benchmark", target: "> 99.8%" },
        { label: "SOP Coverage for Critical Paths", target: "100% documented" },
        { label: "Q1 2027 Outcomes Defined", target: "13 fresh weekly goals" },
      ],
      notes: "The loop completes and restarts: Blueprint → Calendar → Outcome → Next Iteration.",
    },
  },
];

// Helper to calculate exact date strings given week number and day index (0 = Monday ... 4 = Friday)
export function getScheduleDateForWeekDay(weekNum: number, dayIndex: number): string {
  // Week 1 starts on 2026-09-21 (Monday)
  const baseDate = new Date(2026, 8, 21); // Month 8 is September (0-indexed)
  const daysOffset = (weekNum - 1) * 7 + dayIndex;
  const targetDate = new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, "0");
  const d = String(targetDate.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function buildFullBlueprintWeeks(): BlueprintWeek[] {
  return BLUEPRINT_WEEKS_RAW.map((rawWeek) => {
    const days: BlueprintWeek["days"] = [
      {
        dayName: "Monday",
        dateString: getScheduleDateForWeekDay(rawWeek.weekNumber, 0),
        theme: "Strategy + Architecture",
        primaryFocus: `Plan and select Week ${rawWeek.weekNumber}'s primary outcome for ${rawWeek.phase} (${rawWeek.brandDivision}).`,
        morningBlock: {
          time: "09:00 - 12:00 CT",
          action: "Architectural scoping & primary deliverable selection",
          deliverable: `Week ${rawWeek.weekNumber} Scope Document & Target Deliverable Definition`,
        },
        afternoonBlock: {
          time: "13:00 - 16:00 CT",
          focus: "Deep learning & environment setup",
          activity: `Research tooling, evaluate dependencies for ${rawWeek.primaryFocus}, and calibrate architecture parameters.`,
        },
      },
      {
        dayName: "Tuesday",
        dateString: getScheduleDateForWeekDay(rawWeek.weekNumber, 1),
        theme: "Build + Capture",
        primaryFocus: `Heavy technical/product development for ${rawWeek.phase}.`,
        morningBlock: {
          time: "09:00 - 12:00 CT",
          action: "Heavy technical engineering & product development",
          deliverable: `Core functional code, schema migrations, and engine build commits`,
        },
        afternoonBlock: {
          time: "13:00 - 16:00 CT",
          focus: "Creative capture & screen-recording",
          activity: "Capture live workflow walkthroughs, terminal demos, and product footage for content assets.",
        },
      },
      {
        dayName: "Wednesday",
        dateString: getScheduleDateForWeekDay(rawWeek.weekNumber, 2),
        theme: "Assembly + Production",
        primaryFocus: `Connect the pieces into a working system for ${rawWeek.brandDivision}.`,
        morningBlock: {
          time: "09:00 - 12:00 CT",
          action: "System synthesis & end-to-end integration",
          deliverable: `Working pipeline integration across frontend, backend, and external APIs`,
        },
        afternoonBlock: {
          time: "13:00 - 16:00 CT",
          focus: "System testing & pipeline QA",
          activity: "Stress-test failure modes, run automated test suites, and refine UI micro-interactions.",
        },
      },
      {
        dayName: "Thursday",
        dateString: getScheduleDateForWeekDay(rawWeek.weekNumber, 3),
        theme: "Distribution + Monetization",
        primaryFocus: `Turn the work into content, products, demos, leads, or sales assets.`,
        morningBlock: {
          time: "09:00 - 12:00 CT",
          action: "Packaging assets into content, lead magnets, and product demos",
          deliverable: `Ready-to-publish YouTube package, vertical short clips, and marketing copy`,
        },
        afternoonBlock: {
          time: "13:00 - 16:00 CT",
          focus: "Syndication & revenue deployment",
          activity: "Schedule cross-platform drops across YouTube, X, TikTok, and community channels; audit checkout links.",
        },
      },
      {
        dayName: "Friday",
        dateString: getScheduleDateForWeekDay(rawWeek.weekNumber, 4),
        theme: "Reflection + Business Operations",
        primaryFocus: `Review progress, analytics, revenue, blockers, documentation, and next week's priorities.`,
        morningBlock: {
          time: "09:00 - 12:00 CT",
          action: "Business operations review & documentation sprint",
          deliverable: `Updated system docs, GitHub release notes, and blocker post-mortem`,
        },
        afternoonBlock: {
          time: "13:00 - 16:00 CT",
          focus: "Data analytics & workspace cleanup",
          activity: "Audit viewer retention curves, Stripe sales telemetry, and clean git branches.",
        },
        eveningBlock: {
          time: "17:00 - 19:30 CT",
          deliverable: "Cornerstone Scorecard (KPI audit) + Content Command Logbook (Weekly outcomes logged)",
        },
      },
    ];

    return {
      ...rawWeek,
      days,
    };
  });
}

export const BLUEPRINT_WEEKS: BlueprintWeek[] = buildFullBlueprintWeeks();

// Generate the 143 scheduled events covering the 13-week blueprint in Central Time (America/Chicago)
export function generateAll143ScheduledEvents(): ScheduledCalendarEvent[] {
  const events: ScheduledCalendarEvent[] = [];
  const weeks = BLUEPRINT_WEEKS;

  weeks.forEach((w) => {
    // Event 1: Monday Morning (09:00 - 12:00 CT)
    events.push({
      id: `w${w.weekNumber}-mon-morning`,
      uid: `cornerstone-w${w.weekNumber}-mon-am@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Monday",
      date: w.days[0].dateString,
      startTime: "09:00",
      endTime: "12:00",
      timezone: "America/Chicago",
      summary: `W${w.weekNumber} Strategy + Architecture: ${w.phase} (${w.brandDivision})`,
      description: `Plan and select Week ${w.weekNumber}'s primary outcome for ${w.phase}.\nDeliverable: ${w.days[0].morningBlock.deliverable}\nFocus: ${w.primaryFocus}`,
      brandDivision: w.brandDivision,
      eventType: "strategy",
      location: "Cornerstone Architecture War Room / Zoom",
    });

    // Event 2: Monday Afternoon Block (13:00 - 16:00 CT)
    events.push({
      id: `w${w.weekNumber}-mon-afternoon`,
      uid: `cornerstone-w${w.weekNumber}-mon-pm@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Monday",
      date: w.days[0].dateString,
      startTime: "13:00",
      endTime: "16:00",
      timezone: "America/Chicago",
      summary: `Daily Afternoon Block: Architecture QA & Deep Learning (W${w.weekNumber})`,
      description: `Focus: ${w.days[0].afternoonBlock.focus}\nActivity: ${w.days[0].afternoonBlock.activity}`,
      brandDivision: w.brandDivision,
      eventType: "afternoon_block",
      location: "Deep Work Lab",
    });

    // Event 3: Tuesday Morning (09:00 - 12:00 CT)
    events.push({
      id: `w${w.weekNumber}-tue-morning`,
      uid: `cornerstone-w${w.weekNumber}-tue-am@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Tuesday",
      date: w.days[1].dateString,
      startTime: "09:00",
      endTime: "12:00",
      timezone: "America/Chicago",
      summary: `W${w.weekNumber} Build + Capture: Heavy Technical Development`,
      description: `Heavy technical/product development for ${w.phase}.\nDeliverable: ${w.days[1].morningBlock.deliverable}\nStack: ${w.techStack.join(", ")}`,
      brandDivision: w.brandDivision,
      eventType: "build",
      location: "GitHub Monorepo / VS Code",
    });

    // Event 4: Tuesday Afternoon Block (13:00 - 16:00 CT)
    events.push({
      id: `w${w.weekNumber}-tue-afternoon`,
      uid: `cornerstone-w${w.weekNumber}-tue-pm@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Tuesday",
      date: w.days[1].dateString,
      startTime: "13:00",
      endTime: "16:00",
      timezone: "America/Chicago",
      summary: `Daily Afternoon Block: Technical Capture & Screen-Record (W${w.weekNumber})`,
      description: `Focus: ${w.days[1].afternoonBlock.focus}\nActivity: ${w.days[1].afternoonBlock.activity}`,
      brandDivision: w.brandDivision,
      eventType: "afternoon_block",
      location: "Studio Capture Rig",
    });

    // Event 5: Wednesday Morning (09:00 - 12:00 CT)
    events.push({
      id: `w${w.weekNumber}-wed-morning`,
      uid: `cornerstone-w${w.weekNumber}-wed-am@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Wednesday",
      date: w.days[2].dateString,
      startTime: "09:00",
      endTime: "12:00",
      timezone: "America/Chicago",
      summary: `W${w.weekNumber} Assembly + Production: Working System Integration`,
      description: `Connect the pieces into a working system for ${w.phase}.\nDeliverable: ${w.days[2].morningBlock.deliverable}`,
      brandDivision: w.brandDivision,
      eventType: "assembly",
      location: "Staging Pipeline",
    });

    // Event 6: Wednesday Afternoon Block (13:00 - 16:00 CT)
    events.push({
      id: `w${w.weekNumber}-wed-afternoon`,
      uid: `cornerstone-w${w.weekNumber}-wed-pm@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Wednesday",
      date: w.days[2].dateString,
      startTime: "13:00",
      endTime: "16:00",
      timezone: "America/Chicago",
      summary: `Daily Afternoon Block: Pipeline QA & System Testing (W${w.weekNumber})`,
      description: `Focus: ${w.days[2].afternoonBlock.focus}\nActivity: ${w.days[2].afternoonBlock.activity}`,
      brandDivision: w.brandDivision,
      eventType: "afternoon_block",
      location: "QA Environment",
    });

    // Event 7: Thursday Morning (09:00 - 12:00 CT)
    events.push({
      id: `w${w.weekNumber}-thu-morning`,
      uid: `cornerstone-w${w.weekNumber}-thu-am@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Thursday",
      date: w.days[3].dateString,
      startTime: "09:00",
      endTime: "12:00",
      timezone: "America/Chicago",
      summary: `W${w.weekNumber} Distribution + Monetization: Packaging & Demos`,
      description: `Turn the work into content, products, demos, leads, or sales assets.\nDeliverable: ${w.days[3].morningBlock.deliverable}`,
      brandDivision: w.brandDivision,
      eventType: "distribution",
      location: "Creator Studio / ClipForge",
    });

    // Event 8: Thursday Afternoon Block (13:00 - 16:00 CT)
    events.push({
      id: `w${w.weekNumber}-thu-afternoon`,
      uid: `cornerstone-w${w.weekNumber}-thu-pm@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Thursday",
      date: w.days[3].dateString,
      startTime: "13:00",
      endTime: "16:00",
      timezone: "America/Chicago",
      summary: `Daily Afternoon Block: Syndication & Asset Scheduling (W${w.weekNumber})`,
      description: `Focus: ${w.days[3].afternoonBlock.focus}\nActivity: ${w.days[3].afternoonBlock.activity}`,
      brandDivision: w.brandDivision,
      eventType: "afternoon_block",
      location: "Distribution Dispatch",
    });

    // Event 9: Friday Morning (09:00 - 12:00 CT)
    events.push({
      id: `w${w.weekNumber}-fri-morning`,
      uid: `cornerstone-w${w.weekNumber}-fri-am@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Friday",
      date: w.days[4].dateString,
      startTime: "09:00",
      endTime: "12:00",
      timezone: "America/Chicago",
      summary: `W${w.weekNumber} Reflection + Business Operations: Progress & Blockers`,
      description: `Review progress, analytics, revenue, blockers, documentation, and next week's priorities.\nDeliverable: ${w.days[4].morningBlock.deliverable}`,
      brandDivision: w.brandDivision,
      eventType: "review",
      location: "Operations Desk",
    });

    // Event 10: Friday Afternoon Block (13:00 - 16:00 CT)
    events.push({
      id: `w${w.weekNumber}-fri-afternoon`,
      uid: `cornerstone-w${w.weekNumber}-fri-pm@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Friday",
      date: w.days[4].dateString,
      startTime: "13:00",
      endTime: "16:00",
      timezone: "America/Chicago",
      summary: `Daily Afternoon Block: Analytics Audit & Cleanup (W${w.weekNumber})`,
      description: `Focus: ${w.days[4].afternoonBlock.focus}\nActivity: ${w.days[4].afternoonBlock.activity}`,
      brandDivision: w.brandDivision,
      eventType: "afternoon_block",
      location: "Analytics Telemetry Desk",
    });

    // Event 11: Friday Evening (17:00 - 19:30 CT)
    events.push({
      id: `w${w.weekNumber}-fri-evening`,
      uid: `cornerstone-w${w.weekNumber}-fri-eve@cmplay.internal`,
      weekNumber: w.weekNumber,
      phaseName: w.phase,
      dayName: "Friday",
      date: w.days[4].dateString,
      startTime: "17:00",
      endTime: "19:30",
      timezone: "America/Chicago",
      summary: `W${w.weekNumber} Friday Evening: Cornerstone Scorecard + Content Command Logbook`,
      description: `Official weekly review & sign-off.\nDeliverables:\n1. Cornerstone Scorecard (Score progress, triage blockers, rate KPIs)\n2. Content Command Logbook (Log published assets, metrics, next week priorities).\nRule: Blueprint → Calendar → Outcome → Build → Content → Distribution → Revenue → Review.`,
      brandDivision: w.brandDivision,
      eventType: "evening_scorecard",
      location: "Executive Scorecard Portal",
    });
  });

  return events;
}

export const ALL_143_EVENTS: ScheduledCalendarEvent[] = generateAll143ScheduledEvents();

// Format date and time into RFC 5545 timestamp format: YYYYMMDDTHHmmss
function formatIcsDateTime(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const [hour, min] = timeStr.split(":");
  return `${year}${month}${day}T${hour}${min}00`;
}

// Generate the complete RFC 5545 compliant .ics string for all 143 scheduled events
export function generateIcsCalendarContent(): string {
  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  let ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cornerstone OS//13-Week Operating Blueprint//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Cornerstone OS 90-Day Blueprint",
    "X-WR-TIMEZONE:America/Chicago",
    "X-WR-CALDESC:Official 13-Week Operating Blueprint beginning Sept 21 2026. 143 scheduled events covering Cornerstone infrastructure, AI agents, content engine, distribution, brand divisions, products, sales, and weekly reviews.",
    "BEGIN:VTIMEZONE",
    "TZID:America/Chicago",
    "X-LIC-LOCATION:America/Chicago",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:-0600",
    "TZOFFSETTO:-0500",
    "TZNAME:CDT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0600",
    "TZNAME:CST",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
  ].join("\r\n");

  ics += "\r\n";

  ALL_143_EVENTS.forEach((evt) => {
    const dtStart = formatIcsDateTime(evt.date, evt.startTime);
    const dtEnd = formatIcsDateTime(evt.date, evt.endTime);
    const cleanSummary = evt.summary.replace(/,/g, "\\,").replace(/;/g, "\\;");
    const cleanDescription = evt.description
      .replace(/\r\n/g, "\\n")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
    const cleanLocation = evt.location.replace(/,/g, "\\,");

    const eventBlock = [
      "BEGIN:VEVENT",
      `UID:${evt.uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;TZID=America/Chicago:${dtStart}`,
      `DTEND;TZID=America/Chicago:${dtEnd}`,
      `SUMMARY:${cleanSummary}`,
      `DESCRIPTION:${cleanDescription}`,
      `LOCATION:${cleanLocation}`,
      `CATEGORIES:Cornerstone OS,${evt.brandDivision},${evt.phaseName}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT",
    ].join("\r\n");

    ics += eventBlock + "\r\n";
  });

  ics += "END:VCALENDAR\r\n";
  return ics;
}

// Trigger client-side download of the ics file
export function triggerIcsDownload() {
  const content = generateIcsCalendarContent();
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Cornerstone_OS_Official_Blueprint_90_Day_Calendar.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
