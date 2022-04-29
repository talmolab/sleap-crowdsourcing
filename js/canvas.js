const c = document.getElementById('c');
const topbar = document.getElementById('topbar');
const container = document.querySelector('.content-container');
const canvas = initCanvas('c');

setBackground(data.img, canvas);
console.log(canvas.backgroundImage);

window.addEventListener('resize', () => {
    canvas.setWidth(getCanvasDim().xDim);
    canvas.setHeight(getCanvasDim().xDim);
    scaleToFit(canvas.backgroundImage, canvas);
    // canvas.requestRenderAll();
    console.log(canvas.backgroundImage.aspectRatio);
});

function initCanvas(id) {
    const canvas = new fabric.Canvas('c', {
        width: getCanvasDim().xDim,
        height: getCanvasDim().yDim,
    });
    // canvas.requestRenderAll();
    return canvas;
}

function setBackground(url, oCanvas) {
    // FIXME: Does not scaleToFit properly
    fabric.Image.fromURL(data.img, function (oImg) {
        oCanvas.backgroundImage = oImg;
        scaleToFit(oCanvas.backgroundImage, oCanvas);
        oCanvas.backgroundImage.aspectRatio =
            oCanvas.backgroundImage.width / oCanvas.backgroundImage.height;
        oCanvas.requestRenderAll();
    });
}

function getCanvasDim() {
    const xDim = container.clientWidth;
    const yDim = (innerHeight - topbar.clientHeight) * 0.75;
    return { xDim, yDim };
}

function scaleToFit(img, canvas) {
    const canvasAspectRatio = canvas.width / canvas.height;
    if (canvasAspectRatio > img.aspectRatio) {
        // Container is wider than needed
        img.scaleToHeight(canvas.height);
    } else {
        // Container is taller than needed
        img.scaleToWidth(canvas.width);
    }
}
