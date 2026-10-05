import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostByIdApi, updatePostApi, type PostsResponse } from "../../services/posts-service";
import PageHeader from "../../components/global/PageHeader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { LucideArrowLeft , LucideSave } from "lucide-react";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data: post, isLoading } = useQuery({
    queryKey: ["post-detail", id],
    queryFn: () => getPostByIdApi(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setBody(post.body || "");
    }
  }, [post]);

  const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: () => updatePostApi({ id: id!, title, body }),
    onSuccess: (updatedPost) => {
      toast.success("پست با موفقیت ویرایش شد");

      queryClient.setQueryData(["post-detail", id], updatedPost);

      queryClient.setQueriesData<PostsResponse>(
        { queryKey: ["posts-list"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            posts: oldData.posts.map((p) =>
              p.id === Number(id) ? { ...p, title, body } : p
            ),
          };
        }
      );

      navigate("/app/posts");
    },
    onError: () => toast.error("خطا در ویرایش اطلاعات پست"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.warning("لطفاً تمامی فیلدها را پر کنید");
      return;
    }
    handleUpdate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      {/* هدر صفحه */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <PageHeader text={`ویرایش پست شماره ${id}`} />
        <Button
          variant="outlined"
          size="small"
          startIcon={<LucideArrowLeft size={18} />}
          onClick={() => navigate("/app/posts")}
          sx={{ textTransform: "none" , fontSize : "16px"}}
        >
          Go to Posts
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl border p-6 shadow-sm
                   bg-white border-gray-200
                   dark:bg-slate-800/60 dark:border-slate-700
                   transition-colors"
      >
        <TextField
          label="عنوان پست (Title)"
          variant="outlined"
          fullWidth
          dir="ltr"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextField
          label="متن پست (Body)"
          variant="outlined"
          fullWidth
          multiline
          minRows={5}
          maxRows={10}
          dir="ltr"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-3 pt-2 border-t
                        border-gray-100 dark:border-slate-700">
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/app/posts")}
            disabled={isUpdating}
            sx={{ textTransform: "none" , fontSize : "16px" }}
          >
            cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isUpdating}
            startIcon={
              isUpdating ? <CircularProgress size={16} color="primary" /> : <LucideSave size={16} />
            }
            sx={{ textTransform: "none" , fontSize : "16px" }}
          >
            {isUpdating ? "is loading saving" : "save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
