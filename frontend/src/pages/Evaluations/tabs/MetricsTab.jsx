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
  CheckCircleOutlined,
  ClockCircleOutlined,
  BugOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const MetricsTab = ({ metrics }) => {
  const columns = [
    {
      title: "Metric",
      dataIndex: "metric",
      key: "metric",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Threshold",
      dataIndex: "threshold",
      key: "threshold",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Pass"
              ? "success"
              : "error"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  const data =
    metrics.metricSummary ||
    [
      {
        key: 1,
        metric: "Accuracy",
        value: "99.4%",
        threshold: ">95%",
        status: "Pass",
      },
      {
        key: 2,
        metric: "Precision",
        value: "98.9%",
        threshold: ">95%",
        status: "Pass",
      },
      {
        key: 3,
        metric: "Recall",
        value: "98.7%",
        threshold: ">95%",
        status: "Pass",
      },
      {
        key: 4,
        metric: "Latency",
        value: "512 ms",
        threshold: "<700 ms",
        status: "Pass",
      },
      {
        key: 5,
        metric: "Regression",
        value: "0",
        threshold: "0",
        status: "Pass",
      },
    ];

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Accuracy"
              value={metrics.accuracy}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Precision"
              value={metrics.precision}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Recall"
              value={metrics.recall}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Latency"
              value={metrics.executionTime}
              suffix="ms"
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
          <Card title="Overall Performance">
            <Title level={5}>Accuracy</Title>

            <Progress
              percent={metrics.accuracy}
              strokeColor="#52c41a"
            />

            <Title
              level={5}
              style={{ marginTop: 25 }}
            >
              Precision
            </Title>

            <Progress
              percent={metrics.precision}
              strokeColor="#1677ff"
            />

            <Title
              level={5}
              style={{ marginTop: 25 }}
            >
              Recall
            </Title>

            <Progress
              percent={metrics.recall}
              strokeColor="#722ed1"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Regression Analysis">
            <Statistic
              title="Detected Regressions"
              value={metrics.regressions}
              prefix={<BugOutlined />}
              valueStyle={{
                color:
                  metrics.regressions === 0
                    ? "#52c41a"
                    : "#ff4d4f",
              }}
            />

            <div
              style={{
                marginTop: 30,
              }}
            >
              <Progress
                type="circle"
                percent={
                  metrics.regressions === 0
                    ? 100
                    : Math.max(
                        10,
                        100 -
                          metrics.regressions *
                            20
                      )
                }
                strokeColor={
                  metrics.regressions === 0
                    ? "#52c41a"
                    : "#ff4d4f"
                }
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title="Evaluation Metrics"
        style={{ marginTop: 20 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
    </>
  );
};

MetricsTab.propTypes = {
  metrics: PropTypes.object.isRequired,
};

export default MetricsTab;