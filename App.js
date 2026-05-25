import React, { useState } from "react";
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

const operators = ["+", "-", "×", "÷"];

export default function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [expression, setExpression] = useState("");

  const formatResult = (number) => {
    if (!Number.isFinite(number)) {
      return "Помилка";
    }

    return Number(number.toFixed(8)).toString();
  };

  const calculate = () => {
    if (previousValue === null || operator === null) {
      return;
    }

    const firstNumber = Number(previousValue);
    const secondNumber = Number(currentValue);
    let result = 0;

    if (operator === "+") {
      result = firstNumber + secondNumber;
    }

    if (operator === "-") {
      result = firstNumber - secondNumber;
    }

    if (operator === "×") {
      result = firstNumber * secondNumber;
    }

    if (operator === "÷") {
      result = firstNumber / secondNumber;
    }

    const formattedResult = formatResult(result);

    setExpression(`${previousValue} ${operator} ${currentValue} =`);
    setCurrentValue(formattedResult);
    setPreviousValue(null);
    setOperator(null);
  };

  const handleNumber = (value) => {
    if (value === "." && currentValue.includes(".")) {
      return;
    }

    if (currentValue === "0" && value !== ".") {
      setCurrentValue(value);
      return;
    }

    setCurrentValue(currentValue + value);
  };

  const handleOperator = (selectedOperator) => {
    setPreviousValue(currentValue);
    setOperator(selectedOperator);
    setExpression(`${currentValue} ${selectedOperator}`);
    setCurrentValue("0");
  };

  const clearCalculator = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
    setExpression("");
  };

  const deleteLastSymbol = () => {
    if (currentValue.length === 1) {
      setCurrentValue("0");
      return;
    }

    setCurrentValue(currentValue.slice(0, -1));
  };

  const handlePress = (value) => {
    if (!Number.isNaN(Number(value)) || value === ".") {
      handleNumber(value);
      return;
    }

    if (operators.includes(value)) {
      handleOperator(value);
      return;
    }

    if (value === "=") {
      calculate();
      return;
    }

    if (value === "C") {
      clearCalculator();
      return;
    }

    if (value === "⌫") {
      deleteLastSymbol();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.calculator}>
        <View style={styles.display}>
          <Text style={styles.expression}>{expression || "Калькулятор"}</Text>
          <Text style={styles.result}>{currentValue}</Text>
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
                    operators.includes(button) && styles.operatorButton,
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