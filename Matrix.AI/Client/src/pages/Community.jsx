import React, { useEffect, useState } from 'react'
import {useUser} from '@clerk/clerk-react'
import {dummyPublishedCreationData} from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {
  const[creations , setCretions] = useState([])
  const {user} = useUser()

  
  const fetchCreations = async ()=>{
    setCretions(dummyPublishedCreationData)
  }

  useEffect(() =>{
    if(user){
      fetchCreations()
    }
  }, [user])

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      Creations
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
          {
            creations.map(( creation , index)=>(
              <div key={index} className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3' >
                <img src= {creation.content} alt="" className='w-full h-full object-cover rounded-lg' />

                <div>
                  <p className='text-sm hidden group:hover:block'>
                    {
                      creation.prompt
                    }
                  </p>

                  <div>
                    <p>
                      {
                        creation.likes.length
                      }  

                      
                      {/* yha se karna hai  */}
                      <Heart className= {`min-w-5 h-5 hover:scale-110 cursor-pointer`} />
                    </p>
                  </div>
                </div>

              </div>

            ))}
      </div>

    </div>
  )
}

export default Community