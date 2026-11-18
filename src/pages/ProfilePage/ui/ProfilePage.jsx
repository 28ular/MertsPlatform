import cls from "../../../../src/pages/ProfilePage/styles/profile.module.scss";
import { FaUser } from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { ProfileBanner } from "./ProfileBanner.jsx";
import { useMe } from "../../../hooks/useMe.js";
import { toast } from "react-toastify";
import { Loader } from "./../../../components/Loader";
import { ProfileUserInfos } from "./ProfileUserInfos.jsx";
import { ProfileTelegramConnect } from "./ProfileTelegramConnect.jsx";
import { uploadAvatar } from "../../../../api/sendProfile.js";
import { useState } from "react";
import { Spin } from "antd";

export const ProfilePage = () => {

  const [loading, setLoading] = useState(false);
  
  const { data,  isPending , refetch} = useMe();
  console.log(isPending);

  const datas = data?.user;
  console.log(datas);

  if (isPending) return <Loader />;

  const avatar = datas?.avatarUrl

  const apiOrigin = new URL(import.meta.env.VITE_API_URL).origin;
  const avatarSrc = avatar?.startsWith("/") ? `${apiOrigin}${avatar}` : avatar || "";

   const stylesFn = {
    indicator: {
      color: "#8b5cf6",
    },
  };
  return (
    <>
      <ProfileBanner  banner={datas?.bannerUrl} refetch={refetch} />
      <div className={cls.profile}>
        <div className={cls.profile_info}>
          <div className={cls.profile_infos} data-aos="fade-up">
            <div
              className={cls.profile_avatar}
              style={{ backgroundImage: `url(${avatarSrc})` }}
            >
              <label className={cls.profiel_change}>
                { loading ? <Spin
                        styles={stylesFn}
                        style={{ marginLeft: "10px" }}
                        size="small"
                      /> : 'Выбрать фото' }
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setLoading(true);
                                try {
                                  await uploadAvatar(file);
                                  await refetch?.();
                                } finally {
                                  setLoading(false);
                                }
                              }}
                  className={cls.file}
                />
              </label>
            </div>
            <div className={cls.profile_statistic_info}>
              <div
                onClick={() =>
                  toast.success("Это ваш статус!", { autoClose: 1000 })
                }
                className={cls.profile_student}
              >
                Студент
              </div>
            </div>
            <div className={cls.profile_custom}>
              <div className={cls.profile_custom_infos}>
                <div className={cls.custom_info}>
                  <div className={cls.custom_info_content}>
                    <FaUser />
                    {datas?.name || "ничего"}
                  </div>
                  <div className={cls.custom_info_content}>
                    <RiTelegram2Line />
                    {data?.telegramUsername
                      ? data.telegramUsername
                      : "не привязон"}
                  </div>
                  <div className={cls.custom_info_content}>
                    <FaPeopleGroup />
                    {datas?.groupId
                      ? String(datas.groupId).length >= 7
                        ? `${String(datas.groupId).slice(0, 6)}...`
                        : datas.groupId
                      : "ничего"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileUserInfos data={datas} />
       <ProfileTelegramConnect
        isConnected={Boolean(data?.isTelegramConnected ?? datas?.isTelegramConnected)}
        telegramUsername={data?.telegramUsername ?? datas?.telegramUsername}
        refetch={refetch}
      />
    </>
  );
};
