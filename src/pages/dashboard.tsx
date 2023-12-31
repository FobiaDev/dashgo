import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { ApexOptions } from "apexcharts";

import { useAuth } from "../contexts/hooks/useAuth";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import { useCan } from "../hooks/useCan";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-07-23T00:00:00.000Z",
      "2022-07-24T00:00:00.000Z",
      "2022-07-25T00:00:00.000Z",
      "2022-07-26T00:00:00.000Z",
      "2022-07-27T00:00:00.000Z",
      "2022-07-28T00:00:00.000Z",
      "2022-07-29T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const series = [{ name: "series1", data: [31, 120, 10, 27, 51, 187, 38] }];

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px">
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Inscritos da semana
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Taxa de abertura
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;
