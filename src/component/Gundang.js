import React, { useState, useEffect } from 'react';
import DialogBox from './DialogBox';
import { useNavigate } from 'react-router-dom';

const Gundang = () => {
    const [dialogIndex, setDialogIndex] = useState(0);
    const [txt,setTxt] = useState('');
    const [img,setImg] = useState('img/boxilProfile.jpg');
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [dialogEnd, setDialogEnd] = useState(false);
    const [gundangVisible, setGundangVisible] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [dangHP, setDangHP] = useState(100);
    const [envelop, setEnvelop] = useState(false);
    const [homeOpacity, setHomeOpacity] = useState(1);
    const [close, setClose] = useState(false);
    const [mouse,setMouse] = useState(new Audio('/sound/select.ogg'));
    const [back, setBack] =  useState(new Audio('/sound/background4.mp3'));
    const [aya, setAya] = useState(new Audio('/sound/aya.wav'));
    const navigate = useNavigate();

    const dialogList = 
        [['img/boxilProfile.jpg', '어휴 살다보니 별일이야'],
        ['img/boxilProfile.jpg', '천하의 권복띨이 선행을 하고 다니다니'],
        ['img/boxilProfile.jpg', '벌써 하루가 다 갔구먼'],
        ['img/boxilProfile.jpg', '뭐 이런날도 있어야지...'],
        ['img/gundangProfile.png', '음하하하하하하!'],
        ['img/boxilProfile.jpg', '이번엔 또 어떤 개자식이냐!'],
        ['img/gundangProfile.png', '내 이름은 권댕!'],
        ['img/gundangProfile.png', '세계 최고의 악당이지!'],
        ['img/gundangProfile.png', '일부러 음식에 가시를 넣어 목에 가시가 걸리게 하고'],
        ['img/gundangProfile.png', '발로 차서 다리를 삐게 만들고'],
        ['img/gundangProfile.png', '최면을 걸어 멍청하게 만든 사람이 바로'],
        ['img/gundangProfile.png', '나란 남자 권댕!!'],
        ['img/boxilProfile.jpg', '이런 미친놈이랑 같은 권씨라니'],
        ['img/boxilProfile.jpg', '정말 수치스럽군...'],
        ['img/gundangProfile.png', '듣자하니 넌 시도때도 없이 영역표시를 하는 걸로 아는데'],
        ['img/gundangProfile.png', '이 참에 너의 소중한 것을 잘라주겠어!'],
        ['img/boxilProfile2.jpg', '뭐라고?! 그건 안돼!!'],
        ['img/boxilProfile2.jpg', '내가 순순히 너의 놀음에 당하겠느냐!'],
        ['img/boxilProfile3.jpg', '간다!!!!'],
        ['img/gundangProfile.png', '어디 한 번 때려보시지~ (얼굴을 클릭하세요)'],
        ['img/gundangProfile.png', '안돼!'],
        ['img/gundangProfile.png', '이렇게 강한 강아지는 처음 보는구나...'],
        ['img/gundangProfile.png', '이만....'],
        ['img/boxilProfile.jpg', '뭐야? 쟤도 결국 자기 할 거만 하고 도망이야?'],
        ['img/boxilProfile.jpg', '하여간 개나 인간이나 똑같네'],
        ['img/boxilProfile.jpg', '근데 저건 뭐지?'],
        ['img/boxilProfile.jpg', '클릭해보자!']
    ];  

    const gameClick = () => {
        if(dialogEnd) {
            if(startGame) aya.play();
            else mouse.play();
            
            if(dialogIndex >= dialogList.length - 1) {
                setClose(true);
                return;
            }
            if(startGame) return;

            if(dialogIndex == 4) setGundangVisible(true);
            else if(dialogIndex == 18) setStartGame(true);
            else if(dialogIndex == 24) setEnvelop(true);

            setTxt('');
            setImg(dialogList[dialogIndex+1][0]);
            setDialogIndex(preDialogIndex => preDialogIndex + 1);
            setDialogEnd(false);
            setCurrentIndex(0);
        }
    };

    const hitDang = () => {
        if(!startGame) return;

        if(dangHP == 0){
             setStartGame(false);
             setTxt('');
             setImg(dialogList[dialogIndex+1][0]);
             setDialogIndex(preDialogIndex => preDialogIndex + 1);
             setDialogEnd(false);
             setCurrentIndex(0);
             setGundangVisible(false);
        }
        setDangHP(preDangHP => preDangHP - 10);
    }

    // hp 값에 따라 width를 계산하는 함수
    const calculateWidth = () => {
        return `${dangHP}%`;
    };
    
    useEffect(() => {
        if(!close) return;
        const interval = setInterval(() => {
            if (homeOpacity >= 0 ) {
                setHomeOpacity(prevhomeOpacity => prevhomeOpacity - 0.1);
            } 
            else if(homeOpacity < 0){
                back.pause();
                navigate('/envelope');
            }

        }, 2000); 
    },[close,homeOpacity]);

    useEffect(() => {
        const interval = setInterval(() => {
            
            if(!dialogEnd) {
                if (currentIndex < dialogList[dialogIndex][1].length) {
                    // 현재까지의 텍스트에 한 글자를 추가하여 상태 업데이트
                    setTxt(prevTxt => prevTxt + dialogList[dialogIndex][1][currentIndex]);
                    // 다음 글자로 인덱스 업데이트
                    setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
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
        <div className='gameDiv' onClick={gameClick} style={{ opacity:homeOpacity }}>
            {startGame &&
            <div className='hpContainer'>
                <div className='hp' style={{width:calculateWidth()}}></div>
            </div>
            }
            <img className='back' src='img/road4.png'/>
            <img className={` ${gundangVisible? 'channelMain visible' : 'channelMain'}`} src='img/gundangMain.png' onClick={hitDang}/>
            {envelop &&
                <img className='envelope' src='img/편지.png'/>
            }
            <DialogBox txt={txt} img={img}/>
        </div>
    );
};

export default Gundang;