import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [opacity, setOpacity] = useState(0); // 초기 opacity 값을 0으로 설정
    const [homeOpacity, setHomeOpacity] = useState(1);
    const [displayedText, setDisplayedText] = useState(''); // 현재까지 보여줄 텍스트
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [click, setClick] = useState(false);
    const [openingEnd, setOpeningEnd] = useState(false);
    const [afterClick, setAfterClick] = useState(false);
    const text = " 복실이의 모험! ";

    const navigate = useNavigate();

    const homeClick = () => {
      if(openingEnd) {
        setAfterClick(true);
      }
    };

    useEffect(() => {
        const interval = setInterval(() => {
          // opacity 값을 0.1씩 증가시켜서 1에 도달할 때까지 애니메이션 적용
          if(!afterClick) {
            if (opacity < 1) {
              setOpacity(prevOpacity => prevOpacity + 0.2);
            } 
            if(opacity >= 1) {
              // 현재 인덱스가 텍스트 길이를 초과하면 애니메이션 종료
              if (currentIndex >= text.length) {
                setOpeningEnd(true); // 클릭 가능
                setClick(prevClick => ! prevClick); // 점멸 
                  
              } else {
                  // 현재까지의 텍스트에 한 글자를 추가하여 상태 업데이트
                  setDisplayedText(prevText => prevText + text[currentIndex]);
                  // 다음 글자로 인덱스 업데이트
                  setCurrentIndex(prevIndex => prevIndex + 1);
              }
            }
          }
          else{
            if (homeOpacity > -1 ) {
              setHomeOpacity(prevhomeOpacity => prevhomeOpacity - 0.2);
            } 
            else if(homeOpacity < -0.4){
              navigate('/channel');
            }
          }
        }, 500); // 1초마다 opacity 변경
    
        return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval 제거
    }, [opacity, currentIndex, text, openingEnd, afterClick, homeOpacity]); // opacity 값이 변경될 때마다 useEffect 실행

    return (
        <div className='home' onClick={homeClick} style={{ opacity:homeOpacity }}>
            <img className='homeBack' src='img/home.jpg' style={{ opacity }} alt='오류'/>
            <div className='homeText'>{displayedText}</div>
            <div className={`box ${click ? 'homeClick active' : 'homeClick'}`}>계속하려면 클릭하세요!</div>
        </div>
    )
}

export default Home;