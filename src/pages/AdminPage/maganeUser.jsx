import React, { useEffect, useState } from "react";
import { Space, Table, message, Popconfirm } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/viewuserall") // Lấy danh sách người dùng
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching:", error);
        message.error("Không thể tải danh sách người dùng.");
      });
  }, []);

  // Xóa người dùng
  const deleteUser = (userId) => {
    console.log(userId);
    axios
      .delete(`/deleteuser/${userId}`) // Gửi yêu cầu xóa người dùng
      .then((response) => {
        message.success("Người dùng đã được xóa thành công!");
        // Cập nhật lại danh sách người dùng sau khi xóa
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        message.error("Có lỗi xảy ra khi xóa người dùng.");
      });
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      render: (number) => <a>{number}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => deleteUser(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="_id" />;
};

export default ManageUser;
