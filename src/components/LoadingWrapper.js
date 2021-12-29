// We're adding a file so we can show a spinner just about anywhere

import React from 'react';
import { observer } from 'mobx-react';
import { View, ActivityIndicator } from 'react-native';

export default observer(function LoadingWrapper({ isLoading, children }) {
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <View style={{ flex: 1 }}>{children}</View>;
});