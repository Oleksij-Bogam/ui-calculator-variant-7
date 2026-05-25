import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

const buttons = [
  ["C", "⌫", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export default function App() {
  const handlePress = (value) => {
    console.log("Pressed:", value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.calculator}>
        <View style={styles.display}>
          <Text style={styles.expression}>Калькулятор</Text>
          <Text style={styles.result}>0</Text>
        </View>

        <View style={styles.keyboard}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((button) => (
                <TouchableOpacity
                  key={button}
                  style={[
                    styles.button,
                    button === "=" && styles.equalsButton,
                    ["+", "-", "×", "÷"].includes(button) && styles.operatorButton,
                    ["C", "⌫"].includes(button) && styles.controlButton,
                  ]}
                  onPress={() => handlePress(button)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      button === "=" && styles.equalsButtonText,
                    ]}
                  >
                    {button}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    padding: 16,
  },
  calculator: {
    backgroundColor: "#1f2937",
    borderRadius: 24,
    padding: 16,
  },
  display: {
    minHeight: 150,
    backgroundColor: "#030712",
    borderRadius: 18,
    padding: 20,
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  expression: {
    color: "#9ca3af",
    fontSize: 20,
    textAlign: "right",
    marginBottom: 8,
  },
  result: {
    color: "#f9fafb",
    fontSize: 46,
    fontWeight: "700",
    textAlign: "right",
  },
  keyboard: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    minHeight: 70,
    borderRadius: 16,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  operatorButton: {
    backgroundColor: "#2563eb",
  },
  controlButton: {
    backgroundColor: "#4b5563",
  },
  equalsButton: {
    backgroundColor: "#22c55e",
  },
  buttonText: {
    color: "#f9fafb",
    fontSize: 28,
    fontWeight: "600",
  },
  equalsButtonText: {
    color: "#052e16",
  },
});