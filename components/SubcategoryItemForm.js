/* eslint-disable complexity */
import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import StyledText from './StyledText';
import SubcategoryItemUnitPicker from './SubcategoryItemUnitPicker';
import { layout } from '../constants';
import {
  createDifference,
  createShop,
  focusInput,
  formatIntegersForNumericKeypad,
  formatTitleText,
  itemTitleIsDuplicate,
  setRef,
} from '../util';
import {
  deleteSubcategory,
  setEdit,
  updateSubcategory,
} from '../redux/actions';

const SubcategoryItemForm = ({
  categoriesFiltered,
  categoryIndex,
  deleteSubcategory,
  edit,
  index,
  item,
  setEdit,
  updateSubcategory,
}) => {
  const category = categoriesFiltered[categoryIndex];
  const { color } = category;
  const backgroundColor = index % 2 === 0 ? color.primary : color.secondary;
  const [title, setTitle] = useState(item.title);
  const [current, setCurrent] = useState(item.current);
  const [base, setBase] = useState(item.base);
  const [type, setType] = useState(item.type);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const { key } = item;
  const editTypeIsNew = edit.type === 'new';
  const inputs = {};

  useEffect(() => {
    if (!ready) setReady(true);
    else handleOnBlur();
  }, [modalIsVisible]);

  function noInputValues() {
    return !title && !current && !base && !type;
  }

  function allInputValues() {
    return title && current && base && type;
  }

  function noInputFocus() {
    return (
      !modalIsVisible &&
      Object.keys(inputs).every(key => !inputs[key].isFocused())
    );
  }

  function noValuesHaveChanged(difference, shop) {
    return (
      edit.item.title === title &&
      edit.item.current === current &&
      edit.item.base === base &&
      edit.item.type === type &&
      edit.item.difference === difference &&
      edit.item.shop === shop
    );
  }

  function focusOnFirstIncompleteInput() {
    for (let key in inputs) {
      if (!inputs[key].props.value) {
        return inputs[key].focus();
      }
    }
    return false;
  }

  function handleOnBlur() {
    if (noInputFocus()) {
      if (noInputValues()) {
        deleteSubcategory({
          categoryKey: category.key,
          subcategoryKey: edit.item.key,
        });
        setEdit(null);
      } else if (allInputValues()) {
        const difference = createDifference(current, base);
        const shop = createShop(difference);
        const formattedTitle = formatTitleText(title);
        if (noValuesHaveChanged(difference, shop)) {
          setEdit(null);
        } else if (
          edit.item.title.toLowerCase() !== formattedTitle.toLowerCase() &&
          itemTitleIsDuplicate(formattedTitle, category.subcategories)
        ) {
          focusInput('title', inputs);
        } else {
          const subcategory = {
            key,
            title: formattedTitle,
            current,
            base,
            type,
            difference,
            shop,
          };
          updateSubcategory({
            categoryKey: category.key,
            subcategoryKey: edit.item.key,
            subcategory,
          });
          setEdit(null);
        }
      } else {
        setTimeout(() => {
          focusOnFirstIncompleteInput();
        }, 400);
      }
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderWidth: editTypeIsNew ? 1 : null,
          paddingTop: !editTypeIsNew ? '1%' : null,
        },
      ]}>
      <View
        style={[
          styles.titleContainer,
          { marginBottom: edit.type === 'title' ? '1%' : null },
        ]}>
        {editTypeIsNew || edit.type === 'title' ? (
          <TextInput
            autoFocus={editTypeIsNew || edit.type === 'title'}
            blurOnSubmit={false}
            maxLength={42}
            onBlur={handleOnBlur}
            onChangeText={e => setTitle(e)}
            onSubmitEditing={() => {
              current ? Keyboard.dismiss() : focusInput('current', inputs);
            }}
            placeholder="Title & Description"
            ref={ref => setRef(ref, 'title', inputs)}
            returnKeyType="done"
            selectionColor="black"
            style={styles.title}
            value={title}
          />
        ) : (
          <StyledText medium style={styles.title}>
            {title}
          </StyledText>
        )}
      </View>

      <View
        style={[
          styles.currentContainer,
          { marginBottom: edit.type === 'current' ? '1.5%' : null },
        ]}>
        {editTypeIsNew || edit.type === 'current' ? (
          <TextInput
            autoFocus={edit.type === 'current'}
            blurOnSubmit={false}
            keyboardType="numeric"
            maxLength={3}
            onBlur={handleOnBlur}
            onChangeText={e => formatIntegersForNumericKeypad(e, setCurrent)}
            onSubmitEditing={() => {
              base ? Keyboard.dismiss() : focusInput('base', inputs);
            }}
            placeholder="0"
            ref={ref => setRef(ref, 'current', inputs)}
            returnKeyType="done"
            selectionColor="black"
            style={styles.current}
            value={current}
          />
        ) : (
          <StyledText bold style={styles.current}>
            {current}
          </StyledText>
        )}
      </View>

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      <View
        style={[
          styles.baseContainer,
          {
            marginBottom: edit.type === 'base' ? '1.5%' : null,
            marginLeft: edit.type === 'base' ? '1%' : null,
          },
        ]}>
        {editTypeIsNew || edit.type === 'base' ? (
          <TextInput
            autoFocus={edit.type === 'base'}
            blurOnSubmit={false}
            keyboardType="numeric"
            maxLength={3}
            onBlur={handleOnBlur}
            onChangeText={e => formatIntegersForNumericKeypad(e, setBase)}
            onSubmitEditing={() => {
              type ? Keyboard.dismiss() : focusInput('type', inputs);
            }}
            placeholder="0"
            ref={ref => setRef(ref, 'base', inputs)}
            returnKeyType="done"
            selectionColor="black"
            style={styles.base}
            value={base}
          />
        ) : (
          <StyledText bold style={styles.base}>
            {base}
          </StyledText>
        )}
      </View>

      <View
        style={[
          styles.typeContainer,
          { marginBottom: edit.type === 'type' ? '.5%' : null },
        ]}>
        {editTypeIsNew || edit.type === 'type' ? (
          <TextInput
            autoFocus={edit.type === 'type'}
            blurOnSubmit={false}
            maxLength={10}
            onBlur={() => {
              if (!editTypeIsNew) {
                handleOnBlur();
              }
            }}
            onChangeText={e => setType(e)}
            onFocus={() => {
              if (editTypeIsNew) {
                Keyboard.dismiss();
                setModalIsVisible(true);
              }
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            placeholder=" UNIT-TYPE"
            ref={ref => setRef(ref, 'type', inputs)}
            returnKeyType="done"
            selectionColor={edit.type === 'new' ? backgroundColor : 'black'}
            style={styles.type}
            value={type}
          />
        ) : (
          <StyledText demi style={styles.type}>
            {type}
          </StyledText>
        )}

        <Modal
          hasBackdrop={true}
          isVisible={modalIsVisible}
          onBackButtonPress={() => {
            setModalIsVisible(false);
          }}
          onBackdropPress={() => {
            setModalIsVisible(false);
          }}
          style={{
            alignItems: 'center',
            deviceHeight: layout.height,
            deviceWidth: layout.width,
            justifyContent: 'flex-end',
            margin: 0,
          }}>
          <SubcategoryItemUnitPicker
            handleOnPress={() => {
              setModalIsVisible(false);
            }}
            setType={setType}
            type={type}
          />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '4%',
    paddingRight: '1%',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 18,
  },
  currentContainer: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  current: {
    fontSize: 20,
  },
  dividerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0.5%',
    marginTop: '2%',
  },
  divider: {
    fontSize: 40,
  },
  baseContainer: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  base: {
    fontSize: 20,
  },
  typeContainer: {
    alignItems: 'center',
    flex: 1,
  },
  type: {
    fontSize: 10,
  },
});

const mapStateToProps = state => ({
  categoriesFiltered: state.categoriesFiltered,
  categoryIndex: state.categoryIndex,
  edit: state.edit,
});

const mapDispatchToProps = dispatch => ({
  deleteSubcategory: ({ categoryKey, subcategoryKey }) =>
    dispatch(deleteSubcategory({ categoryKey, subcategoryKey })),
  setEdit: (subcategory, option) => dispatch(setEdit(subcategory, option)),
  updateSubcategory: ({ categoryKey, subcategoryKey, subcategory }) =>
    dispatch(updateSubcategory({ categoryKey, subcategoryKey, subcategory })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubcategoryItemForm);
