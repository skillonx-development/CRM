import Header from './Header'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { motion } from 'framer-motion'

function Layout({ children }) {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [collapsed, setCollapsed] = useState(false)

    const mainContentVariants = {
        expanded: {
            marginLeft: "256px",
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 100
            }
        },
        collapsed: {
            marginLeft: "80px",
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 100
            }
        }
    }

    return (
        <div className="flex min-h-screen bg-background text-text">
            {/* Sidebar (above the content) */}
            <div className="fixed top-0 left-0 h-full z-50">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
            </div>

            {/* Main Content (behind sidebar) */}
            <motion.div
                className="flex-1 z-0"
                initial="expanded"
                animate={collapsed ? "collapsed" : "expanded"}
                variants={mainContentVariants}
            >
                {/* Fixed Header */}
                <div className="fixed top-0 left-0 right-0 z-40 bg-background">
                    <Header />
                </div>

                {/* Main Content with padding to avoid overlap */}
                <main className="p-6 mt-16">
                    {children}
                </main>
            </motion.div>
        </div>
    )
}

export default Layout
