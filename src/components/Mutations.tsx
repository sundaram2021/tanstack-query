'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const Data = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
    { id: 4, title: "Post 4" },
    { id: 5, title: "Post 5" },
]

const fetchPosts =  () => {
    return Data.map(post => post)
}

function Mutations() {
    const [title, setTitle] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);
    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    const queryClient = useQueryClient();

    const postMutatation = useMutation({
        mutationFn: createPost,
        onSuccess:  () => {
            queryClient.invalidateQueries(['posts'])
        }
    })

    async function createPost() {
        Data.push({id: Data.length + 1, title: title})
    }

    
  return (
    <div>
        {
            postsQuery.isLoading ? <h1>Loading posts...</h1> :
            postsQuery.isError ? <h1>Error: {postsQuery.error as string}</h1> :
            postsQuery.data?.map((post: {id: number, title: string}) => {
                return <div key={post.id}>{post.title}</div>
            })
        }
        <button className='bg-white py-2 px-2 rounded-md text-black mb-6' onClick={() => setShowForm(true)}>Create Post</button>
        {showForm && <div className='flex gap-6 bg-slate-900 justify-center py-4 px-2 mb-8 rounded-sm'>
            <input className='rounded-md h-10 text-black' value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" />
            <button onClick={() => postMutatation.mutate()} className='bg-white py-2 px-2 rounded-md text-black mb-6'>Create Post</button>
        </div>}
    </div>
  )
}

export default Mutations

// function Form() {

//     return (
        
//     )
// }