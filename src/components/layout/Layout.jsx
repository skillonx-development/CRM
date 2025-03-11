import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'
import { motion } from 'framer-motion'

function Layout({ children, sidebarItems, bottomSidebarItems, defaultActiveTab = 'dashboard' }) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab)
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
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                menuItems={sidebarItems}
                bottomMenuItems={bottomSidebarItems}
            />
            <motion.div
                className="flex-1"
                initial="expanded"
                animate={collapsed ? "collapsed" : "expanded"}
                variants={mainContentVariants}
            >
                <Header />
                <main className="p-6">
                    {children}
                </main>
            </motion.div>
        </div>
    )
}

export default Layout