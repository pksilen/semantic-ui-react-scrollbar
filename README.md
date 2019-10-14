# semantic-ui-react-scrollbar
Horizontal and vertical scroll bar for  [Semantic UI React]


[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pksilen_semantic-ui-react-scrollbar&metric=alert_status)](https://sonarcloud.io/dashboard?id=pksilen_semantic-ui-react-scrollbar)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=pksilen_semantic-ui-react-scrollbar&metric=bugs)](https://sonarcloud.io/dashboard?id=pksilen_semantic-ui-react-scrollbar)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=pksilen_semantic-ui-react-scrollbar&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=pksilen_semantic-ui-react-scrollbar)
[![MIT License][license-badge]][license]

## Prerequisites
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "semantic-ui-react": "^0.87.0"

## Installation
    npm install --save semantic-ui-react-scrollbar
    
## Example usage
    import React from 'react';
    import Scrollbar from 'semantic-ui-react-scrollbar';
    
    class ScrollbarExample extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                scrollPosition: '0'
            };
        }
        
        changeScrollPosition = (newScrollPosition) => {
            this.setState({ scrollPosition: newScrollPosition });
        }
       
        render() => {(
            <Scrollbar maxScrollPosition={10} changeScrollPosition={this.changeScrollPosition} />
        )};
    }
    
See full example in demo directory

## Mandatory Scrollbar properties      
    changeScrollPosition: (newScrollPosition: number) => void,
    maxScrollPosition: number

         
## Optional Scrollbar properties
| property             | description                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------|
| className            | class name(s) for HTML outer div element                                                                                       |
| orientation          | Scroll bar orientation                                                                                                         |


    
## Optional Scrollbar property types
    className: string,
    orientation: 'horizontal' | 'vertical'
        
## Default values for optional properties
    className: undefined,
    orientation: 'horizontal'
    
## Keyboard actions
| Key                  | Action                                                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------|
| ArrowUp              | Scrolls vertical scroll bar upwards                                                                                            |
| ArrowDown            | Scrolls vertical scroll bar downwards                                                                                          |
| ArrowLeft            | Scrolls horizontal scroll bar to the left                                                                                      |
| ArrowRight           | Scrolls horizontal scroll bar to the right                                                                                     |
  
        
## Styling example

    <Scrollbar className="myScrollbar" .... />
    
   Style scroll bar in CSS:
   
       .myScrollbar .button {
            // style buttons here
        }
        
       .myScrollbar .track {
           // style scroll bar track here
       }
       
       .myScrollbar .thumb {
            // style scroll bar thumb here
       }
    
## License
MIT License

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/semantic-ui-react-scrollbar/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/semantic-ui-react-scrollbar.svg?style=flat-square
[package]: https://www.npmjs.com/package/semantic-ui-react-scrollbar
[build]: https://img.shields.io/circleci/project/github/pksilen/semantic-ui-react-scrollbar/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/semantic-ui-react-scrollbar/tree/master
[coverage]: https://img.shields.io/codecov/c/github/pksilen/semantic-ui-react-scrollbar/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/pksilen/semantic-ui-react-scrollbar
[Semantic UI React]: https://react.semantic-ui.com/
