"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import NavItem, { type NavItemInterface } from "../NavItem"
import "./index.css"
import { usePathname } from "next/navigation"
import Searchbar from "../Searchbar/Searchbar"
import { CgProfile } from "react-icons/cg"
import { FaHeadset } from "react-icons/fa"
import { IoCartOutline } from "react-icons/io5"
import { FaThList, FaAngleDown } from "react-icons/fa"
import { useCart } from "../../providers/cart-provider"
import { Dialog, DialogContent } from "@mui/material"
import { IoSearchOutline } from "react-icons/io5"

export default function Navbar() {
  const { totalItems } = useCart()
  const [showDepartments, setShowDepartments] = useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const items: NavItemInterface[] = [
    {
      url: "/placeholderlogin",
      label: "Fazer login",
      icon: <CgProfile />,
    },
    {
      url: "/placeholderatendimento",
      label: "Atendimento",
      icon: <FaHeadset />,
    },
    {
      url: "/carrinho",
      label: "Meu Carrinho",
      icon: <IoCartOutline />,
      badge: totalItems > 0 ? totalItems : undefined,
      className: "cart-button",
    },
  ]

  const productCategories: NavItemInterface[] = [
    {
      url: "/placeholder",
      label: "Panificação",
    },
    {
      url: "/placeholder",
      label: "Queijos",
    },
    {
      url: "/placeholder",
      label: "Laticínios",
    },
    {
      url: "/placeholder",
      label: "Embutidos",
    },
    {
      url: "/placeholder",
      label: "Congelados",
    },
    {
      url: "/placeholder",
      label: "Enlatados",
    },
    {
      url: "/placeholder",
      label: "Conservas",
    },
    {
      url: "/placeholder",
      label: "Bebidas",
    },
  ]

  const pathname = usePathname()

  const toggleDepartments = () => {
    setShowDepartments(!showDepartments)
  }

  const toggleSearchDialog = () => {
    setSearchDialogOpen(!searchDialogOpen)
  }

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-main">
          <Link href="/" className="logo">
          <div style={{
      width: 100,
      height: 100,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
     alignItems: 'center'
     }}>
            <Image src="/logo.png" alt="logo"  width={55} height={55} style={{ width: '55px', height: '55px' }}/>
          </div>
          </Link>

          <div className="desktop-search">
            <Searchbar />
          </div>

          <div className="mobile-search-icon" onClick={toggleSearchDialog}>
            <IoSearchOutline />
          </div>

          <ul className="nav-items">
            {items.map((item, index) => (
              <li key={index}>
                <NavItem
                  url={item.url}
                  label={item.label}
                  icon={item.icon}
                  isActive={pathname === item.url}
                  badge={item.badge}
                  className={item.className}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-categories second-line">
          <ul className="nav-items categories">
            <li className="departments-container">
              <button
                className="special-button"
                onClick={toggleDepartments}
                onMouseEnter={() => setShowDepartments(true)}
                onMouseLeave={() => setShowDepartments(false)}
              >
                <FaThList className="second-line-icon" />
                Departamentos
                <FaAngleDown className={`second-line-icon2 ${showDepartments ? "rotate" : ""}`} />
              </button>

              {showDepartments && (
                <div
                  className="departments-submenu"
                  onMouseEnter={() => setShowDepartments(true)}
                  onMouseLeave={() => setShowDepartments(false)}
                >
                  {productCategories.map((category, index) => (
                    <Link key={index} href={category.url} className="department-item">
                      {category.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {productCategories.slice(0, 7).map((item, index) => (
              <li key={index}>
                <NavItem url={item.url} label={item.label} icon={item.icon} isActive={pathname === item.url} />
              </li>
            ))}
          </ul>
        </div>
        <Dialog
          open={searchDialogOpen}
          onClose={toggleSearchDialog}
          fullWidth
          maxWidth="sm"
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "12px",
              padding: "10px",
            },
          }}
        >
          <DialogContent sx={{ p: 2 }}>
            <Searchbar />
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  )
}

