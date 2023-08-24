import { useEffect, useRef } from "react"


const UploadWidget = () => {

    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>()


    useEffect(()=>{
        cloudinaryRef.current = window?.cloudinary
        if(cloudinaryRef.current)
      widgetRef.current =    cloudinaryRef.current.createUploadWidget({
            cloudName:"onlinecoder",
            uploadPreset:"sharefile"

        },function(error:any,result:any){
            console.log(result)
            if(error){
                console.log(error)
                return error;
            }
            if(result.info.files){

                if(result.info.files[0].uploadInfo.done){
                    console.log(result.info.files[0].uploadInfo.secure_url)
                }
            }

            
        })
    },[])

  return (
    <div>
        <button onClick={()=>widgetRef.current?.open()}> 
            UPLOAD FILE 
        </button>
    </div>
  )
}

export default UploadWidget