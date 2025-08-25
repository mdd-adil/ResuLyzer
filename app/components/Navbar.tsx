import React from 'react'
import { Link } from 'react-router';
export default function Navbar(props:{link:string,tittle:string}) {
  return (
    <nav className='navbar'>
        <Link to='/'>
        <p className='text-2xl font-bold text-gradient'>RESULYZER</p></Link>
        <Link to={props.link} className='primary-button w-fit'>
        <p className='text-2xl font-bold text-gradient'>{props.tittle}</p></Link>
            
    </nav>
  )
}
