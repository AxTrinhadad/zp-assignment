import React from 'react';

import { configure } from "enzyme";
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import Dishes from './Dishes';
import DishesList from './DishesList';
import { Select } from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<Dishes />', () => {
    let wrapper,mountWrap,shallow,mount;

    beforeAll(() => {
        shallow = createShallow();
        mount = createMount();
    });

    afterAll(() => {
        mount.cleanUp();
    });

    beforeEach(() => {
        wrapper = shallow(<Dishes />);
        wrapper.setProps({
            restaurant: 'Mc Donalds',
            meal: 'lunch'
        });
    });

    it('should render table ', () => {
        expect(wrapper.find(DishesList));
    });

    it('should find two selects ', () => {
        mountWrap = mount(<Dishes />);
        mountWrap.setProps({
            restaurant: 'Mc Donalds',
            meal: 'lunch'
        });
        expect(mountWrap.find(Select)).toHaveLength(2);
    });
})