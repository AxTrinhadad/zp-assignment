import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import OrderFlow from './../OrderFlow/OrderFlow';
import DishesList from './DishesList';

import JsonData from './../../../data/dishes.json';

class Dishes extends Component {
    state = { 
        dish: '',
        servings: '',
        dishOptions: [],
        errorMessage: null,
        dishError: false,
        servError: false,
    }

    
    handleDishes = (e) => {
        e.preventDefault();

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });

        this.props.handleChange(e);
    } 

    handleAddDish = (e) => {
        e.preventDefault();

        //Validation
        let isValid = true;
        let errorDish, errorServ = false;

        const addCurrentDish = this.state.dish;
        const addCurrentServ = this.state.servings;

        if (!addCurrentDish) {
            errorDish = true;
            isValid = false;
        }

        if (!addCurrentServ) {
            errorServ = true;
            isValid = false;
        }

        //Handle Errors
        if (isValid) {
            this.setState({
                errorMessage: null,
                dishError: false,
                servError: false
            });

            this.props.addDish(addCurrentDish, addCurrentServ);
        } else {
            this.setState({
                errorMessage: 'Please ensure all fields have been entered',
                dishError: errorDish,
                servError: errorServ
            });
        }

        
    }

    handleContinue = (e) => {
        e.preventDefault();

        const servings = Object.values(this.props.dishes);
        let updServingTotal = 0;

        for (const serving of servings) {
            updServingTotal = updServingTotal + serving;
        }

        if (updServingTotal >= this.props.numberPeople) {
            this.props.nextStep();
        } else {
            let errorMsg = 'Please ensure you have enough dishes for the number of people (' + this.props.numberPeople + ')';
            this.setState({
                errorMessage: errorMsg
            });
        }
    } 

    componentDidMount() {
        const dishData = JsonData.dishes;
        let dishes = dishData.map((item) => {
            let dish = item.name;
            let restaurant = item.restaurant;
            let availableMeal = item.availableMeals;
            
            if (restaurant === this.props.restaurant) {
                return availableMeal
                    .filter((value) => value === this.props.meal)  
                    .map((key) => {
                        return dish;
                    })
            } else {
                return null;
            }    
        }).reduce((acc, val) => acc.concat(val), []);

        const updatedDishes = [...new Set(dishes.filter(Boolean))]

        this.setState({
            dishOptions: [...new Set(updatedDishes)]
        });
        
    }

    render () {
        const dishes = [...this.state.dishOptions];
        let dishOptions = dishes.map((value,key) => {
            return <MenuItem key={key} value={value}>{value}</MenuItem>;
        });

        let numberOfServings = []; 

        for (let i = 1; i < 11; i++) {
            numberOfServings.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }

        let displayErrorMessage;
        if (this.state.errorMessage) {
            displayErrorMessage = <p className="errorMessage">{this.state.errorMessage}</p>;
        }        

        return (
            <>
                <Typography variant="h6" gutterBottom>
                    Step 3
                </Typography>
                {displayErrorMessage}
                <Grid container spacing={24} alignItems="center"> 
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={this.state.dishError}>
                            <InputLabel htmlFor="demo-controlled-open-select">Please select a dish</InputLabel>
                            <Select
                                value={this.state.dish}
                                onChange={this.handleDishes}
                                inputProps={{
                                    name: 'dish'
                                }}>
                                {dishOptions}
                            </Select>
                        </FormControl>
                    </Grid> 
                    <Grid item xs={12} sm={6}> 
                        <FormControl fullWidth error={this.state.servError}>
                            <InputLabel htmlFor="demo-controlled-open-select">Please enter no. of servings</InputLabel>
                            <Select
                                value={this.state.servings}
                                onChange={this.handleDishes}
                                inputProps={{
                                    name: 'servings'
                                }}>
                                {numberOfServings}
                            </Select>
                        </FormControl> 
                    </Grid>
                    <Grid item xs={6} sm={3}> 
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handleAddDish}
                            >
                            <Icon>add_circle</Icon> Add Dish
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <DishesList dishes={this.props.dishes} />
                    </Grid>
                    

                </Grid>
                <OrderFlow 
                    activeStep={2}
                    prevStep={this.props.prevStep}
                    continue={this.handleContinue} />  
            </>
        );
    }
}

export default Dishes;