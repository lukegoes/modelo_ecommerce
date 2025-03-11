"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import "./index.css"

export interface NavItemInterface {
  url: string
  label: string
  icon?: React.ReactNode
  isActive?: boolean
  submenu?: { url: string; label: string }[]
  badge?: number
  className?: string
}

export default function NavItem({ url, label, isActive, icon, submenu, badge, className }: NavItemInterface) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div
      className={`nav-item relative ${submenu ? "has-submenu" : ""} ${className || ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={url} className={`nav-link ${isActive ? "active" : ""}`} onClick={submenu ? toggleMenu : undefined}>
        {icon && <span className={`icon ${submenu ? "second-line-icon" : ""}`}>{icon}</span>}
        <span className="label">{label}</span>
        {badge !== undefined && badge > 0 && <span className="badge">{badge > 99 ? "99+" : badge}</span>}
      </Link>

      {submenu && isOpen && (
        <ul className="submenu">
          {submenu.map((subItem, index) => (
            <li key={index} className="submenu-item">
              <Link href={subItem.url}>{subItem.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

