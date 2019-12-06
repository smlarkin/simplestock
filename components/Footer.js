import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import IconButton from './IconButton';
import FooterShareForm from './FooterShareForm';
import { colors, layout } from '../constants';
import { selectCategory, updateDifferenceAndShopping } from '../util';
import {
  createCategory,
  createSubcategory,
  setEdit,
  setCategories,
  setCategoryIndex,
  setSharing,
  setShopping,
} from '../redux/actions';

const FooterViewsNav = ({
  categories,
  categoriesFiltered,
  categoryIndex,
  createCategory,
  createSubcategory,
  edit,
  setEdit,
  setCategories,
  setCategoryIndex,
  setSharing,
  setShopping,
  sharing,
  shopping,
}) => {
  const category = selectCategory(categoryIndex, categoriesFiltered);

  function handleOnPressHome() {
    if (!edit) {
      updateDifferenceAndShopping(categories, setCategories);
      setCategoryIndex(null);
    }
  }

  function handleOnPressToggleShopping() {
    if (!edit) {
      setShopping(!shopping);
    }
  }

  function handleOnPressUpload() {
    if (!edit) {
      setSharing(true);
    }
  }

  function handleOnPressPlus() {
    if (!edit && !shopping) {
      if (category) {
        const subcategory = {
          key: uuid(),
          title: '',
          current: '',
          base: '',
          difference: 0,
          shop: false,
        };
        const categoryKey = category.key;
        createSubcategory({ categoryKey, subcategory });
        setEdit(subcategory, 'new');
      } else {
        const category = {
          color: colors.backgrounds[0],
          key: uuid(),
          title: '',
          subcategories: [],
        };
        createCategory(category);
        setEdit(category);
      }
    }
  }

  useEffect(() => {
    if (!categories.length) {
      setShopping(false);
    }
  }, [categories]);

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
        active={categories.length && categoryIndex === null}
        activeOpacity={1}
        color="black"
        name={shopping ? 'checksquareo' : 'bars'}
        handleOnPress={handleOnPressToggleShopping}
        size={24}
      />
      <IconButton
        active={true}
        color="black"
        name={!shopping ? 'plus' : 'upload'}
        handleOnLongPress={handleOnPressUpload}
        handleOnPress={!shopping ? handleOnPressPlus : handleOnPressUpload}
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
          {...{
            edit,
            categories,
            categoriesFiltered,
            category,
            categoryIndex,
            setSharing,
            shopping,
          }}
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
  categoriesFiltered: state.categoriesFiltered,
  categoryIndex: state.categoryIndex,
  sharing: state.sharing,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  createCategory: category => dispatch(createCategory(category)),
  createSubcategory: ({ categoryKey, subcategory }) =>
    dispatch(createSubcategory({ categoryKey, subcategory })),
  setEdit: (item, type) => dispatch(setEdit(item, type)),
  setCategories: categories => dispatch(setCategories(categories)),
  setCategoryIndex: index => dispatch(setCategoryIndex(index)),
  setSharing: boolean => dispatch(setSharing(boolean)),
  setShopping: boolean => dispatch(setShopping(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterViewsNav);
