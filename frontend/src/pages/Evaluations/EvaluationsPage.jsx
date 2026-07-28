import React from "react";
import { Row, Col, Empty } from "antd";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import EvaluationStats from "./components/EvaluationStats";
import EvaluationFilters from "./components/EvaluationFilters";
import EvaluationCard from "./components/EvaluationCard";

import useEvaluations from "./hooks/useEvaluations";

const EvaluationsPage = () => {
  const {
    evaluations,
    statistics,

    search,
    status,
    model,

    setSearch,
    setStatus,
    setModel,
  } = useEvaluations();

  return (
    <>
      <PageHeader
        title="Evaluations"
        subtitle="Manage, monitor and analyze all AI model evaluation runs from a single workspace."
      />

      <EvaluationStats
        totalEvaluations={statistics.totalEvaluations}
        averageAccuracy={statistics.averageAccuracy}
        totalRegressions={statistics.totalRegressions}
        averageExecutionTime={statistics.averageExecutionTime}
      />

      <div style={{ margin: "24px 0" }}>
        <EvaluationFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          model={model}
          onModelChange={setModel}
        />
      </div>

      {evaluations.length === 0 ? (
        <Empty description="No evaluations found." />
      ) : (
        <Row gutter={[16, 16]}>
          {evaluations.map((evaluation) => (
            <Col
              xs={24}
              lg={12}
              xl={8}
              key={evaluation.id}
            >
              <EvaluationCard
                evaluation={evaluation}
                onView={(item) => console.log(item)}
                onDownload={(item) =>
                  console.log("Download", item)
                }
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default EvaluationsPage;