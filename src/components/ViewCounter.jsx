import { useState, useEffect } from 'react';

export default function VievCounter() {
	// 1. Память компонента (на старте показываем троеточие)
	const [views, setViews] = useState('...');

	// 2. useEffect срабатывает ровно один раз при загрузке сайта бтв скобки пустые в конце
	useEffect(() => {
		// Создаем функцию запроса
		const fetchViews = async () => {
			try {
				const response = await fetch('https://api.counterapi.dev/v1/xyp9r-terminal/visits/up');
				const data = await response.json();

				if (data.count) {
					setViews(data.count); // Сохраняем цифру в память
				}
			} catch (error) {
				console.error('Ошибка счетчика: ', error);
				setViews('sys error'); // Если API упадет, покажем стильную заглушку
			}
		};

		// Запускаем ее
		fetchViews();
	}, []);

	// 3. Отрисовываем html
	return <span id="view-count">{views}</span>
}