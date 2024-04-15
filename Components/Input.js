import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => { },
  ...props
}) => {
  const [hidepassword, setHidepassword] = React.useState(password);
  const [isfocused, setIsfocused] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View
        style={[
          styles.input,
          { borderColor: isfocused ? "purple" : "blue" }
        ]}>
        <FontAwesome5 name={iconName} style={styles.icon} />
        <TextInput
          onFocus={() => {
            onFocus();
            setIsfocused(true);
          }}
          onBlur={() => setIsfocused(false)}
          style={styles.Textinput}
          secureTextEntry={hidepassword}
          {...props} />
        {password && (
          <FontAwesome5
            onPress={() => setHidepassword(!hidepassword)}
            name={hidepassword ? "eye-slash" : "eye"}
            style={styles.icon} />
        )}
      </View>
      {error && <Text style={styles.errortext}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "lightgrey",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  icon: {
    marginRight: 10,
    fontSize: 25,
    color: "#757575",
  },
  Textinput: {
    flex: 1,
    fontSize: 18,
    color: "#757575",
    marginLeft: 5,
  },
  errortext: {
    color: "red",
    fontSize: 12,
  }
})
export default Input;