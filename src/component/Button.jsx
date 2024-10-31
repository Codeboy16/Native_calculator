import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = (props) => {
  return (
<TouchableOpacity className="rounded-full w-20 h-20 bg-slate-800 flex justify-items-center justify-center m-2">
  <Text className="text-6xl font-bold text-white text-center">{props.val}</Text>
</TouchableOpacity>
  )
}

export default Button