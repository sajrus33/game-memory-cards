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

// .tip {
//     position: fixed;
//     top: 0;
//     z-index: 999;
//     width: 100vw;
//     height: 70px;
//     background-color: rgba(239, 171, 31,1);
//     color: black;
//     animation: tip 4s forwards;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     font-size: 1.15em;
//     white-space: no-wrap;
//     pointer-events: none;
//   }
//   @keyframes tip {
//     10% {
//       top: 60%;
//     }
//     15% {
//       top: 45%;
//     }
//     20% {
//       top: 55%;
//     }
//     25% {
//       top: 50%;
//     }
//     90% {
//       top: 50%;
//     }
//     100% {
//       top: 100%;
//     }
//   }
