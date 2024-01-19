let nav = 0;
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

if (calendar) {
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
          if (eventForDay.url) {
            const a = document.createElement("a");
            a.setAttribute("href", eventForDay.url);
            a.innerText = eventForDay.title;
            eventDiv.appendChild(a);
          } else {
            const titleEl = document.createElement("h4");
            titleEl.innerText = eventForDay.title;
            eventDiv.appendChild(titleEl);
          }
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
              linksDiv.appendChild(linkEl);
            }
            eventDiv.appendChild(linksDiv);
          }

          // Check if eventForDay.info exists before creating day__info block
          if (eventForDay.info) {
            // Добавляем блок day__info
            const dayInfoDiv = document.createElement("div");
            dayInfoDiv.classList.add("day__info");

            // Добавляем информацию только если eventForDay.info.date не пусто
            if (eventForDay.info.date) {
              const infoDateDiv = document.createElement("div");
              infoDateDiv.classList.add("day__date");
              infoDateDiv.innerText = eventForDay.info.date; // Замените на соответствующее поле из JSON
              dayInfoDiv.appendChild(infoDateDiv);
            }

            // Добавляем информацию только если eventForDay.info.place не пусто
            if (eventForDay.info.place) {
              const infoPlaceDiv = document.createElement("div");
              infoPlaceDiv.classList.add("day__place");
              infoPlaceDiv.innerText = eventForDay.info.place; // Замените на соответствующее поле из JSON
              dayInfoDiv.appendChild(infoPlaceDiv);
            }

            // Добавляем блок day__info в eventDiv
            eventDiv.appendChild(dayInfoDiv);
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
      if (component.querySelector(".event")) {
        component.classList.add("day-bg");
      }
    }
  }

  function initButtons() {
    const nextButton = document.getElementById("nextButton");
    const backButton = document.getElementById("backButton");

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nav++;
        load();
      });
    }

    if (backButton) {
      backButton.addEventListener("click", () => {
        nav--;
        load();
      });
    }
  }

  initButtons();

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
}
