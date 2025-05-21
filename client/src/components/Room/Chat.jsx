import React from 'react';
import axios from 'axios';
import styles from './Chat.module.css';

function Chat() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.commentBoxWrapper}>
          <div className={styles.commentsArea}>
            <div className={styles.commentWrapper}>
              <div className={styles.comment}>
                <div className={styles.commentHeader}>
                  <div className={styles.authorGroup}>
                    <span className={styles.author}>닉네임</span>
                    <span className={styles.creatorYear}>IT대학</span>
                  </div>
                  <div className={styles.commentActions}>
                    <span className={styles.date}>04.04. 13:00</span>
                  </div>
                </div>
                <div className={styles.commentInner}>
                  <div className={styles.commentContent}>안녕하세욧</div>
                </div>
              </div>
            </div>

            <div className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.authorGroup}>
                  <span className={styles.author}>닉네임</span>
                  <span className={styles.creatorYear}>IT대학</span>
                </div>
                <div className={styles.commentActions}>
                  <span className={styles.date}>04.04. 13:00</span>
                </div>
              </div>
              <div className={styles.commentInner}>
                <div className={styles.commentContent}>저 늦어요</div>
              </div>
            </div>

            <div className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.authorGroup}>
                  <span className={styles.author}>닉네임</span>
                  <span className={styles.creatorYear}>IT대학</span>
                </div>
                <div className={styles.commentActions}>
                  <span className={styles.date}>04.04. 13:00</span>
                </div>
              </div>
              <div className={styles.commentInner}>
                <div className={styles.commentContent}>저 늦어요</div>
              </div>
            </div>
          </div>

          <div className={styles.inputArea}>
            <div className={styles.input}>
              <input
                placeholder="채팅을 작성해주세요."
                style={{ border: 'none', width: '100%', paddingRight: '4rem', outline: 'none' }}
              />
            </div>
            <button className={styles.submitBtn} type="button">
              {/* <ICUpload /> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
