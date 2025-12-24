import React, {useState} from 'react';
import {Eye, EyeOff} from "lucide-react";

const useShowPasswordEye = () => {
    const [show, setShow] = useState(false)

    const Component = (props) => (
        <div className="center cursor-pointer" onClick={() => setShow(!show)}>
            {show ? <Eye/> : <EyeOff/>}
        </div>
    );

    return {Component, type: show ? "text" : "password"}

};

export default useShowPasswordEye;