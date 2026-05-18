document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('plexusCanvas');

    if (!canvas) {
        console.error("Холст #plexusCanvas не найден!");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Настройки Plexus-эффекта
    const config = {
        pointCount: 150,
        maxDistance: 150,
        pointSize: 2,
        lineWidth: 0.5,
        colors: {
            points: 'rgba(255, 255, 255, 0.8)',
            lines: 'rgba(200, 200, 200, 0.3)'
        },
        cursorAttraction: 80 // Увеличил радиус притяжения для лучшей видимости реакции
    };

    let points = [];
    let mouseX = -1000;
    let mouseY = -1000;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initPoints();
    }

    function initPoints() {
        points = [];
        for (let i = 0; i < config.pointCount; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    function updatePoints() {
        // Обновляем позиции точек
        points.forEach(point => {
            // Движение точек
            point.x += point.vx;
            point.y += point.vy;

            // Отскок от границ
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

            // Притяжение к курсору
            const dx = mouseX - point.x;
            const dy = mouseY - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.cursorAttraction) {
                const force = (config.cursorAttraction - distance) / config.cursorAttraction;
                point.x -= dx * force * 0.03; // Увеличил коэффициент для заметности
                point.y -= dy * force * 0.03;
            }
        });
    }

    function drawPlexus() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем линии между близкими точками
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const p1 = points[i];
                const p2 = points[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.maxDistance) {
                    ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = config.colors.lines;
            ctx.lineWidth = config.lineWidth;
            ctx.stroke();
        }
            }
        }

        // Рисуем точки
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, config.pointSize, 0, Math.PI * 2);
            ctx.fillStyle = config.colors.points;
            ctx.fill();
        });
    }

    function animate() {
        updatePoints();
        drawPlexus();
        requestAnimationFrame(animate);
    }

    // Обработчики событий — теперь вешаем на document для надёжности
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    });

    // Инициализация
    resizeCanvas();
    animate();

    console.log("Plexus-эффект активирован и реагирует на курсор!");
});
