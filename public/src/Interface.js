import { Game } from "/game-memory-cards/public/src/Game.js";
// import { myAlert } from "/public/src/myAlert.js";

export class Interface {
  constructor(name, time, chance, game = Game) {
    // FUNCTIONS AND UNDERFUNCTIONS
    // UNDERFUNCTION, ADDCLASS
    this.addClass = (element, clas) => {
      element.classList.add(clas);
    };

    //
    //
    // UNDERFUNCTION, CREATE DOM ELEMENT

    this.createDOMElement = (
      name = "slimShady",
      text = "That's why I'm on what I'm on cause I'm my mom.",
      clas = "button",
      type = "button",
      parent = this.self,
      binded = true
    ) => {
      if (binded) {
        this[name] = document.createElement(type);
        this.addClass(this[name], clas);
        this[name].innerText = text;
        parent.append(this[name]);
      } else if (!binded) {
        const whatever = document.createElement(type);
        this.addClass(whatever, clas);
        whatever.innerText = text;
        parent.append(whatever);
      }
    };

    //
    //
    // UNDERFUNCTION, RESIZE GAME

    this.resize = () => {
      if (this.game) {
        const width = innerWidth;
        if (width >= 1024) {
          // margin on big screen
          this.game.gameSize("80%");
        } else {
          this.game.gameSize("100%");
        }
      }
    };
    window.addEventListener("resize", this.resize);

    //
    //
    // UNDERFUNCTION, REMOVE ALL BUTTONS

    this.removeAllBtns = () => {
      document.querySelectorAll(".button").forEach(button => {
        button.remove();
      });
    };

    //
    //
    // UNDERFUNCTION,  DISPLAY TILES MENU

    this.askAboutTiles = () => {
      this.createDOMElement("size1Btn", "16 tiles");
      this.size1Btn.addEventListener("click", () => {
        this.addClass(this.size1Btn, "hideRight");
        this.level = 2;
        this.startGame();
      });

      this.createDOMElement("size2Btn", "20 tiles");
      this.size2Btn.addEventListener("click", () => {
        this.addClass(this.size2Btn, "hideRight");
        this.level = 1;
        this.startGame();
      });

      this.createDOMElement("size3Btn", "40 tiles");
      this.size3Btn.addEventListener("click", () => {
        this.addClass(this.size3Btn, "hideRight");
        this.level = 0;
        this.startGame();
      });
    };

    //
    //
    // UNDERFUNCTION,  CHECK LOCALSTORAGE

    this.checkLocalStorage = () => {
      // test if localStorage exist
      try {
        //try to storage some data in LocalStorage
        localStorage.setItem("foo", "foo");
        localStorage.removeItem("foo");
        return true;
      } catch (e) {
        alert("We are sorry but your browser don't support localStorage");
        return false;
      }
    };

    //
    //
    // UNDERFUNCTION, GET LOCALSTORAGE
    this.setStorage = () => {
      if (this.checkLocalStorage) {
        const names = [],
          levels = [],
          times = [],
          scores = [];
        this.statisticsPositions.forEach(position => {
          names.push(position[0]);
          levels.push(position[1]);
          times.push(position[2]);
          scores.push(position[3]);
        });

        console.log(names, levels, times, scores, "will sended");
        localStorage.setItem("names", JSON.stringify(names));
        localStorage.setItem("levels", JSON.stringify(levels));
        localStorage.setItem("times", JSON.stringify(times));
        localStorage.setItem("scores", JSON.stringify(scores));
      } else myAlert("We are sorry but your browser don't use localStorage");
    };

    this.getStorage = (name, time, chance) => {
      // basicly we are taking locals, adding actual one
      if (this.checkLocalStorage) {
        const names = JSON.parse(localStorage.getItem("names"));
        const levels = JSON.parse(localStorage.getItem("levels"));
        const times = JSON.parse(localStorage.getItem("times"));
        const scores = JSON.parse(localStorage.getItem("scores"));
        if (names) {
          names.forEach((name, index) => {
            this.statisticsPositions.push([
              name,
              levels[index],
              times[index],
              scores[index]
            ]);
          });
        }
        if (name) {
          this.statisticsPositions.push([name, this.level, time, chance]);
        }

        if (this.statisticsPositions) {
          this.statisticsPositions.sort((position1, position2) => {
            if (position1[3] > position2[3]) return -1;
            if (position1[3] < position2[3]) return 1;

            if (position1[0] > position2[0]) return 1;
            if (position1[0] < position2[0]) return -1;
          });
        }

        // console.log(names, levels, times, scores, "got u back");

        // so now we can  set all of them into local
        this.setStorage();
      } else myAlert("We are sorry but your browser don't use localStorage");
    };

    //
    //
    // UNDERFUNCTION,  DISPLAY STATISTICS

    this.showStatistics = () => {
      this.createDOMElement("tStatistics", null, "tStatistics", "table");
      // create Table Row for Headers
      this.createDOMElement("tRowH", "", "tr", "tr", this.tStatistics);

      // create Table Row Headers
      this.createDOMElement("tName", "name", "th", "th", this.tRowH);
      this.createDOMElement("tLevel", "level", "th", "th", this.tRowH);
      this.createDOMElement("tTime", "time", "th", "th", this.tRowH);
      this.createDOMElement("tScore", "score", "th", "th", this.tRowH);
      // create Statistics positions
      this.statisticsPositions.forEach((position, index) => {
        // console.log(position);
        // Create new table row for position

        this.createDOMElement(
          "position" + index,
          null,
          "tr",
          "tr",
          this.tStatistics
        );

        // Create all table data !
        // name
        this.createDOMElement(
          "whatever",
          position[0],
          "td",
          "td",
          this["position" + index],
          false
        );
        //level
        this.createDOMElement(
          "whatever",
          position[1],
          "td",
          "td",
          this["position" + index],
          false
        );
        //time
        this.createDOMElement(
          "whatever",
          position[2],
          "td",
          "td",
          this["position" + index],
          false
        );
        //score
        this.createDOMElement(
          "whatever",
          position[3],
          "td",
          "td",
          this["position" + index],
          false
        );
      });
    };

    //
    //
    // FUNCTION, START GAME

    this.startGame = (type = this.gameType, level = this.level) => {
      setTimeout(() => {
        // console.log(this.self, "przed");
        this.self.remove();

        // console.log(this.self, "po");
        if (!this.game) {
          this.game = new this.Game(level, type);
          this.game.init();
          this.resize();
        } else console.log("DragonBall Click");
      }, 400);
    };

    //
    //
    // FUNCTION, CREATE MAIN MENU

    this.createStartMenu = () => {
      this.createDOMElement("statisticsBackBtn", null, "returnBtn");
      // Listener
      this.statisticsBackBtn.addEventListener("click", () => {
        if (this.tStatistics) {
          this.tStatistics.remove();
        }
        this.removeAllBtns();
        this.createStartMenu();
      });
      // Create new Interfejs .. little bit primitvie
      this.createDOMElement("startBtn", "Start Game");
      this.startBtn.addEventListener("click", () => {
        this.addClass(this.startBtn, "hideRight");

        setTimeout(() => {
          // remove all old buttons
          this.removeAllBtns();

          // Create button CATEDRAS
          this.createDOMElement("catedrasBtn", "Catedras");

          // LISTENER
          this.catedrasBtn.addEventListener("click", () => {
            this.addClass(this.catedrasBtn, "hideRight");
            // game option set
            this.gameType = "catedras";
            setTimeout(() => {
              this.removeAllBtns();
              this.askAboutTiles();
            }, 400);
          });

          // Create button Faces
          this.createDOMElement("facesBtn", "Faces");

          // LISTENER
          this.facesBtn.addEventListener("click", () => {
            this.addClass(this.facesBtn, "hideRight");
            this.gameType = "faces";
            setTimeout(() => {
              this.removeAllBtns();
              this.askAboutTiles();
            }, 400);
          });
        }, 400);
      });

      this.createDOMElement("statsBtn", "Statistics");

      // LISTENER
      this.statsBtn.addEventListener("click", () => {
        this.addClass(this.statsBtn, "hideRight");
        setTimeout(() => {
          this.removeAllBtns();
          this.showStatistics();
        }, 400);
      });
    };

    //
    //
    //
    //
    //
    //

    (this.init = () => {
      this.self = document.createElement("div");
      this.self.classList.add("interfejs");

      this.Game = game;
      this.game = undefined;
      this.level = 1;
      this.gameType = "faces";

      this.statisticsPositions = [];
      // name,time,score are values from constructor
      this.getStorage(name, time, chance);

      // Add Interfejs to body
      document.body.appendChild(this.self);
      // create first buttons
      this.createStartMenu();
    })();
  }
}
