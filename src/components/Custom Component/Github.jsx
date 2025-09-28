import React from "react";
import "./Github.css";
import GitHubCalendar from "react-github-calendar";

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
        <GitHubCalendar
          username="Zubayer-Rahman"
          colorScheme="dark"
        />
      </div>
    </div>
  );
};

export default GitHubWidget;
