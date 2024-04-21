import Header from '../components/HeaderBlack';
import Generate from '../components/Generate';
import TextToSpeech from '../components/TextSpeech';

function Result(props) {
  return (
    <div className="bg-black h-screen">
    <div className='pl-5 pt-5'>
        <Header/>
    </div>
    <div className='px-4 '>

      <Generate submitButton= {props.submitButton}/>

    </div>
    </div>

  );
}

export default Result;
