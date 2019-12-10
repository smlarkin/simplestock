import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import HeaderShareForm from './HeaderShareForm';
import IconButton from './IconButton';
import StyledText from './StyledText';
import { layout } from '../constants';
import { setSharing } from '../redux/actions';

const Header = ({
  categories,
  categoryIndex,
  editing,
  setSharing,
  sharing,
  shopping,
}) => {
  const currentCategories = shopping ? shopping.categories : categories;
  const currentCategory =
    categoryIndex !== null ? currentCategories[categoryIndex] : null;
  const title = currentCategory ? currentCategory.title : 'Simple Stock';

  function handleOnPressArrowup() {
    if (!editing) {
      setSharing(true);
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        // TODO: Use local state for this
        // TODO: Remove sharing from redux
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
        <HeaderShareForm
          {...{
            editing,
            categories,
            categoryIndex,
            setSharing,
            shopping,
          }}
        />
      </Modal>
      <IconButton
        active={true}
        color="black"
        name="questioncircleo"
        handleOnPress={null}
        size={20}
      />
      <StyledText semi numberOfLines={1} style={styles.title}>
        {title}
      </StyledText>
      <IconButton
        active={categories.length}
        color="black"
        name="arrowup"
        handleOnPress={handleOnPressArrowup}
        size={20}
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
  title: {
    color: 'black',
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  editing: state.editing,
  sharing: state.sharing,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  setSharing: boolean => dispatch(setSharing(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
