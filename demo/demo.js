// @flow

import React from 'react';
import type { Element } from 'react';
import { render } from 'react-dom';
import Scrollbar from '../src/Scrollbar';

type State = {
  xPosition: number,
  yPosition: number
};

class DemoApp extends React.Component<{}, State> {
  state: State = { xPosition: 0, yPosition: 0 };

  changeXScrollPosition = (scrollPosition: number) => {
    this.setState((prevState: State) => ({
      ...prevState,
      xPosition: scrollPosition
    }));
  };

  changeYScrollPosition = (scrollPosition: number) => {
    this.setState((prevState: State) => ({
      ...prevState,
      yPosition: scrollPosition
    }));
  };

  render(): Element<any> {
    const { xPosition, yPosition } = this.state;

    return (
      <div style={{ position: 'relative', height: '300px', width: '500px' }}>
        <div>x position: { xPosition }</div>
        <div>y position: { yPosition }</div>
        <Scrollbar className="horizontalScrollbar" maxScrollPosition={10} changeScrollPosition={this.changeXScrollPosition} />
        <Scrollbar
          orientation="vertical"
          maxScrollPosition={10}
          changeScrollPosition={this.changeYScrollPosition}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');

if (rootElement) {
  render(<DemoApp />, rootElement);
}
