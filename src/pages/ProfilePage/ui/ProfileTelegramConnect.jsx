import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPaperPlane, FaTrophy, FaCheck } from "react-icons/fa";
import {
  connectTelegram,
  disconnectTelegram,
} from "../../../../api/sendProfile.js";
import { useAchievements } from "../../../hooks/useAchievements.js";
import cls from "../styles/tgconachievs.module.scss";

export const ProfileTelegramConnect = ({
  isConnected,
  telegramUsername,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const navigate = useNavigate();
  const { data: achievements = [] } = useAchievements();

  const unlockedAchievements = achievements.filter((a) => a?.isUnlockedByMe);
  const previewAchievements = unlockedAchievements.slice(0, 3);

  useEffect(() => {
    if (isConnected) {
      setIsPolling(false);
      return;
    }
    if (!isPolling) return;

    let attempts = 0;
    const intervalId = setInterval(async () => {
      attempts += 1;
      await refetch?.();
      if (attempts >= 40) {
        setIsPolling(false);
      }
    }, 3000);

    const handleFocus = () => {
      refetch?.();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isPolling, isConnected, refetch]);

  const handleConnect = async () => {
    setLoading(true);
    const win = window.open("", "_blank");
    try {
      const res = await connectTelegram();
      if (res?.link) {
        if (win) {
          win.location.href = res.link;
        } else {
          window.location.href = res.link;
        }
        setIsPolling(true);
      } else {
        win?.close();
        toast.error("Не удалось получить ссылку");
      }
    } catch (e) {
      win?.close();
      toast.error(e?.response?.data?.message || "Ошибка при привязке Telegram");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await disconnectTelegram();
      setIsPolling(false);
      await refetch?.();
      toast.success("Telegram отвязан");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Ошибка при отвязке Telegram");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls.wrapper} data-aos="fade-up">
      <div className={cls.tg_card}>
        <div className={cls.tg_header}>
          <div className={cls.tg_icon}>
            <FaPaperPlane />
          </div>
          <h3>Уведомления в Telegram</h3>
        </div>

        <p className={cls.tg_desc}>
          Получайте мгновенные уведомления о проверке ДЗ и новых ачивках
        </p>

        {isConnected ? (
          <>
            <div className={cls.tg_connected_badge}>
              ● Подключен (
              {telegramUsername
                ? `@${telegramUsername.replace(/^@/, "")}`
                : "активен"}
              )
            </div>
            <button
              className={cls.tg_btn_disconnect}
              onClick={handleDisconnect}
              disabled={loading}
            >
              {loading ? "Отвязка..." : "Отвязать Telegram"}
            </button>
          </>
        ) : (
          <>
            <button
              className={cls.tg_btn_primary}
              onClick={handleConnect}
              disabled={loading}
            >
              <FaPaperPlane />
              {loading ? "Загрузка..." : "Подключить Telegram"}
            </button>
            {isPolling && (
              <p className={cls.tg_polling}>
                Ожидание подтверждения в боте... Нажмите «Запустить» (/start) в
                Telegram.
              </p>
            )}
          </>
        )}
      </div>

      <div className={cls.achievs_card}>
        <div className={cls.achievs_header}>
          <h3>
            <FaTrophy /> Мои достижения ({unlockedAchievements.length})
          </h3>
          <button
            className={cls.achievs_all_btn}
            onClick={() => navigate("/achievements")}
          >
            Все достижения каталога →
          </button>
        </div>

        {previewAchievements.length === 0 ? (
          <p className={cls.achievs_empty}>
            У вас пока нет полученных достижений
          </p>
        ) : (
          <div className={cls.achievs_grid}>
            {previewAchievements.map((item) => {
              const isUrl =
                typeof item?.iconUrl === "string" &&
                (item.iconUrl.startsWith("http") ||
                  item.iconUrl.startsWith("/"));

              return (
                <div
                  key={item?.id || item?.code}
                  className={cls.achiev_item}
                >
                  <div className={cls.achiev_icon}>
                    {isUrl ? (
                      <img src={item.iconUrl} alt={item?.title} />
                    ) : item?.iconUrl ? (
                      <span>{item.iconUrl}</span>
                    ) : (
                      <FaTrophy />
                    )}
                  </div>
                  <div className={cls.achiev_info}>
                    <h4>{item?.title || "Достижение"}</h4>
                    <p>{item?.description || item?.criteria || ""}</p>
                    <div className={cls.achiev_meta}>
                      {item?.points != null && (
                        <span className={cls.achiev_pts}>
                          +{item.points} pts
                        </span>
                      )}
                      {item?.unlockedAt && (
                        <span className={cls.achiev_date}>
                          <FaCheck />{" "}
                          {new Date(item.unlockedAt).toLocaleDateString(
                            "ru-RU",
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
