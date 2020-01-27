import React from 'react';
import renderer from 'react-test-renderer';

import DashboardScreen from '../screens/DashboardScreen';

describe('<Dashboard />', () => {
  it('has 1 child', async () => {
    const tree = await renderer.create(<DashboardScreen />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});