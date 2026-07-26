import React, { useEffect, useMemo } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";

const { TextArea } = Input;

const MODEL_OPTIONS = {
  Google: [
    "Gemini 2.5 Flash",
    "Gemini 2.5 Pro",
  ],
  OpenAI: [
    "GPT-4.1",
    "GPT-4o",
    "o4-mini",
  ],
  Anthropic: [
    "Claude Sonnet 4",
    "Claude Opus 4",
  ],
  Azure: [
    "GPT-4.1",
    "GPT-4o",
  ],
  Meta: [
    "Llama 4 Scout",
    "Llama 4 Maverick",
  ],
};

const PROJECT_TYPES = [
  "LLM Evaluation",
  "RAG",
  "Chatbot",
  "AI Agent",
  "Classification",
  "Custom",
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

  const modelOptions = useMemo(() => {
    if (!provider) return [];
    return MODEL_OPTIONS[provider] || [];
  }, [provider]);

  useEffect(() => {
    if (open) {
      form.resetFields();

      form.setFieldsValue({
        provider: "Google",
        model: "Gemini 2.5 Flash",
        projectType: "LLM Evaluation",
        tags: ["evaluation"],
      });
    }
  }, [open, form]);

  useEffect(() => {
    if (!provider) return;

    form.setFieldValue(
      "model",
      MODEL_OPTIONS[provider]?.[0]
    );
  }, [provider, form]);

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      const newProject = {
        id: Date.now(),

        name: values.projectName,

        description:
          values.description ||
          "No description provided.",

        provider: values.provider,

        model: values.model,

        projectType:
          values.projectType,

        tags: values.tags || [],

        status: "Active",

        healthScore: 100,

        averageAccuracy: 100,

        evaluations: 0,

        createdAt:
          new Date().toISOString(),
      };

      onCreate(newProject);

      message.success(
        "Project created successfully!"
      );

      form.resetFields();
    } catch {
      // Validation handled by Ant Design
    }
  };

  return (
    <Modal
      open={open}
      title="Create New Project"
      centered
      width={720}
      okText="Create Project"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[
            {
              required: true,
              message:
                "Please enter a project name.",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Customer Support Evaluation"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            rows={4}
            placeholder="Briefly describe the purpose of this project..."
          />
        </Form.Item>

        <Form.Item
          label="AI Provider"
          name="provider"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            size="large"
            options={[
              {
                value: "Google",
                label: "Google",
              },
              {
                value: "OpenAI",
                label: "OpenAI",
              },
              {
                value: "Anthropic",
                label: "Anthropic",
              },
              {
                value: "Azure",
                label: "Azure",
              },
              {
                value: "Meta",
                label: "Meta",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            size="large"
            options={modelOptions.map(
              (model) => ({
                value: model,
                label: model,
              })
            )}
          />
        </Form.Item>

        <Form.Item
          label="Project Type"
          name="projectType"
        >
          <Select
            size="large"
            options={PROJECT_TYPES.map(
              (type) => ({
                value: type,
                label: type,
              })
            )}
          />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
        >
          <Select
            mode="tags"
            size="large"
            placeholder="Add tags"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;