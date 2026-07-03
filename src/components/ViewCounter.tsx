import { useState, useEffect } from 'react';

export default function ViewCounter() {
	// Гововим ТS - тут либо строка либо число
	const [views, setViews] = useState<string | number>('...');

	useEffect(() => {
		const fetchViews = async () => {
			try {
					const response = await fetch('https://api.counterapi.dev/v1/xyp9r-terminal/visits/up');
					const data = await response.json();

					if (data.count) {
						setViews(data.count);
					}
			} catch (error) {
				console.error('Ошибка счетчика:', error);
				setViews('sys error');
			}
		};

		fetchViews();
	}, []);

	return <span id="view-count">{views}</span>
}