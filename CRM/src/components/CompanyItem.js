import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

const CompanyItem = (props) => {
  return (
    <View>
      <View style={styles.card}>
        <Image style={styles.image} source={require('./../images/background.jpg')} />
        <Text style={styles.title}>{props.companies.company}</Text>
        {props.companies.names.map((name) => {
          return (
            <Text key={name.uid} style={styles.action}>
              {name.first_name} {name.last_name} - Project: {name.project}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  title: {
    fontSize: 26,
  },
  image: {
    height: 100,
  },
  action: {
    backgroundColor: 'black',
    color: 'white',
    paddingBottom: 5,
    paddingTop: 5,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

export default CompanyItem;
