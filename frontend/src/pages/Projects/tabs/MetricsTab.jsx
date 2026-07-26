import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Col,
  Progress,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  AreaChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const MetricsTab = ({ project }) => {
  const metricHistory = [
    {
      key: 1,
      date: "26 Jul 2026",
      accuracy: 99.4,
      precision: 98.9,
      recall: 99.1,
      latency: "1.2s",
      status: "Healthy",
    },
    {
      key: 2,
      date: "24 Jul 2026",
      accuracy: 98.8,
      precision: 98.2,
      recall: 98.6,
      latency: "1.4s",
      status: "Healthy",
    },
    {
      key: 3,
      date: "22 Jul 2026",
      accuracy: 97.9,
      precision: 97.5,
      recall: 97.8,
      latency: "1.8s",
      status: "Warning",
    },
    {
      key: 4,
      date: "20 Jul 2026",
      accuracy: 98.3,
      precision: 98.1,
      recall: 98.0,
      latency: "1.6s",
      status: "Healthy",
    },
  ];

  const columns = [
    {
      title: "Evaluation Date",
      dataIndex: "date",
    },
    {
      title: "Accuracy",
      dataIndex: "accuracy",
      render: (value) => `${value}%`,
    },
    {
      title: "Precision",
      dataIndex: "precision",
      render: (value) => `${value}%`,
    },
    {
      title: "Recall",
      dataIndex: "recall",
      render: (value) => `${value}%`,
    },
    {
      title: "Latency",
      dataIndex: "latency",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "Healthy" ? (
          <Tag
            color="success"
            icon={<CheckCircleOutlined />}
          >
            HEALTHY
          </Tag>
        ) : (
          <Tag
            color="warning"
            icon={<WarningOutlined />}
          >
            WARNING
          </Tag>
        ),
    },
  ];

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Average Accuracy"
              value={project.averageAccuracy}
              suffix="%"
              prefix={<AreaChartOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Health Score"
              value={project.healthScore}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Regression Rate"
              value={project.regressionRate}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Avg Latency"
              value="1.5"
              suffix="sec"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[20, 20]}
        style={{ marginTop: 20 }}
      >
        <Col xs={24} lg={12}>
          <Card title="Quality Metrics">
            <Text>Accuracy</Text>

            <Progress
              percent={project.averageAccuracy}
              status="active"
            />

            <Text>Health Score</Text>

            <Progress
              percent={project.healthScore}
              status="active"
            />

            <Text>Regression Resistance</Text>

            <Progress
              percent={
                100 - project.regressionRate
              }
              status="active"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Performance Summary">
            <Statistic
              title="Best Accuracy"
              value="99.4"
              suffix="%"
            />

            <Statistic
              title="Lowest Latency"
              value="1.2"
              suffix="sec"
              style={{ marginTop: 24 }}
            />

            <Statistic
              title="Successful Runs"
              value={project.evaluations}
              style={{ marginTop: 24 }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Historical Metrics"
        style={{ marginTop: 20 }}
      >
        <Table
          rowKey="key"
          columns={columns}
          dataSource={metricHistory}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      </Card>
    </>
  );
};

MetricsTab.propTypes = {
  project: PropTypes.object.isRequired,
};

export default MetricsTab;