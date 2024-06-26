// (function () {
//   "use strict";
//   /**
//    * Define global Util object if it doesn't exist
//    */
//   if ("object" !== typeof window.Timer) {
//     window.Timer = {};
//   }
//   /**
//    * Namspace string
//    */
//   Timer.ns = "JavaScript Timer";
//   Timer.getTimeRemaining = function (endtimeRaw) {
//     // Some browsers need a "T" in there...
//     var endtime = new Date(endtimeRaw.replace(/\s/, "T"));
//     var t = Date.parse(endtime) - Date.parse(new Date());
//     var seconds = Math.floor((t / 1000) % 60);
//     var minutes = Math.floor((t / 1000 / 60) % 60);
//     var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
//     var days = Math.floor(t / (1000 * 60 * 60 * 24));
//     // Build out the JSON object
//     return {
//       total: t,
//       days: days,
//       hours: hours,
//       minutes: minutes,
//       seconds: seconds,
//     };
//   };
//   Timer.updateClock = function (endtime) {
//     var t = this.getTimeRemaining(endtime);
//     var days = document.getElementById("timer-days");
//     var hours = document.getElementById("timer-hours");
//     var minutes = document.getElementById("timer-minutes");
//     var seconds = document.getElementById("timer-seconds");
//     var den = document.querySelector(".timer__label-days");

//     days.querySelector(".timer__value").innerHTML = ("0" + t.days).slice(-2);
//     hours.querySelector(".timer__value").innerHTML = ("0" + t.hours).slice(-2);
//     minutes.querySelector(".timer__value").innerHTML = ("0" + t.minutes).slice(
//       -2
//     );
//     // Adds a leading 0 to maintain spacing
//     seconds.querySelector(".timer__value").innerHTML = ("0" + t.seconds).slice(
//       -2
//     );
//     // sklonovani
//     //   den.innerHTML = t.days >= 5 ? 'dní' : t.days == 1 ? 'den' : 'dni';
//     // If the timer is at zero
//     if (t.total <= 0) {
//       // Stop the timer
//       clearInterval(timeinterval);
//       // Zero out the timer
//       days.querySelector(".timer__value").innerHTML = 0;
//       hours.querySelector(".timer__value").innerHTML = 0;
//       minutes.querySelector(".timer__value").innerHTML = 0;
//       seconds.querySelector(".timer__value").innerHTML = 0;
//     } // if 0
//   };
//   Timer.start = function (obj) {
//     var timer = obj.timer;
//     var endtime = obj.endtime;
//     if (timer) {
//       // Run the function once to avoid a delayed start
//       this.updateClock(endtime);
//       // Set up the time interval to tick the clock down
//       var timeinterval = setInterval(function () {
//         Timer.updateClock(endtime);
//       }, 1000);
//     } // timer
//   };
// })();
// let countDown = document.getElementById("js-timer");
// if (countDown) {
//   (function () {
//     Timer.start({
//       timer: document.getElementById("js-timer"),
//       endtime: document.getElementById("js-timer").getAttribute("data-endtime"),
//     });
//   })();
// }
