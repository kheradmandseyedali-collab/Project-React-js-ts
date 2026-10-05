import { useEffect , useState } from "react";
import PageHeader from "../../../components/global/PageHeader";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import Loading from "../../../components/global/Loading";
import DsTypography from "../../../components/desing_system/DsTypography";
import { Eye } from "lucide-react";

type PostDetails = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags?: string[];
  views?: number;
}

const Details = () => {
  const { postId } = useParams<{ postId: string }>();
  const [details, setDetails] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/posts/${postId}`);
      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.log("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      getPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader showBack backRoute="/app/posts" text="Post Details" />

      {details && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs px-3 py-1 rounded-full font-mono">
              Post #{details.id}
            </span>
            {details.views !== undefined && (
              <span className="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full">
                <Eye /> {details.views} views
              </span>
            )}
          </div>

          <div>
            <DsTypography
              element="h1"
              className="text-2xl sm:text-3xl font-bold text-slate-100 leading-snug mb-4"
            >
              {details.title}
            </DsTypography>

            <DsTypography
              element="p"
              className="text-slate-300 leading-relaxed text-base sm:text-lg bg-slate-950/40 p-6 rounded-2xl border border-slate-800/60"
            >
              {details.body}
            </DsTypography>
          </div>

          {details.tags && details.tags.length > 0 && (
            <div className="flex items-center gap-2 pt-4 border-t border-slate-800 flex-wrap">
              <span className="text-xs text-slate-400">Tags:</span>
              {details.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-slate-800/80 text-slate-300 border border-slate-700/60 px-2.5 py-1 rounded-lg font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Details ;