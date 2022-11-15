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
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vQelcvFosb_CZfKBlXr4C-n8xXGb7oPalH7tPJwLWbQynuu5vY2UW9sADUTPXoodmTq3eF6fvjbBLnG/pub?gid=0&single=true&output=csv";
        const countryCasesRes = await fetch(countryCasesUrl);
        const countryCasesText = await countryCasesRes.text();
        const countriesCases = await csv().fromString(countryCasesText);
        const sortedArray = countriesCases.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const unique = sortedArray
          .map((e) => e["date"])

          // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)

          // eliminate the dead keys & store unique objects
          .filter((e) => sortedArray[e])
          .map((e) => sortedArray[e]);

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
              <Th onClick={() => sorting("date", "string")}>
                Date
                {order === "ASC" && sortedCol === "date" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "date" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
              <Th onClick={() => sorting("location", "string")}>
                Country{" "}
                {order === "ASC" && sortedCol === "location" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "location" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>

              <Th onClick={() => sorting("total_cases", "float")}>
                Total Cases
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
              <Th onClick={() => sorting("total_hospitalized", "float")}>
                Hospitalized
                {order === "ASC" && sortedCol === "total_hospitalized" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "total_hospitalized" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
              <Th onClick={() => sorting("new_hospitalized", "float")}>
                New Hospitalized
                {order === "ASC" && sortedCol === "new_hospitalized" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "new_hospitalized" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
              <Th onClick={() => sorting("total_icu", "float")}>
                In ICU
                {order === "ASC" && sortedCol === "total_icu" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "total_icu" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
              <Th onClick={() => sorting("new_icu", "float")}>
                New ICU
                {order === "ASC" && sortedCol === "new_icu" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "new_icu" && (
                  <GrDescend style={{ display: "inline" }} />
                )}
              </Th>
              <Th onClick={() => sorting("total_deaths", "float")}>
                Total deaths
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

              <Th onClick={() => sorting("total_recovered", "float")}>
                Recovered
                {order === "ASC" && sortedCol === "total_recovered" && (
                  <GrAscend style={{ display: "inline" }} />
                )}
                {order === "DSC" && sortedCol === "total_recovered" && (
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
                  date,
                  iso_code,
                  new_cases,
                  total_cases,
                  total_hospitalized,
                  new_hospitalized,
                  total_icu,
                  new_icu,
                  new_deaths,
                  total_deaths,
                  total_recovered,
                }) => (
                  <Tr key={date}>
                    <Td>{date}</Td>
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
                    <Td>{parseInt(total_cases).toLocaleString()}</Td>
                    <Td>{parseInt(new_cases).toLocaleString()}</Td>
                    <Td>{parseInt(total_hospitalized).toLocaleString()}</Td>
                    <Td>{parseInt(new_hospitalized).toLocaleString()}</Td>
                    <Td>{parseInt(total_icu).toLocaleString()}</Td>
                    <Td>{parseInt(new_icu).toLocaleString()}</Td>
                    <Td>{parseInt(total_deaths).toLocaleString()}</Td>
                    <Td>{parseInt(new_deaths).toLocaleString()}</Td>
                    <Td>{parseInt(total_recovered).toLocaleString()}</Td>
                  </Tr>
                )
              )}
          </Tbody>
        </Table>
      </TableContainer>
      <Text>
        <br />
        NOTE: Figures include probable cases and deaths which occurred in the
        weeks before the outbreak was declared. Probable cases totaling 21
        individuals are no longer updated and may not always be included in
        tallies published by other sources.
      </Text>{" "}
    </Box>
  );
}
