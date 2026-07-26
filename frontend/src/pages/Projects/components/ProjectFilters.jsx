import React from "react";
import {
  Card,
  Input,
  Select,
  Button,
  Space,
} from "antd";

import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";

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
          placeholder="Search projects..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          style={{ width: 320 }}
        />

        <Select
          size="large"
          value={statusFilter}
          style={{ width: 170 }}
          suffixIcon={<FilterOutlined />}
          onChange={onStatusChange}
        >
          <Option value="All">All Status</Option>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
          <Option value="Archived">Archived</Option>
        </Select>

        <Select
          size="large"
          value={providerFilter}
          style={{ width: 180 }}
          onChange={onProviderChange}
        >
          <Option value="All">All Providers</Option>
          <Option value="Google">Google</Option>
          <Option value="OpenAI">OpenAI</Option>
          <Option value="Anthropic">Anthropic</Option>
          <Option value="Azure">Azure</Option>
          <Option value="Meta">Meta</Option>
        </Select>

        <Select
          size="large"
          value={sortBy}
          style={{ width: 190 }}
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
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={onCreateProject}
        >
          Create Project
        </Button>

      </div>

    </Card>
  );
};

export default ProjectFilters;