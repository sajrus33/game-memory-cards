import { Game } from "/public/src/Game.js";
export class Interfejs {
    constructor(game = Game) {
        this.self = document.createElement("div");
        this.self.classList.add("interfejs");

        this.Game = game;
        this.game = undefined;
        this.level = 0;

        this.addClass = (element, clas) => {
            element.classList.add(clas);
        };

        this.startGame = (type, level) => {
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


        this.startBtn = document.createElement("button");
        this.startBtn.classList.add("button");
        this.startBtn.innerText = "Start Game"
        this.startBtn.addEventListener("click", () => {
            this.addClass(this.startBtn, "hideRight");
            setTimeout(() => {
                this.startBtn.remove();
                this.statsBtn.remove();




                // append those buttons
                this.self.appendChild(this.facesBtn);
                this.self.appendChild(this.catedrasBtn);


            }, 400);



            // Button catedras
            this.catedrasBtn = document.createElement("button");
            this.catedrasBtn.classList.add("button");
            this.catedrasBtn.innerText = "Catedras";
            this.catedrasBtn.addEventListener("click", () => {
                this.startGame("catedras", this.level);
                this.addClass(this.catedrasBtn, "hideRight");
            });

            // Button faces
            this.facesBtn = document.createElement("button");
            this.facesBtn.classList.add("button");
            this.facesBtn.innerText = "Faces";
            this.facesBtn.addEventListener("click", () => {
                this.startGame("faces", this.level);
                this.addClass(this.facesBtn, "hideRight");

            });


            // // append those buttons
            // this.self.appendChild(this.facesBtn);
            // this.self.appendChild(this.catedrasBtn);



        });

        this.statsBtn = document.createElement("button");
        this.statsBtn.classList.add("button");
        this.statsBtn.innerText = "Statistics";
        this.statsBtn.addEventListener("click", () => {
            this.addClass(this.statsBtn, "hideRight");
            setTimeout(() => {
                this.startBtn.remove();
                this.statsBtn.remove();
            }, 400);
        });


        document.body.appendChild(this.self);
        this.self.appendChild(this.startBtn);
        this.self.appendChild(this.statsBtn);



    }
}
