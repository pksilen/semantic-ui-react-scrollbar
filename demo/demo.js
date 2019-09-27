// @flow

import React from 'react';
import type { Element } from 'react';
import { render } from 'react-dom';
import Scrollbar from '../src/Scrollbar';

class DemoApp extends React.Component<{}, {}> {
  changeScrollPosition = (scrollPosition: number) => {
    // eslint-disable-next-line no-console
    console.log(scrollPosition);
  };

  render(): Element<*> {
    return (
      <div>
        <Scrollbar maxScrollPosition={10} changeScrollPosition={this.changeScrollPosition} />
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');

if (rootElement) {
  render(<DemoApp />, rootElement);
}
