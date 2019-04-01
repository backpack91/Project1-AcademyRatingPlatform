import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import  Header from '../components/Header.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

function setup(isOnLogin) {
  const props = {
    checkAuth: jest.fn(),
    showUpLoginForm: jest.fn(),
    user: {
      name: '박종렬',
      image_profile: 'https://codestates.com/images/logo_sub_b_simple.png'
    },
    onLogin: isOnLogin
  };

  const component = shallow(
    <Header {...props} />
  );

  return  {
    props,
    component
  };
}

describe('note header component', () => {
  it('should render header when user is not on login', () => {
    const { component } = setup(false);

    expect(component.exists()).toBe(true);
  });

  it('should render header when user is on login', () => {
    const { component } = setup(true);

    expect(component.exists()).toBe(true);
  });

  it('on log out header should have 2 navs and should invoke each eventHandler when clicked', () => {
    const { component, props } = setup(false);
    expect(component.find('.nav')).toHaveLength(2);
    component.find('.nav').forEach((node, index) => {
      node.simulate('click');
    });
    expect(props.checkAuth).toHaveBeenCalled();
    expect(props.showUpLoginForm).toHaveBeenCalled();
  });

  it('on log in header should have single nav and should invoke eventHandler when clicked', () => {
    const { component, props } = setup(true);

    expect(component.find('.nav')).toHaveLength(1);
    component.find('.nav').simulate('click');
    expect(props.checkAuth).toHaveBeenCalled();
  });

  it('on log out, if navs are clicked, each onClick event should be invoked', () => {
    const { component, props } = setup(false);

    component.find('.nav').forEach((node, index) => {
      node.simulate('click');
    });
    expect(props.checkAuth).toHaveBeenCalled();
    expect(props.showUpLoginForm).toHaveBeenCalled();
  });

  it('on log in, if nav is clicked, each onClick event should be invoked', () => {
    const { component, props } = setup(true);

    expect(component.find('.userAccountIconWrapper')).toHaveLength(1);
    component.find('.nav').simulate('click');
    expect(props.checkAuth).toHaveBeenCalled();
  });
});
