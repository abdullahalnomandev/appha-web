// OfferModal.tsx
"use client";

import { FC } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { UploadProps } from "antd";

interface OfferModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: { title?: string; description?: string; image?: any };
  onSubmit: (values: any) => void;
}

const OfferModal: FC<OfferModalProps> = ({
  open,
  onClose,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      console.log(file);
      return false;
    },
  };

  return (
    <Modal
      title={<span className="bg-transparent">Submit New Offer</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      styles={{ content: { backgroundColor: "#0f172a" } }}
    >
      <p className="text-sm! text-gray-400! mb-5!">
        All content is subject to approval before being published.
      </p>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || { title: "", description: "" }}
        onFinish={(values) => {
          if (!values.title?.trim()) {
            toast.error("Please enter an offer title");
            return;
          }
          onSubmit(values);
          form.resetFields();
        }}
      >
        <Form.Item
          label={<span className="text-white">Offer Title</span>}
          name="title"
          rules={[{ required: true, message: "Please enter the offer title" }]}
        >
          <Input
            placeholder="e.g., 20% Off Premium Detailing Service"
            className="bg-slate-900! text-sm! text-white! placeholder:text-gray-500! border-slate-700! focus:border-yellow-400!"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-white!">Description</span>}
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Describe your offer in detail..."
            className="bg-slate-900! text-white! placeholder:text-gray-500! border-slate-700! focus:border-yellow-400! resize-none!"
          />
        </Form.Item>

        <Form.Item label={<span className="text-white!">Offer Image</span>} name="image">
          <Upload.Dragger
            {...uploadProps}
            className="bg-slate-900! border-slate-700! rounded-lg!"
          >
            <div className="py-6 flex flex-col items-center justify-center">
              <Plus className="w-5 h-5 text-gray-400 mb-2" />
              <span className="text-xs text-gray-400!">
                Click or drag image here to upload
              </span>
            </div>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" className="w-full" htmlType="submit">
            Submit for Review
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OfferModal;
