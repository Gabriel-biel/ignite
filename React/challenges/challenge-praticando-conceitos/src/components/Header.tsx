import styles from './Header.module.css'
import todoListLogo from '../assets/todoListLogo.svg'

export function Header() {
  return (
    <header className={styles.content}>
      <img src={todoListLogo} alt="Logo Todo List" />
    </header>
  )
}