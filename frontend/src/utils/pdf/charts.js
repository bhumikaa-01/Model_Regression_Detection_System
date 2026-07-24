import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

/* ===========================================================
   Create Canvas
=========================================================== */

function createCanvas(width = 900, height = 450) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

/* ===========================================================
   Value Labels Plugin
=========================================================== */

const valueLabelPlugin = {
  id: "valueLabel",

  afterDatasetsDraw(chart) {
    const {
      ctx,
      data,
    } = chart;

    ctx.save();

    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#1E293B";
    ctx.textAlign = "center";

    chart.getDatasetMeta(0).data.forEach(
      (bar, index) => {
        ctx.fillText(
          `${data.datasets[0].data[index]}%`,
          bar.x,
          bar.y - 10
        );
      }
    );

    ctx.restore();
  },
};

/* ===========================================================
   Accuracy Comparison Chart
=========================================================== */

export function generateAccuracyChart(report) {
  const canvas = createCanvas();

  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",

    data: {
      labels: [
        "Previous",
        "Current",
      ],

      datasets: [
        {
          label: "Accuracy",

          data: [
            report.previous_accuracy ?? 0,
            report.current_accuracy ?? 0,
          ],

          backgroundColor: [
            "#94A3B8",
            "#2563EB",
          ],

          borderColor: [
            "#64748B",
            "#1D4ED8",
          ],

          borderWidth: 1.5,

          borderRadius: 12,

          borderSkipped: false,

          barPercentage: 0.55,

          categoryPercentage: 0.6,
        },
      ],
    },

    options: {
      responsive: false,

      animation: false,

      layout: {
        padding: {
          top: 25,
          right: 20,
          left: 10,
          bottom: 10,
        },
      },

      plugins: {
        legend: {
          display: false,
        },

        title: {
          display: true,

          text: "Accuracy Comparison",

          color: "#0F172A",

          font: {
            size: 20,
            weight: "bold",
          },

          padding: {
            bottom: 20,
          },
        },

        tooltip: {
          callbacks: {
            label(context) {
              return `Accuracy: ${context.raw}%`;
            },
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },

          ticks: {
            color: "#334155",

            font: {
              size: 12,
              weight: "bold",
            },
          },
        },

        y: {
          beginAtZero: true,

          max: 100,

          ticks: {
            stepSize: 20,

            color: "#475569",

            callback(value) {
              return `${value}%`;
            },
          },

          grid: {
            color: "#E2E8F0",
          },
        },
      },
    },

    plugins: [valueLabelPlugin],
  });

  return canvas.toDataURL("image/png");
}