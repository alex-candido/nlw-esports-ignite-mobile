import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { api } from '../../services/api';

import { styles } from './styles';

export function Home() {
  const [games, setgames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    api.get('/games').then((response) => {
      setgames(response.data);
    })
  }, [])

  return (
    <Background>
      <SafeAreaView  style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard 
            data={item}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
        
      </SafeAreaView >
    </Background>
  );
}