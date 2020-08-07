import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../asserts/images/icons/heart-outline.png';
import unfavoriteIcon from '../../asserts/images/icons/unfavorite.png';
import whasappIcon from '../../asserts/images/icons/whatsapp.png';
import api from '../../services/api';

import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsApp() {
    api.post('connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`"whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');
      
    let favoritesArray = [];

    if(favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if(isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) =>{
        return teacherItem.id === teacher.id;
      });

      favoritesArray.slice(favoriteIndex, 1);
      
      setIsFavorited(false);
    }else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }
    
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar}}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora '{'   '}' 
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}
          >
            {isFavorited 
              ? <Image source={unfavoriteIcon} /> 
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton onPress={handleLinkToWhatsApp} style={styles.contactButton}>
            <Image source={whasappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;