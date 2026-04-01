// 1. Добавляем импорт MouseEvent
import { useState, MouseEvent } from 'react';
import TypingText from './TypingText';

// 2. создаем строгий тип - регион может быть ТОЛЬКО 'eu' или 'us'
type Region = 'eu' | 'us';

export default function EmailWidget() {
  // 3. подсказываем стейту наш новый тип Region и boolean
  const [region, setRegion] = useState<Region>('eu');
  const [hasSwitched, setHasSwitched] = useState<boolean>(false);

  // 4. Жестко описываем функцию: newRegion это ТОЛЬКО 'eu' или 'us', a event - это клик по тегу <a>
  const handleSwitch = (newRegion: Region, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setRegion(newRegion);
    setHasSwitched(true);
  };

  const emailText = region === 'eu' ? 'i@v4mp.eu' : 'i@v4mp.us';

	return (
		<li style={{ display: 'flex', alignItems: 'center' }}> 
            <a href="mailto:sirenko.ivan77@gmail.com" id="email-link" style={{ marginRight: '8px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>

                {hasSwitched ? (
                	<span className="type-text">{emailText}</span>
                ) : (
                	<TypingText text={emailText} delay={1800} />
                )}
            </a>

            {/* Заменили inline-стили на умные классы */}
            <span
               	className={`badge ${region === 'eu' ? 'active' : 'inactive'}`}
               	onClick={(e) => handleSwitch('eu', e)}
            >
               	eu
            </span>

            <span
               	className={`badge ${region === 'us' ? 'active' : 'inactive'}`}
               	onClick={(e) => handleSwitch('us', e)}
            >
               	us
            </span>
        </li>       
	);
}