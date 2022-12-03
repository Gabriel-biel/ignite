import {v4 as uuidv4} from 'uuid'

import styles from './Tasks.module.css'

import clipBoardFigma from '../assets/clipBoardFigma.svg';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from './Todo';
import { PlusCircle } from 'phosphor-react';


interface TodoProps {
  id: string,
  content: string,
  completed: boolean
}

export function Tasks() {
  const [Tasks, setNewTasks] = useState<TodoProps[]>([])
  const [newTodoText, setNewTodoText] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);

  function handleCreateNewTodoText(event: FormEvent) {
    event.preventDefault();
    setNewTasks((state) => {
      setTotalTasks(state.length + 1)

      return [{
        id: uuidv4(),
        content: newTodoText,
        completed: false,
      }, ...state]
    })

    setNewTodoText('')
  }

  function handleChangeNewTodoText(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTodoText(event.target.value);
  }

  function handleNewTodoTextInvalid(event: ChangeEvent<HTMLInputElement>) {
    event?.target.setCustomValidity('Esse Campo e Obrigratório!')
  }

  function deleteTask(id: string) {
    const TasksWithoutDeleteOne = Tasks.filter(task => {
      return task.id !== id
    })

    setNewTasks(TasksWithoutDeleteOne);
    setTotalTasks((state) => {
      return state - 1
    });
  }

  function toggleTask(id: string) {
    const tasksWithoutCheck = Tasks.map(task => {
      if(task.id === id){
        task.completed = !task.completed
      }
      return task
    })

    setNewTasks(tasksWithoutCheck)
  }

  const totalCompletedTasks = Tasks.reduce((acumulador, taskAtual) => {
    if (taskAtual.completed){
      return acumulador + 1
    } else {
      return acumulador
    }
  }, 0)

  const isInputTodoTextEmpty = newTodoText.length === 0;

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={handleCreateNewTodoText}>
        <input 
          type="text" 
          className={styles.inputTodos}
          value={newTodoText}
          onChange={handleChangeNewTodoText}
          onInvalid={handleNewTodoTextInvalid}
          placeholder="Adicione uma nova tarefa"
          required
        />
        <button className={styles.buttonAdTodos} type='submit'>
          <span>Criar</span>
          <PlusCircle size={16}/>  
        </button>
      </form>
      <header className={styles.header}>
        <div className={styles.createdTask}>
          <strong>Tarefas Criadas</strong>
          <span>{totalTasks}</span>
        </div>
        <div className={styles.taskComplete}>
          <strong>Concluídas</strong>
          <span>{totalCompletedTasks} de {totalTasks}</span>
        </div>
      </header>
      <main>
        {totalTasks == 0 ? 
        <div className={styles.notTask}>
          <img src={clipBoardFigma} alt="clipboard" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div> : 
          Tasks.map(task =>
            <Todo 
              key={task.id}
              id={task.id}
              content={task.content}
              completed={task.completed}
              onChecked={toggleTask}
              onDeleteTask={deleteTask}
            />
          )
        }
      </main>
    </div>
  )
}