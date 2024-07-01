import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hand = styled.div`
  width: 50%;
  height: 2px;
  background: ${props => props.color};
  position: absolute;
  top: 50%;
  transform-origin: 100%;
  transition: transform 0.1s linear;
`;

const Marker = styled.div`
  width: ${props => (props.isHour ? '4px' : '2px')};
  height: ${props => (props.isHour ? '20px' : '10px')};
  background: black;
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: bottom;
  transform: rotate(${props => props.angle}deg) translate(-50%, 0);
`;

const Clock = () => {
  const hourHand = useRef(null);
  const minuteHand = useRef(null);
  const secondHand = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();
      const secondDeg = (seconds / 60) * 360;
      const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
      const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

      secondHand.current.style.transform = `rotate(${secondDeg}deg)`;
      minuteHand.current.style.transform = `rotate(${minuteDeg}deg)`;
      hourHand.current.style.transform = `rotate(${hourDeg}deg)`;
    };

    const interval = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(interval);
  }, []);

  const renderMarkers = () => {
    const markers = [];
    for (let i = 0; i < 60; i++) {
      const isHour = i % 5 === 0;
      markers.push(<Marker key={i} angle={i * 6} isHour={isHour} />);
    }
    return markers;
  };

  return (
    <ClockContainer>
      {renderMarkers()}
      <Hand ref={hourHand} color="black" style={{ height: '4px' }} />
      <Hand ref={minuteHand} color="black" style={{ height: '3px' }} />
      <Hand ref={secondHand} color="red" style={{ height: '2px' }} />
    </ClockContainer>
  );
};

export default Clock;
