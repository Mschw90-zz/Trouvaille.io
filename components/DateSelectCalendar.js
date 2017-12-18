import React from 'react';
import { View, Text} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button } from 'native-base';
import styles from '../styles.js';

export default class DateSelectCalendar extends React.Component {
  constructor(props) {
    super()
    this.state = {
      date: props.initialDate
    }
  }

  onChangeDay(day) {
    //this.props.changeDay is passed by the newDriveScreen component so calling
    //it here with the parameter day passes the day back up to newDriveScreen
    this.props.changeDay(day)
    this.setState({
      date: day.dateString
    })
    this.props.closeModal()
  }

  render() {
    return (
      <View>
        <Calendar style={styles.calendar}
          onDayPress={(day) => {this.onChangeDay(day)}}
        />
        <Text style={{color: 'pink'}}>The date is: {this.state.date} </Text>
      </View>
    )
  }
}
