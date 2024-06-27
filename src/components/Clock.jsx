import React, { useEffect, useRef } from "react";
import "../styles/clockStyles.css";
import styled from "styled-components";
const ClockHand = styled.div`
width: 50%;
height: 2px;
background: black;
position: absolute;
top: 50%;
transform-origin: 100%;
transform: rotate(90deg);
transition: transform 0.1s linear
`;
const BondaryMarks = styled.div`
    width:${props => props.isHour ? "4px" : "2px"};
    height:${props => props.isHour ? "20px" : "px"};
    background: black;
    position:absolute;
    top:0;
    left:50%;

`
const Clock = () => {
  const hourHand = useRef(null);
  const minuteHand = useRef(null);
  const secondHand = useRef(null);

  const updateClock = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const secondsDeg = (seconds / 60) * 360 + 90;
    const minutesDeg = ((minutes / 60) * 360 + 90) + (seconds / 60) * (30 / 5);
    console.log(minutes, minutesDeg);
    const hourDeg = ((hours / 12) * 360 +
    90 ) + (minutes / 60) * 30;

    secondHand.current.style.transform = `rotate(${secondsDeg}deg)`;
    minuteHand.current.style.transform = `rotate(${minutesDeg}deg)`;
    hourHand.current.style.transform = `rotate(${hourDeg}deg)`;
  };

    useEffect(() => {
      const interval = setInterval(updateClock, 1000);

      return () => clearInterval(interval);
    }, []);

  return (
    <div className="clock-container">
      <ClockHand
        ref={hourHand}
        angle={90}
        style={{
          height: "4px",
          background: "black",
        }}
      />
      <ClockHand
        ref={minuteHand}
        angle={90}
        style={{
          height: "3px",
          background: "black",
        }}
      />
      <ClockHand
        ref={secondHand}
        angle={90}
        style={{
          height: "2px",
          background: "black",
        }}
      />
    </div>
  );
};

export default Clock;
