import { useState, useEffect } from 'react';

export default function DiscordStatus() {
	// 1. Мапять для текст статуса, его цвета и текущей игры
	const [statusText, setStatusText] = useState('[connecting...]');
	const [statusColor, setStatusColor] = useState('[#555]');
	const [activity, setActivity] = useState(null);

	useEffect(() => {
		const discordId = '547038572302172161'; // Мой уникальный ID

		// 2. Открываем вебсокет-туннель к матрице Lanyard
		const socket = new WebSocket('wss://api.lanyard.rest/socket');

		// 3. Слушаем сообщения из туннеля
		socket.onmessage = (event) => {
			const msg = JSON.parse(event.data);

			// Шаг 1: Сервер просит поздороваться, отправляем ему мой ID
			if (msg.op === 1) {
				socket.send(JSON.stringify({
					op: 2,
					d: { subscribe_to_id: discordId }
				}));
			}

			// Шаг 2: Сервер присылает обновления
			if (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE') {
				const status = msg.d.discord_status;

				// Определяем цвет и текст
				let text = '[offline]';
				let color = '#555';

				if (status === 'online') {
					text = '[online]';
					color = '#4caf50';
				} else if (status === 'idle') {
					text = '[idle]';
					color = '#fbc02d';
				} else if (status === 'dnd') {
					text = '[dnd]';
					color = '#f44336';
				}

				setStatusText(text);
				setStatusColor(color);

				// Проверяем, запущена ли игра (type === 0)
				const activities = msg.d.activities;
				const game = activities.find(a => a.type === 0);

				if (game) {
					setActivity(`playing: ${game.name}`);
				} else {
					setActivity(null);
				}
			}
		};

		// 4. Очистка - закрываем тунель, если уходим с сайта
		return () => socket.close();
	}, []);

	// 5. Отрисосываем HTML
	// Используем пустые теги <> </>, чтобы вернуть два соседний элемента
	return (
		<>
		<span
		id="discord-status"
		className="status-online"
		style={{ color: statusColor, fontWeight: 'normal' }}
		>
			{statusText}
		</span>

		{/* Если activity не пустой, рисуем строчку с игрой */}
		{activity && (
			<div id="discord-activity" className="discord-activity" style={{ display: 'block' }}>
				<span className="green-arrow">▶</span> {activity}
			</div>
			)}
		</>
	);
}