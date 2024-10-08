import './Rate.scss';
import React, { useCallback, useMemo } from 'react';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { useSelector } from 'react-redux';
import { Emoji } from 'emoji-picker-react';
import { clsx } from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';
export const Rate = () => {
  const { students } = useSelector((state) => state.entities);
  const navigate = useNavigate();

  const rateStep = useMemo(() => {
    const screenHeight = window.innerHeight;
    let largestRate = 100;
    if (students) {
      largestRate = Math.max(
        ...students?.map(el => el.estimation ? +el.estimation : 0)
          .filter(rate => !isNaN(rate))
      );
    }
    return (screenHeight - 300) / largestRate;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, window.innerHeight]);
  const balloonStyle = useCallback((el, idx) => {
    return ({
      bottom: !el.estimation ? 50 + rateStep : 50 + rateStep * el.estimation,
      left: 100 + (window.innerWidth - 100) / students.length * idx,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateStep, students, window.innerWidth]);
  return (
    <div className="rate-wrapper">
      <NavLink className="go-back-button" onClick={() => navigate(-1)}><BackIcon /></NavLink>
      {students && students?.map((el, idx) => el.isActive
        ? (
          <div className={clsx({
            balloon: true,
            feather: true,
          })} style={balloonStyle(el, idx)}>
            <div className='name'><h2>{el.estimation}</h2> {el.firstName + ' ' + el.secondName}</div>
            <Emoji size={50} unified={el.avatar} />
          </div>
        )
        : <></>)
      }
    </div>
  );
};
