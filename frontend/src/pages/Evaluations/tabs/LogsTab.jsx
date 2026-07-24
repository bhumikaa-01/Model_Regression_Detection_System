import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const LogsTab = ({ logs }) => {
  const getTagColor = (level) => {
    switch (level.toLowerCase()) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "processing";
    }
  };

  const getIcon = (level) => {
    switch (level.toLowerCase()) {
      case "success":
        return <CheckCircleOutlined />;
      case "warning":
        return <WarningOutlined />;
      case "error":
        return <CloseCircleOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 180,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 130,
      render: (level) => (
        <Tag
          icon={getIcon(level)}
          color={getTagColor(level)}
        >
          {level.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Component",
      dataIndex: "component",
      key: "component",
      width: 180,
      render: (component) => (
        <Text code>{component}</Text>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <Card
      title="Execution Logs"
      bordered={false}
    >
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size="large"
      >
        <Table
          rowKey={(record) =>
            `${record.time}-${record.message}`
          }
          columns={columns}
          dataSource={logs}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      </Space>
    </Card>
  );
};

LogsTab.propTypes = {
  logs: PropTypes.array.isRequired,
};

export default LogsTab;