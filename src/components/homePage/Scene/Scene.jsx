import React, { useState } from 'react';
import styles from './Scene.module.css';
import Spline from '@splinetool/react-spline';

function Scene() {
  const [loaded, setLoaded] = useState(false);

  // Called when the Spline component is loaded
  function handleLoad() {
    setTimeout(()=>{
      setLoaded(true);
    },5000)
  }
  return (
    <>
    <Spline className={loaded ? styles['fade-in'] : styles['hidden']} scene="https://prod.spline.design/5kGb9k1z0kvpAtfn/scene.splinecode" onLoad={handleLoad} />
  </>
  )
}

export default Scene
