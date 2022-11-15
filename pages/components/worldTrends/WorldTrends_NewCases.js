import * as React from "react";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Select, Box, Text } from "@chakra-ui/react";
import { colors } from "../../../styles/colors.js";

import { csv } from "csvtojson";

export default function WorldTrends_NewCases() {
  const [data, setData] = useState([]);
  const [filterLocation, setFilterLocation] = useState("Uganda"); // change to "World" to default to world

  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQelcvFosb_CZfKBlXr4C-n8xXGb7oPalH7tPJwLWbQynuu5vY2UW9sADUTPXoodmTq3eF6fvjbBLnG/pub?gid=0&single=true&output=csv";

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

  const nonUniqueLocationOptions = JSON.parse(
    JSON.stringify(
      data.map((y) => {
        return y["location"];
      })
    )
  );
  const uniqueLocationOptions = [...new Set(nonUniqueLocationOptions)];
  const filter = data.filter((x) => x.location === filterLocation);

  const filteredDates = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return y["date"];
      })
    )
  );

  const filteredNewCases = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return y["new_cases_smoothed"];
      })
    )
  );
  const filteredNewCasesPerMillion = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return y["new_cases_per_million"];
      })
    )
  );

  const chartData = {
    labels: filteredDates,
    datasets: [
      {
        label: "New Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.tenneTawny,
        borderColor: colors.tenneTawny,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.tenneTawny,
        pointBackgroundColor: colors.tenneTawny,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.tenneTawny,
        pointHoverBorderColor: colors.tenneTawny,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredNewCases,
      },
    ],
  };

  return (
    <>
      <Box mt={2} mb={2}>
        {/* 
        <Select onChange={(e) => setFilterLocation(e.target.value)}>
       
          <option defaultValue={"World"}>World</option>
       
          {uniqueLocationOptions &&
            uniqueLocationOptions.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
            </Select>*/}

        <div style={{ minHeight: "35vh" }}>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Box>
    </>
  );
}
