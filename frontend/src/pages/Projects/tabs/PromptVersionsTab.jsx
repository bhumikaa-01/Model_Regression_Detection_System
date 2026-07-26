import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  BranchesOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const PromptVersionsTab = ({ project }) => {
  const promptVersions = [
    {
      id: "PV-001",
      version: "v2.4",
      model: project.model,
      author: "Bhumika Rawate",
      score: "99.4%",
      status: "Active",
      created: "26 Jul 2026",
    },
    {
      id: "PV-002",
      version: "v2.3",
      model: project.model,
      author: "AI Team",
      score: "98.9%",
      status: "Archived",
      created: "22 Jul 2026",
    },
    {
      id: "PV-003",
      version: "v2.2",
      model: project.model,
      author: "AI Team",
      score: "98.1%",
      status: "Archived",
      created: "18 Jul 2026",
    },
    {
      id: "PV-004",
      version: "v2.1",
      model: project.model,
      author: "AI Team",
      score: "97.8%",
      status: "Archived",
      created: "12 Jul 2026",
    },
  ];

  const columns = [
    {
      title: "Version",
      dataIndex: "version",
      render: (value) => (
        <Space>
          <BranchesOutlined />
          <Text strong>{value}</Text>
        </Space>
      ),
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Prompt Score",
      dataIndex: "score",
    },
    {
      title: "Created",
      dataIndex: "created",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "Active" ? (
          <Tag
            color="success"
            icon={<CheckCircleOutlined />}
          >
            ACTIVE
          </Tag>
        ) : (
          <Tag
            color="default"
            icon={<ClockCircleOutlined />}
          >
            ARCHIVED
          </Tag>
        ),
    },
    {
      title: "Action",
      render: () => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%" }}
    >
      <Card>
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text strong>
              Prompt Version History
            </Text>

            <br />

            <Text type="secondary">
              Track prompt evolution and compare
              performance across versions.
            </Text>
          </div>

          <Tag color="blue">
            {project.promptVersions} Versions
          </Tag>
        </Space>
      </Card>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={promptVersions}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      </Card>
    </Space>
  );
};

PromptVersionsTab.propTypes = {
  project: PropTypes.object.isRequired,
};

export default PromptVersionsTab;