import { useState, useEffect } from 'react';

export default function TelegramStatus () {
	const [statusText, setStatusText] = useState('[connecting...]');
	const [statusClass, setStatusClass] = useState('offline');

	useEffect(() => {
		const tgStream = new EventSource('https://tg-api-status.onrender.com/stream');

		tgStream.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('ОТВЕТ ОТ ТЕЛЕГРАМ СЕРВЕРА:', data);

			if (data.status === 'online') {
				setStatusText('[online]');
				setStatusClass('status-online');
			} else if (data.status === 'offline') {
				if (data.last_online) {
					// Исправил синтаксис переменных!
					setStatusText(`[seen: ${data.last_online}]`);
				} else {
					setStatusText('[offline]');
				}
				// Добавил правильный класс для серого цвета
				setStatusClass('offline'); 
			} else {
				setStatusText('[unknown]');
				setStatusClass('offline');
			}
		};

		tgStream.onerror = () => {
			setStatusText('[connecting...]');
			setStatusClass('offline');
		};

		return () => {
			tgStream.close();
		};
	}, []);

	return (
		<span id="tg-status" className={statusClass}>
			{statusText}
		</span>
	);
}