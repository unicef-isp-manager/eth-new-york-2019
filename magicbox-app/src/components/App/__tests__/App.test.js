import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { App } from '../App';

describe("App", () => {
  it('renders without crashing', () => {
    const props = {
      onLoadMap: () => null,
      onCountryClick: () => null,
      toggleDataInfo: () => null,
      toggleSidePanel: () => null,
      enableBuilderMode: () => null,
      match: {
        params: {
          country: 'Testing',
        },
      },
      app: {
        ui: {
          loading: 100,
        },
      },
      history: {
        listen: () => null,
      },
      location: {},
      dispatch: () => null,
    };

    const wrapper = shallow(<App {...props}/>);
    expect(wrapper.exists('.App')).toEqual(true);
  });
});
