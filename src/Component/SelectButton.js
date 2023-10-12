import React from 'react'

const SelectButton = ({children, selected, onClick}) => {
  return (
    <div onClick={onClick } className='selectbutton'>
      {children} 
    </div>
  )
}

export default SelectButton
