headerNavOpenerClick();
function headerNavOpenerClick() {
  const bodyEl = document.querySelector("body");
  const headerNavOpener = document.querySelector(".js-header__opener");
  if (!bodyEl || !headerNavOpener) {
    return;
  }
  headerNavOpener.addEventListener("click", function () {
    if (!this.classList.contains("is-open")) {
      bodyEl.classList.add("is-nav-open");
      this.classList.add("is-open");
    } else {
      bodyEl.classList.remove("is-nav-open");
      this.classList.remove("is-open");
    }
  });
}
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Чтобы ссылка не перезагружала страницу

    const navItem = this.closest(".nav-item"); // Находим родителя .nav-item

    if (!navItem) return; // Если родителя нет, выходим

    const isActive = navItem.classList.contains("showMob");

    // Убираем showMob у всех .nav-item
    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("showMob"));

    // Если у текущего элемента не было класса showMob, добавляем
    if (!isActive) {
      navItem.classList.add("showMob");
    }
  });
});
