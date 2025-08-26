import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)
  }

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

  return (
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
  )
}

export default Community
