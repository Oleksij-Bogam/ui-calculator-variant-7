import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
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
  const [history, setHistory] = useState([]);

  const formatResult = (number) => {
    if (!Number.isFinite(number)) {
      return "Помилка";
    }

    return Number(number.toFixed(8)).toString();
  };

  const addToHistory = (record) => {
    setHistory((previousHistory) => [record, ...previousHistory].slice(0, 10));
  };

  const calculate = () => {
    if (previousValue === null || operator === null) {
      return;
    }

    const firstNumber = Number(previousValue);
    const secondNumber = Number(currentValue);
    const expressionText = `${previousValue} ${operator} ${currentValue}`;

    if (operator === "÷" && secondNumber === 0) {
      const errorText = "Помилка: ділення на нуль";

      setExpression(`${expressionText} =`);
      setCurrentValue(errorText);
      setPreviousValue(null);
      setOperator(null);
      addToHistory(`${expressionText} = ${errorText}`);
      return;
    }

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

    setExpression(`${expressionText} =`);
    setCurrentValue(formattedResult);
    setPreviousValue(null);
    setOperator(null);
    addToHistory(`${expressionText} = ${formattedResult}`);
  };

  const handleNumber = (value) => {
    if (currentValue.startsWith("Помилка")) {
      setCurrentValue(value === "." ? "0." : value);
      setExpression("");
      return;
    }

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
    if (currentValue.startsWith("Помилка")) {
      return;
    }

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
    if (currentValue.startsWith("Помилка")) {
      clearCalculator();
      return;
    }

    if (currentValue.length === 1) {
      setCurrentValue("0");
      return;
    }

    setCurrentValue(currentValue.slice(0, -1));
  };

  const clearHistory = () => {
    setHistory([]);
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
          <Text
            style={[
              styles.result,
              currentValue.startsWith("Помилка") && styles.errorText,
            ]}
          >
            {currentValue}
          </Text>
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

        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Історія</Text>

          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearHistoryText}>Очистити</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.historyList}>
          {history.length === 0 ? (
            <Text style={styles.emptyHistory}>Історія поки порожня</Text>
          ) : (
            history.map((item, index) => (
              <Text key={`${item}-${index}`} style={styles.historyItem}>
                {item}
              </Text>
            ))
          )}
        </ScrollView>
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
    fontSize: 42,
    fontWeight: "700",
    textAlign: "right",
  },
  errorText: {
    color: "#f87171",
    fontSize: 24,
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
    minHeight: 64,
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
    fontSize: 26,
    fontWeight: "600",
  },
  equalsButtonText: {
    color: "#052e16",
  },
  historyHeader: {
    marginTop: 18,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyTitle: {
    color: "#f9fafb",
    fontSize: 18,
    fontWeight: "700",
  },
  clearHistoryText: {
    color: "#93c5fd",
    fontSize: 14,
  },
  historyList: {
    maxHeight: 120,
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 10,
  },
  emptyHistory: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
  },
  historyItem: {
    color: "#d1d5db",
    fontSize: 15,
    marginBottom: 6,
  },
});