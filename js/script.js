document.addEventListener("DOMContentLoaded", function (event) {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    let particleArray = [];
    let adjustX = 15;
    let adjustY = 5;
    let colour = "white";
    let context = '/showcase';

    //handle mouse 
    const mouse = {
        x: null,
        y: null,
        raduis: 150
    }
    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    ctx.fillStyle = "white";
    ctx.font = '15px cursive';
    ctx.fillText(context, 0, 30);

    const textCoordinates = ctx.getImageData(0, 0, 100, 100);

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 3;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }
        draw() {
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx ** 2 + dy ** 2);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.raduis;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.raduis) {
                this.x += directionX;
                this.y += directionY;
            }
            else {
                let dx,dy; 

                if (this.x !== this.baseX) {
                    dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
                if (dx,dy > 5) {
                    colour ="rgb(127, 0, 255)";
                } else  {
                    colour = "white";
                }
            }
        }
    }
    class Effect {
        constructor(context, canvasWidth ,canvasHeight){
            this.context = context; 
            this.c.width = canvasWidth; 
            this.c.height = canvasHeight; 
            
        }
    }

    function init() {
        particleArray = [];
        for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                    let positionX = x + adjustX;
                    let positionY = y + adjustY;
                    particleArray.push(new Particle(positionX * 15, positionY * 15));
                }
            }
        }
    }
    init();

    function animate() {
        ctx.clearRect(0, 0, c.width, c.height);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw();
            particleArray[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }
    animate();

    function connect() {
        for (let a = 0; a < particleArray.length; a++) {
            for (let b = a; b < particleArray.length; b++) {
                let dx = particleArray[a].x - particleArray[b].x;
                let dy = particleArray[a].y - particleArray[b].y;

                let distance = Math.sqrt(dx ** 2 + dy ** 2);

                if (distance < 25) {
                    if (dx, dy > 3) {
                        ctx.strokeStyle = "rgb(127, 0, 255)";
                    } else if (dx,dy === 0) {
                        ctx.strokeStyle = "white";
                    }
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particleArray[a].x, particleArray[a].y);
                    ctx.lineTo(particleArray[b].x, particleArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
});
