import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "antd";

import "./styles/MetricCard.css";

const { Text, Title } = Typography;

const MetricCard = ({
  title,
  value,
  icon,
  suffix,
  trend,
  trendColor,
  loading,
}) => {
  return (
    <Card
      className="metric-card"
      hoverable
      loading={loading}
      bordered={false}
    >
      <div className="metric-card-header">
        <div className="metric-card-icon">
          {icon}
        </div>

        <Text className="metric-card-title">
          {title}
        </Text>
      </div>

      <Title
        level={2}
        className="metric-card-value"
      >
        {value}
        {suffix && (
          <span className="metric-card-suffix">
            {suffix}
          </span>
        )}
      </Title>

      {trend && (
        <Text
          className="metric-card-trend"
          style={{ color: trendColor }}
        >
          {trend}
        </Text>
      )}
    </Card>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.node,
  suffix: PropTypes.string,
  trend: PropTypes.string,
  trendColor: PropTypes.string,
  loading: PropTypes.bool,
};

MetricCard.defaultProps = {
  icon: null,
  suffix: "",
  trend: "",
  trendColor: "#52c41a",
  loading: false,
};

export default MetricCard;