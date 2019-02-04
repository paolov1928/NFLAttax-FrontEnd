export const baseCardData = {
  seasonPts: {
    syntax: "Fantasy Points",
    method: data => Math.round(data),
    comparison: "up"
  },
  height: {
    syntax: "Height (cm)",
    method: inches => {
      let feetFromInches = Math.floor(inches / 12); //There are 12 inches in a foot
      let inchesRemainder = inches % 12;
      let result = feetFromInches + "'-" + inchesRemainder + '"';
      return result;
    },
    comparison: "up"
  },
  weight: {
    syntax: "Weight (lbs)",
    method: data => Math.round(data),
    comparison: "up"
  },
  age: {
    syntax: "Age (years)",
    method: dateString => {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    comparison: "up"
  },
  draft: {
    syntax: "Draft (pick)",
    method: addData => (addData.draft ? addData.draft.number : "undrafted"),
    comparison: "down"
  }
};
