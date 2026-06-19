import React from 'react'
import { PageController } from '../controller/PageController'

export function Navbar(): JSX.Element {
    const buttons = [
        { id: 'homeButton', label: 'Home', template: 'home' },
        { id: 'aboutButton', label: 'About', template: 'about' },
        { id: 'resumeButton', label: 'Resume', template: 'resume' },
        { id: 'portfolioButton', label: 'Portfolio', template: 'portfolio' },
        { id: 'contactButton', label: 'Contact', template: 'contact' }
    ]

    const handleClick = (template: string) => {
        PageController.getInstance().loadPageTemplate(template)
    }

    return (
        <nav id="navbar">
            <ul>
                {buttons.map(b => (
                    <li key={b.id}><button id={b.id} onClick={() => handleClick(b.template)}>{b.label}</button></li>
                ))}
            </ul>
        </nav>
    )
}
