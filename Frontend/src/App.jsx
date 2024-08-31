import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [downloadPreview, setdownloadPreview] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [loading,setLoading]=useState(false)
  const [timer ,setTimer]=useState(200)

  const handleSubmit = async () => {
    const formdata = new FormData();

    formdata.append("video", file);
    formdata.append("name", 'babu');

    console.log(formdata);
    
    console.log(file);
    
    try {
      if (!file) {
        return;
      }
setLoading(true)
      const res =await axios.post('http://13.210.245.134:4000/video',formdata,{Headers:{
        'Content-Type':"multipart/form-data"
      },withCreadentials:true})

      console.log(res.data.BASE_URL);
      setdownloadPreview(res.data.BASE_URL)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handledownload=async(e)=>{
console.log(e);

   if (downloadPreview) {
    
    const link = document.createElement('a')
    link.href=downloadPreview;
    link.download='video.mp4'

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link);
   }

    
  }
  const handleVideoFile = async (e) => {
    const file = e.target.files[0];
    setFileSize((file.size / (1024 * 1024)).toFixed(2));
    setFile(file);
    const videoPreview = URL.createObjectURL(file);

    setPreview(videoPreview);
  };
  console.log(fileSize + " MP");

  return (
    <>
      <div className="flex flex-col p-10 justify-start h-full w-full items-center ">
        <input
          type="file"
          accept="video/*"
          className="outline-none"
          onChange={(e) => {
            handleVideoFile(e);
          }}
        />
        {preview && (
          <div className="h-48 w-full gap-8 mt-5 h-fit flex justify-center items-center ">
            <video className="w-48 " src={preview} controls muted playsInline></video>
            <button
          type="button"
          onClick={handleSubmit}
          className="py-1 h-fit w-fit px-2 bg-blue-500 rounded "
        >
          {" "}
          {downloadPreview ? 'Compressed':"compress"}
        </button>
         {  downloadPreview && (
          <div className="h-fit w-80 mt-5 ">
            <video className="w-48 " src={downloadPreview} controls muted playsInline></video>

            {/* <a href={downloadPreview} download={'downloaded_video.mp4'}  className="py-1 h-fit w-fit px-2 bg-blue-500 rounded "> <i class="fa-solid fa-cloud-arrow-down"></i> Download </a> */}
            <p> this Video Wil be Deleted in 2 minutes</p>
          </div>
        )}
          </div>
        )}

       
        {loading&& <p>loading</p>
          
        }
       
      </div>
    </>
  );
}

export default App;
