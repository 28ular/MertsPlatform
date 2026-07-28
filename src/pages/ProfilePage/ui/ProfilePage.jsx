import cls from '../../../../src/pages/ProfilePage/styles/profile.module.scss'
import {useFindUser} from "../../../store/userStore.js";
import {MdEdit} from "react-icons/md";
import { Button, Modal } from 'antd';
import {useState} from "react";
import {CiUser} from "react-icons/ci";
import {FaTelegram, FaUser} from "react-icons/fa";
import {RiTelegram2Line} from "react-icons/ri";
import {FaPeopleGroup} from "react-icons/fa6";
import {useProfile} from "../../../store/useProfile.js";
import {toast, ToastContainer} from "react-toastify";
import {ProfileBanner} from "./ProfileBanner.jsx";
import {Nothing} from "../../../components/Nothing.jsx";



export const ProfilePage = () => {

    const { userInfo } = useFindUser();
    const { profileUrlImg, addProfileUrlImg, profileCustomInfo, customProfileCustomInfo} = useProfile();

    const [modal1Open, setModal1Open] = useState(false);


    const [name, setName] = useState("");
    const [tg, setTg] = useState("");
    const [group, setGroup] = useState("");


    const customProfileClick = () => {
        if (name.trim() === '' || tg.trim() === '' || group.trim() === ''  ) {
            const notyWa = toast.warning('Заполните все поля', {
                autoClose: 2000,
            })
            return
        }
        customProfileCustomInfo(name, tg, group)
        setName('')
        setTg('')
        setGroup('')
        const notyS = toast.success('Успешно: Данные Изменены', {
            autoClose: 1000,
        })
        setModal1Open(false);
    }

    return (
        <>

            <ToastContainer theme="dark"/>
            <ProfileBanner/>
            <div className={cls.profile}>
                <div className={cls.profile_info}>

                    <div className={cls.profile_infos} data-aos="fade-up">
                        <div
                            className={cls.profile_avatar}
                            style={{     backgroundImage: `url(${profileUrlImg })` }}
                        >
                            <label className={cls.profiel_change}>
                                выбрать фото
                                <input type="file" accept="image/*" onChange={ (e) => {
                                    const file = e.target.files[0];

                                    const reader = new FileReader();

                                    reader.onload = () => {
                                        const base64 = reader.result;

                                        addProfileUrlImg(base64);
                                    };

                                    reader.readAsDataURL(file);
                                }} className={cls.file}/>
                            </label>
                        </div>
                        <div className={cls.profile_statistic_info}>
                            <div className={cls.profile_student}>
                                Студент
                            </div>
                            <h1>{userInfo?.login}</h1>
                        </div>
                        <div className={cls.profile_custom}>
                            <div className={cls.profile_custom_infos}>
                                <button onClick={() => setModal1Open(true)}><MdEdit /> Редактировать профиль</button>
                                <div className={cls.custom_info}>
                                    <div className={cls.custom_info_content}>
                                        <FaUser />
                                        {profileCustomInfo?.name}
                                    </div>
                                    <div className={cls.custom_info_content}>
                                        <RiTelegram2Line/>
                                        @ {profileCustomInfo?.tg}
                                    </div>
                                    <div className={cls.custom_info_content}>
                                        <FaPeopleGroup />
                                        {profileCustomInfo?.group}
                                    </div>
                                </div>
                                {
                                  modal1Open && (
                                      <div>
                                          <Modal
                                              title="Редактирование Профиля"
                                              style={{ top: 115, backgroundColor: "red" }}
                                              open={modal1Open}
                                              rootClassName={cls.modal_editsss}
                                              onOk={customProfileClick}
                                              onCancel={() => setModal1Open(false)}
                                          >
                                              <div className={cls.modal_edit_inputs}>
                                                  <input
                                                      type="text"
                                                      value={name}
                                                      onChange={e => setName(e.target.value)}
                                                      placeholder="username"
                                                      maxLength="11"
                                                  />
                                                  <input
                                                      type="text"
                                                      value={tg}
                                                      onChange={e => setTg(e.target.value)}
                                                      placeholder="@tg"
                                                      maxLength="11"
                                                  />
                                                  <input
                                                      type="text"
                                                      value={group}
                                                      onChange={e => setGroup(e.target.value)}
                                                      placeholder="group num..."
                                                      maxLength="11"
                                                  />
                                              </div>
                                          </Modal>
                                      </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Nothing text="пока ничего..."/>
        </>
    )
}