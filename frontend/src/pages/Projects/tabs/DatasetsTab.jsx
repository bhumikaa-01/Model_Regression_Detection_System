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
  DatabaseOutlined,
  EyeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const DatasetsTab = ({ project }) => {
  const datasets = [
    {
      id: "DS-001",
      name: "Golden Dataset v2",
      type: "Evaluation",
      samples: 1250,
      quality: "99.2%",
      updated: "26 Jul 2026",
      status: "Active",
    },
    {
      id: "DS-002",
      name: "Regression Suite",
      type: "Regression",
      samples: 850,
      quality: "98.6%",
      updated: "22 Jul 2026",
      status: "Active",
    },
    {
      id: "DS-003",
      name: "Production Logs",
      type: "Production",
      samples: 5400,
      quality: "97.9%",
      updated: "20 Jul 2026",
      status: "Archived",
    },
  ];

  const columns = [
    {
      title: "Dataset",
      dataIndex: "name",
      render: (value) => (
        <Space>
          <DatabaseOutlined />
          <Text strong>{value}</Text>
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Samples",
      dataIndex: "samples",
    },
    {
      title: "Quality",
      dataIndex: "quality",
    },
    {
      title: "Last Updated",
      dataIndex: "updated",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "Active"
              ? "success"
              : "default"
          }
          icon={<CheckCircleOutlined />}
        >
          {status.toUpperCase()}
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
          View
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
              Project Datasets
            </Text>

            <br />

            <Text type="secondary">
              Datasets associated with this
              project.
            </Text>
          </div>

          <Tag color="blue">
            {project.datasets} Datasets
          </Tag>
        </Space>
      </Card>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={datasets}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      </Card>
    </Space>
  );
};

DatasetsTab.propTypes = {
  project: PropTypes.object.isRequired,
};

export default DatasetsTab;