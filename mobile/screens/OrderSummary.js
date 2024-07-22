import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserAddress from '../components/UserAddress'
import { useDispatch, useSelector } from 'react-redux'
import { select_basket_item, select_basket_total } from '../redux/basketSlice'
import Subtotal from '../components/Subtotal'
import CancelButton from '../components/CancelButton'
import PaymentBar from '../components/PaymentBar'
import { selectRestaurant } from '../redux/restaurantSlice'
import { createOrder } from '../services/order'
import { useAuth } from '../hooks/useAuth'
import PreparingPage from './PreparingPage'
import ModalComponent from '../components/ModalComponent'

const OrderSummary = () => {
  const items = useSelector(select_basket_item)
  const total_basket = useSelector(select_basket_total)
  const restaurant = useSelector(selectRestaurant)
  const { user } = useAuth()
  const dispatch = useDispatch()

  const [groupItemsBasket, setGroupItemsBasket] = useState([])
  const [additionalRequest, setAdditionalRequest] = useState('')
  const [driverRequest, setDriverRequest] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPreparing, setShowPreparing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => { 
    const grouped_items = items.reduce((results, items) => { 
      (results[items.id] = results[items.id] || []).push(items);
      return results
    }, {} );
    setGroupItemsBasket(grouped_items);
  }, [items])

  const handleOrder = async () => {
    setLoading(true);
    const orderData = {
      customer: user._id,
      restaurant: items[0].restaurant_id,
      items: items.map(item => ({
        menuItemId: item.id,
        name: item.name,
        quantity: 1,
        price: item.price
      })),
      totalAmount: total_basket,
      delivery: {
        address: user.address,
        phone_number: user.phone_number,
        steps: [
          { name: "Preparation", duration: 10 },
          { name: "Cooking", duration: 20 },
          { name: "Packaging", duration: 5 },
          { name: "Out for Delivery", duration: 30 }
        ]
      },
      additionalRequest: additionalRequest,
      driverRequest: driverRequest
    };

    try {
      const response = await createOrder(orderData);
      // Handle successful order creation
      setOrderSuccess(true);
    } catch (error) {
      // Handle order creation error
      setOrderSuccess(false);
    } finally {
      setLoading(false);
      setShowPreparing(true);
    }
  }

  const handleAnimationEnd = () => {
    setShowPreparing(false);
    setShowModal(true);
  };

  return (
    <>
      {showPreparing ? (
        <PreparingPage onAnimationEnd={handleAnimationEnd} />
      ) : (
        <ScrollView className="bg-white min-h-white">
          <SafeAreaView className="pt-16 px-5 pb-[200px]">
            <View>
              <View className="flex flex-row justify-center">
                <View className="absolute left-1">
                    <CancelButton />
                </View>
                <View className="relative top-4">
                    <UserAddress user={user} />
                </View>
              </View>

              <View className="mt-5">
                <Text className="text-left font-medium text-3xl">Order Summary</Text>
                <View className="border-y border-gray-300/80 my-2 rounded"/>
              </View>

              <View className="flex flex-row space-x-6 items-start mt-3">
                  <Image 
                    source={{ uri: restaurant?.profile_pic }}
                    className="h-[86px] w-[91px] rounded-lg mb-1"
                  />
                <View className="space-y-1">
                  <Text className="text-xl font-medium text-left">{restaurant?.name}</Text>
                  <Text>{restaurant?.address}</Text>
                </View>
              </View>
            </View>

            <Text className="text-left font-semibold text-xl mt-2">Your Order</Text>
            <View className="border-y border-gray-300/80 my-2 rounded"/>
            <ScrollView className="divide-y divide-gray-200">
              {Object.entries(groupItemsBasket).map(([key, items]) => (
                <View className="flex flex-row justify-between items-center mt-4" key={key}>
                  <View className="flex flex-row space-x-4 items-center">
                    <Text className="text-left font-medium text-base">{items.length}x</Text>
                    
                    <Image 
                      source={{ uri: items[0]?.image }}
                      className="h-[74px] w-[75px] rounded-lg"
                    />

                    <View className="space-y-1">
                      <Text className="text-left font-medium text-base">{items[0]?.name}</Text>
                      <Text>Chicken & Sauces</Text>
                    </View>
                  </View>
                  <Text className="text-lg font-medium text-left">
                    {items[0]?.price}
                  </Text>
                </View>
              ))}
            </ScrollView>

            
            <View className="border-y border-gray-300/80 my-4 rounded"/>
            <View className="mt-3">
              <View>
                <Text className="font-medium text-lg text-left">Cost Summary</Text>
                <Subtotal
                  subtotal={Math.floor(total_basket)}
                  discount={Math.floor(items[0]?.price/4)}
                  shipping_fee={Math.floor(items[0]?.price/4)}
                  total={Math.floor(total_basket + (items[0]?.price/4) + (items[0]?.price/4))}
                  items={items.length}
                />
              </View>
              <Text className="font-medium text-lg text-left mt-3">Payment Method</Text>
              <TouchableOpacity className="mt-4">
                <View className="rounded-xl bg-[#f3f3f3] h-[64px]">
                  <View className="flex flex-row space-x-3 justify-between items-center px-5 py-3">
                      <View className="items-center flex flex-row space-x-3">
                        <Image source={{ uri: "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png" }}
                          className="h-[40px] w-[40px] mr-2"/>
                        <Text className="text-xl font-medium text-left">Apple Pay</Text>
                      </View>
                    
                  </View>
                </View>
              </TouchableOpacity>
              <View className="border-y border-gray-300/80 my-4 rounded"/>

             
            </View>
            <Text className="text-left font-bold text-sm mt-11">Additional Requirements to the driver:</Text>
              <View className="flex py-4 h-[125px] justify-between flex-row rounded-xl bg-[#f3f3f3] px-2 mt-4">
                <View className="items-center flex flex-row space-x-1 relative left-1">
                  <TextInput 
                    style={{ outlineStyle: 'none' }}
                    underlineColorAndroid={'transparent'}
                    textAlign='left'
                    textBreakStrategy='balanced'
                    multiline={true}
                    className=" font-normal  h-[125px] w-[395px] scrollbar-hide md:scrollbar-default"
                    placeholder='Add Special Request Here!'
                    value={driverRequest}
                    onChangeText={setDriverRequest}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={handleOrder} className="mt-8 w-full py-3 bg-[#d9d9d9] rounded-lg flex justify-center items-center">
                <Text className="text-xl font-medium">{loading ? "Processing..." : "Place Order"}</Text>
              </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      )}
      <ModalComponent
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={orderSuccess ? "Order Confirmed!" : "Order Failed"}
        description={orderSuccess ? "Your order has been placed successfully." : "There was an issue placing your order. Please try again."}
        success={orderSuccess}
      />
    </>
  )
}

export default OrderSummary;
