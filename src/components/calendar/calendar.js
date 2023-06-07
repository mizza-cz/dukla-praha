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
  const monthDisplay = document.getElementById("monthDisplay");

  if (monthDisplay !== null) {
    monthDisplay.innerText = `${dt.toLocaleDateString("cs-Cz", {
      month: "long",
    })} ${year}`;
  } else {
  }

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
            const linkEl = document.createElement("div");
            linkEl.classList.add("link");

            if (link.icon) {
              const iconImg = document.createElement("img");
              iconImg.classList.add("icon");
              iconImg.src = link.icon;
              linkEl.appendChild(iconImg);
            }

            const linkContent = document.createElement("div");
            linkContent.innerText = link.url;
            linkEl.appendChild(linkContent);

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

  var components = document.getElementsByClassName("day");
  for (var i = 0; i < components.length; i++) {
    var component = components[i];
    // Проверяем наличие элемента с классом "event" внутри компонента
    if (component.querySelector(".event")) {
      // Создаем ссылку и заменяем компонент на ссылку
      const link = document.createElement("a");
      link.href = "#"; // Здесь нужно указать ссылку, на которую будет вести компонент
      link.classList.add("day-bg");
      link.innerHTML = component.innerHTML; // Копируем содержимое компонента в ссылку
      component.parentNode.replaceChild(link, component);
    }

    // Проверяем наличие элемента с классом "link" внутри компонента
    if (component.querySelector(".link")) {
      // Заменяем класс "link" на "div"
      const links = component.querySelectorAll(".link");
      for (let j = 0; j < links.length; j++) {
        const link = links[j];
        link.classList.remove("link");
        link.classList.add("div");
      }
    }
  }
}
