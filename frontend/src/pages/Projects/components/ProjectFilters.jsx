import React from "react";
import {
  Card,
  Input,
  Select,
} from "antd";

import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  RobotOutlined,
} from "@ant-design/icons";

import Button from "../../../components/ui/Button";

const { Option } = Select;

const ProjectFilters = ({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  providerFilter,
  onProviderChange,
  sortBy,
  onSortChange,
  onCreateProject,
}) => {
  return (
    <Card className="projects-toolbar">

      <div className="projects-toolbar-left">

        <Input
          allowClear
          size="large"
          className="projects-search"
          placeholder="Search by project, model or provider..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />

        <Select
          size="large"
          value={statusFilter}
          className="projects-select"
          suffixIcon={<FilterOutlined />}
          onChange={onStatusChange}
        >
          <Option value="All">
            All Status
          </Option>

          <Option value="Active">
            Active
          </Option>

          <Option value="Inactive">
            Inactive
          </Option>

          <Option value="Archived">
            Archived
          </Option>
        </Select>

        <Select
          size="large"
          value={providerFilter}
          className="projects-select"
          suffixIcon={<RobotOutlined />}
          onChange={onProviderChange}
        >
          <Option value="All">
            All Providers
          </Option>

          <Option value="Google">
            Google
          </Option>

          <Option value="OpenAI">
            OpenAI
          </Option>

          <Option value="Anthropic">
            Anthropic
          </Option>

          <Option value="Azure">
            Azure
          </Option>

          <Option value="Meta">
            Meta
          </Option>
        </Select>

        <Select
          size="large"
          value={sortBy}
          className="projects-select"
          suffixIcon={<SortAscendingOutlined />}
          onChange={onSortChange}
        >
          <Option value="name">
            Name
          </Option>

          <Option value="accuracy">
            Accuracy
          </Option>

          <Option value="health">
            Health Score
          </Option>

          <Option value="evaluations">
            Evaluations
          </Option>

          <Option value="created">
            Recently Created
          </Option>
        </Select>

      </div>

      <div className="projects-toolbar-right">

        <Button
          leftIcon={<PlusOutlined />}
          onClick={onCreateProject}
        >
          Create Project
        </Button>

      </div>

    </Card>
  );
};

export default ProjectFilters;