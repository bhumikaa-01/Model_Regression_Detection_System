import React from "react";
import {
  Card,
  Row,
  Col,
  Space,
  Tag,
  Typography,
  Progress,
  Statistic,
  Divider,
} from "antd";

import {
  CheckCircleFilled,
  CalendarOutlined,
  DatabaseOutlined,
  BranchesOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const OverviewTab = ({ project }) => {
  return (
    <div className="overview-tab">

      {/* ===========================
          TOP SECTION
      ============================ */}

      <Row gutter={[24, 24]}>

        {/* Project Overview */}

        <Col xs={24} lg={16}>

          <Card className="overview-card">

            <Title level={4}>
              📋 Project Overview
            </Title>

            <Paragraph type="secondary">
              {project.description}
            </Paragraph>

            <Divider />

            <Row gutter={[24, 24]}>

              <Col xs={12} md={6}>
                <Text type="secondary">
                  Provider
                </Text>

                <br />

                <Tag color="blue">
                  <ExperimentOutlined />
                  {" "}
                  {project.provider}
                </Tag>
              </Col>

              <Col xs={12} md={6}>
                <Text type="secondary">
                  Model
                </Text>

                <br />

                <Tag color="purple">
                  <BranchesOutlined />
                  {" "}
                  {project.model}
                </Tag>
              </Col>

              <Col xs={12} md={6}>
                <Text type="secondary">
                  Status
                </Text>

                <br />

                <Tag color="green">
                  <CheckCircleFilled />
                  {" "}
                  {project.status}
                </Tag>
              </Col>

              <Col xs={12} md={6}>
                <Text type="secondary">
                  Created
                </Text>

                <br />

                <Space>
                  <CalendarOutlined />
                  <Text>
                    {project.createdAt}
                  </Text>
                </Space>
              </Col>

            </Row>

          </Card>

        </Col>

        {/* Health */}

        <Col xs={24} lg={8}>

          <Card className="overview-card health-card">

            <Title level={4}>
              ❤️ Project Health
            </Title>

            <Progress
              type="dashboard"
              percent={project.healthScore}
              strokeColor="#52c41a"
            />

            <Title
              level={2}
              style={{
                marginTop: 20,
                marginBottom: 0,
              }}
            >
              {project.healthScore}%
            </Title>

            <Text type="secondary">
              Excellent System Health
            </Text>

          </Card>

        </Col>

      </Row>

      {/* ===========================
          KPI SECTION
      ============================ */}

      <Row
        gutter={[20, 20]}
        style={{ marginTop: 24 }}
      >

        <Col xs={24} sm={12} xl={6}>

          <Card className="stat-card">

            <Statistic
              title="Accuracy"
              value={project.averageAccuracy}
              suffix="%"
            />

            <Text type="secondary">
              Production Quality
            </Text>

          </Card>

        </Col>

        <Col xs={24} sm={12} xl={6}>

          <Card className="stat-card">

            <Statistic
              title="Evaluations"
              value={project.evaluations}
            />

            <Text type="secondary">
              Total Runs
            </Text>

          </Card>

        </Col>

        <Col xs={24} sm={12} xl={6}>

          <Card className="stat-card">

            <Statistic
              title="Prompt Versions"
              value={project.promptVersions}
            />

            <Text type="secondary">
              Active Versions
            </Text>

          </Card>

        </Col>

        <Col xs={24} sm={12} xl={6}>

          <Card className="stat-card">

            <Statistic
              title="Datasets"
              value={project.datasets}
            />

            <Text type="secondary">
              Connected Datasets
            </Text>

          </Card>

        </Col>

      </Row>

            {/* ===========================
          AI STACK + ACTIVITY
      ============================ */}

      <Row
        gutter={[24, 24]}
        style={{ marginTop: 24 }}
      >

        {/* AI Stack */}

        <Col xs={24} lg={12}>

          <Card className="overview-card">

            <Title level={4}>
              🧠 AI Stack
            </Title>

            <Space
              wrap
              size={[10, 10]}
              style={{ marginTop: 16 }}
            >

              <Tag color="blue">
                <ExperimentOutlined />
                {" "}
                {project.provider}
              </Tag>

              <Tag color="purple">
                <BranchesOutlined />
                {" "}
                {project.model}
              </Tag>

              <Tag color="green">
                LLM
              </Tag>

              <Tag color="gold">
                Classification
              </Tag>

              <Tag color="cyan">
                Evaluation
              </Tag>

              <Tag color="magenta">
                Production
              </Tag>

              <Tag color="processing">
                Enterprise
              </Tag>

            </Space>

            <Divider />

            <Space
              direction="vertical"
              size={16}
              style={{ width: "100%" }}
            >

              <Space>
                <SafetyCertificateOutlined
                  style={{ color: "#52c41a" }}
                />
                <Text>
                  Continuous Evaluation Enabled
                </Text>
              </Space>

              <Space>
                <ThunderboltOutlined
                  style={{ color: "#faad14" }}
                />
                <Text>
                  Regression Monitoring Active
                </Text>
              </Space>

              <Space>
                <DatabaseOutlined
                  style={{ color: "#1677ff" }}
                />
                <Text>
                  Connected to {project.datasets} Dataset(s)
                </Text>
              </Space>

            </Space>

          </Card>

        </Col>

        {/* Recent Activity */}

        <Col xs={24} lg={12}>

          <Card className="overview-card">

            <Title level={4}>
              📅 Recent Activity
            </Title>

            <Space
              direction="vertical"
              size={22}
              style={{
                width: "100%",
                marginTop: 10,
              }}
            >

              <div>

                <Text strong>
                  Latest Evaluation
                </Text>

                <br />

                <Text type="secondary">
                  {project.lastRun}
                </Text>

              </div>

              <div>

                <Text strong>
                  Accuracy Updated
                </Text>

                <br />

                <Text type="secondary">
                  {project.averageAccuracy}% Accuracy
                </Text>

              </div>

              <div>

                <Text strong>
                  Prompt Version
                </Text>

                <br />

                <Text type="secondary">
                  {project.promptVersions} Active Versions
                </Text>

              </div>

              <div>

                <Text strong>
                  Health Check
                </Text>

                <br />

                <Text
                  style={{
                    color: "#52c41a",
                    fontWeight: 600,
                  }}
                >
                  System Stable
                </Text>

              </div>

            </Space>

          </Card>

        </Col>

      </Row>

      {/* ===========================
          EXECUTIVE SUMMARY
      ============================ */}

      <Card
        className="overview-card"
        style={{ marginTop: 24 }}
      >

        <Title level={4}>
          📈 Executive Summary
        </Title>

        <Paragraph
          style={{ marginTop: 18 }}
        >
          This AI project is currently operating in a healthy production
          state with an overall health score of{" "}
          <strong>{project.healthScore}%</strong>.
          Evaluation accuracy remains consistently high at{" "}
          <strong>{project.averageAccuracy}%</strong>,
          while the regression rate is maintained at{" "}
          <strong>{project.regressionRate}%</strong>.
          The application currently manages{" "}
          <strong>{project.datasets}</strong> dataset(s),
          <strong> {project.promptVersions}</strong> active prompt version(s),
          and has successfully completed{" "}
          <strong>{project.evaluations}</strong> evaluation runs.
        </Paragraph>

        <Divider />

        <Row gutter={[16, 16]}>

          <Col xs={24} md={12}>
            <Tag color="success">
              ✓ Stable Production Deployment
            </Tag>
          </Col>

          <Col xs={24} md={12}>
            <Tag color="processing">
              ✓ Continuous Evaluation Enabled
            </Tag>
          </Col>

          <Col xs={24} md={12}>
            <Tag color="blue">
              ✓ High Accuracy Model
            </Tag>
          </Col>

          <Col xs={24} md={12}>
            <Tag color="purple">
              ✓ Regression Monitoring Active
            </Tag>
          </Col>

        </Row>

      </Card>

    </div>
  );
};

export default OverviewTab;

   