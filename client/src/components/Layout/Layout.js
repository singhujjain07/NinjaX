import React from 'react'
import Header from './Header'
const Layout = ({scrollToForcesSection,scrollToLeetcodeSection, children }) => {
    return (
        <div>
            <Header scrollToForcesSection={scrollToForcesSection} scrollToLeetcodeSection={scrollToLeetcodeSection} />
            <main className='layout'
            // style={{ marginTop: "60px" }}
            >
                
                {children}
            </main>
        </div>
    )
}

export default Layout