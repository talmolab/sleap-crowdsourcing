const c = document.getElementById('c');
const topbar = document.getElementById('topbar');
const container = document.querySelector('.content-container');
const canvas = initCanvas('c');
const sleapColors = [
    '#0090bd',
    '#d95319',
    '#edb120',
    '#7e2f8e',
    '#77ac30',
    '#4dbeee',
    '#a2142f',
];

setBackground(data.img, canvas);
console.log(canvas.backgroundImage);

window.addEventListener('resize', () => {
    // TODO: Make skeleton resize as well.
    canvas.setWidth(getCanvasDim().xDim);
    canvas.setHeight(getCanvasDim().xDim);
    scaleToFit(canvas.backgroundImage, canvas);
    // canvas.requestRenderAll();
    console.log(canvas.backgroundImage.aspectRatio);
});

class Instance {
    constructor(labeled_nodes, skeleton, color = sleapColors[0]) {
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
            canvas.add(line);

            this.fabric.edges.push(line);
        });
    }

    makeNodes() {
        // Makes all nodes as circles
        this.fabric.nodes = Array();
        Object.keys(this.labeled_nodes).forEach((node) => {
            console.log(`${node}: ${JSON.stringify(this.labeled_nodes[node])}`);
            let c = makeCircle(
                this.labeled_nodes[node].x,
                this.labeled_nodes[node].y,
                this.fabric.color
            );

            canvas.add(c);

            // TODO: Use node to find all dependent edges here OR in edges
            // // Used to set redraw lines if move node.
            // c.lineConnections = lineConnections;

            this.fabric.nodes.push(c);
        });
    }
}

inst_idx = 0;
let instances = Array();
data.instances.forEach((inst) => {
    // Loop through each instance
    console.log(inst);
    console.log(Object.keys(inst.nodes));

    // Create instance of Instance which implements below code
    instances.push(
        new Instance(inst.nodes, inst.skeleton, sleapColors[inst_idx])
    );

    inst_idx += 1;
});

// let line = makeLine([250, 125, 250, 175], 'red'),
//     line2 = makeLine([250, 175, 250, 250]),
//     line3 = makeLine([250, 250, 300, 350]),
//     line4 = makeLine([250, 250, 200, 350]),
//     line5 = makeLine([250, 175, 175, 225], 'blue'),
//     line6 = makeLine([250, 175, 325, 225]);

// canvas.add(line, line2, line3, line4, line5, line6);

// canvas.add(
//     makeCircle(
//         line.get('x1'),
//         line.get('y1'),
//         [getLineObj(line, true)],
//         'yellow'
//     ),
//     makeCircle(
//         line.get('x2'),
//         line.get('y2'),
//         [
//             getLineObj(line, false),
//             getLineObj(line2, true),
//             getLineObj(line5, true),
//             getLineObj(line6, true),
//         ],
//         'yellow'
//     ),
//     makeCircle(
//         line2.get('x2'),
//         line2.get('y2'),
//         [
//             getLineObj(line2, false),
//             getLineObj(line3, true),
//             getLineObj(line4, true),
//         ],
//         'yellow'
//     ),
//     makeCircle(line3.get('x2'), line3.get('y2'), [getLineObj(line3, false)]),
//     makeCircle(line4.get('x2'), line4.get('y2'), [getLineObj(line4, false)]),
//     makeCircle(line5.get('x2'), line5.get('y2'), [getLineObj(line5, false)]),
//     makeCircle(line6.get('x2'), line6.get('y2'), [getLineObj(line6, false)])
// );

// canvas.on('object:moving', function (e) {
//     // TODO: Update data.instances.points.
//     var p = e.target;
//     p.lineConnections.forEach(function (lineConn) {
//         console.log(lineConn.line);
//         if (lineConn.isStart) {
//             lineConn.line.set({ x1: p.left, y1: p.top });
//         } else {
//             lineConn.line.set({ x2: p.left, y2: p.top });
//         }
//     });
//     canvas.renderAll();
// });

function getLineObj(line, isStart) {
    return { line: line, isStart: isStart };
}

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
    fabric.Image.fromURL(url, function (oImg) {
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

function makeCircle(left, top, color = sleapColors[0]) {
    const c = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 3,
        radius: 5,
        fill: 'transparent',
        stroke: color,
    });
    c.originY = c.originX = 'center';
    c.hasControls = c.hasBorders = false;

    // // Used to set redraw lines if move node.
    // c.lineConnections = lineConnections;

    return c;
}

function makeLine(coords, color = sleapColors[0]) {
    const l = new fabric.Line(coords, {
        fill: color,
        stroke: color,
        strokeWidth: 2,
        selectable: false,
        evented: false,
    });
    return l;
}
