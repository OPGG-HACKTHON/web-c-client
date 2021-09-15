import React, { useContext } from 'react';
import cs from 'classnames';

import UltimateLevelButton from './components/UltimateLevelButton';
import './index.scss';

import GameContext from '../../models/context/GameContext';

interface UltimateLevelModalProps {
  currentLevel: number;
  isVisible: boolean;
  toggleModal: Function;
  src: string;
  summonerName: string;
}

const UltimateLevelModal = ({
  currentLevel,
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
      className={cs('modal-background', { show: isVisible })}
      onClick={() => toggleModal()}
    >
      <div
        className={cs(
          'UltimateLevelModal',
          isVisible ? 'modal-open' : 'modal-close',
        )}
        onClick={handleClickDiv}
      >
        <img alt="궁극기 아이콘" src={src} />
        <div className="ultimate-modal-level">Lv.{currentLevel}</div>
        <span>
          <span className="strong">궁극기 레벨</span>을 선택해주세요.
        </span>
        <div className="level-button-contaienr">
          <UltimateLevelButton
            level={1}
            handleClick={handleClickButton(1)}
            currentLevel={currentLevel}
          />
          <UltimateLevelButton
            level={2}
            handleClick={handleClickButton(2)}
            currentLevel={currentLevel}
          />
          <UltimateLevelButton
            level={3}
            handleClick={handleClickButton(3)}
            currentLevel={currentLevel}
          />
        </div>
      </div>
    </div>
  );
};

export default UltimateLevelModal;
