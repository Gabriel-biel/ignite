import styles from './Tasks.module.css'

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
    </div>
  )
}