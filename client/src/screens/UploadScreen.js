import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadScreen = () => {
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  //const [fileName, setFileName] = useState('');
  const [fileList, setFileList] = useState([]);

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
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      // formData.append('status', values.name);
      formData.append('seller', userInfo._id);
      formData.append('category', values.category);
      formData.append('price', values.price);
      formData.append('countInStock', values.countInStock);
      formData.append('description', values.description);
      formData.append('productImage', fileList[0]);
      formData.append('slug', '');
      // if (fileList[0] instanceof File) {
      //   console.log("it is a File")
      // } else {
      //   console.log("it is not a File")
      // }

      const res = await axios.post(
        'http://localhost:4000/api/products/upload-product',
        formData
      );
      console.log(res.data); // handle success response
      console.log('added successfully');
      message.success('Product added successfully');
      //form.resetFields();
      //setFileName(null);
      setFileList([]);
    } catch (error) {
      console.log(error.response.data); // handle error response
      message.error('Something went wrong');
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      setFileList([...fileList, file]);
    }
    return !(isJpgOrPng && isLt2M);
  };

  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  return (
    <>
      <Helmet>
        <title>eBruin</title>
      </Helmet>
      <h1>Post item for sale</h1>
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
              message: 'Please enter a product name',
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
              message: 'Please select a product category',
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
              message: 'Please enter the product price',
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
              message: 'Please enter the quantity avaiable for sale',
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
              message: 'Please provide a description for the product',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload"
          name={'productImage'}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            return e?.fileList;
          }}
          rules={[
            {
              required: true,
              message: 'Please upload a product image',
            },
          ]}
        >
          <Upload
            maxCount={1}
            name="productImage"
            accept="image/*"
            listType="picture-card"
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            // onChange={handleChange}
          >
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

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
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
};

export default UploadScreen;
