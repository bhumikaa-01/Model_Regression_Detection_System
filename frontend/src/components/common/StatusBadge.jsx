import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

const STATUS_CONFIG = {
  completed: {
    color: "success",
    text: "Completed",
  },
  running: {
    color: "processing",
    text: "Running",
  },
  queued: {
    color: "default",
    text: "Queued",
  },
  failed: {
    color: "error",
    text: "Failed",
  },
  cancelled: {
    color: "warning",
    text: "Cancelled",
  },
};

const StatusBadge = ({ status }) => {
  const config =
    STATUS_CONFIG[status?.toLowerCase()] || {
      color: "default",
      text: status || "Unknown",
    };

  return (
    <Tag
      color={config.color}
      style={{
        borderRadius: 16,
        padding: "2px 12px",
        fontWeight: 600,
      }}
    >
      {config.text}
    </Tag>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string,
};

StatusBadge.defaultProps = {
  status: "Unknown",
};

export default StatusBadge;