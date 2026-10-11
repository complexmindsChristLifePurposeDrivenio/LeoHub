export type NavigationTab =
  | "command_center"
  | "content_factory"
  | "cornerstone_calendar"
  | "overdrive_vi"
  | "leonida_intelligence"
  | "leonida_newsroom"
  | "clipforge"
  | "gta_dojo"
  | "gta_chat"
  | "gta_llm"
  | "creator_studio"
  | "motion_hub"
  | "nostalgia_lab"
  | "ai_lab"
  | "image_lab"
  | "video_lab"
  | "content_hub"
  | "community"
  | "marketplace"
  | "developer_portal"
  | "analytics"
  | "monetization"
  | "settings";

export type ContentFactoryState =
  | "IDEA"
  | "SELECTED"
  | "RESEARCH"
  | "RESEARCH_APPROVED"
  | "SCRIPTING"
  | "SCRIPT_APPROVED"
  | "VISUALS"
  | "VOICE"
  | "EDITING"
  | "THUMBNAIL"
  | "QA"
  | "SCHEDULED"
  | "PUBLISHED"
  | "ANALYZING"
  | "REPURPOSED"
  | "ARCHIVED";

export interface GtaContentIdea {
  id: string;
  title: string;
  angle: string;
  thesis: string;
  sourceStructure: string;
  curiosityGap: string;
  emotionalDriver: string;
  researchRequirement: string;
  suggestedThumbnail: string;
  videoLength: string;
  scores: {
    click: number;
    retention: number;
    originality: number;
    research: number;
    monetization: number;
    engagement: number;
    reusability: number;
    total: number;
  };
  status: "idea" | "selected" | "research" | "production" | "rejected";
  category: string;
}

export interface ResearchClaimItem {
  claim: string;
  explanation: string;
  classification: "CONFIRMED" | "LIKELY" | "REPORTED" | "SPECULATION" | "UNKNOWN";
  confidence: number; // 0-100
  sourceUrl: string;
  visualOpportunity: string;
  narrativeUse: string;
}

export interface GtaResearchCard {
  videoId: string;
  title: string;
  thesis: string;
  claims: ResearchClaimItem[];
  sources: { title: string; url: string; reliability: string }[];
  uniquePoints: string[];
  visualOpportunities: string[];
  researchScore: number;
  confidenceScore: number;
}

export interface GtaSceneItem {
  sceneId: string;
  timestamp: string;
  narration: string;
  visualType: "cinematic_ai" | "b_roll" | "motion_graphic" | "map_telemetry" | "character_focus";
  imagePrompt: string;
  videoPrompt: string;
  camera: string;
  lighting: string;
  movement: string;
  caption: string;
  transition: string;
  sourceRequired: boolean;
}

export interface GtaVideoPackage {
  id: string;
  code: string; // e.g. CM-GTA6-0041
  title: string;
  thesis: string;
  currentState: ContentFactoryState;
  originalityScore: number;
  researchScore: number;
  thumbnailScore: number;
  titleScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  approvalStatus: "draft" | "pending_approval" | "approved" | "rejected";
  script: string;
  hooks: { type: string; hook: string; score: number }[];
  scenes: GtaSceneItem[];
  voiceMode: string;
  thumbnails: { id: string; type: string; concept: string; textOverlay: string; prompt: string }[];
  titles: { title: string; category: string }[];
  seoDescription: string;
  tags: string[];
  repurpose: {
    shorts: { title: string; hook: string; angle: string }[];
    reels: string[];
    tiktoks: string[];
    communityPost: string;
    xThread: string[];
    blogArticle: { title: string; outline: string[] };
    newsletter: string;
    infographic: string;
    carousel: string[];
  };
  products: {
    freeLeadMagnet: string;
    lowTicket: { name: string; price: string };
    midTicket: { name: string; price: string };
    service: string;
  };
}

export type BrandDivision =
  | "Cornerstone OS"
  | "ComplexMinds"
  | "CMPlay"
  | "ChristLIFE.io"
  | "Sports Analytics"
  | "FCI Wrestling"
  | "StreamMinds"
  | "Products & Commerce";

