import React, { useState, useEffect } from "react";
import TimeButton from "@/common/components/TimeButton";
import RefreshIcon from "@/common/components/RefreshIcon";

import "./ChampionItem.scss";

interface ChampionItemProps {
  spellData: {
    isOn: boolean;
    spellType: string;
    src: string;
    time: number;
    level: number;
  };
  handleClick?: Function;
}

const ChampionItem = ({ spellData, handleClick }: ChampionItemProps) => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState("default");

  const { spellType, src, time, level } = spellData;

  const handleClickIcon = () => {
    // handleClick();
    console.log(spellData);
  };

  useEffect(() => {
    if (counter < 5) {
      const timer = setTimeout(() => {
        setCounter(counter + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setStatus("wait");
  }, [counter]);

  const resetCounter = () => {
    setCounter(0);
  };

  const handleClickTime = () => {
    resetCounter();
    setStatus("modify");
  };

  if (status === "default") {
    if (spellType === "R") {
      return (
        <div className='ChampionItem'>
          <div className='panel panel-ultimate'>
            <div className='panel-item ultimate' onClick={handleClickIcon}>
              <div className='ultimate-level'>Lv.{level}</div>
              <img src={src} />
            </div>
            <div className='line' />
            <div className='panel-item' onClick={handleClickTime}>
              0s전
            </div>
            <div className='line' />
            <div className='panel-item' onClick={handleClickTime}>
              15s전
            </div>
            <div className='line' />
            <div className='panel-item' onClick={handleClickTime}>
              30s전
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='ChampionItem'>
          <div className='panel-item icon spell' onClick={handleClickIcon}>
            <img src={src} />
          </div>
          <div className='panel panel-spell'>
            <div
              className='panel-item panel-spell-item'
              onClick={handleClickTime}
            >
              0s전
            </div>
            <div className='line' />
            <div
              className='panel-item panel-spell-item'
              onClick={handleClickTime}
            >
              15s전
            </div>
            <div className='line' />
            <div
              className='panel-item panel-spell-item'
              onClick={handleClickTime}
            >
              30s전
            </div>
          </div>
        </div>
      );
    }
  }
  if (status === "modify") {
    return (
      <div className='ChampionItem panel-clicked'>
        <div className='item-left'>
          <div className='icon' onClick={handleClickIcon}>
            <img src={src} />
          </div>
          <span className='leftTime'>{time || 300}s</span>
        </div>
        <div className='item-right'>
          <div className='timeButtons'>
            <TimeButton time='+10' handleClick={handleClickTime} />
            <TimeButton time='-10' handleClick={handleClickTime} />
          </div>
        </div>
        <RefreshIcon />
      </div>
    );
  }
  return (
    <div className='ChampionItem panel-wait' onClick={handleClickTime}>
      <div className='item-left'>
        <div className='icon' onClick={handleClickIcon}>
          <img src={src} />
        </div>
        <span className='leftTime'>{time || 300}s</span>
      </div>
      <div className='item-right'>
        <span className='modify-button'>눌러서 수정하기</span>
      </div>
    </div>
  );
};

export default ChampionItem;
