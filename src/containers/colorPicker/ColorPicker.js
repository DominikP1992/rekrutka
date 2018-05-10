import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import Typeahead from '../../components/typeahead/index';
import Button from '../../components/generic/Btn';

// redux actions
import * as colorPickerActions from '../../redux/actions/colorPickerActions';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '',
    };
  }

  componentDidMount() {
    this.props.colorPickerActions.fetchColors();
  }

  onChange = (selectedColor) => {
    this.setState({ selectedColor: selectedColor.hex });
  };

  changeBackgroundColor = () => this.state.selectedColor && this.props.colorPickerActions.updateColor(this.hexToRgb());


  hexToRgb = () => {
    const bigint = parseInt(this.state.selectedColor, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r},${g},${b}`;
  }


  render() {
    return (
      <Fragment>
        <Typeahead
          items={this.props.colors}
          displayKey="name"
          onChange={this.onChange}
          onStateChange={this.onStateChange}
          startFrom={2}
        />
        <Button onClick={this.changeBackgroundColor}>
          Accept
        </Button>
        <Link to="/">ET go home!</Link>
      </Fragment>
    );
  }
}

ColorPicker.propTypes = {
  colors: PropTypes.array.isRequired,
  colorPickerActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

// connect with state, by using selectors

const mapStateToProps = state => ({
  colors: state.colorPicker.colors,
  selectedColor: state.colorPicker.selectedColor,
});

// connect with actions

const mapDispatchToProps = dispatch => ({
  colorPickerActions: bindActionCreators(colorPickerActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
