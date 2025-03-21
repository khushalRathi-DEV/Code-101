import { useEffect, useState } from 'react';
export function useFetchposts (){
  const [posts,setPosts] = useState({});
    useEffect(() => {
      getPosts();
    },[])
    async function getPosts (){
      const response = await fetch("https://jsonplaceholder.typicode.com/comments");
      const data = await response.json();
      setPosts(data);
    }
    return posts;
}