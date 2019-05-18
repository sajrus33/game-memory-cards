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
            if (this.checked) {
                this.checked = false;
            } else this.checked = true;
            this.canvas.classList.toggle("card");
            setTimeout(() => {
                this.img2.src = this.imgSrc;
                this.img.src = this.imgSrc2;

                const buffor = this.imgSrc;
                this.imgSrc = this.imgSrc2;
                this.imgSrc2 = buffor;
            }, 100);



        };
        // label for remove()
        const check = this.check;


        this.burn = () => {


        };


        this.done = () => {
            this.canvas.removeEventListener("click", check);
            this.checked = false;

            cancelAnimationFrame(this.animation);
            this.ctx.clearRect(0, 0, this.width, this.height);


        };


        this.listen = () => {
            this.check();
        };


        this.init = () => {
            this.load();
            this.render();
            this.canvas.addEventListener("click", check);

        };


        this.render = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(this.img2, 0, 0, this.width, this.height);
            this.animation = requestAnimationFrame(this.render);
        };


        (this.appendTo = (parent = this.parent) => {
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

            this.init();

        })();


    }
}