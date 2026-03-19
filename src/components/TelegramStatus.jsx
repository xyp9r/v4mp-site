import { useState, useEffect } from 'react';

export default function TelegramStatus () {
	// 1. Память для текста (на старте connecting...) и для класса (online/offline)
	const [statusText, setStatusText] = useState('[connecting...]');
	const [statusClass, setStatusClass] = useState('offline');

	useEffect(() => {
		// 2. подключаемся к моему живому серверу
		const tgStream = new EventSource('https://tg-api-status.onrender.com/stream');
		
		// 3. Слушаем радио-эфир
		tgStream.onmessage = (event) => {
			const data = JSON.parse(event.data);

			console.log('ОТВЕТ ОТ ТЕЛЕГРАМ СЕРВЕРА:', data);

			if (data.status === 'online') {
				setStatusText('[online]');
				setStatusClass('online');
			} else if (data.status === 'offline') {
				if (data.last_online) {
					setStatusText(`[${data.last_online}]`);
				} else {
					setStatusText('[offline]')
				}
				setStatusText('[offline]');
			} else {
				setStatusText('[unknown]');
				setStatusClass('[offline]');
			}
		};

		// 4. Если сервер спит или ошибка
		tgStream.onerror = () => {
			setStatusText('[connecting...]');
			setStatusClass('offline');
		};

		// 5. Очистка - обрываем связь если виджет исчез с экрана
		return () => {
			tgStream.close();
		};
	}, []);

	// 6. Отрисовываем спан который сам меняет класс и текс
	return (
		<span id="tg-status" className={`status-online ${statusClass}`}>
			{statusText}
		</span>
	);
}