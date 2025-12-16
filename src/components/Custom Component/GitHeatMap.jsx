import React, { useEffect, useState } from "react";
import { Heatmap } from "contribution-heatmap";

const GitHeatMap = ({ username = "Zubayer-Rahman" }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [counts, setCounts] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then(res => res.json())
      .then(data => {
        const years = data.years.map(y => y.year);
        setAvailableYears(years);

        // default to latest available year
        const validYear = years.includes(year) ? year : Math.max(...years);
        setYear(validYear);

        // store contributions in map { year: [counts] }
        const yearData = data.years.reduce((acc, yObj) => {
          acc[yObj.year] = yObj.contributions.map(c => c.count);
          return acc;
        }, {});
        setCounts(yearData[validYear] || []);
      });
  }, [username]);

  // reload counts when year changes
  const handleChangeYear = (newYear) => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then(res => res.json())
      .then(data => {
        const yObj = data.years.find(y => y.year === newYear);
        setCounts(yObj ? yObj.contributions.map(c => c.count) : []);
        setYear(newYear);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Contributions in {year}</h3>
      <div style={{ marginBottom: "1rem" }}>
        {availableYears.map(y => (
          <button
            key={y}
            style={{
              margin: "0 5px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: year === y ? "2px solid #30a14e" : "1px solid #444",
              background: year === y ? "#30a14e" : "#161b22",
              color: "white",
              cursor: "pointer"
            }}
            onClick={() => handleChangeYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <Heatmap
        colour={['#ebedf0','#c6e48b','#40c463','#30a14e','#216e39']}
        squareGap="4px"
        squareSize="15px"
        squareNumber={counts.length} 
        count={counts}
      />
    </div>
  );
};

export default GitHeatMap;