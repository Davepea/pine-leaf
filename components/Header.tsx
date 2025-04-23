import React from 'react'

type HeaderProps= {
    title: string;
    id?: string;
    containerClass?: string; 
};

const Header = ({title,id,containerClass = ''}: HeaderProps) => {
  return (
    <>
    <div id={id} className={containerClass}>
      {title}
    </div>
    </>
  )
}

export default Header