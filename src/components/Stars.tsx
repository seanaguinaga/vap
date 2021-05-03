import React, { useEffect, useState } from "react";
import { Layer, Stage, Star, Text } from "react-konva";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Stars: React.FC = () => {
  let [stars, setStars] = useState(INITIAL_STATE);

  let handleDragStart = (e: any) => {
    let id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  let handleDragEnd = (e: any) => {
    console.log(e);
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  useEffect(() => console.log(stars), [stars]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: "absolute", top: 0, pointerEvents: "none" }}
    >
      <Layer>
        <Text text="Try to drag a star" />
        {stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Stars;
