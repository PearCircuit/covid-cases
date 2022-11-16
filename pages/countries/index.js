import Head from "next/head";
import { csv } from "csvtojson";
import {
  Container,
  Heading,
  Flex,
  Text,
  Box,
  Spacer,
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { colors } from "../../styles/colors.js";
import ReactTooltip from "react-tooltip";

import { SearchIcon } from "@chakra-ui/icons";

import Link from "next/link";
import React, { useState } from "react";
import WorldMap from "../components/WorldMap.js";

export const getStaticProps = async () => {
  // request countries
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const countrySummaryUrl = "https://api.countrystatecity.in/v1/countries";

  const countrySummaryRes = await fetch(countrySummaryUrl, requestOptions);
  const countrySummaryText = await countrySummaryRes.text();
  const countries = await JSON.parse(countrySummaryText);

  const countryCasesUrl =
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv";

  const countryCasesRes = await fetch(countryCasesUrl);
  const countryCasesText = await countryCasesRes.text();
  const countriesCases = await csv().fromString(countryCasesText);

  return {
    props: { countryList: countries, countryCaseData: countriesCases },
  };
};

const Countries = ({ countryList, countryCaseData }) => {
  const [countryFilter, setCountryFilter] = useState("");
  const handleSearch = (event) => setCountryFilter(event.target.value);
  const [content, setContent] = useState("");

  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="en-gb" />

        <title>
          Worldwide Covid cases {currentMonth} {currentYear}
        </title>
        <meta
          name="description"
          content={`${currentMonth} ${currentYear} Covid virus outbreak case totals and deaths. Charts, maps, and data.`}
        />

        <meta property="og:title" content="Covid Cases | Countries" />
        <meta
          property="og:description"
          content={`${currentMonth} ${currentYear} Covid virus outbreak case totals and deaths. Charts, maps, and data.`}
        />

        <meta property="og:url" content="https://covid-tracker.net/" />
        <meta
          property="og:image"
          content="https://covid-tracker.net/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content={`${currentMonth} ${currentYear} Covid virus outbreak case totals and deaths. Charts, maps, and data.`}
        />
        <meta
          property="twitter:image"
          content="https://covid-tracker.net/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="5xl">
        <Heading as="h1" mt={5}>
          Covid cases and deaths by country
        </Heading>

        <Container maxW={"5xl"} mt={5}>
          <WorldMap setTooltipContent={setContent} />
          {content && (
            <ReactTooltip>
              <Tooltip>{content}</Tooltip>
            </ReactTooltip>
          )}
        </Container>

        <Text mt={5}>
          Select a country to view more details about their Covid situation.
          Each country has a situation report, automatically generated from the
          most recent data. You can also view graphs of the disease activity in
          each country, and review data in tabular form. Data is sourced from
          Our World In Data.
        </Text>

        <InputGroup mt={5}>
          <Input
            variant="outline"
            value={countryFilter}
            onChange={handleSearch}
            placeholder="Search by country name"
          />
          <InputRightElement mr={3}>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>

        {countryList
          .filter((countryList) =>
            countryList.name.toLowerCase().includes(countryFilter.toLowerCase())
          )
          .map((countryList) => (
            <Box
              key={countryList.name}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              pt={2}
              pb={3}
              pr={10}
              pl={10}
              mt={5}
            >
              <Flex spacing={8} direction="row">
                <Center>
                  <div>
                    <Heading size="md" mt={1}>
                      {countryList.name}
                    </Heading>
                    <Text></Text>
                    <Text>
                      Total cases:{" "}
                      {countryCaseData
                        .filter((x) => x.location.includes(countryList.name))
                        .toString()
                        ? parseInt(
                            countryCaseData.filter((x) =>
                              x.location.includes(countryList.name)
                            )[0].total_cases
                          ).toLocaleString()
                        : 0}
                    </Text>
                  </div>
                </Center>

                <Spacer />
                <Center>
                  <Link href={"/countries/" + countryList.iso2}>
                    <Button>
                      <a>View data</a>
                    </Button>
                  </Link>
                </Center>
              </Flex>
            </Box>
          ))}
      </Container>
    </>
  );
};

export default Countries;
