import React from 'react';

import Button from '@material-ui/core/Button';

const OrderFlow = (props) => {
    return (
        <div className="buttonContainer">
            {props.activeStep !== 0 && (
            <Button onClick={props.prevStep}>
                Previous
            </Button>
            )}
            <Button
            variant="contained"
            color="primary"
            onClick={props.continue}
            >
            {props.activeStep === 3 ? 'Submit' : 'Next'}
            </Button>
        </div> 
    );
}

export default OrderFlow;