import { useState } from 'react'
import {Header} from './Header';
import './App.css'

function App() {
  const [threads, setThreads] = useState([]);

  const fetchThreads = async () => {
    // fetch('https://railway.bulletinboard.techtrain.dev/threads')
    //   .then(res => res.json())
    //   .then(data => setThreads(data.message));
    const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads');
    const data = await response.json();
    // データをコンソールに出力して確認
    console.log(data);
    // id,titleどちらも格納
    setThreads(data);
  }

  return (
    <html>
      <Header />
      <h1>新着スレッド</h1>
      <button onClick={fetchThreads}>Get</button>
      {/* スレッド一覧表示 */}
      <div className="body">
        <ul>
        {threads.map((thread) => (
          <p key={thread.id}>{thread.id} {thread.title}</p>
        ))}
        </ul>
      </div>
    </html>
  )
}

export default App;
