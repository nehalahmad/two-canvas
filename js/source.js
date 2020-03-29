/* start - constants */
const INCH_PIX = 10;
/* end - constants */

/* declare global variables */
let two = null;

/* start - door configs */
let doorWidth = 0;
let doorHeight = 0;
let doorArea = null;
/* end - door configs */

/* start - auxiliary lock intance */
const AUXLOCKRADIUS = 5 * 10; // 2"
/* end - auxiliary lock intance */

let onSubmit = (event) => {
  event.preventDefault();
  let doorType = document.forms.doorLock['door-type'].value;
  let doorWidth = document.forms.doorLock['dWidth'].value;
  let doorHeight = document.forms.doorLock['dHeight'].value;

  // validate the door dimensio first
  const {message, isValid} = validateDoorDimensions();
  if (!isValid) {
    alert(message);
    return false;
  }

  // after the validation clear the shapes
  clearDiagrams();

  // convert dimensios into pixles
  doorWidth = convertFeetInchesIntoPix(doorWidth);
  doorHeight = convertFeetInchesIntoPix(doorHeight);

  const domElement = document.getElementById('product');
  two = new Two({width: doorWidth, height: doorHeight, id: "shapeContainer"}).appendTo(domElement);

  let parser = new DOMParser();

  let xmlDoc = parser.parseFromString(xml,"text/xml"); // xml is put into another file xml.js
  if (xmlDoc.getElementsByTagName('ns2:OrderLine')[0].getElementsByTagName("ns2:ProductType")[0].textContent === "Door") {
    let context = document.getElementById('product');
    // let door_type = xmlDoc.getElementsByTagName('ns2:OrderLine')[0].getElementsByTagName("ns2:OrderLineData")[0].getElementsByTagName("ns2:DrFaceType")[0].textContent;
    
    /*let width = parseInt(xmlDoc.getElementsByTagName('ns2:OrderLine')[0].getElementsByTagName("ns2:OrderLineData")[0].getElementsByTagName("ns2:Width")[0].textContent);
    let height = parseInt(xmlDoc.getElementsByTagName('ns2:OrderLine')[0].getElementsByTagName("ns2:OrderLineData")[0].getElementsByTagName("ns2:Height")[0].textContent)*/

    // read door dimensions from the inputs
    switch(doorType) {
        case 'F': renderFDoor({doorWidth, doorHeight});
          break;
        case 'E8': renderE8Door(event, context, height, width);
          break;
        case '2PA': render2PADoor(event, context, doorHeight, doorWidth);
          break;
        case 'loadImage': loadImage(event, context, height, width);
          break;
    }
  }
}

let renderFDoor = ({doorWidth, doorHeight}) => {
  const x = Math.round(doorWidth / 2);
  const y = Math.round(doorHeight / 2);

  doorArea = two.makeRectangle(x, y, doorWidth, doorHeight);
  doorArea.linewidth= 2;
  doorArea.noFill();

  two.update();
};

