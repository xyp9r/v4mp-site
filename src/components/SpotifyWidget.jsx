import { useState, useEffect } from 'react';

export default function SpotifyWidget() {
// 1. Создаем память для наших данных
const [trackName, setTrackName] = useState('Loading...');
const [artistName, setArtistName] = useState('awaiting data...');
const [coverUrl, setCoverUrl] = useState('');
// Состояние чтобы понимать прыгает эквалайзер или нет
const [isPlaying, setIsPlaying] = useState(false);

// Добавляем память для ссылки на трек
const [trackUrl, setTrackUrl] = useState(false);

useEffect(() => {
	const LASTFM_USER = 'emotype666';
	const LASTFM_API_KEY = 'a9c821065d7e2331aa538bc700d77e75';

	const fetchSpotifyStatus = async () => {
		try {
			const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`);

			if (!response.ok) throw new Error(`API is down, status: ${response.status}`);

			const data = await response.json();
			const track = data.recenttracks.track[0];

			// Проверям играет ли оно прямо сейчас
			const currentlyPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

			// Обновляем память компонента
			setTrackName(track.name);
			setArtistName(`by ${track.artist['#text']}`);

			// Забираем готовую ссылку из API Last.fm
			setTrackUrl(track.url)

			// Берем обложку хорошего качества (индекс 2)
			if (track.image[2]['#text']) {
				setCoverUrl(track.image[2]['#text']);
			}

			setIsPlaying(currentlyPlaying);

		} catch (error) {
			console.error('Ошибка при загрузке трека:', error);
			setArtistName('offline...')
		}
	};

	// Запускаем сразу при загрузке
	fetchSpotifyStatus();

	// Запускаем проверку статуса каждые 15 секунд
	const intervalId = setInterval(fetchSpotifyStatus, 15000);

	// Убиваем таймер если виджет удалится с экрана
	return () => clearInterval(intervalId);
}, []);

return (
	<div className="status-panel">
		<div className="command-line">
			<span className="prompt">root@v4mp.dev</span>
			<span className="command"> music --now-playing</span>
		</div>

		<div className="panel-box music-clickable-box"
				onClick={() => trackUrl && window.open(trackUrl, '_blank')}
				style={{ cursor: 'pointer' }}
			>
			{/* Вставляем картинки фоном прямо через стили React */}
			<div
				className="album-cover"
				style={coverUrl ? { backgroundImage: `url('${coverUrl}')` } : {}}
			></div>

				<div className="track-info">
					{/* React сам переключит класс в зависимости от того играет ли трек */}
					<div className={`track-name ${isPlaying ? 'is-playing' : 'is-paused'}`}>
						<div className="equalizer">
							<div className="bar bar1"></div>
							<div className="bar bar2"></div>
							<div className="bar bar3"></div>
						</div>
						{trackName}
					</div>
					<div className="track-artist">
						{artistName}
					</div>
				</div>
		</div>
	</div>
	);
}