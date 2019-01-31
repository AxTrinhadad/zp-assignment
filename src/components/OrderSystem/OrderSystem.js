import React, { Component } from 'react';
import styles from './OrderSystem.module.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import MealCategory from './MealCategory/MealCategory';
import Restaurants from './Restaurants/Restaurants';
import Dishes from './Dishes/Dishes';
import Review from './Review/Review';

import JsonData from './../../data/dishes.json'

const steps = ['Step 1', 'Step 2', 'Step 3', 'Review'];

class OrderSystem extends Component {
    state = {  
        step: 0,
        meal: '',
        numberPeople: 0,
        restaurant: '',
        dishes: [],
        dishData: JsonData.dishes,
        restaurantOptions: []

    }

    componentDidMount() {
        const dishData = { ...this.state.dishData };
        let restaurants = [];
        let mealTimes = [];

        console.log(dishData);

        Object.keys(dishData).map((key) => {
            let item = dishData[key];

            let restaurant = item.restaurant;
            
            if (!(restaurants.includes(restaurant))) {
                restaurants.push(restaurant);
            }

            let availableMeal = item.availableMeals;

            Object.keys(availableMeal).map((key) => {
                if (!(mealTimes.includes(availableMeal[key]))) {
                    mealTimes.push(availableMeal[key]);
                }
            })
        });

        this.setState({
            restaurantOptions: restaurants.sort(),
            mealTimeOptions: mealTimes.sort()
        });
        
    }

    getStepContent = () => {
        const step = this.state.step;

        switch (step) {
            case 0:
                return <MealCategory 
                            handleChange={this.handleChange}
                            meal={this.state.meal}
                            numberPeople={this.state.numberPeople}
                            />;  
    
                break;
            case 1:
                return <Restaurants />; 
    
                break;
            case 2:
                return <Dishes />; 
    
                break;
            case 3:
                return <Review />;    
    
                break;
            default:
                return <MealCategory 
                            handleChange={this.handleChange}
                            meal={this.state.meal}
                            />;     
                   
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);

        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
        });
    }

    // Go to next step
    nextStep = () => {
        const updatedStep = {
            ...this.state.step
        };

        this.setState({
            step: updatedStep + 1
        });
    }

    // Go to previous step
    prevStep = () => {
        const updatedStep = {
            ...this.state.step
        };

        if (updatedStep > 0) {
            this.setState({
                step: updatedStep - 1
            });
        }
    }

    render () {
        const activeStep = this.state.step;

        return (
            <>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>ZenPort</Typography>
                    </Toolbar>
                </AppBar>

                <main className={styles.content}>
                    <Paper>
                        <Stepper activeStep={activeStep}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                        </Stepper>
                        <div className={styles.contentPadding}>
                            
                            {this.getStepContent()}

                            <div className={styles.buttonContainer}>
                                {activeStep !== 0 && (
                                <Button onClick={this.prevStep}>
                                    Previous
                                </Button>
                                )}
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={this.nextStep}
                                >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </div>    
                    </Paper>
                </main>

            </> 
        )
          
    }
}

export default OrderSystem;