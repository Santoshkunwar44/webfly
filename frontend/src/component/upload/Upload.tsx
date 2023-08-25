import  { ChangeEvent, SyntheticEvent, useRef ,useState} from 'react'
import {BsFillCloudCheckFill} from "react-icons/bs"
import styles from "./upload.module.css"
import {HiOutlineClipboardCopy} from "react-icons/hi"
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Upload = () => {


    const fileRef = useRef<HTMLInputElement|null>(null);
    const [file,setFile]  =useState<File|null>(null);
    const [result,setResult] =useState<string|null>(null)
    const [previewSource, setPreviewSource] = useState<any>(null);



    const handleOpen=()=>{
        if(fileRef.current)
        fileRef.current?.click()
    }
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setPreviewSource(null)
      setResult(null)
      setFile(null)

        if(e.target.files){
            setFile(e.target.files[0])
            previewFile(e.target.files[0])
        }

    }

     const previewFile = (file:File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          let base64Encoded = reader.result;
          if(base64Encoded){
            setPreviewSource(base64Encoded);
          }
        };
    };


    const handleSubmit=(e:SyntheticEvent)=>{

      e.preventDefault();
      e.stopPropagation();


      if(!file)return;

      const reader:FileReader = new FileReader ();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        let url = reader.result;
        if(url){
          uploadImage(url);
        }
      }
      reader.onerror=()=>{
        console.log("some error while reading file");
      }



    }


    const uploadImage=async(base64EncodedImage:string|ArrayBuffer)=>{
    let fileType= file?.type.split("/")[0];
    let fileExt = file?.type.split("/")[1];
    let url ;
   
    const timeoutDuration = 600000; // 10 minutes in milliseconds

    const controller = new AbortController();
       setTimeout(() => {
      controller.abort();
      }   , timeoutDuration);

    if(fileType?.toLowerCase()==="video"){
      url = "http://localhost:8000/api/upload/video"
    }else{
      url = "http://localhost:8000/api/upload/image"
    }
     try {
          const res =   await fetch(url, {
                method: 'POST',
                  signal: controller.signal,
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
                
            });
            const data = await res.json()
            if(res.status===200){
              setResult(data.message)
            }
          
          
      
        } catch (err) {
            console.error(err);
      
        }
 
    }




  return (
     <div className={styles.card_container} >

      <div className={styles.Card} onClick={handleOpen}>
        <div className={styles.draggable} > 
        {
         file ? <>
         <BsFillCloudCheckFill size={"48"} /> 
         <p className={styles.draggable_second_text}>{`${file.name} ${Math.floor(file.size/1024)}MB`}</p>
         </>
          :   <>
        <img className={styles.heapfileImg} src="/images/heap.png" alt="hieap" width={"130px"} />
         <h3 className={styles.drag_here_text}>Drag image file  here</h3>
         <p className={`${styles.drag_here_text} ${styles.second_text}`}>  click to browse (4 MB max)</p>
         </>
        }

        <input type="file" style={{display:"none"}}  ref={fileRef} onChange={handleChange} />
        </div>
 
        
      
     
   
      
  <button className={styles.create_variation_button} onClick={handleSubmit} > UPLOAD  </button> 
        
   {
    result &&  <CopyToClipboard  text={result}>
      
       <button  onClick={(e)=>e.stopPropagation()} className={styles.copy_url}>
      <p className={styles.url_text}>{result}</p>
      <HiOutlineClipboardCopy/>
    </button>
      </CopyToClipboard>
  } 
      {
        file && <img  className={styles.previewImg} height={"300px"} src={URL.createObjectURL(file)} alt="" />
      } 
      
      </div>
    

</div>
  )
}

export default Upload