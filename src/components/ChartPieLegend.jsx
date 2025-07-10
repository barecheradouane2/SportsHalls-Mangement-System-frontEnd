"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
};

export function ChartPieLegend({ statitics }) {
  if (!statitics || statitics.length === 0) {
    return <div>No data to display</div>;
  }

  const chartData = statitics.map((stat) => ({
    browser: stat.name,
    visitors: stat.count,
    fill: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        {/* <CardTitle>Pie Chart - Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" nameKey="browser">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={({ payload }) => (
                <div className="flex flex-wrap gap-2 mt-2">
                  {payload?.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 basis-1/4 justify-center"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">
                        {entry.payload.browser} {`(${entry.payload.visitors})`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              className="-translate-y-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
