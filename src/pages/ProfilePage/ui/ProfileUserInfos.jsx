import cls from "../styles/profile.module.scss";

export const ProfileUserInfos = ({ data }) => {
  console.log(`вот дата с бр ${data}`);

  return (
    <>
      <div className={cls.infos} data-aos={"fade-up"} data-aos-delay={"200"}>
        <div className={cls.infos_items}>
          <div className={cls.infos_item}>
            <p>Всего баллов</p>
            <span>{data?.ша || 0} </span>
          </div>

          <div className={cls.infos_item}>
            <p>Принятых заданий</p>
            <span>{data?.br || 0}</span>
          </div>

          <div className={cls.infos_item}>
            <p> Ударный режим </p>
            <span>{data?.streakCount}</span>
          </div>

          <div className={cls.infos_item}>
            <p>Текущий месяц</p>
            <span>{data?.currentMonth}</span>
          </div>
        </div>
      </div>
    </>
  );
};
