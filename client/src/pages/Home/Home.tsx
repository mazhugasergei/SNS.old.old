import { useEffect, useState } from "react"
import axios from "axios"
// components
import Post from "pages/Home/compoentns/Post"

interface Post {
  _id: string,
  author_id: string,
  title: string,
  body: string
}

export default () => {
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/posts`)
      .then(res => setPosts(res.data))
  }, [])

  return (
    <main className="home wrapper">
      <div className="posts">
        { posts && posts.map(post => (
          <Post _id={post._id} author_id={post.author_id} title={post.title} body={post.body} key={post._id} />
        )) }
      </div>
    </main>
  )
}