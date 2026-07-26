import React, { useEffect, useMemo, useState } from "react";
import {
  Empty,
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

import ProjectStats from "./components/ProjectStats";
import ProjectFilters from "./components/ProjectFilters";
import ProjectCard from "./components/ProjectCard";
import CreateProjectModal from "./components/CreateProjectModal";
import ProjectSkeleton from "./components/ProjectSkeleton";

import { mockProjects } from "./mockProjects";

import "./styles/Projects.css";

const { Title, Paragraph } = Typography;

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [providerFilter, setProviderFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

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

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateProject = (project) => {
    setProjects((prev) => [project, ...prev]);
    setIsCreateModalOpen(false);
  };

  if (loading) {
    return (
      <div className="projects-page">
        <ProjectSkeleton />
      </div>
    );
  }

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
            Organize AI applications, monitor model
            performance, manage datasets, prompt
            versions and evaluation pipelines from one
            centralized workspace.
          </Paragraph>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          className="projects-create-btn"
          onClick={openCreateModal}
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
        onCreateProject={openCreateModal}
      />

      {/* Project Grid */}

      {filteredProjects.length === 0 ? (
        <Card className="projects-empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Title
                  level={4}
                  style={{ marginBottom: 8 }}
                >
                  No Projects Found
                </Title>

                <Paragraph
                  type="secondary"
                  style={{ marginBottom: 24 }}
                >
                  No projects match your current
                  filters.
                  <br />
                  Try changing your search criteria
                  or create a new AI evaluation
                  project.
                </Paragraph>

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={openCreateModal}
                >
                  Create Project
                </Button>
              </div>
            }
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

      {/* Create Project Modal */}

      <CreateProjectModal
        open={isCreateModalOpen}
        onCancel={closeCreateModal}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default Projects;