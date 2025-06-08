import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';
import useUserStore from '../../store/useUserStore';
import { MajorList } from '../../constants/MajorList';

function Chat({ roomId }) {
  const { user } = useUserStore();
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  // 채팅 불러오기
  const fetchChats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/room/${roomId}/chat`, {
        withCredentials: true,
      });
      setChats(res.data);
    } catch (err) {
      console.error('채팅 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 3000); // 3초마다 갱신
    return () => clearInterval(interval);
  }, [roomId]);

  // 채팅 전송
  const handleSendChat = async () => {
    if (!newChat.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/room/${roomId}/chat`,
        {
          content: newChat,
          creatorId: user.userId,
        },
        {
          withCredentials: true,
        },
      );
      setChats(res.data); // 새 채팅 목록으로 업데이트
      setNewChat('');
    } catch (err) {
      console.error('채팅 전송 실패:', err);
    }
  };

  const formatChatDate = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${month}.${day}. ${hour}:${minute}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.commentBoxWrapper}>
        <div className={styles.commentsArea}>
          {chats.map((chat, idx) => (
            <div className={styles.commentWrapper} key={idx}>
              <div className={styles.comment}>
                <div className={styles.commentHeader}>
                  <div className={styles.authorGroup}>
                    <span className={styles.author}>{chat.creatorId?.username || '익명'}</span>
                    <span className={styles.creatorYear}> {MajorList[chat.creatorId?.major]?.name || '-'}</span>
                  </div>
                  <div className={styles.commentActions}>
                    <span className={styles.date}> {formatChatDate(chat.createdAt)}</span>
                  </div>
                </div>
                <div className={styles.commentInner}>
                  <div className={styles.commentContent}>{chat.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.inputArea}>
          <div className={styles.input}>
            <input
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              placeholder="채팅을 작성해주세요."
              style={{
                border: 'none',
                width: '100%',
                paddingRight: '4rem',
                outline: 'none',
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            />
          </div>
          <button className={styles.submitBtn} type="button" onClick={handleSendChat}>
            <img className={styles.sentIcon} src="/assets/sent.png" alt="전송 이미지" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
