import axios,{AxiosProgressEvent} from "axios"

const cloudName ="onlinecoder"
const presetKey="imgVariation"


interface CallBack{
  (progress:number,url:string):void
}


const useUpload=()=>{

    const upload=async(file:File,cb:CallBack)=>{

        
        const formData = new FormData()
        formData.append("file",file)
        formData.append("upload_preset",presetKey)
    try {
    const res = await  axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData,{
        
        headers:{
            "Content-Type":"multipart/form-data"
        },
        onUploadProgress:(e:AxiosProgressEvent)=>{

            if(e.total){
                let loaded = Math.round((100*e?.loaded)/e.total);
                cb(loaded,"")

            }

                    
        }
    })
    cb(100,res?.data?.secure_url)
} catch (error) {
    console.log(error)
}
}   



return {upload}
}



export default useUpload;