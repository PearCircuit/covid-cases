import React, { useState } from "react";
import Head from "next/head.js";
import { csv } from "csvtojson";
import { colors } from "../../styles/colors.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Text,
  Center,
  Heading,
  Container,
  GridItem,
  SimpleGrid,
  Grid,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Breadcrumb,
  BreadcrumbItem,
  Box,
  Stack,
} from "@chakra-ui/react";
import TwitterButton from "../components/social/TwitterButton";

import { ChevronRightIcon } from "@chakra-ui/icons";
import Chart from "chart.js/auto";

import Link from "next/link";

export const getStaticPaths = async () => {
  // csc api
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const url = "https://api.countrystatecity.in/v1/countries";

  const res = await fetch(url, requestOptions);
  const text = await res.text();
  const data = await JSON.parse(text);

  const paths = data.map((countryVal) => {
    return {
      params: { country: countryVal.iso2 },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const countryIso2 = context.params.country;

  // csc api
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const countryDetailsUrl = `https://api.countrystatecity.in/v1/countries/${countryIso2}`;
  const countryDetailsRes = await fetch(countryDetailsUrl, requestOptions);
  const countryDetailsText = await countryDetailsRes.text();
  const countryDetails = await JSON.parse(countryDetailsText);

  const countryDataUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQelcvFosb_CZfKBlXr4C-n8xXGb7oPalH7tPJwLWbQynuu5vY2UW9sADUTPXoodmTq3eF6fvjbBLnG/pub?gid=0&single=true&output=csv";

  const res = await fetch(countryDataUrl);
  const text = await res.text();
  const jsonArray = await csv().fromString(text);

  const stateDataUrl = `https://api.countrystatecity.in/v1/countries/${countryIso2}/states`;

  const stateDataRes = await fetch(stateDataUrl, requestOptions);
  const stateDataText = await stateDataRes.text();
  const stateDataDetails = await JSON.parse(stateDataText);

  const filteredJsonArray = jsonArray.filter(
    (x) => x.location === countryDetails.name
  );

  return {
    props: {
      countryCaseData: filteredJsonArray,
      countryDetails: countryDetails,
      states: stateDataDetails,
    },
  };
};

const CountryDetails = ({ countryCaseData, countryDetails, states }) => {
  const filteredDates = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["date"];
      })
    )
  );
  const filteredTotalCases = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["total_cases"];
      })
    )
  );
  const filteredNewCases = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["new_cases_smoothed"];
      })
    )
  );
  const filteredNewCasesPerMillion = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["new_cases_per_million"];
      })
    )
  );
  const filteredTotalCasesPerMillion = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["total_cases_per_million"];
      })
    )
  );

  const filteredTotalDeaths = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["total_deaths"];
      })
    )
  );

  const filteredTotalHospitalized = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["total_hospitalized"];
      })
    )
  );
  const filteredTotalIcu = JSON.parse(
    JSON.stringify(
      countryCaseData.map((y) => {
        return y["total_icu"];
      })
    )
  );

  const chartDataTotalCases = {
    labels: filteredDates,
    datasets: [
      {
        label: "Total Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.cadmiumOrange,
        borderColor: colors.cadmiumOrange,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.cadmiumOrange,
        pointBackgroundColor: colors.cadmiumOrange,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.cadmiumOrange,
        pointHoverBorderColor: colors.cadmiumOrange,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredTotalCases,
      },
      {
        label: "Total Cases Per Million",
        fill: true,
        lineTension: 0.1,
        backgroundColor: colors.darkOrange,
        borderColor: colors.darkOrange,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.darkOrange,
        pointBackgroundColor: colors.darkOrange,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.darkOrange,
        pointHoverBorderColor: colors.darkOrange,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredTotalCasesPerMillion,
      },
    ],
  };
  const chartDataNewCases = {
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
      {
        label: "New Cases Per Million",
        fill: true,
        lineTension: 0.1,
        backgroundColor: colors.darkOrange,
        borderColor: colors.darkOrange,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.darkOrange,
        pointBackgroundColor: colors.darkOrange,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.darkOrange,
        pointHoverBorderColor: colors.darkOrange,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 1,
        data: filteredNewCasesPerMillion,
      },
    ],
  };
  const chartDataNewDeaths = {
    labels: filteredDates,
    datasets: [
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
  const chartDataHospitalizations = {
    labels: filteredDates,
    datasets: [
      {
        label: "Total in Hospital",
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.cadmiumOrange,
        borderColor: colors.cadmiumOrange,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.cadmiumOrange,
        pointBackgroundColor: colors.cadmiumOrange,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.cadmiumOrange,
        pointHoverBorderColor: colors.cadmiumOrange,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredTotalHospitalized,
      },
      {
        label: "Total in ICU",
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.darkOrange,
        borderColor: colors.darkOrange,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.darkOrange,
        pointBackgroundColor: colors.darkOrange,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.darkOrange,
        pointHoverBorderColor: colors.darkOrange,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: filteredTotalIcu,
      },
    ],
  };

  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }
  const [countryName, setCountryName] = useState(
    countryDetails.name ? countryDetails.name : ""
  );
  const [countryNewCases, setCountryNewCases] = useState(
    countryCaseData.length
      ? ~~countryCaseData[countryCaseData.length - 1].new_cases
      : ""
  );
  const [countryNewDeaths, setCountryNewDeaths] = useState(
    countryCaseData.length
      ? ~~countryCaseData[countryCaseData.length - 1].new_deaths
      : "0"
  );

  const [countryTotalCases, setCountryTotalCases] = useState(
    countryCaseData.length
      ? ~~countryCaseData[countryCaseData.length - 1].total_cases
      : "0"
  );
  const [countryTotalDeaths, setCountryTotalDeaths] = useState(
    countryCaseData.length
      ? ~~countryCaseData[countryCaseData.length - 1].total_deaths
      : "0"
  );

  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="en-gb" />

        <title>
          Ebola in {countryName} as of {currentMonth} {currentYear} | Ebola
          Cases
        </title>
        <meta
          name="description"
          content={`Charting the ${countryName} ebola outbreak, with updated ${currentMonth} ${currentYear} case and death counts.`}
        />

        <meta
          property="og:title"
          content={`Ebola in ${countryName} as of ${currentMonth} ${currentYear} | Ebola Cases - Ebola Deaths`}
        />
        <meta
          property="og:description"
          content={`Charting the ${countryName} ebola outbreak, with updated ${currentMonth} ${currentYear} case and death counts.`}
        />

        <meta property="og:url" content="https://ebola-cases.com/" />
        <meta
          property="og:image"
          content="https://ebola-cases.com/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content={`Charting the ${countryName} ebola outbreak, with updated ${currentMonth} ${currentYear} case and death counts.`}
        />
        <meta
          property="twitter:image"
          content="https://ebola-cases.com/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="5xl" mt={35}>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <Link href="/">
              <a>Home</a>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link href="/countries">
              <a>Countries</a>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <a>{countryName}</a>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as="h1" size="4xl">
          {countryName} {countryDetails.emoji}
        </Heading>
        <Heading as="h2" size="md">
          Ebola Outbreak: Country Details
        </Heading>{" "}
        <StatGroup mt={5} mb={5}>
          <Stat>
            <StatLabel>Total Cases</StatLabel>
            <StatNumber>
              {countryTotalCases ? countryTotalCases.toLocaleString() : 0}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {countryNewCases ? countryNewCases.toLocaleString() : 0}
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>New Deaths</StatLabel>
            <StatNumber>
              {countryNewDeaths ? countryNewDeaths.toLocaleString() : 0}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {countryNewDeaths ? countryNewDeaths.toLocaleString() : 0}
            </StatHelpText>
          </Stat>
        </StatGroup>
        <Heading as="h2" mt={10} mb={5}>
          Ebola virus disease outbreak in {countryName}: case counts, deaths,
          and statistics
        </Heading>
        <Text>
          Ebola virus disease, or EVD, is a deadly disease with occasional
          outbreaks that occur mostly on the African continent. EVD most
          commonly affects people and nonhuman primates, such as monkeys,
          gorillas, and chimpanzees. It is caused by an infection with a group
          of viruses within the genus Ebolavirus. <br /> <br />
        </Text>
        <Text>
          The Ebola virus is a deadly virus that causes hemorrhagic fever in
          humans and other primates. Symptoms may appear anywhere from 2 to 21
          days after contact with the virus, with an average of 8 to 10 days.
          The course of the illness typically progresses from “dry” symptoms
          initially, such as fever, aches and pains, and fatigue, and then
          progresses to “wet” symptoms, such as diarrhea and vomiting as the
          person becomes sicker.
          <br /> <br />
        </Text>
        <Text>
          This page shows data for the ebola virus disease outbreak currently
          taking place in {countryName}. This outbreak is part of the larger
          outbreak taking place in {countryDetails.region}, specifically in{" "}
          {countryDetails.subregion}.
          <br />
          <br />
        </Text>
        <Text>
          Based on the most recent reports available from the government in{" "}
          {countryDetails.capital}, health authorities in {countryName} have
          reported {countryNewCases.toLocaleString()} new case
          {countryNewCases == 1 ? `` : `s`} and{" "}
          {countryNewDeaths ? countryNewDeaths.toLocaleString() : 0} new death
          {countryNewDeaths == 1 ? `` : `s`}. The people of {countryName} have
          experienced {countryTotalCases.toLocaleString()} total case
          {countryTotalCases == 1 ? `` : `s`} since the start of the outbreak.
          <br />
          <br />
          You can use the charts on this page to explore the spread of ebola in{" "}
          {countryName}. Lastly, you can see how the {countryName} ebola
          situation compares with the situation globally on the{" "}
          <Link href="/">
            <a style={{ color: `${colors.tenneTawny}` }}>
              ebola-cases.com homepage
            </a>
          </Link>
          .
        </Text>
        <Button onClick={copy} mt={5} mb={5}>
          {!copied ? "Copy report URL" : "Copied link!"}
        </Button>
        <TwitterButton />
        <SimpleGrid columns={[1, null, 2]}>
          <GridItem w="100%" mt={10}>
            <Heading as="h3" size="sm">
              <Center mb={1}>{countryName}: Total Ebola Cases</Center>
            </Heading>
            <div style={{ minHeight: "40vh" }}>
              {countryCaseData[0] ? (
                <Line
                  data={chartDataTotalCases}
                  options={{ maintainAspectRatio: false }}
                />
              ) : (
                <Center>No cases detected yet.</Center>
              )}
            </div>
          </GridItem>
          <GridItem w="100%" mt={10}>
            <Heading as="h3" size="sm">
              <Center mb={1}>{countryName}: New Ebola Cases </Center>
            </Heading>
            <div style={{ minHeight: "40vh" }}>
              {countryCaseData[0] ? (
                <Line
                  data={chartDataNewCases}
                  options={{ maintainAspectRatio: false, barThickness: 5 }}
                />
              ) : (
                <Center>No cases detected yet.</Center>
              )}
            </div>
          </GridItem>
          <GridItem w="100%" mt={10}>
            <Heading as="h3" size="sm">
              <Center mb={1}>{countryName}: Ebola Deaths</Center>
            </Heading>
            <div style={{ minHeight: "40vh" }}>
              {countryCaseData[0] ? (
                <Line
                  data={chartDataNewDeaths}
                  options={{ maintainAspectRatio: false }}
                />
              ) : (
                <Center>No cases detected yet.</Center>
              )}
            </div>
          </GridItem>
          <GridItem w="100%" mt={10}>
            <Heading as="h3" size="sm">
              <Center mb={1}>{countryName}: Ebola Hospitalizations</Center>
            </Heading>
            <div style={{ minHeight: "40vh" }}>
              {countryCaseData[0] ? (
                <Line
                  data={chartDataHospitalizations}
                  options={{ maintainAspectRatio: false }}
                />
              ) : (
                <Center>No cases detected yet.</Center>
              )}
            </div>
          </GridItem>
        </SimpleGrid>
        <Text mb={5} mt={10} color={"gray.500"}>
          Source:{" "}
          <a href={"https://www.health.go.ug/ebola/"}>
            Ugandan Ministry of Health
          </a>
          . Last update: {Date().toLocaleString().substring(0, 16)}
        </Text>
        <Heading mt={5} mb={5} as="h2" size="sm">
          View {countryName} outbreak by subregion
        </Heading>
        <SimpleGrid
          minChildWidth="100px"
          spacingX="40px"
          spacingY="15px"
          mb={5}
        >
          {states.map((state) => (
            <Box key={state.id}>
              <Link href={`/states/${countryDetails.iso2}_${state.iso2}`}>
                <a>
                  <Text noOfLines={1}>{state.name}</Text>
                </a>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default CountryDetails;
