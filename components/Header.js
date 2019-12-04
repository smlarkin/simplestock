import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import StyledText from './StyledText';
import { getCategory } from '../util';

const Header = ({ categories, categoryIndex }) => {
  const category = getCategory(categoryIndex, categories);
  const title = category ? category.title : 'Simple Stock';

  return (
    <View style={styles.container}>
      <StyledText semi numberOfLines={1} style={styles.title}>
        {title}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
});

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
});

export default connect(mapStateToProps)(Header);
