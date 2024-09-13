import { useEffect, useState } from 'react'

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
            <p key={thread.id} className="thread-item">{thread.title}</p>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Top;