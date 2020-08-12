import {
  data
} from './data.js';
const courses = Object.keys(data);
const container = document.querySelector('form');
courses.forEach(course => {
  const form = document.createElement('div');
  const title = document.createElement('h3');
  title.innerText = course;
  form.appendChild(title);
  const units = Object.keys(data[course]);

  units.forEach(unit => {
    const container2 = document.createElement('div');
    const subtitle = document.createElement('h4');
    subtitle.innerText = unit;
    container2.appendChild(subtitle);

    const sections = Object.keys(data[course][unit]);
    sections.forEach(section => {
      container2.innerHTML += `<input type="radio" id="${course}-${unit}-${section}" name="${course}-${unit}" value="${course}-${unit}-${section}"> <label for="${course}-${unit}-${section}">${section} - ${data[course][unit][section]["Teacher"]}</label><br>`
    });
    form.appendChild(container2);
  });

  container.appendChild(form);
});


const updateTT = () => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const gridData = document.querySelectorAll('.data');
  for (const slot of gridData) {
    slot.innerHTML = '';
  };
  console.clear();
  const formData = new FormData(container);
  for (var value of formData.values()) {
    const keys = value.split('-');
    const sch = data[keys[0]][keys[1]][keys[2]]
    for (let i = 0; i < 6; i++) {
      if (sch['Time'][i] !== 0) {
        const slot = document.querySelector(`.grid-area-${days[i]}${sch['Time'][i] - 7}`);
        slot.innerHTML += `${keys[0]} ${keys[2]}`
      }
    }
  };
};

container.addEventListener('change', () => {
  updateTT();
});

updateTT();
