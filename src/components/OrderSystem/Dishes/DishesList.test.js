import React from 'react';

import { configure } from "enzyme";
import { createMount, createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import DishesList from './DishesList';
import { Table, TableBody, TableRow } from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<DishesList />', () => {
    let wrapper,shallow,mount;

    beforeAll(() => {
        shallow = createShallow();
        mount = createMount();
    });

    it('should render table ', () => {
        wrapper = shallow(<DishesList />);

        expect(wrapper.find(Table));
    });

    it('should list all dishes (3) ', () => {
        wrapper = mount(<DishesList />);
        wrapper.setProps({
            dishes: {
                Fries: 3,
                Steak: 2,
                Ravioli: 1
            }
        });
        expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(3);
    });
})