let renderE8Door = (event, domElement, doorHeight, doorWidth)=>{
    let width = 400, height= 700;
    let newWidth = doorWidth * 10, newHeight = doorHeight * 10;
    // let newWidth = 100, newHeight = 100;
    // let two = new Two({ width, height }).appendTo(domElement);
    let xratio = 1;
    let yratio = 1;
    let x1,x2,y1,y2;
    if(newWidth > width){
        xratio = newWidth/width;
    } else {
        xratio = width/newWidth;
    }
    if(newHeight > height){
        yratio = newHeight/height;
    } else {
        yratio = height/newHeight;
    }

    x1 = 75 * xratio;
    y1 = 150 * yratio;
    x2 = 150 * xratio;
    y2 = 300 * yratio;

    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    /* Door Area */
    let doorArea = two.makeRectangle(x1 , y1, x2, y2);
    doorArea.linewidth= 2;
    doorArea.noFill();
    let x = 45*xratio, y = 37.5*yratio;
    for(let index=0; index<4; index++){
        /* Outer Rectangles */
        
        x1 = x;
        x2 = 40 * xratio;
        y1 = y + (index*65*yratio);
        y2 = 55 * yratio;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let rect1 = two.makeRectangle(x1, y1, x2, y2);
        rect1.linewidth = 2;
        rect1.noFill();
        
        x1 = x+(60*xratio);
        x2 = 40 * xratio;
        y1 = y + (index*65*yratio);
        y2 = 55 * yratio;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let rect2 = two.makeRectangle(x1, y1, x2, y2);
        rect2.linewidth = 2;
        rect2.noFill();
        /* Inner Rectangles */
        
        x1 = x;
        x2 = 30 * xratio;
        y1 = y + (index * 65 * yratio);
        y2 = 45 * yratio;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }
        
        let rect3 = two.makeRectangle(x1 ,y1, x2, y2);
        rect3.linewidth = 2;
        rect3.noFill();
        
        x1 = x+(60*xratio);
        x2 = 30 * xratio;
        y1 = y + (index*65*yratio);
        y2 = 45 * yratio;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }


        let rect4 = two.makeRectangle(x1, y1, x2, y2);
        rect4.linewidth = 2;
        rect4.noFill();

        /* Corner lines */
                
        x1 = x - (40*xratio)/2;
        x2 = x - (30*xratio)/2;
        y1 = (y + (index*65*yratio)) - 55*yratio/2;
        y2 = (y + (index*65*yratio)) - 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let cl1 = two.makeLine(x1, y1, x2, y2);
        cl1.linewidth = 2;
        cl1.noFill();

        x1 = x + (40*xratio)/2;
        y1 = (y + (index*65*yratio)) + 55*yratio/2;
        x2 = x + (30*xratio)/2;
        y2 = (y + (index*65*yratio)) + 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let cl2 = two.makeLine(x1, y1, x2, y2);
        cl2.linewidth = 2;
        cl2.noFill();

        x1 = x - (40*xratio)/2;
        y1 = (y + (index*65*yratio)) + 55*yratio/2;
        x2 = x - (30*xratio)/2;
        y2 = (y + (index*65*yratio)) + 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }


        let cl3 = two.makeLine(x1, y1, x2, y2);
        cl3.linewidth = 2;
        cl3.noFill();

        x1 = x + (40*xratio)/2;
        y1 = (y + (index*65*yratio)) - 55*yratio/2;
        x2 = x + (30*xratio)/2;
        y2 = (y + (index*65*yratio)) - 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let cl4 = two.makeLine(x1, y1, x2, y2);
        cl4.linewidth = 2;
        cl4.noFill();

        x1 = x + (60*xratio) - (40*xratio)/2;
        y1 = (y + (index*65*yratio)) - 55*yratio/2;
        x2 = x + (60*xratio) - (30*xratio)/2;
        y2 = (y + (index*65*yratio)) - 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let cl5 = two.makeLine(x1, y1, x2, y2);
        cl5.linewidth = 2;
        cl5.noFill();

        x1 = x + (60*xratio) + (40*xratio)/2;
        y1 = (y + (index*65*yratio)) + 55*yratio/2;
        x2 = x + (60*xratio) + (30*xratio)/2;
        y2 = (y + (index*65*yratio)) + 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let cl6 = two.makeLine(x1, y1, x2, y2);
        cl6.linewidth = 2;
        cl6.noFill();
        
        x1 = x + (60*xratio) - (40*xratio)/2;
        y1 = (y + (index*65*yratio)) + 55*yratio/2;
        x2 = x + (60*xratio) - (30*xratio)/2;
        y2 = (y + (index*65*yratio)) + 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let cl7 = two.makeLine(x1, y1, x2, y2);
        cl7.linewidth = 2;
        cl7.noFill();
        
        x1 = x + (60*xratio) + (40*xratio)/2;
        y1 = (y + (index*65*yratio)) - 55*yratio/2;
        x2 = x + (60*xratio) + (30*xratio)/2;
        y2 = (y + (index*65*yratio)) - 45*yratio/2;

        if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
            noPreviewAvailable(two, xratio, yratio, event);
            return;
        }

        let cl8 = two.makeLine(x1, y1, x2, y2);
        cl8.linewidth = 2;
        cl8.noFill();
    }
    event.preventDefault();
    two.update();
}

