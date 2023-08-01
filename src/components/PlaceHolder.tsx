'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

async function fetchPosts(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
}

const INTIAL_POSTS = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
    { id: 4, title: "Post 4" },

]

function PlaceHolder() {
   const postQuery = useQuery({
       queryKey: ['posts'],
       queryFn: fetchPosts,
       placeholderData: INTIAL_POSTS,
       staleTime: 5000,
   })


  return (
    <div>
        {
            postQuery.isLoading ? <h1>Loading posts...</h1> :
            postQuery.isError ? <h1>Error: {postQuery.error as string}</h1> :
            postQuery.data?.map((post: {id: number, title: string}) => {
                return <div key={post.id}>{post.title}</div>
            })
        }
    </div>
  )
}

export default PlaceHolder