import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Row,
  Space,
  Spin,
  Tabs,
  Tag,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  RobotOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

import SectionHeader from "../../components/common/SectionHeader";
import StatusBadge from "../../components/common/StatusBadge";
import MetricCard from "../../components/common/MetricCard";

import useEvaluationDetails from "./hooks/useEvaluationDetails";

import OverviewTab from "./tabs/OverviewTab";
import MetricsTab from "./tabs/MetricsTab";
import TimelineTab from "./tabs/TimelineTab";
import LogsTab from "./tabs/LogsTab";
import ReportTab from "./tabs/ReportTab";
import TestCasesTab from "./tabs/TestCasesTab";

import "./styles/EvaluationDetails.css";

const { Title, Text } = Typography;

const EvaluationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    evaluation,
    overview,
    metrics,
    report,
    timeline,
    logs,
    testCases,
    loading,
    error,
    refresh,
  } = useEvaluationDetails(id);

  if (loading) {
    return (
      <div className="evaluation-details-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        type="error"
        message={error}
        showIcon
      />
    );
  }

  const items = [
    {
      key: "overview",
      label: "Overview",
      children: <OverviewTab overview={overview} />,
    },
    {
      key: "metrics",
      label: "Metrics",
      children: <MetricsTab metrics={metrics} />,
    },
    {
      key: "timeline",
      label: "Timeline",
      children: <TimelineTab timeline={timeline} />,
    },
    {
      key: "logs",
      label: "Logs",
      children: <LogsTab logs={logs} />,
    },
    {
      key: "testcases",
      label: "Test Cases",
      children: (
        <TestCasesTab testCases={testCases} />
      ),
    },
    {
      key: "report",
      label: "Report",
      children: <ReportTab report={report} />,
    },
  ];

  return (
    <div className="evaluation-details-page">
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%" }}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Back to Evaluations
        </Button>

        <SectionHeader
          title={evaluation.project}
          subtitle={`Evaluation ID • ${evaluation.id}`}
          extra={
            <Space>
              <StatusBadge status={evaluation.status} />

              <Button
                icon={<ReloadOutlined />}
                onClick={refresh}
              >
                Refresh
              </Button>
            </Space>
          }
        />

        <Card className="evaluation-summary-card">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12} lg={6}>
              <Space>
                <RobotOutlined className="summary-icon" />
                <div>
                  <Text type="secondary">
                    Model
                  </Text>
                  <br />
                  <Title level={5}>
                    {evaluation.model.name}
                  </Title>
                  <Tag color="processing">
                    {evaluation.model.provider}
                  </Tag>
                </div>
              </Space>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Space>
                <DatabaseOutlined className="summary-icon" />
                <div>
                  <Text type="secondary">
                    Dataset
                  </Text>
                  <br />
                  <Title level={5}>
                    {evaluation.dataset}
                  </Title>
                </div>
              </Space>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Space>
                <CalendarOutlined className="summary-icon" />
                <div>
                  <Text type="secondary">
                    Executed On
                  </Text>
                  <br />
                  <Title level={5}>
                    {evaluation.createdAt}
                  </Title>
                </div>
              </Space>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Space>
                <ClockCircleOutlined className="summary-icon" />
                <div>
                  <Text type="secondary">
                    Execution Time
                  </Text>
                  <br />
                  <Title level={5}>
                    {evaluation.executionTime} ms
                  </Title>
                </div>
              </Space>
            </Col>
          </Row>
        </Card>

        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <MetricCard
              title="Accuracy"
              value={`${evaluation.accuracy}%`}
              trend="+0.8% vs previous run"
            />
          </Col>

          <Col xs={24} md={8}>
            <MetricCard
              title="Regressions"
              value={evaluation.regressions}
              trend={
                evaluation.regressions === 0
                  ? "No regressions detected"
                  : `${evaluation.regressions} detected`
              }
              trendColor={
                evaluation.regressions === 0
                  ? "#52c41a"
                  : "#ff4d4f"
              }
            />
          </Col>

          <Col xs={24} md={8}>
            <MetricCard
              title="Latency"
              value={`${evaluation.executionTime}`}
              suffix="ms"
              trend="-34 ms faster"
            />
          </Col>
        </Row>

        <Card className="evaluation-tabs-card">
          <Tabs
            defaultActiveKey="overview"
            items={items}
            destroyInactiveTabPane={false}
            size="large"
          />
        </Card>
      </Space>
    </div>
  );
};

export default EvaluationDetails;