import cls from "../../../../src/pages/MainPage/styles/main.module.scss";
import { Loader } from "../../../components/Loader.jsx";
import { useMe } from "../../../hooks/useMe.js";
import { MainStudyInfo } from "./MainStudyInfo.jsx";

export const MainList = () => {
  
    const {isPending, data, isError, error} = useMe()




    if (isPending) return (<Loader/>)
  return (
    <div className={cls.main}>
      <div className={cls.main_container}>
        <div className={cls.title}>
          <h1>{`Здравствуйте, ${data?.user?.name || 'Пользователь'}👋 `}</h1>
        </div>
        <div>
          <MainStudyInfo name={data?.user?.name || 'Пользователь'} />
        </div>
      </div>
    </div>
  );
};
