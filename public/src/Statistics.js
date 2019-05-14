export class Statistics {
    constructor(parent = document.body, width, height, imgSrc, alpha = 1, color = "white") {
        //      CANVAS
        this.canvas = document.createElement("canvas");
        this.canvas.style.height = height;
        this.canvas.style.width = width;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0%";
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.backgroundSize = "100% 100%";
        this.canvas.style.backgroundRepeat = "no-repeat";


        //      CTX
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingQuality = "high";
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'bottom';


        //      OWN PROPERTYS
        this.parent = parent;
        this.x = this.canvas.width;
        this.y = Math.round(this.canvas.height / 2 * 1.1);
        // time position
        this.timeLeft = Math.round(this.x * .15);
        this.timeRight = Math.round(this.x * .25);
        // score position
        this.scoreLeft = Math.round(this.x * .45);
        this.scoreRight = Math.round(this.x * .5);
        //chances position
        this.chanceLeft = Math.round(this.x * .8);
        this.chanceRight = Math.round(this.x * .9);

        // timer resources
        this.ms = "00";
        this.min = "00";
        this.sec = "00";

        this.interval = undefined;
        this.score = 0;
        this.chance = 0;

        this.img = new Image();
        this.imgSrc = imgSrc;


        this.load = (src = this.imgSrc) => {
            // new img?
            this.imgSrc = src;
            this.img.src = src;
            this.canvas.style.backgroundImage = "url(" + this.imgSrc + ")";

        };

        // appendTo()
        this.appendTo = (parent = this.parent) => {
            // new parent?
            this.parent = parent;
            // append with div
            this.parent.appendChild(this.canvas);
            // append statistic menu


            // CTX display table background
            this.load();
            this.render();

        };

        this.timerStart = () => {
            this.interval = setInterval(() => {
                this.sec++;
            }, 100);
        };
        this.timerStop = () => {
            clearInterval(this.interval);
        };

        this.update = () => {


            // this.ms = -Math.abs(this.ms);

            // this.ms = Math.abs(this.ms);

            // this.sec = Math.floor((this.ms) / 100);
            // console.log(Math.abs(this.ms - this.date.getMinutes()));
            this.min = Math.floor(this.sec / 60);
            if (this.min < 10) {
                this.min = "0" + this.min;
            }
            this.sec = this.sec % 60;
            if (this.sec < 10) {
                this.sec = "0" + this.sec;
            }

        };

        this.render = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            // this.ctx.drawImage(this.img, 0, 0, this.x, this.canvas.height);
            this.ctx.font = "22px Courier";
            this.ctx.fillText("" + this.score, this.timeLeft, this.y, this.timeRight);
            this.ctx.font = "17px Courier";
            this.ctx.fillText("" + this.min + ":" + this.sec, this.scoreLeft, this.y);
            this.ctx.font = "22px Courier";
            this.ctx.fillText("" + this.chance, this.chanceLeft, this.y, this.chanceRight);

            this.update();
            requestAnimationFrame(this.render);
        };



        console.log(this.canvas);
    }
}