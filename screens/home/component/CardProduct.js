/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width - 32;

const CardProduct = ({
  index,
  ofs,
  newItem,
  image,
  rating,
  name,
  price,
  off,
  maxRatings,
}) => {
  const RenderStars = ({stars}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        {maxRatings.map((item, idx) => {
          return (
            <View key={idx} style={{marginHorizontal: 2}}>
              {item <= stars ? (
                <Image
                  style={{width: 10, height: 10}}
                  source={require('../../assets/star.png')}
                />
              ) : (
                <Image
                  style={{width: 10, height: 10}}
                  source={require('../../assets/star-outline.png')}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View key={index} style={styles.container}>
      <View style={styles.paddingCard}>
        <View style={styles.flexRow}>
          <View>
            {ofs && (
              <View style={styles.ofs}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: 12,
                  }}>
                  Out of Stock
                </Text>
              </View>
            )}
            {newItem && <Text style={styles.new}>New</Text>}
          </View>
          <TouchableOpacity style={styles.iconLove}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/heart.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image style={{width: 115, height: 115}} source={{uri: image}} />
        </View>
        <RenderStars stars={rating} />
        <Text style={styles.titleCardProduct}>{name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.off}>{off}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 6,
    backgroundColor: '#ffffff',
    elevation: 4,
    borderRadius: 8,
  },
  paddingCard: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  ofs: {
    backgroundColor: '#F04C4D',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  new: {color: '#131313', fontWeight: '700', fontSize: 12},
  iconLove: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
  },
  price: {color: '#131313', fontWeight: '700', fontSize: 16},
  off: {color: '#A0A0BD', fontWeight: '700', fontSize: 12},
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleCardProduct: {
    fontWeight: '500',
    color: '#83838D',
    fontSize: 14,
  },
});

export default CardProduct;
