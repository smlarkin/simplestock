import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import StatusBarSpacer from './StatusBarSpacer'
import Header from './Header'
import HeaderPaginator from './HeaderPaginator'
import Body from './Body'
import Footer from './Footer'

const AppScreen = ({ categories, categoryIndex }) => (
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    {Platform.OS === 'ios' && <StatusBarSpacer />}
    <Header />
    {categoryIndex !== null && categories.length > 1 && <HeaderPaginator />}
    <Body />
    <Footer />
  </KeyboardAvoidingView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
})

export default connect(mapStateToProps)(AppScreen)
