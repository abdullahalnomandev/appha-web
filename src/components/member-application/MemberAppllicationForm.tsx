"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Button,
  Upload,
  Row,
  Col,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { BsUpload } from "react-icons/bs";
import { Rule } from "antd/es/form";

const { TextArea } = Input;

/* -------------------- Reusable Section Header -------------------- */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="w-full pb-2 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b border-[#EDD7B3]">
      {title}
    </h2>
  </div>
);

/* -------------------- Field Configs -------------------- */
const primaryMemberFields = [
  {
    name: "firstName",
    label: "First Name",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "lastName",
    label: "Last Name",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "jobTitle",
    label: "Job Title / Role",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "company",
    label: "Company / Organization",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "email",
    label: "Email Address",
    span: 12,
    rules: [{ required: true, type: "email" }],
  },
  {
    name: "mobile",
    label: "Mobile Number",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "nationality",
    label: "Nationality",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "country",
    label: "Country of Residence",
    span: 24,
    rules: [{ required: true }],
  },
  {
    name: "address",
    label: "Residential Address",
    type: "textarea",
    span: 24,
    rows: 3,
    rules: [{ required: true }],
  },
];

const professionalFields = [
  {
    name: "industrySector",
    label: "Industry Sector",
    type: "select",
    span: 12,
    options: [
      "Automotive Sales",
      "Automotive Service",
      "Parts & Accessories",
      "Insurance",
      "Finance & Leasing",
      "Other",
    ],
    rules: [{ required: true }],
  },
  {
    name: "experience",
    label: "Years of Experience",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "employer",
    label: "Current Employer",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "workLocation",
    label: "Work Location",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "annualIncome",
    label: "Annual Gross Salary (AED)",
    type: "number",
    span: 24,
    rules: [{ required: true }],
  },
];

const membershipTypes = [
  { value: "individual", label: "Individual Membership" },
  { value: "family", label: "Family Membership" },
];

const benefitsInterests = [
  { value: "networking", label: "Social Networking Events" },
  { value: "sports", label: "Sports & Fitness" },
  { value: "family", label: "Family & Leisure Activities" },
  { value: "travel", label: "Travel & Hospitality" },
  { value: "automotive", label: "Automotive & Motorsport" },
  { value: "lifestyle", label: "Lifestyle & Wellness" },
];

/* -------------------- Component -------------------- */
export default function MemberApplicationForm() {
  const [form] = Form.useForm();
  const [emiratesIdFile, setEmiratesIdFile] = useState<UploadFile[]>([]);
  const [passportFile, setPassportFile] = useState<UploadFile[]>([]);

  const handleUpload = (
    file: UploadFile,
    setFile: React.Dispatch<React.SetStateAction<UploadFile[]>>,
  ) => {
    setFile([file]);
    return false;
  };

  const onFinish = (values: any) => {
    console.log(values);
    message.success("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Primary Info */}
          <SectionHeader title="Primary Member Information" />
          <Row gutter={16}>
            {primaryMemberFields.map((field) => (
              <Col xs={24} md={field.span} key={field.name}>
                <Form.Item
                  label={field.label}
                  name={field.name}
                  rules={field.rules as Rule[]}
                >
                  {field.type === "textarea" ? (
                    <TextArea
                      rows={field.rows}
                      className="rounded-md bg-[#F1F1F1]! border-none"
                    />
                  ) : field.type === "date" ? (
                    <DatePicker
                      size="large"
                      className="w-full rounded-md bg-[#F1F1F1]! border-none"
                    />
                  ) : (
                    <Input
                      size="large"
                      className="rounded-md bg-[#F1F1F1]! border-none"
                    />
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>

          {/* Professional */}
          <div className="pt-6">
            <SectionHeader title="Professional Background" />
            <Row gutter={16}>
              {professionalFields.map((field) => (
                <Col xs={24} md={field.span} key={field.name}>
                  <Form.Item
                    label={field.label}
                    name={field.name}
                    rules={field.rules}
                  >
                    {field.type === "select" ? (
                      <Select
                        size="large"
                        className="[&_.ant-select-selector]:bg-[#F1F1F1]! [&_.ant-select-selector]:rounded-md [&_.ant-select-selector]:border-none"
                      >
                        {field.options?.map((opt) => (
                          <Select.Option key={opt} value={opt}>
                            {opt}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        type={field.type === "number" ? "number" : "text"}
                        size="large"
                        className="rounded-md bg-[#F1F1F1]! border-none"
                      />
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </div>

          {/* Membership Type */}
          <div className="pt-6">
            <SectionHeader title="Membership Type" />
            <Form.Item name="membershipType" rules={[{ required: true }]}>
              <Radio.Group className="flex flex-col gap-3">
                {membershipTypes.map((t) => (
                  <Radio key={t.value} value={t.value}>
                    {t.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Interests */}
          <div className="pt-6">
            <SectionHeader title="Benefits & Lifestyle Interests" />
            <Form.Item name="interests" rules={[{ required: true }]}>
              <Checkbox.Group className="flex flex-col gap-3">
                {benefitsInterests.map((i) => (
                  <Checkbox key={i.value} value={i.value}>
                    {i.label}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="pt-6">
            <SectionHeader title="Required Documentation" />
            <Row gutter={[16, 16]}>
              {/* Emirates ID */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Emirates ID"
                  name="emiratesId"
                  rules={[
                    { required: true, message: "Emirates ID is required" },
                  ]}
                  className="w-full"
                >
                  <Upload.Dragger
                    className="py-16 md:py-20"
                    beforeUpload={(file) =>
                      handleUpload(file, setEmiratesIdFile)
                    }
                    fileList={emiratesIdFile}
                    onRemove={() => setEmiratesIdFile([])}
                    maxCount={1}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 h-full">
                      <BsUpload className="text-3xl text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-0 text-center">
                        Emirates ID (Front & Back)
                      </p>
                      <p className="text-xs text-amber">
                        Click or drag to upload
                      </p>
                    </div>
                  </Upload.Dragger>
                </Form.Item>
              </Col>

              {/* Passport */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Passport"
                  name="passport"
                  rules={[{ required: true, message: "Passport is required" }]}
                  className="w-full"
                >
                  <Upload.Dragger
                    className="py-16 md:py-20"
                    beforeUpload={(file) => handleUpload(file, setPassportFile)}
                    fileList={passportFile}
                    onRemove={() => setPassportFile([])}
                    maxCount={1}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 h-full">
                      <BsUpload className="text-3xl text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-0 text-center">
                        Passport Photo (Primary Member)
                      </p>
                      <p className="text-xs text-amber">
                        Click or drag to upload
                      </p>
                    </div>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="bg-muted rounded-lg p-6 bg-[#F1F1F1]">
            <h2 className="text-xl font-bold mb-4 text-black">
              Membership Acknowledgment
            </h2>

            <Form.Item
              name="confirmAccuracy"
              valuePropName="checked"
              rules={[{ required: true, message: "Please confirm accuracy" }]}
              className="mb-2"
            >
              <Checkbox className="text-sm">
                I confirm that the information provided is accurate and complete
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="agreeTerms"
              valuePropName="checked"
              rules={[{ required: true, message: "Please agree to the terms" }]}
              className="mb-0"
            >
              <Checkbox className="text-sm">
                I have read & agree to the ALPHA Membership terms & condition
              </Checkbox>
            </Form.Item>
          </div>
          {/* Submit */}
          <div className="pt-8">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="h-12 text-base font-semibold rounded-md"
            >
              Submit Application
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
