import React, { useEffect, useState } from 'react';
import './Container.css';
import { RxUpdate } from "react-icons/rx";
import { MdOutlineTimer } from "react-icons/md";
const Container = () => {
  const [points, setPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasStarted, setHasStarted] = useState(false); // Trạng thái kiểm tra trò chơi đã bắt đầu

  useEffect(() => {
      generatePoints();
  }, []);

  useEffect(() => {
      let timer;
      if (isPlaying && hasStarted) {
          timer = setInterval(() => {
              setTime((prev) => prev + 0.1);
          }, 100);
      }
      return () => clearInterval(timer);
  }, [isPlaying, hasStarted]);

  const generatePoints = () => {
      const newPoints = [];
      for (let i = 1; i <= 10; i++) {
          const x = Math.random() * 360;
          const y = Math.random() * 360;
          newPoints.push({ id: i, x, y });
      }
      setPoints(newPoints);
      setTime(0);
      setIsPlaying(true);
  };

  const handlePointClick = (id) => {
      if (!hasStarted) {
          setHasStarted(true); // Bắt đầu tính thời gian khi nhấn vào hình tròn đầu tiên
      }
      const updatePoints = points.filter((p) => p.id !== id);
      setPoints(updatePoints);
      if (updatePoints.length === 0) {
          setIsPlaying(false);
      }
  };

  const handleRestart = () => {
      generatePoints();
      setHasStarted(false); // Đặt lại trạng thái khi khởi động lại trò chơi
  };
    return (
        <div className='container'>
          <div className='container-box'>
            <div className='container-title'>
            <h1>LET'S PLAY</h1>
            <div className='container-title-icon'>
            <p><MdOutlineTimer /> </p> 
            <h2>{time.toFixed(1)}s</h2>
            <button className='btn' onClick={handleRestart}><RxUpdate /></button>
            </div>
            </div>
          <div className='points-box'>
            <input value={points.length} readOnly type="text" />
            <span>Points</span>
          </div>
            
            <div className="box-game">
                {points.map((point) => (
                    <div
                        key={point.id}
                        className="points"
                        onClick={() => handlePointClick(point.id)}
                        style={{ left: point.x, top: point.y }}
                    >
                        {point.id}
                    </div>
                ))}
                {points.length === 0 && (
                    <div className="all-cleared">
                        <h2>ALL CLEARED</h2>
                    </div>
                )}
            </div>
        </div>
          </div>
            
    );
};

export default Container;