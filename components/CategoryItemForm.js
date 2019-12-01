import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../constants';
import { deleteCategory, setEdit, updateCategory } from '../redux/actions';
import {
  focusInput,
  formatTitleText,
  itemTitleIsDuplicate,
  setRef,
} from '../util';

const CategoryItemForm = ({
  categories,
  deleteCategory,
  edit,
  item,
  setEdit,
  updateCategory,
}) => {
  const { backgrounds } = colors;
  const [title, setTitle] = useState(item.title);
  const [color, setColor] = useState(item.color);
  const { key, subcategories } = item;
  const inputs = {};

  function handleOnBlur() {
    const currentFocus =
      inputs.title.isFocused() ||
      backgrounds.find(({ primary }) => inputs[primary].isFocused());

    if (!currentFocus) {
      handleOnSubmitEditing();
    } else if (typeof currentFocus === 'object') {
      setColor(currentFocus);
      focusInput('title', inputs);
    }
  }

  function handleOnSubmitEditing() {
    if (title) {
      const formattedTitle = formatTitleText(title);
      if (
        edit.item.title === title &&
        edit.item.color.primary === color.primary
      ) {
        setEdit(null);
      } else if (
        edit.item.title.toLowerCase() !== formattedTitle.toLowerCase() &&
        itemTitleIsDuplicate(title, categories)
      ) {
        focusInput('title', inputs);
      } else {
        updateCategory({
          categoryKey: edit.item.key,
          category: { color, key, title: formattedTitle, subcategories },
        });
        setEdit(null);
      }
    } else {
      setEdit(null);
      deleteCategory(edit.item.key);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { backgroundColor: color.primary }]}>
        <TextInput
          autoFocus={true}
          blurOnSubmit={true}
          maxLength={26}
          onBlur={handleOnBlur}
          onChangeText={e => setTitle(e)}
          placeholder="Category Title"
          ref={ref => setRef(ref, 'title', inputs)}
          returnKeyType="done"
          selectionColor="black"
          style={styles.title}
          value={title}
        />
      </View>

      <View style={styles.colorTilesContainer}>
        {backgrounds.map(colorTile => (
          <TouchableOpacity
            key={colorTile.primary}
            style={[
              styles.colorTile,
              { backgroundColor: colorTile.primary },
              {
                borderWidth: color.primary === colorTile.primary ? 1 : null,
              },
            ]}>
            <TextInput
              blurOnSubmit={true}
              maxLength={0}
              onBlur={handleOnBlur}
              ref={ref => setRef(ref, colorTile.primary, inputs)}
              returnKeyType="done"
              selectionColor={colorTile.primary}
              style={styles.colorTileInput}
              value={null}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: '0.25%',
    marginTop: '0.25%',
  },
  titleContainer: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '5%',
    paddingRight: '5%',
    width: '100%',
  },
  title: {
    fontSize: 19,
  },
  colorTilesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  colorTile: {
    aspectRatio: 1 / 1,
    borderRadius: 2.5,
    flex: 1,
    margin: '1%',
  },
  colorTileInput: {
    flex: 1,
    fontSize: 1,
  },
});

const mapStateToProps = state => ({
  categories: state.categories,
  edit: state.edit,
});

const mapDispatchToProps = dispatch => ({
  deleteCategory: categoryKey => dispatch(deleteCategory(categoryKey)),
  setEdit: item => dispatch(setEdit(item)),
  updateCategory: category => dispatch(updateCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemForm);
