import React from "react";
import {
  Card,
  Skeleton,
  Row,
  Col,
  Space,
} from "antd";

const SkeletonCard = () => (
  <Card
    className="project-card-v2"
    bodyStyle={{ padding: 24 }}
  >
    <Space
      direction="vertical"
      size={18}
      style={{ width: "100%" }}
    >
      <Skeleton.Avatar
        active
        size="large"
        shape="circle"
      />

      <Skeleton
        active
        title={{ width: "60%" }}
        paragraph={{
          rows: 2,
          width: ["100%", "85%"],
        }}
      />

      <Skeleton.Button
        active
        block
        size="small"
      />

      <Row gutter={12}>
        {[1, 2, 3, 4].map((item) => (
          <Col span={6} key={item}>
            <Skeleton.Button
              active
              block
              size="small"
            />
          </Col>
        ))}
      </Row>

      <Skeleton.Button
        active
        block
        size="large"
      />
    </Space>
  </Card>
);

const ProjectSkeleton = () => {
  return (
    <Row gutter={[24, 24]}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Col
          xs={24}
          md={12}
          xl={8}
          key={item}
        >
          <SkeletonCard />
        </Col>
      ))}
    </Row>
  );
};

export default ProjectSkeleton;