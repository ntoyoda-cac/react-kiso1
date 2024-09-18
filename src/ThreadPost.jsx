import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ThreadPost = () => {
  // 呼ばれた際の、動的なルートパラメータ「path="/threads/:thread_id"」のthread_idを取得する。
  const { thread_id } = useParams();
  const location = useLocation();
  const { title } = location.state || {}; // state が存在しない場合に備えてデフォルト値を設定
  // console.log(thread_id);

  // スレッド内ポストを操作するuseState
  const [threadPost,setThreadPost] = useState([]);
  // スレッド内ポストを投稿するuseState
  const [inputPost, setInputPost] = useState('');
  // ローディング状態を管理
  const [isLoading, setIsLoading] = useState(true); 

  // スレッド内ポストを取得コンポーネント
  const fetchThreadsPost = useCallback(async () => {
    try {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads/' + thread_id + '/posts');
      const data = await response.json();
      // データをコンソールに出力して確認
      console.log(data);
      // threadId.posts[id,title]のデータをセット
      setThreadPost(data.posts);
    } catch (error) {
      console.error('データ取得エラー:', error);
    } finally {
      setIsLoading(false);  // データ取得が完了したらローディングを終了
    }
  },[thread_id]) // thread_id を依存関係に追加

  // スレッド内ポスト表示用
  useEffect(() => {
    fetchThreadsPost();
  },[fetchThreadsPost]); // fetchThreadsPost を依存関係に追加

  // スレッド内ポストの追加コンポーネント
  const postSubmit = async () => {
    const apiUrl = 'https://railway.bulletinboard.techtrain.dev/threads/' + thread_id + '/posts';

    // payload にデータが入って送信される
    // APIリクエストで送信するデータをまとめたオブジェクト
    const payload = {
      post: inputPost
    };

    // APIにPOSTリクエストを送信
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), // ボディをJSONに変換して送信
    });

    // テキストボックスをクリアする
    setInputPost('');

    // ページをリロード（JavaScript）
    // window.location.href = '/threads/' + thread_id;
    // window.location.reload();
    // window.location.reload()を使用すると、ページ全体がリロードされるため、現在のReactの状態がすべて失われます。

    // 画面の再レンダリング（Reactらしくリロード）
    fetchThreadsPost();
  }

  // データ取得中はローディング表示
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h2>掲示板スレッド内投稿</h2>
        <h1>{"スレッド名：" + (title ? title : "タイトルがありません")}</h1>
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
          <input
            type="text"
            placeholder="投稿しよう！"
            value={inputPost}
            onChange={(e) => setInputPost(e.target.value)}
          />
          <button style={{ marginLeft: '10px' }} onClick={ postSubmit } disabled={ inputPost.length === 0 }>作成</button>
        </div>
        <ul className="thread-list">
          {threadPost.length > 0 ? (
            threadPost.map((post) => (
              <li key={post.id} className="thread-item">{post.post}</li>
            ))
          ) : (
            <li>スレッドにまだ投稿がありません。投稿してみましょう！</li>
          )}
        </ul>
      </div>
      <a href="/" style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>Topに戻る</a>
    </div>
  );
}

export default ThreadPost;