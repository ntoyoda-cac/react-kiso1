import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from './Header';
import './App.css'
import Top from './Top';
import NewThread from './NewThread';

function App() {

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Router>
        <Header />
        {/* 以下の要素がページングされる */}
        <Routes>
          {/* Top画面ページ（スレッド一覧表示）*/}
          <Route path="/" element={<Top />} />
          {/* 新規スレッド作成ページ */}
          <Route path="/threads/new" element={<NewThread />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;