import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Select } from "antd";

import SearchBar from "../../../components/common/SearchBar";

import "../styles/EvaluationFilters.css";

const { Option } = Select;

const EvaluationFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  model,
  onModelChange,
}) => {
  return (
    <div className="evaluation-filters">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} lg={10}>
          <SearchBar
            value={search}
            onChange={onSearchChange}
            placeholder="Search evaluations, models, datasets..."
          />
        </Col>

        <Col xs={12} lg={7}>
          <Select
            className="evaluation-filter-select"
            value={status}
            onChange={onStatusChange}
            size="large"
          >
            <Option value="all">All Status</Option>
            <Option value="completed">Completed</Option>
            <Option value="running">Running</Option>
            <Option value="failed">Failed</Option>
            <Option value="queued">Queued</Option>
          </Select>
        </Col>

        <Col xs={12} lg={7}>
          <Select
            className="evaluation-filter-select"
            value={model}
            onChange={onModelChange}
            size="large"
          >
            <Option value="all">All Models</Option>
            <Option value="gemini-2.5-flash">Gemini 2.5 Flash</Option>
            <Option value="gpt-4.1">GPT-4.1</Option>
            <Option value="claude-4-sonnet">Claude 4 Sonnet</Option>
            <Option value="llama-4">Llama 4</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
};

EvaluationFilters.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  model: PropTypes.string.isRequired,
  onModelChange: PropTypes.func.isRequired,
};

export default EvaluationFilters;