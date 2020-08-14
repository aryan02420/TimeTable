import {
  data,
  colors,
  fullname
} from './data.js';
const courses = Object.keys(data);

const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');

courses.forEach(course => {
  form1.innerHTML += `<input type="checkbox" id="${course}" name="course" value="${course}"><label for="${course}">${course} - ${fullname[course] || ""}</label><br>`;
});

form1.addEventListener('change', () => {
  displayChoices();
});

form2.addEventListener('change', () => {
  updateTT();
});

// document.querySelector('#reset')
//   .addEventListener('click', () => {
//     localStorage.clear();
//   });

const displayChoices = () => {

  form2.innerHTML = '';

  const form1Data = new FormData(form1);

  for (const course of form1Data.values()) {

    const courseDiv = document.createElement('div');
    courseDiv.classList.add("courseDiv");
    const courseTitle = document.createElement('h3');
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

      sections.forEach(section => {

        unitDiv.innerHTML += `<input type="radio" id="${course}-${unit}-${section}" name="${course}-${unit}" value="${course}-${unit}-${section}"> <label for="${course}-${unit}-${section}">${section} - ${data[course][unit][section]["Teacher"]}</label><br>`

      });
      unitsDiv.appendChild(unitDiv)
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
    const sch = data[keys[0]][keys[1]][keys[2]];

    for (let i = 0; i < 6; i++) {

      if (sch['Time'][i] !== 0) {

        const slot = document.querySelector(`.grid-area-${days[i]}${sch['Time'][i] - 7}`);
        slot.innerHTML += `<div class="slot" style="background:${colors[courses.findIndex(element => element === keys[0])] || "#ffffff"};">${keys[0]}<br>${keys[2]} ${sch["Room"]}</div>`;

      }

    }

  };
};

displayChoices();
