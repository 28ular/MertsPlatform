

import cls from '../../src/components/header.module.scss'
import {FaHome, FaNewspaper, FaTasks,} from "react-icons/fa";
import {FaBookOpenReader, FaCalendarDays} from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import {SiSimpleanalytics} from "react-icons/si";
import {useNavigate} from "react-router-dom";
import {IoMdExit} from "react-icons/io";
import {ProfileImgMobile} from "./ProfileImgMobile.jsx";

export const Header = () => {

    const feutersItems = [
        {
            id:1,
            name: 'Главная',
            img: FaHome,
            path: 'main'
        },
        {
            id:2,
            name: 'Мои уроки',
            img: FaBookOpenReader,
            path: 'lessons'

        },
        {
            id:3,
            name: 'Задания',
            img: FaTasks,
            path: 'tasks'

        },
        {
            id:4,
            name: 'Результаты',
            img: SiSimpleanalytics,
            path: 'results'
        },
        {
            id:5,
            name: 'События',
            img: FaNewspaper ,
            path: 'events'
        },
        {
            id:6,
            name:'Профиль',
            img: ProfileImgMobile,
            path: 'profile'
        },
    ]

    const exit = () => {
        navigate('/auth')
        localStorage.removeItem('user-merts-chat');
    }
    const navigate = useNavigate();
    return (
        <>

            <div className={cls.header}>
                <div className={cls.header_items}>
                    <div className={cls.feuters}>
                       <div className={cls.feut_items}>
                           {
                               feutersItems?.map((i) => (
                                   <div key={i?.id} className={cls.feut_item} onClick={() => navigate(`/${i.path}`)}>
                                       <div className={cls.imgs}>
                                           <i.img/>
                                       </div>
                                       <h4>{i?.name}</h4>
                                   </div>
                               ))
                           }
                       </div>
                        <div className={cls.header_footer}>
                           <div className={cls.support}>
                                   <FaRegMessage className={cls.supp_img} />
                                  <h4 onClick={() => window.location.href = 'https://t.me/Merts228'}>Нужна помощь?</h4>
                           </div>
                           <div className={cls.exit}>
                               <div className={cls.exit_item} onClick={exit}>
                                   <IoMdExit className={cls.supp_img} />
                                   Выйти
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}