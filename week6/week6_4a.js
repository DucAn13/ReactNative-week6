import { Text, View, Pressable, Image,SafeAreaView, FlatList } from 'react-native';
import * as React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

  
const Item=({name,shop,image})=>{
  return(
    <View
      style={{
        flexDirection:'row',
        height:74,
        width:360,
        borderWidth:1,
        borderColor:'gray',
      }}
    >
      <Image source={{uri:image}} style={{width:74,height:74}}/>
      <View
        style={{
          width:160,
          height:74,
          marginStart:10
        }}
      >
        <Text
          style={{
            
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color:'red',
            fontSize:18,
            marginTop:5
          }}
        >
          <span style={{color:'gray'}}>Shop</span> {shop}
        </Text>
      </View>
      <View
        style={{
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Pressable
          style={{
            width:88,
            height:38,
            backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Text
            style={{
              color:'white',
              fontSize:18
            }}
          >
            Chat
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default function App(){
  let [DATA,changeDATA]=React.useState([])

  React.useEffect(()=>{
    fetch('https://66f5f9eb436827ced975948f.mockapi.io/api/v1/item')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
          changeDATA(data);
        })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  },[])

  return(
    <SafeAreaView>
      <View
        style={{
          width:361,
          height:653,
          backgroundColor:'green'
        }}
      >
        <View
          id='header'
          style={{
            height:42,
            backgroundColor: '#1BA9FF',
            padding:10,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}
        >
          <Pressable>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
          <Text
            style={{
              color:'white',
              fontSize:16
            }}
          >
            Chat
          </Text>
          <Pressable>
            <MaterialCommunityIcons name="cart-check" size={24} color="white" />
          </Pressable>
        </View>
        <View
          id='body'
          style={{
            flex:1,
            backgroundColor:'#d9d9d9'
          }}
        >
          <Text
            style={{
              padding:10,
              paddingHorizontal:20
            }}
          >
            Bạn có thắc mắc với sản phẩm vừa xem đừng ngại chát với shop!
          </Text>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item name={item.name} shop={item.shop} image={item.image}/>}
            keyExtractor={item => item.id}
          />
        </View>
        <View
          id='footer'
          style={{
            width:360,
            height:49,
            backgroundColor: '#1BA9FF',
            padding:10,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}
        >
          <Pressable
          >
            <EvilIcons name="navicon" size={28} color="black" />
          </Pressable>
          <Pressable
          >
            <MaterialCommunityIcons name="home-outline" size={28} color="black" />
          </Pressable>
          <Pressable
          >
            <Fontisto name="arrow-return-left" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}