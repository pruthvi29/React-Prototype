import * as React from 'react';
import App from '../App';
import '../App.css';
const renderer = require('../../node_modules/react-test-renderer');
test('Testing App Component', () => {
  const component = renderer.create(
    <App></App>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
 });