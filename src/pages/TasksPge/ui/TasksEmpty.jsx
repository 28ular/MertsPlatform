import cls from "../../../components/empty.module.scss";
import { MdOutlineAssignment, MdOndemandVideo } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const TasksEmpty = ({ onRetry }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      <div className={cls.empty} data-aos="fade-up">
        <div className={cls.icon}>
          <MdOutlineAssignment />
        </div>
        <h2>Заданий пока нет</h2>
        <p>
          Для тебя ещё нет заданий. А пока можешь посмотреть видеоуроки и
          подготовиться к практике.
        </p>
        <div className={cls.buttons}>
          <button className={cls.primary} onClick={() => navigate("/lessons")}>
            <MdOndemandVideo /> Смотреть уроки
          </button>
          <button className={cls.secondary} onClick={onRetry}>
            <FiRefreshCw /> Обновить
          </button>
        </div>
      </div>
    </div>
  );
};
