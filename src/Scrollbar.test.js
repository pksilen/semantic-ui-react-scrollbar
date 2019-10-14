import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import Scrollbar from './Scrollbar';

let changeScrollPositionMock;

beforeEach(() => {
  changeScrollPositionMock = jest.fn();
});

describe('propTypes', () => {
  it('should define prop types', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = Scrollbar;

    expect(propTypes.changeScrollPosition).toBe(PropTypes.func.isRequired);
    expect(propTypes.className).toBe(PropTypes.string);
    expect(propTypes.maxScrollPosition).toBe(PropTypes.number.isRequired);
    expect(propTypes.orientation).toBeTruthy();
  });
});

describe('defaultProps', () => {
  it('should set default prop values', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={10} changeScrollPosition={changeScrollPositionMock} />
    );

    expect(scrollbarWrapper.props().className).toBe(undefined);
    expect(scrollbarWrapper.props().orientation).toBe('horizontal');
  });
});

describe('onKeyDown', () => {
  test.each([
    ['horizontal', 'ArrowLeft', 'scrollLeftOrUp'],
    ['horizontal', 'ArrowRight', 'scrollRightOrDown'],
    ['vertical', 'ArrowUp', 'scrollLeftOrUp'],
    ['vertical', 'ArrowDown', 'scrollRightOrDown']
  ])('it should scroll scroll bar when arrow key is pressed', (orientation, keyCode, functionName) => {
    const scrollbarWrapper = mount(
      <Scrollbar
        maxScrollPosition={10}
        changeScrollPosition={changeScrollPositionMock}
        orientation={orientation}
      />
    );
    const scrollbar = scrollbarWrapper.instance();
    scrollbar[functionName] = jest.fn();
    scrollbar.scrollbarRef.current.style.visibility = 'visible';

    const keyDownEvent = new KeyboardEvent('keydown', { code: keyCode });
    global.document.dispatchEvent(keyDownEvent);

    expect(scrollbar[functionName]).toHaveBeenCalledTimes(1);
  });
});

describe('updateThumbPosition', () => {
  it('should update current scroll position for horizontal scroll bar', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={10} changeScrollPosition={changeScrollPositionMock} />
    );

    const scrollbar = scrollbarWrapper.instance();
    scrollbar.trackWidth = 100;
    scrollbar.thumbWidth = 5;
    scrollbar.trackLeft = 0;

    const track = scrollbarWrapper.find('.track');
    track.simulate('click', { pageX: 50 });

    expect(scrollbarWrapper.state('currentScrollPosition')).toBe(5);
  });

  it('should update current scroll position for vertical scroll bar', () => {
    const scrollbarWrapper = mount(
      <Scrollbar
        maxScrollPosition={10}
        changeScrollPosition={changeScrollPositionMock}
        orientation="vertical"
      />
    );
    const scrollbar = scrollbarWrapper.instance();
    scrollbar.trackHeight = 100;
    scrollbar.thumbWidth = 5;
    scrollbar.trackTop = 0;

    const track = scrollbarWrapper.find('.track');
    track.simulate('click', { pageY: 50 });

    expect(scrollbarWrapper.state('currentScrollPosition')).toBe(5);
  });
});

describe('startThumbDrag', () => {
  it('should update current scroll position', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={10} changeScrollPosition={changeScrollPositionMock} />
    );
    const scrollbar = scrollbarWrapper.instance();
    scrollbar.trackWidth = 100;
    scrollbar.thumbWidth = 5;
    scrollbar.trackLeft = 0;
    const thumb = scrollbarWrapper.find('.thumb');

    thumb.simulate('mousedown');

    const mouseMoveEvent = new MouseEvent('mousemove');
    mouseMoveEvent.pageX = 50;
    global.window.dispatchEvent(mouseMoveEvent);

    const mouseUpEvent = new MouseEvent('mouseup');
    global.window.dispatchEvent(mouseUpEvent);

    expect(scrollbarWrapper.state('currentScrollPosition')).toBe(5);
  });
});

describe('scrollLeftOrUp', () => {
  it('should scroll scroll bar left or up', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={10} changeScrollPosition={changeScrollPositionMock} />
    );

    const firstButton = scrollbarWrapper.find('.button').first();
    const lastButton = scrollbarWrapper.find('.button').last();
    lastButton.simulate('click');
    firstButton.simulate('click');

    expect(scrollbarWrapper.state('currentScrollPosition')).toBe(0);
  });

  it('should not scroll scroll bar left or up if scroll bar is at leftmost or topmost position', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={10} changeScrollPosition={changeScrollPositionMock} />
    );

    const firstButton = scrollbarWrapper.find('.button').first();
    firstButton.simulate('click');

    expect(scrollbarWrapper.state('currentScrollPosition')).toBe(0);
  });
});

describe('scrollRightOrDown', () => {
  it('should scroll scroll bar left or up', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={10} changeScrollPosition={changeScrollPositionMock} />
    );

    const lastButton = scrollbarWrapper.find('.button').last();
    lastButton.simulate('click');

    expect(scrollbarWrapper.state('currentScrollPosition')).toBe(1);
  });

  it('should not scroll scroll bar right or down if scroll bar is at rightmost or bottommost position', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={1} changeScrollPosition={changeScrollPositionMock} />
    );

    const lastButton = scrollbarWrapper.find('.button').last();
    lastButton.simulate('click');
    lastButton.simulate('click');

    expect(scrollbarWrapper.state('currentScrollPosition')).toBe(1);
  });
});

describe('render', () => {
  it('should render horizontal scroll bar correctly', () => {
    const scrollbarWrapper = mount(
      <Scrollbar maxScrollPosition={10} changeScrollPosition={changeScrollPositionMock} />
    );

    expect(scrollbarWrapper).toMatchSnapshot();

    scrollbarWrapper.unmount();
  });

  it('should render vertical scroll bar correctly', () => {
    const scrollbarWrapper = mount(
      <Scrollbar
        maxScrollPosition={10}
        changeScrollPosition={changeScrollPositionMock}
        orientation="vertical"
      />
    );

    expect(scrollbarWrapper).toMatchSnapshot();
  });
});
