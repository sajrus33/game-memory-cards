import { Statistics } from "/public/src/Statistics.js";
console.log(Statistics);
export class Table {
  constructor(parent = document.body, width, height, imgSrc, imgSrc2) {
    //      DIV
    this.div = document.createElement("div");
    this.width = width;
    this.height = height;

    this.div.style.width = this.width;
    this.div.style.height = this.height;
    this.div.style.position = "relative";

    //      CANVAS
    this.canvas = document.createElement("div");
    this.canvas.classList.add("table");
    this.canvas.style.height = "80%";
    this.canvas.style.width = "100%";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "20%";
    this.canvas.style.backgroundImage = "url('" + imgSrc + "')";
    console.log("url('" + imgSrc + "')");

    //      CTX
    // this.ctx = this.canvas.getContext("2d");
    // this.ctx.globalAlpha = alpha;
    // this.ctx.imageSmoothingQuality = "high";

    //      OWN PROPERTYS
    this.parent = parent;
    this.img = new Image();
    this.imgSrc = imgSrc;
    this.img2 = new Image();
    this.imgSrc2 = imgSrc2; //for statistics

    // statistics -> append before in div        !!!! imgSrc2 !!!!
    this.statistics = new Statistics(this.div, "100%", "20%", this.imgSrc2);
    this.statistics.appendTo();

    // cards wrapper -> append after statics
    this.cardswrapper = document.createElement("div");
    this.cardswrapper.style.width = "100%";
    this.cardswrapper.style.height = "80%";
    this.cardswrapper.style.position = "absolute";
    this.cardswrapper.style.top = "20%";

    // this.cardswrapper.style.backgroundColor = "transparent";

    // load() images
    this.load = (src = this.imgSrc, src2 = this.imgSrc2) => {
      // new img?
      this.imgSrc = src;
      this.img.src = src;
      this.imgSrc2 = src2;
      this.img2.src = src2;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      // statistics
    };

    // appendTo() construct DOM
    this.appendTo = (parent = this.parent) => {
      // new parent?
      this.parent = parent;
      // append with div
      this.parent.appendChild(this.div);
      this.div.appendChild(this.canvas);
      this.div.appendChild(this.cardswrapper);

      // append statistic menu

      // CTX display table background
      this.load();
      this.render();
    };
    this.update = () => {};
    this.render = () => {
      // this.ctx.clearRect(0, 0, this.width, this.height);
      // this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
      // this.update();
      // requestAnimationFrame(this.render);
    };

    console.log(this.canvas);
  }
}
