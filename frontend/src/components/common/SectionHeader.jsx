import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import "./styles/SectionHeader.css";

const { Title, Paragraph } = Typography;

const SectionHeader = ({
  title,
  subtitle,
  extra,
}) => {
  return (
    <div className="section-header">
      <div className="section-header-content">
        <Title
          level={2}
          className="section-header-title"
        >
          {title}
        </Title>

        {subtitle && (
          <Paragraph className="section-header-subtitle">
            {subtitle}
          </Paragraph>
        )}
      </div>

      {extra && (
        <div className="section-header-extra">
          {extra}
        </div>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  extra: PropTypes.node,
};

SectionHeader.defaultProps = {
  subtitle: "",
  extra: null,
};

export default SectionHeader;