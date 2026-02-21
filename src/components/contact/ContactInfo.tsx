"use client";
import { use, useState } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { clientFetch } from "@/lib/client-fetch";
import { apiFetch, getImage } from "@/lib/api/api-fech";
const { TextArea } = Input;

const contactUs = apiFetch("/contact-us?page=1&limit=10", {
  method: "GET",
  cache: "no-store",
}, 'client');

function ContactInfo() {
  const [form] = Form.useForm();
  const [msgApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);


  const getContactUs = use(contactUs);


  // Contact cards configuration
  const contactCards = [
    {
      icon: <MailOutlined className="text-xl text-blue-500" />,
      title: "Email",
      content: (
        <a
          href="mailto:info@example.com"
          className="text-yellow-500 hover:text-yellow-600 no-underline"
        >
          info@example.com
        </a>
      ),
    },
    {
      icon: <PhoneOutlined className="text-xl text-green-500" />,
      title: "Phone (WhatsApp)",
      content: <div className="text-gray-600">+971 XX XXX XXXX</div>,
    },
    {
      icon: <ClockCircleOutlined className="text-xl text-yellow-500" />,
      title: "Opening Hours",
      content: (
        <>
          <div className="text-gray-600">Monday - Friday</div>
          <div className="text-gray-600">9:00 AM - 5:00 PM</div>
        </>
      ),
    },
    {
      icon: <EnvironmentOutlined className="text-xl text-red-500" />,
      title: "Address",
      content: <div className="text-gray-600">United Arab Emirates</div>,
    },
  ];

  // Form fields configuration
  const formFields = [
    {
      name: "name",
      label: "Name",
      rules: [
        { required: true, message: "Please enter your name" },
        { min: 2, message: "Name must be at least 2 characters" },
      ],
      input: (
        <Input
          placeholder="Enter your name"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "memberShipId",
      label: "Membership Number",
      rules: [{ message: "Please enter your membership number" }],
      input: (
        <Input
          placeholder="Enter your membership number"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      input: (
        <Input placeholder="Enter your email" size="large" className="rounded-md" />
      ),
    },
    {
      name: "contact",
      label: "Phone Number",
      rules: [
        { required: true, message: "Please enter your phone number" },
        { pattern: /^[0-9+\s-()]+$/, message: "Please enter a valid phone number" },
      ],
      input: (
        <Input
          placeholder="Enter your phone number"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "message",
      label: "Message",
      rules: [
        { required: true, message: "Please enter your message" },
        { min: 10, message: "Message must be at least 10 characters" },
      ],
      input: (
        <TextArea
          rows={4}
          placeholder="Enter your message"
          size="large"
          className="rounded-md"
        />
      ),
    },
  ];

  // Handle form submission
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await apiFetch("/contact-form", {
        method: "POST",
        body: JSON.stringify(values),
      });
      msgApi.success("Message sent successfully!");
      form.resetFields();
    } catch (err: any) {
      console.error(err);
      msgApi.error(err.message || "Submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-5 max-w-7xl mx-auto">
      {contextHolder} {/* Required for dynamic AntD messages */}
      <Row gutter={[32, 32]}>
        {/* Left Side - Contact Information */}
        {/* Left Side - Contact Information */}
        <Col xs={24} md={10}>
          <h2 className="text-2xl text-black font-bold mb-6">
            Get in Touch
          </h2>

          {(getContactUs as any)?.data?.map((card: any) => (
            <Card
              key={card._id}
              variant="borderless"
              className="shadow-md! rounded-lg! mb-5!"
              style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
            >
              <div className="flex items-center gap-3">

                {/* Image instead of icon */}
                <img
                  src={getImage(card.image)}
                  alt={card.title}
                  className="w-10 h-10 object-contain"
                />

                <div>
                  <h4 className="font-semibold text-black">
                    {card.title}
                  </h4>

                  {/* Render HTML safely */}
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </Col>


        {/* Right Side - Contact Form */}
        <Col xs={24} md={14}>
          <Card
            className="shadow-md rounded-lg max-w-2xl"
            variant="borderless"
            style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Us Message</h3>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              {formFields.map((field) => (
                <Form.Item
                  key={field.name}
                  label={<span className="text-base font-medium">{field.label}</span>}
                  name={field.name}
                  rules={field.rules as import("antd/es/form").Rule[]}
                >
                  {field.input}
                </Form.Item>
              ))}

              <Form.Item className="text-right">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  className="h-12 text-base font-medium rounded-md"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ContactInfo;
