import { useEffect, useState } from "react";
import { Loader2, Play, X } from "lucide-react";

import Button from "../ui/Button";
import { getEvaluationConfig } from "../../services/api";

export default function RunEvaluationModal({
  isOpen,
  onClose,
  onRun,
  loading = false,
}) {
  const [configLoading, setConfigLoading] = useState(false);

  const [models, setModels] = useState([]);
  const [promptVersions, setPromptVersions] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const [model, setModel] = useState("");
  const [promptVersion, setPromptVersion] = useState("");
  const [dataset, setDataset] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const loadConfig = async () => {
      try {
        setConfigLoading(true);

        const config = await getEvaluationConfig();

        setModels(config.models);
        setPromptVersions(config.prompt_versions);
        setDatasets(config.datasets);

        if (config.models.length > 0) {
          setModel(config.models[0].id);
        }

        if (config.prompt_versions.length > 0) {
          setPromptVersion(config.prompt_versions[0].id);
        }

        if (config.datasets.length > 0) {
          setDataset(config.datasets[0].id);
        }
      } catch (error) {
        console.error("Failed to load evaluation config", error);
      } finally {
        setConfigLoading(false);
      }
    };

    loadConfig();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onRun({
      model,
      prompt_version: promptVersion,
      dataset,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              🚀 Run Evaluation
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Configure a new evaluation run.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          {configLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2
                className="animate-spin text-blue-500"
                size={30}
              />
            </div>
          ) : (
            <>
              {/* Model */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Model
                </label>

                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  {models.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prompt Version */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Prompt Version
                </label>

                <select
                  value={promptVersion}
                  onChange={(e) =>
                    setPromptVersion(e.target.value)
                  }
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  {promptVersions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dataset */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Dataset
                </label>

                <select
                  value={dataset}
                  onChange={(e) => setDataset(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  {datasets.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-800 p-6">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={
              loading ||
              configLoading ||
              !model ||
              !promptVersion ||
              !dataset
            }
          >
            <span className="flex items-center gap-2">
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run Evaluation
                </>
              )}
            </span>
          </Button>
        </div>

      </div>
    </div>
  );
}