import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, Typography, Progress, Row, Col } from "antd";

import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  RobotOutlined,
  ExperimentOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/common/StatusBadge";

const { Title, Paragraph, Text } = Typography;

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="project-card-v2"
      bodyStyle={{ padding: 0 }}
    >
      <div className="project-card-content">

        {/* ===========================
              HEADER
        =========================== */}

        <div className="project-card-header">

          <div className="project-header-left">

            <div className="project-icon">
              <RobotOutlined />
            </div>

            <div className="project-title-wrapper">

              <div className="project-title-row">

                <Title
                  level={4}
                  className="project-title"
                >
                  {project.name}
                </Title>

                <StatusBadge
                  status={project.status}
                />

              </div>

              <Text className="project-subtitle">
                Production AI Evaluation Pipeline
              </Text>

            </div>

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

        <div className="project-tags">

          <div className="project-tag provider">

            <ExperimentOutlined />

            <span>{project.provider}</span>

          </div>

          <div className="project-tag model">

            <BranchesOutlined />

            <span>{project.model}</span>

          </div>

        </div>
                {/* ===========================
              MODEL HEALTH
        =========================== */}

        <div className="health-section">

          <div className="health-header">

            <div>

              <Text className="health-title">
                Model Health
              </Text>

              <Text className="health-subtitle">
                Overall evaluation score
              </Text>

            </div>

            <Title
              level={3}
              className="health-score"
            >
              {project.healthScore}%
            </Title>

          </div>

          <Progress
            percent={project.healthScore}
            showInfo={false}
            strokeLinecap="round"
            trailColor="var(--bg-tertiary)"
            strokeColor="var(--primary)"
          />

        </div>

        {/* ===========================
              METRICS
        =========================== */}

        <Row
          gutter={[16, 16]}
          className="metrics-row"
        >

          <Col xs={12} md={6}>

            <div className="metric-box">

              <Title
                level={4}
                className="metric-value"
              >
                {project.averageAccuracy}%
              </Title>

              <Text className="metric-label">
                Accuracy
              </Text>

            </div>

          </Col>

          <Col xs={12} md={6}>

            <div className="metric-box">

              <Title
                level={4}
                className="metric-value"
              >
                {project.healthScore}%
              </Title>

              <Text className="metric-label">
                Health
              </Text>

            </div>

          </Col>

          <Col xs={12} md={6}>

            <div className="metric-box">

              <Title
                level={4}
                className="metric-value"
              >
                {project.evaluations}
              </Title>

              <Text className="metric-label">
                Evaluations
              </Text>

            </div>

          </Col>

          <Col xs={12} md={6}>

            <div className="metric-box">

              <Title
                level={4}
                className="metric-value"
              >
                {project.datasets}
              </Title>

              <Text className="metric-label">
                Datasets
              </Text>

            </div>

          </Col>

        </Row>

        {/* ===========================
              FOOTER
        =========================== */}

        <div className="project-card-footer">

          <div className="footer-meta">

            <div className="footer-item">

              <CalendarOutlined className="footer-icon" />

              <div>

                <Text className="footer-label">
                  Created
                </Text>

                <Text className="footer-value">
                  {project.createdAt}
                </Text>

              </div>

            </div>

            <div className="footer-item">

              <ClockCircleOutlined className="footer-icon" />

              <div>

                <Text className="footer-label">
                  Last Run
                </Text>

                <Text className="footer-value">
                  {project.lastRun}
                </Text>

              </div>

            </div>

          </div>

          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRightOutlined />}
            className="open-project-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}`);
            }}
          >
            Open Project
          </Button>

        </div>

      </div>

    </Card>

  );
};

export default ProjectCard;