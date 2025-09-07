import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [Loading, setLoading] = useState(true)
  const {getToken} = useAuth()

  const fetchCreations = async () => {
   try {
     const{data} = await axios.get('/api/user/get-published-creations',{
      headers : { Authorization : `Bearer ${await getToken()}`}
    })
    if(data.success){
      setCreations(data.creations)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
    
   }
   setLoading(false)
  }


  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/v1/user/toggle-like-creations",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data?.success) {
        toast.success(data?.message || "Success!");
        await fetchCreations();
      } else {
        toast.error(data?.message || "Failed to toggle like.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message || "Request failed.");
      } else {
        toast.error(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  // ✅ Toggle like
  const toggleLike = (index) => {
    setCreations((prev) =>
      prev.map((c, i) =>
        i === index
          ? {
              ...c,
              likes: c.likes.includes(user.id)
                ? c.likes.filter((id) => id !== user.id) // unlike
                : [...c.likes, user.id], // like
            }
          : c
      )
    )
  }

  return !Loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Creations</h2>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden shadow"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-b from-transparent to-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm mb-2">{creation.prompt}</p>

              <div className="flex items-center gap-2">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => toggleLike(index)}
                  className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform ${
                    creation.likes.includes(user.id)
                      ? 'fill-red-500 text-red-600'
                      : 'text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
       <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community














