import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

export function mountReactRoot(): void {
    const el = document.getElementById('react-root')
    if (!el) return
    const root = createRoot(el)
    root.render(React.createElement(App))
}

// Auto-mount in dev if present
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        mountReactRoot()
    })
}

// named export already provided above
