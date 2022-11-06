import './global.css';
import styles from './App.module.css'
import { Header } from './components/Header';
import { Main } from './components/Main';

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Main />
      </div>
    </>
  )
}

export default App
