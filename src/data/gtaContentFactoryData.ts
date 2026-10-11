import { GtaContentIdea, GtaResearchCard, GtaVideoPackage } from "../types";

export const FACTORY_METRICS = {
  ideas: 247,
  research: 31,
  production: 8,
  ready: 12,
  scheduled: 9,
  published: 63,
  ctr: 7.8,
  retention: 48,
  watchTimeHours: 12400,
};

export const TODAY_CHECKLIST = [
  { id: "td-1", task: 'Research "Vice City Hidden Drainage Smuggling Route"', done: true },
  { id: "td-2", task: "Finish Script #041: The Detail Rockstar Wants You To Miss", done: true },
  { id: "td-3", task: "Generate 18 scenes with AAA cinematic prompts", done: true },
  { id: "td-4", task: "Create 3 thumbnail concepts with extreme curiosity gap", done: false },
  { id: "td-5", task: "Schedule upload & multi-platform repurposing drops", done: false },
];

export const NICHE_QUILTING_EXAMPLES = [
  {
    inputFormula: "Why [GROUP] Are [UNEXPECTED ACTION]",
    provenCompetitorTitle: "Why Billionaires Are Leaving California",
    sourceNiche: "Business / Geopolitics",
    curiosityMechanism: "Mass migration of elite authority figures contrary to expectations",
    emotionalTrigger: "FOMO, conspiracy, economic consequence",
    gtaAdaptations: [
      {
        title: "Why Rockstar Is Hiding This GTA 6 Detail",
        angle: "Trailer telemetry and missing map coordinates",
        score: 93,
      },
      {
        title: "Why Players Are Going To Ignore This GTA 6 Feature",
        angle: "Complex fuel/inventory realism mechanic",
        score: 88,
      },
      {
        title: "Why Vice City Could Change GTA Forever",
        angle: "Volumetric hurricane physics redefining open worlds",
        score: 90,
      },
      {
        title: "Why Rockstar Changed This Part Of GTA 6",
        angle: "Dual-protagonist heist command structure change",
        score: 86,
      },
    ],
  },
  {
    inputFormula: "The [SURPRISING THING] That [RADICAL EFFECT] Nobody Noticed",
    provenCompetitorTitle: "The Single Sentence That Ended The Roman Empire",
    sourceNiche: "History Documentary",
    curiosityMechanism: "Disproportionate butterfly effect from obscure micro-detail",
    emotionalTrigger: "Intellectual discovery, exclusivity",
    gtaAdaptations: [
      {
        title: "The Radio Audio Cue That Hints At GTA 6's Real Villain",
        angle: "Vice City public radio background broadcast analysis",
        score: 91,
      },
      {
        title: "The Unmarked Motel In Port Gellhorn That Changes Everything",
        angle: "Real-world Everglades contraband history linked to Lucia",
        score: 89,
      },
    ],
  },
  {
    inputFormula: "I Investigated The [FORBIDDEN/OBSCURE ZONE] For 30 Days",
    provenCompetitorTitle: "I Spent 30 Days In The World's Most Isolated City",
    sourceNiche: "Travel / Mystery",
    curiosityMechanism: "Immersive field study with primary source findings",
    emotionalTrigger: "Deep dive journey, high effort payoff",
    gtaAdaptations: [
      {
        title: "We Mapped Every Coordinate In Leonida: Here Is What We Found",
        angle: "Community geographic triangulation versus trailer landmarks",
        score: 94,
      },
    ],
  },
];

