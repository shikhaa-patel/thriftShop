import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const lottie = () => {
  let style={
  "translate" : "-3.5rem -3rem",
  "width": "100%",
  "height": "100%",
  }
  return (
    <div>
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_eq9hnyso.json"
        style={style}
      ></Player>
    </div>
  );
};

export default lottie;