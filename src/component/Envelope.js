import React, { useState, useEffect } from 'react';

const Envelope = () => {
    const [txt,setTxt] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [back, setBack] =  useState(new Audio('/sound/envelope.mp3'));
    
    const content = '끝';

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < content.length) {
                // 현재까지의 텍스트에 한 글자를 추가하여 상태 업데이트
                setTxt(prevTxt => prevTxt + content[currentIndex]);
                // 다음 글자로 인덱스 업데이트
                setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
                //console.log(currentIndex);
            }
            else {
                
            }
            
        }, 50); 
        // 컴포넌트가 언마운트되거나 의존성이 변경될 때 clearInterval을 호출하여 setInterval을 정리합니다.
        return () => clearInterval(interval);

    }, [currentIndex]);

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
        <div className='env' style={{ whiteSpace: 'pre-line' }}>{txt}</div>
    );
};

export default Envelope;