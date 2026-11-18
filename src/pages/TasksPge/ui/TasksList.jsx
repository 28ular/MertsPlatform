import { Loader } from '../../../components/Loader.jsx';
import { useTasks } from '../../../hooks/useTasks.js';
import cls from '../styles/task.module.scss'
import {TaskS} from "./Tasks.jsx";
import { TasksEmpty } from "./TasksEmpty.jsx";

export const TasksList = () => {

    const {  data, isPending, isSuccess, isError, refetch } = useTasks();

    console.log(data)   

    if (isPending) return (<Loader/>)

    const tasks = Array.isArray(data) ? data : data?.tasks || [];

    if (!isError && tasks.length === 0) {
        return (
            <div className={cls.task}>
                <TasksEmpty onRetry={refetch} />
            </div>
        )
    }

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