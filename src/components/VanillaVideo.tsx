/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable jsx-a11y/media-has-caption */
import { IonButton } from "@ionic/react";
import React, { useEffect, useRef } from "react";
import { wasm } from "../mediainfo.worker";
import landscape from "../resources/landscape.mp4";

const VanillaVideo: React.FC = () => {
  let handleChange = () => {
    wasm(landscape).then((result: any) => {
      console.log(result);
    });
  };

  let videoRef = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   console.log(videoRef);
  // }, [videoRef]);

  useEffect(() => {
    videoRef.current?.addEventListener("timeupdate", () => {
      console.log("timeupdate", videoRef.current?.currentTime);
    });
    videoRef.current?.addEventListener("progress", () => {
      console.log("progress");
    });
  }, []);

  let handleClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 11.9;
    } else console.log("idk");
  };
  // let handleNext = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = videoRef.current.currentTime + 1 / 60;
  //   } else console.log("idk");
  // };
  return (
    <>
      <video ref={videoRef} src={landscape} playsInline controls />
      <IonButton onClick={handleClick}>11.9</IonButton>
      <IonButton onClick={handleChange}>+</IonButton>
      <input type="file" onChange={handleChange} />
    </>
  );
};

export default VanillaVideo;
