import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { List as VirtualList } from 'react-virtualized';
import matchSorter from 'match-sorter';
import styled from 'styled-components';


// components
import TypeaheadList from './TypeaheadList';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right:20px;
`;

const Input = styled.input`
 background-color: transparent;
    color: #595b5d;
    font-size: 13px;
`;


class Typeahead extends Component {
  static propTypes = {
    width: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    displayKey: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func,
    onBlur: PropTypes.func,
    inputRef: PropTypes.func,
    startFrom: PropTypes.number.isRequired,
  };

  static defaultProps = {
    width: 200,
    placeholder: '',
    onBlur: () => null,
    onStateChange: () => null,
    inputRef: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
    };
  }

  handleStateChange = (changes) => {
    if (changes.hasOwnProperty('inputValue')) {
      const { inputValue } = changes;
      if (inputValue.length >= this.props.startFrom) {
        return this.setState({
          items: matchSorter(this.props.items, inputValue, {
            keys: [this.props.displayKey],
          }),
        });
      }
    }
    return this.props.onStateChange(changes);
  };

  render() {
    const {
      displayKey,
      onBlur,
      onChange,
      placeholder,
      width,
      inputRef,
    } = this.props;
    const { items } = this.state;

    return (
      <Downshift
        onChange={onChange}
        onStateChange={this.handleStateChange}
        itemToString={i => (i == null ? '' : String(i[displayKey]))}
        render={({
          getInputProps,
          getItemProps,
          isOpen,
          selectedItem,
          highlightedIndex,
        }) => (
          <div style={{ display: 'inline-block' }}>
            <Wrapper className="typeahead">
              <Input
                {...getInputProps()}
                className="form-control"
                placeholder={placeholder}
                onBlur={onBlur}
                ref={inputRef}
              />
              {isOpen && (
                <TypeaheadList>
                  <VirtualList
                    width={width}
                    scrollToIndex={highlightedIndex || 0}
                    height={items.length < 7 ? items.length * 30 : 210}
                    rowCount={items.length}
                    rowHeight={30}
                    rowRenderer={({ key, index, style }) => (
                      <div
                        key={key}
                        {...getItemProps({
                          item: items[index],
                          index,
                          style: {
                            ...style,
                            backgroundColor:
                              highlightedIndex === index ? '#cdecff' : 'white',
                            fontWeight:
                              selectedItem === items[index] ? '700' : '400',
                          },
                        })}
                      >
                        {items[index][displayKey]}
                      </div>
                    )}
                  />
                </TypeaheadList>
              )}
            </Wrapper>
          </div>
        )}
      />
    );
  }
}

export default Typeahead;
