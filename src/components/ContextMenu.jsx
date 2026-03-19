import { useState, useEffect, useRef } from 'react';

export default function ContextMenu () {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [hasSelection, setHasSelection] = useState(false);
	const menuRef = useRef(null);

	useEffect(()=> {
		// Открываем меню по правому клику
		const handleContextMenu = (e) => {
			e.preventDefault(); // Убиваем уродливое страндартное меню браузера

			// 1. проверяем есть ли выделенный текст на странице
			const selectedText = window.getSelection().toString().trim();
			setHasSelection(selectedText.length > 0);

			// 2. Рассчитываем координаты чтобы меню за вылазило за края
			let x = e.clientX;
			let y = e.clientY;

			// приблезительный размеры меню (150х120) чтобы не уходило за рамки
			if (x + 150 > window.innerWidth) x = window.innerWidth - 155;
			if (y + 120 > window.innerHeight) y = window.innerHeight - 125;

			setIsOpen(true);
			setPosition({ x, y });
		};

		// Закрываем меню по левому клику куда угодно
		const handleClick = (e) => {
			if (e.button !== 2) {
				setIsOpen(false)
			}
		};

		// Закрываем по ESC
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		// Вешаем слушатели на всё окно
	window.addEventListener('contextmenu', handleContextMenu);
	window.addEventListener('click',handleClick);
	window.addEventListener('keydown', handleKeyDown);

	return () => {
		window.addEventListener('contextmenu', handleContextMenu);
		window.addEventListener('click',handleClick);
		window.addEventListener('keydown', handleKeyDown);
		};
	}, []);

	// Логика кнопок 
	const handleCopy = () => {
		// Копируем именно выделенный текст
		const text = window.getSelection().toString();
		if (text) {
			navigator.clipboard.writeText(text);
		}
		setIsOpen(false);
	};

	const handleSelectAll = () => {
		// Выделяем всю страницу
		document.execCommand('selectAll');
		setIsOpen(false);
	};

	const handleReload = () => {
		window.location.reload();
	};

	// Если меню закрыто - вообще не рендерим его в HTML
	if (!isOpen) return null;

	return (
		<div
			ref={menuRef}
			id="custom-menu"
			className="custom-menu"
			style={{
				display: 'block', // Принудительно показываем
				left: `${position.x}px`,
				top: `${position.y}px`
			}}
			>
				
		<div className="menu-header">
          <span className="prompt">root@v4mp.dev</span> :~$ context-menu 
        </div>

        <ul className="menu-list">
        	{/* Если текст не выделен, вешаем твой класс disabled-item */}
        	<li 
        		id="menu-copy"
        		onClick={hasSelection ? handleCopy : undefined}
        		className={!hasSelection ? 'disabled-item' : ''}
        		style={!hasSelection ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        	>
        		<span className="green-arrow">▶</span> Copy
        	</li>
        	<li id="menu-select-all" onClick={handleSelectAll}>
        		<span className="green-arrow">▶</span> Select All
        	</li>
        	<li id="menu-reload" onClick={handleReload}>
        		<span className="green-arrow">▶</span> Reload
        	</li>
        </ul>
        <div class="menu-footer">
                        ESC | Close
        </div>
	</div>
	);
}