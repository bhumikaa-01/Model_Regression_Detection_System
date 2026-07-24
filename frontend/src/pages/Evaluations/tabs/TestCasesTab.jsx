import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Table,
  Tag,
  Typography,
  Progress,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const TestCasesTab = ({ testCases }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "passed":
        return "success";
      case "failed":
        return "error";
      default:
        return "warning";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "passed":
        return <CheckCircleOutlined />;
      case "failed":
        return <CloseCircleOutlined />;
      default:
        return <WarningOutlined />;
    }
  };

  const columns = [
    {
      title: "Test ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (id) => <Text code>{id}</Text>,
    },
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
      ellipsis: true,
    },
    {
      title: "Expected",
      dataIndex: "expected",
      key: "expected",
      ellipsis: true,
    },
    {
      title: "Actual",
      dataIndex: "actual",
      key: "actual",
      ellipsis: true,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: 180,
      render: (score) => (
        <Progress
          percent={score}
          size="small"
          strokeColor={
            score >= 95
              ? "#52c41a"
              : score >= 80
              ? "#faad14"
              : "#ff4d4f"
          }
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => (
        <Tag
          icon={getStatusIcon(status)}
          color={getStatusColor(status)}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <Card
      title="Evaluation Test Cases"
      bordered={false}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={testCases}
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
        }}
        scroll={{ x: 1200 }}
      />
    </Card>
  );
};

TestCasesTab.propTypes = {
  testCases: PropTypes.array.isRequired,
};

export default TestCasesTab;