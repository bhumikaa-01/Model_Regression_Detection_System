import React from "react";
import PropTypes from "prop-types";
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled, PauseCircleFilled } from "@ant-design/icons";

import "./styles/StatusBadge.css";

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    className: "status-success",
    icon: <CheckCircleFilled />,
  },

  running: {
    label: "Running",
    className: "status-running",
    icon: <ClockCircleFilled />,
  },

  queued: {
    label: "Queued",
    className: "status-queued",
    icon: <PauseCircleFilled />,
  },

  failed: {
    label: "Failed",
    className: "status-danger",
    icon: <CloseCircleFilled />,
  },

  cancelled: {
    label: "Cancelled",
    className: "status-warning",
    icon: <PauseCircleFilled />,
  },
};

const StatusBadge = ({ status }) => {
  const config =
    STATUS_CONFIG[status?.toLowerCase()] || {
      label: status || "Unknown",
      className: "status-default",
      icon: null,
    };

  return (
    <div className={`status-badge ${config.className}`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string,
};

StatusBadge.defaultProps = {
  status: "Unknown",
};

export default StatusBadge;