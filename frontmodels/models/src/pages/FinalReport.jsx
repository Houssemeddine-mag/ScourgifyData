import "../styles/FinalReport.css";

export default function FinalReport() {
  return (
    <div className="report-container">
      <section className="report-header">
        <div className="report-header-content">
          <h1>Final Project Report</h1>
          <p>
            Complete documentation of the ScourgifyData sentiment analysis
            project
          </p>
          <div className="report-meta">
            <span className="meta-item">📄 Full Report</span>
            <span className="meta-item">📊 Analysis & Findings</span>
            <span className="meta-item">🎯 Results & Conclusions</span>
          </div>
        </div>
      </section>

      <section className="report-viewer">
        <div className="pdf-container">
          <iframe
            src="https://drive.google.com/file/d/1xrVVXFSFOTRULm18tMyhCM-TPefHm9la/preview"
            title="ScourgifyData Final Report"
            allow="autoplay"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="report-info">
        <div className="info-container">

          <div className="info-box">
            <h3>📥 Download</h3>
            <p>
              Access the complete report with detailed analysis, visualizations,
              and technical documentation.
            </p>
            <a
              href="https://drive.google.com/file/d/1xrVVXFSFOTRULm18tMyhCM-TPefHm9la/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              📥 Open in Google Drive
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
