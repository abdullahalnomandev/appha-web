"use client";

import { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { clientFetch } from "@/lib/client-fetch";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api/api-fech";
import { toast } from "sonner";
import { setAccessTokenToCookie } from "@/services/action.setTokenToCookie";
import { authKey } from "@/constants/storageKey";

function PartnerLoginContactInfo() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const res = await apiFetch("/auth/partner-login", {
        method: "POST",
        body: JSON.stringify(values),
      }) as { data: { token: string } } | null;

      console.log("res", res);
      if (res && res.data.token) {
        sessionStorage.setItem(authKey, res?.data.token);
        setAccessTokenToCookie(res?.data.token, { redirect: "/partner-dashboard" });
      }
      form.resetFields();

    } catch (err: any) {
      message.error(err.message || "Login failed!");
      // toast.error(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
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

            <h3 className="text-2xl font-bold mb-2 text-center">
              Welcome Back!
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Sign in to manage your offers and benefits.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ email: "hiyon20889@bitoini.com", password: "mH8@o@D1gWh8" }}
              autoComplete="off"
            >
              {formFields.map((field) => (
                <Form.Item
                  key={field.name}
                  label={
                    <span className="text-base text-gray-700">
                      {field.label}
                    </span>
                  }
                  name={field.name}
                  rules={field.rules as any}
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
