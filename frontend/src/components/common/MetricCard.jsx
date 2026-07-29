import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import "./styles/MetricCard.css";

const { Text, Title } = Typography;

const TREND_CONFIG = {
  positive: {
    className: "metric-trend-positive",
    icon: <ArrowUpOutlined />,
  },
  negative: {
    className: "metric-trend-negative",
    icon: <ArrowDownOutlined />,
  },
  warning: {
    className: "metric-trend-warning",
    icon: <MinusOutlined />,
  },
  neutral: {
    className: "metric-trend-neutral",
    icon: <MinusOutlined />,
  },
};

const MetricCard = ({
  title,
  subtitle,
  value,
  icon,
  suffix,
  trend,
  trendType,
  trendColor,
  footer = "Updated 2 mins ago",
  loading,
}) => {
  const trendConfig = TREND_CONFIG[trendType] || TREND_CONFIG.neutral;

  return (
    <Card
      className="metric-card"
      hoverable
      bordered={false}
      loading={loading}
    >
      <div className="metric-card-accent" />

      <div className="metric-card-header">
        <div className="metric-card-heading">
          <Text className="metric-card-title">
            {title}
          </Text>

          {subtitle && (
            <Text className="metric-card-subtitle">
              {subtitle}
            </Text>
          )}
        </div>

        {icon && (
          <div className="metric-card-icon">
            {icon}
          </div>
        )}
      </div>

      <Title level={2} className="metric-card-value">
        {value}

        {suffix && (
          <span className="metric-card-suffix">
            {suffix}
          </span>
        )}
      </Title>

      {trend && (
        <div
          className={`metric-card-trend ${trendConfig.className}`}
          style={trendColor ? { color: trendColor } : {}}
        >
          {trendConfig.icon}
          <span>{trend}</span>
        </div>
      )}

      <div className="metric-card-footer">
        <ClockCircleOutlined />
        <span>{footer}</span>
      </div>
    </Card>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.node,
  suffix: PropTypes.string,
  trend: PropTypes.string,
  trendType: PropTypes.oneOf([
    "positive",
    "negative",
    "warning",
    "neutral",
  ]),
  trendColor: PropTypes.string,
  footer: PropTypes.string,
  loading: PropTypes.bool,
};

MetricCard.defaultProps = {
  subtitle: "",
  icon: null,
  suffix: "",
  trend: "",
  trendType: "neutral",
  trendColor: "",
  footer: "Updated 2 mins ago",
  loading: false,
};

export default MetricCard;