// let nav = 0;
// let clicked = null;
// let events = localStorage.getItem("events")
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
//       const eventForDay = events.find((e) => e.date === dayString);

//       if (i - paddingDays === day && nav === 0) {
//         daySquare.id = "currentDay";
//       }

//       if (eventForDay) {
//         const eventDiv = document.createElement("div");
//         eventDiv.classList.add("event");
//         eventDiv.innerText = eventForDay.title;
//         daySquare.appendChild(eventDiv);
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
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);

        if (eventForDay.logo) {
          const logoImg = document.createElement("img");
          logoImg.classList.add("logo");
          logoImg.src = eventForDay.logo;
          eventDiv.appendChild(logoImg);
        }

        if (eventForDay.link) {
          const linkEl = document.createElement("a");
          linkEl.classList.add("link");
          linkEl.href = eventForDay.link;
          linkEl.innerText = "Event link";
          eventDiv.appendChild(linkEl);
        }
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

// Массив объектов матчей, каждый объект содержит дату, логотипы команд и ссылки на страницы матчей
// var matches = [
//   {
//     date: "2023-05-01",
//     homeTeamLogo: "logo1.png",
//     awayTeamLogo: "logo2.png",
//     link: "match1.html",
//   },
//   {
//     date: "2023-05-05",
//     homeTeamLogo: "logo3.png",
//     awayTeamLogo: "logo4.png",
//     link: "match2.html",
//   },
//   {
//     date: "2023-05-10",
//     homeTeamLogo: "logo5.png",
//     awayTeamLogo: "logo6.png",
//     link: "match3.html",
//   },
//   {
//     date: "2023-05-16",
//     homeTeamLogo: "logo7.png",
//     awayTeamLogo: "logo8.png",
//     link: "match4.html",
//   },
//   {
//     date: "2023-05-21",
//     homeTeamLogo: "logo9.png",
//     awayTeamLogo: "logo10.png",
//     link: "match5.html",
//   },
//   {
//     date: "2023-05-26",
//     homeTeamLogo: "logo11.png",
//     awayTeamLogo: "logo12.png",
//     link: "match6.html",
//   },
// ];

// // Функция для получения HTML-кода матча
// function getMatchHtml(match) {
//   return `
//      <div class="match">
//        <div class="date">${match.date}</div>
//        <div class="teams">
//          <a href="${match.link}">
//            <img class="home-team-logo" src="${match.homeTeamLogo}">
//            <img class="away-team-logo" src="${match.awayTeamLogo}">
//          </a>
//        </div>
//      </div>
//    `;
// }

// // Функция для получения HTML-кода календаря на месяц
// function getCalendarHtml(matches) {
//   var today = new Date();
//   var currentMonth = today.getMonth() + 1;
//   var currentYear = today.getFullYear();

//   var calendarHtml = `
//      <div class="calendar-header">${currentMonth}/${currentYear}</div>
//      <div class="calendar-body">
//    `;

//   for (var i = 1; i <= 31; i++) {
//     var date =
//       currentYear +
//       "-" +
//       currentMonth.toString().padStart(2, "0") +
//       "-" +
//       i.toString().padStart(2, "0");
//     var matchesOnDate = matches.filter(function (match) {
//       return match.date === date;
//     });

//     if (matchesOnDate.length > 0) {
//       calendarHtml += `<div class="day">${i}`;
//       matchesOnDate.forEach(function (match) {
//         calendarHtml += getMatchHtml(match);
//       });
//       calendarHtml += "</div>";
//     } else {
//       calendarHtml += `<div class="day empty">${i}</div>`;
//     }
//   }

//   calendarHtml += "</div>";
//   return calendarHtml;
// }

// // Отображаем календарь на странице
// var calendarElement = document.getElementById("calendar");
// calendarElement.innerHTML = getCalendarHtml(matches);

