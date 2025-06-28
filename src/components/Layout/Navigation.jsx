import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink> |{' '}
      <NavLink to="/calendar">Calendar</NavLink> |{' '}
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}
