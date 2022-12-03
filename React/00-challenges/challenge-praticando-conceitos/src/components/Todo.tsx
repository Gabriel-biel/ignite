import { Check, Trash } from 'phosphor-react';
import styles from './Todo.module.css';


interface TodoProps {
  id: string,
  completed: boolean;
  content: string,
  onChecked: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Todo({ onDeleteTask, id, content, completed, onChecked }: TodoProps) {

  function handleDeleteTodo() {
    onDeleteTask(id);
  }

  function handleCheckTodo() {
    onChecked(id);
  }

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <div className={completed ? styles.checkButtonCompleted : styles.checkButton}>
          <button onClick={handleCheckTodo}>
            <Check weight='bold'/>
          </button>
        </div>
        <strong>{content}</strong>
        <button className={styles.deleteTodo} onClick={handleDeleteTodo}>
          <Trash weight='bold'/>
        </button>
      </header>
    </div>
  )
}