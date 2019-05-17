import * as utilities from "/game-memory-cards/public/src/utilities.js";
import * as resources from "/game-memory-cards/public/src/resources.js";

import { Card } from "/game-memory-cards/public/src/Card.js";
import { Table } from "/game-memory-cards/public/src/Table.js";
import { myAlert } from "/game-memory-cards/public/src/myAlert.js";

import { Interfejs } from "/game-memory-cards/public/src/Interfejs.js";

console.log({ utilities, myAlert, Card, resources, Table });


export class Game {
    constructor(cardsOption = 1, category = "catedras") {
        this.category = category;
        myAlert(this.category);

        this.cardsOption = cardsOption;
        this.resources = resources;
        this.utilities = utilities;

        this.Interfejs = Interfejs;

        this.gameWrapper = document.createElement("div");
        this.gameWrapper.style.width = "100%";
        this.gameWrapper.style.height = "100%";
        this.gameWrapper.style.minWidth = "320px";
        this.gameWrapper.style.minHeight = "320px";



        this.gameSize = (size) => {
            this.gameWrapper.style.width = size;
            this.gameWrapper.style.height = size;
        };



        document.body.appendChild(this.gameWrapper);

        this.returnBtn = document.createElement("button");
        this.returnBtn.classList.add("returnBtn");
        this.returnBtn.addEventListener("click", () => {
            this.finish();
        });
        this.gameWrapper.appendChild(this.returnBtn);


        this.table = new Table(this.gameWrapper, "100%", "100%", this.resources.imgs[this.category].category, this.resources.imgs[this.category].table);
        this.Card = Card;
        this.cards = [];
        this.cardsChecked = [];
        this.needUncheck = false;
        this.run = false;



        this.uncheckCards = () => {
            this.cards.forEach((card) => {

                if (card.checked) {
                    card.check();
                }
            });
            this.needUncheck = false;
            //stats equalizer 
            this.table.statistics.chance--;
        };

        // eventListener for cards manipulation
        this.result = () => {
            if (!this.run) {
                this.run = true;
                this.table.statistics.timerStart();
            }

            // stats ++
            this.table.statistics.chance++;

            if (this.needUncheck) {
                this.uncheckCards();
            }

            // two cards to compare
            let first, second;

            //with card is checked ?
            this.cards.forEach((card, i) => {
                if (card.checked) {

                    this.cardsChecked.push(card);
                    if (first != undefined) {
                        second = i;
                    } else first = i;
                }
            });

            if (this.cardsChecked.length == 2) {
                // if those two cards are equal
                console.log(this.cardsChecked[1].imgTrue, this.cardsChecked[0].imgTrue);
                if (this.cardsChecked[0].imgTrue == this.cardsChecked[1].imgTrue) {
                    console.log("similar");
                    this.cards[first].done();
                    this.cards[second].done();
                    this.table.statistics.score++;

                    if (this.table.statistics.score == (this.cards.length / 2)) {
                        this.table.statistics.timerStop();
                        // setTimeout(() => {
                        //     this.finish();

                        // }, 5000);
                    }


                } else {
                    this.needUncheck = true;
                    console.log("not similar");
                }
                // anyway
                first = undefined;
                second = undefined;

            }
            this.cardsChecked = [];
        };



        this.preload = () => {
            this.preloader = document.createElement("div");
            this.preloader.classList.add("preloader");
            document.body.appendChild(this.preloader);
        };
        this.preloadEnd = () => {
            this.preloader.remove();
        };



        this.setCards = (y = 0) => {
            for (let i = 0; i < resources.cards.number[y]; i++) {
                this.cards.push(new Card(this.table.cardswrapper, this.resources.cards.width[y], this.resources.cards.height[y], this.resources.imgs[this.category].faces[0], this.resources.imgs[this.category].back));
            }

            // randoms Array
            let randomNumbers = [];
            const max = this.cards.length - 1;

            for (let y = 0; y < 2; y++) {
                for (let i = 0; i <= max / 2; i++) {
                    randomNumbers.push(i);

                }
            }

            // RANDOM CARDS "SHUFFLLE"
            let currentIndex = randomNumbers.length;
            let temporaryValue, randomIndex;

            // While there remain elements to shuffle...                it will wait, cause while is an unethical hacker  :)
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = randomNumbers[currentIndex];
                randomNumbers[currentIndex] = randomNumbers[randomIndex];
                randomNumbers[randomIndex] = temporaryValue;
            }

            console.log(randomNumbers);
            // now update, all random pairs of imgs
            for (let i = 0; i <= max; i++) {
                this.cards[i].load(this.resources.imgs[this.category].faces[randomNumbers[i]]);
                if (i == max) {
                }
            }

        };



        this.finish = () => {
            this.gameWrapper.remove();
            new this.Interfejs();
        };

        this.init = async (cardsOption = this.cardsOption) => {
            this.preload();
            this.table.appendTo();
            await this.setCards(cardsOption);
            this.cards.forEach(card => {
                card.canvas.addEventListener("click", this.result);
                card.check();
                card.check();
            });
            this.preloadEnd();
        };
    }
}


// const game = new Game(1);

// game.init();





