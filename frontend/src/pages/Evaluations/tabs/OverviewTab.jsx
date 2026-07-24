import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Col,
  Descriptions,
  Divider,
  Progress,
  Row,
  Space,
  Statistic,
  Tag,
  Timeline,
  Typography,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  RobotOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const OverviewTab = ({ overview }) => {
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%" }}
    >
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <Card title="Evaluation Summary">
            <Descriptions
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item
                label={
                  <>
                    <RobotOutlined /> Model
                  </>
                }
              >
                {overview.model}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <>
                    <DatabaseOutlined /> Dataset
                  </>
                }
              >
                {overview.dataset}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <>
                    <FileTextOutlined /> Prompt
                  </>
                }
              >
                {overview.prompt}
              </Descriptions.Item>

              <Descriptions.Item label="Provider">
                <Tag color="processing">
                  {overview.provider}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                <Tag color="success">
                  {overview.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Quality Score">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Progress
                type="dashboard"
                percent={overview.accuracy}
                strokeColor="#52c41a"
                size={220}
              />
            </div>

            <Paragraph
              style={{
                marginTop: 20,
                textAlign: "center",
              }}
            >
              Overall evaluation quality based on
              accuracy, consistency and regression
              analysis.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Accuracy"
              value={overview.accuracy}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Latency"
              value={overview.executionTime}
              suffix="ms"
              prefix={<ThunderboltOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Test Cases"
              value={overview.totalTests}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Evaluation Timeline">
        <Timeline
          items={[
            {
              color: "green",
              children:
                "Evaluation request submitted",
            },
            {
              color: "blue",
              children:
                "Prompt loaded successfully",
            },
            {
              color: "blue",
              children:
                "Dataset validation completed",
            },
            {
              color: "blue",
              children:
                "LLM inference executed",
            },
            {
              color: "green",
              children:
                "Evaluation completed successfully",
            },
          ]}
        />
      </Card>

      <Card title="Executive Summary">
        <Title level={5}>
          Evaluation Outcome
        </Title>

        <Paragraph>
          {overview.summary}
        </Paragraph>

        <Divider />

        <Text strong>Key Highlights</Text>

        <ul
          style={{
            marginTop: 12,
            paddingLeft: 20,
          }}
        >
          <li>
            Accuracy exceeded the required
            threshold.
          </li>

          <li>
            No significant regressions detected.
          </li>

          <li>
            Average latency remains within SLA.
          </li>

          <li>
            Evaluation completed successfully.
          </li>
        </ul>
      </Card>
    </Space>
  );
};

OverviewTab.propTypes = {
  overview: PropTypes.object.isRequired,
};

export default OverviewTab;