import { useState } from "react"

function App() {
  const [img,setimg] = useState("");
  const[loading,setloading] = useState(false);
  const[qrdata,setqrdata]=useState("");
  const [qrsize,setqrsize]=useState();

 async function Generate(){
    setloading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize ? qrsize : "150"}x${qrsize ? qrsize : "150"}&data=${encodeURIComponent(qrdata)}`;
      setimg(url);
     } 
    //  catch (error){
    //   console.log("Error generating QR code",error);
    // } 
    finally{
       setloading(false);
       
    }

    }
  function downloadqr(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
     const link = document.createElement("a");
     link.href = URL.createObjectURL(blob);
     link.download ="qrcode.jpg";
     document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    })
    // .catch((error) =>{
    //   console.error("Error downloadind or code".error);
    // });

  }
  

  return (
    <div className="app-container">
      <h4>QR CODE GENERATOR</h4>
       {loading &&<p>Please wait...</p>} 
       {img &&<img src={img}  className="qr-code-image"/>}
        <div>
          <label  className="input-label"> QR CODE</label>
          <input type="text"  value={qrdata} id="dataInput" 
           placeholder="Enter data for QR Code" 
          onChange={(event)=>setqrdata(event.target.value)}/>

          <label  className="input-label">
            Image size(e.g.,150);
          </label>
          <input type="text" value={qrsize} id="sizeInput" placeholder="Enter image size" 
          onChange={(event)=>setqrsize(event.target.value)}/>
          
          <button className="button1" disabled={loading} onClick={Generate} >Generate QR Code</button>
          <button className="button2" onClick={downloadqr}>Dowload QR Code</button>
        </div>
    </div>
    
  )
}

export default App
