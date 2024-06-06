// script.js
document.addEventListener('DOMContentLoaded', () => {
    const forgiveButton = document.getElementById('forgiveButton');

    forgiveButton.addEventListener('click', function() {
        alert('Thank you for forgiving me');
        document.querySelector('.apology-message h1').textContent = 'Thank You!';
        document.querySelector('.apology-message p').textContent = "I'll ensure this doesn't happen again!";
        this.style.display = 'none';
        createConfetti();
    });

    // Particle background animation
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const colors = ['#ff4081', '#f50057', '#ff80ab', '#ff4081', '#c51162'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Particle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dy = (Math.random() - 0.5) * 2;
        this.dx = (Math.random() - 0.5) * 2;

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        this.update = function() {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            let radius = Math.random() * 3 + 2;
            let x = Math.random() * (canvas.width - radius * 2) + radius;
            let y = Math.random() * (canvas.height - radius * 2) + radius;
            let color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, radius, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
    }

    function createConfetti() {
        const confettiCount = 200;
        const confettiColors = ['#ff4081', '#f50057', '#ff80ab', '#ff4081', '#c51162'];
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                confetti.style.left = `${Math.random() * window.innerWidth}px`;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }, i * 10);
        }
    }

    init();
    animate();

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
});
