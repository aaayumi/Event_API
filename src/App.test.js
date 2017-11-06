import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';
import sinon from 'sinon';
import Search from './components/Search';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<Search />', () => {
  it('renders three input components', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('input')).to.have.length(3);
  });
  
   it('renders `.wrappwer`', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('.wrapper')).to.have.length(1);
  });
 });
