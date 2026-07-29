import React from "react";
import PropTypes from "prop-types";
import { Flex, Typography, Tooltip } from "antd";

import "./styles/InfoItem.css";

const { Text } = Typography;

const InfoItem = ({
  icon,
  label,
  value,
  tooltip,
  copyable,
  ellipsis,
  vertical,
  className,
}) => {
  const valueNode = (
    <Text
      className="info-item-value"
      copyable={copyable}
      ellipsis={
        ellipsis
          ? {
              tooltip: value,
            }
          : false
      }
    >
      {value}
    </Text>
  );

  return (
    <Flex
      vertical={vertical}
      align={vertical ? "flex-start" : "center"}
      gap={12}
      className={`info-item ${className}`}
    >
      {icon && (
        <div className="info-item-icon">
          {icon}
        </div>
      )}

      <Flex
        vertical
        className="info-item-content"
      >
        {tooltip ? (
          <Tooltip title={tooltip}>
            <Text className="info-item-label">
              {label}
            </Text>
          </Tooltip>
        ) : (
          <Text className="info-item-label">
            {label}
          </Text>
        )}

        {valueNode}
      </Flex>
    </Flex>
  );
};

InfoItem.propTypes = {
  icon: PropTypes.node,

  label: PropTypes.string.isRequired,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,

  tooltip: PropTypes.string,

  copyable: PropTypes.bool,

  ellipsis: PropTypes.bool,

  vertical: PropTypes.bool,

  className: PropTypes.string,
};

InfoItem.defaultProps = {
  icon: null,
  tooltip: "",
  copyable: false,
  ellipsis: false,
  vertical: false,
  className: "",
};

export default InfoItem;