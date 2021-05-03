import { IonButton } from "@ionic/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { SizeMe } from "react-sizeme";
import styled from "styled-components";
//@ts-expect-error yes
import video from "../resources/video.mp4";
import "./ExploreContainer.css";
import Stars from "./Stars";

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
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  let targetRef = useRef<any | null>(null);
  let [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current?.offsetWidth,
        height: targetRef.current?.offsetHeight,
      });
    }
  }, []);

  return (
    <>
      <IonButton onClick={() => console.log({ dimensions })}>Click</IonButton>
      <strong>{name}</strong>
      <Wrapper>
        <SizeMe>
          {({ size }) => (
            <>
              <div>My width is {size.width}px</div>

              <Player
                ref={targetRef}
                url={video}
                width="100%"
                height="100%"
                controls
                playsinline
              />
            </>
          )}
        </SizeMe>
      </Wrapper>
      <Stars />
    </>
  );
};

export default ExploreContainer;
