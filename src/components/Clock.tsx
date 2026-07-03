import { useState, useEffect } from 'react';

export default function Clock() {
	// 1. Создаем переменную состояния (память), где будет желать текст времени
	const [timeText, setTimeText] = useState<string>('00:00:00 (Europe/Warsaw) |');

	// 2. useEffect запускается один раз при появлении часов на экране
	useEffect(() => {
		// моя родная функция из script.js
		const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Warsaw',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      // Обновляем память компонента
      setTimeText(`${formatter.format(now)} (Europe/Warsaw) |`);
	};

	updateClock();
	const timer = setInterval(updateClock, 1000); // Заводим таймер

	// 3. Очистка - если часы исчезну с экрана, мы убиваем таймер, чтобы он не жрал память
	return () => clearInterval(timer);
}, []);

	// 4. Отрисовываем HTML, вставляя туда нашу переменную
	return <span id="clock">{timeText}</span>
}	