
import cls from '../styles/task.module.scss'

export const TasksModal = () => {
    return (
        <>

            <div className={cls.task_modal}>
                 <div className={cls.task_modal_content}>
                     <button>да</button>
                     <button>нет</button>
                 </div>
            </div>

        </>
    )
}