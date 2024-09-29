import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetMonthWiseOrdersQuery } from "@/redux/features/orderApi";
import { useEffect, useState } from "react";

interface MonthWiseOrderData {
  month: string;
  order: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
    barThickness: number;
    borderColor: string;
    borderWidth: number;
  }[];
}

const ChartSection = () => {
  const { data: monthWiseOrderData, isLoading: monthWiseOrderLoading } =
    useGetMonthWiseOrdersQuery({});
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (monthWiseOrderData && monthWiseOrderData.data) {
      const labels = monthWiseOrderData.data.map(
        (item: MonthWiseOrderData) => item.month
      );
      const data = monthWiseOrderData.data.map(
        (item: MonthWiseOrderData) => item.order
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Order",
            data,
            backgroundColor: "black",
            borderRadius: 10,
            barThickness: 40,
            borderColor: "white",
            borderWidth: 4,
          },
        ],
      });
    }
  }, [monthWiseOrderData]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Last 12 Month Orders",
      },
    },
  };

  return (
    <div>
      {monthWiseOrderLoading ? (
        <div>
          <div className="flex justify-center items-center gap-10 w-full h-80">
            <div className="border-t-4 border-blue-500 border-solid h-10 w-10 rounded-full animate-spin "></div>
          </div>
        </div>
      ) : (
        <Bar options={options} data={chartData} />
      )}
    </div>
  );
};

export default ChartSection;
