import { useState } from 'react';
import TypingText from './TypingText';

export default function EmailWidget() {
	// Память компонента - по умолчания стоит Европа
	const [region, setRegion] = useState('eu');
	const [hasSwitched, setHasSwitched] = useState(false);

	// Функция переключения
	const handleSwitch = (newRegion, event) => {
		event.preventDefault(); // Блокируем случайное открытие почты
		setRegion(newRegion);
		setHasSwitched(true);
	};

	// Определяем, какой текст показывать
	const emailText = region === 'eu' ? 'i@v4mp.eu' : 'i@v4mp.us';

	return (
		<li> 
              <a href="mailto:sirenko.ivan77@gmail.com" id="email-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>

                {/* Если еще не кликали — рисуем анимацию печати. Если кликнули — просто моментально меняем текст */}
                {hasSwitched ? (
                	<span className="type-text">{emailText}</span>
                	) : (
                	<TypingText text={emailText} delay={1800} />
                	)}

                <span
               	className="badge"
               	style={{ opacity: region === 'eu' ? 1 : 0.5 }}
               	onClick={(e) => handleSwitch('eu', e)}
               >
               	eu
               </span>

               <span
               	className="badge"
               	style={{ opacity: region === 'us' ? 1 : 0.5 }}
               	onClick={(e) => handleSwitch('us', e)}
               >
               	us
               </span>
            </a>
        </li>       
	);
}