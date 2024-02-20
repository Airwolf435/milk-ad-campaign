"use client";

import { useEffect, useState } from "react"
import styles from "./contestGame.module.css"
import { noirFilm, rgbSplit } from "@/app/lib/imageFilters";

// Credit to Stuart Sackler, their example on using canvas 2d contexts to manipulate images from the webcam were translated from vanilla JS into something usable within react.
export default function ContestGame(){
    const [activeFilter, setActiveFilter] = useState(()=>noirFilm);
    const [imageHistory, setImageHistory] = useState([]);
    const [imageBase, setImageBase] = useState([]);
    const [context, setContext] = useState();
    const [updateInterval, setUpdateInterval] = useState();

    const [videoStream, setVideoStream] = useState();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        }).then((newVideoStream)=>{
            setVideoStream(newVideoStream);
        });
        setContext(document.querySelector(`.${styles.contestWindow}`).getContext("2d"));
    }, []);

    useEffect(()=>{
        if(videoStream && context){
            console.log("Bois, we gotem.");
            let videoPlayer = document.querySelector(`.${styles.hiddenPlayer}`)
            videoPlayer.srcObject = videoStream;
            videoPlayer.play();
            if(updateInterval){
                clearInterval(updateInterval);
            }
            console.log("Lets Draw")
            let canvas = document.querySelector(`.${styles.contestWindow}`);
            setUpdateInterval(setInterval(()=>{
                context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                console.log(context.getImageData(0,0, canvas.width, canvas.height));
                let currentFrame = context.getImageData(0,0, canvas.width, canvas.height);
                let newframe = activeFilter(currentFrame)
                context.putImageData(newframe, 0, 0);
            }, 100));
        }
    }, [videoStream, context]);

    return (
        <section>
            <aside>
                <h2>Filters</h2>
            </aside>
            <div>
                <canvas className={styles.contestWindow} width="1920" height="1080"></canvas>
                <video src="" className={styles.hiddenPlayer}></video>
                <button>Camera Snap</button>
            </div>
            <aside>
                <h2>Stickers</h2>
            </aside>
        </section>
    )
}