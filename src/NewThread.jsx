// import { Link } from 'react-router-dom';
import { useState } from 'react'

const NewThread = () => {
  const [inputTitle, setInputTitle] = useState('');

  const handleSubmit = async () => {
    const apiUrl = 'https://railway.bulletinboard.techtrain.dev/threads';

    // payload にデータが入って送信される
    // APIリクエストで送信するデータをまとめたオブジェクト
    const payload = {
      title: inputTitle,
    };

    // APIにPOSTリクエストを送信
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // テキストボックスをクリアする
    setInputTitle('');
    
    // トップページに遷移
    // ページをリロードして遷移
    window.location.href = '/';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>スレッド新規作成</h2>
      {/* スレッド作成フォームや機能をここに追加 */}
      <input
        type="text"
        placeholder="スレッドタイトル"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <br />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="/">Topに戻る</a>
        <button style={{ marginLeft: '10px' }} onClick={ handleSubmit } disabled={ inputTitle.length === 0 } >作成</button>
      </div>
    </div>
  );
};

export default NewThread;