export const SEED_IDEAS: GtaContentIdea[] = [
  {
    id: "idea-041",
    title: "The Detail Rockstar Wants You To Miss",
    angle: "Trailer 1 motel security monitor reflections reveal unannounced secondary island",
    thesis: "Rockstar's environmental set dressing in the motel sequence intentionally obfuscates a southern keys shipping corridor not present on the primary tourist map.",
    sourceStructure: "The Detail [CREATOR] Wants You To Miss",
    curiosityGap: "Why would Rockstar render background reflections of a coastline with different topography than Ocean Beach?",
    emotionalDriver: "Exclusivity & Secret Discovery",
    researchRequirement: "Pixel telemetry of security monitor, trailer frame 1422, Vice City 2002 geographic comparison",
    suggestedThumbnail: "Lucia pointing through motel blinds with glowing offshore radar anomaly + 'THEY HID THIS'",
    videoLength: "10:14",
    scores: {
      click: 94,
      retention: 92,
      originality: 95,
      research: 89,
      monetization: 88,
      engagement: 90,
      reusability: 85,
      total: 91,
    },
    status: "production",
    category: "Mysteries",
  },
  {
    id: "idea-042",
    title: "Why Rockstar Changed Lucia's Ankle Monitor Between Shots",
    angle: "Parole tracking frequency shifts indicate multi-chapter timeline structure",
    thesis: "The shifting parole device hardware across trailer scenes confirms the story spans at least three distinct chronological eras across Leonida.",
    sourceStructure: "Why [SUBJECT] Changed [MICRO DETAIL]",
    curiosityGap: "Did Rockstar make a continuity error or intentionally reveal a multi-year time jump?",
    emotionalDriver: "Detective thrill & Narrative depth",
    researchRequirement: "Florida Dept of Corrections hardware documentation, trailer 1 timestamps 0:08 vs 0:49",
    suggestedThumbnail: "Split ankle monitor macro shot with red/green status light + 'TIME JUMP?'",
    videoLength: "8:45",
    scores: {
      click: 88,
      retention: 90,
      originality: 91,
      research: 93,
      monetization: 82,
      engagement: 87,
      reusability: 80,
      total: 88,
    },
    status: "selected",
    category: "Lore & Narrative",
  },
  {
    id: "idea-043",
    title: "The Real Florida Crime Ring That Inspired Jason & Lucia",
    angle: "1994 South Beach jewelry heist crew whose court records match trailer dialogue",
    thesis: "Rockstar writers grounded Jason & Lucia not merely on Bonnie & Clyde, but on the true-crime files of the Sunshine State 'Banshee Bandits' who exploited drawbridge timing.",
    sourceStructure: "The Real [HISTORICAL EVENT] Behind [FICTIONAL ICON]",
    curiosityGap: "Who were the real-world criminal counterparts whose legal transcripts appear in Leonida Police radio chatter?",
    emotionalDriver: "True Crime intrigue & Historical authenticity",
    researchRequirement: "Miami-Dade County court archives, public records, police radio scanner frequencies",
    suggestedThumbnail: "Mugshot split with Jason/Lucia rendered character art + 'TRUE STORY'",
    videoLength: "12:30",
    scores: {
      click: 89,
      retention: 94,
      originality: 96,
      research: 95,
      monetization: 90,
      engagement: 91,
      reusability: 88,
      total: 92,
    },
    status: "research",
    category: "History & Reality",
  },
  {
    id: "idea-044",
    title: "Why Leonida's Water Physics Are A Nightmare For Rockstar",
    angle: "Volumetric buoyancy and mud suction patent breakdown",
    thesis: "Rockstar's latest physics patent reveals real-time water displacement for airboats that required re-architecting the RAGE 9 memory allocator.",
    sourceStructure: "Why [SYSTEM] Is A Nightmare For [DEVELOPER]",
    curiosityGap: "How does airboat dynamic wake differ from every previous open-world game?",
    emotionalDriver: "Technical awe & Industry insider fascination",
    researchRequirement: "Take-Two interactive patent US20230285860A1, fluid dynamics benchmarks",
    suggestedThumbnail: "Airboat cutting through swamp wake with technical vector wireframe overlay + 'HOW IT WORKS'",
    videoLength: "9:18",
    scores: {
      click: 85,
      retention: 87,
      originality: 89,
      research: 94,
      monetization: 84,
      engagement: 82,
      reusability: 86,
      total: 86,
    },
    status: "idea",
    category: "Development & Tech",
  },
  {
    id: "idea-045",
    title: "The Vice City Radio Station Rockstar Can Never Bring Back",
    angle: "Music licensing collapse and real-world 80s legal settlement",
    thesis: "Due to a multi-million dollar master rights dispute originating in 2004, the iconic Flash FM catalog cannot return in its original state, forcing an underground replacement.",
    sourceStructure: "The [BELOVED ELEMENT] That Can Never Return",
    curiosityGap: "Why will fans never hear the classic tracklist despite Rockstar's massive budget?",
    emotionalDriver: "Nostalgia & Industry exposé",
    researchRequirement: "RIAA music licensing treaties, Take-Two SEC filings, DJ voice actor contracts",
    suggestedThumbnail: "Retro cassette tape melting in neon neon palm tree glow + 'BANNED FOREVER'",
    videoLength: "11:05",
    scores: {
      click: 91,
      retention: 89,
      originality: 92,
      research: 90,
      monetization: 86,
      engagement: 93,
      reusability: 82,
      total: 89,
    },
    status: "selected",
    category: "History & Music",
  },
];

