import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const DishesList = (props) => {

    const orderedDishes = props.dishes;
    let orderedDishesList = [];
    let dishCount = 0;
    if (orderedDishes) {
        for (let key in orderedDishes) {
            if (orderedDishes.hasOwnProperty(key)) {
                dishCount += 1;
                const dishQuantity = orderedDishes[key];
                orderedDishesList.push(
                    <TableRow key={dishCount}>
                        <TableCell align="left">{dishCount}</TableCell>
                        <TableCell component="th" scope="row">{key}</TableCell>
                        <TableCell align="right">{dishQuantity}</TableCell>
                    </TableRow>);
            }
        }
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Dish</TableCell>
                    <TableCell align="right">Servings</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orderedDishesList}
            </TableBody>
        </Table>            
    ) 
}

export default DishesList;