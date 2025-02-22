import { useState, useEffect } from "react";

function App() {
  const [threads, setThreads] = useState([]); 
  const [offset, setOffset] = useState(0); 
  const [screen, setScreen] = useState("list"); 
  const fetchThreads = (newOffset) => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads?offset=${newOffset}`)
      .then((response) => response.json())
      .then((data) => {
        setThreads((prevThreads) => [...prevThreads, ...data]); 
        setOffset(newOffset + 10); 
      })
      .catch((error) => console.error("データ取得エラー:", error));
  };

  useEffect(() => {
    fetchThreads(0); 
  }, []);

  return (
    <div>
      <h1>掲示板</h1>

      {screen === "list" ? (
        <div>
          <button onClick={() => setScreen("new")}>新規スレッド作成</button>
          <ul>
            {threads.map((thread) => (
              <li key={thread.id}>{thread.title}</li>
            ))}
          </ul>
          <button onClick={() => fetchThreads(offset)}>もっと見る</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setScreen("list")}>戻る</button>
          <h2>新規スレッド作成</h2>
          <input type="text" placeholder="スレッドタイトル" />
          <button>作成</button>
        </div>
      )}
    </div>
  );
}

export default App;
