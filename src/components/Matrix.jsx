import { useEffect, useRef } from 'react';

export default function Matrix() {
	// 1. Создаем ту самую указку для нашего канваса
	const canvasRef = useRef(null);

	// 2. Вся магия запускается после того как канвас появится на экране
	useEffect(() => {
		const canvas = canvasRef.current; // Берем элемент по указке
		const ctx = canvas.getContext('2d');

		// Функция настройки размеров
		const setCanvasSize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		setCanvasSize();

		const fontSize = 16;
		let column = canvas.width / fontSize;
		let drops = Array(Math.floor(column)).fill(1);

		// Японские символы и цифры из твоего оригинала
		const characters = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		let animationFrameId; // сюда запишем ID анимации чтобы потом ее остановить

		// ---  Новая логика чтобы на больших герцах не было быстро  ---

		let lastTime = 0;
		const fps = 25; // ограничение в 25 кадров
		const nextFrameTime = 1000 / fps;

		const drawMatrix = (currentTime) => {
			animationFrameId = requestAnimationFrame(drawMatrix);

			// считаем, сколько времени прошло с прошлого кадра
			const delta = currentTime - lastTime;

			// Если прошло меньше нужного интервала - пропускаем это
			if (delta < nextFrameTime) return;

			// Если пора рисовать - обновляем время последнего карда
			lastTime = currentTime - (delta % nextFrameTime);
	
			// полупрозрачный фон для эффекта затухания
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#0F0'; // мой фирменный зеленый
			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const text = characters[Math.floor(Math.random() * characters.length)];
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}

		};

		// Зацикливаем анимацию
			animationFrameId = requestAnimationFrame(drawMatrix);

		// Слушатель изменения ока( сделал чуть умнее чтобы капли пересчитывались )
		const handleResize = () => {
			setCanvasSize();
			column = canvas.width / fontSize;
			drops = Array(Math.floor(column)).fill(1);
		};

		window.addEventListener('resize', handleResize);

		// 3. Очистка, если мы уйдем с этой страницы, останавливаем анимацию
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
		};
	}, []) // пустые скобки - запуск один раз при загрузке

	// 4. Отрисосываем сам холст и вешаем на него нашу указку (ref)
	return <canvas id="matrix" ref={canvasRef}></canvas>;
}