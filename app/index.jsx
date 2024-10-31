import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableHighlight, Vibration, StatusBar } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Calculator() {
  // State variables
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Handle button presses
  const handlePress = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear the input and result
  const handleClear = () => {
    setInput('');
    setResult('');
    setHistory('');
    Vibration.vibrate(200);
  };

  // Calculate the result from the input
  const handleCalculate = () => {
    try {
      const calculatedResult = Function(`'use strict'; return (${input})`)();
      setResult(calculatedResult);
      setHistory((prev) => [...prev, `${input} = ${calculatedResult}`]);
      // Vibrate the phone for 200 milliseconds
      Vibration.vibrate(100);
    } catch {
      setResult('Error❌');
    }
  };

  // Calculate square root of the input
  const handleSquareRoot = () => {
    const calculatedResult = Math.sqrt(parseFloat(input)).toFixed(2);
    setResult(calculatedResult);
    setInput('');
    setHistory((prev) => [...prev, `√${input} = ${calculatedResult}`]);
  };
  

  // Calculate percentage of the input
  const handlePercentage = () => {
    const calculatedResult = parseFloat(input) / 100;
    setResult(calculatedResult);
    setInput('');
    setHistory((prev) => [...prev, `${input}% = ${calculatedResult}`]);
  };

  // Toggle history visibility
  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  // Render a button
  const renderButton = (value, bgColor, onPress) => (
    <TouchableHighlight
      className={`rounded-full w-[66px] min-w-16 max-w-20 h-16 min-h-16 max-h-20 ${bgColor} flex items-center justify-center m-2`}
      onPress={onPress}>
      <Text className="text-4xl font-bold text-white">{value}</Text>
      {/* Text-6xl w-20 h-20 */}
    </TouchableHighlight>
  );

  //Tab Bar
  <StatusBar/>
  return (
    <View className="flex-1 justify-center bg-gray-900 p-2">
      {/* Display area */}
      <View className="h-1/3 border-2 rounded-2xl p-4 bg-gray-800">
        <Text className="text-right text-7xl text-white">{input ? input : 0}</Text>
        <Text className="text-right text-7xl text-white pt-9">{result ? result :0}</Text>
      </View>

      {/* Buttons area */}
      <ScrollView className="flex-1 mt-3">
        <View className="flex-row flex-wrap justify-center">
          {renderButton('C', 'bg-red-600', handleClear)}
          {renderButton('√', 'bg-green-600', handleSquareRoot)}
          {renderButton('%', 'bg-green-600', handlePercentage)}
          {renderButton('÷', 'bg-green-600', () => handlePress('/'))}

          {renderButton('1', 'bg-slate-800', () => handlePress('1'))}
          {renderButton('2', 'bg-slate-800', () => handlePress('2'))}
          {renderButton('3', 'bg-slate-800', () => handlePress('3'))}
          {renderButton('x', 'bg-blue-600', () => handlePress('*'))}

          {renderButton('4', 'bg-slate-800', () => handlePress('4'))}
          {renderButton('5', 'bg-slate-800', () => handlePress('5'))}
          {renderButton('6', 'bg-slate-800', () => handlePress('6'))}
          {renderButton('+', 'bg-blue-600', () => handlePress('+'))}

          {renderButton('7', 'bg-slate-800', () => handlePress('7'))}
          {renderButton('8', 'bg-slate-800', () => handlePress('8'))}
          {renderButton('9', 'bg-slate-800', () => handlePress('9'))}
          {renderButton('-', 'bg-blue-600', () => handlePress('-'))}

          {renderButton(<FontAwesome5 name="history" size={39} color="black" />, 'bg-yellow-500', toggleHistory)}
          {renderButton('0', 'bg-slate-800', () => handlePress('0'))}
          {renderButton('.', 'bg-slate-800', () => handlePress('.'))}
          {renderButton('=', 'bg-blue-600', handleCalculate)}
        </View>
      </ScrollView>
    </View>
  );
}

