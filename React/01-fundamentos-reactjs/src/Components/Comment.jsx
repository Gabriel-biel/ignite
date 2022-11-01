import { ThumbsUp, Trash } from 'phosphor-react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/Gabriel-biel.png" />
      
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>

          <header>
            <div className={styles.authorAndTime}>
              <strong>Gabriel Lima</strong>
              <time title="30 de Outubro às 14:19" dateTime='2022-30-10 14:19:00'>Cerca de 1h atrás</time>
            </div>
            <button title='Deletar Comentário'>
              <Trash size={24}/>
            </button>
          </header>

          <p>Muito Bom Parabéns</p>
        </div>

        <footer >
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>

      </div>
    </div>
  )
}