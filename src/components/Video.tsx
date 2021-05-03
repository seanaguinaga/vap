import React, { useMemo } from "react";
import ReactPlayer from "react-player";
import { SizeMe } from "react-sizeme";
import styled from "styled-components";
//@ts-expect-error yes
import landscape from "../resources/landscape.mp4";
//@ts-expect-error yes
import portrait from "../resources/portrait.mp4";
import "./ExploreContainer.css";

let Wrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`;

let Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

interface ContainerProps {
  setSize: React.Dispatch<
    React.SetStateAction<{
      height: number | null;
      width: number | null;
    }>
  >;
}

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

const Video: React.FC<ContainerProps> = ({ setSize }) => {
  return useMemo(
    () => (
      <SizeMe monitorHeight>
        {({ size }) => {
          setSize(size);
          return iOS() ? (
            <ReactPlayer
              url={portrait}
              width="100%"
              height="100%"
              controls
              playsinline
            />
          ) : (
            <Wrapper>
              <Player
                url={landscape}
                width="100%"
                height="100%"
                controls
                playsinline
              />
            </Wrapper>
          );
        }}
      </SizeMe>
    ),
    []
  );
};

export default Video;
