import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostByIdApi } from "../../services/posts-service";
import PageHeader from "../../components/global/PageHeader";
import Ds_Button from "../../components/desing_system/DsButton";
import { ArrowLeft, User, Eye, Tag } from "lucide-react";

const ShowPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post-detail", id],
    queryFn: () => getPostByIdApi(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center py-12 text-lg">در حال بارگذاری اطلاعات پست...</div>;
  }

  if (isError || !post) {
    return (
      <div className="text-center py-12 text-red-400">
        پست مورد نظر یافت نشد!
        <div className="mt-4">
          <Ds_Button onClick={() => navigate(-1)}>بازگشت</Ds_Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <PageHeader text={`پست شماره ${post.id}`} />
        <Ds_Button
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          بازگشت به لیست
        </Ds_Button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-4 text-sky-400">{post.title}</h1>

        <p className="text-slate-300 leading-relaxed text-lg mb-6 whitespace-pre-line">
          {post.body}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-700 text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <User size={16} className="text-blue-400" />
            <span>شناسه کاربر: {post.userId}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye size={16} className="text-emerald-400" />
            <span>بازدید: {post.views}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-1.5">
              <Tag size={16} className="text-amber-400" />
              <span>تگ‌ها: {post.tags.join(" , ")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPost ;