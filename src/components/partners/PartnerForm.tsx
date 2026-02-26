'use client'

import { useState } from 'react';
import { Form, Input, Button, Card, message, Row, Col, Upload, UploadFile } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { apiFetch } from '@/lib/api/api-fech';
import { PhoneInput } from 'react-international-phone';
import "react-international-phone/style.css";
import { BsUpload } from 'react-icons/bs';

const { TextArea } = Input;

export default function PartnerForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<UploadFile[]>([]);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [touchedPhone, setTouchedPhone] = useState(false);

  const msgApi = message;

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await apiFetch("/partner-request", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, contactPhone: phone }),
      });
      msgApi.success("Message sent successfully!");
      form.resetFields();
      setPhone("");
      setProfileImageFile([]);
      setProfilePreview(null);
    } catch (err: any) {
      console.error(err);
      msgApi.error(err.message || "Submission failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpload = (file: UploadFile) => {
    setProfileImageFile([file]);

    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => setProfilePreview(reader.result as string);

    return false; // prevent auto upload
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
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
            requiredMark
          >
            {/* Profile Image */}
            <Row gutter={16} className="mb-6">
              <Col xs={24} md={12}>
                <Form.Item
                  label="Profile Image"
                  name="profileImage"
                  rules={[{ required: true, message: "Profile Image is required" }]}
                >
                  <Upload
                    className="relative w-32 h-32 mx-auto rounded-full border-2 bg-[#F1F1F1]! border-gray-300 hover:border-yellow-400 flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer"
                    beforeUpload={handleProfileUpload}
                    fileList={profileImageFile}
                    onRemove={() => {
                      setProfileImageFile([]);
                      setProfilePreview(null);
                    }}
                    maxCount={1}
                    accept="image/*"
                    showUploadList={false}
                  >
                    {profilePreview ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <img
                          src={profilePreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                          <p className="text-white text-sm">Change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center text-gray-400 px-4">
                        <BsUpload className="text-xl mb-2" />
                        <p className="text-sm font-medium">Upload Profile Image</p>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            {/* Row 1 */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Company Name"
                  name="companyName"
                  rules={[{ required: true, message: 'Please enter company name' }]}
                >
                  <Input size="large" className="rounded-md" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Industry"
                  name="industry"
                  rules={[{ required: true, message: 'Please enter industry' }]}
                >
                  <Input size="large" className="rounded-md" />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact Name"
                  name="contactName"
                  rules={[{ required: true, message: 'Please enter contact name' }]}
                >
                  <Input size="large" className="rounded-md" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact Email"
                  name="contactEmail"
                  rules={[
                    { required: true, message: 'Please enter contact email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input size="large" className="rounded-md" />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 3 - Phone + Website */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact Phone"
                  required
                  validateStatus={phoneError ? "error" : ""}
                  help={phoneError}
                >
                  <PhoneInput
                    defaultCountry="ae"
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                      setTouchedPhone(true);

                      // live validation
                      const digits = value.replace(/\D/g, "");
                      if (digits.length < 7) {
                        setPhoneError("Phone number is required");
                      } else {
                        setPhoneError(null);
                      }
                    }}
                    inputClassName="w-full !rounded-md !rounded-l-none !bg-white border-none !h-10 px-3"
                    placeholder="Mobile Number"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Website"
                  name="website"
                  rules={[
                    { required: true, message: 'Please enter website' },
                    { type: 'url', message: 'Please enter a valid URL' },
                  ]}
                >
                  <Input size="large" className="rounded-md" />
                </Form.Item>
              </Col>
            </Row>

            {/* Message */}
            <Form.Item
              label="Tell us about your business and partnership interest"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea rows={5} className="rounded-md" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="mb-0">
              <div className="flex justify-end pt-4">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="px-8 h-12 rounded-md font-medium"
                  loading={loading}
                >
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