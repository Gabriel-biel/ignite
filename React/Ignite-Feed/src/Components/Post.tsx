import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

// author: { avatar_url: "", name: "", role: "" }
// publishAt: Date
// Content: string

interface Author {
  name: string,
  role: string,
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link',
  content: string,
}

interface PostProps {
  author: Author,
  publishedAt: Date,
  content: Content[],
}

export function Post({ author, publishedAt, content }: PostProps ) {
  const [comments, setComments] = useState(["Post bacana Cara!!"]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  })

  function handleCreateNewComent(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText])
    setNewCommentText('');
  }

  function hendleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo e obrigatório')
  }

  const isInputCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
            <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map(line => {
          if(line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
        <a href='#'>#novoprojeto</a>{' '}
        <a href='#'>#nlw </a>{' '}
        <a href='#'>#rockeseat</a>
      </div>

      <form onSubmit={handleCreateNewComent} className={styles.commentForm}>
        <strong>Deixe seu FeedBack</strong>
        <textarea
          name='comment' 
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={hendleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button disabled={isInputCommentEmpty} type='submit'>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map(GuestComment => {
          return (
            <Comment 
              key={GuestComment} 
              content={GuestComment} 
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}