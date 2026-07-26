import React, { useMemo, useState } from "react";
import {
  Empty,
  Modal,
  Row,
  Col,
  Card,
  Typography,
  Button,
  Space,
} from "antd";

import {
  PlusOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

import SectionHeader from "../../components/common/SectionHeader";

import ProjectStats from "./components/ProjectStats";
import ProjectFilters from "./components/ProjectFilters";
import ProjectCard from "./components/ProjectCard";

import { mockProjects } from "./mockProjects";

import "./styles/Projects.css";

const { Title, Paragraph } = Typography;

const Projects = () => {
  const [projects] = useState(mockProjects);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [providerFilter, setProviderFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filteredProjects = useMemo(() => {
    let data = [...projects];

    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();

      data = data.filter(
        (project) =>
          project.name.toLowerCase().includes(keyword) ||
          project.description.toLowerCase().includes(keyword) ||
          project.model.toLowerCase().includes(keyword) ||
          project.provider.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (project) => project.status === statusFilter
      );
    }

    if (providerFilter !== "All") {
      data = data.filter(
        (project) => project.provider === providerFilter
      );
    }

    switch (sortBy) {
      case "accuracy":
        data.sort(
          (a, b) =>
            b.averageAccuracy - a.averageAccuracy
        );
        break;

      case "health":
        data.sort(
          (a, b) =>
            b.healthScore - a.healthScore
        );
        break;

      case "evaluations":
        data.sort(
          (a, b) =>
            b.evaluations - a.evaluations
        );
        break;

      case "created":
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
        break;

      default:
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    }

    return data;
  }, [
    projects,
    searchText,
    statusFilter,
    providerFilter,
    sortBy,
  ]);

  const handleCreateProject = () => {
    Modal.info({
      title: "Create Project",
      centered: true,
      content:
        "Project creation wizard will be implemented in the next module.",
    });
  };

  return (
    <div className="projects-page">

      {/* Hero */}

      <Card className="projects-hero">

        <div>

          <Space align="center" size={12}>
            <FolderOpenOutlined
              style={{
                fontSize: 32,
                color: "#1677ff",
              }}
            />

            <Title
              level={2}
              style={{ margin: 0 }}
            >
              Projects
            </Title>

          </Space>

          <Paragraph
            style={{
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            Organize AI applications, monitor model performance,
            manage datasets, prompt versions and evaluation
            pipelines from one centralized workspace.
          </Paragraph>

        </div>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          className="projects-create-btn"
          onClick={handleCreateProject}
        >
          Create Project
        </Button>

      </Card>

      {/* Statistics */}

      <ProjectStats projects={projects} />

      {/* Filters */}

      <ProjectFilters
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        providerFilter={providerFilter}
        onProviderChange={setProviderFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onCreateProject={handleCreateProject}
      />

      {/* Projects */}

      {filteredProjects.length === 0 ? (

        <Card className="projects-empty">

          <Empty
            description="No projects match your current filters."
          />

        </Card>

      ) : (

        <Row gutter={[24, 24]}>

          {filteredProjects.map((project) => (

            <Col
              xs={24}
              md={12}
              xl={8}
              key={project.id}
            >
              <ProjectCard
                project={project}
              />
            </Col>

          ))}

        </Row>

      )}

    </div>
  );
};

export default Projects;