import { useEffect, useState } from 'react'
import {Header} from './Header';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewThread from './NewThread';

function App() {
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

  // return (
  //   <html>
  //     <Header />
  //     <div style={{ backgroundColor: 'gray' }}>
  //       {/* スレッド一覧表示 */}
  //       <div style={{ textAlign: 'center' }}>
  //         <h1>新着スレッド</h1>
  //         <ul>
  //         {threads.map((thread) => (
  //           <p key={thread.id}>{thread.title}</p>
  //         ))}
  //         </ul>
  //       </div>
  //     </div>
  //   </html>
  // )

  return (
    <Router>
      <Header />
      <Routes>
        {/* ホームページ（スレッド一覧表示） */}
        <Route
          path="/"
          element={
            <div style={{ backgroundColor: 'gray' }}>
              <div style={{ textAlign: 'center' }}>
                <h1>新着スレッド</h1>
                <ul>
                  {threads.map((thread) => (
                    <p key={thread.id}>{thread.title}</p>
                  ))}
                </ul>
              </div>
            </div>
          }
        />
        {/* 新規スレッド作成ページ */}
        <Route path="/threads/new" element={<NewThread />} />
      </Routes>
    </Router>
  );
}

export default App;
