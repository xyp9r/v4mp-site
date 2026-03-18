import { useState, useEffect } from 'react';

// Компонент принимает два *пропса* - сам текст и задержку перед стартом
export default function TypingText({ text, delay }) {
	const [displayedText, setDisplayedText] = useState('');
	const [showCursor, setShowCursor] = useState(false);

	useEffect(() => {
		let typeInterval;
		let cursorTimeout;
		let startTimeout;

		const runEffect = () => {
			setDisplayedText(''); // Очищаем текст
			setShowCursor(true); // включаем курсор
			let i = 0;

			// Ждем нашу задержку перед началом печати
			startTimeout = setTimeout(() => {
				// Запускаем печать каждой буквы с интервалом 200мс
				typeInterval = setInterval(() => {
					if (i < text.length) {
						setDisplayedText(text.slice(0, i + 1));
						i++;
					} else {
						// когда допечатали - выключаем таймер букв
						clearInterval(typeInterval);
						// Убираем курсор через 1 секунду
						cursorTimeout = setTimeout(() => setShowCursor(false), 1000);
					}
				}, 200);
			}, delay);
		};

		runEffect(); // Запускаем при загрузке
		const loopInterval = setInterval(runEffect, 30000); // Повторяем каждые 30 сек

		// Очистка таймеров
		return () => {
			clearTimeout(startTimeout);
			clearInterval(typeInterval);
			clearTimeout(cursorTimeout);
			clearInterval(loopInterval);
		};
	}, [text, delay]);

	return (
		<span className={`type-text ${showCursor ? 'typing-cursor' : ''}`}>
			{displayedText}
		</span>
	);
}