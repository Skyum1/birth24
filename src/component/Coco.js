import React, { useState, useEffect } from 'react';
import DialogBox from './DialogBox';
import { useNavigate } from 'react-router-dom';

const Coco = () => {
    const [dialogIndex, setDialogIndex] = useState(0);
    const [txt,setTxt] = useState('');
    const [img,setImg] = useState('img/boxilProfile.jpg');
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [dialogEnd, setDialogEnd] = useState(false);
    const [cocoVisible, setCocoVisible] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [mouse,setMouse] = useState(new Audio('/sound/select.ogg'));
    const [back, setBack] =  useState(new Audio('/sound/background2.mp3'));

    const navigate = useNavigate();

    const dialogList = 
        [['img/boxilProfile.jpg', '어우... 냄새....'],
        ['img/boxilProfile.jpg', '코맛만 버렸군'],
        ['img/boxilProfile.jpg', '사람들이 입맛버렸다고 하는 게 이제야 무슨 뜻인지 알겠어'],
        ['img/cocoProfile.png', '도와줘!'],
        ['img/boxilProfile.jpg', '또 뭐야?'],
        ['img/cocoProfile.png', '다리가 너무 아파'],
        ['img/boxilProfile.jpg', '하 이번엔 다리가 아프다고?'],
        ['img/cocoProfile.png', '제발 부탁이야 어떤 이상한 인간이 나를 발로 차서 다리가 삐었어'],
        ['img/boxilProfile.jpg', '뭐? 대체 어떤 녀석이?'],
        ['img/boxilProfile.jpg', '하는 수 없지. 일단 내가 주물러 볼게!'],
        ['img/cocoProfile.png', '으.... (다리를 클릭해줘)'],
        ['img/cocoProfile.png', '그래 거기야! (다리를 클릭해줘)'],
        ['img/cocoProfile.png', '좀만 더... (다리를 클릭해줘)'],
        ['img/cocoProfile.png', '좀 더... (다리를 클릭해줘)'],
        ['img/cocoProfile.png', '한 번만 더... (다리를 클릭해줘)'],
        ['img/cocoProfile.png', '진짜 마지막! (다리를 클릭해줘)'],
        ['img/boxilProfile.jpg', '어우 힘들어!'],
        ['img/cocoProfile.png', '고마워! 이 은혜는 잊지 않을게!'],
        ['img/boxilProfile.jpg', '어 다 나았으면 나도 좀 주물러봐'],
        ['img/cocoProfile.png', '그럼 난 바빠서 이만~'],
        ['img/boxilProfile.jpg', '? 야 너가 누군지 알고? 이거 먹튀 아니야?'],
        ['img/boxilProfile.jpg', '야! 돌아오라고!'],
    ];  

    const gameClick = () => {
        
        if(dialogEnd) {
            mouse.play();
            if(dialogIndex >= dialogList.length - 1) {
                back.pause();
                navigate('/miki');
                return;
            }   
            
            if(dialogIndex == 4) setCocoVisible(true);
            else if(dialogIndex == 9) {
                setGameStart(true);
            }
            else if(dialogIndex == 15) {
                setGameStart(false);
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

        }, 50); 
        // 컴포넌트가 언마운트되거나 의존성이 변경될 때 clearInterval을 호출하여 setInterval을 정리합니다.
        return () => clearInterval(interval);

    }, [currentIndex, dialogIndex, dialogEnd, dialogList]);

    useEffect(() => {
        back.play();
    }, []);

    return (
        <div className='gameDiv' onClick={gameClick}>
            <img className='back' src='img/road2.png'/>
            <img className={`${cocoVisible? 'channelMain visible' : 'channelMain'}`} src='img/cocoMain.jpg'/>
            <img className={`${gameStart? 'neck visible' : 'neck'}`} src='img/leg.jpg'></img>
            <DialogBox txt={txt} img={img}/>
        </div>
    );
};

export default Coco;