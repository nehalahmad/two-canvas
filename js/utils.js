function convertFeetInchesIntoPix(dim) {
  if (dim.indexOf(".")) {
    const values = dim.split(".");
    dim = convertFeetIntoPix(values[0]) + convertInchesIntoPix(values[1]);
  } else {
    dim = convertFeetIntoPix(values[0]);
  }
  return dim;
}

function convertInchesIntoPix(dim) {
  return Number(dim) * 10;
}

function convertFeetIntoInches(dim) {
  return Number(dim) * 12;
}

function convertFeetIntoPix(dim) {
  const dimInches = convertFeetIntoInches(dim);
  return convertInchesIntoPix(dimInches);
}

function drawHrRim({ two, tGap, lGap, doorWidth, smBarWidth, rGap }) {
  const w = Math.round(doorWidth - lGap - smBarWidth * 2 - rGap) - 2;
  const h = Math.round((w * 8.28) / 100); // height is
  const x = Math.round(lGap + smBarWidth * 2 + w / 2) + 1;
  const y = tGap;

  const hrRim = two.makeRectangle(x, y, w, h);
  two.update();
  return { hrRim, rimX: x, rimWidth: w, rimHeight: h };
}

function drawWings({ tGap, rimX, rimWidth, rimHeight, exitDeviceWidth }) {
  const rRimEdge = rimX + rimWidth / 2;

  const x1 = Math.round(rRimEdge - exitDeviceWidth * 0.1026);
  const y1 = Math.round(tGap - rimHeight / 2);

  const x2 = Math.round(rRimEdge - exitDeviceWidth * 0.0744);
  const y2 = Math.round(y1 - exitDeviceWidth * 0.1066);

  const x3 = rRimEdge;
  const y3 = y2;

  const upperWing = two.makePath(x1, y1, x2, y2, x3, y3, true);

  const x4 = rRimEdge;
  const y4 = Math.round(tGap + rimHeight / 2 + exitDeviceWidth * 0.1066);

  const vLine = two.makeLine(x3, y3, x4, y4);

  const x5 = x2;
  const y5 = y4;

  const x6 = x1;
  const y6 = Math.round(tGap + rimHeight / 2);

  const lowerWing = two.makePath(x4, y4, x5, y5, x6, y6, true);

  const wingGrp = two.makeGroup(upperWing, vLine, lowerWing);

  two.update();

  return {
    wingGrp,
    wingX2: x2,
    wingWidth: x3 - x2,
    wingY2: y2,
    wingY4: y4,
    wingX5: x5
  };
}

function drawUpperRod({
  wingX2,
  wingWidth,
  wingY2,
  exitDeviceWidth,
  doorWidth
}) {
  const x1 = Math.round(wingX2 + wingWidth * 0.3243);
  const y1 = wingY2;

  const x2 = x1;
  const y2 = 0;

  const x3 = Math.round(x1 + (exitDeviceWidth * 3.01) / 100);
  const y3 = 0;

  const x4 = x3;
  const y4 = y1;

  const upperRod = two.makePath(x1, y1, x2, y2, x3, y3, x4, y4, true);

  const { upperBarSup, supWidth, supHeight, supX, supY } = drawUpperBarSup({
    uRodX1: x1,
    uRodWidth: (exitDeviceWidth * 3.01) / 100,
    uRodHeight: y4 - y3,
    doorWidth
  });

  const uRodGrp = two.makeGroup(upperRod, upperBarSup);

  two.update();

  return { uRodGrp, uRodX1: x1, uRodX3: x3, supWidth, supHeight, supX, supY };
}

// x2, y2, x3 are points of right base (path)
function drawUpperBarSup({ uRodX1, uRodWidth, uRodHeight, doorWidth }) {
  let w = Math.round(uRodHeight * 0.1272);
  let x = Math.round(uRodX1 + uRodWidth / 2);

  let h = Math.round(uRodHeight * 0.2131);
  let y = Math.round(2 * 10 + h / 2); // top border will be 2" below from the rod's upper border

  let widthDiff = w + x - doorWidth;
  if (widthDiff > 0) {
    w = w - widthDiff * 0.8;
    h = h - widthDiff * 0.8;
  }

  const radius = Math.round(w * 0.2);

  const upperBarSup = two.makeRoundedRectangle(x, y, w, h, radius);

  two.update();

  return { upperBarSup, supWidth: w, supHeight: h, supX: x, supY: y };
}

function drawLowerRod({
  uRodX1,
  uRodX3,
  wingY4,
  doorHeight,
  supWidth,
  supHeight,
  supX,
  supY
}) {
  const x1 = uRodX1;
  const y1 = wingY4;

  const x2 = x1;
  const y2 = doorHeight;

  const x3 = uRodX3;
  const y3 = y2;

  const x4 = x3;
  const y4 = y1;

  const lowerRod = two.makePath(x1, y1, x2, y2, x3, y3, x4, y4, true);

  const lowerBarSup = drawLowerBarSup({
    supWidth,
    supHeight,
    supX,
    doorHeight,
    supY
  });

  const lRodGrp = two.makeGroup(lowerRod, lowerBarSup);

  two.update();

  return { lRodGrp };
}

function drawLowerBarSup({ supWidth, supHeight, supX, doorHeight, supY }) {
  let w = supWidth;
  let x = supX;

  let h = supHeight;
  let y = Math.round(doorHeight - supY); // top border will be 2" below from the rod's upper border

  const radius = Math.round(w * 0.2);

  const lowerBarSup = two.makeRoundedRectangle(x, y, w, h, radius);

  two.update();

  return lowerBarSup;
}
