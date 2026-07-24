import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Select } from "antd";

import SearchBar from "../../../components/common/SearchBar";

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
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={10}>
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search evaluations..."
        />
      </Col>

      <Col xs={12} lg={7}>
        <Select
          value={status}
          onChange={onStatusChange}
          style={{ width: "100%" }}
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
          value={model}
          onChange={onModelChange}
          style={{ width: "100%" }}
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