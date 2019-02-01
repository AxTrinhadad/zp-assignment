import { configure} from "enzyme";
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

describe('<OrderSystem />', () => {
    let shallow;

    // before(() => {
    //     shallow = createShallow();
    // });

    it('should render component ', () => {
        //const wrapper = shallow(<OrderSystem />);
    });
})