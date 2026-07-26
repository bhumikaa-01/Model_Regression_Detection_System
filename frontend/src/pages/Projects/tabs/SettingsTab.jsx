import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  message,
} from "antd";
import {
  DeleteOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const providerModels = {
  OpenAI: [
    "gpt-4.1",
    "gpt-4o",
    "gpt-4o-mini",
  ],
  Google: [
    "gemini-2.5-pro",
    "gemini-2.5-flash",
  ],
  Anthropic: [
    "claude-opus-4",
    "claude-sonnet-4",
  ],
  "Azure OpenAI": [
    "gpt-4o",
    "gpt-4.1",
  ],
};

const SettingsTab = ({ project }) => {
  const [form] = Form.useForm();

  const provider =
    Form.useWatch("provider", form) ||
    project.provider;

  const handleSave = (values) => {
    console.log(values);
    message.success(
      "Project settings saved successfully."
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        projectName: project.name,
        description: project.description,
        provider: project.provider,
        model: project.model,
        accuracyThreshold: 95,
        regressionThreshold: 5,
        emailNotifications: true,
        slackNotifications: true,
        autoEvaluation: true,
      }}
      onFinish={handleSave}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%" }}
      >
        <Card title="Project Information">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[
                  {
                    required: true,
                    message:
                      "Project name is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Provider"
                name="provider"
              >
                <Select
                  options={Object.keys(
                    providerModels
                  ).map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Model"
                name="model"
              >
                <Select
                  options={(
                    providerModels[
                      provider
                    ] || []
                  ).map((model) => ({
                    label: model,
                    value: model,
                  }))}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
              >
                <Input.TextArea
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Evaluation Thresholds">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Minimum Accuracy (%)"
                name="accuracyThreshold"
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Regression Threshold (%)"
                name="regressionThreshold"
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Notifications">
          <Space
            direction="vertical"
            size="middle"
          >
            <Form.Item
              name="emailNotifications"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
              <Text
                style={{
                  marginLeft: 12,
                }}
              >
                Email Notifications
              </Text>
            </Form.Item>

            <Form.Item
              name="slackNotifications"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
              <Text
                style={{
                  marginLeft: 12,
                }}
              >
                Slack Notifications
              </Text>
            </Form.Item>

            <Form.Item
              name="autoEvaluation"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
              <Text
                style={{
                  marginLeft: 12,
                }}
              >
                Automatically Run
                Evaluations
              </Text>
            </Form.Item>
          </Space>
        </Card>

        <Card>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
          >
            Save Changes
          </Button>
        </Card>

        <Card danger>
          <Title level={5}>
            Danger Zone
          </Title>

          <Text type="secondary">
            These actions are permanent and
            should be used carefully.
          </Text>

          <Divider />

          <Space wrap>
            <Button
              danger
              icon={<StopOutlined />}
            >
              Archive Project
            </Button>

            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
            >
              Delete Project
            </Button>
          </Space>
        </Card>
      </Space>
    </Form>
  );
};

SettingsTab.propTypes = {
  project: PropTypes.object.isRequired,
};

export default SettingsTab;