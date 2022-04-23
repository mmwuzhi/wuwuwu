import moment from 'moment'
import styled from 'styled-components'

const Time = styled.time`
  color: #666;
`

interface Props {
  dateString: string
}

const Date: React.FC<Props> = ({ dateString }) => {
  const date = moment(dateString).format('YYYY MMMM Do')
  return (
    <div>
      <Time dateTime={dateString}>
        {date}
      </Time>
    </div>
  )
}

export default Date
