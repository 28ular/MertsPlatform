import { useState } from "react";
import { uploadBanner } from "../../../../api/sendProfile.js";
import cls from "../styles/profile.module.scss";
import { Spin } from "antd";

export const ProfileBanner = ({ banner, refetch }) => {
  const [loading, setLoading] = useState(false);
  const apiOrigin = new URL(import.meta.env.VITE_API_URL).origin;
  const bannerSrc = banner?.startsWith("/")
    ? `${apiOrigin}${banner}`
    : banner || "";

  const stylesFn = {
    indicator: {
      color: "#8b5cf6",
    },
  };
  return (
    <>
      <div
        className={cls.banner}
        data-aos="zoom-in"
        style={{ backgroundImage: `url(${bannerSrc})` }}
      >
        <label className={cls.banner_btn}>
          {loading ? (
            <>
              <p>Загрузка баннера </p>
              <Spin
                styles={stylesFn}
                style={{ marginLeft: "10px" }}
                size="small"
              />
            </>
          ) : (
            "Изменить обложку"
          )}
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setLoading(true);
              try {
                await uploadBanner(file);
                await refetch?.();
              } finally {
                setLoading(false);
              }
            }}
          />
        </label>
      </div>
    </>
  );
};
