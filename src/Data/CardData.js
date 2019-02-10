
// make this an array and then can just iterate through


export const baseCardData = {
  height: {
    addDataLookup: "height",
    syntax: "Height (cm)",
    method: data => Math.round(data*2.54),
    comparison: "up"
  },
  weight: {
    addDataLookup: "weight",
    syntax: "Weight (lbs)",
    method: data => Math.round(data),
    comparison: "up"
  },
  age: {
    addDataLookup: "birth_date",
    syntax: "Age (years)",
    method: dateString => {
      var today = new Date()
      var birthDate = new Date(dateString)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    comparison: "up"
  },
  draft: {
    addDataLookup: "draft",
    syntax: "Draft (pick)",
    method: data => data ? data.number : 'Undrafted',
    comparison: "down"
  }
};

export const qbCardData =
  [{
    key: "totalTDs",
    stat: [["passing", "touchdowns"],["rushing", "touchdowns"]],
    syntax: "Total TDs",
    comparison: "up"
  },
   {
    key: "redZoneAttempts",
    stat: [["passing", "redzone_attempts"],["rushing", "redzone_attempts"]],
    syntax: "Red Zone Attempts",
    comparison: "up"
  },
  {
    key: "avgPassingYards",
    stat: [["passing", "avg_yards"]],
    syntax: "Avg Passing Yards",
    comparison: "up"
  },
  {
    key: "qbRating",
    stat: [["passing", "rating"]],
    syntax: "QB Rating",
    comparison: "up"
  },
  {
    key: "sackYards",
    stat: [["passing", "sack_yards"]],
    syntax: "Sack Yards",
    comparison: "down"
  },
  {
    key: "poorThrows",
    stat: [["passing", "poor_throws"]],
    syntax: "Poor Throws",
    comparison: "down"
  },
  {
    key: "averagePocketTime",
    stat: [["passing", "avg_pocket_time"]],
    syntax: "Average Pocket Time",
    comparison: "down"
  },
  {
    key: "longestPassingTD",
    stat: [["passing", "longest_touchdown"]],
    syntax: "Longest Passing TD",
    comparison: "up"
  }]
;

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


export const statisticsLookup = (typeOfStat, actualStat, props) =>
  props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
    .statistics[typeOfStat][actualStat]
