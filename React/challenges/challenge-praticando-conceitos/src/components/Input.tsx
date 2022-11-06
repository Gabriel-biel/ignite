import { PlusCircle } from 'phosphor-react'
import styles from './Input.module.css'

export function Input() {
  return (
    <div className={styles.addTodos}>
      <input type="text" className={styles.inputTodos} placeholder="Adicione uma nova tarefa"/>
      <button className={styles.buttonAdTodos}>
        <span>Criar</span>
        <PlusCircle size={16}/>  
      </button>
    </div>
  )
}