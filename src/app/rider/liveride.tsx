import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRiderStore } from '@/store/riderStore'
import { useWS } from '@/service/WSProvider'
import { useRoute } from '@react-navigation/native'
import * as Location from "expo-location"
import { resetAndNavigate } from '@/utils/Helpers'
import { rideStyles } from '@/styles/rideStyles'
import { StatusBar } from 'expo-status-bar'
import RiderLiveTracking from '@/components/rider/RiderLiveTracking'
import { updateRideStatus } from '@/service/rideService'
import RideActionButton from '@/components/rider/RideActionButton'
import OtpInputModal from '@/components/rider/OtpInputModal'




const LiveRide = () => {

  const [isOptModalVisible, setOptModalVisible] = useState(false)
  const {setLocation, location, setOnDuty} = useRiderStore();
  const {emit, on, off} = useWS()
  const [rideData, setRideData] = useState<any>(null)
  const route = useRoute() as any;
  const params = route?.params || {};
  const id = params.id;

    useEffect(()=>{
      let locationsSubscription : any;
  
      const startLocationUpdates = async () =>{
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status === "granted"){
          locationsSubscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              timeInterval: 5000,
              distanceInterval: 2,
            },
            (location)=>{
              const {latitude, longitude, heading} = location.coords;
              setLocation({
                latitude:latitude,
                longitude:longitude,
                address: "Somewhere",
                heading:heading as number,
              });
              
              setOnDuty(true)

              emit("goOnDuty",{
                latitude: location.coords.latitude,
                longitude:location.coords.longitude,
                heading:heading as number,
              })

              emit("updateLocation",{
                latitude,
                longitude,
                heading,
              });
              console.log(`Location updated Lat ${latitude}, Lon ${longitude}, Heading: ${heading}`)
            }
          );
        } else {
          console.log("Location Permission denied")
        }
      };

      startLocationUpdates();

      return () =>{
        if(locationsSubscription){
          locationsSubscription.remove();
        }
      };
    },[id]);

      useEffect(()=>{
    
        if(id){
          emit('subscribeRide', id)
    
          on('rideData', (data)=>{
            setRideData(data)
          })


          on('rideCanceled', (error)=>{
            console.log("Ride error", error)
            resetAndNavigate('/rider/home')
            Alert.alert('Ride Canceled')
            
          })
    

          on('rideUpdate', (data)=>{
            setRideData(data)
            
          })


          on('error', (error)=>{
            console.log("Ride error", error)
            resetAndNavigate('/rider/home')
            Alert.alert('Oh Dang! There was an error')

          });
    
        }

        
        return () => {
          off('rideData');
          off('error');
        };

      }, [id, emit, off, on] )




  return (
    <View style={rideStyles.container}>
    <StatusBar style='light' backgroundColor='orange' translucent={false} />

     {rideData && (
          <RiderLiveTracking
        
          status={rideData?.status}
          drop={{
            latitude:parseFloat(rideData?.drop.latitude),
            longitude:parseFloat(rideData?.drop.longitude)
    
          }}
          pickup={{
            latitude:parseFloat(rideData?.pickup.latitude),
            longitude:parseFloat(rideData?.pickup.longitude)
    
          }}
          rider={{
            
              latitude: location?.latitude,
              longitude: location?.longitude,
              heading: location?.heading,
          }}
             
          />
         )}

         <RideActionButton 
         ride={rideData}
         title={
          rideData?.status === "START"
          ? "ARRIVED"
          : rideData?.status === "ARRIVED"
          ? "COMPLETED"
          : "SUCCESS"
         }
         onPress={async () => {
          if(rideData?.status === "START"){
            setOptModalVisible(true)
            return
          }
          const isSuccess = await updateRideStatus(rideData?._id, "COMPLETED");
          if(isSuccess){
            Alert.alert("Congratulations! you rock🎉");
            resetAndNavigate("/rider/home");
          }else{
            Alert.alert("There was an error")
          }
         }}
         color="#228B22"
         />

         {isOptModalVisible && (
          <OtpInputModal
          visible={isOptModalVisible}
          onClose={()=> setOptModalVisible(false)}
          title='Error OTP Below'
          onConfirm={async (otp)=>{
            if(otp === rideData?.otp){
              const isSuccess = await updateRideStatus(
                rideData?._id,
                "ARRIVED"
              );
              if(isSuccess){
                setOptModalVisible(false);
              } else{
                Alert.alert("Technical Error");
              }
            } else{
              Alert.alert("Wrong OTP");
            }
          }}
          />
          
         )}
    </View>
  )
}


export default LiveRide