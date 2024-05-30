import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import BreadcrumbItem from '../BreadcrumsItem/BreadcrumsItem'
const Breadcrums = (props) => {
  const {product} = props;
    return (
      <nav aria-label="Breadcrumb" className="flex gap-5 self-start text-sm leading-5">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/watches">Shop</BreadcrumbItem>
      <div className="text-zinc-900">Detail</div>
    </nav>
  )
}

export default Breadcrums 
