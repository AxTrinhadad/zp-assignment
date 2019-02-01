import React from 'react';

import { configure } from "enzyme";
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import MealCategory from './MealCategory';

import { Select, Typography } from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<MeatCategory />', () => {
    let wrapper,shallow;

    beforeAll(() => {
        shallow = createShallow();
    });

    beforeEach(() => {
        wrapper = shallow(<MealCategory />);
        
        wrapper.setState({
            step: 0
        });
    });

    it('should render heading ', () => {
        expect(wrapper.find(Typography)).toHaveLength(1);;
    });

    it('should render 2 select fields ', () => {
        expect(wrapper.find(Select)).toHaveLength(2);;
    });

})





