import { useState, useEffect } from 'react';

export default function WakaStats({ onBack }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Твои 3 официальные ссылки (Активность, Языки, Редакторы)
    const urls = [
      'https://wakatime.com/share/@xyp9r/b0c66321-93f5-479d-ac04-d5769a2b925a.json',
      'https://wakatime.com/share/@xyp9r/19d44e2c-bb91-4d1e-bf4b-077f07a014cc.json',
      'https://wakatime.com/share/@xyp9r/25fb8217-5513-40f5-9a94-d7012050c324.json'
    ];

    // Запускаем 3 запроса ОДНОВРЕМЕННО
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(([activityRes, languagesRes, editorsRes]) => {
        
        const activity = activityRes.data;
        const languages = languagesRes.data;
        const editors = editorsRes.data;

        // Считаем общие часы и ищем лучший день из массива активности
        let totalSeconds = 0;
        let bestDay = { date: 'N/A', total_seconds: 0, text: '0 hrs' };

        activity.forEach(day => {
          const sec = day.grand_total.total_seconds;
          totalSeconds += sec;
          if (sec > bestDay.total_seconds) {
            bestDay = {
              date: day.range.date,
              total_seconds: sec,
              text: day.grand_total.text
            };
          }
        });

        // Конвертируем секунды обратно в часы и минуты
        const totalHours = Math.floor(totalSeconds / 3600);
        const totalMins = Math.floor((totalSeconds % 3600) / 60);
        const totalText = `${totalHours} hrs ${totalMins} mins`;
        
        // Считаем среднее время в день
        const dailyAvgSeconds = totalSeconds / (activity.length || 1);
        const avgHours = Math.floor(dailyAvgSeconds / 3600);
        const avgMins = Math.floor((dailyAvgSeconds % 3600) / 60);
        const avgText = `${avgHours} hrs ${avgMins} mins`;

        // Сохраняем всё в состояние
        setStats({
          totalText,
          avgText,
          bestDay,
          languages,
          editors
        });

        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load secure data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '850px' }}>
      <div className="terminal-header" style={{ borderBottom: '1px dashed #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <div className="header-item">
          <span 
            className="prompt" 
            onClick={onBack} 
            style={{ cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.target.style.color = '#fff'}
            onMouseOut={(e) => e.target.style.color = '#4caf50'}
          >
            cd ..
          </span>
          <span style={{ color: '#666', marginLeft: '8px' }}>/wakatime-analytics</span>
        </div>
      </div>
      
      <div className="terminal-body" style={{ padding: '0' }}>
        <h2 style={{ color: '#fff', marginBottom: '25px', fontSize: '16px' }}>
          <span style={{ color: '#4caf50' }}>&gt;</span> weekly coding report <span style={{ color: '#666', fontSize: '12px' }}>(last 7 days)</span>
        </h2>
        
        {loading && (
          <div style={{ color: '#c9c9c9' }}>
            [i] Executing Promise.all() for multi-stream data fetching...<br /><br />
            <span className="typing-cursor">downloading payloads</span>
          </div>
        )}

        {error && (
          <div style={{ color: '#ff5555' }}>
            [ERROR] Connection failed. Data streams interrupted.
          </div>
        )}

        {stats && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* БЛОК 1: Главные цифры */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div className="panel-box" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: '90px' }}>
                <span style={{ color: '#666', fontSize: '12px', marginBottom: '5px' }}>total time</span>
                <span style={{ color: '#4caf50', fontSize: '22px', fontWeight: 'bold' }}>{stats.totalText}</span>
              </div>
              <div className="panel-box" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: '90px' }}>
                <span style={{ color: '#666', fontSize: '12px', marginBottom: '5px' }}>daily average</span>
                <span style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold' }}>{stats.avgText}</span>
              </div>
              <div className="panel-box" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: '90px' }}>
                <span style={{ color: '#666', fontSize: '12px', marginBottom: '5px' }}>best day</span>
                <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>{stats.bestDay.text}</span>
                <span style={{ color: '#4caf50', fontSize: '11px' }}>({stats.bestDay.date})</span>
              </div>
            </div>

            {/* БЛОК 2: Топ языков */}
            <div>
              <h3 style={{ color: '#fff', fontSize: '14px', marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>top languages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {stats.languages.slice(0, 5).map(lang => (
                  <div key={lang.name} style={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                    <span style={{ width: '110px', color: '#c9c9c9', fontWeight: '500' }}>{lang.name}</span>
                    
                    {/* Теперь мы используем оригинальные цвета языков от WakaTime! */}
                    <div style={{ flex: 1, backgroundColor: '#111', height: '6px', borderRadius: '3px', margin: '0 15px', overflow: 'hidden' }}>
                      <div style={{ width: `${lang.percent}%`, backgroundColor: lang.color || '#4caf50', height: '100%', borderRadius: '3px' }}></div>
                    </div>
                    
                    <div style={{ width: '50px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ color: '#888' }}>{lang.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* БЛОК 3: Инструменты */}
            <div style={{ color: '#666', fontSize: '12px', marginTop: '10px', padding: '15px', backgroundColor: '#080808', border: '1px dashed #222', borderRadius: '4px' }}>
              <span style={{ color: '#4caf50' }}>&gt;</span> Editor: <span style={{ color: '#fff' }}>{stats.editors[0]?.name || 'Unknown'}</span> ({stats.editors[0]?.percent || 0}%)
            </div>

          </div>
        )}
      </div>
    </div>
  );
}