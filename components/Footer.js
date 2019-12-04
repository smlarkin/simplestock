import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import IconButton from './IconButton';
import FooterShareForm from './FooterShareForm';
import { layout } from '../constants';
import { updateDifferenceAndShopping } from '../util';
import {
  setCategories,
  setCategoryIndex,
  setSharing,
  setShopping,
} from '../redux/actions';

const FooterViewsNav = ({
  categories,
  categoryIndex,
  edit,
  setCategories,
  setCategoryIndex,
  setSharing,
  setShopping,
  sharing,
  shopping,
}) => {
  function handleOnPressHome() {
    if (!edit) {
      setCategoryIndex(null);
    }
  }

  function handleOnPressToggleShopping() {
    updateDifferenceAndShopping(categories, setCategories);
    setShopping(!shopping);
  }

  function handleOnPressUpload() {
    if (!edit) {
      setSharing(true);
    }
  }
  return (
    <View style={styles.container}>
      <IconButton
        active={categoryIndex !== null}
        color="black"
        name="home"
        handleOnPress={handleOnPressHome}
        size={24}
      />
      <IconButton
        active={true}
        activeOpacity={1}
        color="black"
        name={shopping ? 'checksquareo' : 'bars'}
        handleOnPress={handleOnPressToggleShopping}
        size={24}
      />
      <IconButton
        active={true}
        color="black"
        name="upload"
        handleOnPress={handleOnPressUpload}
        size={24}
      />
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        isVisible={sharing}
        hasBackdrop={true}
        onBackButtonPress={() => {
          setSharing(false);
        }}
        onBackdropPress={() => {
          setSharing(false);
        }}
        style={{
          alignItems: 'center',
          deviceHeight: layout.height,
          deviceWidth: layout.width,
          justifyContent: 'flex-start',
          margin: 0,
        }}>
        <FooterShareForm
          {...{ edit, categories, categoryIndex, setSharing, shopping }}
        />
      </Modal>
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
  edit: state.edit,
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  sharing: state.sharing,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(setCategories(categories)),
  setCategoryIndex: index => dispatch(setCategoryIndex(index)),
  setSharing: boolean => dispatch(setSharing(boolean)),
  setShopping: boolean => dispatch(setShopping(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterViewsNav);
