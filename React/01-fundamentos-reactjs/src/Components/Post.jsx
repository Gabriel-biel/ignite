import styles from './Post.module.css'

export function Post(props) {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img 
            className={styles.avatar} 
            src="https://avatars.githubusercontent.com/u/61027045?v=4"
          />
          <div className={styles.authorInfo}>
            <strong>Gabriel Lima</strong>
            <span>Web Developer</span>
          </div>
        </div>

        <time title="30 de Outubro às 14:19" dateTime='2022-30-10 14:19:00'>Públicado há 1h</time>
      </header>
      <div className={styles.content}>
        <p>Fala Galera 👋🏼</p>
        <p>Acabei de subir mais um projeto no meu portifolio. E um projeto que fiz durante</p>
        <p>as aulas do React no ignite</p>
        <p><a href='#'>👉🏼{' '}Gabriel-biel/feed-</a></p>
        <p>
          <a href='#'>#novoprojeto</a>{' '}
          <a href='#'>#nlw </a>{' '}
          <a href='#'>#rockeseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu FeedBack</strong>
        <textarea 
          placeholder='Deixe um comentário'
        />
        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>
    </article>
  )
}