let render2PADoor = (event, domElement, doorHeight, doorWidth) =>{
    let width = 400, height= 700;
    let newWidth = doorWidth, newHeight = doorHeight;
    // let newWidth = 100, newHeight = 100;
    // var two = new Two({ width, height }).appendTo(domElement);
    let xratio = 1;
    let yratio = 1;
    let x1,x2,x3,x4,x5,x6,y1,y2,y3,y4,y5,y6;
    if(newWidth > width){
        xratio = newWidth/width;
    } else {
        xratio = width/newWidth;
    }
    if(newHeight > height){
        yratio = newHeight/height;
    } else {
        yratio = height/newHeight;
    }

    x1 = 87*xratio;
    y1 = 175*yratio;
    x2 = 175*xratio;
    y2 = 350*yratio;
    console.log(x1,y1,x2,y2);

    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    doorArea = two.makeRectangle(x1,y1,x2,y2);
    doorArea.linewidth = 2;
    doorArea.noFill();
    // rectImage.image = img;

    /* Curves */
    x1 = 50*xratio + 10;
    y1 = 15*yratio + 30;
    x2 = 60*xratio + 10;
    y2 = 12.5*yratio + 30;
    x3 = 70*xratio + 10;
    y3 = 11*yratio + 30;
    x4 = 80*xratio + 10;
    y4 = 11*yratio + 30;
    x5 = 90*xratio + 10;
    y5 = 12.5*yratio + 30;
    x6 = 100*xratio + 10;
    y6 = 15*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || x3 > newWidth || x4 > newWidth || x5 > newWidth || x6 > newWidth ||
        y1 > newHeight || y2 > newHeight || y3 > newHeight || y4 > newHeight || y5 > newHeight || y6 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }
    
    var curve = two.makeCurve(x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6, true);
    curve.linewidth = 4;
    curve.scale = 2;
    curve.noFill();
    
    x1 = 55*xratio + 10;
    y1 = 19*yratio + 30;
    x2 = 65*xratio + 10;
    y2 = 16.8*yratio + 30;
    x3 = 75*xratio + 10;
    y3 = 16*yratio + 30;
    x4 = 85*xratio + 10;
    y4 = 16.8*yratio + 30;
    x5 = 95*xratio + 10;
    y5 = 19*yratio + 30;

    if(x1 > newWidth || x2 > newWidth || x3 > newWidth || x4 > newWidth || x5 > newWidth || x6 > newWidth ||
        y1 > newHeight || y2 > newHeight || y3 > newHeight || y4 > newHeight || y5 > newHeight || y6 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }
    var curve1 = two.makeCurve(x1,y1,x2,y2,x3,y3,x4,y4,x5,y5, true);
    curve1.linewidth = 1;
    curve1.scale = 2;
    curve1.noFill();

    x1 = 57.5*xratio + 10;
    y1 = 24.5*yratio + 30;
    x2 = 70*xratio + 10;
    y2 = 22.5*yratio + 30;
    x3 = 80*xratio + 10;
    y3 = 22.5*yratio + 30;
    x4 = 92.5*xratio + 10;
    y4 = 24.5*yratio + 30;

    if(x1 > newWidth || x2 > newWidth || x3 > newWidth || x4 > newWidth || x5 > newWidth || x6 > newWidth ||
        y1 > newHeight || y2 > newHeight || y3 > newHeight || y4 > newHeight || y5 > newHeight || y6 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }
    var curve2 = two.makeCurve(x1,y1,x2,y2,x3,y3,x4,y4, true);
    curve2.linewidth = 2;
    curve2.scale = 2;
    curve2.noFill();
    
    /* Lines */
    x1 = 27*xratio + 10;
    y1 = 15*yratio + 29;
    x2 = 28*xratio + 10;
    y2 = 164*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }
    
    var line = two.makeLine(x1, y1, x2, y2);
    line.linewidth = 8;
    line.stroke = "black";
    
    x1 = 123*xratio + 10;
    y1 = 15*yratio + 29;
    x2 = 122*xratio + 10;
    y2 = 164*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var line1 = two.makeLine(x1, y1, x2, y2);
    line1.linewidth = 8;
    line1.stroke = "black";
    
    x1 = 25*xratio + 10;
    y1 = 161*yratio + 30;
    x2 = 125*xratio + 10;
    y2 = 161*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }
    
    var line3 = two.makeLine(x1, y1, x2, y2);
    line3.linewidth = 8;
    line3.stroke = "black";

    x1 = 33*xratio + 10;
    y1 = 20*yratio + 30;
    x2 = 33*xratio + 10;
    y2 = 156*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var line4 = two.makeLine(x1, y1, x2, y2);
    line4.linewidth = 2;
    line4.stroke = "black";

    x1 = 117*xratio + 10;
    y1 = 18*yratio + 30;
    x2 = 116*xratio + 10;
    y2 = 156*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var line5 = two.makeLine(x1, y1, x2, y2);
    line5.linewidth = 2;
    line5.stroke = "black";

    x1 = 33*xratio + 10.2;
    y1 = 156*yratio + 30;
    x2 = 116*xratio + 11;
    y2 = 156*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var line6 = two.makeLine(x1, y1, x2, y2);
    line6.linewidth = 2;
    line6.stroke = "black";

    x1 = 42*xratio + 10;
    y1 = 24*yratio + 30;
    x2 = 42*xratio + 10;
    y2 = 149*yratio + 29;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var line7 = two.makeLine(x1, y1, x2, y2);
    line7.linewidth = 4;
    line7.stroke = "black";
    
    x1 = 108.5*xratio + 10;
    y1 = 24*yratio + 30;
    x2 = 108.5*xratio + 10;
    y2 = 149*yratio + 29;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var line8 = two.makeLine(x1, y1, x2, y2);
    line8.linewidth = 4;
    line8.stroke = "black";
    
    x1 = 42.5*xratio + 10;
    y1 = 147.5*yratio + 30;
    x2 = 108.5*xratio + 10;
    y2 = 147.5*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var line9 = two.makeLine(x1, y1, x2, y2);
    line9.linewidth = 4;
    line9.stroke = "black";

    /* Corner lines */
    
    x1 = 28*xratio + 10;
    y1 = 16*yratio + 30;
    x2 = 41.5*xratio + 10;
    y2 = 26*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var cl1 = two.makeLine(x1, y1, x2, y2);
    cl1.linewidth = 3;
    cl1.stroke = "black";

    x1 = 122*xratio + 10;
    y1 = 16*yratio + 30;
    x2 = 108.5*xratio + 10;
    y2 = 26*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var cl2 = two.makeLine(x1, y1, x2, y2);
    cl2.linewidth = 3;
    cl2.stroke = "black";

    x1 = 28*xratio + 10;
    y1 = 161*yratio + 30;
    x2 = 42.5*xratio + 10;
    y2 = 147.5*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var cl3 = two.makeLine(x1, y1, x2, y2);
    cl3.linewidth = 3;
    cl3.stroke = "black";

    x1 = 123*xratio + 10;
    y1 = 161*yratio + 30;
    x2 = 108*xratio + 10;
    y2 = 148*yratio + 30;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var cl4 = two.makeLine(x1, y1, x2, y2);
    cl4.linewidth = 3;
    cl4.stroke = "black";

    /* Rectangles */
    x1 = 75*xratio + 10;
    y1 = 235*yratio + 40;
    x2 = 95*xratio;
    y2 = 95*yratio;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var rect = two.makeRectangle(x1, y1, x2, y2);
    rect.linewidth = 8;
    rect.noFill();

    x1 = 75*xratio + 10;
    y1 = 235*yratio + 40;
    x2 = 85*xratio;
    y2 = 85*yratio;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var rect1 = two.makeRectangle(x1, y1, x2, y2);
    rect1.linewidth = 2;
    rect1.noFill();
    
    x1 = 75*xratio + 10;
    y1 = 235*yratio + 40;
    x2 = 68*xratio + 10;
    y2 = 74*yratio;
    
    if(x1 > newWidth || x2 > newWidth || y1 > newHeight || y2 > newHeight){
        noPreviewAvailable(two, xratio, yratio, event);
        return;
    }

    var rect2 = two.makeRectangle(x1, y1, x2, y2);
    rect2.linewidth = 3;
    rect2.noFill();
    
    // two.update();
    // var star = two.makeRectangle(86, 239, 170, 30);
    // var texture = new Two.Texture('./images/RimExitDevice.png')
    
    
    // // Textures fill as patterns on any Two.Path
    // star.fill = texture;
    // star.linewidth = 0;
    // texture.scale = 0.0985;
    event.preventDefault();
    two.update();
    // return two.appendTo(domElement);
}


