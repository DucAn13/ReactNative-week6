import { Text, View, Pressable, Image,SafeAreaView, FlatList, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';

const Item=({name,shop,image,price,numberOfRate,discount})=>{
  return(
    <Pressable
      style={{
        height:155,
        width:155,
        borderColor:'gray'
      }}
    >
      <Image source={{uri:image}} style={{width:155,height:90}}/>
      <View
        style={{
          width:160,
          height:74,
          marginStart:10,
          marginTop:5
        }}
      >
        <Text
          style={{
            fontSize:12,
            fontWeight:400,
            lineHeight:14.06
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            marginTop:5,
            marginBottom:5
          }}
        >
          <View
            style={{
              flexDirection:'row',
              alignItems:'center'
            }}
          >
            <AntDesign name="star" size={13} color="yellow" />
            <AntDesign name="star" size={13} color="yellow" />
            <AntDesign name="star" size={13} color="yellow" />
            <AntDesign name="star" size={13} color="yellow" />
            <AntDesign name="star" size={13} color="gray" />
          </View>
          <Text
            style={{
              fontSize:10
            }}
          >
            ({numberOfRate})
          </Text>
        </View>
        <View
          style={{
            flexDirection:'row',
            alignItems:'center'
          }}
        >
          <Text
            style={{
              fontSize:12,
              fontWeight:700
            }}
          >
            {price} đ
          </Text>
          <Text
            style={{
              fontSize:12,
              color: '#969DAA',
              marginStart:20
            }}
          >
            -{discount}%
          </Text>
        </View>
      </View>
    </Pressable>
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
          <View
            style={{
              flexDirection:'row',
              alignItems:'center'
            }}
          >
            <Pressable>
              <AntDesign name="arrowleft" size={24} color="white" />
            </Pressable>
            <View
              style={{
              position:'relative'
            }}
            >
            <Pressable>
              <AntDesign name="search1" size={26} color="black" style={{position:'absolute', left:15, paddingStart:10, paddingEnd:5}}/>
            </Pressable>
              <TextInput 
                style={{
                  width:192,
                  height:30,
                  backgroundColor:'white',
                  marginStart:15,
                  paddingStart:50
                }}
                placeholder={'Nhập sản phẩm'}
                placeholderTextColor={'gray'}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection:'row'
            }}
          >
            <Pressable
              style={{
                marginEnd:30,
                position:'relative'
              }}
            >
              <MaterialCommunityIcons name="cart-check" size={24} color="white" />
              <View
                style={{
                  position:'absolute',
                  backgroundColor:'red',
                  width:13,
                  height:13,
                  borderRadius:100,
                  right:-5,
                  top:-5
                }}
              ></View>
            </Pressable>
            <Pressable>
              <Entypo name="dots-three-horizontal" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View
          id='body'
          style={{
            flex:1,
            backgroundColor:'white'
          }}
        >
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item name={item.name} shop={item.shop} image={item.image} numberOfRate={item.numberOfRate} price={item.price} discount={item.discount}/>}
            keyExtractor={item => item.id}
            numColumns={2}
            style={{
              marginTop:20
            }}
            columnWrapperStyle={{
              justifyContent: 'space-around',
              marginBottom: 20
            }}
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