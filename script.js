// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
    });
}

function updateToggleIcon(theme) {
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Confetti Effect (Simple JS implementation without external libraries for "no frameworks" rule)
// Only run on Yes page
if (document.getElementById('confetti-canvas')) {
    startConfetti();
}

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const numberOfPieces = 100;
    const colors = ['#ff4d6d', '#ffb3c1', '#ffffff', '#ffd700'];

    function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createPiece() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: randomColor(),
            size: Math.random() * 10 + 5,
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        };
    }

    for (let i = 0; i < numberOfPieces; i++) {
        pieces.push(createPiece());
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach((p, index) => {
            ctx.fillStyle = p.color;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            p.y += p.speed;
            p.rotation += p.rotationSpeed;

            if (p.y > canvas.height) {
                pieces[index] = createPiece(); // Reset to top
            }
        });
        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Sound Effect (Optional - Commented Out)
/*
const soundBtn = document.createElement('button');
soundBtn.innerText = '🔊';
soundBtn.style.position = 'fixed';
soundBtn.style.bottom = '20px';
soundBtn.style.right = '20px';
// ... styles ...
document.body.appendChild(soundBtn);
const audio = new Audio('background_music.mp3');
soundBtn.addEventListener('click', () => {
    if(audio.paused) audio.play();
    else audio.pause();
});
*/
