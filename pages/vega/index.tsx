import { useEffect, useRef, useState } from "react";
import embed, { VisualizationSpec } from "vega-embed";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  const visRef = useRef(null);
  const [log, setLog] = useState("hello");

  useEffect(() => {
    const vlSpec: string | VisualizationSpec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      data: {
        values: [
          { category: "A", group: "x", value: 0.1 },
          { category: "A", group: "y", value: 0.6 },
          { category: "A", group: "z", value: 0.9 },
          { category: "B", group: "x", value: 0.7 },
          { category: "B", group: "y", value: 0.2 },
          { category: "B", group: "z", value: 1.1 },
          { category: "C", group: "x", value: 0.6 },
          { category: "C", group: "y", value: 0.1 },
          { category: "C", group: "z", value: 0.2 },
        ],
      },
      mark: {
        type: "bar",
        tooltip: true,
        cornerRadiusTopRight: 3,
        cornerRadiusTopLeft: 3,
      },
      background: "transparent",
      encoding: {
        x: {
          field: "category",
          axis: {
            labelColor: "white",
            titleColor: "white",
          },
        },
        y: {
          field: "value",
          type: "quantitative",
          axis: {
            labelColor: "white",
            titleColor: "white",
          },
        },
        xOffset: { field: "group" },
        color: { field: "group" },
      },
    };
    var tooltipOptions = {
      formatTooltip: (value: any, sanitize: any) => {
        return `<h1 class="text-blue-500">My custom tooltip and ${sanitize(value.category)}.</h1><div`;
      },
    };

    if (visRef.current) {
      embed(visRef.current, vlSpec, {
        actions: false,
        theme: "quartz",
        tooltip: tooltipOptions,
      }).then(({ spec, view }) => {
        view.addEventListener("mouseenter", (event, item) => {
          setLog("is hovered");
        });
        view.addEventListener("mouseleave", (event, item) => {
          setLog("is leaved");
        });
      });
    }
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Vega Lite</h1>
        <div ref={visRef} className="mt-5" />
        <h5>{log}</h5>
      </section>
    </DefaultLayout>
  );
}
