import cls from "../../../components/empty.module.scss";
import { MdOndemandVideo } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const LessonsEmpty = ({ onRetry }) => {
  const navigate = useNavigate();

  return (
      <div className={cls.wrapper}>
        <div className={cls.empty} data-aos="fade-up">
      <div className={cls.icon}>
        <MdOndemandVideo />
      </div>
      <h2>Уроков пока нет</h2>
      <p>
        Ментор ещё не добавил видеоуроки для твоей группы. Как только они
        появятся — ты увидишь их здесь.
      </p>
      <div className={cls.buttons}>
        <button className={cls.primary} onClick={() => navigate("/main")}>
          <FaHome /> На главную
        </button>
        <button className={cls.secondary} onClick={onRetry}>
          <FiRefreshCw /> Обновить
        </button>
      </div>
    </div>
      </div>
  );
};
