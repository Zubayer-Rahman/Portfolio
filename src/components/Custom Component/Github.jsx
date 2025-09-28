import React from "react";
import "./Github.css";
import GitHeatMap from './GitHeatMap.jsx';
const GitHubWidget = () => {
  return (
    <div style={{ textAlign: "center", margin: "3rem 0" }}>
      <div className="github-cards">
        <img
          src="https://github-readme-stats.vercel.app/api?username=Zubayer-Rahman&show_icons=true&theme=github_dark"
          alt="GitHub Stats"
          className="github-card"
        />

        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=Zubayer-Rahman&layout=compact&theme=github_dark"
          alt="Top Languages"
          className="github-card"
        />
      </div>

      <div className="github-contributions">
        <GitHeatMap />
      </div>
    </div>
  );
};

export default GitHubWidget;
