// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import * as React from 'react'; // NOSONAR
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styles from './styles';

type Props = {
  changeScrollPosition: (number) => void,
  className: string,
  maxScrollPosition: number,
  orientation: 'horizontal'
};

type State = {
  currentScrollPosition: number
};

export default class Scrollbar extends React.Component<Props, State> {
  static propTypes: { [key: $Keys<Props>]: any } = {
    changeScrollPosition: PropTypes.func.isRequired,
    className: PropTypes.string,
    maxScrollPosition: PropTypes.number.isRequired,
    orientation: PropTypes.oneOf(['horizontal'])
  };

  static defaultProps = {
    className: undefined,
    orientation: 'horizontal'
  };

  state = {
    currentScrollPosition: 0
  };

  scrollbarRef: { current: any };

  trackRef: { current: any };

  thumbRef: { current: any };

  trackWidth: number;

  trackLeft: number;

  thumbWidth: number;

  constructor(props: Props) {
    super(props);
    this.scrollbarRef = React.createRef();
    this.trackRef = React.createRef();
    this.thumbRef = React.createRef();
    this.trackWidth = 0;
    this.trackLeft = 0;
    this.thumbWidth = 0;
  }

  componentDidMount() {
    this.trackWidth = this.trackRef.current.offsetWidth;
    this.trackLeft = this.trackRef.current.getBoundingClientRect().left;
    this.thumbWidth = this.thumbRef.current.offsetWidth;
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (window.getComputedStyle(this.scrollbarRef.current).visibility === 'visible') {
      if (keyboardEvent.code === 'ArrowLeft') {
        this.scrollLeft();
      } else if (keyboardEvent.code === 'ArrowRight') {
        this.scrollRight();
      }
    }
  };

  updateThumbPosition = (event: SyntheticMouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const { maxScrollPosition, changeScrollPosition } = this.props;

    let currentScrollPosition = Math.round(
      ((event.pageX - this.trackLeft - this.thumbWidth / 2) / (this.trackWidth - this.thumbWidth)) *
        maxScrollPosition
    );

    currentScrollPosition = Math.min(maxScrollPosition, Math.max(0, currentScrollPosition));

    this.setState(() => ({
      currentScrollPosition
    }));

    changeScrollPosition(currentScrollPosition);
  };

  endThumbDrag = (event: SyntheticMouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.removeEventListener('mousemove', this.updateThumbPosition);
    window.removeEventListener('mouseup', this.endThumbDrag);
  };

  startThumbDrag = (event: SyntheticMouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.addEventListener('mousemove', this.updateThumbPosition);
    window.addEventListener('mouseup', this.endThumbDrag);
  };

  scrollLeft = () => {
    const { changeScrollPosition } = this.props;

    this.setState(({ currentScrollPosition }: State): State => {
      if (currentScrollPosition > 0) {
        changeScrollPosition(currentScrollPosition - 1);
        return {
          currentScrollPosition: currentScrollPosition - 1
        };
      }
      return {
        currentScrollPosition
      };
    });
  };

  scrollRight = () => {
    const { maxScrollPosition, changeScrollPosition } = this.props;

    this.setState(({ currentScrollPosition }: State): State => {
      if (currentScrollPosition < maxScrollPosition) {
        changeScrollPosition(currentScrollPosition + 1);
        return {
          currentScrollPosition: currentScrollPosition + 1
        };
      }
      return {
        currentScrollPosition
      };
    });
  };

  render(): Element<*> {
    const { className, maxScrollPosition, orientation } = this.props;
    const { currentScrollPosition } = this.state;

    let marginLeft = 0;
    if (orientation === 'horizontal') {
      marginLeft = `${
        this.trackWidth
          ? (currentScrollPosition * (this.trackWidth - this.thumbWidth)) / maxScrollPosition
          : 0
      }px`;
    }

    const thumbStyle = {
      ...styles.thumb,
      marginLeft
    };

    return (
      <div ref={this.scrollbarRef} className={className} style={styles.scrollbar}>
        <div style={styles.button} onClick={this.scrollLeft}>
          <Icon name="caret left" />
        </div>
        <div style={styles.track} ref={this.trackRef} onClick={this.updateThumbPosition}>
          <div style={thumbStyle} ref={this.thumbRef} onMouseDown={this.startThumbDrag} />
        </div>
        <div style={styles.button} onClick={this.scrollRight}>
          <Icon name="caret right" />
        </div>
      </div>
    );
  }
}
