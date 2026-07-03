import { useState, useEffect } from 'react';

interface WakaTimeWidgetProps {
	onOpenStats: () => void;
}

// Описываем язык
interface WakaLanguage {
	name: string;
}

// Описываем общее время
interface WakaGrandTotal {
	text: string;
}

// Описываем блок data
interface WakaData {
	grand_total: WakaGrandTotal;
	languages: WakaLanguage[]; // Массив языков
}

// Главная обертка ответа
interface WakaResponse {
	data: WakaData;
}

export default function WakaTimeWidget({ onOpenStats }: WakaTimeWidgetProps) {
	// 1. Память компонента
	const [hours, setHours] = useState<string>('Loading...');
	const [langText, setLangText] = useState<string>('awaiting data...');
	const [isActive, setIsActive] = useState<boolean>(false); // Для зеленого неона на иконке

	useEffect(() => {
		// Временное хранилище чтобы склеить Javascript in Sublime Text
		let langCache = '';
		let editorCache = '';

		const updateWakaText = () => {
			if (langCache && editorCache) {
				setLangText(`${langCache} in ${editorCache}`);
			} else if (langCache) {
				setLangText(langCache);
			}
		};

		// 2. Глобальные функции-приемники, которые ждет WakaTime
		(window as any).wakaTimeCallback = (response: any) => {
			try {
				const todayData = response.data[response.data.length - 1];
				const totalTime = todayData.grand_total.text;

				if (totalTime === "0 secs" || !totalTime) {
					setHours("0 secs");
					setLangText("system idle...");
					setIsActive(false);
				} else {
					setHours(totalTime);
					setIsActive(true);
				}
			} catch (error) {
				console.error('Ошибка WakaTime (Time): ', error);
				setHours("offline");
			}
		};

		(window as any).wakaLangCallback = (response: any) => {
			try {
				if (response.data && response.data.length > 0) {
					langCache = response.data.slice(0, 2).map((item: any) => item.name).join(', ');
					updateWakaText();
				}
			} catch (error) {
				console.error('Ошибка WakaTime (Lang): ', error);
			}
		};

		(window as any).wakaEditorCallback = (response: any) => {
			try {
				if (response.data && response.data.length > 0) {
					editorCache = response.data[0].name;
					updateWakaText();
				}
			} catch (error) {
				console.error('Ошибка WakaTime (Editor): ', error);
			}
		};

		// 3. Универсальный курьер (создает скрипты)
		const addJsonpScript = (id: string, url: string, callbackName: string) => {
			const oldScript = document.getElementById(id);
			if (oldScript) oldScript.remove();

			const script = document.createElement('script');
			script.id = id;
			script.src = `${url}?callback=${callbackName}`;
			document.body.appendChild(script);
		};

		const fetchAllWakaData = () => {
			addJsonpScript('waka-time-script', 'https://wakatime.com/share/@xyp9r/b0c66321-93f5-479d-ac04-d5769a2b925a.json', 'wakaTimeCallback');
			addJsonpScript('waka-lang-script', 'https://wakatime.com/share/@xyp9r/19d44e2c-bb91-4d1e-bf4b-077f07a014cc.json', 'wakaLangCallback');
			addJsonpScript('waka-editor-script', 'https://wakatime.com/share/@xyp9r/25fb8217-5513-40f5-9a94-d7012050c324.json', 'wakaEditorCallback');
		};

		// Запускаем при загрузке и ставим таймер на обновление каждую минуту
		fetchAllWakaData();
		const interval = setInterval(fetchAllWakaData, 60000);

		// 4. Уборка (убиваем таймер и удаляем скрипты из HTML)
		return () => {
			clearInterval(interval);
			['waka-time-script', 'waka-lang-script', 'waka-editor-script'].forEach(id => {
				const el = document.getElementById(id);
				if (el) el.remove();
			});
		};
	}, []);

	// 5. Отрисосываем HTML
	return (
		<div 
			className="status-panel"
		>
              <div className="command-line">
                <span className="prompt">root@v4mp.dev</span> <span className="command">wakatime --today</span>
              </div>
              <div className="panel-box wakatime-clickable-box"
              onClick={onOpenStats}
							style={{ cursor: 'pointer' }}
						>
                <div className={`wakatime-icon ${isActive ? 'active-mode' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <div className="wakatime-info">
                  <div className="waka-time">
                    <span className="green-bars">&gt;&gt;</span> <span id="waka-hours">{hours}</span>
                  </div>
                  <div className="waka-lang" id="waka-languages">
                    {langText}
                  </div>
                </div>
              </div>
            </div>
	);
}