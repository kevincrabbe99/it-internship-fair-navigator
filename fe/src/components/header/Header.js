import React from 'react'
import './header.scss'

export default function Header() {
    return (
        <div>
            <div id = "header">
                <div id = "header-left">
                    <div id = "header-left-logo">
                        <h1>IT Navigator</h1>
                    </div>
                </div>
                <div id = "header-right">
                    <div id = "header-right-account">
                        <label>Account</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
