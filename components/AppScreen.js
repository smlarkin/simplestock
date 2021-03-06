import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import StatusBarSpacer from './StatusBarSpacer';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

// TODO: Investigate if I should add SafeAreaView around KeyboardAvoidingView
// TODO: Change sizing for this ???
const AppScreen = () => (
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <StatusBarSpacer />
    <Header />
    <Body />
    <Footer />
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppScreen;
