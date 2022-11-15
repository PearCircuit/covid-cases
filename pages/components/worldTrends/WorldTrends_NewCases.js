import * as React from "react";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Select, Box, Text } from "@chakra-ui/react";
import { colors } from "../../../styles/colors.js";

import { csv } from "csvtojson";

export default function WorldTrends_NewCases() {
  const [data, setData] = useState(["World"]);
  const [filterLocation, setFilterLocation] = useState("World"); // change to "World" to default to world

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_cases.csv";

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const text = await res.text();
        const jsonArray = await csv().fromString(text);
        setData(jsonArray);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  // dataset quirk - filter out these terms
  const uniqueLocationOptions = Object.keys(data[0]).filter(
    (location) => location != "date" && location != "World"
  );

  const filteredDates = JSON.parse(
    JSON.stringify(
      data.map((y) => {
        return y["date"];
      })
    )
  );

  const filteredNewCases = JSON.parse(
    JSON.stringify(
      data.map((y) => {
        return y[filterLocation];
      })
    )
  );

  const chartData = {
    labels: filteredDates,
    datasets: [
      {
        label: "New Cases",
        fill: true,
        lineTension: 0.1,
        backgroundColor: colors.yellowRed,
        borderColor: colors.yellowRed,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.yellowRed,
        pointBackgroundColor: colors.yellowRed,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.yellowRed,
        pointHoverBorderColor: colors.yellowRed,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        data: filteredNewCases,
        pointRadius: 0,
      },
    ],
  };

  return (
    <>
      <Box mt={2} mb={2}>
        {
          <Select onChange={(e) => setFilterLocation(e.target.value)}>
            <option defaultValue={"World"}>World</option>

            {uniqueLocationOptions &&
              uniqueLocationOptions.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
          </Select>
        }

        <div style={{ minHeight: "35vh" }}>
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Box>
    </>
  );
}
