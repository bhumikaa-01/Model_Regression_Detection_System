import React from "react";
import { Row, Col, Statistic, Progress } from "antd";

import {
  FolderOpenOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import Card from "../../../components/ui/Card";

import "../styles/ProjectStats.css";

const ProjectStats = ({ projects }) => {
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length;

  const averageAccuracy =
    totalProjects > 0
      ? (
          projects.reduce(
            (sum, project) => sum + project.averageAccuracy,
            0
          ) / totalProjects
        ).toFixed(1)
      : 0;

  const averageHealth =
    totalProjects > 0
      ? (
          projects.reduce(
            (sum, project) => sum + project.healthScore,
            0
          ) / totalProjects
        ).toFixed(1)
      : 0;

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: <FolderOpenOutlined />,
      colorClass: "primary",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: <CheckCircleOutlined />,
      colorClass: "success",
    },
    {
      title: "Average Accuracy",
      value: Number(averageAccuracy),
      suffix: "%",
      icon: <RiseOutlined />,
      colorClass: "purple",
    },
    {
      title: "Overall Health",
      value: Number(averageHealth),
      suffix: "%",
      icon: <HeartOutlined />,
      colorClass: "danger",
      progress: true,
    },
  ];

  return (
    <Row
      gutter={[24, 24]}
      className="projects-stats"
    >
      {stats.map((item) => (
        <Col
          xs={24}
          sm={12}
          xl={6}
          key={item.title}
        >
          <Card className="project-stat-card">

            <div className="project-stat-header">

              <div
                className={`project-stat-icon ${item.colorClass}`}
              >
                {item.icon}
              </div>

              <Statistic
                title={item.title}
                value={item.value}
                suffix={item.suffix}
                precision={
                  item.suffix === "%"
                    ? 1
                    : 0
                }
              />

            </div>

            {item.progress && (
              <Progress
                percent={Number(item.value)}
                showInfo={false}
                strokeColor={{
                  "0%": "#8B5CF6",
                  "100%": "#22C55E",
                }}
                className="project-health-progress"
              />
            )}

          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProjectStats;