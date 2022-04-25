const people = ["yoshi", "mario", "luigi", "toad"];
const ages = [12, 34, 32, 22];

console.log(people);

// I want to export something manually from this file.
//module.exports = people;

// Want if I want to export more than 1 thing:
module.exports = {
  people: people,
  ages: ages,
};
