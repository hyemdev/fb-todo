import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef } from "react";
const Home = () => {
    // useRef()
    // html 요소를 참조해서 활용하고 싶다
    const h1 = useRef(null);
    useEffect(() => {
        // useRef를 통해서 참조한 html 태그는 .current로 접근해서 참조한다
        anime({
            targets: h1.current,
            translateX: [100, 250], // from 100 to 250
            translateY: 10, 
            delay: 500,
            direction: 'alternate',
            loop: true,
            backgroundColor: "FFF",
        });
    }, []);
    return (
        <div>
            <h1 ref={h1}>Home Home</h1>
        </div>
    );
};
export default Home;
