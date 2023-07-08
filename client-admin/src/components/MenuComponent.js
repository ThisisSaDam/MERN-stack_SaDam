/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
class Menu extends Component {
  static contextType = MyContext; //using this . context to access global state
  render() {
    return (
      <div className='border-bottom'>
        <div className='float-left'>
          <ul className='menu'>
            <li className = 'menu'><a href='/admin/home'>Home</a></li>
            <li className = 'menu'><a href='/admin/category'>Category</a></li>
            <li className = 'menu'><a href='/admin/product'>Product</a></li>
            <li className = 'menu'><a href='/admin/order'>Order</a></li>
            <li className = 'menu'><a href='/admin/customer'>Customer</a></li>
          </ul>
        </div>
        <div className='float-right'>
          Hello <b>{this.context.username}</b> | <a href='/' onClick={() => this.lnkLogoutClick()}>Logout</a>
        </div>
        <div className='float-clear'/>
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;

