import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
  DatabaseOutlined,
  ExperimentOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
} from "antd";

import StatusBadge from "../../components/common/StatusBadge";
import MetricCard from "../../components/common/MetricCard";

import OverviewTab from "./tabs/OverviewTab";
import EvaluationsTab from "./tabs/EvaluationsTab";
import PromptVersionsTab from "./tabs/PromptVersionsTab";
import DatasetsTab from "./tabs/DatasetsTab";
import MetricsTab from "./tabs/MetricsTab";
import SettingsTab from "./tabs/SettingsTab";

import { mockProjects } from "./mockProjects";

import "./styles/ProjectDetails.css";

const { Title, Paragraph, Text } = Typography;

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const project = mockProjects.find(
    (item) => item.id === id
  );

  if (!project) {
    return (
      <div className="project-details-page">
        <Card>
          <Title level={3}>Project not found</Title>

          <Button
            type="primary"
            onClick={() => navigate("/projects")}
          >
            Back to Projects
          </Button>
        </Card>
      </div>
    );
  }

  const tabs = [
    {
      key: "overview",
      label: "Overview",
      children: <OverviewTab project={project} />,
    },
    {
      key: "evaluations",
      label: "Evaluations",
      children: <EvaluationsTab project={project} />,
    },
    {
      key: "prompts",
      label: "Prompt Versions",
      children: <PromptVersionsTab project={project} />,
    },
    {
      key: "datasets",
      label: "Datasets",
      children: <DatasetsTab project={project} />,
    },
    {
      key: "metrics",
      label: "Metrics",
      children: <MetricsTab project={project} />,
    },
    {
      key: "settings",
      label: "Settings",
      children: <SettingsTab project={project} />,
    },
  ];

  return (
    <div className="project-details-page">
      {/* Back Button */}

      <Button
        className="back-button"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/projects")}
      >
        Back to Projects
      </Button>

      {/* Hero */}

      <Card className="project-hero-card">
        <Row
          justify="space-between"
          align="top"
          gutter={[24, 24]}
        >
          <Col flex="auto">
            <Space
              align="center"
              size={12}
              wrap
            >
              <Title
                level={2}
                style={{ margin: 0 }}
              >
                {project.name}
              </Title>

              <StatusBadge status={project.status} />
            </Space>

            <Paragraph className="project-description">
              {project.description}
            </Paragraph>

            <Space
              wrap
              size={[10, 10]}
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

              <Tag
                color="gold"
                icon={<DatabaseOutlined />}
              >
                {project.datasets} Datasets
              </Tag>

              <Tag color="cyan">
                {project.promptVersions} Prompt Versions
              </Tag>

              <Tag color="green">
                {project.evaluations} Evaluations
              </Tag>
            </Space>

            <div className="project-meta">
              <Space
                size={20}
                wrap
              >
                <Text type="secondary">
                  <CalendarOutlined />
                  {"  "}
                  Created {project.createdAt}
                </Text>

                <Text type="secondary">
                  <ClockCircleOutlined />
                  {"  "}
                  Last Run {project.lastRun}
                </Text>
              </Space>
            </div>
          </Col>

          <Col>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
            >
              Refresh
            </Button>
          </Col>
        </Row>
      </Card>

      {/* KPI */}

      <Row
        gutter={[20, 20]}
        className="project-kpis"
      >
        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Accuracy"
            value={`${project.averageAccuracy}%`}
            icon={<ExperimentOutlined />}
            trend="Excellent"
            trendColor="#52c41a"
          />
        </Col>

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Evaluations"
            value={project.evaluations}
            icon={<DatabaseOutlined />}
            trend="Executed"
            trendColor="#1677ff"
          />
        </Col>

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Health Score"
            value={`${project.healthScore}%`}
            icon={<CheckCircleFilled />}
            trend="Healthy"
            trendColor="#52c41a"
          />
        </Col>

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Regression"
            value={`${project.regressionRate}%`}
            icon={<BranchesOutlined />}
            trend="Stable"
            trendColor="#faad14"
          />
        </Col>
      </Row>

      {/* Tabs */}

      <Card className="project-tabs-card">
        <Tabs
          defaultActiveKey="overview"
          size="large"
          items={tabs}
        />
      </Card>
    </div>
  );
};

export default ProjectDetails;