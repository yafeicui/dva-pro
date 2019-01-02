import styles from './index.less';
function NotFoundPage() {
  return (
    <div className={styles.noFindCont}>
      <div className={styles.noFindTitle}>404</div>
      <div className={styles.noFindDesc}>页面找不到啊～～～</div>
    </div>
  );
}

export default NotFoundPage;
