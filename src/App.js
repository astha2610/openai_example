import { h } from 'preact';
import { useState } from "preact/hooks";

import { formatDate } from './utils';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchObj, setSearchObj] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

	const onInputChange = (e) => {
		setInputValue(e.target.value);
	}

  const getRecommendations = (data) => {
    const rcoms = JSON.parse(JSON.stringify(data.recommendation[0]));
    const rcomsToDisplay = rcoms.slice(0, 3);
    setRecommendations(rcomsToDisplay);
  }

  const fetchFlights = (obj) => {
    const { srciata = '', desiata = '', dep = '' } = obj;
    fetch(`https://thor.goibibo.com/search/?f=v2&cu=INR&lob=B2C&src=GI&c=false&l=en-IN&stream=false&q=air-${srciata}-${desiata}-${dep}--1-0-0-E-R`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data);
        getRecommendations(data);
      });
  }

  const processResponse = (resp) => {
    const obj = {};
    const arr = resp.choices[0].text.split('\n');
    arr.map((item) => {
      if (item) {
        item = item.toLowerCase();
        const itemArr = item.split(':');
        if (itemArr.length) {
          switch(itemArr[0]) {
            case 'source':
              obj.src = itemArr[1].trim().toUpperCase();
              break;
            case 'source airport code':
              obj.srciata = itemArr[1].trim().toUpperCase();
              break;
            case 'destination':
              obj.des = itemArr[1].trim().toUpperCase();
              break;
            case 'destination airport code':
              obj.desiata = itemArr[1].trim().toUpperCase();
              break;
            case 'departure':
              obj.dep = formatDate(itemArr[1]);
              break;
            case 'arrival':
              obj.arr = formatDate(itemArr[1]);
              break;
            default:
              break;
          }
        }
      }
    });
    setSearchObj(obj);
    fetchFlights(obj);
  }

  const onSubmit = () => {
    setSearchObj({});
    setSearchResult(null);
    setRecommendations([]);
    fetch(`/createcompletion/?text=${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        processResponse(data);
      });
  }
  
  return (
    <div>
      <div class="header">
        <span>GI OPENAI</span>
      </div>
      <div class="container">
        <textarea type="text" rows="4" placeholder="Enter text here..." value={inputValue} onInput={onInputChange} />
        <div class="buttonWrapper">
          <button onClick={onSubmit}>Submit</button>
        </div>
        {(Object.keys(searchObj).length && <div class="searchDetail">
          <div>Source: {searchObj.src} ({searchObj.srciata})</div>
          <div>Destination: {searchObj.des} ({searchObj.desiata})</div>
          <div>Departure: {searchObj.dep}</div>
        </div>) || null}
        {(recommendations && <div class="flightContainer">
          {recommendations.map((rcom) => {
            return <div class="flightCard" key={rcom.id}>
              <div>{rcom.alTxt}</div>
              <div class="dF">
                <div class="flex4">
                  <div class="flightCardRow">
                    <div class="flex1">{rcom.s}</div>
                    <div class="flex1">{rcom.d}</div>
                  </div>
                  <div class="flightCardRow">
                    <div class="flex1">{rcom.dt}</div>
                    <div class="flex1">{rcom.at}</div>
                  </div>
                  <div>{rcom.du} ({rcom.ns})</div>
                </div>
                <div class="flex1 fb">
                  {rcom.dp}
                </div>
              </div>
            </div>
          })}
        </div>)}
      </div>
    </div>
  )
}
