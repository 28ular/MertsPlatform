import cls from '../../../../src/pages/MainPage/styles/main.module.scss'
import img from '../../../images/mainpageImg.png'
import imgs from '../../../images/ularsImg.JPG'
import {FaArrowRight, FaBook} from "react-icons/fa";
import {useFindUser} from "../../../store/userStore.js";


export const MainStudyInfo = () => {

    const {userInfo} = useFindUser()

    return (
        <>
            <div className={cls.mainStudyInfo}>
                <div className={cls.mainStudyInfo_items}>
                    <div  className={cls.continue}  style={{backgroundImage: `url(${img})`}}>
                        <div className={cls.continue_content} >
                            <div className={cls.continue_title}>
                                <h2>Дорогой <span>{userInfo?.login}</span>!</h2>
                                <p>Добро пожаловать в MertsChat</p>
                            </div>
                            <div className={cls.continue_footer}>
                                <p>Обязательно ознакомьтесь с инструкцией перед началом обучения, чтобы всё было максимально понятно и эффективно.</p>
                                <button onClick={() => window.open('https://online.geeks.kg/') }><FaBook /> Ознакомиться с инструкцией <FaArrowRight /></button>
                            </div>
                        </div>
                    </div>

                    <div className={cls.team} >
                        <div className={cls.team_content}>
                            <div className={cls.team_title}>
                                <span className={cls.s}>Основатель</span>
                                <h2>Кто работал над сайтом</h2>
                                <p>Благодаря ему MertsChat стал тем местом, где ты сейчас развиваешься</p>
                            </div>
                            <button>Подробнее</button>
                        </div>
                        <div className={cls.imgUlars} style={{backgroundImage: `url(${imgs})`}}>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}