export class Card {
    constructor(parent, width, height, imgSrc, imgSrc2, alpha = 1) {
        // CANVAS
        this.canvas = document.createElement("canvas");
        // this.canvas.classList.add("card");
        // CTX
        this.ctx = this.canvas.getContext("2d");
        this.ctx.globalAlpha = alpha;
        this.ctx.imageSmoothingQuality = "high";


        // OWN PROPERTYS
        this.parent = parent;


        this.img = new Image();
        this.imgSrc = imgSrc;
        this.img2 = new Image();
        this.imgSrc2 = imgSrc2;




        this.checked = false;


        this.load = (src = this.imgSrc, src2 = this.imgSrc2) => {
            // new img?
            this.imgSrc = src;
            this.img.src = src;
            // for true img value, for future check() in Game.js
            this.imgTrue = this.img.src;

            // new img?
            this.imgSrc2 = src2;
            this.img2.src = src2;
        };
        this.check = () => {
            console.log("check");
            if (this.checked) {
                this.checked = false;
            } else this.checked = true;
            this.canvas.classList.toggle("card");
            // console.log("checking");
            setTimeout(() => {
                this.img2.src = this.imgSrc;
                this.img.src = this.imgSrc2;

                const buffor = this.imgSrc;
                this.imgSrc = this.imgSrc2;
                this.imgSrc2 = buffor;
                // check

                // console.log("checked");
            }, 90);



        };
        const check = this.check;
        this.burn = () => {


        };

        this.done = () => {
            this.canvas.removeEventListener("click", check);
            this.checked = false;

            cancelAnimationFrame(this.animation);
            this.ctx.clearRect(0, 0, this.width, this.height);

            // this.total += 1;
            // if (this.total == 3) {
            //     this.total = 0;
            //     this.frame += 1;
        };

        this.listen = () => {
            this.check();
            console.log();

        };

        this.init = () => {
            this.load();
            this.render();
            this.canvas.addEventListener("click", check);

        };
        this.appendTo = (parent = this.parent) => {
            // new parent?
            this.parent = parent;
            // append
            this.parent.appendChild(this.canvas);
            // get higher z-index 
            this.canvas.style.zIndex = this.parent.style.zIndex + 1;
            // default style

            this.canvas.style.height = height;
            this.canvas.style.width = width;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.style.backgroundColor = "transparent";
            // this.canvas.style.border = "black 1px solid";

            this.init();

        };

        this.update = () => {
        };
        this.render = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            // console.log(this.img);
            this.ctx.drawImage(this.img2, 0, 0, this.width, this.height)


            this.update();
            this.animation = requestAnimationFrame(this.render);
        };

        this.appendTo();

        // console.log(this.canvas);
    }
}