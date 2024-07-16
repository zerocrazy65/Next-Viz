import * as Plot from "@observablehq/plot";
import { useEffect } from "react";

import DefaultLayout from "@/layouts/default";

// const alphabet = [
//   { letter: "A", frequency: 3 },
//   { letter: "B", frequency: 5 },
//   { letter: "C", frequency: 6 },
//   { letter: "D", frequency: 2 },
//   { letter: "E", frequency: 12 },
// ];

const data = [
  { name: "A", value: 10 },
  { name: "B", value: 20 },
  { name: "C", value: 15 },
  { name: "D", value: 25 },
  { name: "E", value: 18 },
];

function App() {
  useEffect(() => {
    const plot = Plot.plot({
      width: 400,
      height: 200,
      marginLeft: 40,
      x: {
        label: "Name",
        domain: data.map((d) => d.name),
        padding: 0.1,
      },
      y: {
        label: "Value",
        domain: [0, Math.max(...data.map((d) => d.value))],
      },
      marks: [Plot.barY(data, { x: "name", y: "value", fill: "steelblue" })],
    });

    const container = document.getElementById("plot-container");

    container?.appendChild(plot);

    return () => {
      container?.removeChild(plot);
    };
  }, []);

  return (
    <DefaultLayout>
      <div>
        <div id="plot-container" />
      </div>
    </DefaultLayout>
  );
}

export default App;
