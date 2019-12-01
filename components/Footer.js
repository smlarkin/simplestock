import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import FooterIconButton from './FooterIconButton';
import FooterShareForm from './FooterShareForm';
import { layout } from '../constants';
import { updateDifferenceAndShopping } from '../util';
import { setCategories, setSharing, setShopping } from '../redux/actions';

const FooterViewsNav = ({
  categories,
  categoryIndex,
  edit,
  setCategories,
  setSharing,
  setShopping,
  sharing,
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

  function handleOnPressSend() {
    if (!edit) {
      setSharing(true);
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
  setSharing: boolean => dispatch(setSharing(boolean)),
  setShopping: boolean => dispatch(setShopping(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterViewsNav);
