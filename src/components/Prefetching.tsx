'use client'

import { useQueryClient } from "@tanstack/react-query";
import { wait } from "./ParallelQueries";

const Data = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
    { id: 4, title: "Post 4" },
    { id: 5, title: "Post 5" },
]

const SUBPOSTS = [
    { id: 1, title: "Subpost 1" },
    { id: 2, title: "Subpost 2" },
    { id: 3, title: "Subpost 3" },
    { id: 4, title: "Subpost 4" },
    { id: 5, title: "Subpost 5" },
]

function Prefetching() {
    const queryClient = useQueryClient();

    const prefetch = () => {
        queryClient.prefetchQuery(["subposts"], () => wait(1000).then(() => [...SUBPOSTS]))
    }

    // prefetch.
    

  return (
    <div>
        {
            Data.map((post) => {
                return <div onMouseEnter={prefetch} key={post.id}>{post.title}</div>
            })
        }
    </div>
  )
}

export default Prefetching