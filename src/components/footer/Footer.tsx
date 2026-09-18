import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.row}`}>
        <span>© {new Date().getFullYear()} Karandeep Singh</span>
        <a className={styles.top} href="#main">
          Back to top
        </a>
      </div>
    </footer>
  )
}
