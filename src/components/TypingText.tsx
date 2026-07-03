import { useState, useEffect } from 'react';

// 1. КОНТРАКТ
interface TypingTextProps {
	text: string;
	delay: number;
}

export default function TypingText({ text, delay }: TypingTextProps) {
	// 2. Типизуем стейты
	const [displayedText, setDisplayedText] = useState<string>('');
	const [showCursor, setShowCursor] = useState<boolean>(false);

	useEffect(() => {
		// 3. в таймскрипте нужно явно указывать типы для таймеров
		let typeInterval: ReturnType<typeof setInterval>;
		let cursorTimeout: ReturnType<typeof setInterval>;
		let startTimeout: ReturnType<typeof setInterval>;

		const runEffect = () => {
			setDisplayedText(''); // Очищаем текст
			setShowCursor(true); // Включаем курсор
			let i = 0;

			// Ждем нашу задержку перед началом печати
			startTimeout = setTimeout(() => {
				// Запускаем печать каждой буквы с интервалом 200мс
				typeInterval = setInterval(() => {
					if (i < text.length) {
						setDisplayedText(text.slice(0, i + 1));
						i++;
					} else {
						// Когда допечатали выключаем таймер букв
						clearInterval(typeInterval);
						// Убираем курсор через 1 сек
						cursorTimeout = setTimeout(() => setShowCursor(false), 1000);
					}
				}, 200);
			}, delay);
		};

		runEffect(); // Запускаем при запуске
		const loopInterval = setInterval(runEffect, 30000); // повторяем каждые 30 сек

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