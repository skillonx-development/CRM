import Header from './Header'
import { useState } from 'react'
import Sidebar from './Sidebar'

function Layout({ children }) {
    const [activeTab, setActiveTab] = useState('dashboard')

    return (
        <div className="flex min-h-screen bg-background text-text">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 ml-64">
                <Header />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout