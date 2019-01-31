import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navigation from './Navigation';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<Navigation />', () => {
    it('Should render 3 steps and review step', () => {
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });
});
