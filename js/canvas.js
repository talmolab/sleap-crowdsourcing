const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const topbar = document.getElementById('topbar');

canvas.width = getCanvasDim().xDim;
canvas.height = getCanvasDim().yDim;

console.log(data.img);

class Img {
    constructor(src, ctx) {
        this.img = new Image();
        this.img.src = src;
        this.ctx = ctx;
        this.aspect_ratio = this.img.naturalWidth / this.img.naturalHeight;
    }

    draw(w = this.ctx.canvas.width, h = this.ctx.canvas.height) {
        const vp_apect_ratio = w / h;
        if (vp_apect_ratio > this.aspect_ratio) {
            // Canvas wider than needed
            w = h * this.aspect_ratio;
        } else if (vp_apect_ratio < this.aspect_ratio) {
            // Canvas taller than needed
            h = w / this.aspect_ratio;
        }
        this.ctx.drawImage(this.img, 0, 0, w, h);
    }
}

let img = new Img(data.img, ctx);

addEventListener('resize', () => {
    canvas.width = getCanvasDim().xDim;
    canvas.height = getCanvasDim().yDim;
    img.draw();
});

img.img.addEventListener(
    'load',
    function () {
        img.aspect_ratio = img.img.naturalWidth / img.img.naturalHeight;
        img.draw();
    },
    false
);

function getCanvasDim() {
    const xDim = innerWidth;
    const yDim = innerHeight - topbar.clientHeight;
    return { xDim, yDim };
}
