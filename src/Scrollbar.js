// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import * as React from 'react'; // NOSONAR
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styles from './styles';

type Props = {
  allowArrowKeys: ?boolean,
  allowCtrlOrMetaArrowKeys: ?boolean,
  allowHomeAndEndKeys: ?boolean,
  changeScrollPosition: (number) => void,
  className: ?string,
  maxScrollPosition: number,
  orientation: 'horizontal' | 'vertical',
  pageSize: ?number
};

type State = {
  currentScrollPosition: number
};

export default class Scrollbar extends React.Component<Props, State> {
  static propTypes: { [key: $Keys<Props>]: any } = {
    allowArrowKeys: PropTypes.bool,
    allowCtrlOrMetaArrowKeys: PropTypes.bool,
    allowHomeAndEndKeys: PropTypes.bool,
    changeScrollPosition: PropTypes.func.isRequired,
    className: PropTypes.string,
    maxScrollPosition: PropTypes.number.isRequired,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    pageSize: PropTypes.number
  };

  static defaultProps = {
    allowArrowKeys: true,
    allowCtrlOrMetaArrowKeys: false,
    allowHomeAndEndKeys: false,
    className: undefined,
    orientation: 'horizontal',
    pageSize: 1
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

  trackHeight: number;

  trackTop: number;

  thumbHeight: number;

  constructor(props: Props) {
    super(props);

    this.scrollbarRef = React.createRef();
    this.trackRef = React.createRef();
    this.thumbRef = React.createRef();

    this.trackWidth = 0;
    this.trackLeft = 0;
    this.thumbWidth = 0;

    this.trackHeight = 0;
    this.trackTop = 0;
    this.thumbHeight = 0;
  }

  componentDidMount() {
    this.trackWidth = this.trackRef.current.offsetWidth;
    this.trackLeft = this.trackRef.current.getBoundingClientRect().left;
    this.thumbWidth = this.thumbRef.current.offsetWidth;

    this.trackHeight = this.trackRef.current.offsetHeight;
    this.trackTop = this.trackRef.current.getBoundingClientRect().top;
    this.thumbHeight = this.thumbRef.current.offsetHeight;

    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (keyboardEvent: KeyboardEvent) => {
    const {
      allowArrowKeys,
      allowCtrlOrMetaArrowKeys,
      allowHomeAndEndKeys,
      changeScrollPosition,
      maxScrollPosition,
      orientation,
      pageSize
    } = this.props;
    let isKeyHandled = false;

    if (window.getComputedStyle(this.scrollbarRef.current).getPropertyValue('visibility') === 'visible') {
      if (
        !keyboardEvent.ctrlKey &&
        !keyboardEvent.metaKey &&
        allowArrowKeys &&
        ((orientation === 'horizontal' && keyboardEvent.code === 'ArrowLeft') ||
          (orientation === 'vertical' && keyboardEvent.code === 'ArrowUp'))
      ) {
        this.scrollLeftOrUp();
        isKeyHandled = true;
      } else if (
        !keyboardEvent.ctrlKey &&
        !keyboardEvent.metaKey &&
        allowArrowKeys &&
        ((orientation === 'horizontal' && keyboardEvent.code === 'ArrowRight') ||
          (orientation === 'vertical' && keyboardEvent.code === 'ArrowDown'))
      ) {
        this.scrollRightOrDown();
        isKeyHandled = true;
      } else if (allowHomeAndEndKeys && keyboardEvent.code === 'Home') {
        this.setState({
          currentScrollPosition: 0
        });

        changeScrollPosition(0);
        isKeyHandled = true;
      } else if (allowHomeAndEndKeys && keyboardEvent.code === 'End') {
        this.setState({
          currentScrollPosition: maxScrollPosition
        });

        changeScrollPosition(maxScrollPosition);
        isKeyHandled = true;
      } else if (
        allowCtrlOrMetaArrowKeys &&
        (keyboardEvent.ctrlKey || keyboardEvent.metaKey) &&
        ((orientation === 'horizontal' && keyboardEvent.code === 'ArrowLeft') ||
          (orientation === 'vertical' && keyboardEvent.code === 'ArrowUp'))
      ) {
        this.setState(({ currentScrollPosition }: State): State => {
          if (currentScrollPosition - pageSize >= 0) {
            changeScrollPosition(currentScrollPosition - pageSize);

            return {
              currentScrollPosition: currentScrollPosition - pageSize
            };
          }

          changeScrollPosition(0);

          return {
            currentScrollPosition: 0
          };
        });

        isKeyHandled = true;
      } else if (
        allowCtrlOrMetaArrowKeys &&
        (keyboardEvent.ctrlKey || keyboardEvent.metaKey) &&
        ((orientation === 'horizontal' && keyboardEvent.code === 'ArrowRight') ||
          (orientation === 'vertical' && keyboardEvent.code === 'ArrowDown'))
      ) {
        this.setState(({ currentScrollPosition }: State): State => {
          if (currentScrollPosition + pageSize <= maxScrollPosition) {
            changeScrollPosition(currentScrollPosition + pageSize);

            return {
              currentScrollPosition: currentScrollPosition + pageSize
            };
          }

          changeScrollPosition(maxScrollPosition);

          return {
            currentScrollPosition: maxScrollPosition
          };
        });

        isKeyHandled = true;
      }
    }

    if (isKeyHandled) {
      keyboardEvent.preventDefault();
      keyboardEvent.stopPropagation();
    }
  };

  updateThumbPosition = (event: SyntheticMouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const { changeScrollPosition, maxScrollPosition, orientation } = this.props;
    let currentScrollPosition;

    if (orientation === 'horizontal') {
      currentScrollPosition = Math.round(
        ((event.pageX - this.trackLeft - this.thumbWidth / 2) / (this.trackWidth - this.thumbWidth)) *
          maxScrollPosition
      );
    } else {
      currentScrollPosition = Math.round(
        ((event.pageY - this.trackTop - this.thumbHeight / 2) / (this.trackHeight - this.thumbHeight)) *
          maxScrollPosition
      );
    }

    currentScrollPosition = Math.min(maxScrollPosition, Math.max(0, currentScrollPosition));

    this.setState({
      currentScrollPosition
    });

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

  scrollLeftOrUp = (event?: SyntheticMouseEvent<HTMLElement>) => {
    const { changeScrollPosition } = this.props;

    if (event) {
      event.stopPropagation();
    }

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

  scrollRightOrDown = (event?: SyntheticMouseEvent<HTMLElement>) => {
    const { maxScrollPosition, changeScrollPosition } = this.props;

    if (event) {
      event.stopPropagation();
    }

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
    let marginTop = 0;

    if (orientation === 'horizontal') {
      marginLeft = `${
        this.trackWidth
          ? (currentScrollPosition * (this.trackWidth - this.thumbWidth)) / maxScrollPosition
          : 0
      }px`;
    } else {
      marginTop = `${
        this.trackHeight
          ? (currentScrollPosition * (this.trackHeight - this.thumbHeight)) / maxScrollPosition
          : 0
      }px`;
    }

    const thumbStyle = {
      ...styles.thumb,
      marginLeft,
      marginTop
    };

    return (
      <div className={className} ref={this.scrollbarRef} style={styles.scrollbar[orientation]}>
        <div className="button" style={styles.button} onClick={this.scrollLeftOrUp}>
          <Icon name={orientation === 'horizontal' ? 'caret left' : 'caret up'} style={{ margin: 0 }} />
        </div>
        <div
          className="track"
          style={styles.track[orientation]}
          ref={this.trackRef}
          onClick={this.updateThumbPosition}
        >
          <div className="thumb" style={thumbStyle} ref={this.thumbRef} onMouseDown={this.startThumbDrag} />
        </div>
        <div className="button" style={styles.button} onClick={this.scrollRightOrDown}>
          <Icon name={orientation === 'horizontal' ? 'caret right' : 'caret down'} style={{ margin: 0 }} />
        </div>
      </div>
    );
  }
}
