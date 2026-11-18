import cls from "../../../../src/pages/LoginPage/loginStyles/login.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Spin } from "antd";
import { loginUser } from "../../../../api/loginApi.js";
import { registerUser } from "../../../../api/RegisterApi.js";

export const Login = () => {
  const navigate = useNavigate();

  const [modalAuth, setModalAuth] = useState(false);

  const [login, setLogin] = useState("");
  const [passwords, setPasswords] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login.trim() || !passwords.trim()) {
      toast.warning("Пожалуйста, заполните все поля");
      return;
    }

    setLoading(true);
    setErrorText("");

    try {
      await loginUser(login, passwords);
      navigate("/main");
    } catch (e) {
      const ern = toast.error(e.message);
      setPasswords("");
      setLogin("");
    } finally {
      setLoading(false);
    }
  };

  const stylesFn = {
    indicator: {
      color: "#8b5cf6",
    },
  };

  const [loginRegister, setLoginRegister] = useState("");
  const [passRegister, setPassRegister] = useState("");
  const [numberGroup, setNumberGroup] = useState("");

  const HandleChangeRegister = async (e) => {
    e.preventDefault();

    if (!loginRegister.trim() || !passRegister.trim() || !numberGroup.trim()) {
      toast.warning("Пожалуйста, заполните все поля");
      return;
    }

    if (loginRegister.trim().length < 3) {
      toast.warning("Логин должен быть мнимум 3 символа", { autoClose: 1500 });
      return;
    }

    if (passRegister.trim().length < 8) {
      toast.warning("Пароль должен быть минимум 8 символов", {
        autoClose: 1500,
      });
      return;
    }

    setLoading(true);
    try {
      await registerUser(loginRegister, passRegister, numberGroup);
      setLoginRegister("");
      setPassRegister("");
      setNumberGroup("");
      navigate("/main");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cls.wrapper}>
        <div
          className={cls.login_items_left}
          data-aos="fade-right"
          data-aos-duration="700"
        >
          <div className={cls.banner}></div>
        </div>
        <div
          className={cls.login_items}
          data-aos="fade-left"
          data-aos-duration="700"
        >
          {modalAuth === false ? (
            <>
              <h1
                className={cls.log}
                data-aos={"zoom-in"}
                data-aos-duration="600"
              >
                Добро пожаловать
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
              >
                Войдите в свой аккаунт
              </p>
              <div className={cls.login_item}>
                <input
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="500"
                  type="text"
                  placeholder="Логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
                <div className={cls.pass_input}>
                  <input
                    data-aos="fade-up"
                    data-aos-delay="300"
                    data-aos-duration="500"
                    type={togglePassword ? "text" : "password"}
                    placeholder="Пароль"
                    value={passwords}
                    onChange={(e) => setPasswords(e.target.value)}
                  />
                  <div
                    className={cls.pass_toggle}
                    data-aos="fade-up"
                    data-aos-delay="300"
                    data-aos-duration="500"
                    onClick={() => setTogglePassword((prev) => !prev)}
                  >
                    {togglePassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </div>
                </div>
                <button
                  data-aos="fade-up"
                  data-aos-delay="400"
                  data-aos-duration="600"
                  disabled={loading}
                  onClick={handleLogin}
                  type="button"
                >
                  {loading ? "Вход" : "Войти"}
                  {loading && (
                    <>
                      ...
                      <Spin
                        styles={stylesFn}
                        style={{ marginLeft: "10px" }}
                        size="small"
                      />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className={cls.register_item}>
              <h1 data-aos={"zoom-in"} className={cls.reds}>
                Давайте зарегистрируемся
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
              >
                Создайте свой аккаунт
              </p>
              <div className={cls.reg_items}>
                <input
                  data-aos="fade-down"
                  data-aos-delay="200"
                  data-aos-duration="500"
                  type="text"
                  placeholder="Логин"
                  value={loginRegister}
                  onChange={(e) => setLoginRegister(e.target.value)}
                />
                <div className={cls.pass_input}>
                  <input
                    data-aos="fade-down"
                    data-aos-delay="300"
                    data-aos-duration="500"
                    type={togglePassword ? "text" : "password"}
                    placeholder="Пароль"
                    value={passRegister}
                    onChange={(e) => setPassRegister(e.target.value)}
                  />
                  <div
                    className={cls.pass_toggle}
                    data-aos="fade-down"
                    data-aos-delay="300"
                    data-aos-duration="500"
                    onClick={() => setTogglePassword((prev) => !prev)}
                  >
                    {togglePassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </div>
                </div>
                <input
                  data-aos="fade-down"
                  data-aos-delay="400"
                  data-aos-duration="600"
                  type="text"
                  placeholder="Номер группы"
                  value={numberGroup}
                  onChange={(e) => setNumberGroup(e.target.value)}
                />

                <button
                  data-aos="fade-down"
                  data-aos-delay="500"
                  data-aos-duration="700"
                  onClick={HandleChangeRegister}
                  type="button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      Регистрация...
                      <Spin
                        styles={stylesFn}
                        style={{ marginLeft: "10px" }}
                        size="small"
                      />
                    </>
                  ) : (
                    "Зарегистрироваться"
                  )}
                </button>
              </div>
            </div>
          )}
          <div className={cls.dontH}>
            <hr />
            <p>
              {modalAuth ? (
                <>
                  Уже есть аккаунт?{" "}
                  <span onClick={() => setModalAuth(false)}>Войти</span>
                </>
              ) : (
                <>
                  Нет аккаунта?{" "}
                  <span onClick={() => setModalAuth(true)}>Создать</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
