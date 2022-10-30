import { Header } from './Components/Header'
import { Post } from './Components/Post';
import { Sidebar } from './Components/SideBar';

import './global.css';
import styles from './App.module.css'

export function App() {
  return (
    <>
      <Header />
        <div className={styles.wrapper}>
          <Sidebar />
          <main>
            <Post author="Bielzin" content="lorem ipsun"/>
            <Post author="MpVinnie" content="lorem ipsun"/>
            <Post author="Samuel" content="lorem ipsun"/>
          </main>
        </div>
    </>
  )
}
