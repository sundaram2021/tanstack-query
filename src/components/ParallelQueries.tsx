"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
  { id: 4, title: "Post 4" },
  { id: 5, title: "Post 5" },
]

const TODOS = [
  { id: 1, title: "Todo 1" },
  { id: 2, title: "Todo 2" },
  { id: 3, title: "Todo 3" },
  { id: 4, title: "Todo 4" },
  { id: 5, title: "Todo 5" },
]

const INTIAL_POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
]

export default function ParallelQueries() {
  // const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  })

  const usersId = postsQuery.data?.map((post) => post.id) ?? []

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => wait(3000).then(() => [...TODOS]),
    enabled: !!usersId,
  })

  return (
    <div className="w-full h-full gap-10 flex justify-center items-center">
      <div>
        { 
          postsQuery.isLoading ? <h1>Loading posts...</h1> :
          postsQuery.isError ? <h1>Error: {postsQuery.error as string}</h1> :
          postsQuery.data?.map((post) => {
            return <div key={post.id}>{post.title}</div>
          })
        }
      </div>
      <div>
        {
          todosQuery.isLoading ? <h1>Loading todos...</h1> :
          todosQuery.isError ? <h1>Error: {todosQuery.error as string}</h1> :
          todosQuery.data?.map((todo) => {
            return <div key={todo.id}>{todo.title}</div>
          })
        }
      </div>
      {/* <button className="bg-slate-400 py-2 px-2 rounded-md disabled:bg-slate-700" disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("New Post")}>Add Post</button> */}
    </div>
  )
}

export function wait(duation: number){
  return new Promise((resolve) => {
    setTimeout(resolve, duation)
  })
}
