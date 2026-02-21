import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { App, ConfigProvider } from "antd";

export default function AntProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <App>
    <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#e0b20b",
            },
          }}
        >
          {children}
        </ConfigProvider>
    </AntdRegistry>
      </App>
  );
}
