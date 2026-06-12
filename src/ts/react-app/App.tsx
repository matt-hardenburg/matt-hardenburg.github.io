import React from 'react'
import { Navbar } from './Navbar'
import { registerPageSetter } from './appState'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Resume } from './pages/Resume'
import { Portfolio } from './pages/Portfolio'
import { Contact } from './pages/Contact'

function ContentArea({ html }: { html: string }) {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const [inner, setInner] = React.useState(html)

    React.useEffect(() => {
        const el = ref.current
        if (!el) return
        el.classList.add('fade-out')
        setTimeout(() => {
            setInner(html)
            el.classList.remove('fade-out')
            el.classList.add('fade-in')
            setTimeout(() => el.classList.remove('fade-in'), 500)
        }, 300)
    }, [html])

    return <div ref={ref} dangerouslySetInnerHTML={{ __html: inner }} />
}

export function App(): JSX.Element {
    const [pageKey, setPageKey] = React.useState<string>('home')

    React.useEffect(() => {
        registerPageSetter((key: string) => setPageKey(key))
    }, [])

    const renderPage = () => {
        switch (pageKey) {
            case 'about': return <About />
            case 'resume': return <Resume />
            case 'portfolio': return <Portfolio />
            case 'contact': return <Contact />
            default: return <Home />
        }
    }

    return (
        <div data-react-container>
            <Navbar />
            <main id="content">
                <ContentArea html={''} />
                {renderPage()}
            </main>
        </div>
    )
}
