import { useIsFetching } from "@tanstack/react-query";
import cls from "../components/footer.module.scss";



export const Footer = () => {

  const isFetching = useIsFetching();

  if (isFetching > 0) return null
  
  return (



    <>
      <div className={cls.footer}>
        <p>
          © 2026 MertsPlatform. All rights reserved. Designed and developed by
          Ular.
        </p>
      </div>
    </>
  );
};
