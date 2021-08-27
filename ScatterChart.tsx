import React, { useEffect, useState } from 'react';
import ContentWrapper from 'src/components/ContentWrapper';
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Scatter } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core';
import * as scatterData from './ScatterData';

let chartTitleMap = null;
function SpeedCharts() {
  const theme = useTheme();
  const [options, setOptions] = useState({
    legend: {
      display: false
    },
    type: 'Scatter',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20 },
      margin: { top: 30 }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'nearest',
      intersect: false,
      caretSize: 6,
      displayColors: false,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 4,
      borderColor: theme.palette.common.black,
      backgroundColor: theme.palette.common.black,
      titleFontColor: theme.palette.common.white,
      bodyFontColor: theme.palette.common.white,
      footerFontColor: theme.palette.common.white,
      callbacks: {
        title: () => {},
        label: (tooltipItem: any) => {
          return `${
            chartTitleMap[tooltipItem.xLabel + '_' + tooltipItem.yLabel]
          }`;
        }
      }
    }
  });
  const { t }: { t: any } = useTranslation();
  const [chartData, setChartData] = useState(null);
  const loadGraphData = async () => {
    // const response = await axios.get(
    //   'https://ckinnocloud1.interplay.iterate.ai/api/v1/scatter',
    //   {
    //     headers: {
    //       apikey: '38Qn_bAKiUq0o4wK9FN0zlwYgthXkA',
    //       Authorization:
    //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsInVzZXJzIjoidXNlcnMiLCJwcm92aWRlciI6ImxvY2FsIiwicmVmcmVzaCI6dHJ1ZSwiaWF0IjoxNjIxMjkxMTIwLCJleHAiOjE3NTA4OTExMjB9.TOL9P0tJXqgrFryug5y7ZXaZTU3-hwwu-8nCAQVpyUA'
    //     }
    //   }
    // );
    // const { data: respData } = response;
    // const chartData = Object.keys(respData).map(key => {
    //   return {
    //     x: respData[key].days,
    //     y: Number(respData[key].percent_eli)
    //   };
    // });
    const bgColors = [];
    const map = {};
    const chartData = Object.keys(scatterData).map(key => {
      const pct = Number(scatterData[key].percent_eli);
      let bgColor = '#f38b4a';
      if (pct == 0) {
        bgColor = '#ff2222';
      } else if (pct < 2) {
        bgColor = '#ff6d6d';
      } else if (pct < 5) {
        bgColor = '#fdfdd5';
      } else if (pct < 8) {
        bgColor = '#ffffba';
      } else if (pct < 15) {
        bgColor = '#ffff22';
      } else if (pct < 20) {
        bgColor = '#b6e4b6';
      } else if (pct < 25) {
        bgColor = '#74d874';
      } else if (pct < 30) {
        bgColor = '#36d236';
      } else if (pct > 35) {
        bgColor = '#008000';
      }
      bgColors.push(bgColor);
      map[scatterData[key].days + '_' + pct] = key;
      return {
        x: scatterData[key].days,
        y: pct
      };
    });
    chartTitleMap = map;
    setOptions({ ...options });
    const data = {
      datasets: [
        {
          label: 'Stores',
          data: chartData,
          backgroundColor: bgColors
        }
      ]
    };
    setChartData(data);
  };

  useEffect(() => {
    loadGraphData().then();
  }, []);

  return (
    // <ContentWrapper title="Innovation Cloud_Interplay">
    <Container maxWidth="lg" style={{ marginTop: '1rem' }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} style={{ minHeight: 400 }}>
          <Scatter data={chartData} options={options} />
        </Grid>
      </Grid>
    </Container>
    // </ContentWrapper>
  );
}

export default SpeedCharts;
