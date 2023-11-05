import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function removeTask(id: string, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(list => list.id !== id)});
    }

    function addTask(title: string, todoId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
    }

    function changeStatus(taskId: string, isDone: boolean, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].map(list => list.id === taskId ? {...list, isDone: isDone} : list)})
    }


    function changeFilter(value: FilterValuesType, todoId: string) {
        setTodolists(todolists.map(list => list.id === todoId ? {...list, filter: value} : list))
        //map и так создает новый массив
    }

    let todos = todolists.map(list => {

        let tasksForTodolist = tasks[list.id];

        switch (list.filter) {
            case 'active':
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                break;
            case 'completed':
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                break;
            default:
                break;
        }

        return (<Todolist key={list.id}
                          todoListId={list.id}
                          title={list.title}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeStatus}
                          filter={list.filter}/>)
    })

    return (
        <div className="App">
            {todos}
        </div>
    );
}

export default App;
