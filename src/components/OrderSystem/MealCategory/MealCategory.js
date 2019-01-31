import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const MealCategory = (props) => {
    const mealTimes = ['breakfast', 'lunch', 'dinner']
    let numberOfPeople = []; 

    for (let i = 1; i < 11; i++) {
        numberOfPeople.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    console.log(props.mealTimeOptions);
    let mealOptions = [];
    mealTimes.map((value,key) => {
        mealOptions.push(<MenuItem key={key} value={value}>{value}</MenuItem>);
    });
    
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Step 1
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="demo-controlled-open-select">Please select a meal time</InputLabel>
                        <Select
                            value={props.meal}
                            onChange={props.handleChange}
                            inputProps={{
                                name: 'meal'
                            }}>
                            {mealOptions}
                        </Select>
                    </FormControl>
                </Grid> 
                <Grid item xs={12} sm={6}> 
                    <FormControl fullWidth>
                        <InputLabel htmlFor="demo-controlled-open-select">Please enter the number of people</InputLabel>
                        <Select
                            value={props.numberPeople}
                            onChange={props.handleChange}
                            inputProps={{
                                name: 'numberPeople'
                            }}>
                            {numberOfPeople}
                        </Select>
                    </FormControl> 
                </Grid>   
            </Grid>   
        </>
    );
}

export default MealCategory;