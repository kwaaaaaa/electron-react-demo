import React from 'react';
import { connect } from 'react-redux';
import './Header.css';

const tsF = 'en-US';
const tsS = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const Header = ({ serverTimestamp }) => {
  const formattedTimestamp = () => serverTimestamp
    ? serverTimestamp.toLocaleString(tsF, tsS)
    : '';

  return (
    <section className="header">
      <p>{ formattedTimestamp() }</p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  serverTimestamp: state.etc.serverTimestamp,
});

export default connect(
  mapStateToProps,
)(Header);
