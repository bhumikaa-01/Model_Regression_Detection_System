import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tag,
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

const providerModels = {
  OpenAI: ["GPT-4.1", "GPT-4o", "GPT-4.1 Mini"],
  Google: [
    "Gemini 2.5 Flash",
    "Gemini 2.5 Pro",
  ],
  Anthropic: [
    "Claude 4 Sonnet",
    "Claude 4 Opus",
  ],
  "Azure OpenAI": ["GPT-4o"],
};

const tagOptions = [
  "LLM",
  "RAG",
  "Classification",
  "Chatbot",
  "Finance",
  "Healthcare",
  "Legal",
  "Analytics",
  "SQL",
  "Enterprise",
];

const CreateProjectModal = ({
  open,
  onCancel,
  onCreate,
}) => {
  const [form] = Form.useForm();

  const provider = Form.useWatch(
    "provider",
    form
  );

  const handleFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Create Project"
      open={open}
      okText="Create Project"
      width={700}
      destroyOnClose
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            {
              required: true,
              message:
                "Please enter project name.",
            },
          ]}
        >
          <Input
            placeholder="Customer Support Assistant"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message:
                "Please enter description.",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Brief description of the project..."
          />
        </Form.Item>

        <Space
          style={{ width: "100%" }}
          size="large"
        >
          <Form.Item
            label="Provider"
            name="provider"
            style={{ flex: 1 }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select Provider"
            >
              {Object.keys(providerModels).map(
                (item) => (
                  <Option
                    key={item}
                    value={item}
                  >
                    {item}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            style={{ flex: 1 }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Model">
              {(providerModels[provider] ||
                []).map((model) => (
                <Option
                  key={model}
                  value={model}
                >
                  {model}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>

        <Form.Item
          label="Tags"
          name="tags"
        >
          <Select
            mode="multiple"
            placeholder="Select tags"
          >
            {tagOptions.map((tag) => (
              <Option
                key={tag}
                value={tag}
              >
                <Tag color="blue">{tag}</Tag>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateProjectModal;