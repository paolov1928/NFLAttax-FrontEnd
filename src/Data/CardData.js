export const baseCardData = {
  seasonPts: {
    syntax: "Fantasy Points",
    method: data => Math.round(data),
    comparison: "up"
  },
  height: {
    syntax: "Height (cm)",
    method: data => Math.round(data),
    comparison: "up"
  },
  weight: {
    syntax: "Weight (lbs)",
    method: data => Math.round(data),
    comparison: "up"
  },
  age: {
    syntax: "Age (years)",
    method: data => data,
    comparison: "up"
  },
  draft: {
    syntax: "Draft (pick)",
    method: data => (data === 999 ? "Undrafted" : data),
    comparison: "down"
  }
};

export const qbCardData = {
  totalTDs: {
    syntax: "Total TDs",
    method: data => data,
    comparison: "up"
  },
  redZoneAttempts: {
    syntax: "Red Zone Attempts",
    method: data => data,
    comparison: "up"
  },
  avgPassingYards: {
    syntax: "Avg Passing Yards",
    method: data => data,
    comparison: "up"
  },
  qbRating: {
    syntax: "QB Rating",
    method: data => data,
    comparison: "up"
  },
  sackYards: {
    syntax: "Sack Yards",
    method: data => data,
    comparison: "down"
  },
  poorThrows: {
    syntax: "Poor Throws",
    method: data => data,
    comparison: "down"
  },
  averagePocketTime: {
    syntax: "Average Pocket Time",
    method: data => data,
    comparison: "down"
  },
  longestPassingTD: {
    syntax: "Longest Passing TD",
    method: data => data,
    comparison: "up"
  }
};

export const rbCardData = {
  totalTDs: {
    syntax: "Total TDs",
    method: data => data,
    comparison: "up"
  },
  fumbles: {
    syntax: "Fumbles",
    method: data => data,
    comparison: "down"
  },
  avgRushYards: {
    syntax: "Avg Rush Yards",
    method: data => data,
    comparison: "up"
  },
  avgRecYards: {
    syntax: "Avg Receiving Yards",
    method: data => data,
    comparison: "up"
  },
  brokenTackles: {
    syntax: "Broken Tackles",
    method: data => data,
    comparison: "up"
  },
  droppedPasses: {
    syntax: "Dropped Receiving Passes",
    method: data => data,
    comparison: "down"
  },
  longestRushTD: {
    syntax: "Longest Rush TD",
    method: data => data,
    comparison: "up"
  }
};

export const wrCardData = {
  totalTDs: {
    syntax: "Total TDs",
    method: data => data,
    comparison: "up"
  },
  airYards: {
    syntax: "Air Yards",
    method: data => data,
    comparison: "up"
  },
  yardsAfterContact: {
    syntax: "Yards After Contact",
    method: data => data,
    comparison: "up"
  },
  avgRecYards: {
    syntax: "Avg Receiving Yards",
    method: data => data,
    comparison: "up"
  },
  brokenTackles: {
    syntax: "Broken Tackles",
    method: data => data,
    comparison: "up"
  },
  droppedPasses: {
    syntax: "Dropped Receiving Passes",
    method: data => data,
    comparison: "down"
  },
  longestRecTD: {
    syntax: "Longest Rec TD",
    method: data => data,
    comparison: "up"
  }
};
