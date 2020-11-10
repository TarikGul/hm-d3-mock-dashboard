import React, { useState, useEffect } from 'react';
import ChartWrapper from './Chart/ChartWrapper';
import Navbar from './Navbar/Navbar';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// import chartData from './data/csvjson.json'
import '../App.css';
// Load Hellometer font source
import 'fontsource-poppins';
// Load Mock JSON
const chartData = require('../data/csvjson.json');
//Global Typography
const theme = createMuiTheme({
  typography: {
    'fontFamily': `'Poppins', 'Helvetica', 'Arial', sans-serif`,
    'fontSize': 14,
    'fontWeightLight': 300,
    'fontWeightRegular': 400,
    'fontWeightMedium': 500
  }
});

const useStyles = makeStyles((theme) => ({
  dateContainer: {
    float: 'right',
    // marginRight: 150,
    // justifyContent: 'flex-end'
  },
  shelfContainer: {
    width: '90%',
    textAlign: 'left',
    marginLeft: 80,
  }
}));

function App() {
  const classes = useStyles();

  const [data,             setData] = useState([]);
  const [activeName, setActiveName] = useState('');
  const [selectedFromDate, handleFromDateChange] = useState(new Date('Mon Aug 03 2020 07:19:16 GMT-0700'));
  const [selectedToDate, handleToDateChange] = useState(new Date('Tue Aug 25 2020 22:14:10 GMT-0700'));

  useEffect(() => {
    // Locally loaded JSON. 
    setData(chartData);

  }, [selectedToDate, selectedFromDate]);


  const renderChart = (selectedFromDate, selectedToDate) => {
    if (data.length === 0) {
      return 'No Data Yet'
    }
    return <ChartWrapper data={data} from={selectedFromDate} to={selectedToDate}/>
  }

  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <Navbar />
      <div className={classes.shelfContainer} display="flex">
          <Typography>
            Total Time of Service per customer.
        </Typography>
        <div className={classes.dateContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker label='From' value={selectedFromDate} onChange={handleFromDateChange} />
            <DatePicker label='To' value={selectedToDate} onChange={handleToDateChange} />
          </MuiPickersUtilsProvider>
        </div>
      </div>
        {renderChart(selectedFromDate, selectedToDate)}
    </div>
    </MuiThemeProvider>
  );
}

export default App;
