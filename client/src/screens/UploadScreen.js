import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Modal,
  message
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from "axios";
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const UploadScreen = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileName, setFileName] = useState('');

  // const onChangeFile = e => {
  //   setFileName(e.target.files[0]);
  // }

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('brand', values.brand);
      formData.append('category', values.category);
      formData.append('price', values.price);
      formData.append('countInStock', values.countInStock);
      formData.append('description', values.description);
      formData.append('productImage', fileName);
      formData.append('slug', '');
      formData.append('rating', '');
      formData.append('review', '');
      const res = await axios.post("/api/upload-product", formData);
      console.log(res.data); // handle success response
      message.success('Product added successfully');
      form.resetFields();
      setFileName(null);
    } catch (error) {
      console.log(error.response.data); // handle error response
      message.error('Something went wrong');
    }
  };

  const handleChange = ({ fileName: newFileName }) => setFileName(newFileName);

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        encType="multipart/form-data"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Name"
          name="name" 
          rules={[
            {
              required: true,
              message: "Please enter a product name"
            },
          ]}
        >
          <Input 
          onChange/>
        </Form.Item>

        <Form.Item 
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Please enter a product brand"
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select a product category"
            },
          ]}
        >
          <Select>
            <Select.Option value="accessory">Accessory</Select.Option>
            <Select.Option value="game">Game</Select.Option>
            <Select.Option value="jewelry">Jewelry</Select.Option>
            <Select.Option value="clothing">Clothing</Select.Option>
            <Select.Option value="electronic">Electronic Device</Select.Option>
            <Select.Option value="school">School Supplies</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please enter the product price"
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="countInStock"
          rules={[
            {
              required: true,
              message: "Please enter the quantity avaiable for sale"
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please provide a description for the product"
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload"
          name="Image"
          rules={[
            {
              required: true,
              message: "Please upload a product image"
            },
          ]}
        >
          <Upload
            name="productImage"
            accept="image/*"
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
        </Modal>

        
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>

      </Form>
    </>
  );
}

export default UploadScreen;