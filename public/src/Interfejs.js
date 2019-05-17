import { Game } from "/game-memory-cards/public/src/Game.js";
export class Interfejs {
    constructor(game = Game) {
        this.self = document.createElement("div");
        this.self.classList.add("interfejs");

        this.Game = game;
        this.game = undefined;
        this.level = 1;
        this.gameType = "faces";

        this.addClass = (element, clas) => {
            element.classList.add(clas);
        };

        this.startGame = (type = this.gameType, level = this.level) => {
            setTimeout(() => {
                this.self.remove();
                this.game = new this.Game(level, type);
                this.game.init();
                this.resize();
            }, 400);
        };

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
        }
        window.addEventListener("resize", this.resize);


        this.removeAllBtns = () => {
            document.querySelectorAll(".button").forEach(button => {
                button.remove();
            });
        };


        this.askAboutTiles = () => {
            this.size1Btn = document.createElement("button");
            this.size1Btn.classList.add("button");
            this.size1Btn.innerText = "16 tiles";
            this.self.appendChild(this.size1Btn);
            this.size1Btn.addEventListener("click", () => {
                this.addClass(this.size1Btn, "hideRight");
                this.level = 2;
                this.startGame();

            });

            this.size2Btn = document.createElement("button");
            this.size2Btn.classList.add("button");
            this.size2Btn.innerText = "20 tiles";
            this.self.appendChild(this.size2Btn);
            this.size2Btn.addEventListener("click", () => {
                this.addClass(this.size2Btn, "hideRight");
                this.level = 1;
                this.startGame();

            });

            this.size3Btn = document.createElement("button");
            this.size3Btn.classList.add("button");
            this.size3Btn.innerText = "40 tiles";
            this.self.appendChild(this.size3Btn);
            this.size3Btn.addEventListener("click", () => {
                this.addClass(this.size3Btn, "hideRight");
                this.level = 0;
                this.startGame();

            });
        };

        this.startBtn = document.createElement("button");
        this.startBtn.classList.add("button");
        this.startBtn.innerText = "Start Game"
        this.startBtn.addEventListener("click", () => {

            this.addClass(this.startBtn, "hideRight");

            // Button catedras
            this.catedrasBtn = document.createElement("button");
            this.catedrasBtn.classList.add("button");
            this.catedrasBtn.innerText = "Catedras";
            this.catedrasBtn.addEventListener("click", () => {

                // this.startGame("catedras", this.level);
                this.addClass(this.catedrasBtn, "hideRight");
                this.gameType = "catedras";
                setTimeout(() => {
                    this.removeAllBtns();
                    this.askAboutTiles();
                }, 400);

            });

            // Button faces
            this.facesBtn = document.createElement("button");
            this.facesBtn.classList.add("button");
            this.facesBtn.innerText = "Faces";
            this.facesBtn.addEventListener("click", () => {
                this.addClass(this.facesBtn, "hideRight");
                this.gameType = "faces";
                setTimeout(() => {
                    this.removeAllBtns();
                    this.askAboutTiles();
                }, 400);


            });

            setTimeout(() => {
                this.removeAllBtns();
                // append those buttons
                this.self.appendChild(this.facesBtn);
                this.self.appendChild(this.catedrasBtn);
            }, 400);
        });


        this.statsBtn = document.createElement("button");
        this.statsBtn.classList.add("button");
        this.statsBtn.innerText = "Statistics";
        this.statsBtn.addEventListener("click", () => {
            this.addClass(this.statsBtn, "hideRight");
            setTimeout(() => {
                this.removeAllBtns();
            }, 400);
        });


        document.body.appendChild(this.self);
        this.self.appendChild(this.startBtn);
        this.self.appendChild(this.statsBtn);




    }
}
