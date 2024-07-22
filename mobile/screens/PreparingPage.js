import { View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

const PreparingPage = ({ onAnimationEnd }) => {
  useEffect(() => {
    // Navigate to DeliveryState after animation
    const timeout = setTimeout(onAnimationEnd, 3000);
    return () => clearTimeout(timeout);
  }, [onAnimationEnd]);

  return (
    <SafeAreaView className="bg-white justify-center flex-1 items-center">
      <Animatable.Image 
        source={require("../assets/loader-2_food.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="p-10"
      />
    </SafeAreaView>
  )
}

export default PreparingPage;
