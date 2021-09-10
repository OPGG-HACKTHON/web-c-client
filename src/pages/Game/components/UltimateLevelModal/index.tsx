import React, { useContext, useState } from 'react';

import UltimateLevelButton from './components/UltimateLevelButton';
import './index.scss';

import GameContext from '../../models/context/GameContext';

interface UltimateLevelModal {
  src: string;
  handleClick: Function;
  summonerName: string;
  showModal: boolean;
}

const UltimateLevelModal = ({
  src, handleClick, summonerName, showModal,
}) => {
  const [modal, setModal] = useState('modal-open');
  const { updateUltLevel } = useContext(GameContext);

  const handleClickModal = () => {
    modal === 'modal-open' && setModal('modal-close');
    if (!showModal) handleClick();
    else {
      setTimeout(() => {
        handleClick();
      }, 500);
    }
  };

  const handleClickDiv = (e) => {
    e.stopPropagation();
  };

  const handleClickButton = (level) => () => {
    updateUltLevel(summonerName, level);
    handleClickModal();
  };
  return (
    <>
      <div className="modal-container" onClick={handleClickModal}>
        <div onClick={handleClickDiv} className={`UltimateLevelModal ${modal}`}>
          <span>궁극기 레벨을 선택해주세요.</span>
          <img src={src} />
          <span>Level</span>
          <div className="ultimate-level-button">
            <UltimateLevelButton level={1} handleClick={handleClickButton(1)} />
            <UltimateLevelButton level={2} handleClick={handleClickButton(2)} />
            <UltimateLevelButton level={3} handleClick={handleClickButton(3)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UltimateLevelModal;
