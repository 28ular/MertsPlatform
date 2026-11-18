import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../App/api";
import { Loader } from "../../../components/Loader";
import cls from "../styles/achievements.module.scss";
import {
  FaCheckCircle,
  FaLock,
  FaStar,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { IoClose, IoTimeOutline } from "react-icons/io5";

export const ProfileAchievementsDetail = ({ achievementId, onClose }) => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const id = achievementId || paramId;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (!id) return;
    const getDetail = async () => {
      setLoading(true);
      try {
        const response = await api(`/achievements/${id}`);
        const data = response.data.achievement || response.data;
        setData(data);
        setLoading(false);
      } catch (e) {
        setError(e.message || "Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  if (!id) return null;

  return (
    <div className={cls.detail_modal_overlay} onClick={handleClose}>
      <div
        className={cls.achievement_detail_wrapper}
        data-aos="zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className={cls.achievement_detail_card}>
            <Loader />
          </div>
        ) : (
          <div
            className={`${cls.achievement_detail_card} ${
              data?.isUnlockedByMe ? cls.unlocked : cls.locked
            }`}
          >
            <button className={cls.detail_close_btn} onClick={handleClose}>
              <IoClose />
            </button>

            <div className={cls.detail_top}>
              <div className={cls.detail_icon}>
                {typeof data?.iconUrl === "string" &&
                (data.iconUrl.startsWith("http") ||
                  data.iconUrl.startsWith("/")) ? (
                  <img src={data.iconUrl} alt={data?.title} />
                ) : data?.iconUrl ? (
                  <span>{data.iconUrl}</span>
                ) : (
                  <FaTrophy />
                )}
              </div>

              <div className={cls.detail_title_block}>
                {data?.category && (
                  <span className={cls.detail_category}>{data.category}</span>
                )}
                <h1>{data?.title || "Достижение"}</h1>
                {data?.code && (
                  <span className={cls.detail_code}>#{data.code}</span>
                )}
              </div>

              <div className={cls.detail_badges}>
                <span className={cls.detail_points}>
                  <FaStar /> +{data?.points || 0} баллов
                </span>
                <span
                  className={`${cls.detail_status} ${
                    data?.isUnlockedByMe
                      ? cls.status_unlocked
                      : cls.status_locked
                  }`}
                >
                  {data?.isUnlockedByMe ? (
                    <>
                      <FaCheckCircle /> Получено
                    </>
                  ) : (
                    <>
                      <FaLock /> Закрыто
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className={cls.detail_body}>
              <div className={cls.detail_section}>
                <h3>Описание</h3>
                <p>{data?.description}</p>
              </div>

              <div className={cls.detail_section}>
                <h3>Условие получения</h3>
                <p>{data?.criteria}</p>
              </div>
            </div>

            <div className={cls.detail_footer}>
              <div className={cls.detail_stat}>
                <FaUsers /> Получили студентов:{" "}
                <b>{data?.unlockedCount || 0}</b>
              </div>
              <div className={cls.detail_stat}>
                <IoTimeOutline /> Получен в:{" "}
                <b>{new Date(data.unlockedAt).toLocaleDateString("ru-RU")}</b>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
