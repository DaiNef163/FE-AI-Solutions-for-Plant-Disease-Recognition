import React from "react";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const onFinish = (values) => {
  console.log(values);
};
const CreateNews = () => (
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item name={["user", "name"]} label="Title">
      <Input />
    </Form.Item>

    <Form.Item name={""} label="Website">
      <Input />
    </Form.Item>
    <Form.Item name={""} label="Introduction">
      <Input.TextArea />
    </Form.Item>
    <div className=" flex justify-center items-center">
      <Form.Item
        label="Ảnh sản phẩm"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action="/upload.do"
          listType="picture-card"
          className="p-2 border-2 border-dashed"
        >
          <button
            className="bg-transparent border-0 hover:bg-gray-200 p-2"
            type="button"
          >
            <PlusOutlined />
            <div className="mt-2 text-sm">Upload</div>
          </button>
        </Upload>
      </Form.Item>
    </div>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default CreateNews;
