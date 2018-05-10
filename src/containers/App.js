import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppView = styled.div`
  height: 100vh;
  width: 100vw;
  display: inline-block;
  ${({ backgroundColor }) => `background-color: rgba(${backgroundColor},0.5);`
};
`;

const App = ({ children, backgroundColor }) => (
  <AppView backgroundColor={backgroundColor}>{children}</AppView>
);

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  backgroundColor: PropTypes.string,
};

App.defaultProps = {
  backgroundColor: 'transparent',
};


const mapStateToProps = state => ({
  colors: state.colorPicker.colors,
  backgroundColor: state.colorPicker.selectedColor,
});


export default connect(mapStateToProps)(App);

