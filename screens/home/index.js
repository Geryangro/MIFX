/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardProduct from './component/CardProduct';
import axios from 'axios';

const baseUrl = 'https://fe.dev.dxtr.asia/api';

const HomeScreen = () => {
  //   const {signOut} = useContext(AuthContext);
  const [tokenUser, setUserToken] = useState(null);
  const [dataCategory, setCategory] = useState([]);
  const [dataProduct, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxRatings] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('usertoken');
        setUserToken(token);
        global.token = token;
      } catch (err) {
        console.log(err);
      }
    };

    fetchToken();
  }, []);

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    const authStr = 'Bearer ' + global.token;
    try {
      const res = await axios.get(`${baseUrl}/products`, {
        headers: {Authorization: authStr},
      });
      setProduct(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('An error has occurred');
      setIsLoading(false);
    }
  }, []);

  const fetchCategory = useCallback(async () => {
    setIsLoading(true);
    const authStr = 'Bearer ' + global.token;
    try {
      const res = await axios.get(`${baseUrl}/category`, {
        headers: {Authorization: authStr},
      });
      setCategory(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('An error has occurred');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tokenUser) {
      fetchCategory();
      fetchProduct();
    }
  }, [fetchCategory, fetchProduct, tokenUser]);

  const RenderHeader = () => {
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}>
          {dataCategory.map(item => {
            return (
              <View key={item.id}>
                <RenderTabsFilter name={item.name} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const RenderTabsFilter = ({name}) => {
    return (
      <View style={[styles.tabsFilter, {marginBottom: 20}]}>
        <Text style={styles.tabsName}>{name}</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <CardProduct
        index={index}
        ofs={item.out_of_stock}
        newItem={item.new}
        image={item.image}
        rating={item.rating}
        name={item.name}
        price={item.price}
        off={item.off}
        maxRatings={maxRatings}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
        <View style={[styles.flexRow]}>
          <View style={[styles.flexRow]}>
            <TouchableOpacity style={[styles.backButton, {marginRight: 10}]}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/left-arrow.png')}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Shoes</Text>
          </View>
          <TouchableOpacity style={styles.backButton}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/filter.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <RenderHeader />
      <FlatList
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{
          marginHorizontal: 14,
          paddingHorizontal: 4,
          paddingVertical: 8,
        }}
        ItemSeparatorComponent={() => <View style={{marginVertical: 10}} />}
        showsVerticalScrollIndicator={false}
        data={dataProduct}
        renderItem={renderItem}
      />

      {/* <TouchableOpacity
        onPress={() => signOut()}
        style={{
          padding: 20,
          borderWidth: 1,
          borderColor: '#131313',
          borderRadius: 12,
          marginTop: 15,
        }}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    color: '#131313',
    fontWeight: '800',
  },
  tabsName: {
    fontWeight: '500',
    color: '#131313',
    fontSize: 14,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabsFilter: {
    marginRight: 12,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    elevation: 1,
  },
});

export default HomeScreen;
