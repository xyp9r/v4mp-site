import { useState, useEffect } from 'react';

	// 1. Описываем самую мелкую матрешку - картинки
	interface LastFmImage {
		'#text': string;
		size: string;
	}

	// 2. Описываем артиста
	interface LastFmArtist {
		'#text': string;
	}

	// 3. Описываем сам трек
	interface LastFmTrack {
		name: string;
		url: string;
		artist: LastFmArtist;
		image: LastFmImage[];
		// Вопросительный знак означает что этого поля может и не быть (если трек на паузе)
		'@attr'?: {
			nowplaying: string;
		};
	}
	// 4. Описываем главную матрешку - весь ответ от сервера
	interface LastFmResponse {
		recenttracks: {
			track: LastFmTrack[];
		};
	}

	export default function SpotifyWidget() {
		// 5. Типизируем стейты как обычно
		const [trackName, setTrackName] = useState<string>('Loading...');
		const [artistName, setArtistName] = useState<string>('awaiting data...');
		const [coverUrl, setCoverUrl] = useState<string>('');
		const [isPlaying, setIsPlaying] = useState<boolean>(false);
		const [trackUrl, setTrackUrl] = useState<string | false>(false);

		useEffect(() => {
			const LASTFM_USER = 'emotype666';
			const LASTFM_API_KEY = 'a9c821065d7e2331aa538bc700d77e75';

			const fetchSpofityStatus = async () => {
				try {
						const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`);

						if (!response.ok) throw new Error(`API is down, status: ${response.status}`);

						// 6. Говорим тайпскрипту - братан расценивай эти данный строго по контраку
						const data = (await response.json()) as LastFmResponse;
						const track = data.recenttracks.track[0];

						const currentlyPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

						setTrackName(track.name);
						setArtistName(`by ${track.artist['#text']}`);
						setTrackUrl(track.url);

						if (track.image[2]['#text']) {
							setCoverUrl(track.image[2]['#text']);
						}

						// currentlyPlaying может быть undefined, поэтому на всякий случай страхуем
						setIsPlaying(currentlyPlaying || false);
				} catch (error) {
						console.error('Ошибка при загрузке трека:', error);
						setArtistName('offline...');
				}
			};

			fetchSpofityStatus();
			const intervalId = setInterval(fetchSpofityStatus, 15000);

			return () => clearInterval(intervalId);
		}, []);

		return (
	<div className="status-panel">
		<div className="command-line">
			<span className="prompt">root@v4mp.dev</span>
			<span className="command"> music --now-playing</span>
		</div>

		<div className="panel-box music-clickable-box"
				onClick={() => trackUrl && window.open(trackUrl as string, '_blank')}
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