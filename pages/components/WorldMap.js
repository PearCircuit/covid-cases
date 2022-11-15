import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Box, Text } from "@chakra-ui/react";

import { csv } from "csvtojson";

import { colors } from "../../styles/colors.js";

const WorldMapChart = ({ setTooltipContent }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryCasesUrl =
          "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv";
        const countryCasesRes = await fetch(countryCasesUrl);
        const countryCasesText = await countryCasesRes.text();
        const countriesCases = await csv().fromString(countryCasesText);
        setData(countriesCases);
        setDidLoad(true);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (!didLoad) {
      fetchData();
    }
  }, []);

  return (
    <div data-tip="">
      <ComposableMap projection="geoMercator">
        <Graticule stroke="#f2f0f0" />
        <ZoomableGroup
          filterZoomEvent={(evt) => {
            return evt.type === "wheel" ? false : true;
          }}
        >
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.filter(
                  (s) =>
                    s.location.toLowerCase() ===
                    geo.properties.name.toLowerCase()
                );

                const colorScale = scaleLinear()
                  .domain([0, 500000])
                  .range([colors.yellowRed, colors.tenneTawny]);

                return (
                  <Geography
                    key={geo.properties.name}
                    geography={geo}
                    stroke="#ffffff"
                    strokeWidth={1}
                    onMouseEnter={() => {
                      d.length > 0
                        ? setTooltipContent(
                            `${geo.properties.name}: ${parseInt(
                              d[d.length - 1].total_cases
                            ).toLocaleString()} cases`
                          )
                        : setTooltipContent(`${geo.properties.name}: 0`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/countries/${geo.properties.Alpha_2}`);
                    }}
                    style={{
                      default: {
                        fill:
                          d.length > 0
                            ? colorScale(
                                `${d[d.length - 1].total_cases_per_million}`
                              )
                            : colors.yellowOrange,
                        outline: "none",
                      },
                      hover: {
                        fill: colors.tenneTawny,
                      },
                      pressed: {
                        fill: d
                          ? colorScale(`${d.total_cases_per_million}`)
                          : colors.yellowRed,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(WorldMapChart);
