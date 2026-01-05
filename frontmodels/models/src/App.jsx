import { useState, useEffect } from "react";
import "./App.css";
import Landing from "./pages/Landing";
import Model1Tester from "./pages/Model1Tester";
import Model2Tester from "./pages/Model2Tester";
import FinalReport from "./pages/FinalReport";
import { loadModel2 } from "./utils/model2Service";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [modelsReady, setModelsReady] = useState(false);

  useEffect(() => {
    // Pre-load Model 2 on app startup
    const initializeModels = async () => {
      try {
        await loadModel2();
        setModelsReady(true);
        console.log("✓ Model 2 initialized successfully");
      } catch (error) {
        console.warn(
          "Model 2 could not be pre-loaded. Using fallback predictions:",
          error
        );
        setModelsReady(false);
      }
    };

    initializeModels();
  }, []);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <button className="nav-logo" onClick={() => setCurrentPage("home")}>
            <span className="logo-icon">📊</span>
            ScourgifyData
          </button>

          <div className="nav-menu">
            <button
              className={`nav-item ${currentPage === "home" ? "active" : ""}`}
              onClick={() => setCurrentPage("home")}
            >
              Portfolio
            </button>
            <button
              className={`nav-item ${currentPage === "model1" ? "active" : ""}`}
              onClick={() => setCurrentPage("model1")}
            >
              Model 1: Baseline
            </button>
            <button
              className={`nav-item ${currentPage === "model2" ? "active" : ""}`}
              onClick={() => setCurrentPage("model2")}
            >
              Model 2: Deep Learning
            </button>
            <button
              className={`nav-item ${currentPage === "report" ? "active" : ""}`}
              onClick={() => setCurrentPage("report")}
            >
              Final Report
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === "home" && <Landing onNavigate={setCurrentPage} />}
        {currentPage === "model1" && <Model1Tester />}
        {currentPage === "model2" && <Model2Tester />}
        {currentPage === "report" && <FinalReport />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ScourgifyData</h4>
            <p>Sentiment Analysis for Tourism Reviews</p>
          </div>
          <div className="footer-section">
            <h4>Project</h4>
            <ul>
              <li>
                <a href="#" onClick={() => setCurrentPage("home")}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setCurrentPage("model1")}>
                  Model 1
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setCurrentPage("model2")}>
                  Model 2
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setCurrentPage("report")}>
                  Final Report
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Team</h4>
            <p>Magra Houssem Eddine</p>
            <p>Boulakroune Nada</p>
            <p>Lebad Brahim Redouane</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 ScourgifyData. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
