import React from 'react';

import { configure, shallow } from "enzyme";
import { createMount, createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import Restaurants from './Restaurants';
import { Typography, Select, MenuItem, Menu } from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<Dishes />', () => {
    let shallow, wrapper;

    beforeAll(() => {
        shallow = createShallow();
    });

    beforeEach(() => {
        wrapper = shallow(<Restaurants />);
    });

    it('should render heading ', () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
    });

    it('should find one select ', () => {
        expect(wrapper.find(Select)).toHaveLength(1);
    });

    
})