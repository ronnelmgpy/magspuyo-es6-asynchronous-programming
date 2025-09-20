class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  intro() {
    return `Hi, I'm ${this.name}, ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}

function fetchDataWithPromises() {
  fetch("./data/students.json")
    .then((res) => res.json())
    .then((data) => {
      console.log("Using Promises:", data);
    })
    .catch((err) => console.error(err));
}

async function fetchDataWithAsync() {
  try {
    const res = await fetch("./data/students.json");
    const data = await res.json();
    console.log("Using Async/Await:", data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function displayData() {
  const res = await fetch("./data/students.json");
  const { students, courses, instructors } = await res.json();

  const outputDiv = document.getElementById("output");

  let html = "<h2>Learners:</h2><ul>";
  students.forEach((s) => {
    let highlight = s.age > 21 ? " <strong>*</strong>" : "";
    html += `<li>${s.name} (${s.age}) - ${s.course}${highlight}</li>`;
  });
  html += "</ul>";

  html += "<h2>Subjects:</h2><ul>";
  courses.forEach((c) => {
    html += `<li>${c.title}: ${c.description}</li>`;
  });
  html += "</ul>";

  html += "<h2>Mentors:</h2><ul>";
  instructors.forEach((i) => {
    html += `<li>${i.name} - ${i.subject}</li>`;
  });
  html += "</ul>";

  html += "<h2>Matches:</h2><ul>";
  students.forEach((s) => {
    const course = courses.find((c) => c.title === s.course);
    const instructor = instructors.find((i) =>
      i.subject.includes(course.title) || i.subject.includes(s.course)
    );

    html += `<li>${s.name} → ${s.course} → ${course.description}`;
    if (instructor) {
      html += ` → Taught by ${instructor.name}`;
    }
    html += `</li>`;
  });
  html += "</ul>";

  outputDiv.innerHTML = html;
}

fetchDataWithPromises();
fetchDataWithAsync();
displayData();

const s1 = new Student(1, "Liam", 19, "Artificial Intelligence");
const s2 = new Student(2, "Sophia", 23, "Web Development");
const s3 = new Student(3, "Noah", 21, "Mobile Computing");

const i1 = new Instructor(1, "Olivia Martinez", "Cloud Platforms & Engineering");
const i2 = new Instructor(2, "Daniel Cruz", "Advanced Web Programming");

console.log(s1.intro());
console.log(i1.teach());