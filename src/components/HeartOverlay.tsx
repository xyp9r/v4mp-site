import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

// 1. описываем контракт для пропсов - onClose - это функция без параметров и возврата
interface HeartOverlayProps {
	onClose: () => void;
}

// 2. Описываем структуру для размеров окна
interface WindowDimensions {
	width: number;
	height: number;
}

// 3. Применяем интерфейс к пропсам компонента
export default function HeartOverlay({ onClose }: HeartOverlayProps) {
	// 4. строго типизируем стейты 
	const [showConfetti, setShowConfetti] = useState<boolean>(false);
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	useEffect(() => {
		const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
		window.addEventListener('resize', handleResize);

		const confettiTimer = setTimeout(() => {
			setShowConfetti(true);
		}, 2000);

		const closeTimer = setTimeout(() => {
			onClose();
		}, 6000);

		return () => {
				window.removeEventListener('resize', handleResize);
				clearTimeout(confettiTimer);
				clearTimeout(closeTimer);
		};
	}, [onClose]);

	return (
			<div className="heart-overlay">
				{/* Рендерим конфети только после того как сердце нарисовалось */}
				{showConfetti && (
					<Confetti 
							width={windowDimensions.width}
							height={windowDimensions.height}
							colors={['#4caf50']}
							numbersOfPieces={300}
							gravity={0.15}
					/>
				)}

				{/* Контейнер с SVG-сердцем */}
			<div className="heart-container">
				{/* Обрати внимание fill:"none", stroke="#4caf50" */}
				<svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-heart">
            <path d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z" 
                  stroke="#4caf50" strokeWidth="0.5" />
              </svg>
			</div>

			</div>
	);
}