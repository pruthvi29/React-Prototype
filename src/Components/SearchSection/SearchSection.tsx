import * as React from 'react';
import './SearchSection.css';
import axios from 'axios';
import scroll from 'react-scroll';
let scroll = require('react-scroll/modules/mixins/animate-scroll');
let Select = require('./ReactSelect');
// let data = require('./demo.json');
import './ReactSelect/dist/react-select.css';

// let data = require('./demo.json');
let vehicles: any[];
let searchedVehicles: any[];
let options = [];
let selectedCheckbox = '';


class SearchSection extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: '',
      usrSrch: '',
      showResults: false,
      disabled: false,
      options: options,
      filteredData: [],
      value: []
    };
    this._getVehiclesFromApiAsync = this._getVehiclesFromApiAsync.bind(this)
    //this.handleScroll = this.handleScroll.bind(this);

  }

  handleSelectChange(value){
    this.setState({value});
  }

  

  componentDidMount() {
    let self = this;
    axios.get('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles')
        .then(function (response) {
        vehicles = response.data;
        //vehicles = data;
        
        setTimeout(function(){ 
          self.buildOptions(vehicles);
        },350);
       

      })
      .catch(function (error) {

      });

  }
  
   buildOptions(vehicles) {
    let self = this;
    let optionsDataWithDuplicates: any[];
    let optionsDataWithOutDuplicates: any[];
    optionsDataWithDuplicates = [];
    optionsDataWithOutDuplicates = [];
    vehicles.forEach(function (item, index) {
      //let series = { 'label': 'SERIES: ' + item["SeriesName"] + '-' + item["ModelNumber"].toString(), 'value': item["SeriesName"] + ',' + item["ModelNumber"].toString() };
      let series = { 'label': item["SeriesName"]+'-'+item["ModelNumber"], 'value': item["SeriesName"]+'-'+item["ModelNumber"] };
      optionsDataWithDuplicates.push(series);
    });
    optionsDataWithOutDuplicates = this.removeDuplicates(optionsDataWithDuplicates, "label");
    const options = optionsDataWithOutDuplicates;
    self.state.options = options;
    setTimeout(function(){
    self.setState({options});
    self.forceUpdate();
    },350);

  }

  removeDuplicates(arr, key) {
    /* if (!(arr instanceof Array) || key && typeof key !== 'string') {
         return false;
     }*/

    if (key && typeof key === 'string') {
      return arr.filter((obj, index, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
      });

    } else {
      return arr.filter(function (item, index, arr) {
        return arr.indexOf(item) === index;
      });
    }
  }
  _getVehiclesFromApiAsync() {
    let self = this;
    return self.state.filteredData.map((vehicle) => {
      return <div key={vehicle._id} className="resultFlex">
            <div className="resultFlexSection leftfs">
            <p><b>VIN:</b> <b className="HgNum">{vehicle.VIN}</b></p>
            <p><b>Series:</b> {vehicle.SeriesName}</p>
            <p><b>Model Number:</b> <b className="HgNum">{vehicle.ModelNumber}</b></p>
            </div>
            <div className="resultFlexSection rightfs">
            <p><b className="tagHide">Location: </b>{vehicle.Location}</p>
            </div>
            <div className="resultFlexSection">
            <p><b className="tagHide">Model Year: </b>{vehicle.ModelYear}</p>
            </div>
            <div className="resultFlexSection rightfs">
            <p><b className="tagHide">Unit Indentifier: </b>{vehicle.UnitIdentifier}</p>
            </div>
            </div>
    });  
  }


  async search() {

    let self = this;
    let searchData = (this.state.value.length !== 0) ? this.state.value.split("-") : this.state.value;
    let url = 'http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/';
    if (searchData.length > 0) {
    if(searchData.length > 0){
      url += 'series/'+searchData[0];
    }
    if(searchData.length > 1){
      url += '/model/'+searchData[1];
    }
    if(selectedCheckbox !== ''){
      url += '/'+selectedCheckbox;
    }
    console.log(url);
    await axios.get(url)
      .then(function (response) {
        self.state.filteredData = response.data;
        console.log(response.data)
      }).catch(function (error) {});
    } 

  }

  checkboxSelected(event){
     selectedCheckbox = event.target.value;
  }

  selectClick(event){
    //const fieldInput = this.refs.fieldInput;
    //event.preventDefault();
    event.stopPropagation();
  }
  _handleSubmit(event) {
    event.preventDefault();
     let self = this;
     this.search()
      setTimeout(function(){
        searchedVehicles = self._getVehiclesFromApiAsync();
        self.state.showResults = true;
        self.forceUpdate();
      },1000);  
  }
  handleChange(event) {
    if (event.target.value === '') {
      //this.state.showResults = false;
    }
    this.setState({ usrSrch: event.target.value });

  }

  scrollTo() {
    scroll.scrollTo(470);
  }

  render() {

    let boxClass = [".modifier hide"];
    let noRecordClass = ["hide"];
    if (this.state.showResults) {
      boxClass.push('show');
    } else {
      if (boxClass[2] !== undefined && boxClass[2] === 'show') {
        boxClass.pop();
      }

    }
    if (searchedVehicles !== undefined && searchedVehicles.length === 0) {
      noRecordClass.pop();
    }
    return (
      <div className="contentMargin">
        <form onSubmit={this._handleSubmit.bind(this)}>
          <div className="SearchSection pt-align-left">
            <h5>Search Vehicle Details:</h5>
            <div onClick={this.selectClick.bind(this)}>
            <Select ref='fieldInput' autoBlur={true} onMouseDown={this.state.open = false} multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Hint: Series, Model" options={this.state.options}  onChange={this.handleSelectChange.bind(this)} />
</div>

            <br />
            <br />
            <h5>Search Location:</h5>
            <div className="SearchLocation LocationFiter ">
              <label className="pt-control pt-checkbox pt-inline .modifier">
                <input type="checkbox" value="Internal" onChange={this.checkboxSelected.bind(this)} />
                <span className="pt-control-indicator" />
                Internal
</label>
              <label className="pt-control pt-checkbox pt-inline .modifier">
                <input type="checkbox" value="External" onChange={this.checkboxSelected.bind(this)} />
                <span className="pt-control-indicator" />
                External
</label>
              <label className="pt-control pt-checkbox pt-inline .modifier">
                <input type="checkbox" value="District 1" onChange={this.checkboxSelected.bind(this)} />
                <span className="pt-control-indicator" />
                District 1
</label>
              <label className="pt-control pt-checkbox pt-inline .modifier">
                <input type="checkbox" value="Broward County" onChange={this.checkboxSelected.bind(this)} />
                <span className="pt-control-indicator" />
                Broward County
</label>
              <label className="pt-control pt-checkbox pt-inline .modifier">
                <input type="checkbox" value="District 3" onChange={this.checkboxSelected.bind(this)} />
                <span className="pt-control-indicator" />
                District 3
</label>
            </div>
            <br />
            <br />
            <button type="submit" onClick={this.scrollTo} className="pt-button pt-intent-primary">Search</button>
            <br />
            <br />
            <br />
            <div className={boxClass.join(' ')}>
            <div className="SearchedVehicle">
            <div className="resultFlex BgHead">
            <div className="resultFlexSection leftfs">
            <p><b>Vehicle ID</b></p>
            </div>
            <div className="resultFlexSection rightfs">
            <p><b>Location</b></p>
            </div>
            <div className="resultFlexSection">
            <p><b>Model Year</b></p>
            </div>
            <div className="resultFlexSection rightfs">
            <p><b>Unit Identifier</b></p>
            </div>
            </div>
            {searchedVehicles}
            </div>
            </div>
              <div className={noRecordClass.join(' ')}>
                <p className="noRecords">No Record Found</p>
              </div>
            
          </div>
        </form>

      </div>
    );
  }
}


export default SearchSection;