import * as React from "react";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Select, Box, Text } from "@chakra-ui/react";
import { colors } from "../../styles/colors.js";

import { csv } from "csvtojson";

export default function WorldTrends_Hospitalizations() {
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
  const filteredTotalHospitalized = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return Math.max(y["total_hospitalized"]);
      })
    )
  );
  const filteredNewHospitalized = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return y["new_hospitalized"];
      })
    )
  );
  const filteredTotalIcu = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return y["total_icu"];
      })
    )
  );
  const filteredNewIcu = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return y["new_icu"];
      })
    )
  );

  const filteredTotalDeaths = JSON.parse(
    JSON.stringify(
      filter.map((y) => {
        return y["total_deaths"];
      })
    )
  );

  const chartData = {
    labels: filteredDates,
    datasets: [
      {
        label: "Total In Hospital",
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.spaceCadet,
        borderColor: colors.spaceCadet,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.spaceCadet,
        pointBackgroundColor: colors.spaceCadet,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.spaceCadet,
        pointHoverBorderColor: colors.spaceCadet,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredTotalHospitalized,
      },

      {
        label: "Total in ICU",
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.aquamarine,
        borderColor: colors.aquamarine,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.aquamarine,
        pointBackgroundColor: colors.aquamarine,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.aquamarine,
        pointHoverBorderColor: colors.aquamarine,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredTotalIcu,
      },

      {
        label: "Total Deaths",
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.kineticBlack,
        borderColor: colors.kineticBlack,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.kineticBlack,
        pointBackgroundColor: colors.kineticBlack,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.kineticBlack,
        pointHoverBorderColor: colors.kineticBlack,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredTotalDeaths,
      },
    ],
  };

  return (
    <>
      <Box mt={2} mb={20}>
        <Select onChange={(e) => setFilterLocation(e.target.value)}>
          {/* 
          <option defaultValue={"World"}>World</option>
          */}
          {uniqueLocationOptions &&
            uniqueLocationOptions.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
        </Select>

        <div style={{ minHeight: "50vh" }}>
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        <Text mb={5} mt={10} color={"gray.500"}>
          Source:{" "}
          <a href={"https://www.health.go.ug/ebola/"}>
            Ugandan Ministry of Health
          </a>
          . Last update: {Date().toLocaleString().substring(0, 16)}
        </Text>
      </Box>
    </>
  );
}
