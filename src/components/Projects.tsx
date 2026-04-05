// Добавляем MouseEvent для типизации клика
import { MouseEvent } from 'react';

// 1. Описываем контракт для пропсов (параметров) нашего компонента
interface ProjectsProps {
  // onBack - это функция, которая принимает событие клика по тегу <span> и ничего не возвращает (void)
  onBack: (e: MouseEvent<HTMLSpanElement>) => void;
}

// 2. Указываем, что компонент принимает аргументы по правилам ProjectsProps
export default function Projects({ onBack }: ProjectsProps) {
  return (
      <div className="container">
        <div className="command-line" style={{ marginBottom: '30px' }}>
          <span className="prompt">root@v4mp.dev</span> <span className="command">cd ..</span><br />
          <span
            onClick={onBack}
            style={{ color: '#4caf50', fontSize: '14px', marginTop: '10px', display: 'inline-block', cursor: 'pointer' }}
          >
            [ &lt; return to main]
          </span> 
        </div>

        <div className="bio-text" style={{ marginBottom: '20px', textAlign: 'left' }}>
          &gt; ls -la /projects/<br />
          total 5
        </div>

      {/* 1. НОВЫЙ ПРОЕКТ - REACT ВЕРСИЯ */}
      <div className="project-card">
        <div className="project-header">
          <a href="https://v4mp.dev" className="project-name">v4mp v2 (React)</a>
          <span className="project-year">2026</span>
        </div>
        <div className="project-desc">interactive web-terminal SPA</div>
        <div className="project-tags">
          <span className="tag">React</span>
          <span className="tag">TypeScript</span>
          <span className="tag">CSS3</span>
          <span className="tag">Vite</span>
          <span className="tag">Telegram API</span>
          <span className="tag">GitHub API</span>
          <span className="tag">Spotify API</span>
          <span className="tag">SoundCloud API</span>
          <span className="tag">CounterAPI</span>
          <span className="tag">Discord Lanyard API</span>
          <span className="tag">Wakatime API</span>
          <span className="tag">Render CI/CD</span>
        </div>
      </div>

      {/* 3. OSINT BOT */}
      <div className="project-card">
        <div className="project-header">
          <a href="https://t.me/id561bot" target="_blank" rel="noreferrer" className="project-name"> OSINT Telegram Bot</a>
          <span className="project-year">2026</span>
        </div>
        <div className="project-desc">helpful bot with osint tools</div>
        <div className="project-tags">
          <span className="tag">Node.js</span>
          <span className="tag">JavaScript (ES6)</span>
          <span className="tag">Telegram API</span>
          <span className="tag">REST API</span>
          <span className="tag">Render CI/CD</span>
          <span className="tag">IP-API</span>
          <span className="tag">GitHub API</span>
          <span className="tag">Reddit API</span>
          <span className="tag">URL Scanner</span>
          <span className="tag">WHOIS Domain</span>
          <span className="tag">Crypto Tracker</span>
          <span className="tag">OSINT Catalog</span>
          <span className="tag">Data Breach</span>
          <span className="tag">EXIF Metadata</span>
        </div>
      </div>

            {/* 2. СТАРЫЙ DASHBOARD ИЗ HTML */}
      <div className="project-card">
        <div className="project-header">
          <a href="https://xyp9r.github.io/my-links-site/" target="_blank" rel="noreferrer" className="project-name">v4mp v1 (Vanilla JS)</a>
          <span className="project-year">2026</span>
        </div>
        <div className="project-desc">old version on my site</div>
        <div className="project-tags">
          <span className="tag">JavaScript (ES6)</span>
          <span className="tag">CSS3</span>
          <span className="tag">HTML5</span>
          <span className="tag">Telegram API</span>
          <span className="tag">Spotify API</span>
          <span className="tag">SoundCloud API</span>
          <span className="tag">Discord Lanyard API</span>
          <span className="tag">Wakatime API</span>
          <span className="tag">Render CI/CD</span>
        </div>
      </div>

      {/* 4. ИГРА КЛИКЕР */}
      <div className="project-card">
        <div className="project-header">
          <a href="https://xyp9r.github.io/crypto-clicker/" target="_blank" rel="noreferrer" className="project-name">Crypto Clicker Tycoon</a>
          <span className="project-year">2026</span>
        </div>
        <div className="project-desc">browser-based economic tycoon game</div>
        <div className="project-tags">
          <span className="tag">JavaScript (ES6)</span>
          <span className="tag">CSS3</span>
          <span className="tag">HTML5</span>
          <span className="tag">GitHub CI/CD</span>
        </div>
      </div>

      {/* 5. ПОРТФОЛИО */}
      <div className="project-card">
        <div className="project-header">
          <a href="https://xyp9r.github.io/my-first-site/index.html" target="_blank" rel="noreferrer" className="project-name">First Site</a>
          <span className="project-year">2026</span>
        </div>
        <div className="project-desc">first try to make a site</div>
        <div className="project-tags">
          <span className="tag">JavaScript (ES6)</span>
          <span className="tag">CSS3</span>
          <span className="tag">HTML5</span>
          <span className="tag">GitHub CI/CD</span>
        </div>
      </div>

    </div>
  );
}