import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select }  from '@mui/material';
import styled from 'styled-components';
import getDayAndDate from '../../utils/getDayAndDate';

const CustomSelect = styled(Select)`
  &.Mui-focused fieldset {
    border-color: green !important;
  }
`;

const CustomInputLabel = styled(InputLabel)`
  &.Mui-focused {
    color: green !important;
  }
`;

export default function MUISelect() {
  const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setDate(new Date(event.target.value));
    console.log(date)
  };

  const currentDate=new Date();
  currentDate.setHours(0, 0, 0, 0);

  let bookingDays=[];
  bookingDays.push(currentDate);
  for (let i = 1; i <= 13; i++) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + i); 
    bookingDays.push(newDate);
  }

  return (
    <Box sx={{ minWidth: 180, backgroundColor: '#eef2e6', borderRadius: '5px' }}>
      <FormControl fullWidth>
        <CustomInputLabel id="demo-simple-select-label">Date</CustomInputLabel>
        <CustomSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={date}
          label="Date"
          onChange={handleChange}
          MenuProps={{ disableScrollLock: true }}
        >
          {bookingDays.length>0 && bookingDays.map((bookingDay) => (
            <MenuItem key={bookingDay} value={bookingDay.toString()}>{getDayAndDate(bookingDay)}</MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
    </Box>
  );
}
