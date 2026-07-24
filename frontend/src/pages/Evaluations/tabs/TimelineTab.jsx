import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Space,
  Tag,
  Timeline,
  Typography,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const TimelineTab = ({ timeline }) => {
  const getColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "running":
        return "blue";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined />;
      case "running":
        return <SyncOutlined spin />;
      case "failed":
        return <CloseCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  return (
    <Card
      title="Evaluation Execution Timeline"
      bordered={false}
    >
      <Timeline
        mode="left"
        items={timeline.map((item, index) => ({
          color: getColor(item.status),
          dot: getIcon(item.status),
          children: (
            <Space
              direction="vertical"
              size={4}
              style={{ width: "100%" }}
            >
              <Space
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Title
                  level={5}
                  style={{ margin: 0 }}
                >
                  {item.title}
                </Title>

                <Tag color={getColor(item.status)}>
                  {item.status.toUpperCase()}
                </Tag>
              </Space>

              <Text type="secondary">
                {item.timestamp}
              </Text>

              <Text>
                {item.description}
              </Text>
            </Space>
          ),
        }))}
      />
    </Card>
  );
};

TimelineTab.propTypes = {
  timeline: PropTypes.array.isRequired,
};

export default TimelineTab;