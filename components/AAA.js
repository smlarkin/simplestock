import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, FlatList } from 'react-native'
import ContactItem from './Pages/widgets/ContactItem' // https://github.com/garrettmac/react-native-pagination/blob/master/ReactNativePaginationExample/Pages/widgets/ContactItem.js
import faker from 'faker' //assuming you have this.
import _ from 'lodash'
import Pagination, { Icon, Dot } from 'react-native-pagination' //{Icon,Dot} also available

//lets use faker to create mock data
let MockPersonList = new _.times(35, i => {
  return {
    id: i,
    index: i,
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
    group: _.sample(['Family', 'Friend', 'Acquaintance', 'Other']),
    email: faker.internet.email(),
  }
})

export default class ReactNativePaginationExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: MockPersonList,
    }
  }
  //create each list item
  _renderItem = ({ item }) => {
    return (
      <ContactItem
        index={item.id}
        onPressItem={this.onPressItem}
        name={item.name}
        avatar={item.avatar}
        description={item.email}
        tag={item.group}
        createTagColor
      />
    )
  }
  //pressed an item
  onPressItem = item => console.log('onPressItem:item ', item)

  //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id.toString()

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) =>
    this.setState({ viewableItems })

  render() {
    return (
      <View style={[s.container]}>
        <FlatList
          data={this.state.items}
          ref={r => (this.refs = r)} //create refrence point to enable scrolling
          keyExtractor={this._keyExtractor} //map your keys to whatever unique ids the have (mine is a "id" prop)
          renderItem={this._renderItem} //render each item
          onViewableItemsChanged={this.onViewableItemsChanged} //need this
        />

        <Pagination
          // dotThemeLight //<--use with backgroundColor:"grey"
          listRef={this.refs} //to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
          paginationVisibleItems={this.state.viewableItems} //needs to track what the user sees
          paginationItems={this.state.items} //pass the same list as data
          paginationItemPadSize={3} //num of items to pad above and below your visable items
        />
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"grey",//<-- use with "dotThemeLight"
  },
})

AppRegistry.registerComponent('ReactNativePaginationExample', () => App)
