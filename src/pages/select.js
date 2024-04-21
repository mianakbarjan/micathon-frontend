import Header from "../components/HeaderBlack";
import { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";


function Select(props){
   
    const colors = ["Colour", "Human Emotions","Vicinity", "Text"]; // Assuming you want "purple" instead of "yellow"

    const [selected,setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    const handleClick = (color) => {
        if(selected.includes(color)){
            const newSelected = selected.filter(element => element !== color)
            setSelected(newSelected);
            props.setOptions(newSelected);
        }
        else{
        const newOptions = [...selected, color]; // Create a copy and add new color
        props.setOptions(newOptions);
        setSelected(newOptions); 
        }
      };
    
    let include_colour = false;
    let include_surrounding = false;
    let include_emotion = false;
    let include_text = false;
    
      function handleSubmit(){
        for (const item of selected) {
            include_colour = include_colour || item === "Colour"; // Check for "include_colour"
            include_surrounding = include_surrounding || item === "Vicinity"; // Check for "include_surrounding"
            include_emotion = include_emotion || item === "Human Emotions"; // Check for "include_large" (already present in selected)
            include_text = include_text || item === "Text"; // Check for "include_text"
          }
        const base64String = props.imageBase64.split(',')[1];
        const data = {
          imageData: base64String,
          include_colour: include_colour,
          include_surrounding:include_surrounding,
          include_emotion:include_emotion,
          include_text:include_text
        }
        setIsLoading(true);
        axios.post('https://mianakbarjan.pythonanywhere.com/api/openAIVision', {imageData:data }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        props.setsubmitButton(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      }

    return (
        <div>
            {isLoading ? (
        <Spinner />
      ) : (
            <div className="bg-black text-white h-screen">
                <div className="pl-5 pr-5 pt-5">
                <div className="flex flex-col gap-8">
                    <Header/>
                    <div>
                        <h1 className="mb-2">1. Image</h1>
                        <img className="flex max-h-[229px]" src={props.imageBase64} alt="" />
                    </div>
                    <div >
                        <h1 className="mb-2">2. ADDITIONAL  (OPTIONAL)</h1>
                        <div className="flex text-black items-center justify-center ">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {colors.map((color) => (
                                  <button
                                  key={color}
                                  onClick={() => handleClick(color)}
                                  className={`bg-white py-2 border rounded-md ${selected.includes(color) ? 'opacity-50' : ''}`}
                                >
                                  <h1 className="font-semibold">{color}</h1>
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div onClick={handleSubmit} className="flex py-3 mx-5 rounded-xl items-center justify-center bg-white">
                        <h1 className="text-4xl text-black font-extrabold">Submit</h1>
                    </div>
                </div>
                </div>
            </div>)}
        </div>
    )
}

export default Select;