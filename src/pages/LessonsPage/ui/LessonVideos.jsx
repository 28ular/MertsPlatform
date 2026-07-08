import {useFindUser} from "../../../store/userStore.js";
import {useState} from "react";
import cls from "../styles/lessons.module.scss";
import { groups } from "../../../db/groups.js";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

export const LessonVideos = () => {

    const {  userInfo } = useFindUser();

    const group = groups[userInfo.groupId];

    const lessons = group?.lessons?.[group?.lessonsKey] || [];

    const [index, setIndex] = useState(0);

    const currentLesson = lessons[index];




    return (
        <>

        <div className={cls.videos}>
            <div className={cls.title}>
                <div className={cls.less_title}>
                    <h1>{currentLesson?.title}</h1>
                    <div className={cls.lesson_of_lesson}>
                        Урок {index + 1 } из {lessons?.length}
                    </div>
                </div>
            </div>
                        <iframe data-aos="zoom-in" className={cls.video} src={`https://www.youtube.com/embed/${currentLesson?.id}`}
                        title="Я ни в чем не виновен | 1 серия | Черный двор. Побег | КОНКУРС" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
            <div className={cls.video_paginasion} >
                <button disabled={index === 0} className={cls.paginasion_btn}   onClick={() => setIndex(prev => prev - 1)} >
                    <FaArrowLeft />Предыдущий урок
                </button>
                <div className={cls.paginasion_info}>
                     {index + 1 } урок
                </div>
                <button className={cls.paginasion_btn} disabled={index === lessons.length - 1} onClick={() => setIndex( prev => prev + 1)} >
                        Следуйщий Урок  <FaArrowRight />
                </button>
            </div>
        </div>


        </>
    )
}