import React, { createContext, useState, useContext } from 'react';
import { tasksData } from '../data/tasks';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(tasksData);

    const completeTask = (taskName) => {
        setTasks(prev =>
            prev.map(task =>
                task.name === taskName ? { ...task, completed: true } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, completeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
