import React from 'react'
import { animated, useSpring } from 'react-spring';

function Loading() {
    const style1 = useSpring({
        from: { scale: 2, rotateZ: 0, backgroundColor: 'yellow'},
        to: { scale: 1, rotateZ: 360, backgroundColor: 'lightblue' },
        duration: 1000,
    });
    const style2 = useSpring({
        from: { scale: 0, rotateZ: 0, backgroundColor: 'yellow'},
        to: { scale: 1, rotateZ: 360, backgroundColor: 'lightblue' },
        duration: 1000,
        delay: 1000,
    });
    const style3 = useSpring({
        from: {backgroundColor: 'yellow', rotateZ: 360},
        to: {backgroundColor: 'lightblue', rotateZ: 0},
        duration: 1500,
        delay: 2000,
    })
    return (
        // 3500s 
        <div className='loading' style={{ margin: '12rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <animated.div style={{
                width: '3.5rem',
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3.5rem', marginRight: '2rem', ...style1
            }} >L</animated.div>
            <animated.div style={{ width: '3.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3.5rem', marginRight: '2rem', ...style3 }}>O</animated.div>
            <animated.div style={{
                width: '3.5rem',
                display: 'flex', justifyContent:'center', alignItems: 'center', height: '3.5rem', marginRight: '2rem', ...style3
            }}>A</animated.div>
            <animated.div style={{
                width: '3.5rem',
                display: 'flex', justifyContent:'center', alignItems: 'center', height: '3.5rem', marginRight: '2rem', ...style3
            }}>D</animated.div>
            <animated.div style={{
                width: '3.5rem',
                display: 'flex', justifyContent:'center', alignItems: 'center', height: '3.5rem', marginRight: '2rem', ...style3
            }}>I</animated.div>
            <animated.div style={{
                width: '3.5rem',
                display: 'flex', justifyContent:'center', alignItems: 'center', height: '3.5rem', marginRight: '2rem', ...style3
            }}>N</animated.div>
            <animated.div style={{
                width: '3.5rem',
                display: 'flex', justifyContent:'center', alignItems: 'center', height: '3.5rem', marginRight: '2rem', ...style2
            }} >G</animated.div>
        </div>
    )
}

export default Loading
