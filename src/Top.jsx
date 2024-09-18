import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Top = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads');
      const data = await response.json();
      // データをコンソールに出力して確認
      console.log(data);
      // id,titleどちらも格納
      setThreads(data);
    }
    console.count('effect');
    fetchThreads();
  },[]);

  return(
    <div>
      <div style={{ textAlign: 'center' }}>
        <h2>新着スレッド</h2>
        <ul className="thread-list">
          {threads.map((thread) => (
            <li key={thread.id} className="thread-item">
              <Link to={`/threads/${thread.id}`} state={{ title: thread.title }}>{thread.title}</Link>
              {/* ↓遷移先にデータを渡す方法↓ */}
              {/* 1.URLにくっつける, 2.useLocation(), 3.Redux, 4.Jotaiライブラリ */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Top;