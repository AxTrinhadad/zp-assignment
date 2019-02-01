import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import OrderFlow from './../OrderFlow/OrderFlow';

import JsonData from './../../../data/dishes.json'

class Restaurants extends Component {
    state = {
        restaurantError: false,
        errorMessage: null,
        restaurantOptions: []
    }

    handleContinue = (e) => {
        e.preventDefault();

        //Validation
        let isValid = true;

        if (!this.props.restaurant) {
            isValid = false;
        }
        
        //Handle any errors
        if (isValid) {
            this.setState({
                errorMessage: null,
                restaurantError: false
            });

            this.props.nextStep();
        } else {
            this.setState({
                errorMessage: 'Please ensure all fields have been entered',
                restaurantError: true
            });
        }
    } 

    componentDidMount() {
        //Handle Json Data
        const dishData = JsonData.dishes;
        let restaurants = dishData.map((item) => {
            let availableMeal = item.availableMeals;

            return availableMeal
                .filter((value) => value === this.props.meal)
                .map((meal) => {
                    return item.restaurant;
                });

        }).reduce((acc, val) => acc.concat(val), []);

        this.setState({
            restaurantOptions: [...new Set(restaurants)]
        });
        
    }

    render () {
        //Create available restaurants
        const restaurants = [...this.state.restaurantOptions];
        let restaurantOptions = restaurants.map((value,key) => {
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
                    Step 2
                </Typography>
                {displayErrorMessage}
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={this.state.restaurantError}>
                            <InputLabel htmlFor="demo-controlled-open-select">Please select a restaurant</InputLabel>
                            <Select
                                value={this.props.restaurant}
                                onChange={this.props.handleChange}
                                inputProps={{
                                    name: 'restaurant'
                                }}>
                                {restaurantOptions}
                            </Select>
                        </FormControl>
                    </Grid>   
                </Grid> 
                <OrderFlow 
                    activeStep={1}
                    prevStep={this.props.prevStep}
                    continue={this.handleContinue} /> 
            </>
        );
    }
}

export default Restaurants;