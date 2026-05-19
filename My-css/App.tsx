import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, Platform, Image, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const products = [
  { name: 'Pão de Frango', emoji: '🍗' },
  { name: 'Hambúrguer', emoji: '🍔' },
  { name: 'Empadão', emoji: '🥟' },
  { name: 'Pizza de Frango', emoji: '🍕' },
  { name: 'Pizza Calabresa', emoji: '🍕' },
];

function ProductCard({ name, emoji }: { name: string; emoji: string }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.imageFrame}>
        <Text style={styles.productEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.productName}>{name}</Text>
    </Pressable>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 3000);
    return () => clearTimeout(timer);
  }, [fadeAnim]);

  if (showSplash) {
    return (
      <Animated.View style={[styles.splash, { opacity: fadeAnim }]}>
        <StatusBar style="light" />
        <Image
          source={require('./assets/logo.png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.logoIcon}>🍔</Text>
        <Text style={styles.logoText}>Vini Lanches</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.row}>
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={i} name={p.name} emoji={p.emoji} />
          ))}
        </View>
        <View style={styles.rowCentered}>
          {products.slice(3).map((p, i) => (
            <ProductCard key={i} name={p.name} emoji={p.emoji} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#02203F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 400,
    height: 400,
  },
  container: {
    flex: 1,
    backgroundColor: '#ECE7DA',
  },
  header: {
    backgroundColor: '#002147',
    paddingTop: Platform.OS === 'web' ? 60 : 80,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 72,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F2B84B',
    fontFamily: 'Arial',
    marginTop: 4,
    letterSpacing: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    width: 200,
  },
  cardPressed: {
    opacity: 0.85,
  },
  imageFrame: {
    width: 200,
    height: 200,
    borderWidth: 6,
    borderColor: '#F2B84B',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  productEmoji: {
    fontSize: 80,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    fontFamily: 'Arial',
    marginTop: 12,
    textAlign: 'center',
  },
});
