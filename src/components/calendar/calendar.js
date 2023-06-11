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
  function openPopup(event) {
    // Create the popup window element
    const popup = document.createElement("div");
    popup.classList.add("popup");

    // Create the content for the popup window
    const titleEl = document.createElement("h4");
    titleEl.innerText = event.title;
    popup.appendChild(titleEl);

    if (event.logo) {
      const logoImg = document.createElement("img");
      logoImg.classList.add("logo");
      logoImg.src = event.logo;
      popup.appendChild(logoImg);
    }

    if (event.links) {
      const linksDiv = document.createElement("div");
      linksDiv.classList.add("links");
      for (let j = 0; j < event.links.length; j++) {
        const link = event.links[j];
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
      popup.appendChild(linksDiv);
    }

    // Add the popup to the document body
    document.body.appendChild(popup);

    // Add an event listener to close the popup when clicked outside
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.remove();
      }
    });
  }

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

 