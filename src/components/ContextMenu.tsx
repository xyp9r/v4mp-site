import { useState, useEffect, useRef} from 'react';

// 1. Описываем контракт для координат нашего меню
interface MenuPosition {
	x: number;
	y: number;
}

export default function ContextMenu () {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// 2. Подключаем наш интерфейс к стейту координат
	const [position, setPosition] = useState<MenuPosition>({ x: 0, y: 0 });
	const [hasSelection, setHasSelection] = useState<boolean>(false);
	// 3. Указываем что указка будет смотреть на <div>
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// 4. Подказываем что 'e' это глобальное событие мыши в браузере
		const handleContextMenu = (e: globalThis.MouseEvent) => {
			e.preventDefault();

			// Добавил знак вопроса на случай если getSelection() вернет пустоту
			const selectedText = window.getSelection()?.toString().trim() || '';
			setHasSelection(selectedText.length > 0);

			let x = e.clientX;
			let y = e.clientY;

			if (x + 150 > window.innerWidth) x = window.innerWidth - 155;
			if (y + 120 > window.innerHeight) y = window.innerHeight - 125;

			setIsOpen(true);
			setPosition({ x, y });
		};

		const handleClick = (e: globalThis.MouseEvent) => {

			// 1. проверяем - если клик был внутри нашего меню, мы ничего не делаем
			// (e.target as Node - подсказываем TS, что мы кликнули именно по HTML-узлу)

			if (menuRef.current && menuRef.current.contains(e.target as Node)) {
				return;
			}
			// 2. а если мимо - закрываем
			if (e.button !== 2) {
				setIsOpen(false);
			} 
		};

		// 5. Показываем что тут событие клавиатуры
		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		window.addEventListener('contextmenu', handleContextMenu);
		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('contextmenu', handleContextMenu);
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	// Логика кнопок

	const handleCopy = () => {
		const text = window.getSelection()?.toString();
		if (text) {
			navigator.clipboard.writeText(text);
		}
		setIsOpen(false);
	};

	const handleSelectAll = () => {
		// Хоть execCommand устаревает но я его оставляю чтобы не ломать логику
		document.execCommand('selectAll');
		setIsOpen(false);
	};

	const handleReload = () => {
		window.location.reload();
	};

	if (!isOpen) return null;

	return (
			<div
				ref={menuRef}
				id="custom-menu"
				className="custom-menu"
				style={{
					display: 'block',
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
        <div className="menu-footer">
                        ESC | Close
        </div>
			</div>
	);
}