import React, { useContext } from 'react';
import cs from 'classnames';

import UltimateLevelButton from './components/UltimateLevelButton';
import './index.scss';

import GameContext from '../../models/context/GameContext';

interface UltimateLevelModalProps {
  isVisible: boolean;
  toggleModal: Function;
  src: string;
  summonerName: string;
}

const UltimateLevelModal = ({
  isVisible,
  toggleModal,
  src,
  summonerName,
}: UltimateLevelModalProps) => {
  const { updateUltLevel } = useContext(GameContext);

  const handleClickDiv = (e) => {
    e.stopPropagation();
  };

  const handleClickButton = (level) => () => {
    updateUltLevel(summonerName, level);
    toggleModal();
  };

  return (
    <div
      className={cs('modal-backgruond', { show: isVisible })}
      onClick={() => toggleModal()}
    >
      <div
        className={cs(
          'UltimateLevelModal',
          isVisible ? 'modal-open' : 'modal-close',
        )}
        onClick={handleClickDiv}
      >
        <span>궁극기 레벨을 선택해주세요.</span>
        <img alt="궁극기 아이콘" src={src} />
        <span>Level</span>
        <div className="level-button-contaienr">
          <UltimateLevelButton level={1} handleClick={handleClickButton(1)} />
          <UltimateLevelButton level={2} handleClick={handleClickButton(2)} />
          <UltimateLevelButton level={3} handleClick={handleClickButton(3)} />
        </div>
      </div>
    </div>
  );
};

export default UltimateLevelModal;
