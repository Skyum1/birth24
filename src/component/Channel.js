import React, { useState, useEffect } from 'react';
import DialogBox from './DialogBox';
import { useNavigate } from 'react-router-dom';

const Channel = () => {
    const [dialogIndex, setDialogIndex] = useState(0);
    const [txt,setTxt] = useState('');
    const [img,setImg] = useState('img/boxilProfile.jpg');
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [dialogEnd, setDialogEnd] = useState(false);
    const [channelVisible, setChannelVisible] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [tickle, setTickle] = useState(false);
    const [mouse,setMouse] = useState(new Audio('/sound/select.ogg'));
    const [back, setBack] =  useState(new Audio('/sound/background1.mp3'));
    const navigate = useNavigate();

    const dialogList = 
        [['img/boxilProfile.jpg', '안녕? 나는 복실!'],
        ['img/boxilProfile.jpg', '복띠리라고도 하지.'],
        ['img/boxilProfile.jpg', '음하하핳하!'],
        ['img/boxilProfile.jpg', '사람들은 내가 착하다고는 하지만'],
        ['img/boxilProfile.jpg', '사실 난 착한 개는 아니라구!'],
        ['img/boxilProfile.jpg', '멍청한 사람들!'],
        ['img/shanelProfile.jpg', '도와줘!'],
        ['img/boxilProfile.jpg', '뭐야 저 냄새나는 덩치는'],
        ['img/shanelProfile.jpg', '목에 가시가 걸린 거 같아'],
        ['img/boxilProfile.jpg', '딱 봐도 뭐 아무거나 주워먹다가 그랬나보네'],
        ['img/boxilProfile.jpg', '어휴 꼴 좋다.'],
        ['img/shanelProfile.jpg', '제발 도와줘 너무 목이 아파서 아무것도 못 먹겠어'],
        ['img/boxilProfile.jpg', '....'],
        ['img/boxilProfile.jpg', '그래 내 특별히 도와주지'],
        ['img/boxilProfile.jpg', '입이나 벌려봐'],
        ['img/shanelProfile.jpg', '하~'],
        ['img/boxilProfile.jpg', '어우 냄시...'],
        ['img/shanelProfile.jpg', '하~ \n (이쑤시개를 클릭해줘!)'],
        ['img/shanelProfile.jpg', '오 시원하다~'],
        ['img/boxilProfile.jpg', '와 똥을 먹었나 냄새 진짜 심각하네'],
        ['img/shanelProfile.jpg', '그럼 이만~'],
        ['img/boxilProfile.jpg', '뭐야 저 녀석...'],
    ];  

    const gameClick = () => {
        if(dialogEnd) {
            mouse.play();
            if(dialogIndex >= dialogList.length - 1) {
                back.pause();
                navigate('/coco');
                return;
            }

            if(dialogIndex == 17) return;

            if(dialogIndex == 6) setChannelVisible(true);
            else if(dialogIndex == 16) {
                setGameStart(true);
                setTickle(true);
            }
            else if(dialogIndex == 18) setGameStart(false);
            else if(dialogIndex == 19) setChannelVisible(false);        
            
            setTxt('');
            setImg(dialogList[dialogIndex+1][0]);
            setDialogIndex(preDialogIndex => preDialogIndex + 1);
            setDialogEnd(false);
            setCurrentIndex(0);
        }
    };

    const tickleClick = () => {
        if(dialogIndex != 17) return;
        setTickle(false);
        setTxt('');
        setImg(dialogList[dialogIndex+1][0]);
        setDialogIndex(preDialogIndex => preDialogIndex + 1);
        setDialogEnd(false);
        setCurrentIndex(0);
    }

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

        }, 50); 
        // 컴포넌트가 언마운트되거나 의존성이 변경될 때 clearInterval을 호출하여 setInterval을 정리합니다.
        return () => clearInterval(interval);

    }, [currentIndex, dialogIndex, dialogEnd, dialogList]);

    useEffect(() => {
        const handleCanPlayThrough = () => {
            // 음악 파일이 로드되고 재생 가능할 때 실행되는 코드
            back.play(); // 음악을 자동으로 재생
          };
      
          // onCanPlayThrough 이벤트 핸들러를 추가
          back.addEventListener('canplaythrough', handleCanPlayThrough);
      
          // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거
          return () => {
            back.removeEventListener('canplaythrough', handleCanPlayThrough);
          };
    }, [back]);
    
    return (
        <div className='gameDiv' onClick={gameClick}>
            <img className='back' src='img/road.jpg'/>
            <img className={`${channelVisible? 'channelMain visible' : 'channelMain'}`} src='img/channelMain.jpg'/>
            <div>
                <img className={`${gameStart? 'neck visible' : 'neck'}`} src='img/목구멍.jpg'></img>
                <img className={`${tickle? 'tickle visible' : 'tickle'}`} onClick={tickleClick} src='img/이쑤시개.png'/>
            </div>
            <DialogBox txt={txt} img={img}/>
        </div>
    );
};

export default Channel;