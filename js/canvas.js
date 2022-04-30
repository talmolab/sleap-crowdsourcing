const topbar = document.getElementById('topbar');
const container = document.querySelector('.content-container');
const c = document.getElementById('c');

const canvas = initCanvas('c');
canvas.setWidth(getCanvasDim().xDim);
canvas.setHeight(getCanvasDim().xDim);

let fabricObjects = { lines: Array(), circles: Array() };
let scaleFactor = 1;

const sleapColors = [
    '#0090bd',
    '#d95319',
    '#edb120',
    '#7e2f8e',
    '#77ac30',
    '#4dbeee',
    '#a2142f',
];

class Instance {
    constructor(inst_id, labeled_nodes, skeleton, color = sleapColors[0]) {
        (this.inst_id = inst_id),
            (this.labeled_nodes = labeled_nodes),
            (this.skeleton = skeleton),
            (this.fabric = {
                color: color,
            }),
            this.makeEdges(),
            this.makeNodes();
    }

    makeEdges() {
        // Makes all edges as lines.
        this.fabric.edges = Array();
        this.skeleton.edges.forEach((edge) => {
            // FIXME: Add check whether node is labeled.
            let coords = [
                this.labeled_nodes[edge.src].x,
                this.labeled_nodes[edge.src].y,
                this.labeled_nodes[edge.dst].x,
                this.labeled_nodes[edge.dst].y,
            ];
            let line = makeLine(coords, this.fabric.color);

            // TODO: Use Fabric.Group for scale/rotation operations
            canvas.add(line);
            // fabricGroup.add(line);
            // fabricGroup.item(1).set('top', 176.40384266999257);

            this.fabric.edges.push(line);
        });
    }

    // TODO: Add labels for nodes and attach to position of node.
    makeNodes() {
        // Makes all nodes as circles
        this.fabric.nodes = Array();
        Object.keys(this.labeled_nodes).forEach((node) => {
            let c = makeCircle(
                this.labeled_nodes[node].x,
                this.labeled_nodes[node].y,
                this.fabric.color
            );

            // TODO: Use Fabric.Group for scale/rotation operations
            // fabricGroup.add(c);
            canvas.add(c);

            c.node = node;
            // TODO: Is there a way we can inherit inst_id from parent?
            c.inst_id = this.inst_id;

            // Used to set redraw lines if move node.
            c.lineConnections = Array();
            this.skeleton.nodes[node].forEach((lineConn) => {
                let fabricEdge = this.fabric.edges[lineConn.edgeIdx];
                lineConn = getLineObj(fabricEdge, lineConn.isSrc);
                c.lineConnections.push(lineConn);
            });

            this.fabric.nodes.push(c);
        });
    }
}

drawScene(data.img, canvas);

window.addEventListener('resize', () => {
    canvas.setWidth(getCanvasDim().xDim);
    canvas.setHeight(getCanvasDim().yDim);
    scaleToFit(canvas.backgroundImage, canvas, fabricObjects);
    // canvas.requestRenderAll();
});

canvas.on('object:moving', function (e) {
    // Update position of edges when moving nodes.
    let p = e.target;
    redrawLines(p);
    // canvas.renderAll();

    // Update the unscaled data points..
    p.unscaledX = p.left / scaleFactor;
    p.unscaledY = p.top / scaleFactor;

    // Update node in data
    let dataNode = data.instances[p.inst_id].nodes[p.node];
    dataNode.x = p.unscaledX;
    dataNode.y = p.unscaledY;

    // Update display of data on screen.
    dataDisplay.textContent = JSON.stringify(data);
});

function getLineObj(line, isSrc) {
    return { line: line, isSrc: isSrc };
}

function initCanvas(id) {
    const canvas = new fabric.Canvas('c', {
        width: getCanvasDim().xDim,
        height: getCanvasDim().yDim,
    });
    // canvas.requestRenderAll();
    return canvas;
}

function drawData() {
    inst_idx = 0;
    let instances = Array();
    data.instances.forEach((inst) => {
        // Draw data on canvas
        instances.push(
            new Instance(
                inst_idx,
                inst.nodes,
                inst.skeleton,
                sleapColors[inst_idx]
            )
        );

        inst_idx += 1;
    });
    return instances;
}

function drawScene(imgUrl, oCanvas) {
    // TODO: Clear canvas before loading new image
    // Reset fabric objects
    fabricObjects = { lines: Array(), circles: Array() };

    // Set background image and draw data points
    fabric.Image.fromURL(imgUrl, function (oImg) {
        oCanvas.backgroundImage = oImg;
        // TODO?: Use Fabric.Group for scale/rotation operations
        // fabricGroup = new fabric.Group([oCanvas.backgroundImage], {
        //     left: 0,
        //     top: 0,
        // });

        drawData();
        // canvas.add(fabricGroup);

        scaleToFit(oCanvas.backgroundImage, oCanvas, fabricObjects);
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

function scaleToFit(
    img,
    canvas,
    objectsToScale = { lines: Array(), circles: Array() }
) {
    const canvasAspectRatio = canvas.width / canvas.height;
    linesToScale = objectsToScale.lines;
    circlesToScale = objectsToScale.circles;

    if (canvasAspectRatio > img.aspectRatio) {
        // Container is wider than needed
        img.scaleToHeight(canvas.height);
    } else {
        // Container is taller than needed
        img.scaleToWidth(canvas.width);
    }

    // Get scaling factor from img
    scaleFactor = img.getObjectScaling().scaleX;

    // Rescale and reposition circles
    scaleCircles(circlesToScale, scaleFactor);
}

function scaleCircles(circles = Array(), scale = scaleFactor) {
    // Rescale and reposition circles
    let i = 0;
    circlesToScale.forEach((circle) => {
        circle.scale(scale);
        circle.set({
            left: circle.unscaledX * scale,
            top: circle.unscaledY * scale,
        });
        circle.setCoords();

        redrawLines(circle);
    });
}

function redrawLines(circle) {
    // Redraw lines to match with circles.
    circle.lineConnections.forEach(function (lineConn) {
        if (lineConn.isSrc) {
            lineConn.line.set({ x1: circle.left, y1: circle.top });
        } else {
            lineConn.line.set({ x2: circle.left, y2: circle.top });
        }
    });
}

function makeCircle(left, top, color = sleapColors[0]) {
    // Create Fabric.Circle object, does not add to canvas.
    const c = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 3,
        radius: 5,
        fill: 'transparent',
        stroke: color,
        centeredScaling: false,
    });

    // Used for scaling
    c.unscaledX = c.left;
    c.unscaledY = c.top;
    c.originY = c.originX = 'center';
    c.hasControls = c.hasBorders = false;

    fabricObjects['circles'].push(c);

    return c;
}

function makeLine(coords, color = sleapColors[0]) {
    // Create Fabric.Line object, does not add to canvas.
    const l = new fabric.Line(coords, {
        fill: color,
        stroke: color,
        strokeWidth: 2,
        selectable: false,
        evented: false,
    });

    fabricObjects['lines'].push(l);

    return l;
}
