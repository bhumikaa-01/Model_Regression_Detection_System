import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  TrophyOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const ReportTab = ({ report }) => {
  const handleDownload = () => {
    message.success("Report download started.");
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%" }}
    >
      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              Evaluation Report
            </Title>

            <Text type="secondary">
              Comprehensive summary of the evaluation
              execution.
            </Text>
          </Col>

          <Col>
            <Button
              type="primary"
              size="large"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Download PDF
            </Button>
          </Col>
        </Row>
      </Card>

      <Card title="Executive Summary">
        <Paragraph>{report.summary}</Paragraph>

        <Divider />

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Project">
            {report.project}
          </Descriptions.Item>

          <Descriptions.Item label="Model">
            {report.model}
          </Descriptions.Item>

          <Descriptions.Item label="Dataset">
            {report.dataset}
          </Descriptions.Item>

          <Descriptions.Item label="Prompt Version">
            {report.promptVersion}
          </Descriptions.Item>

          <Descriptions.Item label="Execution Time">
            {report.executionTime}
          </Descriptions.Item>

          <Descriptions.Item label="Accuracy">
            {report.accuracy}%
          </Descriptions.Item>

          <Descriptions.Item label="Regressions">
            {report.regressions}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color="success">
              {report.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={[20, 20]}>
        <Col xs={24} md={12}>
          <Card
            title="Strengths"
            extra={<TrophyOutlined />}
          >
            <Timeline
              items={report.strengths.map((item) => ({
                color: "green",
                dot: <CheckCircleOutlined />,
                children: item,
              }))}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Recommendations"
            extra={<WarningOutlined />}
          >
            <Timeline
              items={report.recommendations.map(
                (item) => ({
                  color: "orange",
                  dot: <WarningOutlined />,
                  children: item,
                })
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Evaluation Verdict"
        extra={<FilePdfOutlined />}
      >
        <Paragraph>
          <Text strong>
            Overall Assessment:
          </Text>
        </Paragraph>

        <Paragraph>{report.verdict}</Paragraph>
      </Card>
    </Space>
  );
};

ReportTab.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportTab;