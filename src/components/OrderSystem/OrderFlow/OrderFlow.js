import React from 'react';

import Button from '@material-ui/core/Button';

const OrderFlow = (props) => {
    return (
        <div className="buttonContainer">
            {props.activeStep !== 0 && (
            <Button className="previousBtn" onClick={props.prevStep}>
                Previous
            </Button>
            )}
            <Button
            className="nextBtn"
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