import dayjs from 'dayjs'
import styled from 'styled-components'

const Time = styled.time`
  color: #666;
`

interface Props {
  dateString: string
}

const Date: React.FC<Props> = ({ dateString }) => {
  const date = dayjs(dateString).format('YYYY年MM月D日 (ddd)')
  return (
    <div>
      <Time dateTime={dateString}>{date}</Time>
    </div>
  )
}

export default Date
