import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";

import Clock from "./components/Clock";
import DateCurrent from "./components/DateCurrent";
import useTimer from "./components/SetTimer";

function Stoppage({ index, stoppedAt }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        {index}- {stoppedAt}
      </Text>
    </View>
  );
}

export default function App() {
  const [clock, setClock] = React.useState(false);
  const [country, setCountry] = React.useState("America/New_York");

  const [isTimer, setIsTimer] = React.useState(false);
  const [userTimerInput, setUserTimerInput] = React.useState(25);

  const {
    timer,
    setTimer,
    running,
    start,
    stop,
    stoppage,
    setStoppage,
    setStoppageId,
  } = useTimer(userTimerInput);

  const turnOff = () => {
    setClock(false);
    setIsTimer(false);
  };

  const renderItem = ({ item }) => (
    <Stoppage index={item.id} stoppedAt={item.stoppedAt} />
  );

  const timeZone = (country) => {
    setCountry(country);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require("./images/Mintes Logo-02.png")}
        />
        <Text style={styles.date}>
          <DateCurrent />
        </Text>
      </View>
      {clock ? (
        <View style={styles.container}>
          <Text style={styles.topTitle}>Time Zones</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttons2}
              onPress={() => timeZone("America/New_York")}
            >
              <Text>New York</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons2}
              onPress={() => timeZone("Europe/London")}
            >
              <Text>London</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons2}
              onPress={() => timeZone("Africa/Nairobi")}
            >
              <Text>Addis Ababa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons2}
              onPress={() => timeZone("Asia/Dubai")}
            >
              <Text>Dubai</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons2}
              onPress={() => timeZone("Asia/Tokyo")}
            >
              <Text>Tokyo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container2}>
            <Clock country={country} />
          </View>
          <View style={styles.countryContainer}>
            <Text style={styles.topTitle}>{country}</Text>
          </View>
        </View>
      ) : null}

      {isTimer ? (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              if (+text) {
                console.log(+text);
                setUserTimerInput(+text);
                setTimer(+text);
              }
            }}
            value={userTimerInput}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttons2} onPress={start}>
              Start
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons2} onPress={stop}>
              Stop
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {isTimer ? (
        <View>
          <FlatList
            data={stoppage}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal="true"
          />
          <Text style={styles.time}>
            <Text style={styles.time}>{timer}</Text>
            {/* <Text style={styles.time}>{stoppedAt}</Text> */}
          </Text>
        </View>
      ) : null}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            turnOff();
            setClock(!clock);
          }}
        >
          Clock
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            turnOff();
            setIsTimer(!isTimer);
            setStoppageId(1);
            setStoppage([]);
          }}
        >
          Timer
        </TouchableOpacity>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: "column",
    height: 5,
    margin: 25,
    borderWidth: 1,
    padding: 5,
  },
  header: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    height: 50,
    width: "auto",
    minWidth: 200,
    alignItems: "center",
    justifyContent: "space-around",
  },
  footer: {
    flex: 1,
    backgroundColor: "black",
    height: 50,
    minWidth: "auto",
    minWidth: 100,
  },
  buttonsContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 10,
    // margin: 0,
    // padding: 0,
  },
  countryContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    flexDirection: "column-reverse",
    fontWeight: "200",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 15,
    // margin: 15,
  },
  time: { fontSize: 105, margin: 30 },

  container2: {
    // borderColor: "black",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    // margin: 0,
    // padding: 0,
  },
  buttons: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    width: 100,
  },
  buttons2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 8,
    margin: 7,
    width: 100,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 7,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  topTitle: {
    fontSize: 25,
    fontWeight: "500",
  },
  date: {
    color: "white",
    fontSize: 20,
  },
  tinyLogo: {
    width: 150,
    height: 120,
  },
});
