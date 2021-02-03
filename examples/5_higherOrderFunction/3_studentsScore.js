// Example 3
// More examples given a classroom of students
const students = [
  { name: "John", score: 9, gender: "M" },
  { name: "Emily", score: 8, gender: "F" },
  { name: "Bob", score: 7, gender: "M" },
  { name: "Johnny", score: 2, gender: "M" },
  { name: "Noah", score: 4, gender: "M" },
  { name: "Alice", score: 7, gender: "F" },
];

/*
  Using higher order functions to create a program that is easy to read, provide:
  - The average score of this classroom
  - The average score of the boys
  - The average score of the girls
  - The highest score among the boys
  - The highest score among the girls
  */

// Some simple functions that does only one job each
const isBoy = (student) => student.gender === "M";
const isGirl = (student) => student.gender === "F";
const getBoys = (students) => students.filter(isBoy);
const getGirls = (students) => students.filter(isGirl);
const average = (students) =>
  students.reduce((acc, student) => acc + student.score, 0) / students.length;
const highestScore = (students) =>
  Math.max(...students.map((student) => student.score));
const lowestScore = (students) =>
  Math.min(...students.map((student) => student.score));

// Higher order functions plug and play with high code reusability
const classAverage = average(students);
const boysAverage = average(getBoys(students));
const girlsAverage = average(getGirls(students));
const highestScoreBoy = highestScore(getBoys(students));
const highestScoreGirl = highestScore(getGirls(students));

console.log(classAverage);
console.log(boysAverage);
console.log(girlsAverage);
console.log(highestScoreBoy);
console.log(highestScoreGirl);

/* Without using higher order functional composition
  const boysAverage = (students) =>
    students
      .filter((student) => student.gender === "M")
      .reduce((acc, curr) => acc + curr, 0) / students.length;
  
  const boysAverage = (students) =>
    students
      .filter((student) => student.gender === "F")
      .reduce((acc, curr) => acc + curr, 0) / students.length;
  */
