import * as React from 'react';
import Header from '../Components/Header/Header';
  import '../Components/Header/Header.css';
const renderer = require('../../node_modules/react-test-renderer');
test('Testing Header Component', () => {
  const component = renderer.create(
    <Header></Header>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
 });