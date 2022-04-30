// TODO: Import data from backend here - hard-coded for now
const dataDisplay = document.querySelector('p');

data = {
    img: 'images/labeled_frame.png',
    instances: [
        {
            skeleton: {
                edges: [
                    { src: 'thorax', dst: 'head' },
                    { src: 'thorax', dst: 'abdomen' },
                    { src: 'thorax', dst: 'wingL' },
                    { src: 'thorax', dst: 'wingR' },
                    { src: 'thorax', dst: 'forelegL4' },
                    { src: 'thorax', dst: 'forelegR4' },
                    { src: 'thorax', dst: 'midlegL4' },
                    { src: 'thorax', dst: 'midlegR4' },
                    { src: 'thorax', dst: 'hindlegL4' },
                    { src: 'thorax', dst: 'hindlegR4' },
                    { src: 'head', dst: 'eyeL' },
                    { src: 'head', dst: 'eyeR' },
                ],
                nodes: {
                    head: [
                        { edgeIdx: 0, isSrc: false },
                        { edgeIdx: 10, isSrc: true },
                        { edgeIdx: 11, isSrc: true },
                    ],
                    thorax: [
                        { edgeIdx: 0, isSrc: true },
                        { edgeIdx: 1, isSrc: true },
                        { edgeIdx: 2, isSrc: true },
                        { edgeIdx: 3, isSrc: true },
                        { edgeIdx: 4, isSrc: true },
                        { edgeIdx: 5, isSrc: true },
                        { edgeIdx: 6, isSrc: true },
                        { edgeIdx: 7, isSrc: true },
                        { edgeIdx: 8, isSrc: true },
                        { edgeIdx: 9, isSrc: true },
                    ],
                    abdomen: [{ edgeIdx: 1, isSrc: false }],
                    wingL: [{ edgeIdx: 2, isSrc: false }],
                    wingR: [{ edgeIdx: 3, isSrc: false }],
                    forelegL4: [{ edgeIdx: 4, isSrc: false }],
                    forelegR4: [{ edgeIdx: 5, isSrc: false }],
                    midlegL4: [{ edgeIdx: 6, isSrc: false }],
                    midlegR4: [{ edgeIdx: 7, isSrc: false }],
                    hindlegL4: [{ edgeIdx: 8, isSrc: false }],
                    hindlegR4: [{ edgeIdx: 9, isSrc: false }],
                    eyeL: [{ edgeIdx: 10, isSrc: false }],
                    eyeR: [{ edgeIdx: 11, isSrc: false }],
                },
            },
            nodes: {
                head: { x: 176.40384266999257, y: 438.5742921246562 },
                thorax: { x: 210.80239409126597, y: 465.202221243144 },
                abdomen: { x: 248.47259285501727, y: 486.10828004277846 },
                wingL: { x: 257.96362141975095, y: 498.63842697527105 },
                wingR: { x: 259.82220396605766, y: 493.712808991757 },
                forelegL4: { x: 173.22438208532225, y: 458.4358651493851 },
                forelegR4: { x: 190.8917731298152, y: 424.45783179486426 },
                midlegL4: { x: 213.19312622686925, y: 484.7705591005418 },
                midlegR4: { x: 246.3859982339306, y: 441.1701987637514 },
                hindlegL4: { x: 254.92395167924354, y: 487.98749106054856 },
                hindlegR4: { x: 250.997404308765, y: 494.1299499633418 },
                eyeL: { x: 177.74487641706446, y: 454.22438208532225 },
                eyeR: { x: 193.20388775358006, y: 434.73462925119327 },
            },
        },
        {
            skeleton: {
                edges: [
                    { src: 'thorax', dst: 'head' },
                    { src: 'thorax', dst: 'abdomen' },
                    { src: 'thorax', dst: 'wingL' },
                    { src: 'thorax', dst: 'wingR' },
                    { src: 'thorax', dst: 'forelegL4' },
                    { src: 'thorax', dst: 'forelegR4' },
                    { src: 'thorax', dst: 'midlegL4' },
                    { src: 'thorax', dst: 'midlegR4' },
                    { src: 'thorax', dst: 'hindlegL4' },
                    { src: 'thorax', dst: 'hindlegR4' },
                    { src: 'head', dst: 'eyeL' },
                    { src: 'head', dst: 'eyeR' },
                ],
                nodes: {
                    head: [
                        { edgeIdx: 0, isSrc: false },
                        { edgeIdx: 10, isSrc: true },
                        { edgeIdx: 11, isSrc: true },
                    ],
                    thorax: [
                        { edgeIdx: 0, isSrc: true },
                        { edgeIdx: 1, isSrc: true },
                        { edgeIdx: 2, isSrc: true },
                        { edgeIdx: 3, isSrc: true },
                        { edgeIdx: 4, isSrc: true },
                        { edgeIdx: 5, isSrc: true },
                        { edgeIdx: 6, isSrc: true },
                        { edgeIdx: 7, isSrc: true },
                        { edgeIdx: 8, isSrc: true },
                        { edgeIdx: 9, isSrc: true },
                    ],
                    abdomen: [{ edgeIdx: 1, isSrc: false }],
                    wingL: [{ edgeIdx: 2, isSrc: false }],
                    wingR: [{ edgeIdx: 3, isSrc: false }],
                    forelegL4: [{ edgeIdx: 4, isSrc: false }],
                    forelegR4: [{ edgeIdx: 5, isSrc: false }],
                    midlegL4: [{ edgeIdx: 6, isSrc: false }],
                    midlegR4: [{ edgeIdx: 7, isSrc: false }],
                    hindlegL4: [{ edgeIdx: 8, isSrc: false }],
                    hindlegR4: [{ edgeIdx: 9, isSrc: false }],
                    eyeL: [{ edgeIdx: 10, isSrc: false }],
                    eyeR: [{ edgeIdx: 11, isSrc: false }],
                },
            },
            nodes: {
                head: { x: 261.13842697527105, y: 454.06404495878513 },
                thorax: { x: 285.3056902276396, y: 422.81094128625426 },
                abdomen: { x: 303.5678995722103, y: 395.8916957073302 },
                wingL: { x: 315.4595952795406, y: 383.6487090131291 },
                wingR: { x: 310.29741802625836, y: 379.83782274671773 },
                forelegL4: { x: 263.6704494546636, y: 464.53202247939254 },
                forelegR4: { x: 251.23449441344877, y: 450.0640449587851 },
                midlegL4: { x: 296.97306351969377, y: 456.135240772976 },
                midlegR4: { x: 245.5, y: 412.0 },
                hindlegL4: { x: 326.4595952795406, y: 413.2974180262583 },
                hindlegR4: { x: 275.4730635196937, y: 382.33782274671773 },
                eyeL: { x: 276.0640449587851, y: 453.0640449587851 },
                eyeR: { x: 257.85123596702806, y: 439.7448314711496 },
            },
        },
    ],
};

dataDisplay.textContent = JSON.stringify(data);
