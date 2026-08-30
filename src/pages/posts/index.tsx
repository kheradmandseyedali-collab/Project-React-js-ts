import { useEffect, useState } from "react";
import { Link } from "react-router";
import DsButton from "../../components/desing_system/DsButten";
import Loading from "../../components/global/Loading";
import PageHeader from "../../components/global/PageHeader";
import { BASE_URL } from "../../constants";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = () => {
    fetch(`${BASE_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <PageHeader text="Posts Page" />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="border border-gray-500 h-[80vh] overflow-auto">
          <table>
            <thead className="bg-slate-700 sticky top-0">
              <tr>
                <th className="px-2 py-4">Row</th>
                <th className="px-2 py-4">Title</th>
                <th className="px-2 py-4">User</th>
                <th className="px-2 py-4">Body</th>
                <th className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => {
                return (
                  <tr
                    key={post.id}
                    className="border border-gray-600 even:bg-gray-800 hover:bg-gray-700"
                  >
                    <td className="p-2 text-lg">{index + 1}</td>
                    <td className="p-2 text-lg">{post.title}</td>
                    <td className="p-2 text-lg">{post.userId}</td>
                    <td className="p-2 text-lg">{post.body}</td>
                    <td className="p-2 text-lg">
                      <Link to={`/posts/${post.id}`}>
                        <DsButton text="Details" size="md" color="blue" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Posts;
