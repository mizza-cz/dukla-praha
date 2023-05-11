// let nav = 0;
// let clicked = null;
// let eventsList = localStorage.getItem("events")
//   ? JSON.parse(localStorage.getItem("events"))
//   : [];

// const calendar = document.getElementById("calendar");
// const weekdays = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// function load() {
//   const dt = new Date();

//   if (nav !== 0) {
//     dt.setMonth(new Date().getMonth() + nav);
//   }

//   const day = dt.getDate();
//   const month = dt.getMonth();
//   const year = dt.getFullYear();

//   const firstDayOfMonth = new Date(year, month, 1);
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
//     weekday: "long",
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   });
//   const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

//   document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
//     "cs-Cz",
//     { month: "long" }
//   )} ${year}`;

//   calendar.innerHTML = "";

//   for (let i = 1; i <= paddingDays + daysInMonth; i++) {
//     const daySquare = document.createElement("div");
//     daySquare.classList.add("day");

//     const dayString = `${month + 1}/${i - paddingDays}/${year}`;

//     if (i > paddingDays) {
//       daySquare.innerText = i - paddingDays;
//       const eventForDay = eventsList.find((e) => e.date === dayString);

//       if (i - paddingDays === day && nav === 0) {
//         daySquare.id = "currentDay";
//       }

//       if (eventForDay) {
//         const eventDiv = document.createElement("div");
//         eventDiv.classList.add("event");
//         eventDiv.innerText = eventForDay.title;
//         daySquare.appendChild(eventDiv);

//         if (eventForDay.logo) {
//           const logoImg = document.createElement("img");
//           logoImg.classList.add("logo");
//           logoImg.src = eventForDay.logo;
//           eventDiv.appendChild(logoImg);
//         }

//         if (eventForDay.link) {
//           const linkEl = document.createElement("a");
//           linkEl.classList.add("link");
//           linkEl.href = eventForDay.link;
//           linkEl.innerText = "Event link";
//           eventDiv.appendChild(linkEl);
//         }
//       }
//     } else {
//       daySquare.classList.add("padding");
//     }

//     calendar.appendChild(daySquare);
//   }
// }

// function initButtons() {
//   document.getElementById("nextButton").addEventListener("click", () => {
//     nav++;
//     load();
//   });

//   document.getElementById("backButton").addEventListener("click", () => {
//     nav--;
//     load();
//   });
// }

// initButtons();
// load();

// const xhr = new XMLHttpRequest();
// xhr.open("GET", "data.json", true);
// xhr.onload = function () {
//   if (xhr.status === 200) {
let nav = 0;
let clicked = null;
let eventsList = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "cs-Cz",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = eventsList.find((e) => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        const titleEl = document.createElement("h4");
        titleEl.innerText = eventForDay.title;
        eventDiv.appendChild(titleEl);

        if (eventForDay.logo) {
          const logoImg = document.createElement("img");
          logoImg.classList.add("logo");
          logoImg.src = eventForDay.logo;
          eventDiv.appendChild(logoImg);
        }

        if (eventForDay.links) {
          const linksDiv = document.createElement("div");
          linksDiv.classList.add("links");

          for (let j = 0; j < eventForDay.links.length; j++) {
            const link = eventForDay.links[j];
            const linkEl = document.createElement("a");
            linkEl.classList.add("link");
            linkEl.href = link.url;

            if (link.icon) {
              const iconImg = document.createElement("img");
              iconImg.classList.add("icon");
              iconImg.src = link.icon;
              linkEl.appendChild(iconImg);
            }

            linksDiv.appendChild(linkEl);
          }

          eventDiv.appendChild(linksDiv);
        }

        daySquare.appendChild(eventDiv);
      }
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
}

initButtons();
load();

const xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.onload = function () {
  if (xhr.status === 200) {
    const eventsFromJson = JSON.parse(xhr.response);
    localStorage.setItem("events", JSON.stringify(eventsFromJson));
    eventsList = eventsFromJson;
    load();
  }
};
xhr.send();
