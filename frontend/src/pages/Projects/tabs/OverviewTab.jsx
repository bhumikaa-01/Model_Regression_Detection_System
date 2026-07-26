import React from "react";
import {
  Card,
  Row,
  Col,
  Space,
  Tag,
  Typography,
  Progress,
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

import MetricCard from "../../../components/common/MetricCard";
import "./styles/OverviewTab.css";

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

                <Tag
                  color="blue"
                  icon={<ExperimentOutlined />}
                >
                  {project.provider}
                </Tag>

              </Col>

              <Col xs={12} md={6}>

                <Text type="secondary">
                  Model
                </Text>

                <br />

                <Tag
                  color="purple"
                  icon={<BranchesOutlined />}
                >
                  {project.model}
                </Tag>

              </Col>

              <Col xs={12} md={6}>

                <Text type="secondary">
                  Status
                </Text>

                <br />

                <Tag
                  color="green"
                  icon={<CheckCircleFilled />}
                >
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

        {/* Health Card */}

        <Col xs={24} lg={8}>

          <Card className="overview-card health-card">

            <Title level={4}>
              ❤️ Project Health
            </Title>

            <div className="health-progress-wrapper">

              <Progress
                type="dashboard"
                percent={project.healthScore}
                strokeWidth={10}
                strokeColor={{
                  "0%": "#3b82f6",
                  "100%": "#22c55e",
                }}
              />

            </div>

            <Title
              level={2}
              className="health-score"
            >
              {project.healthScore}%
            </Title>

            <Text className="health-status">
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
          <MetricCard
            title="Accuracy"
            value={`${project.averageAccuracy}%`}
            icon={<ExperimentOutlined />}
            trend="Production Quality"
            trendColor="#52c41a"
          />
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <MetricCard
            title="Evaluations"
            value={project.evaluations}
            icon={<DatabaseOutlined />}
            trend="Total Runs"
            trendColor="#1677ff"
          />
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <MetricCard
            title="Prompt Versions"
            value={project.promptVersions}
            icon={<BranchesOutlined />}
            trend="Active Versions"
            trendColor="#722ed1"
          />
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <MetricCard
            title="Datasets"
            value={project.datasets}
            icon={<DatabaseOutlined />}
            trend="Connected Datasets"
            trendColor="#fa8c16"
          />
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

              <Tag
                color="blue"
                icon={<ExperimentOutlined />}
              >
                {project.provider}
              </Tag>

              <Tag
                color="purple"
                icon={<BranchesOutlined />}
              >
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
              size={18}
              style={{ width: "100%" }}
            >

              <Space>
                <SafetyCertificateOutlined
                  style={{
                    color: "#52c41a",
                    fontSize: 18,
                  }}
                />
                <Text>
                  Continuous Evaluation Enabled
                </Text>
              </Space>

              <Space>
                <ThunderboltOutlined
                  style={{
                    color: "#faad14",
                    fontSize: 18,
                  }}
                />
                <Text>
                  Regression Monitoring Active
                </Text>
              </Space>

              <Space>
                <DatabaseOutlined
                  style={{
                    color: "#1677ff",
                    fontSize: 18,
                  }}
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
                  ✅ System Stable
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

        <Paragraph style={{ marginTop: 18 }}>

          This AI project is currently operating in a healthy production
          environment with an overall health score of{" "}
          <strong>{project.healthScore}%</strong>. The model maintains an
          average evaluation accuracy of{" "}
          <strong>{project.averageAccuracy}%</strong>, while the regression
          rate remains at{" "}
          <strong>{project.regressionRate}%</strong>.

          <br />
          <br />

          The project currently manages{" "}
          <strong>{project.datasets}</strong> datasets,
          <strong> {project.promptVersions}</strong> prompt versions and has
          successfully completed{" "}
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