import './global.css';
import styles from './App.module.css'
import { Header } from './components/Header';
import { Input } from './components/Input';
import { Tasks } from './components/Tasks';

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Input />
        <main>
          <Tasks />
        </main>
      </div>
    </>
  )
}

export default App
