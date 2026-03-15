"use client";
import { useState } from "react";
import { Form, Input, Select, Button, Rate, message as antdMessage } from "antd";
import { MessageSquare } from "lucide-react";
import { apiFetch } from "@/lib/api/api-fech";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

const FeedbackTab = ({
  data,
  searchTerm,
}: {
  data: { name: string; _id: string; email: string; partnerShipId: string }[];
  searchTerm: string;
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const { partner, rating, comment } = values;

    if (!partner || !rating || !comment) {
      antdMessage.error("Please fill all fields and select a rating.");
      return;
    }

    const feedbackData = {
      partner,
      rating,
      comment,
    };

    try {
      await apiFetch("/feedback", {
        method: "POST",
        body: JSON.stringify(feedbackData),
      });
      antdMessage.success("Feedback submitted! Thank you for helping us improve.");
      form.resetFields();
    } catch (error) {
      console.error(error);
      antdMessage.error("Failed to submit feedback. Please try again.");
    }
  };


  const handleSearch = (text: string) => {
    router.push(
      `/member/feedback?searchTerm=${encodeURIComponent(text)}` // reset to page 1
    );
  };
  return (
    <div className="p-6 rounded-lg max-w-xl mx-auto">
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
        className="rounded-lg! p-6! border! border-gray-200! shadow-sm!"
      >
        <Form.Item
          name="partner"
          label="Partner / Service"
          rules={[{ required: true, message: "Please select a partner" }]}
        >
          <Select
            placeholder="Select a partner"
            allowClear
            showSearch
            value={form.getFieldValue("partner") || undefined} // bind to form state
            onSearch={handleSearch} // updates URL when typing
            onChange={(value) => form.setFieldsValue({ partner: value })} // update form when option selected
            filterOption={false} // disable built-in filter, rely on backend search
          >
            {data?.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
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
          name="comment"
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
            style={{
              background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)",
              border: "none",
              color: "#000",
            }}
          >
            <MessageSquare className="w-4 h-4" /> Submit Feedback
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackTab;