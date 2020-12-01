import Warning from "../../warning/warning";
import React, {useEffect, useState} from "react";
import {isMobile} from 'react-device-detect';

const MobileDeviceOnly = ({ children }) => {

    return (
        <>
            {isMobile ? children : <Warning message={'This app works on mobile devices only'}/>}
        </>
        )

}

export default MobileDeviceOnly