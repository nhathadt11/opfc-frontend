import React, { Component } from 'react';
import {
  Form, Input, Rate, Button,
} from 'antd';
import './ReviewForm.css';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

class ReviewForm extends Component {
  state = {

  }

  render() {
    return (
      <Form layout="horizontal" className="opfc-review-form">
        <Form.Item label="Title" {...formItemLayout}>
          <Input />
        </Form.Item>
        <Form.Item label="Rating" {...formItemLayout}>
          <Rate />
        </Form.Item>
        <Form.Item label="Content" {...formItemLayout}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label=" " {...formItemLayout} className="opfc-post-comment">
          <Button type="primary">Post Comment</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ReviewForm;
