import React from 'react'
import {
  Bird,
  BirdBox,
  BirdFace,
  Button,
  ButtonText,
  ButtonWrapper,
  WakeUpBird,
  WakeUpBirdFace,
  WakeUpBirdFace2,
} from './styles'

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>
  children: string
}

/**
 * 参考 {@link https://mp.weixin.qq.com/s/-YrqxogYO8LHxOOleHEXbQ}
 */
const ThreeBirdsButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>
      <ButtonWrapper>
        <ButtonText>{children}</ButtonText>
      </ButtonWrapper>
      <BirdBox>
        <WakeUpBird>
          <WakeUpBirdFace />
        </WakeUpBird>
        <WakeUpBird>
          <WakeUpBirdFace2 />
        </WakeUpBird>
        <Bird>
          <BirdFace />
        </Bird>
      </BirdBox>
    </Button>
  )
}

export default ThreeBirdsButton