let noPreviewAvailable = (two, xratio, yratio, event)=>{
    two.clear();
    /* Door Area */
    let doorArea = two.makeRectangle(100,150, 200,300);
    doorArea.linewidth= 2;
    doorArea.noFill();
    var styles = {
        size: 18,
        family: 'Lato',
        color: "#333"
      } 
    var text = two.makeText("No preview available", 100, 150, styles);   
    two.update();
    event.preventDefault();
}

let addHardware = event => {
  event.preventDefault();

  // validate the door dimensio first
  const {message, isValid} = validateLock();
  if (!isValid) {
    alert(message);
    return false;
  }

  // remove previously drawn lock shape
  removeHardwareLock();

  let hardware_type = document.getElementById("selectHW").value;

  switch(hardware_type) {
      case 'RimExitDevice': 
        RimExitDevice();
        break;
      case 'SurfaceVerticalRod': 
        SurfaceVerticalRod();
        break;
      case 'SurfaceVerticalRodwithLBR': 
        SurfaceVerticalRodwithLBR(event, context);
        break;
      case 'ConcealedVerticalRodwithLBR': 
        ConcealedVerticalRodwithLBR(event, context);
        break;
      case 'AuxiliaryLock': 
        DrawAuxiliaryLock();
        break;
  }
}

