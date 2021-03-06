// make this an array and then can just iterate through with index like the QB one

export const baseCardData = [
  {
    addDataLookup: "height",
    syntax: "Height (cm)",
    method: data => Math.round(data * 2.54),
    comparison: "up"
  },
  {
    addDataLookup: "weight",
    syntax: "Weight (lbs)",
    method: data => Math.round(data),
    comparison: "up"
  },
  {
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
  {
    addDataLookup: "draft",
    syntax: "Draft (pick)",
    method: data => (data ? data.number : "Undrafted"),
    comparison: "down"
  }
]

export const qbCardData = [
  {
    stat: [
      ["passing", "touchdowns"],
      ["rushing", "touchdowns"],
      ["receiving", "touchdowns"]
    ],
    syntax: "Total TDs",
    comparison: "up"
  },
  {
    stat: [["passing", "redzone_attempts"], ["rushing", "redzone_attempts"]],
    syntax: "Red Zone Attempts",
    comparison: "up"
  },
  {
    stat: [["passing", "avg_yards"]],
    syntax: "Avg Passing Yards",
    comparison: "up"
  },
  {
    stat: [["passing", "rating"]],
    syntax: "QB Rating",
    comparison: "up"
  },
  {
    stat: [["passing", "sack_yards"]],
    syntax: "Sack Yards",
    comparison: "down"
  },
  {
    stat: [["passing", "poor_throws"]],
    syntax: "Poor Throws",
    comparison: "down"
  },
  {
    stat: [["passing", "avg_pocket_time"]],
    syntax: "Average Pocket Time",
    comparison: "down"
  },
  {
    stat: [["passing", "longest_touchdown"]],
    syntax: "Longest Passing TD",
    comparison: "up"
  }
]

export const rbCardData = [
  {
    stat: [
      ["passing", "touchdowns"],
      ["rushing", "touchdowns"],
      ["receiving", "touchdowns"]
    ],
    syntax: "Total TDs",
    comparison: "up"
  },

  {
    stat: [["rushing", "avg_yards"]],
    syntax: "Avg Rush Yards",
    comparison: "up"
  },
  {
    stat: [["receiving", "avg_yards"]],
    syntax: "Avg Receiving Yards",
    comparison: "up"
  },
  {
    stat: [["receiving", "broken_tackles"], ["rushing", "broken_tackles"]],
    syntax: "Broken Tackles",
    comparison: "up"
  },
  {
    stat: [["receiving", "dropped_passes"]],
    syntax: "Dropped Receiving Passes",
    comparison: "down"
  },
  {
    stat: [["rushing", "longest_touchdown"]],
    syntax: "Longest Rush TD",
    comparison: "up"
  },
  {
    stat: [["fumbles", "fumbles"]],
    syntax: "Fumbles",
    comparison: "down"
  }
]

export const wrCardData = [
  {
    stat: [
      ["passing", "touchdowns"],
      ["rushing", "touchdowns"],
      ["receiving", "touchdowns"]
    ],
    syntax: "Total TDs",
    comparison: "up"
  },
  {
    stat: [["receiving", "air_yards"]],
    syntax: "Air Yards",
    comparison: "up"
  },
  {
    stat: [
      ["receiving", "yards_after_contact"],
      ["rushing", "yards_after_contact"]
    ],
    syntax: "Yards After Contact",
    comparison: "up"
  },
  {
    stat: [["receiving", "avg_yards"]],
    syntax: "Avg Receiving Yards",
    comparison: "up"
  },
  {
    stat: [["receiving", "broken_tackles"], ["rushing", "broken_tackles"]],
    syntax: "Broken Tackles",
    comparison: "up"
  },
  {
    stat: [["receiving", "dropped_passes"]],
    syntax: "Dropped Receiving Passes",
    comparison: "down"
  },
  {
    stat: [["receiving", "longest_touchdown"]],
    syntax: "Longest Rec TD",
    comparison: "up"
  }
]

export const statisticsLookup = (typeOfStat, actualStat, props) =>
  props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
    .statistics[typeOfStat][actualStat]

export const doesTypeOfStatExist = (typeOfStat, props) =>
  props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
    .statistics[typeOfStat]
    ? true
    : false
