import { useEffect } from "react";
import { Button, InputGroup, ProgressBar } from "react-bootstrap";
import { Unity, useUnityContext } from "react-unity-webgl";
import {Loading} from "../Loading"
import cardStyle from '../../assets/css/cards/Game.module.css'

const MAX_UNITY_STABLE_YEAR=2020
export function GameFrame(parameter) {
    const game=parameter.parameter
    console.log(game)

    const { unityProvider, isLoaded, loadingProgression,requestFullscreen,requestPointerLock,unload  } = useUnityContext({
      loaderUrl: `/assets/games/${game}/${game}.loader.js`,
      dataUrl: `/assets/games/${game}/${game}.data`,
      frameworkUrl: `/assets/games/${game}/${game}.framework.js`,
      codeUrl: `/assets/games/${game}/${game}.wasm`,

    });    
    
    // We'll round the loading progression to a whole number to represent the
    // percentage of the Unity Application that has loaded.
    const loadingPercentage = Math.round(loadingProgression * 100);
    useEffect(()=>{
      return function clean_up(){
          if (game?.isStable===true) {
            unload()
          }else{
            document.location.reload(false)
          }
      }
  },[])
  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

    return (
      <div className={cardStyle.container_game}>
        {isLoaded === false && (
          // We'll conditionally render the loading overlay if the Unity
          // Application is not loaded.
          <div className="loading-overlay">
            <Loading/>
            <p>Loading... ({loadingPercentage}%)</p>
            <ProgressBar now={loadingPercentage}></ProgressBar>
          </div>
        )}
        <div >
          <Unity className={cardStyle.frame}
            unityProvider={unityProvider}
            devicePixelRatio={devicePixelRatio}
          />
          </div>
          <Button onClick={handleClickEnterFullscreen}>Full Screen</Button>  
        </div>
    );
  }

