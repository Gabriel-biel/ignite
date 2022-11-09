import { Check, Trash } from 'phosphor-react';
import styles from './Todo.module.css';


interface TodoProps {
  id: string,
  completed: boolean;
  content: string,
  onChecked: () => void;
  onDeleteTask: (id: string) => void;
}

export function Todo({ onDeleteTask, id, content, completed }: TodoProps) {

  function handleDeleteTodo() {
    onDeleteTask(id)
  }

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <div>
          <button className={styles.checkButton}>
            <Check size={17} weight='bold'/>
          </button>
        </div>
        <strong>{content}</strong>
        <button onClick={handleDeleteTodo}>
          <Trash size={24} weight='bold'/>
        </button>
      </header>
    </div>
  )
}