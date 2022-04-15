const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
    "white",
    " rgba(255, 255, 255, 0.3)",
    "rgba(173, 216, 230, 0.8)",
    "rgba(211, 211, 211, 0.8)",
];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// mouse position
let mouse = {
    x: null,
    y: null,
};
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

// create a constructor function for the particle
function Particle(x, y, dx, dy, size, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.colour = colour;
} // end of constructor function

// draw the particle
Particle.prototype.draw = function () {
    ctx.beginPath();
    // circulo
    // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    // cuadrado
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.stroke;
    ctx.stroke();
};

// update the particle
Particle.prototype.update = function () {
    if (this.x + this.size > innerWidth || this.x - this.size < 0) {
        this.dx = -this.dx;
    }
    if (this.y + this.size > innerHeight || this.y - this.size < 0) {
        this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interact with mouse
    if (
        mouse.x - this.x < mouseRadius &&
        mouse.x - this.x > -mouseRadius &&
        mouse.y - this.y < mouseRadius &&
        mouse.y - this.y > -mouseRadius
    ) {
        if (this.size < maxSize) {
            this.size += 3;
        }
    } else if (this.size > minSize) {
        this.size -= 1; //minuto 8.41
    }

    this.draw();
};

// create the particles
function init() {
    particleArray = [];
    for (let i = 0; i < 800; i++) {
        let size = 0;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        let colour = colours[Math.floor(Math.random() * colours.length)];
        particleArray.push(new Particle(x, y, dx, dy, size, colour));
    }
}
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}
init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
// remove mouse position
setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 500);
