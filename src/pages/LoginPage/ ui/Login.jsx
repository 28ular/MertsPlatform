import cls from '../../../../src/pages/LoginPage/loginStyles/login.module.scss'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {users} from "../../../db/users.js";
import {useFindUser} from "../../../store/userStore.js";
import {IoEyeSharp} from "react-icons/io5";
import {FaEyeSlash} from "react-icons/fa";


export const Login = () => {

    const navigate = useNavigate();

    const  { addUser } = useFindUser();
    const [login , setLogin] = useState('');
    const [passwords, setPasswords] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const verifyClick = () => {

        const user = users.find(user => user.login === login.trim() && user.password === passwords.trim())

        if ( login.trim() === '' || passwords.trim() === '' ) {
            const noty = toast.warning('Заполните Все поля!')
            return;
        }
        if ( user ) {
            setSuccess(true);
            addUser(user);
            const notyLoa = toast.loading('Загрузка данных', {
                autoClose: 1500
            })
            setTimeout(() => {
                const notySu = toast.success('Успешно!', {
                    autoClose: 900
                })
            },1600)
            setTimeout(() => {
                navigate('/main');
            }, 3000)
        }else {
            const notyEr = toast.error('Неверный: Пароль или Логин', {
                autoClose: 2000
            })
            setTimeout(() => {
                const notyWa = toast.warning('Попробуйте снова', {
                    autoClose: 1000,
                })
            }, 2100)
            return;
        }

    }

    return (
        <>
            <ToastContainer theme="dark"/>
            <div className={cls.wrapper} data-aos="zoom-in" data-aos-duration="800">
            <div className={cls.login_items}>
                <h1>Добро пожаловать 👋</h1>
                <p>Войдите в свой аккаунт</p>
                <div className={cls.login_item}>
                    <input
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <div className={cls.pass_input}>
                        <input
                            type={togglePassword ? 'text' : 'password'}
                            placeholder="Пароль"
                            value={passwords}
                            onChange={(e) => setPasswords(e.target.value)}
                        />
                        <div className={cls.pass_toggle} onClick={() => setTogglePassword(prev => !prev)}>
                            { togglePassword ? <FaEyeSlash /> : <IoEyeSharp />}
                        </div>
                    </div>
                    <button disabled={success === true} onClick={verifyClick}>
                        Войти
                    </button>
                </div>
            </div>
            </div>
        </>
    )
}