function validateLock() {
  let {message, isValid} = validateDoorDimensions();

  if (isValid) {
    let hardware_type = document.getElementById("selectHW").value;
    if (!hardware_type) {
      message = "Please select the hardware";
      isValid = false;
    }
  }

  return {message, isValid};
}

function validateSurfaceLockInputs() {
  let message = '';
  let isValid = true;



  return {message, isValid};
}

let RimExitDevice = () => {
  drawRImExitDevice();
};

/**
 * @description: this will create the horizontal rim exit device
 * @param: browser event, top, left gap from the door's edges
 * @return: object having 
 */
function drawRImExitDevice() {
  const {width: doorWidth, height: doorHeight} = doorArea; // instead of reading calculated door width, get it from the rendered door

  let {'surface-vert-b-gap': bGap, 'surface-vert-l-gap': lGap, 'surface-vert-r-gap': rGap} = document.forms.hw;
  lGap = convertInchesIntoPix(lGap.value);
  rGap = convertInchesIntoPix(rGap.value);
  bGap = convertInchesIntoPix(bGap.value);
  // since, canvas is 2D
  // bottom gap will be consider as top gap where top gap = doorHeight - bGap;
  const tGap = doorHeight - bGap;

  const exitDeviceWidth = doorWidth - lGap - rGap; // after margin
  const {smBarGrp, smBarWidth, smBarHeight} = drawSmVertBars({exitDeviceWidth, tGap, lGap});

  /* draw big rect */
  const { hrRim, rimX, rimWidth, rimHeight} = drawHrRim({ two, tGap, lGap, doorWidth, smBarWidth, rGap });

  // draw wings
  const { wingGrp, lowerWing, wingX2, wingX5, wingWidth, wingY2, wingY4 } = drawWings({tGap, rimX, rimWidth, rimHeight, exitDeviceWidth});

  const rimExitDevice = two.makeGroup(smBarGrp, hrRim, wingGrp);

  two.update();
  return {rimExitDevice, wingX2, wingWidth, wingY2, wingY4, exitDeviceWidth};
}

/**
 * 
 * @param {*} param0 
 */
function drawSmVertBars({exitDeviceWidth, tGap, lGap}) {
  const width = Math.round(exitDeviceWidth * 0.026); // 2.6% of of exit device width
  const height = Math.round(exitDeviceWidth * 0.1126); // 11.26% of exit device width
  const centerY = tGap;

  /* draw first rect */
  const centerX = Math.round(lGap + width / 2);
  const firstSmBar = two.makeRectangle(centerX, centerY, width, height);

  /* draw second rect */
  const secSmBar = two.makeRectangle(centerX+width, centerY, width, height);

  const smBarGrp = two.makeGroup(firstSmBar, secSmBar);

  two.update();
  return {smBarGrp, smBarWidth: width, smBarHeight: height};
}

