import * as React from 'react';
import SecNav from '../Components/SecNav/SecNav';
import '../Components/SecNav/SecNav.css';
const renderer = require('../../node_modules/react-test-renderer');

describe('<AdvocateNames />', () => {
test('Testing Sec Nav Component', () => {
  const component = renderer.create(
    <SecNav></SecNav>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
 });
});