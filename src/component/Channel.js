import React, { useState, useEffect } from 'react';
import DialogBox from './DialogBox';

const Channel = () => {
    const [dialogIndex, setDialogIndex] = useState(0);
    const [txt,setTxt] = useState('');
    const [img,setImg] = useState('img/boxilProfile.jpg');
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [dialogEnd, setDialogEnd] = useState(false);

    const dialogList = 
        [['img/boxilProfile.jpg', '안녕? 나는 복실!'],
        ['img/boxilProfile.jpg', '복띠리라고도 하지.'],
        ['img/boxilProfile.jpg', '음하하핳하!'],
        ['img/boxilProfile.jpg', '사람들은 내가 착하다고는 하지만'],
        ['img/boxilProfile.jpg', '사실 난 착한 개는 아니라구!'],
        ['img/boxilProfile.jpg', '멍청한 사람들!'],
        ['img/shanelProfile.jpg', '도와줘!'],
        ['img/boxilProfile.jpg', '뭐야 저 냄새나는 덩치는'],
    ];  

    const gameClick = () => {
        if(dialogEnd) {
            if(dialogIndex >= dialogList.length-1) {
                alert("끝");
                return;
            }
            setTxt('');
            setImg(dialogList[dialogIndex+1][0]);
            setDialogIndex(preDialogIndex => preDialogIndex + 1);
            setDialogEnd(false);
            setCurrentIndex(0);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            
            if(!dialogEnd) {
                if (currentIndex < dialogList[dialogIndex][1].length) {
                    // 현재까지의 텍스트에 한 글자를 추가하여 상태 업데이트
                    setTxt(prevTxt => prevTxt + dialogList[dialogIndex][1][currentIndex]);
                    // 다음 글자로 인덱스 업데이트
                    setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
                    //console.log(currentIndex);
                }
                else {
                    setDialogEnd(true);
                }
            }

        }, 100); 
        // 컴포넌트가 언마운트되거나 의존성이 변경될 때 clearInterval을 호출하여 setInterval을 정리합니다.
        return () => clearInterval(interval);

    }, [currentIndex, dialogIndex, dialogEnd, dialogList]);

    return (
        <div onClick={gameClick}>
            <img className='back' src='img/road.jpg'/>
            <DialogBox txt={txt} img={img}/>
        </div>
    );
};

export default Channel;