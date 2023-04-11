import { keyframes } from '@emotion/react'

export const BASE_COLOR = '#000'
export const MAIN_COLOR = '#f4cf47'
export const SUB_COLOR_1 = '#f4e19c'
export const SUB_COLOR_2 = '#ff8108'
export const BORDER_RADIUS_1 = '60px 60px 40px 40px / 48px 48px 30px 30px'
export const BORDER_RADIUS_2 = '70px 70px 40px 40px / 48px 48px 30px 30px'
export const BORDER_RADIUS_3 = '40px 40px 40px 40px / 48px 48px 30px 30px'

export const WAKE_UP = keyframes`
  0% {
    height: 2rem;
    border-radius: ${BORDER_RADIUS_2};
  }
  100% {
    height: 3.5rem;
    border-radius: ${BORDER_RADIUS_3};
  }
`
export const EYE = keyframes`
  0% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  30% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  32% {
    top: -0.25rem;
    width: 0.5rem;
    height: 0.125rem;
  }
  34% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  70% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  72% {
    top: -0.25rem;
    width: 0.5rem;
    height: 0.125rem;
  }
  74% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  76% {
    top: -0.25rem;
    width: 0.5rem;
    height: 0.125rem;
  }
  78% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  100% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
`
export const EYE_2 = keyframes`
  0% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  10% {
    transform: translateX(0);
  }
  12% {
    transform: translateX(0.1875rem);
  }
  20% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  22%{
    top: -0.25rem;
    width: 0.5rem;
    height: 0.125rem;
  }
  24%{
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  25% {
    transform: translateX(0.1875rem);
  }
  27% {
    transform: translateX(0);
  }
  74% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
    transform: translateX(0);
  }
  76% {
    top: -0.25rem;
    width: 0.5rem;
    height: 0.125rem;
    transform: translateX(0.1875rem);
  }
  78% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  80% {
    top: -0.25rem;
    width: 0.5rem;
    height: 0.125rem;
  }
  82% {
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
  }
  85% {
    transform: translateX(0.1875rem);
  }
  87% {
    transform: translateX(0);
  }
  100%{
    top: -0.375rem;
    width: 0.375rem;
    height: 0.375rem;
    transform: translateX(0);
  }
`
export const SLEEP = keyframes`
  0% {
    height: 2.25rem;
    border-radius: ${BORDER_RADIUS_1};
  }
  100% {
    height: 2rem;
    border-radius: ${BORDER_RADIUS_2};
  }
`
