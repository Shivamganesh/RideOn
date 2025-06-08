import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUserStore } from '@/store/userStore'
import { useWS } from '@/service/WSProvider'
import { uiStyles } from '@/styles/uiStyles'
import { logout } from '@/service/authService'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@/utils/Constants'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'
import CustomText from '../shared/CustomText'

const LocationBar = () => {

    const {location} = useUserStore()
    const {disconnect} = useWS()


  return (
    <View style={uiStyles.absoluteTop}>
      <SafeAreaView />
      <View style={uiStyles.container}>
        <TouchableOpacity style={uiStyles.btn} onPress={() => logout(disconnect)}>
            <AntDesign name="logout" size={RFValue(12)} color={Colors.text} />

        </TouchableOpacity>

        <TouchableOpacity style={uiStyles.locationBar}
        onPress={()=> router.navigate('/customer/selectlocations')}
        >
            <View style={uiStyles.dot}>
                <CustomText numberOfLines={1} style={uiStyles.locationText}>
                    {location?.address || "Getting address..."}
                </CustomText>

            </View>

        </TouchableOpacity>

      </View>
    </View>
  )
}

export default LocationBar