import React from 'react';

import { configure } from "enzyme";
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import OrderSystem from './OrderSystem';
import MealCategory from './MealCategory/MealCategory';
import Restaurants from './Restaurants/Restaurants';
import Dishes from './Dishes/Dishes';
import Review from './Review/Review';

import { Select, Stepper } from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<Order System />', () => {
    let wrapper,shallow;

    beforeAll(() => {
        shallow = createShallow();
    });

    beforeEach(() => {
        wrapper = shallow(<OrderSystem />);
        
        wrapper.setState({
            step: 0
        });
    });

    it('should render stepper ', () => {
        expect(wrapper.find(Stepper)).toHaveLength(1);;
    });

    it('if default step, should find <MealCategory /> ', () => {
        expect(wrapper.find(MealCategory)).toHaveLength(1);
    });

    it('if step = 1, should find <Restaurants /> ', () => {
        wrapper.setState({
            step: 1
        });

        expect(wrapper.find(Restaurants)).toHaveLength(1);
    });

    it('if step = 1, should find <Dishes /> ', () => {
        wrapper.setState({
            step: 2
        });
        expect(wrapper.find(Dishes)).toHaveLength(1);
    });

    it('if step = 1, should find <Review /> ', () => {
        wrapper.setState({
            step: 3
        });
        expect(wrapper.find(Review)).toHaveLength(1);
    });

})