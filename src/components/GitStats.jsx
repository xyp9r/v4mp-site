import { useState, useEffect } from 'react';

export default function GitStats() {
	const [commitInfo, setCommitInfo] = useState ({ count: '...', message: 'loading...' });
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		// Делаем запрос к публичным событиям моего аккаунта гитхаб
		fetch('https://api.github.com/users/xyp9r/events/public')
		.then(res => res.json())
		.then(data => {
			// Ищем последнее действие типа "PushEvent"
			const lastPush = data.find(event => 
				event.type === 'PushEvent' &&
				event.payload &&
				event.payload.commits &&
				event.payload.commits.length > 0
			);

			if (lastPush && lastPush.payload.commits.length > 0) {
				// Берем последний коммит из пуша
				const latestCommit = lastPush.payload.commits[lastPush.payload.commits.length - 1];
				setCommitInfo({
					count: lastPush.payload.commits.length, // Число коммитов
					message: latestCommit.message // Текст коммита
				});
			} else {
				setCommitInfo({ count: 0, message: 'no recent commits' });
			}
		})
		.catch(err => {
			console.error("GitHub API error:", err);
			setCommitInfo({ count: 'err', message: 'api error'});
		});
	}, []);

	// Функция для обработки клика по стрелочке
	const toggleExpand = (e) => {
		e.preventDefault(); // Блокируем переход по ссылке
		setIsExpanded(!isExpanded);
	};

	return (
		<span className="status-online-fake" style={{ textTransform: 'none', display: 'flex', flexDirection: 'column' }}>
			<span>
				[commits - {commitInfo.count}]
				<span
				onClick={toggleExpand}
				style={{ cursor: 'pointer', paddingLeft: '6px', color: '#4caf50' }}
			>
				{/* Если открыто — стрелка вниз, если закрыто — вправо */}
				{isExpanded ? '▼' : '▶'}
			</span>
		</span>
		
		{/* Если isExpanded = true, показываем текст коммита */}
		{isExpanded && (
		<span style={{ color: '#888', fontSize: '0.85em', marginTop: '4px', textTransform: 'lowercase' }}>
			└ {commitInfo.message}
		</span>
		)}
	</span>
	);
}