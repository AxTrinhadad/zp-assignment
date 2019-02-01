import React, { Component } from 'react';
import styles from './OrderSystem.module.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import MealCategory from './MealCategory/MealCategory';
import Restaurants from './Restaurants/Restaurants';
import Dishes from './Dishes/Dishes';
import Review from './Review/Review';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Review'];

class OrderSystem extends Component {
    state = {  
        step: 0,
        meal: '',
        numberPeople: 0,
        restaurant: '',
        restaurantList: [],
        dishes: {}
    }

    getStepContent = () => {
        const step = this.state.step;

        switch (step) {
            case 0:
                return <MealCategory 
                            handleChange={this.handleChange}
                            nextStep={this.nextStep}
                            meal={this.state.meal}
                            numberPeople={this.state.numberPeople}
                            />; 
            case 1:
                return <Restaurants
                            handleChange={this.handleChange}
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            meal={this.state.meal}
                            restaurant={this.state.restaurant}
                             />;
            case 2:
                return <Dishes
                            handleChange={this.handleChange}
                            addDish={this.addDish}
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            meal={this.state.meal}
                            numberPeople={this.state.numberPeople}
                            restaurant={this.state.restaurant}
                            dishes={this.state.dishes}
                            />; 
            case 3:
                return <Review
                            handleChange={this.handleChange}
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            meal={this.state.meal}
                            numberPeople={this.state.numberPeople}
                            restaurant={this.state.restaurant}
                            restaurantList={this.state.restaurantList}
                            dishes={this.state.dishes}
                            />;  
            default:
                return <MealCategory 
                            handleChange={this.handleChange}
                            nextStep={this.nextStep}
                            meal={this.state.meal}
                            numberPeople={this.state.numberPeople}
                            />;     
                   
        }
    }

    handleChange = (e) => {
        //console.log(e.target.value);

        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
        });
    }

    addDish = (dish,serving) => {
        const dishes = {...this.state.dishes};
        const currentRestaurant = this.state.restaurant;

        let curRestaurantList = [...this.state.restaurantList];
        let updatedDishes = dishes;

        if (dishes[dish]) {
            let currentServing = dishes[dish] + serving;
            if (currentServing > 10) currentServing = 10;

            updatedDishes[dish] = currentServing;

            curRestaurantList.push(currentRestaurant);
        } else {
            updatedDishes[dish] = serving;
            curRestaurantList.push(currentRestaurant);
        }

        this.setState({
           dishes: updatedDishes,
           restaurantList: curRestaurantList
        });
    }

    // Go to next step
    nextStep = () => {
        const updatedStep = this.state.step;

        this.setState({
            step: updatedStep + 1
        });
    }

    // Go to previous step
    prevStep = () => {
        const updatedStep = this.state.step;

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
                        </div>    
                    </Paper>
                </main>

            </> 
        )
          
    }
}

export default OrderSystem;