export const FEATURED_VIDEO_PACKAGE: GtaVideoPackage = {
  id: "pkg-041",
  code: "CM-GTA6-0041",
  title: "The Detail Rockstar Wants You To Miss",
  thesis: "Rockstar's environmental set dressing in the motel sequence intentionally obfuscates a southern keys shipping corridor not present on the primary tourist map, hinting at an offshore contraband economy.",
  currentState: "QA",
  originalityScore: 94,
  researchScore: 91,
  thumbnailScore: 88,
  titleScore: 92,
  riskLevel: "LOW",
  approvalStatus: "pending_approval",
  script: `[00:00 - 00:25] COLD OPEN:
Look closely at the motel room mirror behind Lucia at timestamp 0:42 of the official trailer. In the foreground, Rockstar directs your eye to the peeling wallpaper and the television glare. But if you calibrate the exposure levels on the window pane behind her left shoulder, you aren't looking at Ocean Drive. You're looking at a decommissioned shipping viaduct that doesn't exist on any official Florida tourist atlas.

[00:25 - 00:55] THE PROMISE:
Over the next nine minutes, we are not going to show you another regurgitated trailer reaction. Instead, we are breaking down primary source coastal surveys, Take-Two navigational patents, and the overlooked environmental telemetry that reveals Rockstar's secret second economy inside Leonida.

[00:55 - 02:15] CONTEXT:
When Vice City was introduced in 2002, hardware limitations required Rockstar to render the world as disconnected islands connected by loading bottlenecks. In 2026, Leonida operates on volumetric continuous geography. That means every light source, every horizon line, and every shipping container visible in a background frame must be tied to a coordinate in the game world.

[02:15 - 04:00] THE DISCOVERY:
Examine the cargo barges docked at coordinate 42-South near Port Gellhorn. While casual viewers focused on the lowrider meet on the bridge, maritime satellite records show that the container markings match the fictional grey-market logistics company 'BilgeCo'—a front business previously mentioned in GTA San Andreas lore.

[04:00 - 06:10] ESCALATION & EVIDENCE:
Why does this matter? Because Take-Two's 2023 patent on dynamic contraband dispatch confirms that players can intercept commercial shipping corridors across international waters before law enforcement responds across county lines.

[06:10 - 07:45] THE CONTRAST:
Mainstream gaming channels claim Leonida is just a Miami reskin. But the evidence proves that the swamp bayous and overseas highways are built around dynamic tidal timing—meaning water depth changes based on lunar cycles, making certain islands accessible only during low tide.

[07:45 - 09:10] MAJOR REVEAL & PAYOFF:
This isn't just cosmetic background art. Rockstar hid this in plain sight because the core heist structure of Lucia and Jason isn't about robbing convenience stores—it's about intercepting offshore contraband logistics.

[09:10 - 10:14] CTA & NEXT VIDEO:
We have mapped the exact GPS coordinates of all seven BilgeCo shipping nodes in our free Leonida Map Telemetry Guide linked below. Click the video on screen now to discover the hidden true-crime case that inspired Jason and Lucia's first heist.`,
  hooks: [
    {
      type: "Mystery",
      hook: "Rockstar hid a coastline in the motel window that isn't on the official Vice City map...",
      score: 95,
    },
    {
      type: "Shock",
      hook: "99% of fans missed the single frame that gives away GTA 6's entire heist plot.",
      score: 91,
    },
    {
      type: "Evidence",
      hook: "Look at the telemetry data on this radar dish at timestamp 0:42. It points nowhere near Miami.",
      score: 89,
    },
    {
      type: "Story",
      hook: "Before Rockstar dropped the trailer, a Take-Two patent leaked this exact water mechanic.",
      score: 87,
    },
    {
      type: "Contrarian",
      hook: "Everyone thinks Lucia is in Miami. The geography proves she's 40 miles off the mainland.",
      score: 93,
    },
  ],
  scenes: [
    {
      sceneId: "041-001",
      timestamp: "00:00-00:08",
      narration: "Look closely at the motel room mirror behind Lucia at timestamp 0:42...",
      visualType: "cinematic_ai",
      imagePrompt: "Photorealistic AAA video-game cinematic, dim retro motel interior overlooking neon coastal sunset, dramatic window reflections, cinematic depth, subtle 35mm film grain, high detail 8k.",
      videoPrompt: "Slow cinematic push-in through motel window Venetian blinds with rain droplets, neon reflections shimmering.",
      camera: "Slow 35mm Push-In",
      lighting: "Cyan and amber neon sidelight",
      movement: "Rain droplets gliding down glass pane",
      caption: "The motel mirror reflection nobody noticed.",
      transition: "Cut on motion",
      sourceRequired: false,
    },
    {
      sceneId: "041-002",
      timestamp: "00:08-00:25",
      narration: "You aren't looking at Ocean Beach. You're looking at a decommissioned shipping viaduct...",
      visualType: "map_telemetry",
      imagePrompt: "Overhead satellite GIS map overlay of fictional subtropical archipelago with glowing green vector shipping lanes and radar telemetry nodes, UI HUD graphics.",
      videoPrompt: "Digital map zoom with tactical coordinate readouts highlighting southern shipping corridor.",
      camera: "Top-down orthographic zoom",
      lighting: "Digital phosphor HUD glow",
      movement: "Telemetry pulse radiating across islands",
      caption: "Unmarked southern maritime shipping corridor.",
      transition: "Wipe to radar scan",
      sourceRequired: true,
    },
    {
      sceneId: "041-003",
      timestamp: "00:25-00:55",
      narration: "Over the next nine minutes, we are breaking down primary source coastal surveys...",
      visualType: "cinematic_ai",
      imagePrompt: "Cinematic twilight harbor with industrial cargo cranes, misty bayou waters, distant superyacht silhouettes, ultra-detailed water ripples, cinematic film grain.",
      videoPrompt: "Low-angle pan across tranquil harbor water with distant harbor lighthouse sweep.",
      camera: "Low-angle slow pan",
      lighting: "Deep twilight with sodium-vapor amber pier lanterns",
      movement: "Fog rolling over swamp harbor",
      caption: "Primary source coastal breakdown.",
      transition: "Dissolve",
      sourceRequired: false,
    },
  ],
  voiceMode: "AI Documentary (Controlled, investigative, deep resonance)",
  thumbnails: [
    {
      id: "th-1",
      type: "Mystery",
      concept: "Lucia looking through venetian blinds with radar overlay showing secret island",
      textOverlay: "THEY HID THIS",
      prompt: "Cinematic portrait of female open-world protagonist looking through dark motel blinds, neon cyan rim light, dramatic shadows, mysterious background glow, YouTube thumbnail style, high contrast.",
    },
    {
      id: "th-2",
      type: "Extreme Curiosity Gap",
      concept: "Pixelated radar terminal showing 7 red coordinates beyond the map boundary",
      textOverlay: "NOT ON MAP",
      prompt: "Close-up of tactical GPS boat radar screen glowing in dark cabin, red waypoint blinking beyond continental boundary, high contrast 8k.",
    },
    {
      id: "th-3",
      type: "Contrarian",
      concept: "Vice City 2002 pastel map split with 2026 dark satellite terrain",
      textOverlay: "THE LIE",
      prompt: "Split-screen graphic showing retro 1980s neon map on left and dark hyper-realistic satellite ocean terrain on right, dramatic dividing lightning line.",
    },
    {
      id: "th-4",
      type: "Hidden Detail",
      concept: "Yellow caution circle highlighting tiny barge reflection in rear-view mirror",
      textOverlay: "LOOK CLOSER",
      prompt: "Sports car chrome side mirror reflecting mysterious industrial shipping vessel at sea, dramatic depth of field, neon city in distance.",
    },
    {
      id: "th-5",
      type: "Character Reaction",
      concept: "Detective operative in dark sunglasses holding classified coastal dossier",
      textOverlay: "CONFIRMED",
      prompt: "Cinematic medium shot of investigator reviewing glowing digital tablet dossier in dark muscle car, green neon illumination, high resolution.",
    },
  ],
  titles: [
    { title: "The Detail Rockstar Wants You To Miss", category: "Mystery" },
    { title: "Nobody Is Talking About This GTA 6 Coastline", category: "Discovery" },
    { title: "Why Rockstar Is Hiding This Part Of Leonida", category: "Contrarian" },
    { title: "Don't Ignore This GTA 6 Trailer Detail", category: "Warning" },
    { title: "The Secret Shipping Route Hidden Inside Vice City", category: "History" },
    { title: "We Finally Solved The Motel Window Mystery", category: "Discovery" },
    { title: "What Rockstar Secretly Leaked At 0:42", category: "Mystery" },
    { title: "The GTA 6 Feature That Changes Everything", category: "Discovery" },
  ],
  seoDescription: `We analyzed the environmental reflections and Take-Two navigation patents behind GTA 6 to uncover the hidden offshore shipping corridors Rockstar tucked into the background of Vice City.

In this deep dive, we break down:
- The telemetry data in the motel sequence
- BilgeCo grey-market logistics connections
- Dynamic tidal water physics patents
- Why Leonida's map extends far beyond the mainland

RELATED INVESTIGATIONS:
- Why Rockstar Changed Lucia's Ankle Monitor: [link]
- The Real Florida Crime Ring Behind Jason & Lucia: [link]

RESOURCES & TELEMETRY:
- Free Leonida Telemetry Coordinates Guide: https://cmplay.internal/telemetry
- GTA Dojo Belt Mastery: https://cmplay.internal/dojo

DISCLOSURE:
This is an independent analysis and creator commentary documentary by CMPlay. Not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive.

#GTA6 #ViceCity #Leonida #GamingDocumentary #CMPlay #GTA6Map`,
  tags: ["GTA 6", "Leonida", "Vice City", "GTA 6 Map", "Rockstar Games", "GTA 6 Secrets", "CMPlay", "Gaming Analysis"],
  repurpose: {
    shorts: [
      {
        title: "The GTA 6 Detail 99% Of Fans Missed",
        hook: "Pause the GTA 6 trailer right here...",
        angle: "Focus exclusively on the mirror reflection in the first 3 seconds.",
      },
      {
        title: "Is GTA 6 Secretly Hiding A Second Island?",
        hook: "Look at this radar anomaly 40 miles off Vice City...",
        angle: "Contrarian angle debating whether the keys extend to South America.",
      },
      {
        title: "How Rockstar's New Water Patent Changes Gameplay",
        hook: "You won't be able to boat here when the tide goes out...",
        angle: "Visual airboat demonstration explaining dynamic water displacement.",
      },
    ],
    reels: [
      "9:16 vertical crop of trailer reflection with animated yellow pointer",
      "Dynamic tidal water comparison between GTA 5 and GTA 6 patents",
      "Fast 30-second breakdown of BilgeCo shipping logistics",
    ],
    tiktoks: [
      "POV: You zoomed in on the motel window at 4K",
      "Rockstar developer patents that leaked before the trailer",
      "Ranking the craziest hidden details in Leonida",
    ],
    communityPost: "Did you catch the shipping barge reflection in the motel window at 0:42? Poll: Do you think this is accessible gameplay territory or distant background art? Vote below!",
    xThread: [
      "1/7 Rockstar hid a massive geographic clue in plain sight in GTA 6 Trailer 1. Here is what happens when you enhance the motel window reflection 🧵👇",
      "2/7 Notice the curvature of this viaduct. It does NOT match Ocean Drive. It matches coordinates 42-South near Port Gellhorn.",
      "3/7 Take-Two patent US20230285860A1 details dynamic maritime cargo interception...",
      "4/7 This means heists aren't just land-based—they require timing offshore tide cycles.",
      "5/7 Full 10-minute documentary breakdown is live on CMPlay YouTube. Link in bio.",
    ],
    blogArticle: {
      title: "Deconstructing Leonida: What The Motel Window Teaches Us About GTA 6's Geography",
      outline: [
        "Introduction: The Art of Environmental Storytelling",
        "The Reflection Breakdown: Frame Telemetry Analysis",
        "Take-Two Navigation Patents and Ocean Depths",
        "What This Means for Jason and Lucia's Storyline",
        "Conclusion & Downloadable GPS Coordinate Map",
      ],
    },
    newsletter: "This week in the CMPlay Creator Dispatch: Why Rockstar builds worlds in layers, and how we engineered our 9-part documentary script using proven retention architecture.",
    infographic: "High-resolution diagram comparing 2002 Vice City water boundaries vs 2026 Leonida volumetric tides.",
    carousel: [
      "Slide 1: Did you spot this in GTA 6?",
      "Slide 2: The mirror reflection enhanced",
      "Slide 3: The patent leak proof",
      "Slide 4: The hidden shipping lane",
      "Slide 5: Save this for when GTA 6 drops in Nov 2026",
    ],
  },
  products: {
    freeLeadMagnet: "Free Leonida GPS Telemetry & Landmark PDF (18 Pages)",
    lowTicket: { name: "GTA 6 Location & Lore Field Guide", price: "$9.00" },
    midTicket: { name: "CMPlay Creator Research & Prompt Pack (SD 3.5 + Script Templates)", price: "$29.00" },
    service: "Turnkey Faceless Channel Setup & AI Production Automation ($497/mo)",
  },
};

