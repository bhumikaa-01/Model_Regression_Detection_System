import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Typography,
  Tag,
  Space,
  Progress,
  Row,
  Col,
  Button,
} from "antd";

import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
  RobotOutlined,
  ExperimentOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "success";

    case "running":
      return "processing";

    case "failed":
      return "error";

    case "archived":
      return "default";

    default:
      return "success";
  }
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="project-card-v2"
      bodyStyle={{ padding: 24 }}
    >
      {/* ===========================
            HEADER
      =========================== */}

      <div className="project-card-header">

        <div className="project-title-section">

          <Space align="center">

            <div className="project-icon">

              <RobotOutlined />

            </div>

            <div>

              <Title
                level={4}
                className="project-title"
              >
                {project.name}
              </Title>

              <Tag
                color={getStatusColor(project.status)}
                className="status-tag"
                icon={<CheckCircleFilled />}
              >
                {project.status}
              </Tag>

            </div>

          </Space>

        </div>

      </div>

      {/* ===========================
            DESCRIPTION
      =========================== */}

      <Paragraph
        className="project-description"
        ellipsis={{ rows: 2 }}
      >
        {project.description}
      </Paragraph>

      {/* ===========================
            MODEL TAGS
      =========================== */}

      <Space
        wrap
        size={[10, 10]}
        className="provider-tags"
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

      </Space>

      {/* ===========================
            HEALTH
      =========================== */}

      <div className="health-section">

        <div className="health-header">

          <Text strong>
            Model Health
          </Text>

          <Text>
            {project.healthScore}%
          </Text>

        </div>

        <Progress
          percent={project.healthScore}
          showInfo={false}
          strokeColor={{
            "0%": "#1677ff",
            "100%": "#52c41a",
          }}
        />

      </div>

      {/* ===========================
            KPI ROW
      =========================== */}

      <Row
        gutter={16}
        className="metrics-row"
      >

        <Col span={6}>

          <div className="metric-box">

            <Text type="secondary">
              Accuracy
            </Text>

            <Title level={5}>
              {project.averageAccuracy}%
            </Title>

          </div>

        </Col>

        <Col span={6}>

          <div className="metric-box">

            <Text type="secondary">
              Health
            </Text>

            <Title level={5}>
              {project.healthScore}%
            </Title>

          </div>

        </Col>

        <Col span={6}>

          <div className="metric-box">

            <Text type="secondary">
              Runs
            </Text>

            <Title level={5}>
              {project.evaluations}
            </Title>

          </div>

        </Col>

        <Col span={6}>

          <div className="metric-box">

            <Text type="secondary">
              Datasets
            </Text>

            <Title level={5}>
              {project.datasets}
            </Title>

          </div>

        </Col>

      </Row>
            {/* ===========================
            FOOTER
      =========================== */}

      <div className="project-card-footer">

        <div className="footer-meta">

          <div className="footer-item">

            <CalendarOutlined />

            <div>

              <Text
                type="secondary"
                className="footer-label"
              >
                Created
              </Text>

              <Text className="footer-value">
                {project.createdAt}
              </Text>

            </div>

          </div>

          <div className="footer-item">

            <ClockCircleOutlined />

            <div>

              <Text
                type="secondary"
                className="footer-label"
              >
                Last Run
              </Text>

              <Text className="footer-value">
                {project.lastRun}
              </Text>

            </div>

          </div>

        </div>

        <Button
          type="primary"
          size="large"
          icon={<ArrowRightOutlined />}
          className="open-project-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/projects/${project.id}`);
          }}
        >
          Open Project
        </Button>

      </div>

    </Card>
  );
};

export default ProjectCard;