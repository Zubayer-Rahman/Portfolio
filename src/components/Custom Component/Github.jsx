"use client";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

const WEEKS_IN_YEAR = 53;
const DAYS_IN_WEEK = 7;
const JANUARY_MONTH = 0;
const DECEMBER_MONTH = 11;
const SUNDAY_DAY = 0;
const MIN_WEEKS_FOR_DECEMBER_HEADER = 2;
const TOOLTIP_OFFSET_X = 10;
const TOOLTIP_OFFSET_Y = 40;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CONTRIBUTION_COLORS = [
  "bg-primary",
  "bg-brand/25",
  "bg-brand/50",
  "bg-brand/75",
  "bg-brand",
];

const LEVEL_0 = 0;
const LEVEL_1 = 1;
const LEVEL_2 = 2;
const LEVEL_3 = 3;
const LEVEL_4 = 4;
const CONTRIBUTION_LEVELS = [LEVEL_0, LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4];

const DAY_1 = 1;
const DAY_31 = 31;

const isDateInValidRange = (currentDate, startDate, endDate, targetYear) => {
  const isInRange = currentDate >= startDate && currentDate <= endDate;
  const isPreviousYearDecember =
    currentDate.getFullYear() === targetYear - 1 &&
    currentDate.getMonth() === DECEMBER_MONTH;
  const isNextYearJanuary =
    currentDate.getFullYear() === targetYear + 1 &&
    currentDate.getMonth() === JANUARY_MONTH;
  return isInRange || isPreviousYearDecember || isNextYearJanuary;
};

const createDayData = (currentDate, contributionData) => {
  const dateString = currentDate.toISOString().split("T")[0];
  const existingData = contributionData.find((d) => d.date === dateString);
  return {
    date: dateString,
    count: existingData?.count ?? LEVEL_0,
    level: existingData?.level ?? LEVEL_0,
  };
};

const shouldShowMonthHeader = ({
  currentYear,
  targetYear,
  currentMonth,
  startDateDay,
  weekCount,
}) =>
  currentYear === targetYear ||
  (currentYear === targetYear - 1 &&
    currentMonth === DECEMBER_MONTH &&
    startDateDay !== SUNDAY_DAY &&
    weekCount >= MIN_WEEKS_FOR_DECEMBER_HEADER);

const calculateMonthHeaders = (targetYear) => {
  const headers = [];
  const startDate = new Date(targetYear, JANUARY_MONTH, DAY_1);
  const firstSunday = new Date(startDate);
  firstSunday.setDate(startDate.getDate() - startDate.getDay());

  let currentMonth = -1;
  let currentYear = -1;
  let monthStartWeek = 0;
  let weekCount = 0;

  for (let weekNumber = 0; weekNumber < WEEKS_IN_YEAR; weekNumber++) {
    const weekDate = new Date(firstSunday);
    weekDate.setDate(firstSunday.getDate() + weekNumber * DAYS_IN_WEEK);
    const monthKey = weekDate.getMonth();
    const yearKey = weekDate.getFullYear();

    if (monthKey !== currentMonth || yearKey !== currentYear) {
      if (
        currentMonth !== -1 &&
        shouldShowMonthHeader({
          currentYear,
          targetYear,
          currentMonth,
          startDateDay: startDate.getDay(),
          weekCount,
        })
      ) {
        headers.push({
          month: MONTHS[currentMonth],
          colspan: weekCount,
          startWeek: monthStartWeek,
        });
      }
      currentMonth = monthKey;
      currentYear = yearKey;
      monthStartWeek = weekNumber;
      weekCount = 1;
    } else {
      weekCount++;
    }
  }

  if (
    currentMonth !== -1 &&
    shouldShowMonthHeader({
      currentYear,
      targetYear,
      currentMonth,
      startDateDay: startDate.getDay(),
      weekCount,
    })
  ) {
    headers.push({
      month: MONTHS[currentMonth],
      colspan: weekCount,
      startWeek: monthStartWeek,
    });
  }

  return headers;
};