export const CONTENT_CLUSTERS = [
  {
    id: "cluster-vice-city",
    name: "Cluster: Vice City Geography & Infrastructure",
    description: "6 interconnected videos mapping the physical evolution, water physics, and district secrets of Vice City.",
    videos: [
      { title: "The Hidden History Of Vice City", status: "Published", views: "142K" },
      { title: "Why Rockstar Changed Vice City", status: "Published", views: "98K" },
      { title: "The Most Important Vice City Location", status: "Published", views: "116K" },
      { title: "The Detail Rockstar Wants You To Miss", status: "QA / Ready", views: "Projected 150K+" },
      { title: "The Real-World Inspiration Behind Vice City", status: "Scripting", views: "Queued" },
      { title: "7 Things You Missed In Ocean Beach", status: "Idea Bank", views: "Queued" },
    ],
  },
  {
    id: "cluster-characters",
    name: "Cluster: Lucia, Jason & The Syndicate",
    description: "Character motivation, parole mechanics, true-crime origins, and relationship dynamics.",
    videos: [
      { title: "Why Rockstar Changed Lucia's Ankle Monitor", status: "Production", views: "Queued" },
      { title: "The Real Florida Crime Ring Behind Jason & Lucia", status: "Research", views: "Queued" },
      { title: "Who Is Lucia Really Working For?", status: "Idea Bank", views: "Queued" },
    ],
  },
];