// Данные о матчах и логотипах футбольных клубов в формате JSON
// const matches = [
//   {
//     date: "2023-05-15",
//     team1: "Team A",
//     team2: "Team B",
//     logo1: "path/to/logo1.png",
//     logo2: "path/to/logo2.png",
//     link: "https://example.com/match1",
//   },
//   {
//     date: "2023-05-23",
//     team1: "Team C",
//     team2: "Team D",
//     logo1: "path/to/logo3.png",
//     logo2: "path/to/logo4.png",
//     link: "https://example.com/match2",
//   },
//   // и т.д.
// ];

// // Создаем календарь
// function createCalendar() {
//   const today = new Date();
//   let year = today.getFullYear();
//   let month = today.getMonth();

//   // Добавляем обработчики событий для кнопок навигации
//   document.querySelector(".prev").addEventListener("click", () => {
//     month--;
//     if (month < 0) {
//       month = 11;
//       year--;
//     }
//     createMonth(year, month);
//   });

//   document.querySelector(".next").addEventListener("click", () => {
//     month++;
//     if (month > 11) {
//       month = 0;
//       year++;
//     }
//     createMonth(year, month);
//   });

//   createMonth(year, month);
// }

// // Создаем месяц
// function createMonth(year, month) {
//   const monthNames = [
//     "Январь",
//     "Февраль",
//     "Март",
//     "Апрель",
//     "Май",
//     "Июнь",
//     "Июль",
//     "Август",
//     "Сентябрь",
//     "Октябрь",
//     "Ноябрь",
//     "Декабрь",
//   ];
//   const monthElement = document.querySelector(".month");
//   const daysElement = document.querySelector(".days");

//   // Очищаем содержимое месяца
//   monthElement.innerHTML = "";
//   daysElement.innerHTML = "";

//   // Создаем заголовок месяца
//   const header = document.createElement("h2");
//   header.innerText = `${monthNames[month]} ${year}`;
//   monthElement.appendChild(header);

//   // Создаем кнопки навигации
//   const prev = document.createElement("button");
//   prev.classList.add("prev");
//   prev.innerText = "<";
//   monthElement.appendChild(prev);

//   const next = document.createElement("button");
//   next.classList.add("next");
//   next.innerText = ">";
//   monthElement.appendChild(next);

//   // Определяем количество дней в месяце
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   // Создаем ячейки дней
//   // Создаем ячейки дней
//   for (let i = 1; i <= daysInMonth; i++) {
//     const dayElement = document.createElement("div");
//     dayElement.classList.add("day");
//     dayElement.innerText = i;
//     // Добавляем данные о матчах и логотипах футбольных клубов для этого дня
//     const dayMatches = matches.filter((match) => {
//       return (
//         new Date(match.date).getFullYear() === year &&
//         new Date(match.date).getMonth() === month &&
//         new Date(match.date).getDate() === i
//       );
//     });

//     if (dayMatches.length > 0) {
//       const matchesElement = document.createElement("div");
//       matchesElement.classList.add("matches");

//       dayMatches.forEach((match) => {
//         const matchElement = document.createElement("div");
//         matchElement.classList.add("match");

//         const logo1 = document.createElement("img");
//         logo1.src = match.logo1;
//         logo1.alt = match.team1;
//         matchElement.appendChild(logo1);

//         const vs = document.createElement("div");
//         vs.classList.add("vs");
//         vs.innerText = "vs";
//         matchElement.appendChild(vs);

//         const logo2 = document.createElement("img");
//         logo2.src = match.logo2;
//         logo2.alt = match.team2;
//         matchElement.appendChild(logo2);

//         const link = document.createElement("a");
//         link.href = match.link;
//         link.target = "_blank";
//         link.innerText = "Подробнее";
//         matchElement.appendChild(link);

//         matchesElement.appendChild(matchElement);
//       });

//       dayElement.appendChild(matchesElement);
//     }

//     daysElement.appendChild(dayElement);
//   }
// }
// createCalendar();
