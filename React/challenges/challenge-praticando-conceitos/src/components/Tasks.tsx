import styles from './Tasks.module.css'
import clipBoardFigma from '../assets/clipBoardFigma.svg';

export function Tasks() {
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <div className={styles.createdTask}>
          <strong>Tarefas Criadas</strong>
          <span>0</span>
        </div>
        <div className={styles.taskComplete}>
          <strong>Concluídas</strong>
          <span>0</span>
        </div>
      </header>
      <main>
        <div className={styles.notTask}>
          <img src={clipBoardFigma} alt="clipboard" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      </main>
    </div>
  )
}