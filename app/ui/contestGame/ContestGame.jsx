"use client";

import { useEffect, useState } from "react"
import styles from "./contestGame.module.css"
import { blackHot, miamiVibe, noirFilm } from "@/app/lib/imageFilters";
import { createImage } from "@/app/lib/helpers";
import { useRouter } from "next/navigation";

// Credit to Stuart Sackler, their example on using canvas 2d contexts to manipulate images from the webcam were translated from vanilla JS into something usable within react.
export default function ContestGame(){
    const [activeFilter, setActiveFilter] = useState();
    const [videoPlayer, setVideoPlayer] = useState();
    const [context, setContext] = useState();
    const [updateInterval, setUpdateInterval] = useState();
    const [videoStream, setVideoStream] = useState();
    const [stickers, setStickers] = useState([]);
    const [activeSticker, setActiveSticker] = useState();
    const [activeStickerText, setActiveStickerText] = useState();
    const router = useRouter();

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
        console.log(src);
        setActiveStickerText(src)
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
        newPhoto.setAttribute("download", "CanadianDairyHouseEntry");
        newPhoto.href = canvasSnap;
        newPhoto.innerHTML = `<img src=${canvasSnap} class=${styles.historyPic} alt="Photo taken as part of the milk ad campaign"/>`;
        historyStack.appendChild(newPhoto);
        setStickers([]);
        setActiveSticker(undefined);
        setActiveFilter(undefined);
    }
    

    useEffect(()=>{
        console.log(localStorage.getItem("permitContest"));
        if(!localStorage.getItem("permitContest")){
            router.push("/signup");
        }
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        }).then((newVideoStream)=>{
            setVideoStream(newVideoStream);
        });
        setContext(document.querySelector(`.${styles.contestWindow}`).getContext("2d"));
    }, []);

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
        <>
            <section className={styles.contest}>
                <div className={styles.filterHolder}>
                    <aside className={`${styles.stacker} ${styles.filterStack}`}>
                        <h2>Filters</h2>
                        <button 
                            className={activeFilter === "noirFilm" ? styles.active : undefined}
                            value={"noirFilm"} onMouseDown={handleFilterButton}>Noir Filter</button>
                        <button
                            className={activeFilter === "blackHot" ? styles.active : undefined}
                            value={"blackHot"} onMouseDown={handleFilterButton}>BlackHot Filter</button>
                        <button 
                            className={activeFilter === "miamiVibe" ? styles.active : undefined}
                            value={"miamiVibe"} onMouseDown={handleFilterButton}>Miami Vibe</button>
                    </aside>
                </div>
                <div className={styles.canvasSect}>
                    <canvas className={styles.contestWindow} width="1920" height="1080" onClick={hadnleCanvasClick}></canvas>
                    <video src="" className={styles.hiddenPlayer}></video>
                    <button className={styles.cameraButton} onClick={handleTakePhoto}>Take Picture</button>
                </div>
                <aside className={`${styles.stacker} ${styles.stickerStack}`}>
                    <h2>Stickers</h2>
                    <div className={styles.stickerButtonStack}>
                        <button className={`${styles.stickerButton} ${activeStickerText == "/assets/imgs/stickers/coolCow.png" ? styles.activeSticker : undefined}`} onClick={()=>{return handleStickerClick("/assets/imgs/stickers/coolCow.png", 1)}}>
                            <img src="/assets/imgs/stickers/coolCow.svg"  alt="" className={styles.sticker}/>
                        </button>
                        <button className={`${styles.stickerButton} ${activeStickerText == "/assets/imgs/stickers/happyCow.png" ? styles.activeSticker : undefined}`} onClick={()=>{return handleStickerClick("/assets/imgs/stickers/happyCow.png", 2)}}>
                            <img src="/assets/imgs/stickers/happyCow.svg"  alt="" className={styles.sticker}/>
                        </button>
                        <button className={`${styles.stickerButton} ${activeStickerText == "/assets/imgs/stickers/loveCow.png" ? styles.activeSticker : undefined}`} onClick={()=>{return handleStickerClick("/assets/imgs/stickers/loveCow.png", 3)}}>
                            <img src="/assets/imgs/stickers/loveCow.svg"  alt="" className={styles.sticker}/>
                        </button>
                        <button className={`${styles.stickerButton} ${activeStickerText == "/assets/imgs/stickers/cow.png" ? styles.activeSticker : undefined}`} onClick={()=>{return handleStickerClick("/assets/imgs/stickers/cow.png", 4)}}>
                            <img src="/assets/imgs/stickers/cow.svg"  alt="" className={styles.sticker}/>
                        </button>
                        <button className={`${styles.stickerButton} ${activeStickerText == "/assets/imgs/stickers/carton.png" ? styles.activeSticker : undefined}`} onClick={()=>{return handleStickerClick("/assets/imgs/stickers/carton.png", 5)}}>
                            <img src="/assets/imgs/stickers/carton.svg"  alt="" className={styles.sticker}/>
                        </button>
                    </div>
                </aside>
            </section>
            <section id="historyStack" className={styles.historyStack}>
            </section>
        </>
    )
}