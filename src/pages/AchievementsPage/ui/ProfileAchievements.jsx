import { useState } from "react";
import cls from "../styles/achievements.module.scss";
import { useAchievements } from "../../../hooks/useAchievements.js";
import { Loader } from "../../../components/Loader.jsx";
import { FaTrophy, FaLock, FaCheckCircle, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { ProfileAchievementsDetail } from "./ProfileAchievementsDetail.jsx";

export const ProfileAchievements = () => {
  const { data: achievements = [], isPending, isError } = useAchievements();
  const [selectedId, setSelectedId] = useState(null);
  const [filterTitle, setFilterTitle] = useState("all");

  if (isPending) return <Loader />;

  if (isError) {
    return (
      <div className={cls.achievements_wrapper}>
        <p className={cls.achievements_empty}>Ошибка при загрузке ачивок</p>
      </div>
    );
  }

  console.log(achievements);

  const unlockedCount = achievements.filter((a) => a?.isUnlockedByMe).length;

  const filterAchievments = achievements?.filter((i) =>
    filterTitle === "locker"
      ? !i.isUnlockedByMe
      : filterTitle === "unlocker"
        ? i?.isUnlockedByMe
        : true,
  );

  return (
    <>
      <div
        className={cls.achievements_wrapper}
        data-aos="fade-up "
        data-aos-duration={"1000"}
      >
        <div className={cls.achievements_header}>
          <h2>
            <FaTrophy /> Достижения
          </h2>
          <span className={cls.achievements_count}>
            Открыто: {unlockedCount} из {achievements.length}
          </span>
        </div>
        <div className={cls.filterbuttons}>
          <button
            className={filterTitle === "all" ? cls.active : ""}
            onClick={() => setFilterTitle("all")}
          >
            Все
          </button>
          <button
            className={filterTitle === "locker" ? cls.active : ""}
            onClick={() => setFilterTitle("locker")}
          >
            Закрытые
          </button>
          <button
            className={filterTitle === "unlocker" ? cls.active : ""}
            onClick={() => setFilterTitle("unlocker")}
          >
            Открытые
          </button>
        </div>

        {achievements.length === 0 ? (
          <p className={cls.achievements_empty}>Ачивок пока нет</p>
        ) : (
          <div className={cls.achievements_grid}>
            {filterAchievments.map((item) => {
              const isUnlocked = Boolean(item?.isUnlockedByMe);
              const isUrl =
                typeof item?.iconUrl === "string" &&
                (item.iconUrl.startsWith("http") ||
                  item.iconUrl.startsWith("/"));

              return (
                <div
                  onClick={() => {
                    if (isUnlocked) {
                      setSelectedId(item?.id);
                    } else {
                      toast.warning(
                        "Почти у цели! Условия для этой ачивки пока не выполнены",
                        { autoClose: 2500, style: { width: "550px" } },
                      );
                    }
                  }}
                  key={item?.id || item?.code}
                  className={`${cls.achievement_card} ${
                    isUnlocked ? cls.unlocked : cls.locked
                  }`}
                >
                  <div className={cls.achievement_top}>
                    <div className={cls.achievement_icon}>
                      {isUrl ? (
                        <img src={item.iconUrl} alt={item?.title} />
                      ) : item?.iconUrl ? (
                        <span>{item.iconUrl}</span>
                      ) : (
                        <FaTrophy />
                      )}
                    </div>
                    <div className={cls.achievement_meta}>
                      {item?.points != null && (
                        <span className={cls.achievement_points}>
                          <FaStar /> +{item.points}
                        </span>
                      )}
                      <span
                        className={`${cls.achievement_status} ${
                          isUnlocked ? cls.status_unlocked : cls.status_locked
                        }`}
                      >
                        {isUnlocked ? (
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

                  <div className={cls.achievement_body}>
                    <h3>{item?.title || "Без названия"}</h3>
                    <p>{item?.description || item?.criteria || ""}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedId && (
        <ProfileAchievementsDetail
          achievementId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
};
