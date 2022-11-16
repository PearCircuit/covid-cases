import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
} from "@chakra-ui/react";

const getCountryISO2 = require("country-iso-3-to-2");

import { colors } from "../../styles/colors";
import { GrAscend, GrDescend } from "react-icons/gr";

import { csv } from "csvtojson";

export default function WorldTable_FullHistory() {
  const [data, setData] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const [order, setOrder] = useState("DSC");
  const [sortedCol, setSortedCol] = useState("location");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryCasesUrl =
          "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv";
        const countryCasesRes = await fetch(countryCasesUrl);
        const countryCasesText = await countryCasesRes.text();
        const countriesCases = await csv().fromString(countryCasesText);
        const sortedArray = countriesCases.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const unique = sortedArray;

        const uniqueSortedAlpha = unique.sort((a, b) => {
          var locationA = a.location.toLowerCase(),
            locationB = b.location.toLowerCase();
          if (locationA < locationB)
            //sort string ascending
            return -1;
          if (locationA > locationB) return 1;
          return 0; //default return value (no sorting)
        });
        setData(uniqueSortedAlpha);

        setDidLoad(true);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (!didLoad) {
      fetchData();
    }
  }, []);

  const sorting = (col, datatype) => {
    setSortedCol(col);

    if (datatype === "string") {
      if (order === "ASC") {
        const sorted = [...data].sort((a, b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted);
        setOrder("DSC");
      }
      if (order === "DSC") {
        const sorted = [...data].sort((a, b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted);
        setOrder("ASC");
      }
    }
    if (datatype === "float") {
      if (order === "ASC") {
        const sorted = [...data].sort((a, b) =>
          parseFloat(a[col]) > parseFloat(b[col]) ? 1 : -1
        );
        setData(sorted);
        setOrder("DSC");
      }
      if (order === "DSC") {
        const sorted = [...data].sort((a, b) =>
          parseFloat(a[col]) < parseFloat(b[col]) ? 1 : -1
        );
        setData(sorted);
        setOrder("ASC");
      }
    }
  };

  return (
    <Box mt={2} mb={2}>
      <TableContainer maxHeight={400} overflowY="auto">
        <Table size="sm">
          <Thead position="sticky" top={0} bgColor="white">
            <Tr>
              <Th>Date</Th>
              <Th onClick={() => sorting("location", "string")}>
                Location{" "}
                {order === "ASC" && sortedCol === "location" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "location" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("total_cases", "float")}>
                Cases
                {order === "ASC" && sortedCol === "total_cases" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "total_cases" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
              <Th onClick={() => sorting("new_cases", "float")}>
                New Cases
                {order === "ASC" && sortedCol === "new_cases" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "new_cases" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("total_deaths", "float")}>
                Deaths
                {order === "ASC" && sortedCol === "total_deaths" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "total_deaths" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
              <Th onClick={() => sorting("new_deaths", "float")}>
                New Deaths
                {order === "ASC" && sortedCol === "new_deaths" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "new_deaths" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("hosp_patients", "float")}>
                Hosp
                {order === "ASC" && sortedCol === "hosp_patients" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "hosp_patients" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("icu_patients", "float")}>
                ICU
                {order === "ASC" && sortedCol === "icu_patients" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "icu_patients" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("total_cases_per_million", "float")}>
                Cases/Mil
                {order === "ASC" && sortedCol === "total_cases_per_million" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "total_cases_per_million" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("new_cases_per_million", "float")}>
                New Cases/Mil
                {order === "ASC" && sortedCol === "new_cases_per_million" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "new_cases_per_million" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("deaths_per_million", "float")}>
                Deaths/Mil
                {order === "ASC" && sortedCol === "deaths_per_million" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "deaths_per_million" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("new_deaths_per_million", "float")}>
                New Deaths/Mil
                {order === "ASC" && sortedCol === "new_deaths_per_million" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "new_deaths_per_million" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map(
                ({
                  location,
                  last_updated_date,
                  iso_code,
                  new_cases,
                  total_cases,
                  new_deaths,
                  total_deaths,
                  hosp_patients,
                  icu_patients,
                  total_cases_per_million,
                  new_cases_per_million,
                  total_deaths_per_million,
                  new_deaths_per_million,
                }) => (
                  <Tr key={iso_code}>
                    <Td>{last_updated_date}</Td>
                    <Td>
                      <a
                        href={`/countries/${getCountryISO2(iso_code)}`}
                        style={{
                          color: `${colors.tenneTawny}`,
                          textDecoration: "underline",
                        }}
                      >
                        {location}
                      </a>
                    </Td>
                    <Td>
                      {parseInt(total_cases)
                        ? parseInt(total_cases).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(new_cases)
                        ? parseInt(new_cases).toLocaleString()
                        : "-"}
                    </Td>

                    <Td>
                      {parseInt(total_deaths)
                        ? parseInt(total_deaths).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(new_deaths)
                        ? parseInt(new_deaths).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(hosp_patients)
                        ? parseInt(hosp_patients).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(icu_patients)
                        ? parseInt(icu_patients).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(total_cases_per_million)
                        ? parseInt(total_cases_per_million).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(new_cases_per_million)
                        ? parseInt(new_cases_per_million).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(total_deaths_per_million)
                        ? parseInt(total_deaths_per_million).toLocaleString()
                        : "-"}
                    </Td>
                    <Td>
                      {parseInt(new_deaths_per_million)
                        ? parseInt(new_deaths_per_million).toLocaleString()
                        : "-"}
                    </Td>
                  </Tr>
                )
              )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