export interface BlueprintDaySchedule {
  dayName: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  dateString: string;
  theme: string;
  primaryFocus: string;
  morningBlock: {
    time: string;
    action: string;
    deliverable: string;
  };
  afternoonBlock: {
    time: string;
    focus: string;
    activity: string;
  };
  eveningBlock?: {
    time: string;
    deliverable: string;
  };
}

export interface BlueprintWeek {
  weekNumber: number;
  phase: string;
  primaryFocus: string;
  startDate: string;
  endDate: string;
  brandDivision: BrandDivision;
  primaryOutcome: string;
  techStack: string[];
  days: BlueprintDaySchedule[];
  keyDeliverables: { id: string; title: string; category: string; completed?: boolean }[];
  associatedModuleTab: NavigationTab;
  scorecardDefaults: {
    kpis: { label: string; target: string }[];
    notes: string;
  };
}

export interface ScheduledCalendarEvent {
  id: string;
  uid: string;
  weekNumber: number;
  phaseName: string;
  dayName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  timezone: string;
  summary: string;
  description: string;
  brandDivision: BrandDivision;
  eventType: "strategy" | "build" | "assembly" | "distribution" | "review" | "afternoon_block" | "evening_scorecard";
  location: string;
}

export type ConfidenceClass =
  | "official"
  | "verified"
  | "reported"
  | "community"
  | "analysis"
  | "theory"
  | "unverified";

export interface IntelligenceSource {
  id: string;
  title: string;
  sourceUrl: string;
  publisher: string;
  author: string;
  publicationDate: string;
  retrievalDate: string;
  confidence: ConfidenceClass;
  verificationStatus: "confirmed" | "pending" | "contradicted";
  summary: string;
  relatedEntities: string[];
}

export interface GtaViEntity {
  id: string;
  name: string;
  category: "district" | "character" | "vehicle" | "weapon" | "activity" | "business";
  description: string;
  confidence: ConfidenceClass;
  location?: string;
  coordinates?: { x: number; y: number };
  details: Record<string, string>;
  tags: string[];
}

export interface ClipCandidate {
  id: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceType: "YouTube" | "Gameplay" | "Podcast" | "Stream" | "Original";
  rightsStatus: "Licensed" | "Fair Use Transformative" | "Original Owned";
  startTime: string;
  endTime: string;
  durationSeconds: number;
  hookScore: number;
  actionMoment: string;
  captionText: string;
  status: "detected" | "approved" | "rendering" | "ready" | "published";
  targetPlatforms: ("TikTok" | "YouTube Shorts" | "Instagram Reels" | "X")[];
}

export interface DojoTrack {
  id: string;
  name: string;
  tagline: string;
  beltRequirement: string;
  lessonsCount: number;
  completionRate: number;
  status: "available" | "in_progress" | "locked";
  modules: {
    id: string;
    title: string;
    duration: string;
    type: "video" | "interactive" | "challenge" | "quiz";
    completed: boolean;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  mode?: "research" | "creator" | "gameplay" | "nostalgia";
  confidence?: ConfidenceClass;
  citations?: { source: string; confidence: string }[];
}

export interface ContentItem {
  id: string;
  title: string;
  format: "Shorts" | "Deep Dive" | "News Update" | "Guide" | "Podcast Segment";
  workflowStatus: "idea" | "research" | "script" | "edit" | "approved" | "published";
  hook: string;
  brandSilo: "CMPlay" | "The Cornerstone";
  publishDate?: string;
  views?: number;
  retentionPercent?: number;
  revenue?: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  creator: string;
  category: "Motion Pack" | "LUT & Color" | "Prompt Pack" | "Course" | "Thumbnail Kit" | "3D Model";
  price: number;
  rating: number;
  salesCount: number;
  description: string;
  isOriginal: boolean;
  tags: string[];
}

export interface CommunityThread {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: "Theory" | "Map Discovery" | "Clip Contest" | "Dojo Homework" | "Feedback";
  upvotes: number;
  commentsCount: number;
  timestamp: string;
  hasOfficialBadge?: boolean;
}
