"use client";
import { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { clientFetch } from "@/lib/client-fetch";
import { toast } from "sonner";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

function PartnerLoginContactInfo() {
  const [form] = Form.useForm();
  const [msgApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Form fields configuration: only email and password
  const formFields = [
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      input: (
        <Input
          placeholder="Enter your email"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "password",
      label: "Password",
      rules: [{ required: true, message: "Please enter your password" }],
      input: (
        <Input.Password
          placeholder="Enter your password"
          size="large"
          className="rounded-md"
        />
      ),
    },
  ];

  // Handle form submission
  const onFinish = async (values: any) => {
    console.log(values);
    router.push("/partner-dashboard");
    // setLoading(true);
    // try {
    //   await clientFetch("/partner/login", {
    //     method: "POST",
    //     body: JSON.stringify(values),
    //   });
    //   toast.success("Login successful!");
    //   form.resetFields();
    // } catch (err: any) {
    //   toast.error(err.message || "Login failed!");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="py-16 px-5">
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={14}>
          <Card
            className="shadow-md rounded-lg max-w-lg mx-auto!"
            variant="borderless"
            style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
          >
             <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-7 h-7 text-yellow-400" />
              </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Welcome Back!</h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Sign in to manage your offers and benefits.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              {formFields.map((field) => (
                <Form.Item
                  key={field.name}
                  label={<span className="text-base text-gray-700">{field.label}</span>}
                  name={field.name}
                  rules={field.rules as import("antd/es/form").Rule[]}
                >
                  {field.input}
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  className="h-12 text-base font-medium rounded-md w-full"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/partners" className="text-yellow-400! font-medium">
                  Apply here
                </Link>
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PartnerLoginContactInfo;
