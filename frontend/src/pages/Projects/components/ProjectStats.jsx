import React from "react";
import { Row, Col, Card, Statistic, Progress } from "antd";

import {
  FolderOpenOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  HeartOutlined,
} from "@ant-design/icons";

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
      color: "#1677ff",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
    },
    {
      title: "Average Accuracy",
      value: Number(averageAccuracy),
      suffix: "%",
      icon: <RiseOutlined />,
      color: "#722ed1",
    },
    {
      title: "Overall Health",
      value: Number(averageHealth),
      suffix: "%",
      icon: <HeartOutlined />,
      color: "#eb2f96",
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
          lg={12}
          xl={6}
          key={item.title}
        >
          <Card
            hoverable
            className="project-stat-card"
            bodyStyle={{ padding: 24 }}
          >
            <div className="project-stat-header">
              <div
                className="project-stat-icon"
                style={{
                  background: item.color,
                }}
              >
                {item.icon}
              </div>

              <Statistic
                title={item.title}
                value={item.value}
                suffix={item.suffix}
                precision={
                  item.suffix === "%" ? 1 : 0
                }
              />
            </div>

            {item.progress && (
              <Progress
                percent={Number(item.value)}
                showInfo={false}
                strokeColor={item.color}
                style={{ marginTop: 24 }}
              />
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProjectStats;