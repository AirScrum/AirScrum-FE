import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';
import Preview from "../../Assets/Air_scrum-removebg-preview.png"
import MenuIcon from "../../Assets/icons8-menu-50.png"
import './NavBar.css';

const { Link } = Anchor;

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className='left'>
          <img src={Preview} className="logo" alt='Air Scrum' />
          <a href="../../pages/Home/Home.js" className="title">AirScrum</a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link to="/" title="Home" />
            <Link to="/about" title="About Us" />
            {/**
               * If user logged it, show the below Links 
              */}
            <Link to="/upload" title="Upload" />
            <Link to="/profile" title="Profile" />
            <Link to="/logout" title="Logout" className='logout' />
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <img src={MenuIcon} alt='Menu Bar' className='menu' />
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="/" title="Home" />
              <Link href="/about" title="About Us" />
              {/**
               * If user logged it, show the below Links 
              */}
              <Link href="/upload" title="Upload" />
              <Link href="/profile" title="Profile" />
              <Link href="/logout" title="Logout" className='logout' />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default NavBar;