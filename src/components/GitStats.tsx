// Добавляем импорт MouseEvent из React, чтобы описать клик по стрелке
import { useState, useEffect, MouseEvent } from 'react';

// 1. описываем, как выглядит сообщение коммита в API Github
interface GitHubCommitData {
	commit: {
			message: string;
	};
}

// 2. Описываем весь ответ сервера целиком
interface GitHubResponse {
			total_count: number;
			items: GitHubCommitData[];
}

// 3. Создаем строгую форму для памяти
// count может быть числом (цифра коммитов), а может быть строкой ('...', 'err')
interface CommitInfoState {
			count: number | string;
			message: string;
}

export default function GitStats() {
	// 4. Подключаем форму стейта к useState
	const [commitInfo, setCommitInfo] = useState<CommitInfoState>({ count: '...', message: 'loading...'});
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	useEffect(() => {
		fetch('https://api.github.com/search/commits?q=author:xyp9r&sort=author-date&order=desc&per_page=1')
		.then(res => res.json())
		.then(data => {
					// 5. Говорим TS: братан воспринимай эти занные по контракту GitHubResponse
					const response = data as GitHubResponse;

					if (response && response.items && response.items.length > 0) {
								const latestCommit = response.items[0];
								setCommitInfo({
												count: response.total_count,
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

	// 6. строго указываем что е - это клик мышки именно по HTML-тегу <span>
	const toggleExpand = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		e.stopPropagation(); // Добавил этот хак, чтобы клик по стрелке не вызывал клик по родительскому элементу
		setIsExpanded(!isExpanded);
	};

	return (
		<span className="status-online-fake" style={{ textTransform: 'none', display: 'flex', flexDirection: 'column' }}>
			{/* Вешаем onClick на весь этот span и даем ему курсор пальца */}
			<span
				onClick={() => setIsExpanded(!isExpanded)}
				style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
			>
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