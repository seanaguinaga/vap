import { IonCard } from "@ionic/react";
import React, { useState } from "react";
import { createContainer } from "../lib/unstated-next";
import "./ExploreContainer.css";
import Stars from "./Stars";
import Video from "./Video";

function useVAP() {
  let [size, setSize] = useState<{
    height: number | null;
    width: number | null;
  }>({ height: null, width: null });

  return { size, setSize };
}

export let VAP = createContainer(useVAP);

const ExploreContainer: React.FC = () => {
  let vap = VAP.useContainer();

  return (
    <IonCard>
      <Video setSize={vap.setSize} />
      <Stars />
    </IonCard>
  );
};

export default function () {
  return (
    <VAP.Provider>
      <ExploreContainer />
    </VAP.Provider>
  );
}
