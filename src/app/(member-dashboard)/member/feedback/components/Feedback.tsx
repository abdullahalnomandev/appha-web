"use client";
import { useState } from "react";
import { Form, Input, Select, Button, Rate, message as antdMessage } from "antd";
import { MessageSquare } from "lucide-react";

const { TextArea } = Input;

const FeedbackTab = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const { partner, rating, message } = values;

    if (!partner || !rating || !message) {
      antdMessage.error("Please fill all fields and select a rating.");
      return;
    }

    antdMessage.success("Feedback submitted! Thank you for helping us improve.");
    form.resetFields();
  };

  return (
    <div className="p-6 rounded-lg! max-w-xl! mx-auto!">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Share Your Feedback</h3>
        <p className="text-sm text-gray-500">
          Help us and our partners deliver a better experience
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className=" rounded-lg! p-6! border border-gray-200 shadow-sm"
      >
        <Form.Item
          name="partner"
          label="Partner / Service"
          rules={[{ required: true, message: "Please select a partner" }]}
        >
          <Select placeholder="Select a partner" allowClear>
            <Select.Option value="AutoSpa Detailing">AutoSpa Detailing</Select.Option>
            <Select.Option value="Azure Beach Club">Azure Beach Club</Select.Option>
            <Select.Option value="FitPro Gym">FitPro Gym</Select.Option>
            <Select.Option value="La Maison Restaurant">La Maison Restaurant</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please select a rating" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name="message"
          label="Your Feedback"
          rules={[{ required: true, message: "Please write your feedback" }]}
        >
          <TextArea rows={4} placeholder="Share your experience..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center gap-2"
            style={{ background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)", border: "none", color: "#000" }}
          >
            <MessageSquare className="w-4 h-4" /> Submit Feedback
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackTab;