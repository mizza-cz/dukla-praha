let O = 0,
  k = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];
const _ = document.getElementById("calendar"),
  D = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
if (_) {
  function n(t = 0) {
    O += t;
    const e = new Date();
    e.setMonth(new Date().getMonth() + O, 1);
    const today = new Date();
    var i = today.getDate(),
      s = e.getMonth(),
      n = e.getFullYear();
    const o = new Date(n, s, 1);
    var r = new Date(n, s + 1, 0).getDate();
    const a = o.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    var l = D.indexOf(a.split(", ")[0]);
    const c = document.getElementById("monthDisplay");
    c &&
      (c.innerText =
        e.toLocaleDateString("cs-Cz", { month: "long" }) + " " + n),
      (_.innerHTML = "");
    for (let t = 1; t <= l + r; t++) {
      const f = document.createElement("div");
      f.classList.add("day");
      const m = `${s + 1}/${t - l}/${n}`;
      if (t > l) {
        f.innerText = t - l;
        if (
          t - l === i &&
          e.getMonth() === today.getMonth() &&
          n === today.getFullYear()
        ) {
          f.id = "currentDay";
        }
        var d = k.find((t) => t.date === m);
        if (d) {
          const y = document.createElement("div"),
            v = document.createElement("h4");
          y.classList.add("event");
          v.innerText = d.title;
          y.appendChild(v);
          if (d.url) {
            const b = document.createElement("a");
            b.setAttribute("href", d.url);
            b.innerText = d.title;
            y.appendChild(b);
          } else {
            const w = document.createElement("h4");
            w.innerText = d.title;
            y.appendChild(w);
          }
          if (d.logo) {
            const C = document.createElement("img");
            C.classList.add("logo");
            C.src = d.logo;
            y.appendChild(C);
          }
          if (d.links) {
            const S = document.createElement("div");
            S.classList.add("links");
            for (let t = 0; t < d.links.length; t++) {
              const u = d.links[t],
                x = document.createElement("div"),
                T = document.createElement("img");
              x.classList.add("link");
              if (u.icon) {
                T.classList.add("icon");
                T.src = u.icon;
                x.appendChild(T);
              }
              S.appendChild(x);
            }
            y.appendChild(S);
          }
          if (d.info) {
            const I = document.createElement("div");
            I.classList.add("day__info");
            if (d.info.date) {
              const A = document.createElement("div");
              A.classList.add("day__date");
              A.innerText = d.info.date;
              I.appendChild(A);
            }
            if (d.info.place) {
              const E = document.createElement("div");
              E.classList.add("day__place");
              E.innerText = d.info.place;
              I.appendChild(E);
            }
            y.appendChild(I);
          }
          f.appendChild(y);
        }
      } else {
        f.classList.add("padding");
      }
      _.appendChild(f);
    }
  }
  const f = document.getElementById("nextButton"),
    m = document.getElementById("backButton");
  f &&
    f.addEventListener("click", () => {
      n(1);
    }),
    m &&
      m.addEventListener("click", () => {
        n(-1);
      });
  const g = new XMLHttpRequest();
  // g.open("GET", "data.json", true);
  g.open("GET", "/api/calendar/matches.php", true);
  g.onload = function () {
    if (g.status === 200) {
      const t = JSON.parse(g.response);
      localStorage.setItem("events", JSON.stringify(t));
      k = t;
      n();
    }
  };
  g.send();
}
