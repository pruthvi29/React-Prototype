import * as React from 'react';
import SearchSection from '../Components/SearchSection/SearchSection';
import '../Components/SearchSection/SearchSection.css';
// const renderer = require('../../node_modules/react-test-renderer');
import axios from 'axios';
const MockAdapter = require('../../node_modules/axios-mock-adapter');
// const sinon = require('../../node_modules/sinon');
import { shallow } from 'enzyme';

describe('<SearchSection>', () => {
test('Testing Search Section Component', () => {
  const component = shallow(<SearchSection />);
  expect(component.find('div').length > 0).toBe(true);
 
  
 });
 test('Testing Search Section Component Default State', () => {
  
  let props = {};
  let searchSection = new SearchSection(props);
  //console.log(searchSection);
  expect(searchSection.state.showResults).toBe(false);
  expect(searchSection.state.disabled).toBe(false);
  expect(searchSection.state.options.length).toBe(0);
  expect(searchSection.state.filteredData.length).toBe(0);
  expect(searchSection.state.value.length).toBe(0);
 });



 test('Testing Search Section Component Build Auto Suggests Options', () => {
  let props = {};
  let vehicles = [{"_id":"VEHICLES/124408384","UnitIdentifier":"124408384","VIN":"JTMDJREVXH125DZ43","ModelYear":"2017","ModelNumber":"4454","SeriesName":"RAV4 Hybrid","__t":"VEHICLES","_key":"124408384","_updatedAt":"2017-06-28T20:34:27.805+0000"},{"_id":"VEHICLES/124408381","UnitIdentifier":"124408381","VIN":"JTMDJREVXH125DZ41","ModelYear":"2011","ModelNumber":"4451","SeriesName":"RAV4 Hybrid","__t":"VEHICLES","_key":"124408381","_updatedAt":"2017-06-28T20:34:27.805+0000"},{"_id":"VEHICLES/124408382","UnitIdentifier":"124408382","VIN":"JTMDJREVXH125DZ42","ModelYear":"2012","ModelNumber":"4452","SeriesName":"RAV4 Hybrid","__t":"VEHICLES","_key":"124408382","_updatedAt":"2017-06-28T20:34:27.805+0000"},{"_id":"VEHICLES/124408385","UnitIdentifier":"12440835","VIN":"JTMDJREVXH125DZ45","ModelYear":"2015","ModelNumber":"4455","SeriesName":"Camery Hybrid","__t":"VEHICLES","_key":"124408385","_updatedAt":"2017-06-28T20:34:27.805+0000"}];
  let searchSection = new SearchSection(props);
  let mockAdapter = new MockAdapter(axios);
  mockAdapter.onGet('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles').reply(200, vehicles);
  searchSection.componentDidMount();
  searchSection.buildOptions(vehicles);
  expect(searchSection.state.options.length>0).toBe(true);
 });



 
 test('Testing Search Section Component handle change', () => {
   let props = {};
   let value = "Camery Hybrid-4455";
   const wrapper  = shallow(<SearchSection {...props}/>);
   wrapper.instance().handleSelectChange(value);
   expect(wrapper.state().value).toBe(value);
   
 });


 test('Testing Search Section Component search with out search location ', () => {
   let props = {};
   let value = "Camery Hybrid-4472";
   let vehicles = [{"_id":"94569662","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE2124101","UnitIdentifier":"907321158","ModelYear":"2018","Location":"Internal","__v":0},{"_id":"59443949","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE3430467","UnitIdentifier":"388334639","ModelYear":"2018","Location":"Broward County","__v":0},{"_id":"54157334","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE5655677","UnitIdentifier":"911055537","ModelYear":"2018","Location":"Internal","__v":0}];
   const wrapper  = shallow(<SearchSection {...props}/>);
   wrapper.instance().handleSelectChange(value);
   wrapper.instance().search();
   let mockAdapter = new MockAdapter(axios);
   mockAdapter.onGet('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/series/Camry%20Hybrid/model/4472').reply(200, vehicles);
   axios.get('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/series/Camry%20Hybrid/model/4472')
   .then(function(response) {
   wrapper.state().filteredData = response.data;
   expect(wrapper.state().filteredData.length > 0 ).toBe(true);
  });
   
 });


 
 test('Testing Search Section Component search with search location ', () => {
   let props = {};
   let value = "Camery Hybrid-4472";
   let vehicles = [{"_id":"94569662","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE2124101","UnitIdentifier":"907321158","ModelYear":"2018","Location":"Internal","__v":0}
   ,{"_id":"54157334","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE5655677","UnitIdentifier":"911055537","ModelYear":"2018","Location":"Internal","__v":0}];
   const wrapper  = shallow(<SearchSection {...props}/>);
   wrapper.instance().handleSelectChange(value);
   wrapper.instance().checkboxSelected({target:{value:"Internal"}});
   wrapper.instance().search();
   let mockAdapter = new MockAdapter(axios);
   mockAdapter.onGet(' http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/series/Camery Hybrid/model/4472/Internal').reply(200, vehicles);
   axios.get('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/series/Camry%20Hybrid/model/4472/Internal')
   .then(function(response) {
   wrapper.state().filteredData = response.data;
   expect(wrapper.state().filteredData.length > 0 ).toBe(true);
  });
   
 });


 test('Testing Search Section Component Get Vehicles ', () => {
   let props = {};
   let vehicles = [{"_id":"94569662","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE2124101","UnitIdentifier":"907321158","ModelYear":"2018","Location":"Internal","__v":0}
   ,{"_id":"54157334","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE5655677","UnitIdentifier":"911055537","ModelYear":"2018","Location":"Internal","__v":0}];
   const wrapper  = shallow(<SearchSection {...props}/>);
   wrapper.state().filteredData = vehicles;
   let result =  wrapper.instance()._getVehiclesFromApiAsync();
  expect(result.length ).toBe(2);
 });

test('Testing Search Section Component Hamdle Submit ', () => {
   let props = {};
   let event = {preventDefault:function(){

   }}
  let vehicles = [{"_id":"94569662","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE2124101","UnitIdentifier":"907321158","ModelYear":"2018","Location":"Internal","__v":0},{"_id":"59443949","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE3430467","UnitIdentifier":"388334639","ModelYear":"2018","Location":"Broward County","__v":0},{"_id":"54157334","SeriesName":"Camry Hybrid","ModelNumber":"4472","VIN":"JTMDJRE5655677","UnitIdentifier":"911055537","ModelYear":"2018","Location":"Internal","__v":0}];
  
   let value = "Camery Hybrid-4472";
   const wrapper  = shallow(<SearchSection {...props}/>);
  wrapper.instance().handleSelectChange(value);
  wrapper.instance().checkboxSelected({target:{value:''}});
   wrapper.instance()._handleSubmit(event);
  let mockAdapter = new MockAdapter(axios);
   mockAdapter.onGet('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/series/Camry%20Hybrid/model/4472').reply(200, vehicles);
   axios.get('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/series/Camry%20Hybrid/model/4472')
   .then(function(response) {
   wrapper.state().filteredData = response.data;
   expect(wrapper.state().filteredData.length > 0 ).toBe(true);
  });
 }); 

});
