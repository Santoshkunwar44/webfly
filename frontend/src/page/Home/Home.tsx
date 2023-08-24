import React from 'react'
import UploadWidget from '../../component/UploadWidget/UploadWidget'
import Upload from '../../component/upload/Upload'
import { HomeWrapper } from './Home.styles'

const Home = () => {
  return (
    <HomeWrapper className='home'>
     <Upload/>
     
    </HomeWrapper>
  )
}

export default Home