export function ContributionGraph({
  data = [],
  year = new Date().getFullYear(),
  className = "",
  showLegend = true,
  showTooltips = true,
}) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const yearData = useMemo(() => {
    const startDate = new Date(year, JANUARY_MONTH, DAY_1);
    const endDate = new Date(year, DECEMBER_MONTH, DAY_31);
    const days = [];

    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());

    for (let weekNum = 0; weekNum < WEEKS_IN_YEAR; weekNum++) {
      for (let day = 0; day < DAYS_IN_WEEK; day++) {
        const currentDate = new Date(firstSunday);
        currentDate.setDate(
          firstSunday.getDate() + weekNum * DAYS_IN_WEEK + day
        );

        if (isDateInValidRange(currentDate, startDate, endDate, year)) {
          days.push(createDayData(currentDate, data));
        } else {
          days.push({ date: "", count: LEVEL_0, level: LEVEL_0 });
        }
      }
    }

    return days;
  }, [data, year]);

  const monthHeaders = useMemo(() => calculateMonthHeaders(year), [year]);

  const handleDayHover = (day, event) => {
    if (showTooltips && day.date) {
      setHoveredDay(day);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleDayLeave = () => {
    setHoveredDay(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getContributionText = (count) => {
    if (count === LEVEL_0) return "No contributions";
    if (count === LEVEL_1) return "1 contribution";
    return `${count} contributions`;
  };

  return (
    <div className={`relative ${className}`}>
      <table className="border-separate border-spacing-0.75">
        <caption className="sr-only">Contribution Graph for {year}</caption>
        <thead>
          <tr>
            <th aria-hidden="true" />
            {monthHeaders.map((header) => (
              <th
                key={`${header.month}-${header.startWeek}`}
                colSpan={header.colspan}
                className="text-left text-xs font-normal text-muted-foreground pb-1"
              >
                {header.month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => (
            <tr key={DAYS[dayIndex]}>
              <td className="pr-2 text-xs text-muted-foreground w-8">
                {dayIndex % 2 === 0 && (
                  <span aria-label={DAYS[dayIndex]}>{DAYS[dayIndex]}</span>
                )}
              </td>
              {Array.from({ length: WEEKS_IN_YEAR }, (_, w) => {
                const dayData = yearData[w * DAYS_IN_WEEK + dayIndex];
                const cellKey = `${dayData?.date ?? "empty"}-${w}-${dayIndex}`;

                if (!dayData?.date) {
                  return <td key={cellKey} className="w-2.5 h-2.5" />;
                }

                return (
                  <td
                    key={cellKey}
                    onMouseEnter={(e) => handleDayHover(dayData, e)}
                    onMouseLeave={handleDayLeave}
                    title={
                      showTooltips
                        ? `${formatDate(dayData.date)}: ${getContributionText(dayData.count)}`
                        : undefined
                    }
                  >
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-sm cursor-pointer ${CONTRIBUTION_COLORS[dayData.level]}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={
                        !shouldReduceMotion ? { scale: 1.5, zIndex: 10 } : {}
                      }
                      transition={{ duration: 0.1 }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showTooltips && hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none bg-popover text-popover-foreground text-xs rounded shadow-md px-2 py-1 border"
          style={{
            left: tooltipPosition.x + TOOLTIP_OFFSET_X,
            top: tooltipPosition.y - TOOLTIP_OFFSET_Y,
          }}
        >
          <div className="font-semibold">{getContributionText(hoveredDay.count)}</div>
          <div className="text-muted-foreground">{formatDate(hoveredDay.date)}</div>
        </div>
      )}

      {showLegend && (
        <div className="flex items-center gap-1 justify-end mt-2 text-xs text-muted-foreground">
          <span>Less</span>
          {CONTRIBUTION_LEVELS.map((level) => (
            <div
              key={level}
              className={`w-2.5 h-2.5 rounded-sm ${CONTRIBUTION_COLORS[level]}`}
            />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  );
}

export default ContributionGraph;