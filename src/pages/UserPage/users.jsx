import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../../util/api";

const HomePage = () => {
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      if (!res?.message) {
        setdataSource(res.data);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message,
        });
      }
    };
    fetchUser();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={"_id"} />;
    </div>
  );
};
export default HomePage;
