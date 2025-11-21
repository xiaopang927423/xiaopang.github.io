// --- 1. 动态背景粒子特效 (Neural Network Effect) ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let w, h, particles;
const particleCount = 80;
const connectionDistance = 150;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5; // 速度
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'; // 青色粒子
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    
    particles.forEach((p, index) => {
        p.update();
        p.draw();

        // 绘制连接线 (Neural Connections)
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                ctx.strokeStyle = `rgba(188, 19, 254, ${1 - dist / connectionDistance})`; // 紫色连线
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();
animate();

// --- 2. 打字机效果 ---
const textElement = document.getElementById('typing-text');
const texts = ["AI Engineer", "LLM Researcher", "Full Stack Developer", "Tech Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // 停顿
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

// --- 3. 滚动显现动画 (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.observer-target').forEach((section) => {
    observer.observe(section);
});