import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Post {
  _id: string,
  author_id: string,
  title: string,
  body: string
}

interface Author {
  _id: string,
  username: string,
  display_name: string
}

export default (props: Post) => {
  const [author, setAuthor] = useState<Author | null>(null)

  useEffect(()=>{
    axios.get(`http://localhost:3001/api/users/${props.author_id}`)
      .then(res => setAuthor(res.data))
  }, [])

  return (
    <Link to={`/posts/${props._id}`} className="post" key={props._id}>
      <div className="author">{ author && author.display_name }</div>
      {/* <div className="author">{ author && author.display_name } • { props.createdAt }</div> */}
      <div className="title">{ props.title.length > 75 ? `${props.title.substring(0, 75)}...` : props.title }</div>
      <div className="body">{ props.body.length > 120 ? `${props.body.substring(0, 120)}...` : props.body }</div>
    </Link>
  )
}