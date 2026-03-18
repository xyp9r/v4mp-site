import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
	const cursorRef = useRef(null);
	// Память для включания неона (когда навели на ссылку)
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

		// Функция движения
		const moveCursor = (e) => {
			// 1. Двигаем главный прицел мометально через стили
			cursor.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0`;

			// 2. Создаем точку шлейфа
			const trail = document.createElement('div');
			trail.classList.add('cursor-trail');
			trail.style.left = `${e.clientX - 3}px`;
			trail.style.top = `${e.clientY - 3}px`;

			document.body.appendChild(trail);

			// 3. удаляем точку через 400мс, когда закончиться CSS-анимация
			setTimeout(() => {
				trail.remove();
			}, 400);
		};

		// Функция проверки - навели ли мы на что-то кликабельное?
		const handleMouseOver = (e) => {
			// Ищем ближайшую ссылку (а), кнопку или элемент меню
			if (e.target.closest('a, button, .menu-list li, .badge')) {
				setIsHovering(true);
			} else {
				setIsHovering(false);
			}
		};

		// Включаем прослушку мыши по всему окну
		window.addEventListener('mousemove', moveCursor);
		document.addEventListener("mouseover", handleMouseOver);

		// Уборка за собой
		return () => {
			window.addEventListener('mousemove', moveCursor);
			document.addEventListener("mouseover", handleMouseOver);
		};
	}, []); // Пустые скобки - вешаем слушатель один раз при загрузке

	return (
		<div
			ref={cursorRef}
			// если IsHovering = true, добавляем класс neon-pulse из моего CSS
			className={`v4mp-cursor ${isHovering ? 'neon-pulse' : ''}`}
			/>
	);
}