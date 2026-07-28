import { useFindUser } from "../../../store/userStore.js";
import { Tasks } from "../../../db/tasks.js";
import cls from "../styles/task.module.scss";
import { IoCheckmarkDoneCircleOutline, IoEyeSharp } from "react-icons/io5";
import { PiTelegramLogoLight } from "react-icons/pi";
import {FaHtml5, FaRegCircle} from "react-icons/fa";
import { useDone } from "../../../store/DoneStore.js";
import {useState} from "react";
import {IoLogoCss3, IoLogoJavascript} from "react-icons/io";

export const TaskS = () => {

    const { userInfo } = useFindUser();

    const data = Tasks.Task[userInfo?.tegLess];

    const { doneTask, addDone } = useDone();

    console.log(data.length);

    console.log(doneTask.length);

    const [active, setActive] = useState(false);

    return (
        <>
            <div className={cls.TaskS}>
                <div className={cls.title} >
                    <h1>Задания</h1>
                </div>

                <div className={cls.search}>
                    <button onClick={() => setActive(prev => !prev)} className={active ? cls.active_btn : cls.not_active}>Все задания</button>
                </div>

                <div className={cls.task_items}>
                    {data?.map((t) => {

                        const isDone = doneTask.includes(t.id);

                        return (
                            <div
                                key={t.id}
                                className={`${cls.task_item} ${isDone ? cls.done : ''} `}
                                data-aos="fade-up"
                            >

                                <div className={cls.task_left}>
                                    <div
                                        className={cls.img}
                                        style={{ marginRight: "10px" }}
                                    >
                                        {t?.themeLess === 'HTML' ? <FaHtml5 /> : t?.themeLess === 'CSS' ? <IoLogoCss3 /> : <IoLogoJavascript />}
                                    </div>

                                    <div className={cls.info}>
                                        <h3>{t.name}</h3>

                                        <p>{t.description}</p>

                                        <div className={cls.buttons}>
                                            <span className={cls.s}>HTML</span>

                                            <button className={cls.button_primer} disabled={t?.primerUrl === ''} onClick={() => window.open(`${t?.primerUrl}`, "_blank")  }>
                                                <IoEyeSharp />
                                                Посмотреть пример
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={cls.hr}></div>

                                <div className={cls.task_right}>

                                    <div className={cls.right_infos}>
                                        <div className={cls.dones}>
                                            <div className={`${cls.not_done} ${isDone ? cls.done : ''}`}></div>

                                            <span >
                                                {isDone
                                                    ? "✅ Выполнено"
                                                    : "⭕ Не выполнено"}
                                            </span>
                                        </div>

                                        <p>
                                            При клике "Отправить задание"
                                            Задание автоматически отмечается как выполненым.
                                        </p>
                                    </div>

                                    <div className={cls.right_buttons}>

                                        <button

                                            className={cls.done_toggle}
                                        >
                                            {isDone ? (
                                                <IoCheckmarkDoneCircleOutline />
                                            ) : (
                                                <FaRegCircle />
                                            )}

                                            {isDone
                                                ? "Выполнено"
                                                : "Не выполнено"}
                                        </button>
                                        <button onClick={() => {
                                            addDone(t?.id);
                                            window.open('https://t.me/Merts228')
                                        }} className={cls.button_send}>
                                            <PiTelegramLogoLight />
                                            Отправить задание
                                        </button>

                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};