export const COMMENT_MINING_POOL = [
  {
    id: "cm-1",
    comment: "Did Rockstar ever explain why the police cruisers in trailer 1 have two different badge designs?",
    author: "@ViceCitySniper",
    researchQuestion: "Are there multiple police jurisdictions (VCPD Coastal vs Leonida State Highway Patrol) with distinct heat mechanics?",
    proposedVideoTitle: "Why GTA 6 Has Two Different Police Forces (And What It Means For Heists)",
    status: "Promoted to Research",
  },
  {
    id: "cm-2",
    comment: "Notice how the lowriders on the bridge had actual hydraulic bounce physics that responded to the subwoofer bass?",
    author: "@NeonDrifter86",
    researchQuestion: "Does vehicle audio telemetry trigger physics vertex shaders in RAGE 9 engine?",
    proposedVideoTitle: "The Insane Vehicle Audio Physics Nobody Noticed In GTA 6",
    status: "Idea Bank",
  },
  {
    id: "cm-3",
    comment: "Can we talk about the mud physics when that truck swerved off road into the bayou? It actually stuck to the tire treads.",
    author: "@AlligatorAlley",
    researchQuestion: "How does procedural soil deformation operate on off-road terrain?",
    proposedVideoTitle: "Why Leonida's Mud Physics Embarrass Modern Racing Games",
    status: "Idea Bank",
  },
];

export const CONTENTFORGE_NICHES = [
  { id: "gaming", name: "Gaming & Pop Culture (GTA 6, Open Worlds)", active: true },
  { id: "sports", name: "Sports Analytics & Highlight Documentaries", active: false },
  { id: "finance", name: "Business, Macroeconomics & Tech Monopolies", active: false },
  { id: "history", name: "Forgotten History & Geopolitical Mysteries", active: false },
  { id: "fitness", name: "Biomechanics, Hypertrophy & Athletic Science", active: false },
  { id: "faith", name: "Faith & Spiritual Deep Dives (ChristLIFE.io)", active: false },
  { id: "local_biz", name: "Local Business Growth & Automation Case Studies", active: false },
];
