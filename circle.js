var transX = width/2;
var transY = height/2;
var xMouse = mouseX-transX;
var yMouse = mouseY-transY;

var R = 200;
var angle = atan2(mouseY-height/2, mouseX-width/2);
var xAim = cos(angle)*R;
var yAim = sin(angle)*R;
var r = round(sqrt(sq(xAim)+sq(yAim))); //{r² = sin(α)² + cos(α)²} or {h² = c1² + c2²}


var backgroundClr = color(255, 255, 255);
translate(transX, transY);


//BUTTONS
var mouseIsInside = function(x, y, w, h) {
    return (xMouse > x - w/2 && xMouse < x + w/2 && yMouse > y - h/2 && yMouse < y + h/2)?true:false;
};
var Btn = function(n) {
    this.w = 40;
    this.h = 30;
    this.x = -width/2 + this.w/2 + (50*n) + 4;
    this.y = height/2 - this.h/2 - 5;
    this.n = n;
    
    this.enabled = true;
    this.onClick = function() {
        this.enabled = (this.enabled)?false:true;
    };
};
Btn.prototype.draw = function(txt) {
    rectMode(CENTER);
    if (mouseIsInside(this.x, this.y, this.w, this.h)) {
        if (this.enabled) {
            switch(this.n) {
                case 0:
                    fill(223, 143, 255);
                break;
                case 1:
                    fill(150, 197, 255);
                break;
                case 2:
                    fill(255, 255, 148);
                break;
                case 3:
                    fill(255, 150, 150);
                break;
                default:
                    fill(143, 141, 141);
                break;
            }
        } else {
            fill(143, 141, 141);
        }
        if (mouseIsPressed) {
            switch(this.n) {
                case 0:
                    fill(106, 0, 145);
                break;
                case 1:
                    fill(0, 64, 133);
                break;
                case 2:
                    fill(115, 115, 0);
                break;
                case 3:
                    fill(143, 2, 2);
                break;
                default:
                    fill(199, 199, 199);
                break;
            }
        }
    } else {
        if (this.enabled) {
            switch(this.n) {
                case 0:
                    fill(190, 0, 255);
                break;
                case 1:
                    fill(0, 111, 255);
                break;
                case 2:
                    fill(255, 255, 0);
                break;
                case 3:
                    fill(255, 0, 0);
                break;
                default:
                    fill(168, 168, 168);
                break;
            }
        } else {
            fill(199, 199, 199);
        }
    }
    stroke(51, 51, 51);
    strokeWeight(4);
    rect(this.x, this.y, this.w, this.h, 10);
    fill(0, 0, 0);
    textFont(createFont('fantasy'), 17);
    text(txt||'Btn', this.x, this.y);
};
var BTN = [];
var angleBtn = new Btn(0);
var mouseBtn = new Btn(1);
var sincosBtn = new Btn(2);
var rangeBtn = new Btn(3);
BTN.push(angleBtn, mouseBtn, sincosBtn, rangeBtn);


//VISUALS
var drawing = function() {
    stroke(0, 0, 0, 100);
    line(-round(sqrt(sq(xAim)+sq(yAim))), 0, round(sqrt(sq(xAim)+sq(yAim))), 0);
    line(0, -round(sqrt(sq(xAim)+sq(yAim))), 0, round(sqrt(sq(xAim)+sq(yAim))));

    //range
    if (rangeBtn.enabled) {
        stroke(255, 0, 0);
        line(0, 0, xAim, yAim);
        
        noFill();
        stroke(0, 0, 0);
        fill(0, 0, 0);
        noStroke();
        ellipse(xAim, yAim, 5, 5);
    }
    
    //mouse
    if (mouseBtn.enabled) {
        stroke(0, 111, 255);
        line(0, 0, xMouse, yMouse);
    }
    
    //angle
    if (angleBtn.enabled) {
        noFill();
        stroke(190, 0, 255);
        arc(0, 0, 30, 30, -180, angle);
    }
    
    //sin and cos
    if (sincosBtn.enabled) {
        stroke(255, 225, 0);
        for (var i = 0; i < xAim; i+= 10) {
            line(i, yAim, i+3, yAim);
        }
        for (var i = -3; i > xAim; i-= 10) {
            line(i, yAim, i+3, yAim);
        }
    
        for (var i = 0; i < yAim; i+= 10) {
            line(xAim, i, xAim, i+3);
        }
        for (var i = -3; i > yAim; i-= 10) {
            line(xAim, i, xAim, i+3);
        }
        noFill();
        ellipse(0, 0, r*2, r*2);
        fill(0, 0, 0);
        noStroke();
        ellipse(xAim, yAim, 5, 5);
    }
    stroke(0, 0, 0);
    fill(0, 0, 0);
    ellipse(0, 0, 5, 5);
    ellipse(xMouse, yMouse, 5, 5);
};
var texts = function() {
    //mouse
    if (mouseBtn.enabled) {
        fill(0, 111, 255);
        text(round(sqrt(sq(xMouse)+sq(yMouse)))+'px', xMouse/2, yMouse/2 - 2);
    }

    //range
    if (rangeBtn.enabled) {
        fill(255, 0, 0);
        text('1u', xAim/2, yAim/2 -12);
    }
    
    //angle
    if (angleBtn.enabled) {
        fill(190, 0, 255);
        text('α =  '+round(atan2(mouseY-height/2, mouseX-width/2)+180)+'°', -10, -6);
    }
 
    //sin and cos
    if (sincosBtn.enabled) {
        fill(255, 225, 0);
        text('cos = '+round(xAim)/R+'u', xAim/2, yAim - 5);
        text('sin = '+round(yAim)/R+'u', xAim + 25, yAim/2);
    }
};


mouseClicked = function() {
    for (var i = 0; i < BTN.length; i++) {
        if (mouseIsInside(BTN[i].x, BTN[i].y, BTN[i].w, BTN[i].h)) {
            BTN[i].onClick();
        }
    }
    if (yMouse < height/2 -60) {
        //R = round(sqrt(sq(xMouse)+sq(yMouse)));
    }
};
draw = function() {
    angle = atan2(mouseY-height/2, mouseX-width/2);
    xMouse = mouseX-transX;
    yMouse = mouseY-transY;
    xAim = cos(angle)*R;
    yAim = sin(angle)*R;
    r = round(sqrt(sq(xAim)+sq(yAim)));
    
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    background(backgroundClr);
    textFont(createFont("Arial"), 9);
    drawing();
    texts();
    angleBtn.draw('α');
    mouseBtn.draw('m');
    sincosBtn.draw('s/c');
    rangeBtn.draw('r');
};
