import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Col,
  Descriptions,
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
  DatabaseOutlined,
  ExperimentOutlined,
  FolderOpenOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const OverviewTab = ({ project }) => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={14}>
          <Card title="Project Information">
            <Descriptions
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Project ID">
                {project.id}
              </Descriptions.Item>

              <Descriptions.Item label="Provider">
                {project.provider}
              </Descriptions.Item>

              <Descriptions.Item label="Model">
                {project.model}
              </Descriptions.Item>

              <Descriptions.Item label="Created">
                {project.createdAt}
              </Descriptions.Item>

              <Descriptions.Item label="Last Run">
                {project.lastRun}
              </Descriptions.Item>

              <Descriptions.Item label="Description">
                {project.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Project Health">
            <Statistic
              title="Health Score"
              value={project.healthScore}
              suffix="%"
              prefix={<SafetyCertificateOutlined />}
            />

            <Progress
              percent={project.healthScore}
              strokeColor="#52c41a"
            />

            <div style={{ marginTop: 30 }}>
              <Statistic
                title="Average Accuracy"
                value={project.averageAccuracy}
                suffix="%"
                prefix={<CheckCircleOutlined />}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[20, 20]}
        style={{ marginTop: 20 }}
      >
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Evaluations"
              value={project.evaluations}
              prefix={<RocketOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Datasets"
              value={project.datasets}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Prompt Versions"
              value={project.promptVersions}
              prefix={<FolderOpenOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[20, 20]}
        style={{ marginTop: 20 }}
      >
        <Col xs={24} lg={12}>
          <Card title="Technology Stack">
            <Space wrap>
              <Tag color="blue">
                {project.provider}
              </Tag>

              <Tag color="purple">
                {project.model}
              </Tag>

              {project.tags.map((tag) => (
                <Tag
                  key={tag}
                  color="processing"
                >
                  {tag}
                </Tag>
              ))}
            </Space>

            <Paragraph
              style={{ marginTop: 20 }}
            >
              This project evaluates AI
              models using multiple prompt
              versions, datasets and
              automated regression testing.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Project Timeline">
            <Timeline
              items={[
                {
                  color: "green",
                  children: (
                    <>
                      <Text strong>
                        Project Created
                      </Text>

                      <br />

                      <Text type="secondary">
                        {project.createdAt}
                      </Text>
                    </>
                  ),
                },
                {
                  color: "blue",
                  children: (
                    <>
                      <Text strong>
                        Latest Evaluation
                      </Text>

                      <br />

                      <Text type="secondary">
                        {project.lastRun}
                      </Text>
                    </>
                  ),
                },
                {
                  color: "green",
                  children: (
                    <>
                      <Text strong>
                        Current Status
                      </Text>

                      <br />

                      <Tag color="success">
                        {project.status}
                      </Tag>
                    </>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Executive Summary"
        style={{ marginTop: 20 }}
      >
        <Title level={5}>
          Project Overview
        </Title>

        <Paragraph>
          This project is designed to
          continuously evaluate LLM
          performance across multiple
          datasets and prompt versions.
          EvalGuard AI monitors model
          quality, detects regressions,
          tracks accuracy trends and helps
          teams confidently deploy new AI
          releases into production.
        </Paragraph>

        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Statistic
              title="Accuracy"
              value={project.averageAccuracy}
              suffix="%"
              prefix={<ExperimentOutlined />}
            />
          </Col>

          <Col span={8}>
            <Statistic
              title="Health"
              value={project.healthScore}
              suffix="%"
              prefix={<SafetyCertificateOutlined />}
            />
          </Col>

          <Col span={8}>
            <Statistic
              title="Regression Rate"
              value={project.regressionRate}
              suffix="%"
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

OverviewTab.propTypes = {
  project: PropTypes.object.isRequired,
};

export default OverviewTab;