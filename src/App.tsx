import { useState } from 'react';

import Clock from './components/Clock';
import ViewCounter from './components/ViewCounter';
import Matrix from './components/Matrix';
import TypingText from './components/TypingText';
import CustomCursor from './components/CustomCursor';
import SpotifyWidget from './components/SpotifyWidget';
import WakaTimeWidget from './components/WakaTimeWidget';
import TelegramStatus from './components/TelegramStatus';
import DiscordStatus from './components/DiscordStatus';
import EmailWidget from './components/EmailWidget';
import ContextMenu from './components/ContextMenu';
import Projects from './components/Projects'
import HeartOverlay from './components/HeartOverlay';
import GitStats from './components/GitStats';
import WakaStats from './components/WakaStats';

// Создаем строгий тип для страниц
type PageState = 'home' | 'projects' | 'wakastats';

export default function App() {

  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [isHeartOpen, setIsHeartOpen] = useState<boolean>(false);

  return (
    <>
      <Matrix />

      {/* Если isHeartOpen = true, рендерим оверлей и передаем ему функцию для самозакрытия */}
      {isHeartOpen && <HeartOverlay onClose={() => setIsHeartOpen(false)} />}
      
      {currentPage === 'home' && (
      <div className="terminal-window">
        {/* ШАПКА */}
        <div className="terminal-header">
          <div className="header-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <Clock />
          </div>
          
          <div className="header-item views">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <ViewCounter />
          </div>
        </div>

        <div className="terminal-body">
          {/* ASCII ART */}
          <pre className="ascii-art">
{`▌   ▐▘▜ ▘       ▌    ▌▗             ▗ ▌   ▘       ▘        
▛▌▄▖▜▘▐ ▌█▌▛▘  ▛▌▛▌▛▌ ▜▘  ▛▌█▌█▌▛▌  ▜▘▛▌█▌▌▛▘  ▌▌▌▌▛▌▛▌▛▘  
▙▌  ▐ ▐▖▌▙▖▄▌  ▙▌▙▌▌▌ ▐▖  ▙▌▙▖▙▖▙▌  ▐▖▌▌▙▖▌▌   ▚▚▘▌▌▌▙▌▄▌▗ 
                          ▌     ▌                    ▄▌    `}
          </pre>
          
          <div className="command-line">
            <span className="prompt">root@v4mp.dev</span>{' '} 
            <span className="command"
              onClick={() => setIsHeartOpen(true)}
              style={{ cursor: 'pointer', transition: 'text-shadow 0.3s' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.textShadow = '0 0 8px rgba(76, 175, 80, 0.8)'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.textShadow = 'none'}
            >
              my &lt;3.txt
            </span>
          </div> 
          
          <div className="info-block">
            <div className="image-placeholder">
              <img src="/avatar.png" alt="my profile picture" />
            </div>
            <div className="bio-text">
            b/e dev / staying lowkey. mostly just keeping uptime high tbh.<br />
              <span onClick={() => setCurrentPage('projects')} className="projects-title-link" style={{cursor: 'pointer'}}>projects</span>
            </div>
          </div>

          <div className="command-line mt-40">
            <span className="prompt">root@v4mp.dev</span> <span className="command">./socials.sh</span>
          </div>

          {/* СОЦСЕТИ */}
          <ul className="social-links">
            <li>
              <a href="https://t.me/dxrge" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 48 48" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill="currentColor"></path> </g></svg>
                <TypingText text="md" delay={300} />
                  </a>
                <TelegramStatus />
            </li>

            <li>
              <a href="https://discord.gg/RKdfckR8" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.18 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.085 2.176 2.419 0 1.333-.966 2.419-2.176 2.419zm7.975 0c-1.18 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.085 2.176 2.419 0 1.333-.966 2.419-2.176 2.419z"/>
                </svg>
                <TypingText text="emotype666" delay={800} />
                </a>
              <DiscordStatus />
            </li>

            <li>
              <a href="https://github.com/xyp9r" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <TypingText text="xyp9r" delay={1300} />
                </a>
              <GitStats />
            </li>

            <li>
              <a href="https://www.linkedin.com/in/ivan-sirenko-313825412/" target="_blank" rel="noreferrer">
                <svg fill="currentColor" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 504.4 504.4" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M377.6,0.2H126.4C56.8,0.2,0,57,0,126.6v251.6c0,69.2,56.8,126,126.4,126H378c69.6,0,126.4-56.8,126.4-126.4V126.6 C504,57,447.2,0.2,377.6,0.2z M168,408.2H96v-208h72V408.2z M131.6,168.2c-20.4,0-36.8-16.4-36.8-36.8c0-20.4,16.4-36.8,36.8-36.8 c20.4,0,36.8,16.4,36.8,36.8C168,151.8,151.6,168.2,131.6,168.2z M408.4,408.2H408h-60V307.4c0-24.4-3.2-55.6-36.4-55.6 c-34,0-39.6,26.4-39.6,54v102.4h-60v-208h56v28h1.6c8.8-16,29.2-28.4,61.2-28.4c66,0,77.6,38,77.6,94.4V408.2z"></path> </g> </g> </g></svg>
                <TypingText text="ivan sirenko" delay={1800} />
                </a>
              <span id="linkedin">[work]</span>
            </li>

            <EmailWidget />
          </ul>

          {/* ВИДЖЕТЫ (Spotify & Wakatime) */}
          <div className="status-blocks mt-40">
            <SpotifyWidget />
            {/* Добавляем пропс onOpenStats */}
            <WakaTimeWidget onOpenStats={() => setCurrentPage('wakastats')} />
          </div>
        </div>
      </div>
  )}
        {/* Страница 2: проекты*/}
      {currentPage === 'projects' && (
        <Projects onBack={() => setCurrentPage('home')} />
          )}
      
      {/* Страница 3: вакатайм статистика */}
      {currentPage === 'wakastats' && (
        <WakaStats onBack={() => setCurrentPage('home')} />
          )}

      {/* КАСТОМНОЕ МЕНЮ (скрыто по умолчанию) */}
      <ContextMenu />
      {/* Наш новый живой курсор */}
      <CustomCursor />
    </>
  );
}