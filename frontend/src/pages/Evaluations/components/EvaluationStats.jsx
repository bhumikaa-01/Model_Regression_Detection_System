import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import {
  DatabaseOutlined,
  CheckCircleOutlined,
  BugOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import MetricCard from "../../../components/common/MetricCard";

import "../styles/EvaluationStats.css";

const EvaluationStats = ({
  totalEvaluations,
  averageAccuracy,
  totalRegressions,
  averageExecutionTime,
  loading,
}) => {
  return (
    <div className="evaluation-stats">
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6}>
          <MetricCard
            title="Total Evaluations"
            value={totalEvaluations}
            subtitle="Across all models"
            icon={<DatabaseOutlined />}
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <MetricCard
            title="Average Accuracy"
            value={`${averageAccuracy}%`}
            subtitle="Overall model quality"
            icon={<CheckCircleOutlined />}
            trend="+1.8%"
            trendType="positive"
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <MetricCard
            title="Total Regressions"
            value={totalRegressions}
            subtitle="Detected issues"
            icon={<BugOutlined />}
            trend="-2"
            trendType="positive"
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <MetricCard
            title="Avg Execution Time"
            value={`${averageExecutionTime} ms`}
            subtitle="Per evaluation"
            icon={<ClockCircleOutlined />}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

EvaluationStats.propTypes = {
  totalEvaluations: PropTypes.number,
  averageAccuracy: PropTypes.number,
  totalRegressions: PropTypes.number,
  averageExecutionTime: PropTypes.number,
  loading: PropTypes.bool,
};

EvaluationStats.defaultProps = {
  totalEvaluations: 0,
  averageAccuracy: 0,
  totalRegressions: 0,
  averageExecutionTime: 0,
  loading: false,
};

export default EvaluationStats;