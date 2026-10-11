import React, { useState } from "react";
import { NavigationTab } from "./types";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { QuickSearchModal } from "./components/layout/QuickSearchModal";
import { SystemTutorialModal } from "./components/modals/SystemTutorialModal";

// Core Modules
import { CommandCenter } from "./components/modules/CommandCenter";
import { OverdriveVI } from "./components/modules/OverdriveVI";
import { LeonidaIntelligence } from "./components/modules/LeonidaIntelligence";
import { LeonidaNewsroom } from "./components/modules/LeonidaNewsroom";
import { ClipForge } from "./components/modules/ClipForge";
import { GtaDojo } from "./components/modules/GtaDojo";
import { GtaChat } from "./components/modules/GtaChat";
import { GtaLlmRag } from "./components/modules/GtaLlmRag";
import { CreatorStudio } from "./components/modules/CreatorStudio";
import { MotionHub } from "./components/modules/MotionHub";
import { NostalgiaLab } from "./components/modules/NostalgiaLab";
import { AiLabNvidia } from "./components/modules/AiLabNvidia";
import { ImageLabSD } from "./components/modules/ImageLabSD";
import { VideoLab } from "./components/modules/VideoLab";
import { ContentHub } from "./components/modules/ContentHub";
import { CommunityView } from "./components/modules/CommunityView";
import { MarketplaceView } from "./components/modules/MarketplaceView";
import { DeveloperPortal } from "./components/modules/DeveloperPortal";
import { AnalyticsView } from "./components/modules/AnalyticsView";
import { MonetizationView } from "./components/modules/MonetizationView";
import { SettingsView } from "./components/modules/SettingsView";
import { CornerstoneCalendar } from "./components/modules/CornerstoneCalendar";
import { GtaContentFactory } from "./components/modules/GtaContentFactory";

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>("command_center");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  const renderModule = () => {
    switch (currentTab) {
      case "command_center":
        return <CommandCenter onSelectTab={setCurrentTab} />;
      case "content_factory":
        return <GtaContentFactory onSelectTab={setCurrentTab} />;
      case "cornerstone_calendar":
        return <CornerstoneCalendar onSelectTab={setCurrentTab} />;
      case "overdrive_vi":
        return <OverdriveVI />;
      case "leonida_intelligence":
        return <LeonidaIntelligence />;
      case "leonida_newsroom":
        return <LeonidaNewsroom />;
      case "clipforge":
        return <ClipForge />;
      case "gta_dojo":
        return <GtaDojo />;
      case "gta_chat":
        return <GtaChat />;
      case "gta_llm":
        return <GtaLlmRag />;
      case "creator_studio":
        return <CreatorStudio />;
      case "motion_hub":
        return <MotionHub />;
      case "nostalgia_lab":
        return <NostalgiaLab />;
      case "ai_lab":
        return <AiLabNvidia />;
      case "image_lab":
        return <ImageLabSD />;
      case "video_lab":
        return <VideoLab />;
      case "content_hub":
        return <ContentHub />;
      case "community":
        return <CommunityView />;
      case "marketplace":
        return <MarketplaceView />;
      case "developer_portal":
        return <DeveloperPortal />;
      case "analytics":
        return <AnalyticsView />;
      case "monetization":
        return <MonetizationView />;
      case "settings":
        return <SettingsView />;
      default:
        return <CommandCenter onSelectTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-100 flex flex-col font-sans selection:bg-[#00FF66]/20 selection:text-[#00FF66]">
      {/* Top Bar Contract (1-Row, 3-Zone) */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenQuickSearch={() => setQuickSearchOpen(true)}
        onOpenNewProduction={() => setCurrentTab("content_factory")}
        onOpenTutorial={() => setTutorialOpen(true)}
      />

      <div className="flex-1 flex w-full">
        {/* Responsive Sidebar for all 20 Nav Views */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {renderModule()}
        </main>
      </div>

      {/* Global Command Palette / Search Modal */}
      <QuickSearchModal
        isOpen={quickSearchOpen}
        onClose={() => setQuickSearchOpen(false)}
        onSelectTab={setCurrentTab}
      />

      {/* System Architecture & Operating Tutorial Modal */}
      <SystemTutorialModal
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        onSelectTab={setCurrentTab}
      />
    </div>
  );
}
