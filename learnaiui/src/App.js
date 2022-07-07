import React, { 
  useState, 
  useEffect } from 'react';
import './App.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function App() {
  const [ formData, setFormData ] = useState({});
  const [ data, setData ] = useState();
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isAdd, setIsAdd ] = useState(false);


  const pyGetAll = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: { 
        "Accept": "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": 'POST, PUT, DELETE, GET, OPTIONS',
      }
    };
    fetch("http://localhost:5000", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setData( result );
      }
      )
      .catch(error => console.log('error', error));
  }

  const edit = (index) => {
    let change = data.filter((val) => val[0]===index );
    console.log( change[0] )
    var [ indx, sentence, language, sentiment, ] = change[0];
    formData['sentence'] = sentence;
    formData['sentiment'] = sentiment;
    formData['index'] = index;
    formData['language'] = language;
    // console.log( indx, sentence, sentiment )
    // console.log( formData )
    setIsEdit(true)
  }

  const pyUpdate = async () => {
    console.log( formData )
    var [ index, sentence, sentiment, language ] = [formData['index'],formData['sentence'],formData['sentiment'], formData['language'] ];
    console.log( index, sentence, sentiment, language )
    if( sentence && sentence.length > 0 && sentiment && language ) {
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify( {'id':index,'sentence':sentence, 'sentiment':sentiment, 'language':language} );

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("http://localhost:5000/edit/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      setFormData({})
      setIsEdit(false)
    } 
    else {
      alert("Please Provide Data");
    }
  }

  // post data
  const pyPost = async () => {
    console.log( formData )
    var [sentence,sentiment,language]=[formData['sentence'],formData['sentiment'],formData['language'] ];
    console.log( sentence, sentiment, language )

    if( sentence && sentence.length > 0 && sentiment && language ) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify( {'sentence':sentence, 'sentiment':sentiment, 'language':language} );

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("http://localhost:5000/add/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      setFormData({})
      setIsAdd(false)
    } 
    else {
      alert("Please Provide Data");
    }
  }



  useEffect(() => {

    pyGetAll()
  },[])



  return (
    <div className="App">
      
      <h1 >ACTIVE LEARNING UI</h1>

      <div className='addbtn' >
        <button onClick={() => { setFormData({}); setIsAdd(true) }} > <b> Add New Data </b> </button> </div>

      {/* show data */}
      <div className='items' >
        {
          data && data.length > 0 && data.map((val, index ) => (
            <div className='item' key={index} >
              <div className='itemInput' >
                <textarea disabled={true} value={val[1]} onChange={(e) => "" } />
              </div>
              <div className='meta' >
                <div className='label' >
                  { val[2] == 1 ? "Positve" : val[2] == -1 ? "Negative" : "Neutral" }
                </div>

                <div className='lastChangedDate' > Last Changed { val[4] } </div>

                <div className='lang' >
                  { val[3] == 0 ? "English" : val[3]==1 ? "Setswana" : val[3]==2?"Sepedi" : "No Target Language" } 
                </div>

                <div > <button onClick={() => edit(val[0]) } > Edit </button> </div>

              </div>
            </div>
          ))
        }
      </div>


      {/* edit data */}
      {
        isEdit && <div className='editContainer' >
          <h1 > Update Data </h1>

            <div className='editItem' >
              <button onClick={() => setIsEdit(false) } > Close | Cancel </button> <hr />

              <div className='editItemInput' >
                <textarea  value={ formData['sentence'] } 
                  onChange={e=>setFormData({...formData,"sentence":e.target.value }) } />
              </div>
              <div className='itemSelectContainer' >
                <div >
                  <select value={formData['sentiment']} >
                    <option value={"-1"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Negative</option>
                    <option value={"1"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Positive</option>
                    <option value={"0"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Neutral</option>
                    {/* new labels */}
                    <option value={"2"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Not Sentiment</option>
                    <option value={"3"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Mix Sentiment</option>
                    {/* <option value={"0"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Neutral</option> */}
                  </select>
                </div>

                <div >
                  <select value={formData['language'] } >
                    <option value={"1"} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >Setswana</option>

                    <option value={"2"} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >Sepedi</option>

                    <option value={"0"} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >English</option>

                    <option value={"3"} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >No target Language</option>
                    
                  </select>
                </div>
              </div>

              <hr />
              <div className='' > <button onClick={() => pyUpdate() } > Save Changes </button> </div>
            </div>
        </div>
      }

      {/* add new data */}
      { 
        isAdd && <div className='editContainer' >
          <h1 > Add New Data </h1>

            <div className='editItem' >
              <button onClick={() => setIsAdd(false) } > Close | Cancel </button> <hr />

              <div className='editItemInput' >
                <textarea  value={ formData['sentence'] } 
                  onChange={e=>setFormData({...formData,"sentence":e.target.value }) } />
              </div>
              <div className='itemSelectContainer' >
                <div >
                  <select value={formData['sentiment']} >
                    <option value={-1} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Negative</option>
                    <option value={1} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Positive</option>
                    <option value={0} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Neutral</option>
                    {/* new labels */}
                    <option value={2} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Not Sentiment</option>
                    <option value={3} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Mix Sentiment</option>
                  </select>
                </div>
                <div >
                  <select value={formData['language'] } >
                    <option value={1} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >Setswana</option>
                    <option value={2} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >Sepedi</option>
                    <option value={0} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >English</option>
                    <option value={3} onClick={ e => setFormData({ ...formData, "language": e.target.value }) } >No target Language</option>
                    
                  </select>
                </div>

                <div > <button onClick={() => pyPost() } > <b>Save New Data</b> </button> </div>
              </div>
            </div>
        </div>
      }


    </div>
  );
}

export default App;



// curl -i -X GET -H 'Accept: application/json' -H 'Content-type: application/json' http://localhost:3000/

// // node js
// async function getAll() {
//   var requestOptions = {
//     method: 'GET', // mode: 'no-cors',
//     redirect: 'follow',
//     headers: { 
//       "Accept": "application/json",
//     }
//   };
//   await fetch("http://localhost:4000/", requestOptions)
//     .then(response =>   response.json() )
//     .then(result => {
//       setData(result.message) 
//       console.log(result.message.length ) 
//     })
//     .catch(error => console.log('error', error));
// }


  // const all = async () => {
  //   var requestOptions = {
  //     method: 'GET',
  //     mode: "no-cors",
  //     redirect: 'follow'
  //   };
  //   // const v = 
  //   await fetch("http://127.0.0.1:8000/api/add?a=2&b=3", requestOptions)
  //     .then(response => {return response.json()} )
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }




// ADD DATA
// const pyEdit = async ( index ) => {
//   let change = data.filter((val) => val[0]===index );
//   // console.log( change[0][0] )
//   var [ indx, sentence, sentiment ] = change[0]
//   console.log( indx, sentence, sentiment )
  // if( sentence && sentence.length > 0 && sentiment ) {
    
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify( {'description':sentence, 'salary':sentiment} );

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // await fetch("http://localhost:5000/incomes/", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  // }
  // else {
  //   alert("Please Provide Data");
  // }
// }






{/* <div > */}
{/* { 
  data && [1,1,1,1].map((v, k) => (
  <div key={k} >
    here
  </div> 
  )) 
} */}
{/* </div> */}

{/* <div className='formContainer' >
<div >
  <input onChange={ e => setFormData({ ...formData, "sentence": e.target.value }) } />
</div>
<div >
  <select >
    <option value={"-1"} onClick={ e => setFormData({ ...formData, "label": e.target.value }) } >Negative</option>

    <option value={"1"} onClick={ e => setFormData({ ...formData, "label": e.target.value }) } >Positive</option>
    <option value={"3"} onClick={ e => setFormData({ ...formData, "label": e.target.value }) } >Mix</option>
    <option value={"0"} onClick={ e => setFormData({ ...formData, "label": e.target.value }) } >Neutral</option>
    <option value={"2"} onClick={ e => setFormData({ ...formData, "label": e.target.value }) } >Mo Sentiment</option>
  </select>
</div>
<div >
  <button onClick={ e => sendData() } >
    Send
  </button>
</div>
</div> */}












{/* <div className='items' >
  {
    data && data.length > 0 && data.map((val, index ) => (
      <div className='item' key={index} >
        <div className='itemInput' >
          <textarea  value={ formData['sentence'] ? formData['sentence'] : val[1] } 
            onChange={e=>setFormData({...formData,"sentence":e.target.value }) } />
        </div>
        <div className='itemSelectContainer' >
          <div >
          <select value={val[2]} >
            <option value={"-1"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Negative</option>
            <option value={"1"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Positive</option>
            <option value={"0"} onClick={ e => setFormData({ ...formData, "sentiment": e.target.value }) } >Neutral</option>
          </select>
          </div>

          <div > Last Changed { val[3] } </div>

          <div > <button onClick={() => edit( val[0] ) } > Edit </button> </div>
        </div>
      </div>
    ))
  }
</div> */}