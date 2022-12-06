import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';

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
          <img src={require('../../Assets/Air_scrum-removebg-preview.png')} className="logo" alt='Air Scrum'/>
          <a href="#" className ="title">AirScrum</a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="#hero" title="Home" />
            <Link href="#about" title="Upload" />
            <Link href="#feature" title="About Us" />
            <Link href="#works" title="Profile" />
            <Link href="#faq" title="Logout" className='logout'/>
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <img src={require('../../Assets/icons8-menu-50.png')} alt='Menu Bar' className='menu'/>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="#hero" title="Home" />
            	<Link href="#about" title="Upload" />
            	<Link href="#feature" title="About Us" />
            	<Link href="#works" title="Profile" />
            	<Link href="#faq" title="Logout" className='logout'/>
          </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default NavBar;