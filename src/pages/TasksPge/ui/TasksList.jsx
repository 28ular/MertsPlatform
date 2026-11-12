import { Loader } from '../../../components/Loader.jsx';
import { useTasks } from '../../../hooks/useTasks.js';
import cls from '../styles/task.module.scss'
import {TaskS} from "./Tasks.jsx";

export const TasksList = () => {

    const {  data, isPending, isSuccess, isError } = useTasks();

    console.log(data)   

    if (isPending) return (<Loader/>)

    return (
        <>
            <div className={cls.task}>
                <div className={cls.task_content}>
                    <TaskS datas={data}/>
                </div>
            </div>
        </>
    )
}