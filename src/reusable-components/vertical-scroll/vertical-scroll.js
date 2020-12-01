import React from "react";

const VerticalScroll = ({children}) => {

    return (
        <div className='scroll-container' style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
            {children}
        </div>
    )
}

export default VerticalScroll;