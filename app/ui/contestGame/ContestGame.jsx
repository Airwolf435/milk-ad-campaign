"use client";

import { useEffect, useState } from "react"
import styles from "./contestGame.module.css"
import { blackHot, miamiVibe, noirFilm, rgbSplit, tvDistortion } from "@/app/lib/imageFilters";
import { createImage } from "@/app/lib/helpers";

// Credit to Stuart Sackler, their example on using canvas 2d contexts to manipulate images from the webcam were translated from vanilla JS into something usable within react.
export default function ContestGame(){
    const [activeFilter, setActiveFilter] = useState();
    const [imageHistory, setImageHistory] = useState([]);
    const [imageBase, setImageBase] = useState([]);
    const [videoPlayer, setVideoPlayer] = useState();
    const [context, setContext] = useState();
    const [updateInterval, setUpdateInterval] = useState();
    const [videoStream, setVideoStream] = useState();
    const [stickers, setStickers] = useState([]);
    const [activeSticker, setActiveSticker] = useState();

    const filters = {
        "noirFilm": noirFilm,
        "blackHot": blackHot,
        "miamiVibe": miamiVibe.bind(context, styles.contestWindow)
    };

    function startFrames(filter){
        clearInterval(updateInterval);
        let canvas = document.querySelector(`.${styles.contestWindow}`);
        setUpdateInterval(setInterval(()=>{
            let playerElement = document.querySelector(`.${styles.hiddenPlayer}`);
            context.drawImage(playerElement, 0, 0, canvas.width, canvas.height);
            context.fillStyle = "transparent";
            context.fillRect(0,0, canvas.width, canvas.height);
            for(let sticker of stickers){
                context.drawImage(sticker.image, sticker.x, sticker.y);
            }
            let currentFrame = context.getImageData(0,0, canvas.width, canvas.height);
            // context.drawImage(createImage("/assets/imgs/stickers/coolCow.png"), 25, 25);
            
            let newFrame = currentFrame;
            if(filter !== undefined){
                if(filter.next !== undefined){
                    // newFrame = filter.next(currentFrame).value;
                    console.log(filter.next(currentFrame).value);
                }else{
                    newFrame = filter(currentFrame);
                }
            }
            context.putImageData(newFrame, 0, 0);
        }, 50));
    }


    function handleFilterButton(e){
        let filterName = e.target.value;
        if(activeFilter === filterName){
            setActiveFilter(undefined);
        }else{
            setActiveFilter(filterName);
        }
    }

    function handleStickerClick(src){
        setActiveSticker(src);
    }

    function hadnleCanvasClick(e){
        if(activeSticker){
            let targetRect = e.target.getBoundingClientRect()
            let xPercent = Math.round(((e.pageX - targetRect.x) / targetRect.width) * 100) / 100;
            let yPercent = Math.round((((e.pageY - targetRect.y) - window.scrollY) / targetRect.height) * 100) / 100;
            setStickers([
                ...stickers,
                {
                    image: createImage(activeSticker),
                    x: 1920 * xPercent,
                    y: 1080 * yPercent
                }
            ]);
        }
    }

    function handleTakePhoto(){
        let historyStack = document.querySelector("#historyStack");
        let canvasSnap = document.querySelector(`.${styles.contestWindow}`).toDataURL("images/png");

        let newPhoto = document.createElement("a");
        newPhoto.setAttribute("download", true);
        newPhoto.href = canvasSnap;
        newPhoto.innerHTML = `<img src=${canvasSnap} alt="Photo taken as part of the milk ad campaign"/>`;
        historyStack.appendChild(newPhoto);
    }
    

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        }).then((newVideoStream)=>{
            setVideoStream(newVideoStream);
        });
        setContext(document.querySelector(`.${styles.contestWindow}`).getContext("2d"));
    });

    useEffect(()=>{
        if(videoStream && context && !videoPlayer){
            let hiddenPlayer = document.querySelector(`.${styles.hiddenPlayer}`);
            hiddenPlayer.srcObject = videoStream;
            setVideoPlayer(hiddenPlayer.play());
            startFrames();
            filters["miamiVibe"] = miamiVibe.bind(context, styles.contestWindow);
        }
    }, [videoStream, context]);

    useEffect(()=>{
        if(videoStream && context){
            startFrames(activeFilter ? filters[activeFilter] : undefined);
        }
    },[activeFilter, stickers])

    return (
        <section>
            <aside>
                <h2>Filters</h2>
                <button value={"noirFilm"} onMouseDown={handleFilterButton}>Noir Filter</button>
                <button value={"prism"} onMouseDown={handleFilterButton}>Prism</button>
                <button value={"miamiVibe"} onMouseDown={handleFilterButton}>Miami Vibe</button>
            </aside>
            <div>
                <canvas className={styles.contestWindow} width="1920" height="1080" onClick={hadnleCanvasClick}></canvas>
                <video src="" className={styles.hiddenPlayer}></video>
                <button onClick={handleTakePhoto}>Camera Snap</button>
            </div>
            <aside>
                <h2>Stickers</h2>
                <button onClick={()=>{return handleStickerClick("/assets/imgs/stickers/coolCow.png")}}>
                    <img src="/assets/imgs/stickers/coolCow.svg"  alt="" className={styles.sticker}/>
                </button>
                <button onClick={()=>{return handleStickerClick("/assets/imgs/stickers/happyCow.png")}}>
                    <img src="/assets/imgs/stickers/happyCow.svg"  alt="" className={styles.sticker}/>
                </button>
                <button onClick={()=>{return handleStickerClick("/assets/imgs/stickers/loveCow.png")}}>
                    <img src="/assets/imgs/stickers/loveCow.svg"  alt="" className={styles.sticker}/>
                </button>
            </aside>
            <section id="historyStack">

            </section>
        </section>
    )
}