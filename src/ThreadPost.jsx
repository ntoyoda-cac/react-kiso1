import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ThreadPost = () => {
  // 呼ばれた際の、動的なルートパラメータ「path="/threads/:thread_id"」のthread_idを取得する。
  const { thread_id } = useParams();
  console.log(thread_id);

  // スレッド内ポストを操作するuseState
  const [threadPost,setThreadPost] = useState([]);

  // ローディング状態
  const [isLoading, setIsLoading] = useState(true); 

  // スレッド内ポストを投稿するuseState
  const [inputPost, setInputPost] = useState('');

  // ポスト表示用
  useEffect(() => {
    const fetchThreadsPost = async () => {
      try {
        const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads/' + thread_id + '/posts');
        const data = await response.json();
        // データをコンソールに出力して確認
        console.log(data);
        // threadId,posts[id,title]を格納
        // データをセット
        setThreadPost(data.posts);
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        setIsLoading(false);  // データ取得が完了したらローディングを終了
      }
    }
    fetchThreadsPost();
  },[thread_id]);

  // ポスト追加用
  const postSubmit = async () => {
    const apiUrl = 'https://railway.bulletinboard.techtrain.dev/threads/' + thread_id + '/posts';

    // payload にデータが入って送信される
    // APIリクエストで送信するデータをまとめたオブジェクト
    const payload = {
      threadId: thread_id,
      post: inputPost,
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

    // ページをリロード
    // window.location.href = '/threads/' + thread_id;
    window.location.reload();
  }

  if (isLoading) {
    return <p>Loading...</p>;  // データ取得中はローディング表示
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h2>掲示板スレッド内投稿</h2>
        <p>スレッドタイトル： </p>
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
            <li>スレッドに投稿がありません。</li>
          )}
        </ul>
      </div>
      <a href="/" style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>Topに戻る</a>
    </div>
  );
}

export default ThreadPost;

/*
{
  "threadId":"2a031079-ba5b-4d8e-9a47-c6efa80d4ac0",
  "posts":[
    {"id":"f39dcb07-3939-4ebb-9aec-ea3658876789","post":"SIA"},
    {"id":"61dd3f60-689c-41aa-9bf0-17895077e2a5","post":"SIA"},
    {"id":"609f13d9-6b3c-4877-8856-d6a353f77be4","post":"おおおお"},
    {"id":"411b6978-1111-4711-a653-403e5b2c3123","post":"た"},
    {"id":"49185abb-cbec-4583-9e1b-71dd2adf74fa","post":"き"},
    {"id":"2829cc8d-1238-4e1a-b921-6e7d6593c272","post":"で"}
  ]
}
*/