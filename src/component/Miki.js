import React, { useState, useEffect } from 'react';
import DialogBox from './DialogBox';
import { useNavigate } from 'react-router-dom';

const Miki = () => {
    const [dialogIndex, setDialogIndex] = useState(0);
    const [txt,setTxt] = useState('');
    const [img,setImg] = useState('img/boxilProfile.jpg');
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [dialogEnd, setDialogEnd] = useState(false);
    const [mikiVisible, setMikiVisible] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [mouse,setMouse] = useState(new Audio('/sound/select.ogg'));
    const [back, setBack] =  useState(new Audio('/sound/background3.mp3'));

    const navigate = useNavigate();

    const dialogList = 
        [['img/boxilProfile.jpg', '참 별일이야'],
        ['img/boxilProfile.jpg', '겨우 몇 번 주물렀다고 다리가 다 나을 수가'],
        ['img/boxilProfile.jpg', '뛰는 건 또 겁나 빨라요'],
        ['img/boxilProfile.jpg', '아! 어쩌면 나에게 신비로운 기운이 있어서'],
        ['img/boxilProfile.jpg', '만지기만 해도 불치병이 낫는 능력이...?'],
        ['img/mikiProfile.jpg', '어우#$%&어우'],
        ['img/boxilProfile.jpg', '뭐야 저 멍청하게 생긴 덩치는'],
        ['img/mikiProfile.jpg', '이상한 사람이 #$%& 나에게 목걸이로#$&%'],
        ['img/boxilProfile.jpg', '뭐라는 거야?'],
        ['img/mikiProfile.jpg', '최면#$&* 걸렸어%$#*'],
        ['img/boxilProfile.jpg', '이거 완전 심각하구먼'],
        ['img/boxilProfile.jpg', '이 명의 복띨님께서 한 번 손봐줄까?'],
        ['img/mikiProfile.jpg', '#$%& (구구단을 맞춰줘!)'],
        ['img/mikiProfile.jpg', '한문제 #$%& (구구단을 맞춰줘!)'],
        ['img/mikiProfile.jpg', '마지막 #$%& 야! (구구단을 맞춰줘!)'],
        ['img/mikiProfile.jpg', '고마워! 너 덕분에 내가 다시 똑똑해졌어!'],
        ['img/boxilProfile.jpg', '뭔 개소리야 넌 똑똑한 적이 없었어'],
        ['img/mikiProfile.jpg', '그럼 난 이만'],
        ['img/boxilProfile.jpg', '뭐야 너도 먹튀야?'],
        ['img/boxilProfile.jpg', '야 이 개자식아! 빨리 돌아오지 못해?'],
    ];  

    const gameClick = () => {
        if(dialogEnd) {
            mouse.play();
            if(dialogIndex >= dialogList.length - 1) {
                back.pause();
                navigate('/gundang');
                return;
            }
            
            if(dialogIndex >= 12 && dialogIndex <=14) return;
            if(dialogIndex == 5) setMikiVisible(true);
            if(dialogIndex == 11) generateRandomGugudan();
            if(dialogIndex == 15) setQuestion('');
            if(dialogIndex == 17) setMikiVisible(false);
            setTxt('');
            setImg(dialogList[dialogIndex+1][0]);
            setDialogIndex(preDialogIndex => preDialogIndex + 1);
            setDialogEnd(false);
            setCurrentIndex(0);
        }
    };

    const answerSubmit = () => {
        if(answer != correct) {
            alert("틀렸습니다!");
            return;
        }
        
        alert("정답입니다!");

        if(dialogIndex != 14) generateRandomGugudan();
        else setQuestion('');
        setAnswer(0);
        setTxt('');
        setImg(dialogList[dialogIndex+1][0]);
        setDialogIndex(preDialogIndex => preDialogIndex + 1);
        setDialogEnd(false);
        setCurrentIndex(0);
        
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

    const generateRandomGugudan = () => {
        const dan = Math.floor(Math.random() * 8) + 2; // 2부터 9까지의 랜덤한 단
        const operand = Math.floor(Math.random() * 9) + 1; // 1부터 9까지의 랜덤한 숫자
        setQuestion(`${dan} × ${operand}`);
        setCorrect(dan * operand);
    };

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
            <img className='back' src='img/road3.jpg'/>
            <img className={` ${mikiVisible? 'channelMain visible' : 'channelMain'}`} src='img/mikiMain.jpg'/>
            {question && (
                <div className='gugudan'>
                    <h2>문제: {question}</h2>
                    <input className='answer' type="number" onChange={(e) => setAnswer(e.target.value)} value={answer} />
                    <button className='answerBtn' onClick={answerSubmit}> 정답제출! </button>
                </div>
            )}
            <DialogBox txt={txt} img={img}/>
        </div>
    );
};

export default Miki;