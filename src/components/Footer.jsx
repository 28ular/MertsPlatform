import { useState } from "react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { claimEasterEgg } from "../../api/sendProfile.js";
import cls from "../components/footer.module.scss";

export const Footer = () => {
  const isFetching = useIsFetching();
  const queryClient = useQueryClient();
  const [clicks, setClicks] = useState(0);

  if (isFetching > 0) return null;

  const handleSecretClick = async () => {
    const next = clicks + 1;
    setClicks(next);

    if (next === 10) {
      try {
        await claimEasterEgg();
        queryClient.invalidateQueries({ queryKey: ["achievements"] });
        toast.success("Секретная ачивка «Любопытный хакер» получена!");
      } catch (e) {
        toast.info(e?.response?.data?.message || "Ачивка уже получена");
      }
    }
  };

  return (
    <>
      <div className={cls.footer}>
        <p onClick={handleSecretClick} style={{ cursor: "pointer" }}>
          © 2026 MertsPlatform. All rights reserved. Designed and developed by
          Ular.
        </p>
      </div>
    </>
  );
};
