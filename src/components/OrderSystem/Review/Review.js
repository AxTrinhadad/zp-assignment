import React, { Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import OrderFlow from './../OrderFlow/OrderFlow';
import DishesList from '../Dishes/DishesList';


class Review extends Component {
    handleSubmission = (e) => {
        e.preventDefault();

        console.log(this.props)
    } 

    render () {         
        const restaurants = [...this.props.restaurantList];
        let restaurantList = restaurants.map((value,key) => {
            return <span key={key} style={{display: 'block'}}>{value}</span>;
        });

        return (
            <>
                <Typography variant="h6" gutterBottom>
                    Review
                </Typography>
                <Grid container spacing={24} alignItems="center"> 
                    <Grid> 
                        <List component="nav">
                            <ListItem>
                                <ListItemText primary="Meal" secondary={this.props.meal} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="No. of People" secondary={this.props.numberPeople} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Restaurant" secondary={restaurantList} />
                                
                            </ListItem>

                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        Dishes
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <DishesList dishes={this.props.dishes} />
                    </Grid>
                    

                </Grid>
                <OrderFlow 
                    activeStep={3}
                    prevStep={this.props.prevStep}
                    continue={this.handleSubmission} />  
            </>
        );
    }
}

export default Review;