import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    Row,
    Col,
    Button,
    Space,
    Typography,
    Tag,
} from "antd";
import {
    EyeOutlined,
    DownloadOutlined,
    RobotOutlined,
    DatabaseOutlined,
    FileTextOutlined,
    ThunderboltOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";

import StatusBadge from "../../../components/common/StatusBadge";
import InfoItem from "../../../components/common/InfoItem";

import "../styles/EvaluationCard.css";

const { Title, Text } = Typography;

const EvaluationCard = ({
    evaluation,
    onView,
    onDownload,
}) => {

    const accuracyColor =
        evaluation.accuracy >= 95
            ? "#52c41a"
            : evaluation.accuracy >= 90
                ? "#faad14"
                : "#ff4d4f";

    const regressionColor =
        evaluation.regressions === 0
            ? "#52c41a"
            : evaluation.regressions <= 2
                ? "#faad14"
                : "#ff4d4f";

    return (
        <Card
            className="evaluation-card"
            hoverable
            bordered={false}
        >
            {/* Header */}
            <div className="evaluation-card-header">
                <div>
                    <Title
                        level={5}
                        className="evaluation-title"
                    >
                        {evaluation.project}
                    </Title>

                    <Text
                        type="secondary"
                        style={{
                            fontSize: 13,
                            letterSpacing: 0.5,
                        }}
                    >
                        {evaluation.id}
                    </Text>
                </div>

                <StatusBadge status={evaluation.status} />
            </div>

            {/* Information */}
            <Row
                gutter={[16, 16]}
                className="evaluation-info"
            >
                <Col span={12}>
                    <InfoItem
                        icon={<RobotOutlined />}
                        label="Model"
                        value={evaluation.model}
                    />
                </Col>

                <Col span={12}>
                    <InfoItem
                        label="Provider"
                        value={
                            <Tag
                                color="processing"
                                style={{
                                    fontWeight: 600,
                                    borderRadius: 6,
                                    padding: "2px 10px",
                                }}
                            >
                                {evaluation.provider}
                            </Tag>
                        }
                    />
                </Col>

                <Col span={12}>
                    <InfoItem
                        icon={<FileTextOutlined />}
                        label="Prompt"
                        value={evaluation.prompt}
                    />
                </Col>

                <Col span={12}>
                    <InfoItem
                        icon={<DatabaseOutlined />}
                        label="Dataset"
                        value={evaluation.dataset}
                    />
                </Col>

                <Col span={12}>
                    <InfoItem
                        icon={<ThunderboltOutlined />}
                        label="Accuracy"
                        value={
                            <span
                                style={{
                                    color: accuracyColor,
                                    fontWeight: 600,
                                }}
                            >
                                {evaluation.accuracy}%
                            </span>
                        }
                    />
                </Col>

                <Col span={12}>
                    <InfoItem
                        icon={<ClockCircleOutlined />}
                        label="Execution Time"
                        value={`${evaluation.executionTime} ms`}
                    />
                </Col>

                <Col span={12}>
                    <InfoItem
                        label="Regressions"
                        value={
                            <span
                                style={{
                                    color: regressionColor,
                                    fontWeight: 600,
                                }}
                            >
                                {evaluation.regressions}
                            </span>
                        }
                    />
                </Col>

                <Col span={12}>
                    <InfoItem
                        label="Created"
                        value={evaluation.createdAt}
                    />
                </Col>
            </Row>

            {/* Footer */}
            <div className="evaluation-footer">
                <Space
                    size="middle"
                    style={{ width: "100%" }}
                >
                    <Button
                        type="primary"
                        size="large"
                        icon={<EyeOutlined />}
                        block
                        onClick={() => onView(evaluation)}
                    >
                        View Details
                    </Button>

                    <Button
                        size="large"
                        icon={<DownloadOutlined />}
                        block
                        onClick={() => onDownload(evaluation)}
                    >
                        Download
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

EvaluationCard.propTypes = {
    evaluation: PropTypes.object.isRequired,
    onView: PropTypes.func,
    onDownload: PropTypes.func,
};

EvaluationCard.defaultProps = {
    onView: () => { },
    onDownload: () => { },
};

export default EvaluationCard;