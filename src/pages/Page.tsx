import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { play } from "ionicons/icons";
import { useParams } from "react-router";
import DEVWASM from "../components/DEVWASM";
import ExploreContainer from "../components/ExploreContainer";
import PRODWASM from "../components/PRODWASM";
import "./Page.css";

const devMode = process.env.NODE_ENV !== "production";

const Page: React.FC = () => {
  let { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon icon={play} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            {devMode ? <DEVWASM /> : <PRODWASM />}
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Page;
