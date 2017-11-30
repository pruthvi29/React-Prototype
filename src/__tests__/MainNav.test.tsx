import * as React from 'react';
import MainNav from '../Components/MainNav/MainNav';
import '../Components/MainNav/MainNav.css';
const renderer = require('../../node_modules/react-test-renderer');
test('Testing Main Nav Component', () => {
  const component = renderer.create(
    <MainNav></MainNav>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
 });