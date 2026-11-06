import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import cls from "../components/footer.module.scss";

export const Loader = () => {
  return (
    <>
    <div className={cls.loader}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 80, color: '#8b5cf6'}} spin />} />
    </div>
    </>
  );
};
