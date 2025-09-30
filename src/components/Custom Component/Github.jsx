import React, { useEffect, useState } from "react";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const GitHubDashboard = ({ username = "Zubayer-Rahman", token }) => {
  const [stats, setStats] = useState({});
  const [weeks, setWeeks] = useState([]);
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
        Authorization: `Bearer ${token}`, // Use your GitHub Personal Access Token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.data.user;

        // --- Stats ---
        setStats({
          followers: user.followers.totalCount,
          repos: user.repositories.totalCount,
          contributions:
            user.contributionsCollection.contributionCalendar
              .totalContributions,
        });

        // --- Weeks (structured grid) ---
        setWeeks(user.contributionsCollection.contributionCalendar.weeks);

        // --- Month Labels ---
        setMonthLabels(
          user.contributionsCollection.contributionCalendar.months
        );

        // --- Repositories ---
        setRepos(user.pinnedItems.nodes);

        // --- Available Years (from join year until now) ---
        const currentYear = new Date().getFullYear();
        const joinYear = 2019; // change to YOUR GitHub join year
        const yearList = [];
        for (let y = currentYear; y >= joinYear; y--) yearList.push(y);
        setAvailableYears(yearList);
      });
  }, [username, token, year]);

  // Official GitHub palette
  const GITHUB_COLORS = [
    "#151b23", // 0 contributions
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39", // max contributions
  ];

  return (
    <section
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        color: "#ddd",
        background: "#101010",
        borderRadius: "12px",
        margin: "2rem 0",
      }}
    >
      {/* --- Stats Row --- */}
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

      {/* --- Year Selector --- */}
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

      {/* --- Month Labels --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `30px repeat(${weeks.length}, 15px)`,
          justifyContent: "center",
          fontSize: "12px",
          marginBottom: "6px",
          color: "#aaa",
        }}
      >
        <div /> {/* empty corner for weekday labels */}
        {monthLabels.map((month) => (
          <div key={month.name} style={{ gridColumn: "span 4" }}>
            {month.name}
          </div>
        ))}
      </div>

      {/* --- Heatmap --- */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Weekday Labels */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(7, 15px)",
            gridGap: "3px",
            marginRight: "6px",
            fontSize: "12px",
            color: "#aaa",
          }}
        >
          {["Mon", "Wed", "Fri"].map((d) => (
            <div key={d} style={{ lineHeight: "15px" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Weeks (columns) */}
        <div style={{ display: "flex", gap: "3px" }}>
          {weeks.map((week, wi) => (
            <div
              key={wi}
              style={{
                display: "grid",
                gridTemplateRows: "repeat(7, 15px)",
                gridGap: "3px",
              }}
            >
              {week.contributionDays.map((day, di) => {
                // fallback if API returns null
                let fill =
                  (day.contributionCount === 0
                    ? GITHUB_COLORS[0]
                    : day.contributionCount < 5
                    ? GITHUB_COLORS[1]
                    : day.contributionCount < 8
                    ? GITHUB_COLORS[2]
                    : day.contributionCount < 10
                    ? GITHUB_COLORS[3]
                    : GITHUB_COLORS[4]);

                return (
                  <div
                    key={di}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: fill,
                      borderRadius: "3px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onClick={() =>
                      window.open(
                        `https://github.com/${username}?tab=overview&from=${day.date}&to=${day.date}`,
                        "_blank"
                      )
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* --- Pinned Repositories --- */}
      <h3 style={{ marginTop: "2rem" }}>📌 Pinned Projects</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "1rem",
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