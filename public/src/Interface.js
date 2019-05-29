import { Game } from "/game-memory-cards/public/src/Game.js";
// import { myAlert } from "/public/src/myAlert.js";

export class Interface {
  constructor(name, time, chance, level, game = Game) {
    // FUNCTIONS AND UNDERFUNCTIONS
    // UNDERFUNCTION, ADDCLASS
    const addClass = (element, clas) => {
      element.classList.add(clas);
    };

    //
    //
    // UNDERFUNCTION, CREATE DOM ELEMENT

    const createDOMElement = (
      name = "slimShady",
      text = "5",
      clas = "button",
      type = "button",
      parent = this.self,
      binded = true
    ) => {
      if (binded) {
        this[name] = document.createElement(type);
        addClass(this[name], clas);
        this[name].innerText = text;
        parent.append(this[name]);
      } else if (!binded) {
        const whatever = document.createElement(type);
        addClass(whatever, clas);
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

    const removeAllBtns = () => {
      document.querySelectorAll(".button").forEach(button => {
        button.remove();
      });
    };

    //
    //
    // UNDERFUNCTION,  DISPLAY TILES MENU

    const askAboutTiles = () => {
      createDOMElement("size1Btn", "16 tiles");
      this.size1Btn.addEventListener("click", () => {
        addClass(this.size1Btn, "hideRight");
        this.level = 2;
        startGame();
      });

      createDOMElement("size2Btn", "20 tiles");
      this.size2Btn.addEventListener("click", () => {
        addClass(this.size2Btn, "hideRight");
        this.level = 1;
        startGame();
      });

      createDOMElement("size3Btn", "40 tiles");
      this.size3Btn.addEventListener("click", () => {
        addClass(this.size3Btn, "hideRight");
        this.level = 0;
        startGame();
      });
    };

    //
    //
    // UNDERFUNCTION,  CHECK LOCALSTORAGE

    const checkLocalStorage = () => {
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
    // UNDERFUNCTION, SET LOCALSTORAGE
    const setStorage = () => {
      if (checkLocalStorage) {
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

    //
    //
    // UNDERFUNCTION, GET LOCALSTORAGE + SORT STATISTICS DATA
    const getStorage = (name, time, chance, level) => {
      // basicly we are taking locals, adding actual one
      if (checkLocalStorage) {
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
          this.statisticsPositions.push([name, level, time, chance]);
        }

        if (this.statisticsPositions) {
          this.statisticsPositions.sort((position1, position2) => {
            if (position1[3] > position2[3]) return -1;
            if (position1[3] < position2[3]) return 1;

            if (position1[1] > position2[1]) return 1;
            if (position1[1] < position2[1]) return -1;
          });
        }

        // console.log(names, levels, times, scores, "got u back");

        // so now we can  set all of them into local
        setStorage();
      } else myAlert("We are sorry but your browser don't use localStorage");
    };

    //
    //
    // UNDERFUNCTION, Create Remove Statisctis Menu option
    const createRemoveStatistics = () => {
      // Create button Statistics
      createDOMElement("historyBtn", "Remove Statistics");
      addClass(this.historyBtn, "red");

      // LISTENER
      this.historyBtn.addEventListener("click", () => {
        this.tStatistics.remove();
        removeAllBtns();

        // Create BUTTON YES "delete"
        createDOMElement(
          "deleteInfo",
          "Are you sure that you want to remove all statistics ?",
          "deleteInfo",
          "div"
        );

        //

        // Create BUTTON YES "delete"
        createDOMElement("deleteBtn", "Yes", "button", "button");
        addClass(this.deleteBtn, "red");

        // LISTENER
        this.deleteBtn.addEventListener("click", () => {
          localStorage.clear();
          this.self.remove();
          new Interface();
          // removeAllBtns();
          // this.deleteInfo.remove();
          // showStatistics();
        });

        // Create BUTTON YES "delete"
        createDOMElement("noDeleteBtn", "No", "button", "button");
        // LISTENER
        this.noDeleteBtn.addEventListener("click", () => {
          removeAllBtns();
          this.deleteInfo.remove();

          showStatistics();
        });
      });
    };

    //
    //
    // UNDERFUNCTION,  DISPLAY STATISTICS

    const showStatistics = () => {
      // Create remove options
      createRemoveStatistics();

      createDOMElement("tStatistics", null, "tStatistics", "table");
      // create Table Row for Headers
      createDOMElement("tRowH", "", "tr", "tr", this.tStatistics);

      // create Table Row Headers
      createDOMElement("tName", "name", "th", "th", this.tRowH);
      createDOMElement("tLevel", "level", "th", "th", this.tRowH);
      createDOMElement("tTime", "time", "th", "th", this.tRowH);
      createDOMElement("tScore", "s/t", "th", "th", this.tRowH);
      // create Statistics positions
      this.statisticsPositions.forEach((position, index) => {
        // console.log(position);
        // Create new table row for position

        createDOMElement(
          "position" + index,
          null,
          "tr",
          "tr",
          this.tStatistics
        );

        // Create all table data !
        // name
        createDOMElement(
          "whatever",
          position[0],
          "td",
          "td",
          this["position" + index],
          false
        );
        //level
        createDOMElement(
          "whatever",
          position[1],
          "td",
          "td",
          this["position" + index],
          false
        );
        //time
        createDOMElement(
          "whatever",
          position[2],
          "td",
          "td",
          this["position" + index],
          false
        );
        //score
        createDOMElement(
          "whatever",
          position[3] == "NaN" ? "0.0" : position[3],
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

    const startGame = (type = this.gameType, level = this.level) => {
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

    const createStartMenu = () => {
      // Create BACK BUTTON
      createDOMElement("statisticsBackBtn", null, "returnBtn");

      // LISTENER
      this.statisticsBackBtn.addEventListener("click", () => {
        if (this.tStatistics) {
          this.tStatistics.remove();
        }
        if (this.deleteInfo) {
          this.deleteInfo.remove();
        }
        removeAllBtns();
        createStartMenu();
      });

      // Create new Interfejs ..
      createDOMElement("startBtn", "Start Game");

      // Create Type MENU
      const createGameTypeMenu = () => {
        removeAllBtns();

        // Create button CATEDRAS
        createDOMElement("catedrasBtn", "Cathedrals");

        // LISTENER
        this.catedrasBtn.addEventListener("click", () => {
          addClass(this.catedrasBtn, "hideRight");
          // game option set
          this.gameType = "catedras";
          setTimeout(() => {
            removeAllBtns();
            askAboutTiles();
          }, 400);
        });

        // Create button Faces
        createDOMElement("facesBtn", "People");

        // LISTENER
        this.facesBtn.addEventListener("click", () => {
          addClass(this.facesBtn, "hideRight");
          this.gameType = "faces";
          setTimeout(() => {
            removeAllBtns();
            askAboutTiles();
          }, 400);
        });
      };
      // LISTENER
      this.startBtn.addEventListener("click", () => {
        addClass(this.startBtn, "hideRight");

        setTimeout(() => {
          // remove all old buttons
          createGameTypeMenu();
        }, 400);
      });

      // Create button Statistics
      createDOMElement("statsBtn", "Statistics");

      // LISTENER
      this.statsBtn.addEventListener("click", () => {
        addClass(this.statsBtn, "hideRight");
        setTimeout(() => {
          removeAllBtns();
          showStatistics();
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
      this.level = undefined; //we gonna send it straight like others
      this.gameType = "faces";

      this.statisticsPositions = [];
      // name,time,score are values from constructor
      getStorage(name, time, chance, level);

      // Add Interfejs to body
      document.body.appendChild(this.self);
      // create first buttons
      createStartMenu();
    })();
  }
}