let DrawAuxiliaryLock = () => {
  const {width: doorWidth, height: doorHeight} = doorArea; // instead of reading calculated door width, get it from the rendered door

  let {'auxBGap': bGap, 'auxLGap': lGap } = document.forms.hw;

  const bRadius = Math.round(AUXLOCKRADIUS * (doorWidth / doorHeight));

  lGap = convertInchesIntoPix(lGap.value) + bRadius;
  bGap = convertInchesIntoPix(bGap.value);
  // since, canvas is 2D
  // bottom gap will be consider as top gap where top gap = doorHeight - bGap;
  const tGap = doorHeight - bGap;

  const exitDeviceWidth = doorWidth - lGap; // after margin

  let sRadius = Math.round(bRadius / 4);

  const bCircle = two.makeCircle(lGap, tGap, bRadius);
  const sCircle = two.makeCircle(lGap, tGap, sRadius);

  const keyHole = two.makeRoundedRectangle(lGap, tGap + (sRadius * 0.3), bRadius * 0.2, bRadius * 0.4, 2);
  keyHole.fill = 'grey';

  let auxLockInstance = two.makeGroup(bCircle, sCircle, keyHole);

  two.update();
};

let SurfaceVerticalRod = () => {
  const {width: doorWidth, height: doorHeight} = doorArea;
  const {rimExitDevice, wingX2, wingWidth, wingY2, wingY4, exitDeviceWidth} = drawRImExitDevice();
  // draw upper rod with hatch
  const {uRodGrp, uRodX1, uRodX3, supWidth, supHeight, supX, supY} = drawUpperRod({wingX2, wingWidth, wingY2, exitDeviceWidth, doorWidth});
  // draw lower rod with hatch
  const {lRodGrp} = drawLowerRod({ uRodX1, uRodX3, wingY4, doorHeight, supWidth, supHeight, supX, supY });

  const surfaceVertRod = two.makeGroup(rimExitDevice, uRodGrp, lRodGrp);

  two.update();
};

let SurfaceVerticalRodwithLBR = (event, context)=>{
  let width = 400, height= 700;
    var two = new Two({
      // type: Two.Types.canvas,
      fullscreen: true,
      autostart: true
    }).appendTo(context);
    
    var star = two.makeRectangle(85, 265, 170, 400);
    var texture = new Two.Texture('./images/SurfaceVerticalRodwithLBR.png')
    
    
    // Textures fill as patterns on any Two.Path
    star.fill = texture;
    star.linewidth = 1;
    texture.scale = 0.109;
    
    two.update();
    event.preventDefault();
}

let ConcealedVerticalRodwithLBR = (event, context)=>{
  let width = 400, height= 700;
    var two = new Two({
      // type: Two.Types.canvas,
      fullscreen: true,
      autostart: true
    }).appendTo(context);
    
    var star = two.makeRectangle(85, 265, 170, 400);
    var texture = new Two.Texture('./images/ConcealedVerticalRodwithLBR.png')
    
    
    // Textures fill as patterns on any Two.Path
    star.fill = texture;
    star.linewidth = 1;
    texture.scale = 0.109;
    
    two.update();
    event.preventDefault();
}

/* bind events on document ready */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("door").addEventListener("change", handleDoorTypeChangeHandler);
  document.getElementById("selectHW").addEventListener("change", handeLockChangeHandler);
  document.getElementById("resetForm").addEventListener("click", resetForm);
});

/* start - select box change handlers */
function handleDoorTypeChangeHandler(e) {
  e.preventDefault();

    // TODO: clear the entire shape

    if (e.target.value) {
      hideInputContainers();
      document.getElementById("selectHW").value = '';

      
      // fill the width, height of the door as per selected door fac
      /*
      let doorWidth = 0;
      let doorHeight = 0;
      switch(e.target.value) {
        case 'F':
          doorWidth = 19.5;
          doorHeight = 42;
          break;
        case '2PA':
          doorWidth = 36;
          doorHeight = 84;
          break;
      }

      document.forms.doorLock.dWidth.value = doorWidth;
      document.forms.doorLock.dHeight.value = doorHeight;
      */
    } else {
      document.getElementById('dWidth').value = '';
      document.getElementById('dHeight').value = '';
    }
}

