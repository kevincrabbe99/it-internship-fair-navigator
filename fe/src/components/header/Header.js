import React from 'react'
import { Link } from 'react-router-dom'
import './header.scss'

export default function Header() {
    return (
        <div>
            <div id = "header">
                <div id = "header-left">
                    <div id = "header-left-logo">
                        <h1>
                            <Link to = "/">IT Navigator</Link>
                        </h1>
                    </div>
                </div>
                <div id = "header-right">
                    <div id = "header-right-account">
                        <label>
                            <Link to = "/login">Admin Login</Link>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
