import React from 'react'
import arrowLeft from "../assets/arrow-left (1).svg"
import { Link } from 'react-router-dom'

const ButtonLink = ({ path, linkContent }) => {
  return (
    <div>
        <Link to={path} className=' flex text-sm text-[#0a1730]'>
          <img className=' w-4 mr-1' src={arrowLeft} alt="" /> 
          {linkContent}
        </Link>
    </div>
  )
}

export default ButtonLink