function resetForm(e) {
    clearDiagrams();
    resetFormInputs();
    hideInputContainers();
    document.getElementById("selectHW").value = '';

    e.preventDefault();
}

function clearDiagrams() {
  clearShapes();
  removeShapes();
}

function clearShapes() {
  if (two) {
    two.clear();
  }
}

function removeShapes() {
  if (document.querySelector("#product svg")) {
    document.querySelector("#product svg").remove();
  }
}

function resetFormInputs() {
  document.getElementById("door").value = '';
  document.getElementById('dWidth').value = '';
  document.getElementById('dHeight').value = '';
}

function hideInputContainers() {
  if (document.querySelector(".inputsContainer .inputs-container:not(.hide)")) {
    document.querySelector(".inputsContainer .inputs-container:not(.hide)").classList.add("hide");
  }
}

function removeHardwareLock() {
  if (document.querySelector("#product svg g g")) {
    document.querySelector("#product svg g g").remove()
  }
}

function handeLockChangeHandler(e) {
  e.preventDefault();

  // hide all the inputs container and show the related door inputs container
  hideInputContainers();
  if (document.getElementById(`${e.target.value}Inputs`)) {
    document.getElementById(`${e.target.value}Inputs`).classList.remove('hide');
  }

  const doorType = document.forms.doorLock['door-type'].value;
  const doorWidth = Number(document.forms.doorLock.dWidth.value);
  const doorHeight = Number(document.forms.doorLock.dHeight.value);

  let lPos = 0;
  let tPos = 0;

  if (e.target.value) {
    switch(e.target.value) {
      case "RimExitDevice":
        tPos = 23.5;
        lPos = 1.0;
        break;
      case 'AuxiliaryLock':
        if (doorType === '2PA') {
          tPos = Math.round(doorHeight * 0.28);
          lPos = Math.round(doorWidth * 0.48);
        } else if (doorType === 'F') {
          tPos = Math.round(doorHeight * 0.60);
          lPos = Math.round(doorWidth * 0.90);
        }
        
        break;
      case "SurfaceVerticalRod":
        if (doorType === 'F') {
          tPos = Math.round(doorHeight * 0.48);
          lPos = 1.0;
        } else if (doorType === '2PA') {
          tPos = Math.round(doorHeight * 0.279);
          lPos = 1.0;
        }
        break;
    }
  } else {
    document.getElementById("gapBar").classList.add('hide');
  }

}

/* end - select box change handlers */

function validateDoorDimensions() {
  let doorType = document.forms.doorLock['door-type'].value;
  let doorWidth = document.forms.doorLock['dWidth'].value;
  let doorHeight = document.forms.doorLock['dHeight'].value;

  let message = '';
  let isValid = true;

  if (!doorType) {
    message = "Please select the door type";
    isValid = false;
  } else if (!doorWidth || Number.isNaN(doorWidth)) {
    message = "Please provide the width of the door";
    isValid = false;
  } else  if (!doorHeight || Number.isNaN(doorHeight)) {
    message = "Please provide the height of the door";
    isValid = false;
  }
  
  // validate if door type is 2PA
  /*
  if (doorType === '2PA') {
    if (doorWidth > 40) {
      message = "Door's width should not exceed 40 inches";
      isValid = false;
    } else if (doorHeight > 84) {
      message = "Door's height should not exceed 84 inches";
      isValid = false;
    }
  }
  */

  // validate if door type is F
  /*
  if (doorType === 'F') {
    if (doorWidth > 40 || doorWidth < 19.5) {
      message = "Door's width should be in between 19.5 to 40 inches";
      isValid = false;
    } else if (doorHeight > 70 || doorHeight < 42) {
      message = "Door's height should be in between 42 to 70 inches";
      isValid = false;
    }
  }
  */

  return {message, isValid};
}

