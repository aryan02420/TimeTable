import {
  data,
  colors,
  fullname
} from './data.js';
const courses = Object.keys(data);
const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');

const form1title = document.createElement('h3');
form1title.innerText = 'Choose Courses';
form1.appendChild(form1title);
const searchbox = document.createElement('div');
searchbox.id = 'search';
searchbox.setAttribute('contenteditable', '');
form1.appendChild(searchbox);
const form1choices = document.createElement('div');
courses.forEach(course => {
  form1choices.innerHTML += `<input type="checkbox" id="${course}" name="course" value="${course}"><label for="${course}">${course} - ${fullname[course] || ""}</label><br>`;
});
form1.appendChild(form1choices);

form1.addEventListener('change', () => {
  displayChoices();
});

form2.addEventListener('change', () => {
  updateTT();
});


searchbox.addEventListener('keyup', () => {
  const regex = RegExp(searchbox.innerText, 'i');
  courses.forEach(course => {
    let elem = document.querySelector(`#${course}`);
    if (regex.test(`${course} - ${fullname[course] || ""}`)) {
      elem.classList.remove('hidden');
    } else {
      elem.classList.add('hidden');
    }
  });
});

let selectedcourses;

// document.querySelector('#reset')
//   .addEventListener('click', () => {
//     localStorage.clear();
//   });

const displayChoices = () => {

  form2.innerHTML = '';

  const form1Data = new FormData(form1);
  selectedcourses = [];

  for (const course of form1Data.values()) {

    selectedcourses.push(course);
    const courseDiv = document.createElement('div');
    courseDiv.classList.add("courseDiv");
    const courseTitle = document.createElement('h3');
    courseTitle.classList.add("courseTitle");
    courseTitle.innerText = `${course} - ${fullname[course] || ""}`;
    courseDiv.appendChild(courseTitle);

    const courseUnits = Object.keys(data[course]);
    const unitsDiv = document.createElement('div');
    unitsDiv.classList.add("unitsDiv");

    courseUnits.forEach(unit => {

      const unitDiv = document.createElement('div');
      unitDiv.classList.add("unitDiv");
      const unitTitle = document.createElement('h4');
      unitTitle.innerText = unit;
      unitDiv.appendChild(unitTitle);

      const sections = Object.keys(data[course][unit]);
      const inputDiv = document.createElement('div');
      inputDiv.classList.add("inputDiv");

      inputDiv.innerHTML += `<input type="radio" id="${course}-${unit}-none" name="${course}-${unit}" value="${course}-${unit}-none"> <label for="${course}-${unit}-none">None</label><br>`

      sections.forEach(section => {

        inputDiv.innerHTML += `<input type="radio" id="${course}-${unit}-${section}" name="${course}-${unit}" value="${course}-${unit}-${section}"> <label for="${course}-${unit}-${section}">${section} - ${data[course][unit][section]["Teacher"]}</label><br>`

      });

      unitDiv.appendChild(inputDiv);
      unitsDiv.appendChild(unitDiv);
      courseDiv.appendChild(unitsDiv);

    });

    form2.appendChild(courseDiv);
  }

  updateTT();

};

const updateTT = () => {

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const gridData = document.querySelectorAll('.data');

  for (const slot of gridData) {

    slot.innerHTML = '';

  };

  const form2Data = new FormData(form2);

  for (const value of form2Data.values()) {

    const keys = value.split('-');
    if (keys[2] === 'none') continue;
    const sch = data[keys[0]][keys[1]][keys[2]];

    for (let i = 0; i < 6; i++) {
      let time = JSON.parse(sch['Time'])[i];
      if (time >= 1 && time <= 7) time += 12;

      if (time !== 0) {
        const slot = document.querySelector(`.grid-area-${days[i]}${time - 7}`);
        slot.innerHTML += `<div class="slot" style="background:${colors[selectedcourses.findIndex(element => element === keys[0])] || "#ffffff"};">${keys[0]}<br>${keys[2]}</div>`;
      }

    }

  };
};

displayChoices();


document.querySelector('#forms').addEventListener('click', (event) => {
  let target = event.target;
  let tagname = target.tagName.toLowerCase();
  if (tagname == 'h4' || tagname == 'h3') {
    if (target.classList.contains("collapsed")) target.classList.remove("collapsed");
    else target.classList.add("collapsed");
  }
});
