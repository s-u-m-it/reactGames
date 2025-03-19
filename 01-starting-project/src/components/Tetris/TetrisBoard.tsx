import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import spaceShip from "../../assets/spaceShip_JPEG.png";

//console.log(playerRef.current?.getBoundingClientRect());

const TetrisBoard: React.FC = (): ReactNode => {
  const [moveKey, setMoveKey] = useState("");

  const direction: RefObject<number> = useRef(0);
  const playerRef: RefObject<HTMLImageElement | null> = useRef(null);
  const meteorRefs: RefObject<Array<HTMLSpanElement | null>> = useRef([]);

  const [meteor, setMeteor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [meteors, setMeteors] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const meteorTimer = setTimeout(() => {
      setMeteor((prevMeteorPos) => {
        return { x: prevMeteorPos.x, y: prevMeteorPos.y + 10 };
      });
    }, 1000);

    return () => clearTimeout(meteorTimer);
  }, [meteor]);

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      //console.log("Triggering");

      switch (event.key) {
        case "ArrowRight":
          // console.log("Right Arrow");
          if (direction.current < 18) direction.current += 1;
          break;
        case "ArrowLeft":
          // console.log("Left Arrow");
          if (direction.current > -18) direction.current -= 1;
          break;
        case "ArrowDown":
          direction.current = 0;
          break;
      }
      // console.log(direction.current);
      setMoveKey(`${event.key}+${direction.current}`);
    };
    window.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [moveKey]);

  return (
    <>
      <div
        style={{
          justifySelf: "center",
          flexDirection: "column",
          // textAlign: "center",
          // position: "absolute",
          display: "flex",
          height: "350px",
          width: "400px",
          borderStyle: "dashed",
          borderColor: "white",
          // padding: "200px",
          // margin: "20px",
        }}
      >
        {meteors.map((eachMeteor, i) => (
          <span
            key={i}
            ref={(el) => {
              meteorRefs.current[i] = el;
            }}
            style={{
              textAlign: "center",
              position: "relative",
              top: `${eachMeteor.y}px`,
              left: `${eachMeteor.x}px`,
              height: "30px",
              width: "30px",
              transitionDuration: "1s",
            }}
          >
            {" "}
            Obj{" "}
          </span>
        ))}
        <span
          style={{
            textAlign: "center",
            position: "relative",
            top: `${meteor.y}px`,
            left: `${meteor.x}px`,
            height: "30px",
            width: "30px",
            transitionDuration: "1s",
          }}
        >
          Obj
        </span>
        <span
          style={{
            // justifyContent: "flex-end",
            height: "30px",
            width: "30px",
            textAlign: "center",
            position: "relative",
            top: "280px",
            left: `${direction.current * 10 + 185}px`,
            // transitionProperty: "left",
          }}
        >
          <img
            src={spaceShip}
            alt={"Space Ship"}
            style={{ height: "30px", width: "30px" }}
            ref={playerRef}
          />
        </span>
      </div>
    </>
  );
};

export default TetrisBoard;
