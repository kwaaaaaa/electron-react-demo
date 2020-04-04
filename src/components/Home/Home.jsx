import React from 'react';
import withHome from './withHome';
import Header from './header/Header';

const Home = ({ version }) => {
  return (
    <>
      <Header />
      <section className="home" style={{padding:'1rem'}}>
        <h3>
          Electron-React Demo V{version}
        </h3>
        <hr />
        <div>
          <strong>Electron</strong> (formerly known as Atom Shell) is an open-source framework developed and maintained by GitHub. Electron allows for the development of desktop GUI applications using web technologies: It combines the Chromium rendering engine and the Node.js runtime. Electron is the main GUI framework behind several notable open-source projects including Atom, GitHub Desktop, Light Table, Visual Studio Code, and WordPress Desktop.
        </div>
        <hr />
        <div>
          <strong>React</strong> is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.
        </div>
      </section>
    </>
  );
};

export default withHome(Home);
