import ErrorBoundary from "./components/ErrorBoundary";
import NavRail from "./components/NavRail";
import Overlays from "./components/Overlays";
import Preloader from "./components/Preloader";
import TopBar from "./components/TopBar";
import Entrance from "./sections/Entrance";
import AncientWorlds from "./sections/AncientWorlds";
import ArtifactGallery from "./sections/ArtifactGallery";
import Atlas from "./sections/Atlas";
import People from "./sections/People";
import Finale from "./sections/Finale";

/**
 * NORTHWEST COAST
 * A single continuous scroll-driven journey through six chapters.
 * Each chapter is wrapped in its own error boundary so one failure can
 * never blank the page.
 */
export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-ink">
      <Preloader />
      <Overlays />
      <TopBar />
      <NavRail />

      <main>
        <ErrorBoundary label="The Entrance">
          <Entrance />
        </ErrorBoundary>
        <ErrorBoundary label="The Living Coast">
          <AncientWorlds />
        </ErrorBoundary>
        <ErrorBoundary label="The Artifact Gallery">
          <ArtifactGallery />
        </ErrorBoundary>
        <ErrorBoundary label="Atlas & Time">
          <Atlas />
        </ErrorBoundary>
        <ErrorBoundary label="People & Cultures">
          <People />
        </ErrorBoundary>
        <ErrorBoundary label="The Closing Hall">
          <Finale />
        </ErrorBoundary>
      </main>
    </div>
  );
}
