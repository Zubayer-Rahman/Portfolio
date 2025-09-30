import React, { useEffect, useState } from "react";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const GitHubDashboard = ({ username = "Zubayer-Rahman", token }) => {
  const [stats, setStats] = useState({});
  const [contributions, setContributions] = useState([]);
  const [repos, setRepos] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);

  useEffect(() => {
    const query = `
      {
        user(login: "${username}") {
          name
          followers { totalCount }
          repositories(privacy: PUBLIC) { totalCount }
          contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
              months {
                name
                firstDay
              }
            }
          }
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                stargazerCount
                forkCount
                url
              }
            }
          }
        }
      }
    `;

    fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.data.user;

        // Stats
        setStats({
          followers: user.followers.totalCount,
          repos: user.repositories.totalCount,
          contributions:
            user.contributionsCollection.contributionCalendar
              .totalContributions,
        });

        // Contributions
        const allWeeks =
          user.contributionsCollection.contributionCalendar.weeks;
        const days = allWeeks.flatMap((w) => w.contributionDays);
        setContributions(days);

        // Months
        setMonthLabels(
          user.contributionsCollection.contributionCalendar.months
        );

        // Repos
        setRepos(user.pinnedItems.nodes);

        // Available years
        const currentYear = new Date().getFullYear();
        const joinYear = 2019; // Adjust for your GitHub join year
        const yearList = [];
        for (let y = currentYear; y >= joinYear; y--) yearList.push(y);
        setAvailableYears(yearList);
      });
  }, [username, token, year]);

  // --- GitHub palette ---
  const GITHUB_COLORS = [
    "#151b23", // level 0
    "#9be9a8", // level 1
    "#40c463", // level 2
    "#30a14e", // level 3
    "#216e39", // level 4
  ];

  // Weekday labels: show only Mon, Wed, Fri like GitHub
  const weekdays = ["Mon", "Wed", "Fri"];

  return (
    <section
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        color: "#ddd",
        background: "#101010",
        borderRadius: "12px",
      }}
    >

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          margin: "1.5rem 0",
        }}
      >
        <div>👥 Followers: {stats.followers}</div>
        <div>📦 Public Repos: {stats.repos}</div>
        <div>
          🔥 {year} Contributions: {stats.contributions}
        </div>
      </div>

      {/* Year Selector */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        {availableYears.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: year === y ? "2px solid #30a14e" : "1px solid #444",
              background: year === y ? "#238636" : "#161b22",
              color: "#fff",
              cursor: "pointer",
              fontWeight: year === y ? "bold" : "normal",
            }}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Month Labels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `30px repeat(53, 15px)`, // leave space for weekdays
          justifyContent: "center",
          fontSize: "12px",
          marginBottom: "6px",
          color: "#aaa",
        }}
      >
        <div /> {/* empty cell for weekday column */}
        {monthLabels.map((month) => (
          <div key={month.name} style={{ gridColumn: "span 4" }}>
            {month.name}
          </div>
        ))}
      </div>

      {/* Heatmap with Weekday Labels */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Weekday Labels Column */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(7, 15px)", // 7 days per week
            gridGap: "3px",
            marginRight: "6px",
            fontSize: "12px",
            color: "#aaa",
          }}
        >
          {Array.from({ length: 7 }, (_, i) =>
            weekdays.includes(
              ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]
            ) ? (
              <div key={i} style={{ lineHeight: "15px" }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}
              </div>
            ) : (
              <div key={i}></div>
            )
          )}
        </div>

        {/* Contributions Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(53, 15px)", // weeks
            gridAutoRows: "15px",
            gridGap: "3px",
          }}
        >
          {contributions.map((day) => (
            <div
              key={day.date}
              title={`${day.date} → ${day.contributionCount} contributions`}
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: day.color || GITHUB_COLORS[0],
                borderRadius: "3px",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          ))}
        </div>
      </div>

      {/* Pinned Repositories */}
      <h3 style={{ marginTop: "2rem", padding: "0px 80px", fontSize: "24px", fontWeight:"600"
      }}>📌 Pinned Projects</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "1rem",
          padding: "0px 80px",
        }}
      >
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#161b22",
              padding: "1rem",
              borderRadius: "8px",
              color: "inherit",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h4>
              {repo.name} ⭐{repo.stargazerCount} 🍴{repo.forkCount}
            </h4>
            <p>{repo.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default GitHubDashboard;