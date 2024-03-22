import React, { useState, useEffect } from 'react';

const DialogBox = ({txt,img}) => {
    
    return (
        <div className='dialogBox dFlex'>
            <img className='dialogProfile' src={img}/>
            <div className='dialogText'>{txt}</div>
        </div>
    );
};

export default DialogBox;
