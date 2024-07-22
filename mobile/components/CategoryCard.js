import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCard = ({ img, title, selected, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="relative mr-6">
        <View 
          className={`w-[84px] h-[106px] ${selected ? 'bg-black': 'bg-[#e4e4e4]'} rounded-[39px] flex justify-start items-center`}>
            <View 
               style={{
                shadowColor: "black",
                shadowOpacity: 0.25,
                shadowOffset: {
                  width: 0,
                  height: 4,
                  },
                shadowRadius: 4
              }}
              className="w-[50px] h-[50px] items-center flex justify-center bg-white shadow-gray-800 rounded-full mt-2 flex-row">
              <Text className="text-4xl relative bottom-1">{img}</Text>
            </View>
            <Text className={`mt-2 ${selected ? 'text-white': 'text-[#292929]'} font-semibold text-base flex-shrink`}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CategoryCard
