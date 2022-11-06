import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';

import logoImg from '../../assets/logo-nlw-esports.png';

import { THEME } from "../../theme";
import { styles } from './styles';

import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { DuoMatch } from '../../DuoMatch';
import { api } from '../../services/api';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('alex_cndd#0506');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    api.get(`/games/${game.id}/ads`).then((response) => {
      setDuos(response.data);
    })
  }, [])
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>


          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading 
          title={game.title}
          subtitle='Conecte-se e comece a jogar'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => {}}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent ]}
          showsHorizontalScrollIndicator
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          }
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}