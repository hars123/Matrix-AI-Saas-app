import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTittle from './pages/BlogTittle'
import Generatimages from './pages/Generatimages'
import RemoveBackgraound from './pages/RemoveBackgraound'
import Removeobject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>} />
         <Route path='/ai' element = {<Layout/>}>
            <Route index element = {<Dashboard/>} />
             <Route path='write-article' element = {<WriteArticle/>} />
             <Route path='blog-tittle' element = {<BlogTittle/>} />
             <Route path='generate-images' element = {<Generatimages/>} />
               <Route path='remove-background' element = {<RemoveBackgraound/>} />
                 <Route path='remove-object' element = {<Removeobject/>} />
                   <Route path='review-resume' element = {<ReviewResume/>} />
                     <Route path='community' element = {<Community/>} />
         </Route>
      </Routes>
    </div>
  )
}

export default App