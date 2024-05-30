import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const BreadcrumsItem = ({ children, href }) => {
  return (
    <div className="flex gap-2.5 text-cyan-500">
    <a href={href} className="grow my-auto">{children}</a>
    <img loading="lazy" src={arrow_icon} className="shrink-0 w-4 aspect-square" alt="" />
    </div>
  )
}

export default BreadcrumsItem
