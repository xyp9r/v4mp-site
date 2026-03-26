import { useState, useEffect } from 'react';

export default function GitStats() {
	const [commitInfo, setCommitInfo] = useState ({ count: '...', message: 'loading...' });
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		// Делаем запрос к публичным событиям моего аккаунта гитхаб
		fetch('https://api.github.com/search/commits?q=author:xyp9r&sort=author-date&order=desc&per_page=1')
		.then(res => res.json())
		.then(data => {
			if (data && data.items && data.items.length > 0) {
				const latestCommit = data.items[0];
				setCommitInfo({
					// data.total_count - покажет все коммиты
					count: data.total_count,
					message: latestCommit.commit.message
				});
			} else {
				setCommitInfo({ count: 0, message: 'no public commits yet' });
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