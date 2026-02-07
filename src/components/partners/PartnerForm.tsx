'use client'
import { Form, Input, Button, Card } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function PartnerForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl">
        <div className="p-6 md:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <MailOutlined className="text-3xl text-gray-500" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Partner Enquiry
            </h1>
            <p className="text-gray-600">
              Interested in partnering with ALPHA? Get in touch with us
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={true}
            className="partner-form"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true, message: 'Please enter company name' }]}
              >
                <Input size="large" placeholder="" className="rounded-md" />
              </Form.Item>

              <Form.Item
                label="Industry"
                name="industry"
                rules={[{ required: true, message: 'Please enter industry' }]}
              >
                <Input size="large" placeholder="" className="rounded-md" />
              </Form.Item>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                label="Contact Name"
                name="contactName"
                rules={[{ required: true, message: 'Please enter contact name' }]}
              >
                <Input size="large" placeholder="" className="rounded-md" />
              </Form.Item>

              <Form.Item
                label="Contact Email"
                name="contactEmail"
                rules={[
                  { required: true, message: 'Please enter contact email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input size="large" placeholder="" className="rounded-md" />
              </Form.Item>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                label="Contact Phone"
                name="contactPhone"
                rules={[{ required: true, message: 'Please enter contact phone' }]}
              >
                <Input size="large" placeholder="" className="rounded-md" />
              </Form.Item>

              <Form.Item
                label="Website"
                name="website"
                rules={[
                  { required: true, message: 'Please enter website' },
                  { type: 'url', message: 'Please enter a valid URL' },
                ]}
              >
                <Input size="large" placeholder="" className="rounded-md" />
              </Form.Item>
            </div>

            {/* Message */}
            <Form.Item
              label="Tell us about your business and partnership interest"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea rows={5} placeholder="" className="rounded-md" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="mb-0">
              <div className="flex justify-end pt-4">
                <Button type="primary" size="large" htmlType="submit" className="px-8 h-12 rounded-md font-medium">
                  Submit Partnership Enquiry
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
}
