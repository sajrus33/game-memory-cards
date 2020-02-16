// my own alert() function
export function myAlert(describe) {
  const oldAlert = document.querySelector(".tip");
  if (oldAlert) {
    oldAlert.remove();
  }
  const newAlert = document.createElement("div");
  newAlert.classList.add("tip");
  newAlert.innerText = String(describe);
  document.body.appendChild(newAlert);
}