import { Header } from './Components/Header'
import { Post } from './Components/Post';
import { Sidebar } from './Components/SideBar';

import './global.css';
import styles from './App.module.css'

// author: { avatar_url: "", name: "", role: "" }
// publishedAt: Date
// Content: string

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/Gabriel-biel.png",
      name: "Gabriel Andrade",
      role: "Developer Junior"
    },
    content: [
      {type: 'paragraph', content: "Fala Galera 👋🏼"},
      {type: 'paragraph', content: "Acabei de subir mais um projeto no meu portifolio. E um projeto que fiz durante"},
      {type: 'link', content: "Gabriel-biel/ignite-aulas-2022"},
    ],
    publishedAt: new Date("2022-11-03 12:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Maik Brito",
      role: "Educator @Rockeseat",
    },
    content: [
      {type: 'paragraph', content: "Fala Galera 👋🏼"},
      {type: 'paragraph', content: "Acabei de subir mais um projeto no meu portifolio. E um projeto que fiz durante"},
      {type: 'link', content: "Maik-Brito/ignite-aulas-2022"},
    ],
    publishedAt: new Date("2022-11-03 12:00:00"),
  },
]

export function App() {
  return (
    <>
      <Header />
        <div className={styles.wrapper}>
          <Sidebar />
          <main>
            {posts.map(post => {
            return (
              <Post 
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
            })}
          </main>
        </div>
    </>
  )
}
