import React, { useState, useEffect } from 'react';

const Envelope = () => {
    const [txt,setTxt] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 텍스트의 인덱스
    const [back, setBack] =  useState(new Audio('/sound/envelope.mp3'));
    
    const content = '안녕? 우리 공주 성은아! \n 상걸이오빠야. 복실이의 모험 어땠는 지 모르겠다만 재밌었다면 정말 다행이고 아니라면 뭐... \n 나름 신박한 선물을 하고 싶어서 이런 방법을 썼는데 마음에 들었을 지는 모르겠다! 생일 정말 축하해! 내가 잔소리해서 싫을법 한데 꾹 참는게 보여서 좀 미안하기도 하고 고마워. 특히 마라톤 같이 한다고 했을 땐 감동이었어! 정말 사랑해! 쟈기를 만나서 난 행운인 거 같아! 선물은 너무 부담스러워 하지 않았으면 좋겠어! \n 그리고 비밀번호는 쟈기의 생일과 나의 생일을 더하면 돼! 정 모르겠으면 카톡으로 물어봐! 그럼 얼른 선물 뜯자!';

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
        back.play();
    }, []);
    
    return (
        <div className='env' style={{ whiteSpace: 'pre-line' }}>{txt}</div>
    );
};

export default Envelope;