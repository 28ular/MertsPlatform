import cls from "../../src/pages/ProfilePage/styles/profile.module.scss";
import { useMe } from "../hooks/useMe.js";
export const ProfileImgMobile = () => {

  const { data } =useMe();

  return (
    <div
      className={cls.profile_mobile}
      style={{ backgroundImage: `url(${data?.user?.avatarUrl})` }}
    ></div>
  );
};
