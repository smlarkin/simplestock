import React from 'react';
import { Share, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import FooterIconButton from './FooterIconButton';
import { updateDifferenceAndShopping, formatCategories } from '../util';
import { setCategories, setShopping } from '../redux/actions';

const FooterViewsNav = ({
  categories,
  categoryIndex,
  setCategories,
  setShopping,
  shopping,
}) => {
  function handleOnPressList() {
    updateDifferenceAndShopping(categories, setCategories);
    setShopping(false);
  }

  function handleOnPressCheckSquare() {
    updateDifferenceAndShopping(categories, setCategories);
    setShopping(true);
  }

  function share({ title, message }) {
    Share.share({ title, message })
      .then(result => console.log('shared ', result))
      // SHARED
      // result.action === "sharedAction"
      // SHARED + ACTIVITY TYPE (if available)
      // result.activityType === "com.apple.UIKit.activity.CopyToPasteboard"
      // DISMISSED
      // result.action === "dismissedAction"
      .catch(error => console.error('error ', error));
  }

  function handleOnPressSend() {
    if (categoryIndex !== null && shopping) {
      console.log('share category shopping list');
    } else if (categoryIndex !== null) {
      console.log('share category inventory list');
    } else if (shopping) {
      console.log('share entire shopping list');
    } else {
      console.log('share entire inventory list');
      const title = 'All Inventory';
      const message = formatCategories(categories);
      share({ title, message });
    }
  }
  return (
    <View style={styles.container}>
      <FooterIconButton
        color={null}
        name="list"
        handleOnPress={handleOnPressList}
        size={24}
        visible={true}
      />
      <FooterIconButton
        color={null}
        name="check-square"
        handleOnPress={handleOnPressCheckSquare}
        size={24}
        visible={true}
      />
      <FooterIconButton
        color={null}
        name="send"
        handleOnPress={handleOnPressSend}
        size={24}
        visible={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(setCategories(categories)),
  setShopping: boolean => dispatch(setShopping(boolean)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FooterViewsNav);
