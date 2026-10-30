import { PreferencesProvider } from "./hooks/usePreferences";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  const archive = window.location.pathname.endsWith("/projects.html");
  return (
    <PreferencesProvider>
      <Loader />
      <Header archive={archive} />
      <main id="main" tabIndex={-1}>
        {archive ? <ProjectsPage /> : <HomePage />}
      </main>
      <Footer />
    </PreferencesProvider>
  );
}
