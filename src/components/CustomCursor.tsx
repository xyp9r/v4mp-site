import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
	// 1. Указываем, что указка смотрит строго на <div>
	const cursorRef = useRef<HTMLDivElement>(null);

	// 2. Строго типиризуем переключатель неона
	const [isHovering, setIsHovering] = useState<boolean>(false);

	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

		// 3. Учим функцию понимать, что прилетает именно событие мыши
		const moveCursor = (e: MouseEvent) => {
			// Добавил закрывающую скобку в конце (забыл ее добавить ранее)
			cursor.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;

			const trail = document.createElement('div');
			trail.classList.add('cursor-trail');
			trail.style.left = `${e.clientX - 3}px`;
			trail.style.top = `${e.clientY - 3}px`;

			document.body.appendChild(trail);

			setTimeout(() => {
				trail.remove();
			}, 400);
		};

		// 4. Снова указываем MouseEvent
		const handleMouseOver = (e: MouseEvent) => {
			// Подсказываем TS, что e.target - это HTML-элемент, у которого точно есть функция closest
			if ((e.target as HTMLElement).closest('a, button, .menu-list li, .badge')) {
				setIsHovering(true);
			} else {
				setIsHovering(false);
			}
		};

		window.addEventListener('mousemove', moveCursor);
		document.addEventListener("mouseover", handleMouseOver);

		// 5. тут фикс утечки памяти
		return () => {
			window.removeEventListener('mousemove', moveCursor);
			document.removeEventListener('mouseover', handleMouseOver);
		};
	}, []);

	return (
		<div
				ref={cursorRef}
				className={`v4mp-cursor ${isHovering ? 'neon-pulse' : ''}`}
		/>
	);
}