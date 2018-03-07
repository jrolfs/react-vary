import React from 'react';
import renderer from 'react-test-renderer';

import UserProfileWithVariants, { UserProfile } from '../example/UserProfile';

test('ReactVary adheres to the API', () => {
  const component = renderer.create(
    <div>
        <UserProfileWithVariants variant={0} />
        <UserProfileWithVariants variant={1} foo={'red'}/>
        <UserProfileWithVariants variant={2} />
      </div>,
  );
  let tree = component.toJSON();

  expect(UserProfile.variants[1]).toEqual(expect.any(Function));
  expect(UserProfile.variants[2]).toEqual(expect.any(Function));

  expect(tree).toMatchSnapshot();
});