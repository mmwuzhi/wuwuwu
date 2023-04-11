import styled from '@emotion/styled'
import {
  BASE_COLOR,
  BORDER_RADIUS_1,
  EYE,
  EYE_2,
  MAIN_COLOR,
  SLEEP,
  SUB_COLOR_1,
  SUB_COLOR_2,
  WAKE_UP,
} from './constants'

export const Bird = styled.div`
  position: relative;
  width: 3.5rem;
  height: 2.25rem;
  box-sizing: border-box;
  border: solid 0.1875rem ${BASE_COLOR};
  background: ${MAIN_COLOR};
  border-radius: ${BORDER_RADIUS_1};
  animation: ${SLEEP} 1s ease infinite alternate;
  display: flex;
  justify-content: center;

  ::before {
    content: '';
    position: absolute;
    top: -0.75rem;
    left: 1.375rem;
    width: 0.75rem;
    height: 0.75rem;
    background: ${BASE_COLOR};
    clip-path: path(
      'M10.23,3.32c-3.54,.63-5.72,2.51-7.02,4.23-.33-1.58-.34-3.54,.93-5.12,.52-.65,.41-1.59-.24-2.11C3.24-.19,2.29-.08,1.77,.57c-3.82,4.77-.31,11.11-.13,11.42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0-.01-.02,2.49,.04,2.52,0,.1-.14,1.54-4.82,6.59-5.71,.82-.14,1.37-.92,1.22-1.74s-.94-1.36-1.75-1.21Z'
    );
  }
`
export const WakeUpBird = styled(Bird)``
export const BirdFace = styled.div`
  position: absolute;
  top: 0.9375rem;
  width: 0.75rem;
  height: 0.375rem;
  background: ${SUB_COLOR_2};
  border-radius: 50% 50% 50% 50% / 78% 78% 22% 22%;
  transition: 0.2s;

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: -0.25rem;
    width: 0.5rem;
    height: 0.125rem;
    border-radius: 0.25rem;
    background: ${BASE_COLOR};
  }

  ::before {
    left: -0.3125rem;
  }
  ::after {
    right: -0.3125rem;
  }
`
export const WakeUpBirdFace = styled(BirdFace)``
export const WakeUpBirdFace2 = styled(BirdFace)``
export const ButtonText = styled.span<{ textColor?: string }>`
  position: relative;
  font-size: 2rem;
  letter-spacing: 0.25rem;
  color: ${BASE_COLOR};
  transition: all 0.3s ease;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border-radius: 2.5rem;

  overflow: hidden;
  position: relative;

  ::before,
  ::after {
    content: '';

    position: absolute;
    bottom: 0;

    width: 8.125rem;
    height: 2.375rem;

    background-color: ${SUB_COLOR_1};
    transition: all 0.5s ease;
    clip-path: path(
      'M13.77,37.35L.25,16.6c-.87-1.33,.69-2.91,2-2.02l12.67,8.59c.81,.55,1.91,.14,2.18-.81l2.62-9.33c.39-1.4,2.34-1.42,2.76-.02l3.6,11.99c.33,1.11,1.74,1.4,2.47,.52L49.38,.52c.87-1.04,2.53-.42,2.53,.95V23.7c0,1.13,1.2,1.83,2.16,1.26l12.75-7.51c.85-.5,1.94,0,2.13,.98l1.5,7.6c.2,1.03,1.37,1.51,2.22,.92l17.74-12.3c1.09-.75,2.52,.25,2.21,1.55l-2.44,10.2c-.26,1.09,.74,2.06,1.8,1.75l30.8-9.04c1.37-.4,2.42,1.26,1.49,2.36l-9.07,10.66c-.83,.98-.1,2.49,1.17,2.42l12.12-.68c1.6-.09,2.12,2.15,.65,2.8l-2.73,1.21c-.18,.08-.38,.12-.58,.12H14.97c-.48,0-.93-.25-1.2-.65Z'
    );
  }
  ::before {
    left: 0;
  }
  ::after {
    right: 0;
    transform: rotateY(180deg);
  }
`

export const Button = styled.div<{ backgroundColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  width: 17.5rem;
  height: 5rem;

  text-decoration: none;
  border: solid 0.1875rem #000;
  border-radius: 2.5rem;
  background: ${MAIN_COLOR};
  position: relative;
  margin-top: 2rem;

  ::before {
    content: '';
    position: absolute;

    right: 1.25rem;
    margin: auto 0;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${BASE_COLOR};
    clip-path: path(
      'M24,12.02c0-1.09-.75-1.71-.81-1.77L11.17,.45c-.91-.74-2.21-.56-2.91,.42-.69,.97-.52,2.37,.39,3.11l7.12,5.81-13.7-.02h0C.93,9.77,0,10.76,0,11.99c0,1.23,.93,2.22,2.07,2.22l13.7,.02-7.13,5.78c-.91,.74-1.09,2.13-.4,3.11,.41,.58,1.03,.88,1.65,.88,.44,0,.88-.15,1.25-.45l12.04-9.76c.07-.06,.82-.67,.82-1.77Z'
    );
    transition: all ease 0.2s;
  }
  :hover ${ButtonWrapper} ::before {
    transform: translateX(-0.75rem);
  }
  :hover ${ButtonWrapper} ::after {
    transform: rotateY(180deg) translateX(-12px);
  }
  :hover ${ButtonText} {
    letter-spacing: 0.375rem;
  }
  :hover ::before {
    right: 0.875rem;
  }
  :hover ${WakeUpBird} {
    animation: ${WAKE_UP} 0.2s ease;
    animation-fill-mode: forwards;
  }
  :hover ${WakeUpBirdFace}, :hover ${WakeUpBirdFace2} {
    top: 1.25rem;
  }
  :hover ${WakeUpBirdFace} ::before {
    animation: ${EYE} 5s linear infinite;
  }
  :hover ${WakeUpBirdFace} ::after {
    animation: ${EYE} 5s linear infinite;
  }
  :hover ${WakeUpBirdFace2} ::before {
    animation: ${EYE_2} 5s linear infinite;
  }
  :hover ${WakeUpBirdFace2} ::after {
    animation: ${EYE_2} 5s linear infinite;
  }
  :hover {
    cursor: pointer;
  }
`

export const BirdBox = styled.div`
  position: absolute;
  top: -3.375rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 11.25rem;
  height: 3.5rem;
`
