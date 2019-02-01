import React from 'react';

import { configure } from "enzyme";
import { createShallow,createMount } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import OrderFlow from './OrderFlow';

import { Button } from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<OrderFlow />', () => {
    let wrapper,shallow,mount;

    beforeAll(() => {
        shallow = createShallow();
        mount = createMount();
    });

    beforeEach(() => {
        wrapper = shallow(<OrderFlow />);
        
        wrapper.setProps({
            activeStep: 0
        });
    });

    afterAll(() => {
        mount.cleanUp();
    });

    it('should render container ', () => {
        expect(wrapper.find('.buttonContainer')).toHaveLength(1);;
    });

})





