import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import OrderFlow from './../OrderFlow/OrderFlow';

class MealCategory extends Component {
    state = {
        mealError: false,
        peopleError: false,
        errorMessage: null
    }

    handleContinue = (e) => {
        e.preventDefault();

        //Validation
        let isValid = true;
        let errorMeal, errorPeople = false;

        if (!this.props.meal) {
            errorMeal = true;
            isValid = false;
        }

        if (!this.props.numberPeople) {
            errorPeople = true;
            isValid = false;
        }
        
        //Handle Errors
        if (isValid) {
            this.setState({
                errorMessage: null,
                peopleError: false,
                mealError: false
            });

            this.props.nextStep();
        } else {
            this.setState({
                errorMessage: 'Please ensure all fields have been entered',
                mealError: errorMeal,
                peopleError: errorPeople
            });
        }
        
    } 

    render () {
        const mealTimes = ['breakfast', 'lunch', 'dinner']
        let numberOfPeople = []; 

        //Create Serving Options
        for (let i = 1; i < 11; i++) {
            numberOfPeople.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
        
        //Create Meal Options
        let mealOptions = mealTimes.map((value,key) => {
            return <MenuItem key={key} value={value}>{value}</MenuItem>;
        });

        //Display any errors
        let displayErrorMessage;
        if (this.state.errorMessage) {
            displayErrorMessage = <p className="errorMessage">{this.state.errorMessage}</p>;
        }
            

        return (
            <>
                <Typography variant="h6" gutterBottom>
                    Step 1
                </Typography>
                {displayErrorMessage}
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={this.state.mealError}>
                            <InputLabel htmlFor="demo-controlled-open-select">Please select a meal time</InputLabel>
                            <Select
                                value={this.props.meal}
                                onChange={this.props.handleChange}
                                inputProps={{
                                    id: 'select-meal',
                                    name: 'meal'
                                }}>
                                {mealOptions}
                            </Select>
                        </FormControl>
                    </Grid> 
                    <Grid item xs={12} sm={6}> 
                        <FormControl fullWidth error={this.state.peopleError}>
                            <InputLabel htmlFor="demo-controlled-open-select">Please enter the number of people</InputLabel>
                            <Select
                                value={this.props.numberPeople}
                                onChange={this.props.handleChange}
                                inputProps={{
                                    id: 'select-people',
                                    name: 'numberPeople'
                                }}>
                                {numberOfPeople}
                            </Select>
                        </FormControl> 
                    </Grid>   
                </Grid>
                <OrderFlow 
                    activeStep={0}
                    continue={this.handleContinue} />  
            </>
        );
    }
}

export default MealCategory;