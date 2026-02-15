"use client";
import { PhoneInput } from "react-international-phone";
import { Suspense, use, useState } from "react";
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
import "react-international-phone/style.css";
import { clientFetch } from "@/lib/client-fetch";
import { title } from "process";
import Membership from "./MemberShip";
import { toast } from "sonner";
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
    name: "name",
    label: "Name",
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
    name: "organizationName",
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
    name: "countryOfResidence",
    label: "Country of Residence",
    span: 12,
    rules: [{ required: true }],
  },
  {
    name: "residenceAddress",
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
    name: "yearsOfExperience",
    label: "Years of Experience",
    span: 12,
    type: "number",
    rules: [{ required: true }],
  },
  {
    name: "currentEmployer",
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
    name: "annualGrossSalary",
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


interface Membership {
  title: string;
  membershipType: string;
  _id: string;
}
interface IMembershipType {
  data: Membership[]
}


const membershipPromise = clientFetch<IMembershipType>("/membership-plan", { cache: "force-cache" });

/* -------------------- Component -------------------- */
export default function MemberApplicationForm() {
  const [form] = Form.useForm();
  const [emiratesIdFile, setEmiratesIdFile] = useState<UploadFile[]>([]);
  const [passportFile, setPassportFile] = useState<UploadFile[]>([]);
  const [phone, setPhone] = useState("");

  console.log({emiratesIdFile, passportFile});

  // Client-side fetch using `use` (Suspense)
  const membershipType = use(membershipPromise);

  // Map membership data for Radio
  const organizeTypes = membershipType?.data?.map((type) => ({
    value: type._id,
    label: type.title,
    membershipType: type.membershipType,
  }));

  const handleUpload = (
    file: UploadFile,
    setFile: React.Dispatch<React.SetStateAction<UploadFile[]>>
  ) => {
    setFile([file]);
    return false;
  };

  // const onFinish = (values: any) => {
  //   const submission = { ...values, mobile: phone };
  //   console.log(submission);
  //   message.success("Application submitted successfully!");
  // };


  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("membershipType", values.membershipType);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", phone);
      formData.append("jobTitle", values.jobTitle);
      formData.append("organizationName", values.organizationName);
      formData.append("dateOfBirth", values.dateOfBirth?.toISOString());
      formData.append("nationality", values.nationality);
      formData.append("countryOfResidence", values.countryOfResidence);
      formData.append("residenceAddress", values.residenceAddress);
      formData.append("industrySector", values.industrySector);
      formData.append("yearsOfExperience", values.yearsOfExperience);
      formData.append("currentEmployer", values.currentEmployer);
      formData.append("workLocation", values.workLocation);
      formData.append("annualGrossSalary", values.annualGrossSalary);

      values.benefitsAndLifestyleInterests?.forEach((item: string) => {
        formData.append("benefitsAndLifestyleInterests", item);
      });

      formData.append("confirmAcknowledgement", values.confirmAcknowledgement);
      formData.append("confirmAgreement", values.confirmAgreement);

      if (!! emiratesIdFile[0]) {
        formData.append(
          "image",
          emiratesIdFile[0] as any
        );
      }

      if (passportFile[0]) {
        formData.append(
          "logo",
          passportFile[0] as any
        );
      }
      

      const response = await clientFetch("/membership-application/crate-from", {
        method: "POST",
        body: formData,
      });


      if (!!response) {
        message?.success("Application submitted successfully!");
        form.resetFields();
        setEmiratesIdFile([]);
        setPassportFile([]);
      }
    } catch (err) {
      toast.error(((err as Error)?.message) || "Submission failed!");
    }
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
                  ) : field.name === "mobile" ? (
                    <PhoneInput
                      defaultCountry="ae"
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputClassName="w-full rounded-md bg-[#F1F1F1] border-none"
                      placeholder="Mobile Number"
                      name="mobile"
                      required
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
            <Suspense fallback={<div>Loading membership types...</div>}>
              <Form.Item name="membershipType" rules={[{ required: true }]}>
                <Radio.Group className="flex flex-col gap-3">
                  {organizeTypes?.map((t) => (
                    <Radio key={t.value} value={t.membershipType}>
                      {t.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Suspense>
          </div>

          {/* Interests */}
          <div className="pt-6">
            <SectionHeader title="Benefits & Lifestyle Interests" />
            <Form.Item name="benefitsAndLifestyleInterests" rules={[{ required: true }]}>
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
                  name="image"
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
                  name="logo"
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
              name="confirmAcknowledgement"
              valuePropName="checked"
              rules={[{ required: true, message: "Please confirm accuracy" }]}
              className="mb-2"
            >
              <Checkbox className="text-sm">
                I confirm that the information provided is accurate and complete
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="confirmAgreement"
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
