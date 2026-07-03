import { useState, useEffect } from 'react';

// 1. описываем структуру активности (игры)
interface DiscordActivity {
	type: number;
	name: string;
}

// 2. Описываем данные внутри сообщения
interface DiscordData {
	// статус может быть только одно из этих 4 слов!
	discord_status: 'online' | 'idle' | 'dnd' | 'offline';
	activities: DiscordActivity[];
}

// 3. Само сообщение из туннеля 
interface LanyardMessage {
	op: number;
	t?: string; // Вопросительный знак = поле может прийти, а может и нет
	d?: DiscordData;
}

export default function DiscordStatus() {
	// Типизируем стейты
	const [statusText, setStatusText] = useState<string>('[connecting...]');
	const [statusColor, setStatusColor] = useState<string>('[#555]');
	const [activity, setActivity] = useState<string | null>(null);

	useEffect(() => {
		const discordId = '547038572302172161';
		const socket = new WebSocket('wss://api.lanyard.rest/socket');

		// 5. Укащываем что event - событие сообщения
		socket.onmessage = (event: MessageEvent) => {
			// 6. Подсказываем TS, что мы распарсили именно LanyardMessage
			const msg = JSON.parse(event.data) as LanyardMessage;

			if (msg.op === 1) {
					socket.send(JSON.stringify({
						op: 2,
						d: { subscribe_to_id: discordId }
					}));
			}

			// 7. Обязательно проверяем что msg.d существует, чтобы TS не ругался
			if ((msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE') && msg.d) {
				const status = msg.d.discord_status;

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

				const activities = msg.d.activities;
				// 8. подсказываем TS, что переменная *а* - это наша игра
				const game = activities.find((a: DiscordActivity) => a.type === 0);

				if (game) {
					setActivity(`playing: ${game.name}`);
				} else {
					setActivity(null);
				}
			}
		};
		return () => socket.close();
	}, []);

	return (
		<>
			<span
				id="discord-status"
				className="status-online"
				style={{ color: statusColor, fontWeight: 'normal' }}
			>
				{statusText}
			</span>

			{activity && (
				<div id="discord-activity" className="discord-activity" style={{ display: 'block' }}>
					<span className="green-arrow">▶</span> {activity}
				</div>
			)}
		</>
	);
}