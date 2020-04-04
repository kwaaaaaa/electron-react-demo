import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';

const withHome = (Component) => ({ dispatch }) => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    setVersion(ipcRenderer.sendSync('get-package-version'));

    const interval = setInterval(() => {
      dispatch(actions.updateTime(new Date()))
    }, 1000)

    return () => clearInterval(interval)

  }, []);

  return <Component version={version} />
};

const mapStateToProps = () => ({});

const composedWrapper = compose(
  connect(mapStateToProps),
  withHome,
);
export default composedWrapper;
