import { StyleSheet, Text, View } from 'react-native';
import i18n from './i18n';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{i18n.t('greeting')}</Text>
      <Text>{i18n.t('welcome')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
