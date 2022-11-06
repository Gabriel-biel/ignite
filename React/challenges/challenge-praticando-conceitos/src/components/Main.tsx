import { PlusCircle } from 'phosphor-react'
import styles from './Main.module.css'

export function Main() {
  return (
    <main className={styles.content}>
      <input type="text" className={styles.inputTodos}/>
      <button className={styles.buttonAdTodos}>
        Criar
        <PlusCircle size={16}/>  
      </button>
    </main>
  )
}