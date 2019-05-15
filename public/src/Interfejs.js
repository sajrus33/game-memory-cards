import { Game } from "/memoryCards/public/src/Game.js";
export class Interfejs {
    constructor(game = Game) {
        this.self = document.createElement("div");
        this.self.classList.add("interfejs");

        this.Game = game;
        this.game = undefined;

        this.startBtn = document.createElement("button");
        this.startBtn.classList.add("button");
        this.startBtn.innerText = "Start Game"
        this.startBtn.addEventListener("click", () => {
            this.startBtn.remove();
            this.statsBtn.remove();


            this.catedrasBtn = document.createElement("button");
            this.catedrasBtn.classList.add("button");
            this.catedrasBtn.innerText = "Catedras";
            this.catedrasBtn.addEventListener("click", () => {
                this.self.remove();

                this.game = new this.Game(1, "catedras");
                this.game.init();
                this.resize();

            });


            this.facesBtn = document.createElement("button");
            this.facesBtn.classList.add("button");
            this.facesBtn.innerText = "Faces";
            this.facesBtn.addEventListener("click", () => {
                this.self.remove();

                this.game = new this.Game(1, "faces");
                this.game.init();
                this.resize();
            });

            this.resize = () => {

                if (this.game) {
                    const width = innerWidth;
                    if (width >= 1024) {
                        // seeing future "game" name -> instead of trying bind somehow

                        this.game.gameSize("80%");
                    } else {
                        this.game.gameSize("100%");
                    }
                }

            }

            // margin on big screen
            window.addEventListener("resize", this.resize);

            this.self.appendChild(this.facesBtn);
            this.self.appendChild(this.catedrasBtn);



        });

        this.statsBtn = document.createElement("button");
        this.statsBtn.classList.add("button");
        this.statsBtn.innerText = "Statistics";
        this.statsBtn.addEventListener("click", () => {
            this.startBtn.remove();
            this.statsBtn.remove();
        });


        document.body.appendChild(this.self);
        this.self.appendChild(this.startBtn);
        this.self.appendChild(this.statsBtn);



    }
}
